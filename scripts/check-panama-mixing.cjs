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
 const {mixingFrame,prepareMix,mixingSounds,MIX_SOUNDS,MIX_DURATION,MIX_FAMILY}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/panama-mixing.js')));
 const {drawFlowerBait}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/panama-bait.js')));
 const oldSource=require('node:child_process').execFileSync('git',['show','d58c00f:game-of-worms/panama-bait.js'],{encoding:'utf8'});
 const old=await import('data:text/javascript;base64,'+Buffer.from(oldSource).toString('base64'));
 const paint=g=>walk(g).filter(n=>!['g','defs'].includes(n.tag)).map(n=>[n.tag,Object.fromEntries(Object.entries(n.attributes).filter(([k])=>!k.startsWith('data-')))]);
 for(const male of [false,true]){const a=new Element('g'),b=new Element('g');old.drawFlowerBait(a,male);drawFlowerBait(b,male);assert.deepEqual(paint(a),paint(b),'Approved blender and dishes retain identical painted geometry');}
 const {bodyPoint,at}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/scene-performance.js')));
 let previous=mixingFrame(0);const heard=[],cues=new Set();
 for(let ms=10;ms<=MIX_DURATION;ms+=10){const f=mixingFrame(ms);
  for(const k of Object.keys(f))if(typeof f[k]==='number'){assert(Number.isFinite(f[k]));assert(Math.abs(f[k]-previous[k])<.12,k+' has no sudden jump');}
  if(f.blend>0){assert.equal(f.lid,0,'Lid closed before motor starts');assert.equal(f.jug,0,'Jar locked on motor while running');}
  if(f.pour>0){assert.equal(f.blend,0);assert.equal(f.jug,1);assert.equal(f.tilt,1);}
  if(f.scoop>0)assert.equal(f.filled,1,'Scoop only after filling');
  assert.deepEqual(bodyPoint(78,228,f.primaryBend,f.primaryLook),{x:78,y:228});
  mixingSounds(ms,cues,(...args)=>heard.push({ms,args}));previous=f;
 }
 assert.equal(heard.length,4);heard.forEach((n,i)=>assert.equal(n.ms,MIX_SOUNDS[i].at));
 const late=[];mixingSounds(MIX_DURATION,new Set(),(...args)=>late.push(args));assert.equal(late.length,0);
 const end=mixingFrame(MIX_DURATION);for(const k of ['grip','lid','blend','bowl','park','jug','tilt','pour','scoop','transfer'])assert.equal(end[k],0,k+' settles');
 for(const size of [.7,1,1.4]){
  const root=new Element('g'),layer=root.appendChild(new Element('g')),props=[];
  for(const [part,male,base]of [['primary',false,new Matrix().translate(270,239).scale(.54*size)],['companion',true,new Matrix().translate(104,174).scale(.48)]]){
   const piece=new Element('g');drawFlowerBait(piece,male);const g=layer.appendChild(new Element('g'));g.setAttribute('transform',base);const copy=g.appendChild(piece.cloneNode(true));props.push({piece,part,base,g,copy});
  }
  const before=props.map(p=>JSON.stringify(walk(p.piece).map(n=>n.attributes)));
  const actors={primary:{base:new Matrix()},companion:{base:new Matrix().translate(-28,82).scale(.43)}};
  const stage={root,layer,actors,prop:(family,part)=>family===MIX_FAMILY?props.find(p=>p.part===part):null,hand:part=>({part}),reach(){},pose(part,bend,look){actors[part].bend=bend;actors[part].look=look;}};
  const mix=prepareMix(stage);
  for(let ms=0;ms<=MIX_DURATION;ms+=20){mix.paint(ms);validatePaths(root);}
  props.forEach((p,i)=>assert.equal(JSON.stringify(walk(p.piece).map(n=>n.attributes)),before[i],'Temporary animation never edits visitor originals'));
  mix.paint(7800);
  const stream=layer.querySelector('[data-panama-pour]'),nums=stream.getAttribute('d').match(/[-+]?(?:\d*\.\d+|\d+)(?:e[-+]?\d+)?/gi).map(Number);
  const jug=props[0].copy.querySelector('[data-panama-jug]'),spout=at(jug.getScreenCTM(),-55,-154);
  const bowl=props[1].copy.querySelector('[data-panama-mixing-bowl]'),center=at(bowl.getScreenCTM(),-40,-6);
  assert(Math.abs(nums[0]-spout.x)<1e-6&&Math.abs(nums[1]-spout.y)<1e-6,'Stream starts at the moved spout');
  assert(Math.abs(nums.at(-2)-center.x)<1e-6&&Math.abs(nums.at(-1)-center.y)<1e-6,'Stream lands in the moved bowl at every visitor size');
  mix.paint(MIX_DURATION,true);assert.equal(props[1].copy.querySelector('[data-panama-serving]').getAttribute('opacity'),'1','Reduced motion shows the completed serving');
  mix.finish();assert.equal(props[1].piece.querySelector('[data-panama-serving]').getAttribute('opacity'),'1');
 }
 console.log('Panama mixing: closed lid and stopped motor ordering, smooth motion, planted tails, exact spout-to-bowl alignment at three sizes, saved originals, recorded cue timing and reduced motion pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});
