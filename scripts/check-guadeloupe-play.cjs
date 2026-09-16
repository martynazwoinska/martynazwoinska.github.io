const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
const moduleURL=file=>pathToFileURL(path.join(__dirname,'../game-of-worms',file));
(async()=>{
  const {createGuadeloupeSound}=await import(moduleURL('guadeloupe-play.js'));
  const {DANCE_DURATION,drumPhrase,bendPoint,wingAngle,handLift,pathPoints,bentPath}=await import(moduleURL('guadeloupe-dance.js'));
  let greatest=0,previous=null;
  for(let ms=0;ms<=DANCE_DURATION;ms+=10){
    for(const [x,y] of [[326,54],[340,58],[78,228]])assert.deepEqual(bendPoint(x,y,ms),{x,y},'Face and tail tip remain anchored');
    const p=bendPoint(190,180,ms);greatest=Math.max(greatest,Math.abs(p.x-190));
    if(previous)assert(Math.hypot(p.x-previous.x,p.y-previous.y)<2,'Continuous movement without pose jumps');
    previous=p;assert.deepEqual(bendPoint(190,180,ms,true),{x:190,y:180});assert.equal(wingAngle(ms,1,true),0);
  }
  assert(greatest>25,'Clearly visible bending through the middle');
  assert.deepEqual(bendPoint(190,180,0),{x:190,y:180});assert.deepEqual(bendPoint(190,180,DANCE_DURATION),{x:190,y:180});
  for(const male of [false,true]){
    const score=drumPhrase(male);assert.equal(score.length,12);assert.equal(new Set(score.map(h=>h.tone)).size,3);
    for(const [i,hit] of score.entries()){
      assert(hit.at>=(i?score[i-1].at+180:140));assert(hit.at+650<DANCE_DURATION);
      assert(Math.abs(handLift(hit.at,score,hit.hand))<1e-9,'Audible strikes land on hand contact');
      assert(handLift(hit.at-70,score,hit.hand)<-20,'Hand lifts before contact');
    }
  }
  assert.notDeepEqual(drumPhrase(true),drumPhrase(false),'Drummers play different phrases');
  const nodes=[];
  const element=tag=>({tag,attrs:{},children:[],setAttribute(k,v){this.attrs[k]=v;},append(n){this.children.push(n);}});
  global.document={createElementNS:(ns,tag)=>{const n=element(tag);nodes.push(n);return n;}};
  const {drawGuadeloupeCostume}=await import(moduleURL('guadeloupe-costumes.js'));
  const a=element('g'),b=element('g');drawGuadeloupeCostume(a,false);drawGuadeloupeCostume(b,true);
  assert.notDeepEqual(a.children,b.children);
  for(const n of nodes.filter(n=>'data-gua-flex' in n.attrs)){
    const points=pathPoints(n.attrs.d);assert(points.length>2);
    for(const ms of [0,300,700,1500,2600,DANCE_DURATION])assert(!/NaN|Infinity/.test(bentPath(points,ms)));
  }
  let fetched=0,active=0;const starts=[];
  const context={state:'running',currentTime:5,destination:{},resume:async()=>{},
    decodeAudioData:async()=>({duration:1,sampleRate:100,getChannelData:()=>Float32Array.from([0,0,0,.2,.8,.3,0])}),
    createGain:()=>({connect(){},disconnect(){},gain:{setValueAtTime(){},linearRampToValueAtTime(){}}}),
    createBufferSource(){let running=false;return {connect(){},disconnect(){},start(time,offset,duration){assert(offset>=0&&duration<=.65);running=true;active++;starts.push(time);},stop(){if(running){running=false;active--;this.onended?.();}}};}};
  global.window={AudioContext:function(){return context;}};
  global.fetch=async()=>{fetched++;return {ok:true,arrayBuffer:async()=>new ArrayBuffer(1)};};
  const sound=createGuadeloupeSound();assert.equal(fetched,0);
  await Promise.all([sound.prepare(),sound.prepare()]);assert.equal(fetched,3);assert.equal(starts.length,0);
  const score=drumPhrase(true);sound.phrase(score);
  assert.deepEqual(starts,score.map(h=>5+h.at/1000),'All twelve beats scheduled on the audio clock');
  sound.phrase(drumPhrase(false));assert.equal(active,12,'Role switching cancels all previous scheduled beats');
  sound.stop();assert.equal(active,0);await sound.prepare();assert.equal(fetched,3);
  context.state='suspended';assert.equal(sound.play('low'),false);context.state='running';
  global.fetch=async()=>({ok:false});const failed=createGuadeloupeSound();await failed.prepare();assert.equal(failed.play('low'),false);
  global.fetch=async()=>({ok:true,arrayBuffer:async()=>new ArrayBuffer(1)});await failed.prepare();assert(failed.play('low'));failed.stop();
  console.log('Guadeloupe: twelve-beat phrases, audio-clock scheduling, hand contact, anchored head/tail, smooth mid-body wave, reduced motion, flexible costume paths, cancellation and retry pass.');
})().catch(error=>{console.error(error);process.exitCode=1;});
