const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
  const {wateringFrame:frame}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/trivandrum-watering.js')));
  for(const male of [false,true]){
    const duration=male?3600:4200;
    assert.equal(frame(0,male).water,0);
    assert.equal(frame(0,male).reach,0);
    assert.equal(frame(duration,male).angle,0);
    assert(frame(duration,male).done);
    for(let ms=0;ms<=duration;ms+=20){
      const s=frame(ms,male);
      assert(Object.values(s).every(v=>typeof v==='boolean'||Number.isFinite(v)));
      assert(s.reach>=0&&s.reach<=1&&s.water>=0&&s.water<=1);
      if(s.water>.3)assert(s.reach>.8,'Water starts after the can is raised');
    }
    assert(frame(1000,male,true).done);
    assert.equal(frame(500,male,true).phase,0,'Reduced-motion water is still');
  }
  assert.notEqual(frame(1400,true).water,frame(1400,false).water,'Different pouring rhythms');
  console.log('Trivandrum watering: lift before pour, distinct rhythms, exact return, finite frames and reduced motion pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});
