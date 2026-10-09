import { randomUUID } from "node:crypto";
import { and, count, desc, eq, gt, gte, inArray, ne } from "drizzle-orm";
import { getDb } from "@/server/db/client";
import { games, lfgPosts, lfgRequests, users } from "@/server/db/schema";
import { createNotification } from "@/features/notifications/repository/notification-repository";
import { canRetryWithdrawnRequest, type validateLfgPost } from "./validation";

type ValidPost = Extract<ReturnType<typeof validateLfgPost>,{ok:true}>["value"];

export async function listOpenLfgPosts() {
 const db=getDb();
 const rows=await db.select({
  id:lfgPosts.id,userId:lfgPosts.userId,owner:users.displayName,gameId:lfgPosts.gameId,
  game:games.title,gameSlug:games.slug,title:lfgPosts.title,description:lfgPosts.description,
  region:lfgPosts.region,platform:lfgPosts.platform,mode:lfgPosts.mode,skill:lfgPosts.skill,
  vibe:lfgPosts.vibe,mic:lfgPosts.mic,slots:lfgPosts.slots,createdAt:lfgPosts.createdAt,
 }).from(lfgPosts).innerJoin(games,eq(lfgPosts.gameId,games.id))
 .innerJoin(users,eq(lfgPosts.userId,users.id))
 .where(and(eq(lfgPosts.status,"open"),gt(lfgPosts.expiresAt,new Date())))
 .orderBy(desc(lfgPosts.createdAt)).limit(120);
 const accepted=rows.length ? await db.select({postId:lfgRequests.postId})
 .from(lfgRequests).where(and(inArray(lfgRequests.postId,rows.map(r=>r.id)),eq(lfgRequests.status,"accepted"))):[];
 const counts=new Map<string,number>();
 for(const r of accepted) counts.set(r.postId,(counts.get(r.postId)??0)+1);
 return rows.map(r=>({...r,slotsLeft:Math.max(0,r.slots-(counts.get(r.id)??0))}))
 .filter(r=>r.slotsLeft>0);
}

export async function createLfgPost(userId:string, input:ValidPost) {
 const db=getDb();
 const [tally]=await db.select({n:count()}).from(lfgPosts).where(and(eq(lfgPosts.userId,userId),eq(lfgPosts.status,"open"),gt(lfgPosts.expiresAt,new Date())));
 if(Number(tally?.n??0)>=3) return "You already have three active listings. Close one before creating another.";
 const [game]=await db.select({id:games.id}).from(games).where(and(eq(games.id,input.gameId),ne(games.status,"upcoming"))).limit(1);
 if(!game) return "This game is not available for team finder yet.";
 await db.insert(lfgPosts).values({...input,id:randomUUID(),userId,status:"open",expiresAt:new Date(Date.now()+7*24*60*60*1000)});
 return null;
}

export async function closeLfgPost(userId:string,postId:string) {
 await getDb().update(lfgPosts).set({status:"closed"})
 .where(and(eq(lfgPosts.userId,userId),eq(lfgPosts.id,postId)));
}

export async function requestToJoin(userId:string,postId:string,gamerTag:string) {
 const db=getDb();
 const [post]=await db.select().from(lfgPosts).where(eq(lfgPosts.id,postId)).limit(1);
 if(!post||post.status!=="open"||post.expiresAt<=new Date()) return "This group is no longer recruiting.";
 if(post.userId===userId) return "You cannot join your own group.";
 const [tally]=await db.select({n:count()}).from(lfgRequests).where(and(eq(lfgRequests.postId,postId),eq(lfgRequests.status,"accepted")));
 if(Number(tally?.n??0)>=post.slots) return "This team is already full.";
 const [existing]=await db.select({id:lfgRequests.id,status:lfgRequests.status,createdAt:lfgRequests.createdAt})
 .from(lfgRequests).where(and(eq(lfgRequests.userId,userId),eq(lfgRequests.postId,postId))).limit(1);
 if(existing && !canRetryWithdrawnRequest(existing.status,existing.createdAt))
  return existing.status==="withdrawn"
   ? "You can request this group again 24 hours after withdrawing."
   : "You have already applied to this group.";
 const since=new Date(Date.now()-24*60*60*1000);
 const [limits]=await db.select({n:count()}).from(lfgRequests).where(and(eq(lfgRequests.userId,userId),gte(lfgRequests.createdAt,since)));
 if(Number(limits?.n??0)>=15) return "Daily request limit reached. Try again tomorrow.";
 try {
  if(existing){
   const changed=await db.update(lfgRequests).set({gamerTag,status:"pending",createdAt:new Date()})
    .where(and(eq(lfgRequests.id,existing.id),eq(lfgRequests.userId,userId),eq(lfgRequests.status,"withdrawn")))
    .returning({id:lfgRequests.id});
   if(changed.length===0) return "This request has already been updated. Refresh and try again.";
  } else {
   await db.insert(lfgRequests).values({id:randomUUID(),postId,userId,gamerTag,status:"pending"});
  }
 } catch {return "Could not send the request. You may have already applied.";}
 await createNotification({userId:post.userId,type:"lfg",title:"New teammate request",body:"Someone wants to join your "+post.title+" group.",href:"/find-players/manage"}).catch(()=>undefined);
 return null;
}

export async function decideLfgRequest(ownerId:string,requestId:string,decision:"accepted"|"declined") {
 const db=getDb();
 const result=await db.transaction(async tx=>{
  const [candidate]=await tx.select({postId:lfgRequests.postId}).from(lfgRequests).where(eq(lfgRequests.id,requestId)).limit(1);
  if(!candidate) return {error:"This request is no longer pending."};
  const [post]=await tx.select().from(lfgPosts).where(and(eq(lfgPosts.id,candidate.postId),eq(lfgPosts.userId,ownerId))).for("update").limit(1);
  if(!post) return {error:"Only the group owner can decide."};
  // Re-read after locking the post: the applicant may withdraw concurrently.
  const [request]=await tx.select().from(lfgRequests).where(eq(lfgRequests.id,requestId)).for("update").limit(1);
  if(!request || request.status!=="pending") return {error:"This request is no longer pending."};
  if(post.status!=="open"||post.expiresAt<=new Date()) return {error:"This group has closed."};
  if(decision==="accepted"){
   const [used]=await tx.select({n:count()}).from(lfgRequests).where(and(eq(lfgRequests.postId,post.id),eq(lfgRequests.status,"accepted")));
   if(Number(used?.n??0)>=post.slots) return {error:"No spots left."};
  }
  const updated=await tx.update(lfgRequests).set({status:decision})
   .where(and(eq(lfgRequests.id,requestId),eq(lfgRequests.status,"pending")))
   .returning({id:lfgRequests.id});
  if(updated.length===0) return {error:"This request was already updated."};
  return {notifyUserId:request.userId,title:post.title};
 });
 if("error" in result) return result.error;
 if(result.notifyUserId) await createNotification({userId:result.notifyUserId,type:"lfg",title:decision==="accepted"?"You are in the squad":"Squad request update",body:decision==="accepted"?"Your request for "+result.title+" was accepted. View your game ID in My LFG.":"The group owner declined your request for "+result.title+".",href:"/find-players/manage"}).catch(()=>undefined);
 return null;
}

export async function getLfgMemberDashboard(userId:string){
 const db=getDb();
 const owned=await db.select({post:lfgPosts,game:games.title}).from(lfgPosts).innerJoin(games,eq(lfgPosts.gameId,games.id))
 .where(eq(lfgPosts.userId,userId)).orderBy(desc(lfgPosts.createdAt)).limit(30);
 const ids=owned.map(r=>r.post.id);
 const incoming=ids.length ? await db.select({request:lfgRequests,displayName:users.displayName,postId:lfgPosts.id,postTitle:lfgPosts.title,ownerTag:lfgPosts.gamerTag})
 .from(lfgRequests).innerJoin(users,eq(lfgRequests.userId,users.id)).innerJoin(lfgPosts,eq(lfgRequests.postId,lfgPosts.id))
 .where(inArray(lfgRequests.postId,ids)).orderBy(desc(lfgRequests.createdAt)).limit(100):[];
 const outgoing=await db.select({request:lfgRequests,owner:users.displayName,postTitle:lfgPosts.title,ownerTag:lfgPosts.gamerTag,postStatus:lfgPosts.status})
 .from(lfgRequests).innerJoin(lfgPosts,eq(lfgRequests.postId,lfgPosts.id)).innerJoin(users,eq(lfgPosts.userId,users.id))
 .where(eq(lfgRequests.userId,userId)).orderBy(desc(lfgRequests.createdAt)).limit(80);
 return {owned,incoming,outgoing};
}

export async function withdrawLfgRequest(userId:string,requestId:string){
 const changed=await getDb().update(lfgRequests).set({status:"withdrawn"})
  .where(and(eq(lfgRequests.id,requestId),eq(lfgRequests.userId,userId),eq(lfgRequests.status,"pending")))
  .returning({id:lfgRequests.id});
 return changed.length>0;
}
