import { describe,it,expect } from "vitest";
import {validateLfgPost} from "./validation";
const input={gameId:"valorant",title:"Need a duo for ranked",description:"Looking for a friendly player who communicates well.",region:"Asia",platform:"PC",mode:"Ranked",skill:"Intermediate",vibe:"Balanced",slots:1,mic:true,gamerTag:"Player#1234"};
describe("LFG listings",()=>{
 it("accepts an eligible session and exact supported game",()=>{const r=validateLfgPost(input,["valorant"]);expect(r.ok).toBe(true);if(r.ok)expect(r.value.slots).toBe(1)});
 it("rejects unknown games",()=>expect(validateLfgPost({...input,gameId:"wrong"},["valorant"]).ok).toBe(false));
 it("rejects excessive slots, unrecognized vibe and short messages",()=>{expect(validateLfgPost({...input,slots:5},["valorant"]).ok).toBe(false);expect(validateLfgPost({...input,vibe:"bot"},["valorant"]).ok).toBe(false);expect(validateLfgPost({...input,description:"hey"},["valorant"]).ok).toBe(false)});
});
