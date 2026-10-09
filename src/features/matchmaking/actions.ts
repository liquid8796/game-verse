"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireCurrentUser } from "@/features/auth/lib/session";
import { getAllGames } from "@/server/queries/content";
import { createLfgPost, closeLfgPost, requestToJoin, decideLfgRequest, withdrawLfgRequest } from "./repository";
import { validateLfgPost, validateGamerTag, MATCHMAKING_GAME_IDS } from "./validation";

const value=(data:FormData,key:string)=>String(data.get(key)??"").trim();
function back(path:string,message:string):never{
 redirect(path+"?notice="+encodeURIComponent(message));
}

export async function createLfgPostAction(data:FormData){
 const member=await requireCurrentUser("/find-players/new");
 const live=(await getAllGames()).filter(g=>g.status!=="upcoming"&&MATCHMAKING_GAME_IDS.some(x=>x===g.id)).map(g=>g.id);
 const parsed=validateLfgPost({
  gameId:value(data,"gameId"),title:value(data,"title"),description:value(data,"description"),
  region:value(data,"region"),platform:value(data,"platform"),mode:value(data,"mode"),
  skill:value(data,"skill"),vibe:value(data,"vibe"),slots:value(data,"slots"),mic:data.get("mic")==="on",
  gamerTag:value(data,"gamerTag"),
 },live);
 if(!parsed.ok) back("/find-players/new",parsed.error);
 const error=await createLfgPost(member.id,parsed.value);
 if(error) back("/find-players/new",error);
 revalidatePath("/find-players");
 revalidatePath("/find-players/manage");
 back("/find-players/manage","Squad listing published! It will expire automatically in seven days.");
}

export async function joinLfgPostAction(data:FormData){
 const member=await requireCurrentUser("/find-players");
 const postId=value(data,"postId"),tag=value(data,"gamerTag");
 if(!validateGamerTag(tag)) back("/find-players","Your in-game ID must be 3–64 characters.");
 const error=await requestToJoin(member.id,postId,tag);
 if(error) back("/find-players",error);
 revalidatePath("/find-players/manage");
 back("/find-players/manage","Request sent. The owner can now review it.");
}

export async function decideLfgRequestAction(data:FormData){
 const member=await requireCurrentUser("/find-players/manage");
 const action=value(data,"decision");
 if(action!=="accepted"&&action!=="declined") back("/find-players/manage","Invalid action.");
 const error=await decideLfgRequest(member.id,value(data,"requestId"),action);
 if(error) back("/find-players/manage",error);
 revalidatePath("/find-players/manage");revalidatePath("/find-players");
 back("/find-players/manage",action==="accepted"?"Player accepted! Game IDs are now available.":"Request declined.");
}

export async function closeLfgPostAction(data:FormData){
 const member=await requireCurrentUser("/find-players/manage");
 await closeLfgPost(member.id,value(data,"postId"));
 revalidatePath("/find-players");revalidatePath("/find-players/manage");
 back("/find-players/manage","Listing closed.");
}

export async function withdrawLfgRequestAction(data:FormData){
 const member=await requireCurrentUser("/find-players/manage");
 const withdrawn=await withdrawLfgRequest(member.id,value(data,"requestId"));
 if(!withdrawn) back("/find-players/manage","This request was already updated. Refresh to see the latest status.");
 revalidatePath("/find-players/manage");
 back("/find-players/manage","Request withdrawn.");
}
