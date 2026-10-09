import type { Metadata } from "next";
import Link from "next/link";
import { requireCurrentUser } from "@/features/auth/lib/session";
import { createLfgPostAction } from "@/features/matchmaking/actions";
import { LFG_REGIONS, LFG_PLATFORMS, LFG_SKILLS, LFG_VIBES, MATCHMAKING_GAME_IDS } from "@/features/matchmaking/validation";
import { getAllGames } from "@/server/queries/content";
export const metadata:Metadata={title:"Create a Squad — Find Players",robots:{index:false}};
export const dynamic="force-dynamic";
export default async function NewSquadPage({searchParams}:{searchParams:Promise<{notice?:string;game?:string}>}){
 await requireCurrentUser("/find-players/new");
 const [games,params]=await Promise.all([getAllGames(),searchParams]);
 const live=games.filter(g=>g.status!=="upcoming"&&MATCHMAKING_GAME_IDS.some(id=>id===g.id));
 return <main id="main" className="lfg-root"><div className="shell lfg-inner-page">
  <Link href="/find-players" className="lfg-back">← BACK TO SQUAD FINDER</Link>
  <div className="lfg-page-heading"><span className="lfg-micro">NEW LISTING / SQUAD PROTOCOL</span><h1>CALL IN YOUR <em>SQUAD.</em></h1><p>Set up a public team request. Players can apply with their in-game ID; only you can review it. Listings close automatically after seven days.</p></div>
  {params.notice&&<p className="lfg-notice" role="alert">{params.notice}</p>}
  <form action={createLfgPostAction} className="lfg-create-form">
   <div className="lfg-form-head"><span>01 / THE GAME</span><span>PUBLIC LISTING</span></div>
   <div className="lfg-form-grid">
    <label>GAME *<select name="gameId" defaultValue={params.game&&live.some(g=>g.id===params.game)?params.game:""} required><option value="" disabled>Choose a multiplayer game</option>{live.map(g=><option value={g.id} key={g.id}>{g.title}</option>)}</select></label>
    <label>MODE *<input name="mode" placeholder="Ranked / Zero Build / Duo ..." minLength={2} maxLength={36} required/></label>
    <label>REGION *<select name="region" required defaultValue="Asia">{LFG_REGIONS.map(x=><option key={x}>{x}</option>)}</select></label>
    <label>PLATFORM *<select name="platform" required>{LFG_PLATFORMS.map(x=><option key={x}>{x}</option>)}</select></label>
    <label>SKILL LEVEL *<select name="skill" required defaultValue="Intermediate">{LFG_SKILLS.map(x=><option key={x}>{x}</option>)}</select></label>
    <label>PLAYSTYLE *<select name="vibe" required defaultValue="Balanced">{LFG_VIBES.map(x=><option key={x}>{x}</option>)}</select></label>
    <label>OPEN SPOTS *<select name="slots" required defaultValue="1">{[1,2,3,4].map(x=><option value={x} key={x}>{x} {x===1?"player":"players"}</option>)}</select></label>
    <label>YOUR IN-GAME ID *<input name="gamerTag" placeholder="Your ID / tag" minLength={3} maxLength={64} required/><small>Only shown to players you accept, not in the public listing.</small></label>
    <label className="lfg-form-full">SQUAD TITLE *<input name="title" placeholder="Looking for a chill ranked duo tonight" minLength={8} maxLength={78} required /></label>
    <label className="lfg-form-full">WHAT ARE YOU LOOKING FOR? *<textarea name="description" rows={5} placeholder="Tell players about your schedule, game mode, approach and expectations." minLength={15} maxLength={450} required/></label>
    <label className="lfg-form-checkbox"><input type="checkbox" name="mic"/><span>Microphone preferred for this session</span></label>
   </div>
   <div className="lfg-form-end"><div><strong>YOUR SQUAD. YOUR RULES.</strong><p>Applications are private to you. Max 3 active posts, 7-day expiry.</p></div><button className="lfg-action lfg-action-primary" type="submit">PUBLISH LISTING ↗</button></div>
  </form>
 </div></main>;
}
