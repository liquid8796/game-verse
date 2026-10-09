import { describe,it,expect } from "vitest";
import {validateLfgPost,canRetryWithdrawnRequest} from "./validation";
const input={gameId:"valorant",title:"Need a duo for ranked",description:"Looking for a friendly player who communicates well.",region:"Asia",platform:"PC",mode:"Ranked",skill:"Intermediate",vibe:"Balanced",slots:1,mic:true,gamerTag:"Player#1234"};
describe("LFG listings",()=>{
 it("accepts an eligible session and exact supported game",()=>{const r=validateLfgPost(input,["valorant"]);expect(r.ok).toBe(true);if(r.ok)expect(r.value.slots).toBe(1)});
 it("rejects unknown games",()=>expect(validateLfgPost({...input,gameId:"wrong"},["valorant"]).ok).toBe(false));
 it("rejects excessive slots, unrecognized vibe and short messages",()=>{expect(validateLfgPost({...input,slots:5},["valorant"]).ok).toBe(false);expect(validateLfgPost({...input,vibe:"bot"},["valorant"]).ok).toBe(false);expect(validateLfgPost({...input,description:"hey"},["valorant"]).ok).toBe(false)});
});

describe("withdrawn squad request retry",()=>{
 const now=new Date("2026-10-09T10:00:00Z");
 it("allows a withdrawn request to be retried after 24 hours",()=>{
  expect(canRetryWithdrawnRequest("withdrawn",new Date("2026-10-08T10:00:00Z"),now)).toBe(true);
 });
 it("rejects early, declined and accepted retries",()=>{
  expect(canRetryWithdrawnRequest("withdrawn",new Date("2026-10-09T09:00:00Z"),now)).toBe(false);
  expect(canRetryWithdrawnRequest("declined",new Date("2026-10-01T00:00:00Z"),now)).toBe(false);
  expect(canRetryWithdrawnRequest("accepted",new Date("2026-10-01T00:00:00Z"),now)).toBe(false);
 });
});
