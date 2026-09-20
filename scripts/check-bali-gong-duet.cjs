const assert=require('node:assert/strict');
const fs=require('node:fs');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
class Matrix{
  constructor(v=[1,0,0,1,0,0]){[this.a,this.b,this.c,this.d,this.e,this.f]=v;}
  multiply(m){return new Matrix([this.a*m.a+this.c*m.b,this.b*m.a+this.d*m.b,this.a*m.c+this.c*m.d,this.b*m.c+this.d*m.d,this.a*m.e+this.c*m.f+this.e,this.b*m.e+this.d*m.f+this.f]);}
  inverse(){const z=this.a*this.d-this.b*this.c;return new Matrix([this.d/z,-this.b/z,-this.c/z,this.a/z,(this.c*this.f-this.d*this.e)/z,(this.b*this.e-this.a*this.f)/z]);}
  translate(x,y=0){return this.multiply(new Matrix([1,0,0,1,x,y]));}
  scale(x,y=x){return this.multiply(new Matrix([x,0,0,y,0,0]));}
  rotate(a){const t=a*Math.PI/180;return this.multiply(new Matrix([Math.cos(t),Math.sin(t),-Math.sin(t),Math.cos(t),0,0]));}
  toString(){return `matrix(${[this.a,this.b,this.c,this.d,this.e,this.f].join(',')})`;}
}
global.DOMMatrix=Matrix;
global.DOMPoint=class{constructor(x,y){this.x=x;this.y=y;}matrixTransform(m){return {x:m.a*this.x+m.c*this.y+m.e,y:m.b*this.x+m.d*this.y+m.f};}};
const walk=n=>[n,...n.children.flatMap(walk)];
class Element{
  constructor(tag){this.tag=tag;this.children=[];this.attributes={};this.dataset={};this.style={};this.isConnected=true;}
  setAttribute(k,v){this.attributes[k]=String(v);}
  getAttribute(k){return this.attributes[k]??null;}
  removeAttribute(k){delete this.attributes[k];}
  appendChild(n){this.children.push(n);n.parentNode=this;return n;}
  remove(){this.parentNode.children=this.parentNode.children.filter(n=>n!==this);}
  closest(){return null;}
  getBBox(){return {x:-90,y:-50,width:188,height:100};}
  querySelectorAll(q){const match=q.match(/^\[([^=\]]+)(?:="([^"]*)")?\]$/);return walk(this).slice(1).filter(n=>q[0]==='.'?(n.getAttribute('class')||'').split(' ').includes(q.slice(1)):match&&n.getAttribute(match[1])!==null&&(!match[2]||n.getAttribute(match[1])===match[2]));}
  querySelector(q){return this.querySelectorAll(q)[0]||null;}
  cloneNode(){const n=new Element(this.tag);n.attributes={...this.attributes};this.children.forEach(c=>n.appendChild(c.cloneNode(true)));return n;}
  getScreenCTM(){let m=new Matrix();for(const [,kind,raw]of(this.getAttribute('transform')||'').matchAll(/(matrix|translate|rotate|scale)\(([^)]*)\)/g)){const a=raw.trim().split(/[ ,]+/).map(Number);m=kind==='matrix'?m.multiply(new Matrix(a)):m[kind](...a);}return (this.parentNode?.getScreenCTM()||new Matrix()).multiply(m);}
}
global.document={createElementNS:(_,tag)=>new Element(tag),addEventListener(){},hidden:false};
function validatePaths(root){
  const arity={M:2,L:2,C:6,Q:4,T:2,H:1,V:1,Z:0};
  for(const n of walk(root)){
    assert(!Object.values(n.attributes).some(v=>/NaN|Infinity|undefined/.test(v)));
    if(n.tag!=='path'||!n.getAttribute('d'))continue;
    for(const [,command,args]of n.getAttribute('d').matchAll(/([MLCQTHVZ])([^MLCQTHVZ]*)/g)){
      const nums=(args.match(/[-+]?(?:\d*\.\d+|\d+)(?:e[-+]?\d+)?/gi)||[]).map(Number);
      assert(nums.every(Number.isFinite));assert(nums.every(v=>Math.abs(v)<1500),'No merged coordinate tokens');
      assert(arity[command]?nums.length>0&&nums.length%arity[command]===0:nums.length===0,`Malformed ${command}: ${args}`);
    }
  }
}

(async()=>{
 const api=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/bali-gong-duet.js')));
 const {gongScore,gongMalletPose,gongBodyPose,gongEnvelope,prepareGongs,playGongCues,createBaliGongs,GONG_FAMILY,GONG_DURATION}=api;
 const {drawBaliRefinement}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/bali-refinement.js')));
 const {at,bodyPoint}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/scene-performance.js')));
 function fixture(size=1){
  const root=new Element('g'),layer=root.appendChild(new Element('g')),props=[],hands=[];
  for(const [part,male,base] of [['primary',false,new Matrix().translate(403,277).scale(.56*size)],['companion',true,new Matrix().translate(20,244).scale(.56*size)]]){
   const piece=new Element('g');drawBaliRefinement(piece,{id:'wallacei::Sanda, Bali test',family:GONG_FAMILY},male);
   const g=layer.appendChild(new Element('g'));g.setAttribute('transform',base);const copy=g.appendChild(piece.cloneNode(true));props.push({piece,part,base,g,copy});
  }
  const actors={primary:{base:new Matrix()},companion:{base:new Matrix().translate(-28,82).scale(.43)}};
  return {root,layer,props,actors,restored:false,prop:(f,p)=>f===GONG_FAMILY?props.find(x=>x.part===p):null,
   hand(part){const h={part};hands.push(h);return h;},hands,reach(h,target,amount){h.target=target;h.amount=amount;},pose(){},restore(){this.restored=true;}};
 }
 for(const male of [false,true]){
  assert(gongScore(male).length>3);
  for(const hit of gongScore(male)){
   const p=gongMalletPose(hit.at,male,hit.index),boss=male?(hit.index?{x:35,y:0}:{x:-36,y:7}):{x:-5,y:7};
   assert(Math.abs(p.x-boss.x)<1e-8);assert(Math.abs(p.y-boss.y)<1e-8);assert.equal(p.strike,1);
  }
  let before=gongMalletPose(0,male,0);
  for(let ms=10;ms<=GONG_DURATION;ms+=10){
   const p=gongMalletPose(ms,male,0);assert(Object.values(p).every(Number.isFinite));
   assert(Math.abs(p.x-before.x)<9&&Math.abs(p.y-before.y)<9,'Continuous mallet travel');before=p;
   const b=gongBodyPose(ms,male);assert.deepEqual(bodyPoint(78,228,b.bend,b.look),{x:78,y:228},'Tail stays planted');
  }
  assert.equal(gongEnvelope(GONG_DURATION),0);
 }
 for(const size of [.7,1,1.5]){
  const stage=fixture(size),old=stage.props.map(p=>JSON.stringify(walk(p.piece).map(n=>n.attributes))),concert=prepareGongs(stage),heard=[],cues=new Set();
  for(let ms=0;ms<=GONG_DURATION;ms+=10){concert.paint(ms);playGongCues(ms,concert.score,cues,(...args)=>heard.push([ms,...args]));}
  assert.equal(heard.length,15);assert(heard.every(h=>h[4]<=.14));
  const stale=[];playGongCues(11600,concert.score,new Set(),(...a)=>stale.push(a));assert.equal(stale.length,0);
  for(const p of stage.props){
   assert.equal(JSON.stringify(walk(p.piece).map(n=>n.attributes)),old[stage.props.indexOf(p)],'Original prop untouched');
   const male=p.part==='companion';
   for(const hit of gongScore(male)){
    concert.paint(hit.at);
    const child=p.copy.querySelectorAll('[data-gong-mallet]')[hit.index].children[0],tip=at(child.getScreenCTM(),0,male?-5:-6);
    const boss=at(p.g.getScreenCTM(),male?(hit.index?35:-36):-5,male?(hit.index?0:7):7);
    assert(Math.hypot(tip.x-boss.x,tip.y-boss.y)<1e-6,'Padded head meets gong at all visitor sizes');
    const hand=stage.hands[(male?2:0)+hit.index],grip=at(child.getScreenCTM(),0,male?50:62);
    assert(Math.hypot(grip.x-hand.target.x,grip.y-hand.target.y)<1e-6,'Hand stays attached to mallet grip');
   }
  }
 }
 let clock=0,seq=0,raf=new Map(),prepared=0,stopped=0,pending,stage;
 const events={},media={matches:false,addEventListener:(k,cb)=>events.reduced=cb};
 global.window={matchMedia:()=>media,addEventListener:(k,cb)=>events[k]=cb};
 document.addEventListener=(k,cb)=>events[k]=cb;
 global.performance={now:()=>clock};global.requestAnimationFrame=cb=>(raf.set(++seq,cb),seq);global.cancelAnimationFrame=id=>raf.delete(id);
 const sound={prepare(){prepared++;return new Promise(r=>pending=r);},play(){},stop(){stopped++;}};
 const controller=createBaliGongs({}, {sound,makeStage(){return stage=fixture();}});
 const piece={isConnected:true,dataset:{accessoryFamily:GONG_FAMILY},closest(){return null;}};
 assert.equal(prepared,0);controller.start(piece);controller.cancel();pending();await Promise.resolve();assert.equal(raf.size,0,'Cancelled loading cannot start');
 controller.start(piece);pending();await Promise.resolve();assert(controller.active);
 clock=800;for(const cb of [...raf.values()]){raf.clear();cb(clock);}assert(stage);
 events.resize();assert(stage.restored);assert(!controller.active);assert.equal(raf.size,0);
 media.matches=true;const before=prepared;controller.start(piece);assert.equal(prepared,before,'Reduced motion remains silent and static');assert(!controller.active);
 assert(stopped>0);
 console.log('Bali duet: 15 synchronized recorded cues, exact boss contact and hand grip at three scales, planted tails, untouched original props, cancellation, delayed loading and reduced motion passed.');
})().catch(e=>{console.error(e);process.exitCode=1;});
