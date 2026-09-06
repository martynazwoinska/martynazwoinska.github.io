const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
  const {gongScore,gongMotion,createBaliGongs,GONG_FAMILY}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/bali-gongs.js')));
  for(const male of [false,true])for(const hit of gongScore(male)) {
    for(let t=0;t<4000;t+=13) {
      assert(Object.values(gongMotion(t,male,hit.index)).every(Number.isFinite));
      assert.deepEqual(gongMotion(t,male,hit.index,true),{x:0,y:0,vibration:0});
    }
    assert.equal(gongMotion(0,male,hit.index).x,0);
    assert.equal(gongMotion(4000,male,hit.index).x,0);
    assert(Math.abs(gongMotion(hit.at,male,hit.index).x)>10);
  }
  let clock=0, next=0, callbacks=new Map(), audioCreated=0, starts=0, stops=0;
  global.performance={now:()=>clock};
  global.requestAnimationFrame=cb=>{callbacks.set(++next,cb);return next;};
  global.cancelAnimationFrame=id=>callbacks.delete(id);
  const events={}, media={matches:false,addEventListener:(type,cb)=>{events.reduced=cb;}};
  const param=()=>({value:0,setValueAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(v){assert(v>0);},cancelScheduledValues(){},setTargetAtTime(){}});
  class Audio {
    constructor(){audioCreated++;this.currentTime=0;this.state='running';this.destination={};}
    resume(){return Promise.resolve();}
    createGain(){return {gain:param(),connect(){},disconnect(){}};}
    createOscillator(){return {frequency:param(),connect(){},disconnect(){},start(){starts++;},stop(){stops++;}};}
  }
  global.window={AudioContext:Audio,matchMedia:()=>media,addEventListener:(type,cb)=>{events[type]=cb;}};
  global.document={hidden:false,addEventListener:(type,cb)=>{events[type]=cb;}};
  const node=()=>({transform:null,getAttribute(){return this.transform;},setAttribute(k,v){this.transform=v;},removeAttribute(){this.transform=null;}});
  const piece=male=>({dataset:{accessoryFamily:GONG_FAMILY,wormPart:male?'companion':'primary'},isConnected:true,hidden:false,
    nodes:Array.from({length:male?4:2},node),closest(){return this.hidden?{}:null;},querySelectorAll(s){return s.includes('mallet')?this.nodes.slice(0,this.nodes.length/2):this.nodes.slice(this.nodes.length/2);}});
  const advance=t=>{clock=t;const pending=[...callbacks.values()];callbacks.clear();pending.forEach(cb=>cb(t));};
  const controller=createBaliGongs({}), large=piece(false), small=piece(true);
  assert.equal(audioCreated,0,'No audio on page load');
  assert.equal(controller.start({dataset:{}}),false);
  assert(controller.start(large));await Promise.resolve();
  assert.equal(starts,6);advance(180);assert(large.nodes[0].transform.includes('-81'));
  controller.cancel();assert(large.nodes.every(n=>n.transform===null));assert.equal(callbacks.size,0);
  assert(controller.start(small));await Promise.resolve();assert.equal(starts,18);
  small.hidden=true;advance(200);assert(!small.dataset.gongPlaying);assert(small.nodes.every(n=>n.transform===null));
  small.hidden=false;controller.start(small);controller.cancel();await Promise.resolve();assert.equal(starts,18,'Cancelled resume cannot play');
  controller.start(large);await Promise.resolve();document.hidden=true;events.visibilitychange();assert(!large.dataset.gongPlaying);
  document.hidden=false;controller.start(large);media.matches=true;events.reduced();assert(!large.dataset.gongPlaying);
  window.AudioContext=undefined;
  const silent=createBaliGongs({});assert(silent.start(small));advance(9000);assert(!small.dataset.gongPlaying);
  assert(stops>=starts);
  console.log('Bali gongs: distinct scores, bounded sound, gesture-only audio, exact restoration, reduced motion, hidden/cancel/resume and silent fallback passed.');
})().catch(error=>{console.error(error);process.exitCode=1;});
