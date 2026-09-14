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
  const arity={M:2,L:2,C:6,Q:4,H:1,V:1,Z:0};
  for(const n of walk(root)){
    assert(!Object.values(n.attributes).some(v=>/NaN|Infinity|undefined/.test(v)));
    if(n.tag!=='path'||!n.getAttribute('d'))continue;
    for(const [,command,args]of n.getAttribute('d').matchAll(/([MLCQHVZ])([^MLCQHVZ]*)/g)){
      const nums=(args.match(/[-+]?(?:\d*\.\d+|\d+)(?:e[-+]?\d+)?/gi)||[]).map(Number);
      assert(nums.every(Number.isFinite));assert(nums.every(v=>Math.abs(v)<1500),'No merged coordinate tokens');
      assert(arity[command]?nums.length>0&&nums.length%arity[command]===0:nums.length===0,`Malformed ${command}: ${args}`);
    }
  }
}
(async()=>{
  const mod=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/panama-leaf-cutting.js')));
  for(let ms=0;ms<=5700;ms+=10){const s=mod.leafCutFrame(ms);assert(Object.values(s).every(v=>typeof v==='boolean'||Number.isFinite(v)));if(ms<1380)assert(!s.cut);if(ms<3280)assert.equal(s.carry,0);}
  assert(mod.leafCutFrame(5700).done);assert.equal(mod.leafCutFrame(900,true).done,true);assert.equal(mod.leafCutFrame(400,true).carry,0);
  assert.equal(mod.leafSnipAt,1285,'Recorded blade friction begins before full closure');
  for(const extraScale of [.65,1,1.6]){
    const root=new Element('g'),pieces=[];
    for(const [male,transform]of [[false,`translate(231 31) rotate(150) scale(${.55*extraScale})`],[true,'translate(156 58) rotate(-18) scale(.56)']]){
      const piece=root.appendChild(new Element('g'));piece.setAttribute('data-accessory-family',mod.LEAF_FAMILY);piece.dataset.wormPart=male?'companion':'primary';
      piece.dataset.accessoryFamily=mod.LEAF_FAMILY;
      const art=piece.appendChild(new Element('g'));art.setAttribute('class','location-accessory-art');art.setAttribute('transform',transform);mod.drawLeafCutting(art,male);pieces.push(piece);validatePaths(art);
    }
    const bodies=[new Element('g'),new Element('g')];bodies[1].setAttribute('transform','translate(-28 82) scale(.43)');
    const habitat={querySelectorAll:q=>root.querySelectorAll(q),querySelector:q=>q==='#worm-species'?root:q.includes('#primary-worm')?bodies[0]:q.includes('#companion-worm')?bodies[1]:root.querySelector(q)};
    const leaf=root.querySelector('[data-panama-leaf]');
    let previousAnt=null;
    for(let attempt=0;attempt<5;attempt++){
      const effects=root.appendChild(new Element('g')),saved=new Map();let sounds=0;
      const remember=(n,keys=['transform'])=>{if(!saved.has(n))saved.set(n,Object.fromEntries(keys.map(k=>[k,n.getAttribute(k)])));};
      const restore=()=>{for(const [n,attrs] of saved)for(const [key,value] of Object.entries(attrs)){if(value===null)n.removeAttribute(key);else n.setAttribute(key,value);}};
      const count=attempt%3,section=mod.leafCutSection(count);
      const run=mod.createLeafCutRun({habitat,root,effects,remember,pin:()=>{},reduced:false,snip:()=>sounds++});assert(run);
      assert.equal(leaf.getAttribute('data-leaf-cuts'),String(count),'Only an exhausted leaf is replaced');
      for(let ms=0;ms<5700;ms+=20){assert.equal(run.frame(ms),false);validatePaths(root);}
      assert.equal(sounds,1);
      const ant=effects.querySelector('[data-leaf-ant]');
      assert(ant&&ant!==previousAnt,'A fresh ant collects each successive section');previousAnt=ant;
      assert.equal(effects.querySelectorAll('[data-leaf-ant]').length,1);
      assert.equal(ant.querySelectorAll('[data-scissor-half]').length,0);
      assert(run.frame(5700));restore();run.finish();
      assert.equal(leaf.getAttribute('data-leaf-cuts'),String(count+1));
      assert.equal(leaf.querySelector('[data-leaf-clip]').getAttribute('width'),String(section.x+90),'The same leaf gets shorter');
      assert(section.top<0&&section.bottom>0&&section.right>section.x,'Each piece has real leaf area');
      effects.remove();
    }
    mod.resetLeafCut(habitat);assert.equal(leaf.getAttribute('data-leaf-cuts'),'0');
    assert.equal(leaf.querySelector('[data-leaf-clip]').getAttribute('width'),'180');
    assert.equal(pieces[0].querySelector('.location-accessory-art').getAttribute('transform'),`translate(231 31) rotate(150) scale(${.55*extraScale})`,'User size and base placement untouched');
    // Exercise the real controller: taps queue without cancelling ants or restoring the leaf.
    let now=0,next=0;const callbacks=new Map();
    global.performance={now:()=>now};
    global.requestAnimationFrame=fn=>{callbacks.set(++next,fn);return next;};
    global.cancelAnimationFrame=id=>callbacks.delete(id);
    global.window={matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener(){}};
    const advance=ms=>{now=ms;const pending=[...callbacks.values()];callbacks.clear();pending.forEach(fn=>fn(now));};
    const {createPanamaPlay}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/panama-play.js')));
    const controller=createPanamaPlay(habitat);
    controller.start(pieces[0]);const firstEffects=root.querySelector('[data-panama-effects]');
    controller.start(pieces[1]);controller.start(pieces[0]);
    assert.equal(root.querySelector('[data-panama-effects]'),firstEffects,'Repeated taps do not restart the current collection');
    for(const [start,count] of [[0,1],[5700,2],[11400,3]]){
      advance(start+1400);assert.equal(leaf.getAttribute('data-leaf-cuts'),String(count));
      advance(start+5700);
    }
    assert(!controller.active);assert.equal(root.querySelectorAll('[data-panama-effects]').length,0);assert.equal(callbacks.size,0);
    controller.start(pieces[0]);assert.equal(leaf.getAttribute('data-leaf-cuts'),'0','Next tap supplies a fresh leaf after three pieces');
    advance(18500);controller.start(pieces[0]);controller.cancel();
    assert.equal(leaf.getAttribute('data-leaf-cuts'),'0','Cancellation restores the pre-cut state and discards pending taps');
    assert.equal(callbacks.size,0);assert(!controller.active);
    controller.reset(pieces[0]);assert.equal(leaf.getAttribute('data-leaf-cuts'),'0');
  }
  const antRoot=new Element('g');const ant=mod.drawLeafAnt(antRoot);assert.equal(ant.legs.length,6);assert.equal(ant.legs.filter(l=>l.far).length,3);
  const catalogue=fs.readFileSync(path.join(__dirname,'../game-of-worms/accessory-designs.js'),'utf8');assert.match(catalogue,/"Leaf cutting", "qg2726-leaf-cutting"/);assert(!catalogue.split('const catalogueByKey')[0].includes('forest-census map fans'));
  console.log('Leaf cutting: successive sections, fresh ants, queued taps, replenishment, cancellation, preserved scales, one snip per cut, valid paths and reduced motion pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});
