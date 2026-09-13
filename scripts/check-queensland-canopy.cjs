const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const moduleAt=name=>import(pathToFileURL(path.resolve('game-of-worms',name)));
(async()=>{
  const {liftFrame,cameraFrame,carrierMatrix,rideEditable}=await moduleAt('queensland-play.js');
  for(let t=0;t<10000;t+=16){
    for(const frame of[liftFrame(t),cameraFrame(t),cameraFrame(t,true)]){
      for(const value of Object.values(frame))if(typeof value==='number')assert(value>=0&&value<=1);
    }
    assert.equal(liftFrame(t,true).height,0);
    assert.equal(cameraFrame(t,true,true).raise,0);
  }
  assert.equal(liftFrame(1100).height,0);
  assert.equal(liftFrame(4300).height,1);
  assert.equal(liftFrame(4300).board,1);
  assert.equal(liftFrame(7800).height,0);
  assert(liftFrame(9050).done);
  assert(cameraFrame(3100).done);assert(!cameraFrame(3700,true).done);
  assert.equal(cameraFrame(4200,true).print,1);assert(cameraFrame(6900,true).done);
  class Element{constructor(tag){this.tag=tag;this.attrs={};this.children=[];this.dataset={};}
    setAttribute(k,v){this.attrs[k]=String(v);}appendChild(n){this.children.push(n);return n;}}
  global.document={createElementNS:(_,tag)=>new Element(tag)};
  const {LIFT,CAMERA,HARNESS,drawCanopyAccessory,canopyLayouts}=await moduleAt('queensland-art.js');
  assert.equal(Object.keys(canopyLayouts).length,3);assert(!canopyLayouts[LIFT].companion);
  for(const family of[CAMERA,HARNESS]){
    const a=new Element('g'),b=new Element('g');
    assert(drawCanopyAccessory(a,{family},false));assert(drawCanopyAccessory(b,{family},true));
    assert.notEqual(JSON.stringify(a.children),JSON.stringify(b.children));
    assert.equal(a.attrs.style,'transform-box:view-box;transform-origin:0 0');
    assert.equal(b.attrs.style,a.attrs.style);
  }
  const basket=new Element('g');drawCanopyAccessory(basket,{family:LIFT},false);
  assert(basket.children.some(n=>'data-canopy-front'in n.attrs));
  assert(basket.children.some(n=>'data-canopy-rear'in n.attrs));
  const play=fs.readFileSync('game-of-worms/queensland-play.js','utf8');
  for(const hook of['IntersectionObserver','visibilitychange','resize','pagehide',"reduced.addEventListener('change'","n.setAttribute('style',v)"])assert(play.includes(hook));
  assert(!play.includes('dataset.userScale'));
  assert(rideEditable({dataset:{accessoryFamily:CAMERA}}));
  assert(rideEditable({dataset:{accessoryFamily:HARNESS}}));
  assert(!rideEditable({dataset:{accessoryFamily:LIFT}}));assert(!rideEditable(null));
  // Affine composition must preserve the visitor's local fit during travel and
  // return to identity in a rotated, differently scaled parent coordinate system.
  class Matrix{
    constructor(a=1,b=0,c=0,d=1,e=0,f=0){Object.assign(this,{a,b,c,d,e,f});}
    multiply(m){const n=this;return new Matrix(n.a*m.a+n.c*m.b,n.b*m.a+n.d*m.b,n.a*m.c+n.c*m.d,n.b*m.c+n.d*m.d,n.a*m.e+n.c*m.f+n.e,n.b*m.e+n.d*m.f+n.f);}
    inverse(){const{a,b,c,d,e,f}=this,q=a*d-b*c;return new Matrix(d/q,-b/q,-c/q,a/q,(c*f-d*e)/q,(b*e-a*f)/q);}
  }
  const close=(a,b)=>{for(const k of['a','b','c','d','e','f'])assert(Math.abs(a[k]-b[k])<1e-8,k);};
  const parent=new Matrix(.91,.4,-.4,.91,71,-18),from=new Matrix(.4,.06,-.06,.4,14,28);
  const userFit=new Matrix(1.15,0,0,1.15,11,-9);
  for(const scale of[.28,.6,1])for(const y of[-235,-95,0]){
    const to=new Matrix(scale,-.08,.08,scale,150,y);
    close(parent.multiply(carrierMatrix(parent,from,to)).multiply(userFit),to.multiply(from.inverse()).multiply(parent).multiply(userFit));
  }
  close(carrierMatrix(parent,from,from),new Matrix());
  const game=fs.readFileSync('game-of-worms/game.js','utf8');
  for(const hook of['canopyPlay.start(piece)','canopyPlay.handles(piece)','canopyPlay.cancel()','canopyPlay.clear()','canopyPlay.active'])assert(game.includes(hook));
  const {createCanopySound,canopyClips}=await moduleAt('queensland-sound.js');
  let requests=0,active=0,maximum=0,contexts=0;
  const buffer={duration:6.084,sampleRate:1000,numberOfChannels:1,getChannelData:()=>new Float32Array(6100).fill(.5)};
  const gain={setValueAtTime(){},linearRampToValueAtTime(){}};
  const ctx={state:'running',currentTime:0,destination:{},resume:async()=>{},decodeAudioData:async()=>buffer,
    createGain:()=>({gain,connect(){},disconnect(){}}),createBufferSource(){let on=false;return{connect(){},disconnect(){},
      start(now,offset,duration){assert(offset>=0);assert(duration<=buffer.duration-offset);on=true;active++;maximum=Math.max(maximum,active);},
      stop(){if(on){on=false;active--;this.onended?.();}}};}};
  global.window={AudioContext:function(){contexts++;return ctx;}};global.document={hidden:false};
  global.fetch=async()=>{requests++;return{ok:true,arrayBuffer:async()=>new ArrayBuffer(32)};};
  const sound=createCanopySound();assert.equal(sound.play('motor'),false);assert.equal(contexts,0);assert.equal(requests,0);
  assert((await Promise.all([sound.unlock('motor'),sound.unlock('motor')])).every(Boolean));assert.equal(requests,1);
  assert(sound.play('motor',.4,2.6));sound.play('motor',.4,2.4);assert.equal(maximum,1);
  sound.stop();assert.equal(active,0);document.hidden=true;assert.equal(sound.play('motor'),false);document.hidden=false;
  assert.equal(sound.play('motor',7,1),false);
  assert(await sound.unlock('shutter'));assert(await sound.unlock('instant'));
  sound.play('motor',.4,2.6);sound.play('shutter',0,.629);sound.play('instant',0,3.882);
  assert.equal(active,3);assert.equal(maximum,3);
  sound.play('shutter',0,.629);assert.equal(active,3);assert.equal(maximum,3);
  sound.stop('shutter');assert.equal(active,2);sound.stop('instant');assert.equal(active,1);
  sound.stop();assert.equal(active,0);
  global.fetch=async()=>({ok:false});assert.equal(await createCanopySound().unlock('shutter'),false);
  for(const url of Object.values(canopyClips))assert(fs.statSync(new URL(url)).size>10000);
  console.log('PASS: Queensland timeline bounds, ordered boarding/ascent/return, distinct paired art, fitted origins and lifecycle hooks');
  console.log('PASS: body-relative carrier matrices, fitted user scale, independent motor/camera channels, silent failures and cleanup');
})().catch(error=>{console.error(error);process.exitCode=1;});
