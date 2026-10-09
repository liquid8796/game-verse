"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { joinLfgPostAction } from "./actions";
import { LFG_REGIONS, LFG_VIBES, LFG_SKILLS, LFG_PLATFORMS } from "./validation";
import { ALL_SQUADS, DEFAULT_SQUAD_FILTERS, filterSquads, type SquadFilters } from "./filter-posts";

export type PublicPost = {
 id:string;userId:string;owner:string;gameId:string;game:string;gameSlug:string;
 title:string;description:string;region:string;platform:string;mode:string;
 skill:string;vibe:string;mic:boolean;slots:number;slotsLeft:number;createdAt:Date;
};
type GameOption={id:string;title:string;slug:string;image?:string};
export function PlayerFinder({posts,games,memberId,initialGame}:{posts:PublicPost[];games:GameOption[];memberId?:string;initialGame?:string}) {
 const [filters,setFilters]=useState<SquadFilters>(()=>({
  ...DEFAULT_SQUAD_FILTERS,
  game:initialGame&&games.some(g=>g.id===initialGame)?initialGame:ALL_SQUADS,
 }));
 const [showJoin,setShowJoin]=useState<string|null>(null),[expanded,setExpanded]=useState(false);
 const artwork=new Map(games.map(g=>[g.id,g.image]));
 const filtered=useMemo(()=>filterSquads(posts,filters),[posts,filters]);
 const update=(changes:Partial<SquadFilters>)=>setFilters(current=>({...current,...changes}));
 const reset=()=>setFilters(DEFAULT_SQUAD_FILTERS);
 const activeFilters=(
  ["game","region","vibe","skill","platform","voice","minSpots","search"] as const
 ).filter(key=>filters[key]!==DEFAULT_SQUAD_FILTERS[key]).length;
 return <>
  <div className="lfg-game-rail" aria-label="Choose a game">
   <button onClick={()=>update({game:ALL_SQUADS})} className={"lfg-game-chip lfg-game-all "+(filters.game===ALL_SQUADS?"is-active":"")} aria-pressed={filters.game===ALL_SQUADS}>
    <span className="lfg-game-all-mark">✳</span><strong>All games</strong><small>Explore everyone</small>
   </button>
   {games.slice(0,expanded?games.length:7).map(g=><button key={g.id} onClick={()=>update({game:g.id})} className={"lfg-game-chip "+(filters.game===g.id?"is-active":"")} aria-pressed={filters.game===g.id}>
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
   <label className="lfg-search"><span aria-hidden="true">⌕</span><span className="sr-only">Search players and games</span><input type="search" placeholder="Search players, games, modes..." value={filters.search} onChange={e=>update({search:e.target.value})} /></label>
   <label><span>REGION</span><select aria-label="Filter by region" value={filters.region} onChange={e=>update({region:e.target.value})}><option value={ALL_SQUADS}>Every region</option>{LFG_REGIONS.map(x=><option key={x}>{x}</option>)}</select></label>
   <label><span>PLAYSTYLE</span><select aria-label="Filter by playstyle" value={filters.vibe} onChange={e=>update({vibe:e.target.value})}><option value={ALL_SQUADS}>Any intensity</option>{LFG_VIBES.map(x=><option key={x}>{x}</option>)}</select></label>
   <label><span>SKILL</span><select aria-label="Filter by skill" value={filters.skill} onChange={e=>update({skill:e.target.value})}><option value={ALL_SQUADS}>Any skill</option>{LFG_SKILLS.map(x=><option key={x}>{x}</option>)}</select></label>
  </div>
  <div className="lfg-refinebar" aria-label="More squad filters">
   <label><span>YOUR PLATFORM</span><select aria-label="Filter by platform" value={filters.platform} onChange={e=>update({platform:e.target.value})}><option value={ALL_SQUADS}>Any platform</option>{LFG_PLATFORMS.map(x=><option key={x}>{x}</option>)}</select></label>
   <label><span>VOICE CHAT</span><select aria-label="Filter by microphone preference" value={filters.voice} onChange={e=>update({voice:e.target.value as SquadFilters["voice"]})}><option value="all">Any voice preference</option><option value="preferred">Mic preferred</option><option value="optional">Mic optional only</option></select></label>
   <label><span>OPEN SPOTS</span><select aria-label="Minimum open spots" value={filters.minSpots} onChange={e=>update({minSpots:Number(e.target.value)})}>{[1,2,3,4].map(n=><option value={n} key={n}>{n===1?"Any availability":n+" or more"}</option>)}</select></label>
   <label><span>SORT BY</span><select aria-label="Sort squad listings" value={filters.sort} onChange={e=>update({sort:e.target.value as SquadFilters["sort"]})}><option value="newest">Newest first</option><option value="openings">Most open spots</option><option value="oldest">Oldest first</option></select></label>
  </div>
  <div className="lfg-results-count" role="status"><span><b>{filtered.length.toString().padStart(2,"0")}</b> OPEN SQUADS FOUND</span><div className="lfg-filter-meta"><span>{activeFilters?activeFilters+" active "+(activeFilters===1?"filter":"filters"):"Showing real community listings"}</span><button className="lfg-clear" onClick={reset} disabled={activeFilters===0&&filters.sort==="newest"}>RESET FILTERS ↺</button></div></div>
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
