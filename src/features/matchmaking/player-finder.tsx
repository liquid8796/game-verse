"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { joinLfgPostAction } from "./actions";
import { LFG_REGIONS, LFG_VIBES, LFG_SKILLS } from "./validation";

export type PublicPost = {
 id:string;userId:string;owner:string;gameId:string;game:string;gameSlug:string;
 title:string;description:string;region:string;platform:string;mode:string;
 skill:string;vibe:string;mic:boolean;slots:number;slotsLeft:number;createdAt:Date;
};
type GameOption={id:string;title:string;slug:string;image?:string};
const All="All";
export function PlayerFinder({posts,games,memberId,initialGame}:{posts:PublicPost[];games:GameOption[];memberId?:string;initialGame?:string}) {
 const [game,setGame]=useState(initialGame&&games.some(g=>g.id===initialGame)?initialGame:All),[region,setRegion]=useState(All),[vibe,setVibe]=useState(All),[search,setSearch]=useState("");
 const [skill,setSkill]=useState(All); const [showJoin,setShowJoin]=useState<string|null>(null),[expanded,setExpanded]=useState(false);
 const artwork=new Map(games.map(g=>[g.id,g.image]));
 const filtered=useMemo(()=>posts.filter(p=>
  (game===All||p.gameId===game)&&(region===All||p.region===region)&&(vibe===All||p.vibe===vibe)&&(skill===All||p.skill===skill)
  &&(p.title+" "+p.game+" "+p.description+" "+p.mode+" "+p.platform+" "+p.owner).toLowerCase().includes(search.toLowerCase().trim())
 ),[posts,game,region,vibe,skill,search]);
 const reset=()=>{setGame(All);setRegion(All);setVibe(All);setSkill(All);setSearch("");};
 return <>
  <div className="lfg-game-rail" aria-label="Choose a game">
   <button onClick={()=>setGame(All)} className={"lfg-game-chip lfg-game-all "+(game===All?"is-active":"")} aria-pressed={game===All}>
    <span className="lfg-game-all-mark">✳</span><strong>All games</strong><small>Explore everyone</small>
   </button>
   {games.slice(0,expanded?games.length:7).map(g=><button key={g.id} onClick={()=>setGame(g.id)} className={"lfg-game-chip "+(game===g.id?"is-active":"")} aria-pressed={game===g.id}>
    <span className="lfg-chip-art">{g.image&&<Image src={g.image} alt="" fill sizes="130px" />}</span><strong>{g.title}</strong>
   </button>)}
   {games.length>7&&<button className="lfg-game-more" onClick={()=>setExpanded(!expanded)} aria-expanded={expanded}>{expanded?"Show less −":"More games + "}</button>}
  </div>

  <div className="lfg-board-heading" id="listings">
   <div><span className="lfg-micro"><span className="lfg-live-light" /> THE SQUAD BOARD / LIVE LISTINGS</span>
    <h2>FIND YOUR <em>PEOPLE.</em></h2>
    <p>Real player listings. Filter by what you play, where you play, and the kind of session you want.</p>
   </div>
   <Link href="/find-players/new" className="lfg-action lfg-action-primary">+ POST A SQUAD REQUEST <span aria-hidden="true">↗</span></Link>
  </div>
  <div className="lfg-filterbar">
   <label className="lfg-search"><span aria-hidden="true">⌕</span><span className="sr-only">Search players and games</span><input type="search" placeholder="Search players, games, modes..." value={search} onChange={e=>setSearch(e.target.value)} /></label>
   <label><span>REGION</span><select aria-label="Filter by region" value={region} onChange={e=>setRegion(e.target.value)}><option value={All}>Every region</option>{LFG_REGIONS.map(x=><option key={x}>{x}</option>)}</select></label>
   <label><span>PLAYSTYLE</span><select aria-label="Filter by playstyle" value={vibe} onChange={e=>setVibe(e.target.value)}><option value={All}>Any intensity</option>{LFG_VIBES.map(x=><option key={x}>{x}</option>)}</select></label>
   <label><span>SKILL</span><select aria-label="Filter by skill" value={skill} onChange={e=>setSkill(e.target.value)}><option value={All}>Any skill</option>{LFG_SKILLS.map(x=><option key={x}>{x}</option>)}</select></label>
   <button className="lfg-clear" onClick={reset}>RESET FILTERS ↺</button>
  </div>
  <div className="lfg-results-count" role="status"><span><b>{filtered.length.toString().padStart(2,"0")}</b> OPEN SQUADS FOUND</span><span>Showing authentic community listings · no artificial online status</span></div>
  {filtered.length===0?<div className="lfg-empty">
   <div aria-hidden="true" className="lfg-empty-icon"><span>＋</span><i /></div>
   <span className="lfg-micro">SIGNAL / NO OPEN LOBBIES</span>
   <h3>YOUR SQUAD STARTS HERE.</h3>
   <p>{posts.length===0?"There are no live team posts yet. Publish the first squad request and give others a place to join.":"No listings match these filters. Try another game or start a new squad."}</p>
   <div><button onClick={reset} className="lfg-action lfg-action-outline">CLEAR FILTERS</button><Link className="lfg-action lfg-action-primary" href="/find-players/new">CREATE A SQUAD ↗</Link></div>
  </div>:<div className="lfg-post-grid">
   {filtered.map((p,i)=><article className="lfg-post" key={p.id} style={{animationDelay:Math.min(i,9)*65+"ms"}}>
     <div className="lfg-post-top">
      <div className="lfg-post-cover">{artwork.get(p.gameId)&&<Image src={artwork.get(p.gameId)!} alt="" fill sizes="(max-width: 650px) 88px, 104px" />}</div>
      <div className="lfg-post-game"><span>GAME / {p.region.toUpperCase()}</span><strong>{p.game}</strong><small>{p.mode} · {p.platform}</small></div>
      <span className="lfg-open-slots"><b>{p.slotsLeft}</b> {p.slotsLeft===1?"SPOT":"SPOTS"} OPEN</span>
     </div>
     <div className="lfg-post-main">
      <h3>{p.title}</h3>
      <p>{p.description}</p>
      <div className="lfg-post-tags"><span>{p.skill}</span><span>{p.vibe}</span><span>{p.mic?"MIC ON":"MIC OPTIONAL"}</span></div>
     </div>
     <div className="lfg-post-bottom"><span className="lfg-post-avatar">{p.owner.slice(0,2).toUpperCase()}</span><div className="lfg-post-author"><strong>{p.owner}</strong><small>Squad leader · {new Date(p.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric",timeZone:"UTC"})}</small></div>
     {memberId===p.userId?<Link href="/find-players/manage" className="lfg-card-cta">MANAGE ↗</Link>:memberId?<button className="lfg-card-cta" aria-expanded={showJoin===p.id} onClick={()=>setShowJoin(showJoin===p.id?null:p.id)}>{showJoin===p.id?"CANCEL −":"REQUEST TO JOIN ↗"}</button>:<Link href={"/login?next="+encodeURIComponent("/find-players")} className="lfg-card-cta">SIGN IN TO JOIN ↗</Link>}
     </div>
     {showJoin===p.id&&memberId&&memberId!==p.userId&&<form action={joinLfgPostAction} className="lfg-join-form">
      <input type="hidden" name="postId" value={p.id}/><label>Your in-game ID <span>(shared with the owner only)</span><input name="gamerTag" minLength={3} maxLength={64} placeholder="Username # Tag" required autoFocus /></label>
      <button className="lfg-action lfg-action-primary" type="submit">SEND REQUEST <span>→</span></button>
     </form>}
   </article>)}
  </div>}
 </>;
}
