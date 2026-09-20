const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
 const {duetScore,duetFrame,shakerScore,shakerFrame,DUET_DURATION,LEAD_IN,BEAT,createDuetSound}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/tenerife-duet.js')));
 const {bodyPoint}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/scene-performance.js')));
 for(const leader of ['primary','companion']){
  const score=duetScore(leader),reply=leader==='primary'?'companion':'primary';
  assert(score.filter(e=>e.section==='call').every(e=>e.part===leader));
  assert(score.filter(e=>e.section==='answer').every(e=>e.part===reply));
  assert(score.filter(e=>e.section==='answer').every(e=>e.at>=LEAD_IN+4*BEAT));
  const ending=score.filter(e=>e.section==='finish');assert.equal(ending.length,2);assert.equal(ending[0].at,ending[1].at);
  for(const e of score)assert.equal(Math.abs(duetFrame(e.at,e.part,score).sweep),0,'Hand crosses strings at the scheduled sound attack');
  for(const part of ['primary','companion']){
   let previous=duetFrame(0,part,score);
   for(let ms=5;ms<=DUET_DURATION;ms+=5){
    const f=duetFrame(ms,part,score);
    assert(Math.abs(f.bend-previous.bend)<.1,'Continuous body bend');
    assert(Math.abs(f.look-previous.look)<.1,'Continuous head movement');
    assert(Math.abs(f.sweep-previous.sweep)<15,'No hand teleport between strokes');
    assert.deepEqual(bodyPoint(78,228,f.bend,f.look),{x:78,y:228},'Planted tail');
    previous=f;
   }
   const end=duetFrame(DUET_DURATION,part,score);assert.equal(end.env,0);assert.equal(Math.abs(end.bend),0);assert.equal(Math.abs(end.look),0);
  }
 }
 const percussion=shakerScore();
 assert(percussion.filter(e=>e.part==='companion').every(e=>e.key==='shaker'),'Male never plays two instruments at once');
 assert(percussion.filter(e=>e.part==='primary').every(e=>!e.key),'Primary supplies strings');
 assert.equal(shakerFrame(650).park,1);assert.equal(shakerFrame(650).lift,0,'Timple is down before the shaker rises');
 assert.equal(shakerFrame(1600).lift,1);assert.equal(shakerFrame(DUET_DURATION).park,0);assert.equal(shakerFrame(DUET_DURATION).lift,0);
 for(const e of percussion.filter(e=>e.key==='shaker'))assert(Math.abs(Math.abs(shakerFrame(e.at).shake)-1)<1e-9,'Rattle lands on each change of direction');
 // Check actual scheduling, leading-silence trimming and cancellation of future notes.
 let clock=20;const starts=[],stops=[],levels=[];
 const param=()=>({value:0,setValueAtTime(v,t){levels.push([v,t]);},linearRampToValueAtTime(v,t){levels.push([v,t]);},cancelScheduledValues(){},setTargetAtTime(){}});
 const node=()=>({connect(){},disconnect(){}});
 global.window={AudioContext:class{
  get currentTime(){return clock;}state='running';destination={};
  async resume(){}async decodeAudioData(){const d=new Float32Array(1000);d.fill(.5,100);return{duration:1,length:1000,sampleRate:1000,numberOfChannels:1,getChannelData:()=>d};}
  createBufferSource(){return{...node(),start(...args){starts.push(args);},stop(t){stops.push(t);}};}
  createGain(){return{...node(),gain:param()};}createStereoPanner(){return{...node(),pan:param()};}createBiquadFilter(){return{...node(),frequency:param()};}
 }};
 global.fetch=async()=>({ok:true,arrayBuffer:async()=>new ArrayBuffer(1)});
 const sound=createDuetSound();await sound.prepare();const score=duetScore();sound.start(score);
 assert.equal(starts.length,score.length);
 starts.forEach(([when,offset,duration],i)=>{assert.equal(when,20+score[i].at/1000);assert.equal(offset,.097);assert(duration>0&&offset+duration<=1);});
 clock=21.25;assert.equal(sound.elapsed(),1250);sound.stop();assert.equal(stops.length,starts.length);assert(stops.every(t=>t===21.29));
 starts.length=0;stops.length=0;await sound.prepare(true);sound.start(percussion);assert.equal(starts.length,percussion.length);sound.stop();assert.equal(stops.length,percussion.length);
 console.log('Tenerife duet: alternating roles, shared finish, smooth motion, planted tails, exact stroke/audio timing and future-note cancellation pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});
