import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCurrentUser } from "@/features/auth/lib/session";
import { getGameArtwork } from "@/features/games/lib/game-artwork";
import { PlayerFinder } from "@/features/matchmaking/player-finder";
import { listOpenLfgPosts } from "@/features/matchmaking/repository";
import { MATCHMAKING_GAME_IDS } from "@/features/matchmaking/validation";
import { getAllGames } from "@/server/queries/content";

export const dynamic="force-dynamic";
export const metadata:Metadata={
 title:"Find Players & Matchmaking — Build Your Squad",
 description:"Find players for VALORANT, Fortnite, Counter-Strike 2, League of Legends and more. Filter team requests by game, region, rank and playstyle.",
 alternates:{canonical:"/find-players"},
};
export default async function FindPlayersPage({searchParams}:{searchParams:Promise<{notice?:string;game?:string}>}){
 const [posts,rawGames,member,query]=await Promise.all([listOpenLfgPosts(),getAllGames(),getCurrentUser(),searchParams]);
 const games=rawGames.filter(g=>g.status!=="upcoming"&&MATCHMAKING_GAME_IDS.some(id=>id===g.id)).map(g=>({id:g.id,title:g.title,slug:g.slug,image:getGameArtwork(g.slug)?.src}))
 .sort((a,b)=>{const order=["valorant","fortnite","counter-strike-2","league-of-legends","minecraft","roblox"];return (order.indexOf(a.id)<0?100:order.indexOf(a.id))-(order.indexOf(b.id)<0?100:order.indexOf(b.id))});
 const highlights=games.filter(g=>["valorant","fortnite","counter-strike-2"].includes(g.slug));
 return <main id="main" className="lfg-root">
  <section className="lfg-hero">
   <div className="lfg-orb lfg-orb-a" aria-hidden="true" /><div className="lfg-orb lfg-orb-b" aria-hidden="true"/>
   <div className="shell lfg-hero-content">
    <div className="lfg-hero-left">
     <div className="lfg-micro"><span className="lfg-live-light"/> GAMEVERSE / SQUAD FINDER — OPEN FOR PLAYERS</div>
     <h1>GOOD GAMES.<br/><em>BETTER</em><br/>TEAMMATES<span className="lfg-period">.</span></h1>
     <p>Skip the endless solo queue. Find players who match your game, region and vibe. Post your squad. Build a team worth keeping.</p>
     <div className="lfg-hero-ctas"><Link className="lfg-action lfg-action-primary" href="#listings">FIND TEAMMATES <span>↓</span></Link><Link className="lfg-action lfg-action-outline" href="/find-players/new">CREATE YOUR SQUAD <span>↗</span></Link></div>
     <div className="lfg-hero-proof"><span><b>{games.length.toString().padStart(2,"0")}</b> GAMES ON THE BOARD</span><span><b>{posts.length.toString().padStart(2,"0")}</b> OPEN SQUADS</span><span>NO FAKE ONLINE COUNTS</span></div>
    </div>
    <div className="lfg-visual" aria-hidden="true">
     <div className="lfg-visual-grid"/>
     <div className="lfg-radar"><span className="lfg-radar-center">GV<i>◆</i></span><span className="lfg-radar-cross h"/><span className="lfg-radar-cross v"/></div>
     {highlights.map((g,i)=><div className={"lfg-visual-tile lfg-visual-tile-"+i} key={g.id}>
      {g.image&&<Image src={g.image} alt="" fill sizes="220px" />}
      <span>{g.title}</span></div>)}
     <span className="lfg-visual-corner">SEARCHING FOR YOUR NEXT SQUAD // GAMEVERSE</span>
     <span className="lfg-visual-coord">LFG / PLAYER NETWORK<br/>MATCH BY PREFERENCES</span>
    </div>
   </div>
   <div className="shell lfg-hero-footer"><span>01 / DISCOVER PLAYERS</span><span>02 / REQUEST TO JOIN</span><span>03 / PLAY TOGETHER</span></div>
  </section>
  <section className="shell lfg-workspace" aria-label="Squad listings and filters">
   {query.notice&&<div className="lfg-notice" role="status">{query.notice}</div>}
   <PlayerFinder posts={posts} games={games} memberId={member?.id} initialGame={query.game}/>
  </section>
  <section className="lfg-bottom-cta"><div className="shell lfg-bottom-grid"><div><span className="lfg-micro">SQUAD PROTOCOL / READY</span><h2>STOP QUEUING <em>ALONE.</em></h2><p>Your game, your rules. Create a listing and let compatible players find you. Every application is reviewed by the squad owner.</p></div><div><Link href="/find-players/new" className="lfg-action lfg-action-primary">BUILD YOUR SQUAD ↗</Link><Link href="/find-players/manage" className="lfg-action lfg-action-outline">MY SQUADS & REQUESTS →</Link></div></div></section>
 </main>;
}
