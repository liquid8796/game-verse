export const MATCHMAKING_GAME_IDS = ["valorant","fortnite","counter-strike-2","league-of-legends","minecraft","roblox","helldivers-2","sea-of-thieves","palworld","monster-hunter-wilds","no-mans-sky","ea-sports-fc-26","street-fighter-6"] as const;

export const LFG_REGIONS = ["North America", "Europe", "Asia", "Oceania", "South America", "Middle East / Africa"] as const;
export const LFG_PLATFORMS = ["PC", "PlayStation", "Xbox", "Switch", "Mobile", "Cross-play"] as const;
export const LFG_VIBES = ["Chill", "Balanced", "Competitive"] as const;
export const LFG_SKILLS = ["New / Learning", "Casual", "Intermediate", "Advanced", "High rank"] as const;
export type LfgVibe = (typeof LFG_VIBES)[number];

type CreateInput = {
 gameId: string; title: string; description: string; region: string;
 platform: string; mode: string; skill: string; vibe: string;
 slots: number; mic: boolean; gamerTag: string;
};
type ParseResult = { ok: true; value: CreateInput } | { ok: false; error: string };
const inList = (value:string, list:readonly string[]) => list.includes(value);
export function validateLfgPost(raw: Record<string,unknown>, allowedGames: readonly string[]): ParseResult {
 const get = (key:string) => typeof raw[key] === "string" ? (raw[key] as string).trim() : "";
 const gameId=get("gameId"),title=get("title"),description=get("description");
 const region=get("region"),platform=get("platform"),mode=get("mode"),skill=get("skill"),vibe=get("vibe"),gamerTag=get("gamerTag");
 const slots=Number(raw.slots),mic=raw.mic===true || raw.mic==="on";
 if(!allowedGames.includes(gameId)) return {ok:false,error:"Choose a supported game."};
 if(title.length<8 || title.length>78) return {ok:false,error:"Title needs 8–78 characters."};
 if(description.length<15 || description.length>450) return {ok:false,error:"Tell teammates a little about your session (15–450 characters)."};
 if(!inList(region,LFG_REGIONS) || !inList(platform,LFG_PLATFORMS) || !inList(skill,LFG_SKILLS) || !inList(vibe,LFG_VIBES)) return {ok:false,error:"Choose valid play preferences."};
 if(mode.length<2||mode.length>36) return {ok:false,error:"Enter a game mode (2–36 characters)."};
 if(!Number.isInteger(slots)||slots<1||slots>4) return {ok:false,error:"Choose 1–4 open spots."};
 if(gamerTag.length<3||gamerTag.length>64) return {ok:false,error:"Your game ID must be 3–64 characters."};
 return {ok:true,value:{gameId,title,description,region,platform,mode,skill,vibe,slots,mic,gamerTag}};
}
export function validateGamerTag(tag:string) {return tag.trim().length>=3&&tag.trim().length<=64;}

// Withdrawn squad requests can be retried, with a 24-hour anti-spam cooldown.
export function canRetryWithdrawnRequest(status:string,createdAt:Date,now=new Date()){
 return status==="withdrawn" && now.getTime()-createdAt.getTime()>=24*60*60*1000;
}
