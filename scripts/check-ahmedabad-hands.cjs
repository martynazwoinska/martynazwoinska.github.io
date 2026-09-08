const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
  const {ahmedabadFrame:frame,ahmedabadReach:reach,ahmedabadDiggingOffsets:offsets}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/ahmedabad-hands.js')));
  assert.deepEqual(offsets(),{body:35,reel:80});
  assert.deepEqual(offsets(true),{body:95,reel:120});
  assert(offsets(true).body*.43<45,'Male digging drop stays above the primary tail and labels');
  assert(offsets().reel*.65<55,'Parked primary reel stays near the body');
  assert.deepEqual(reach(1,true),{x:-13,y:8,guide:.12,spread:0},'Male reach unchanged');
  assert.equal(reach(0).x+reach(0).y,0,'Exact reel return');
  assert(reach(1).guide>reach(0).guide*2,'Guiding hand travels along the tether');
  assert(Math.hypot(reach(1).x,reach(1).y)>40,'Larger reel gesture');
  assert(reach(1).spread>reach(0).spread,'Elbows open during the pull');
  // Default primary reel starts at body y=210 and is drawn at 0.65 scale.
  // At the raised pose its grip must clear both shoulder heights, not just move sideways.
  const peak=Math.max(...Array.from({length:331},(_,i)=>frame(i*10,'kite').pull));
  assert(210+.65*reach(peak).y<152,'Reel hand rises above the upper shoulder');
  assert(210+.65*reach(.35).y<152,'Raised pose remains readable beyond the brief peak');
  for(let ms=0;ms<=3300;ms+=10)assert(Object.values(reach(frame(ms,'kite').pull)).every(Number.isFinite));
  for(const male of [false,true]) {
    for(const kind of ['kite','soil']) {
      const duration=kind==='kite'?3300:male?4700:4300;
      const contacts=new Set();let maxPull=0;
      for(let ms=0;ms<=duration;ms+=10) {
        const state=frame(ms,kind,male);
        assert(Object.values(state).every(v=>typeof v==='boolean'||Number.isFinite(v)));
        assert(state.pickup>=0&&state.pickup<=1);
        maxPull=Math.max(maxPull,state.pull);
        if(state.scoop>.06)contacts.add(state.cycle);
        if(ms<duration)assert(!state.done);
      }
      assert(frame(duration,kind,male).done);
      if(kind==='kite'){assert(maxPull>.75);assert.equal(frame(duration,kind,male).pull,0);}
      else assert.equal(contacts.size,male?2:1,'Distinct number of soil contacts');
      const still=frame(0,kind,male,true);
      assert(still.done);assert.equal(still.pull+still.angle+still.down,0);
    }
  }
  const {createAhmedabadAudio}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/ahmedabad-audio.js')));
  let opened=0,started=0,stopped=0,disconnected=0;
  const param=()=>({value:0,setValueAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){}});
  const node=()=>({connect(){},disconnect(){disconnected++;}});
  class Audio {
    constructor(){opened++;this.state='running';this.currentTime=0;this.sampleRate=8000;this.destination={};}
    resume(){return Promise.resolve();}
    createBuffer(channels,length){assert.equal(channels,1);return {getChannelData:()=>new Float32Array(length)};}
    createBufferSource(){return {...node(),start(){started++;},stop(){stopped++;this.onended?.();}};}
    createBiquadFilter(){return {...node(),frequency:param(),Q:param()};}
    createGain(){return {...node(),gain:param()};}
  }
  global.window={AudioContext:Audio};global.document={hidden:false};
  const sound=createAhmedabadAudio();assert.equal(opened,0,'No automatic audio context');
  sound.play('wind');assert.equal(started,0);
  sound.unlock();assert.equal(opened,1);
  for(const kind of ['wind','click','soil'])sound.play(kind,true);
  assert.equal(started,3);assert.equal(disconnected,9);
  document.hidden=true;sound.play('soil');assert.equal(started,3);
  sound.cancel();assert(stopped>=3);
  console.log('Ahmedabad: kite return, one/two scoops, reduced-motion still state, gesture-only sound and audio cleanup passed.');
})().catch(e=>{console.error(e);process.exitCode=1;});
