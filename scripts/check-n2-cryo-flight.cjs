const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
  const {cryoFrame}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/n2-cryo-flight.js')));
  for(const male of [false,true]) {
    for(let t=0;t<9000;t+=17) {
      const s=cryoFrame(t,male);
      for(const key of ['x','y','angle','frost','thrust'])assert(Number.isFinite(s[key]));
      assert(s.frost>=0&&s.frost<=1);assert(s.thrust>=0&&s.thrust<=1);
      const reduced=cryoFrame(t,male,true);
      assert.equal(reduced.x,0);assert.equal(reduced.y,0);assert.equal(reduced.angle,0);assert.equal(reduced.thrust,0);
    }
    const end=cryoFrame(8200,male);
    assert.deepEqual([end.x,end.y,end.angle,end.frost,end.thrust],[0,0,0,0,0]);
    assert(end.done);assert(!end.frozen);
    assert(cryoFrame(3700,male).x>1000,'Both worms leave the scene');
    const delay=male?280:0;
    const arrival=cryoFrame(4100+delay,male);
    assert(arrival.x < -1000 && arrival.y > 700,'Return begins off-screen at lower-left');
    for(let t=4150+delay;t<6050+delay;t+=50) {
      const a=cryoFrame(t,male),b=cryoFrame(t+1,male);
      assert(b.x>a.x && b.y<a.y,'Return travels up and right');
      const radians=a.angle*Math.PI/180;
      const headX=248*Math.cos(radians)+174*Math.sin(radians);
      const headY=248*Math.sin(radians)-174*Math.cos(radians);
      assert((b.x-a.x)*headX+(b.y-a.y)*headY>0,'Head leads the return flight');
    }
    assert(cryoFrame(1400,male).frost>.95,'Freezing precedes departure');
  }
  assert.notDeepEqual(cryoFrame(6300,false),cryoFrame(6300,true),'Independent landing timing');
  console.log('N2 flight: upper-right exit, lower-left head-first return, exact restoration, distinct landings and stationary reduced motion.');
})().catch(e=>{console.error(e);process.exitCode=1;});
