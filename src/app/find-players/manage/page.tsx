import type { Metadata } from "next";
import Link from "next/link";
import { requireCurrentUser } from "@/features/auth/lib/session";
import { closeLfgPostAction, decideLfgRequestAction, withdrawLfgRequestAction } from "@/features/matchmaking/actions";
import { getLfgMemberDashboard } from "@/features/matchmaking/repository";

export const dynamic="force-dynamic";
export const metadata:Metadata={title:"My Squads & Requests",robots:{index:false}};
export default async function ManageSquadsPage({searchParams}:{searchParams:Promise<{notice?:string}>}){
 const [member,params]=await Promise.all([requireCurrentUser("/find-players/manage"),searchParams]);
 const {owned,incoming,outgoing}=await getLfgMemberDashboard(member.id);
 return <main id="main" className="lfg-root"><div className="shell lfg-inner-page">
  <Link href="/find-players" className="lfg-back">← BACK TO SQUAD FINDER</Link>
  <div className="lfg-page-heading lfg-page-heading-row"><div><span className="lfg-micro">MY SQUADS / CONTROL CENTER</span><h1>YOUR <em>LOBBY.</em></h1><p>Manage the groups you lead, review applications and view your outgoing requests.</p></div><Link href="/find-players/new" className="lfg-action lfg-action-primary">+ NEW SQUAD ↗</Link></div>
  {params.notice&&<p className="lfg-notice" role="status">{params.notice}</p>}
  <section className="lfg-manage-section"><div className="lfg-manage-head"><h2>SQUADS YOU LEAD</h2><span>{owned.length} total</span></div>
   {owned.length===0?<p className="lfg-manage-empty">You haven&apos;t posted a squad yet. <Link href="/find-players/new">Create one →</Link></p>:
   <div className="lfg-manage-list">{owned.map(({post,game})=><article className="lfg-manage-card" key={post.id}>
    <div><span className="lfg-micro">{game} / {post.region}</span><h3>{post.title}</h3><p>{post.mode} · {post.platform} · {post.slots} spots · {post.expiresAt>new Date()&&post.status==="open"?"Recruiting":"Closed / expired"}</p></div>
    {post.status==="open"&&<form action={closeLfgPostAction}><input type="hidden" name="postId" value={post.id}/><button className="lfg-action lfg-action-outline" type="submit">CLOSE LISTING</button></form>}
    </article>)}</div>}
  </section>
  <section className="lfg-manage-section"><div className="lfg-manage-head"><h2>INCOMING REQUESTS</h2><span>{incoming.filter(x=>x.request.status==="pending").length} pending</span></div>
   {incoming.length===0?<p className="lfg-manage-empty">New teammate requests will appear here when someone applies.</p>:
   <div className="lfg-manage-list">{incoming.map(({request,displayName,postTitle,ownerTag})=><article className="lfg-manage-card" key={request.id}>
    <div><span className="lfg-micro">{postTitle}</span><h3>{displayName}</h3><p>Status: {request.status} · Applicant game ID: <strong>{request.gamerTag}</strong></p>{request.status==="accepted"&&<p>Your game ID shared with this player: <strong>{ownerTag}</strong></p>}</div>
    {request.status==="pending"&&<div className="lfg-decision"><form action={decideLfgRequestAction}><input type="hidden" name="requestId" value={request.id}/><input type="hidden" name="decision" value="accepted"/><button className="lfg-action lfg-action-primary">ACCEPT ✓</button></form><form action={decideLfgRequestAction}><input type="hidden" name="requestId" value={request.id}/><input type="hidden" name="decision" value="declined"/><button className="lfg-action lfg-action-outline">DECLINE</button></form></div>}
    </article>)}</div>}
  </section>
  <section className="lfg-manage-section"><div className="lfg-manage-head"><h2>REQUESTS YOU SENT</h2><span>{outgoing.length} total</span></div>
   {outgoing.length===0?<p className="lfg-manage-empty">No applications yet. <Link href="/find-players">Browse open squads →</Link></p>:
   <div className="lfg-manage-list">{outgoing.map(({request,owner,postTitle,ownerTag,postStatus})=><article key={request.id} className="lfg-manage-card"><div><span className="lfg-micro">TO {owner} / {postStatus}</span><h3>{postTitle}</h3><p>Request: <strong>{request.status}</strong></p>{request.status==="accepted"&&<p className="lfg-accepted">✓ You&apos;re in! Team leader&apos;s game ID: <strong>{ownerTag}</strong></p>}</div>{request.status==="pending"&&<form action={withdrawLfgRequestAction}><input type="hidden" name="requestId" value={request.id}/><button className="lfg-action lfg-action-outline" type="submit">WITHDRAW</button></form>}</article>)}</div>}
  </section>
 </div></main>;
}
