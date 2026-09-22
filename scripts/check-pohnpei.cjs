const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {pathToFileURL}=require('node:url');
const moduleAt=name=>import(pathToFileURL(path.resolve('game-of-worms',name)));
(async()=>{
  const {birdFrame,watchPoint,WATCH_DURATION}=await moduleAt('pohnpei-play.js');
  for(let ms=0;ms<=WATCH_DURATION;ms+=16){
    const f=birdFrame(ms),next=birdFrame(ms+16);
    for(const key of ['x','y','air','wing','tilt'])assert(Number.isFinite(f[key]));
    assert(f.x>=0&&f.x<=97);assert(f.y<=.001&&f.y>-110);
    assert(Math.hypot(next.x-f.x,next.y-f.y)<6,'No position jump between animation frames');
    const still=birdFrame(ms,true);assert.equal(still.x,0);assert.equal(still.y,0);assert.equal(still.wing,0);
  }
  for(const ms of [0,WATCH_DURATION]){assert.equal(birdFrame(ms).x,0);assert(Math.abs(birdFrame(ms).y)<1e-9);}
  assert.equal(birdFrame(6000).x,97);assert.equal(birdFrame(6000).wing,0);
  for(const male of [false,true]){
    assert.deepEqual(watchPoint(78,228,1,male),{x:78,y:228},'Tail stays planted');
    assert.deepEqual(watchPoint(330,64,0,male),{x:330,y:64},'Resting geometry is unchanged');
    assert(watchPoint(330,64,1,male).y<64,'Head leans into watching position');
  }
  class Element{constructor(tag){this.tag=tag;this.attrs={};this.children=[];this.dataset={};}
    setAttribute(k,v){this.attrs[k]=String(v);}appendChild(n){this.children.push(n);return n;}}
  global.document={createElementNS:(_,tag)=>new Element(tag)};
  const {OPTICS,BIRD,CAPE,pohnpeiLayouts,drawPohnpeiAccessory,drawLorikeet}=await moduleAt('pohnpei-art.js');
  assert.equal(Object.keys(pohnpeiLayouts).length,3);assert(!pohnpeiLayouts[BIRD].companion);
  const flatten=n=>[n,...n.children.flatMap(flatten)];
  for(const family of[OPTICS,CAPE]){
    const a=new Element('g'),b=new Element('g');
    assert(drawPohnpeiAccessory(a,{family},false));assert(drawPohnpeiAccessory(b,{family},true));
    assert.notEqual(JSON.stringify(a.children),JSON.stringify(b.children));
    assert.equal(a.attrs.style,'transform-box:view-box;transform-origin:0 0');
    assert.equal(b.attrs.style,a.attrs.style);
    if(family===OPTICS){
      assert.equal(flatten(a).filter(n=>'data-pohnpei-lens'in n.attrs).length,2);
      assert.equal(flatten(b).filter(n=>'data-pohnpei-lens'in n.attrs).length,1);
      for(const n of[...flatten(a),...flatten(b)].filter(n=>n.tag==='foreignObject'))assert(+n.attrs.width>=48);
    }
  }
  const bird=new Element('g');drawLorikeet(bird);
  assert(flatten(bird).some(n=>n.attrs.fill==='#783d4a'));assert(flatten(bird).some(n=>n.attrs.fill==='#d8c876'));
  const play=fs.readFileSync('game-of-worms/pohnpei-play.js','utf8'),game=fs.readFileSync('game-of-worms/game.js','utf8');
  for(const hook of['pohnpeiPlay.start(piece)','pohnpeiPlay.handles(piece)','pohnpeiPlay.adjust(piece)','pohnpeiPlay.cancel()','pohnpeiPlay.clear()','pohnpeiPlay.active'])assert(game.includes(hook));
  for(const hook of['IntersectionObserver','visibilitychange','pagehide','resize',"reduced.addEventListener('change'","event.key==='Escape'",'run===r'])assert(play.includes(hook));
  assert(play.includes('outer.translate(x-radius,y-radius)'));assert(!play.includes('svg.getScreenCTM()'));
  assert(play.includes('headwear.parentNode.appendChild(headwear)'));
  assert(!play.includes('dataset.userScale'));

  const catalogue=fs.readFileSync('game-of-worms/accessory-designs.js','utf8');
  const row=catalogue.split(/\r?\n/).find(n=>n.includes('["tropicalis", "Pohnpei,'));
  for(const f of[OPTICS,BIRD,CAPE])assert(row.includes(f));
  assert(!row.includes('parasol'));assert(!row.includes('rollerboard'));
  const hashes={
    'pohnpei-leaves.ogg':'678c0da00ef1092f4be7c2d8c7b22c1c91c5fc8ca1f3f9570ce59de995c0138c',
    'pohnpei-lorikeet.mp3':'ccd3d0e743dbe4cfdd7aed36d085fecc0f11eaaa7546c4d46faa92b86cbf2be4'
  };
  for(const[file,hash]of Object.entries(hashes))assert.equal(crypto.createHash('sha256').update(fs.readFileSync('game-of-worms/assets/audio/'+file)).digest('hex'),hash);
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync('game-of-worms/assets/pohnpei-qg4739-painted-background.webp')).digest('hex'),'8ee9b97764f51469cb29d07712c7fbbb3e447036b9e85405b5bb05203e924222');
  const {createPohnpeiSound}=await moduleAt('pohnpei-sound.js');
  let requests=0,active=0,maximum=0;
  const buffer={duration:4,sampleRate:1000,numberOfChannels:1,getChannelData:()=>new Float32Array(4000).fill(.4)};
  const gain={setValueAtTime(){},linearRampToValueAtTime(){}};
  const ctx={state:'running',currentTime:0,destination:{},resume:async()=>{},decodeAudioData:async()=>buffer,
    createGain:()=>({gain,connect(){},disconnect(){}}),createBufferSource(){let on=false;return{connect(){},disconnect(){},
      start(now,offset,duration){assert(offset>=0);assert(duration<=buffer.duration-offset);on=true;active++;maximum=Math.max(maximum,active);},
      stop(){if(on){on=false;active--;this.onended?.();}}};}};
  global.window={AudioContext:function(){return ctx;}};global.document={hidden:false};
  global.fetch=async()=>{requests++;return{ok:true,arrayBuffer:async()=>new ArrayBuffer(32)};};
  const sound=createPohnpeiSound();assert.equal(sound.play('bird'),false);assert.equal(requests,0);
  assert((await Promise.all([sound.unlock('bird'),sound.unlock('bird')])).every(Boolean));assert.equal(requests,1);
  assert(await sound.unlock('leaf'));
  sound.play('bird',.3,2.8);sound.play('leaf',0,1.05);assert.equal(maximum,1);assert.equal(active,1);
  sound.stop();assert.equal(active,0);
  document.hidden=true;assert.equal(sound.play('bird'),false);document.hidden=false;
  assert.equal(sound.play('leaf',7,1),false);
  global.fetch=async()=>({ok:false});assert.equal(await createPohnpeiSound().unlock('bird'),false);
  console.log('PASS: Pohnpei distinct paired art, perched bird, continuous takeoff/landing, planted tails and reduced motion');
  console.log('PASS: optics bounds strategy, editable search, lifecycle/keyboard hooks, independent visitor transforms and preserved painting');
  console.log('PASS: verified audio hashes, lazy/deduplicated loading, bounded non-overlapping recordings and silent failures');
})().catch(e=>{console.error(e);process.exitCode=1;});
