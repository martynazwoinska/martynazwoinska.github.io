const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
const fs=require('node:fs');
(async()=>{
  const {ahmedabadFrame:frame,ahmedabadReach:reach,ahmedabadDiggingOffsets:offsets,ahmedabadDiggingPlacement:placement,ahmedabadHandoff:handoff}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/ahmedabad-hands.js')));
  for(const male of [false,true]) {
    const digging=Object.freeze({shiftX:male?-75:66,shift:male?280:97,rotation:2.8,reelY:offsets(male).reel,pull:0,angle:24,down:.9,drift:0,soil:1});
    const flying=Object.freeze({shiftX:0,shift:0,rotation:-.3,reelY:0,pull:.2,angle:0,down:0,drift:0,soil:0});
    assert.deepEqual(handoff(digging,flying,frame(0,'kite',male).pickup),digging,'No reset on the first kite frame');
    for(let ms=0;ms<=650;ms+=10) {
      const pose=handoff(digging,flying,frame(ms,'kite',male).pickup);
      for(const key of Object.keys(pose)) {
        assert(Number.isFinite(pose[key]));
        assert(pose[key]>=Math.min(digging[key],flying[key])-1e-9&&pose[key]<=Math.max(digging[key],flying[key])+1e-9,'No overshoot');
      }
      // Repeated taps and reverse handoffs begin at the rendered intermediate pose.
      assert.deepEqual(handoff(pose,digging,0),pose);
      assert.deepEqual(handoff(pose,flying,0),pose);
    }
    const mid=handoff(digging,flying,.5);
    assert(mid.shift>0&&mid.shift<digging.shift,'A visible intermediate body position');
    for(const key of Object.keys(flying))assert(Math.abs(handoff(digging,flying,1)[key]-flying[key])<1e-9);
    assert.deepEqual(handoff(digging,flying,frame(0,'kite',male,true).pickup),flying,'Reduced motion uses the destination without travel');
  }
  const game=fs.readFileSync(path.join(__dirname,'../game-of-worms/game.js'),'utf8');
  const pointerdown=game.slice(game.indexOf('piece.addEventListener("pointerdown"'),game.indexOf('piece.addEventListener("keydown"'));
  assert.match(pointerdown,/if \(ahmedabadHands.active && !ahmedabadHands.handles\(piece\)\) ahmedabadHands.cancel\(\)/,'Pointer taps preserve the existing controller');
  const finish=game.slice(game.indexOf('function finishAccessoryDrag'),game.indexOf('function moveActiveAccessoryPointer'));
  assert.match(finish,/if \(moved \|\| !ahmedabadHands.handles\(piece\) && !panamaPlay.handlesLeaf\(piece\)\) moveAccessory/,'Taps do not re-clamp an animated prop');
  const drag=game.slice(game.indexOf('function moveActiveAccessoryPointer'),game.indexOf('function turnTelescopeFocus'));
  assert.match(drag,/ahmedabadHands.handles\(piece\).*<=6\) return/,'Small finger movement is not a drag/reset');
  const toggle=game.slice(game.indexOf('function toggleAccessory'),game.indexOf('function syncAccessories'));
  assert.match(toggle,/if \(!els.habitat.querySelector\("\.ahmedabad-af16-accessory"\)\) ahmedabadHands.clear/,'Enabling a tool leaves Ahmedabad poses intact');
  assert.deepEqual(offsets(),{reel:80});
  const hands=fs.readFileSync(path.join(__dirname,'../game-of-worms/ahmedabad-hands.js'),'utf8');
  assert.match(hands,/toggleAttribute\('data-ahmedabad-grounded'.*entry.pose.soil>\.01/,'Labels clear the work area through the full digging-to-kite handoff');
  assert.match(hands,/removeAttribute\('data-ahmedabad-grounded'\)/,'Scene changes restore normal label visibility');
  assert.deepEqual(offsets(true),{reel:120});
  for(const width of [288,345,520,724,920])for(const top of [-300,0,750])for(const male of [false,true]) {
    const scene={left:37,top,width,height:width*430/600};
    const floor=Math.min(scene.height*.88,scene.height-40);
    for(const bottom of [.40,.65,.96])for(const scale of [.65,1,1.6]) {
      const body={left:scene.left+width*.22,bottom:top+scene.height*bottom,width:width*(male?.20:.45)*scale};
      const p=placement(scene,body,male);
      assert(Object.values(p).every(Number.isFinite));
      assert(Math.abs(body.bottom+p.y-(top+floor))<1e-9,'Body reaches the foreground regardless of starting height');
      assert(scene.height-floor>=40,'Keep a phone-sized clearance above the location label');
      assert(Math.abs(body.left+p.x-(scene.left+width*(male?.13:.40)))<1e-9,'Distinct working lanes');
      assert.equal(p.soilX,scene.left+width*(male?.40:.67),'Separate blade targets stay inside the brown soil, away from the stone steps');
      assert.equal(p.soilY,top+scene.height*.90,'Blade contact stays below the paving on phones and desktops');
      assert(p.soilY>top+scene.height*.82,'Label clearance must never pull the blade onto the paving');
      const moved=placement(scene,{...body,left:body.left+width*.2,bottom:body.bottom-scene.height*.3},male);
      assert.equal(moved.soilX,p.soilX,'Dragging and resizing cannot move the digging site off the soil');
      assert.equal(moved.soilY,p.soilY);
      assert.equal(placement(scene,{...body,left:body.left+p.x,bottom:body.bottom+p.y},male).y,0,'Grounding does not accumulate on replay');
    }
  }
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
  for(const kind of ['wind','click'])sound.play(kind,true);
  assert.equal(started,2);assert.equal(disconnected,6);
  sound.play('soil');assert.equal(started,2,'No synthetic substitute for unloaded digging audio');
  document.hidden=true;sound.play('wind');assert.equal(started,2);
  sound.cancel();assert(stopped>=2);
  console.log('Ahmedabad: continuous dig/kite handoffs, repeated taps, responsive soil lanes, kite return, one/two scoops, reduced motion, gesture-only sound and audio cleanup passed.');
})().catch(e=>{console.error(e);process.exitCode=1;});
