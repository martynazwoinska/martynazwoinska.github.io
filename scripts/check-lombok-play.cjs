const assert=require('node:assert/strict');
const fs=require('node:fs');
const {pathToFileURL}=require('node:url');
(async()=>{
  const {figFrame,splashFrame,swimmingPath,interpolatePath,FIG,WATER}=await import(pathToFileURL(require('node:path').resolve('game-of-worms/lombok-play.js')));
  assert.equal(FIG,'lingsar-ficus-fruit-transformation');assert.equal(WATER,'hpt26-splashing-pool');
  const body='M78 228C122 280 173 255 181 203C188 151 225 105 278 113C330 121 355 82 326 54';
  // Negative coordinates in compact SVG paths also act as separators.
  // Replacing them with positive values must not join two separate numbers.
  assert.deepEqual(interpolatePath('M-1-2C-3-4-5-6-7-8Z',[1,2,3,4,5,6,7,8],1).match(/-?\d*\.?\d+/g).map(Number),[1,2,3,4,5,6,7,8]);
  for(const male of[false,true]){
    const hidden=figFrame(1800,false,male);assert.equal(hidden.curl,1);assert.equal(hidden.close,1);assert(hidden.done);
    const open=figFrame(2600,true,male);assert.equal(open.curl,0);assert.equal(open.close,0);assert(open.done);
    assert.equal(figFrame(0,false,male,true).done,true);assert.equal(figFrame(0,true,male,true).curl,0);
    for(let t=0;t<6100;t+=16){
      const s=splashFrame(t,male);for(const v of Object.values(s))if(typeof v==='number')assert(v>=0&&v<=1);
      const points=swimmingPath(body,s,male).match(/-?\d*\.?\d+/g).map(Number);
      assert.equal(points.length,20);assert(points.every(Number.isFinite));
      const reduced=splashFrame(t,male,true);assert.equal(reduced.dip,0);assert.equal(reduced.flick,0);assert.equal(reduced.duck,0);
      assert.deepEqual(swimmingPath(body,reduced,male).match(/-?\d*\.?\d+/g),body.match(/-?\d*\.?\d+/g));
    }
    assert.equal(splashFrame(6000,male).settle,0);
  }
  assert(figFrame(600,true,true).peek>.9);assert.equal(figFrame(600,true,false).peek,0);
  assert(splashFrame(1600,false).dip>.9);assert.equal(splashFrame(1600,true).dip,0);
  assert(splashFrame(3100,true).duck>.9);assert.equal(splashFrame(3100,false).duck,0);
  assert(splashFrame(4020,true).flick>.9);assert.equal(splashFrame(4020,false).flick,0);
  const dip=swimmingPath(body,splashFrame(1600,false)).match(/-?\d*\.?\d+/g).map(Number);
  assert(dip[19]>240);assert.equal(dip[1],228); // Head bends while the tail stays planted.
  const game=fs.readFileSync('game-of-worms/game.js','utf8');
  for(const text of['lombokPlay.start(piece)','lombokPlay.clear()','lombokPlay.cancel()','lombokPlay.active','lombokPlay.handles(piece)'])assert(game.includes(text));
  const play=fs.readFileSync('game-of-worms/lombok-play.js','utf8');
  for(const text of['pagehide','resize','visibilitychange',"reduced.addEventListener('change'",'token!==epoch'])assert(play.includes(text));
  // Worn art and visitor-owned scale/placement are never rewritten.
  assert(!play.includes('dataset.userScale'));assert(play.includes("n.setAttribute('style',v)"));
  assert(fs.existsSync('game-of-worms/assets/audio/lombok-splash.wav'));
  assert(play.includes('w.from.a,w.from.b,w.from.c,w.from.d')); // Pool size must not resize the worms.
  const {drawLombokSwim,swimLayouts}=await import(pathToFileURL(require('node:path').resolve('game-of-worms/lombok-swim-art.js')));
  class Element{constructor(tag){this.tag=tag;this.attrs={};this.children=[];this.dataset={};}setAttribute(k,v){this.attrs[k]=String(v);}appendChild(n){this.children.push(n);return n;}}
  global.document={createElementNS:(_,tag)=>new Element(tag)};
  const signatures=[];
  for(const male of[false,true]){const g=new Element('g');assert(drawLombokSwim(g,{family:'hpt26-swimming-goggles'},male));signatures.push(JSON.stringify(g));}
  assert.notEqual(...signatures);assert.equal(Object.keys(swimLayouts).length,2);
  const pool=new Element('g');assert(drawLombokSwim(pool,{family:WATER},false));
  assert(pool.children.some(n=>'data-lombok-pool-front'in n.attrs));assert(pool.children.some(n=>'data-lombok-pool-back'in n.attrs));
  const catalogue=fs.readFileSync('game-of-worms/accessory-designs.js','utf8');
  assert(catalogue.includes('"hpt26-splashing-pool"]'));assert(!catalogue.includes('lingsar-spring-collar'));assert(!catalogue.includes('lingsar-springwater-current'));
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
  assert(lombokClips.water.endsWith('/assets/audio/lombok-splash.wav'));
  let release;global.fetch=()=>new Promise(resolve=>{release=()=>resolve({ok:true,arrayBuffer:async()=>new ArrayBuffer(32)});});
  const late=createLombokSound(),pending=late.unlock('water');await Promise.resolve();late.stop();release();await pending;assert.equal(active,0);
  console.log('PASS: Lombok fig regression, bending/ducking/splash timelines, reduced motion and integration hooks');
  console.log('PASS: lazy audio, single voice, deduplicated loading and no playback after cancellation');
})().catch(e=>{console.error(e);process.exitCode=1;});
