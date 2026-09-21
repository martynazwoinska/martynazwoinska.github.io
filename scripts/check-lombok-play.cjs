const assert=require('node:assert/strict');
const fs=require('node:fs');
const {pathToFileURL}=require('node:url');
(async()=>{
  const {figFrame,seekerPath,interpolatePath,FIG}=await import(pathToFileURL(require('node:path').resolve('game-of-worms/lombok-play.js')));
  assert.equal(FIG,'lingsar-ficus-fruit-transformation');
  const body='M78 228C122 280 173 255 181 203C188 151 225 105 278 113C330 121 355 82 326 54';
  // Negative coordinates in compact SVG paths also act as separators.
  // Replacing them with positive values must not join two separate numbers.
  assert.deepEqual(interpolatePath('M-1-2C-3-4-5-6-7-8Z',[1,2,3,4,5,6,7,8],1).match(/-?\d*\.?\d+/g).map(Number),[1,2,3,4,5,6,7,8]);
  for(const male of[false,true]){
    const hidden=figFrame(4800,false,male);assert.equal(hidden.curl,1);assert.equal(hidden.close,1);assert(hidden.done);
    const open=figFrame(2800,true,male);assert.equal(open.curl,0);assert.equal(open.close,0);assert(open.done);
    assert.equal(figFrame(0,false,male,true).done,true);assert.equal(figFrame(0,true,male,true).curl,0);
    for(const opening of[false,true])for(let t=0;t<5000;t+=16){
      const f=figFrame(t,opening,male);for(const key of['curl','peek','approach','tap','recoil'])assert(f[key]>=0&&f[key]<=1);
      const reduced=figFrame(t,opening,male,true);assert.equal(reduced.approach,0);assert.equal(reduced.recoil,0);
    }
    assert.equal(figFrame(1800,false,male).approach,0,'Close before the seeker approaches');
    assert.equal(figFrame(3600,false,male).tap,1);assert.equal(figFrame(4170,false,male).tap,1);
    assert.equal(figFrame(600,true,male).peek,1);assert(figFrame(800,true,male).recoil>.9);
    assert.equal(figFrame(4750,false,male).tap,0);assert.equal(figFrame(2800,true,male).approach,0);
  }
  const bent=seekerPath(body,-150,80).match(/-?\d*\.?\d+/g).map(Number);
  assert.deepEqual(bent.slice(0,2),[78,228]);assert.deepEqual(bent.slice(-2),[176,134]);
  assert.equal(bent.length,20);assert(bent.every(Number.isFinite));
  const arch=seekerPath(body,-235,110,true,1).match(/-?\d*\.?\d+/g).map(Number);
  assert(arch.every(Number.isFinite));assert.deepEqual(arch.slice(-2),[91,164]);
  assert.deepEqual(seekerPath(body,-235,110,true,0).match(/-?\d*\.?\d+/g),body.match(/-?\d*\.?\d+/g));
  assert(arch[14]>arch[18]+100,'Broad arch keeps the neck separate from the torso');
  const game=fs.readFileSync('game-of-worms/game.js','utf8');
  for(const text of['lombokPlay.start(piece)','lombokPlay.clear()','lombokPlay.cancel()','lombokPlay.active','lombokPlay.handles(piece)'])assert(game.includes(text));
  const play=fs.readFileSync('game-of-worms/lombok-play.js','utf8');
  for(const text of['pagehide','resize','visibilitychange',"reduced.addEventListener('change'",'token!==epoch'])assert(play.includes(text));
  // Worn art and visitor-owned scale/placement are never rewritten.
  assert(!play.includes('dataset.userScale'));assert(play.includes("n.setAttribute('style',v)"));
  const {getAccessoryDesign}=await import(pathToFileURL(require('node:path').resolve('game-of-worms/accessory-designs.js')));
  const design=getAccessoryDesign('nigoni','Lombok, Indonesia · HPT26');
  assert.equal(design.headwear.family,"hpt26-leaf-fans");assert.equal(design.charm.family,"hpt26-butterflies");assert.equal(design.wrap.family,FIG);
  assert(getAccessoryDesign('elegans','Bristol N2, England').charm);
  assert(!play.includes('beginWater'));
  const {butterflyPoint}=await import(pathToFileURL(require('node:path').resolve('game-of-worms/lombok-flight.js')));
  for(const male of[false,true]){
    const home={x:male?145:402,y:male?124:74},points=[];
    assert.deepEqual(butterflyPoint(0,male,home),home);
    assert.deepEqual(butterflyPoint(1,male,home),home);
    for(let i=0;i<=1000;i++){
      const p=butterflyPoint(i/1000,male,home);points.push(p);
      assert(p.x>80&&p.x<530&&p.y>15&&p.y<290,'Free flight remains inside the scene, above its labels');
      if(i)assert(Math.hypot(p.x-points[i-1].x,p.y-points[i-1].y)<2,'No teleport between route segments');
    }
    assert(Math.max(...points.map(p=>p.x))-Math.min(...points.map(p=>p.x))>250,'Butterflies roam across the scene');
    const next=butterflyPoint(.0001,male,home),last=butterflyPoint(.9999,male,home);
    assert(Math.hypot((next.x-home.x)-(home.x-last.x),(next.y-home.y)-(home.y-last.y))<.002,'Repeated flight joins smoothly');
  }
  console.log('PASS: broad butterfly paths, safe bounds, return position and continuous loop');
  const {createLombokSound,lombokClips}=await import(pathToFileURL(require('node:path').resolve('game-of-worms/lombok-sound.js')));
  let requests=0,active=0,maximum=0,contexts=0;
  const ctx={state:'running',destination:{},resume:async()=>{},decodeAudioData:async()=>({duration:1.25}),
    createGain:()=>({gain:{value:0},connect(){},disconnect(){}}),createBufferSource(){let on=false;return{connect(){},disconnect(){},
      start(){on=true;active++;maximum=Math.max(maximum,active);},stop(){if(on){on=false;active--;this.onended?.();}}};}};
  global.window={AudioContext:function(){contexts++;return ctx;}};global.document={hidden:false};
  global.fetch=async()=>{requests++;return{ok:true,arrayBuffer:async()=>new ArrayBuffer(32)};};
  const sound=createLombokSound();assert.equal(sound.play('fig'),false);assert.equal(contexts,0);assert.equal(requests,0);
  assert((await Promise.all([sound.unlock('fig'),sound.unlock('fig')])).every(Boolean));assert.equal(requests,1);
  sound.play('fig');sound.play('fig');assert.equal(maximum,1);sound.stop();assert.equal(active,0);
  document.hidden=true;assert.equal(sound.play('fig'),false);document.hidden=false;
  assert.equal(sound.play('fig',.4,2000),false);assert.equal(active,0);
  assert(lombokClips.tap.endsWith('/assets/audio/nambucca-press-close.wav'));
  let release;global.fetch=()=>new Promise(resolve=>{release=()=>resolve({ok:true,arrayBuffer:async()=>new ArrayBuffer(32)});});
  const late=createLombokSound(),pending=late.unlock('tap');await Promise.resolve();late.stop();release();await pending;assert.equal(active,0);
  console.log('PASS: Lombok hide-and-seek roles, body bends, two taps, peek and return timelines, reduced motion and integration hooks');
  console.log('PASS: lazy audio, single voice, deduplicated loading and no playback after cancellation');
})().catch(e=>{console.error(e);process.exitCode=1;});
