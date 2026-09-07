const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
  const {wingFlightFrame}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/ishigaki-interactions.js')));
  for(const male of [false,true]) {
    for(let ms=0;ms<4200;ms+=16) {
      const s=wingFlightFrame(ms,male);
      for(const key of ['x','y','angle','beat'])assert(Number.isFinite(s[key]));
      assert(Math.abs(s.x)<=42 && s.y>=-53 && s.y<=0,'Flight stays close to its starting position');
      assert(Math.abs(s.beat)<=1,'Wing motion stays bounded');
      const r=wingFlightFrame(ms,male,true);
      for(const key of ['x','y','angle','beat'])assert.equal(r[key],0,'Reduced motion is stationary');
    }
    const end=wingFlightFrame(4200,male);
    assert(end.done);
    for(const key of ['x','y','angle','beat'])assert(Math.abs(end[key])<1e-10,'Returns to the original pose');
  }
  assert.notDeepEqual(wingFlightFrame(1200),wingFlightFrame(1200,true));
  console.log('Ishigaki: distinct bounded flights, exact return and stationary reduced motion pass.');
})().catch(error=>{console.error(error);process.exitCode=1;});
