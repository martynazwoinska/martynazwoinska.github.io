const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
 const {wateringFrame:frame,showerPoint:point,SHOWER_DURATION}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/trivandrum-watering.js')));
 for(const male of [false,true]){
  const duration=male?4100:SHOWER_DURATION;
  let previous=frame(0,male);
  for(let ms=0;ms<=duration;ms+=10){
   const f=frame(ms,male);
   assert(Object.values(f).every(v=>typeof v==='boolean'||Number.isFinite(v)));
   assert(f.reach>=0&&f.reach<=1&&f.water>=0&&f.water<=1);
   if(!male&&f.water>0)assert.equal(f.rub,0,'No head rub before the stream stops');
   if(f.water>.3){assert(f.lift>.98,'Water only flows with the can raised');assert(f.reach>.98,'Hands support the can before water flows');}
   for(const key of ['reach','lift','turn','duck','rub','shake'])assert(Math.abs(f[key]-previous[key])<.15,'Continuous movement: '+key);
   for(const receiver of [false,true])assert.deepEqual(point(78,228,f,receiver),{x:78,y:228},'Tail remains planted');
   previous=f;
  }
  const end=frame(duration,male);assert(end.done);for(const key of ['reach','lift','turn','duck','rub','shake','water'])assert.equal(end[key],0,'Exact settling: '+key);
  const still=frame(150,male,true);assert.deepEqual(point(326,54,still,true),{x:326,y:54});assert.equal(still.phase,0);assert(frame(300,male,true).done);
 }
 assert(frame(2600).duck>.98,'Male ducks under the shower');
 assert(frame(4300).rub>.9,'Male rubs after the stream stops');assert.equal(frame(4050).water,0);
 assert.equal(frame(5700).rub,0,'Rubbing finishes before the shake');assert(Math.abs(frame(5700).shake)>.5);
 assert(point(326,54,frame(2600),true).y>90,'Visible head dip');
 assert.notDeepEqual(point(220,160,frame(2600),true),{x:220,y:160},'Middle of body deforms');
 console.log('PASS: grip before lift, pour before rub, rub before shake, smooth body movement, planted tails, exact restoration and reduced motion.');
})().catch(e=>{console.error(e);process.exitCode=1;});
