const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
  const {panamaFrame:frame}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/panama-play.js')));
  for(const kind of ['flower','bait'])for(const male of [false,true]){
    const duration=kind==='bait'?3800:kind==='flower'?2900:3200;
    const end=frame(duration,kind,male);
    assert(end.done);assert.equal(end.angle,0);assert.equal(end.fold,0);assert.equal(end.travel,0);assert.equal(end.power,0);
    for(let ms=0;ms<duration;ms+=25){
      const s=frame(ms,kind,male);
      assert(Object.values(s).every(v=>typeof v==='boolean'||Number.isFinite(v)));
      assert(s.fold>=0&&s.fold<=1&&s.travel>=0&&s.travel<=1);
      if(kind==='bait'&&ms>=1550)assert(s.served,'Receiving dish stays filled during return');
    }
    const reduced=frame(500,kind,male,true);assert.equal(reduced.angle,0);assert.equal(reduced.phase,0);assert.equal(reduced.fold,0);
    assert(frame(1000,kind,male,true).done);
  }
  assert.equal(frame(1550,'bait',true).travel,1,'Spoon reaches receiving dish before unloading');
  console.log('Panama actions: finite transforms, flower closure, spoon transfer and return, persistent serving and static reduced motion pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});
