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
  constructor(tag){this.tag=tag;this.children=[];this.attributes={};this.dataset={};}
  setAttribute(k,v){this.attributes[k]=String(v);}
  getAttribute(k){return this.attributes[k]??null;}
  removeAttribute(k){delete this.attributes[k];}
  appendChild(n){this.children.push(n);n.parentNode=this;return n;}
  querySelectorAll(q){const match=q.match(/^\[([^=\]]+)(?:="([^"]*)")?\]$/);return walk(this).slice(1).filter(n=>q[0]==='.'?(n.getAttribute('class')||'').split(' ').includes(q.slice(1)):match&&n.getAttribute(match[1])!==null&&(!match[2]||n.getAttribute(match[1])===match[2]));}
  querySelector(q){return this.querySelectorAll(q)[0]||null;}
  cloneNode(){const n=new Element(this.tag);n.attributes={...this.attributes};this.children.forEach(c=>n.appendChild(c.cloneNode(true)));return n;}
  getScreenCTM(){let m=new Matrix();for(const [,kind,raw]of(this.getAttribute('transform')||'').matchAll(/(matrix|translate|rotate|scale)\(([^)]*)\)/g)){const a=raw.trim().split(/[ ,]+/).map(Number);m=kind==='matrix'?m.multiply(new Matrix(a)):m[kind](...a);}return (this.parentNode?.getScreenCTM()||new Matrix()).multiply(m);}
}
global.document={createElementNS:(_,tag)=>new Element(tag)};
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
  for(const rate of [22050,44100,48000]){const a=new Float32Array(Math.ceil(rate*.42));let seed=17;mod.fillLeafSnip(a,rate,()=>{seed=(seed*16807)%2147483647;return seed/2147483647;});assert(a.every(Number.isFinite));assert(Math.max(...a.map(Math.abs))<.8);assert.equal(a[0],0);assert(Math.abs(a.at(-1))<.0001);assert(a.some(v=>Math.abs(v)>.1));}
  for(const extraScale of [.65,1,1.6]){
    const root=new Element('g'),pieces=[];
    for(const [male,transform]of [[false,`translate(231 31) rotate(150) scale(${.55*extraScale})`],[true,'translate(156 58) rotate(-18) scale(.56)']]){
      const piece=root.appendChild(new Element('g'));piece.setAttribute('data-accessory-family',mod.LEAF_FAMILY);piece.dataset.wormPart=male?'companion':'primary';
      const art=piece.appendChild(new Element('g'));art.setAttribute('class','location-accessory-art');art.setAttribute('transform',transform);mod.drawLeafCutting(art,male);pieces.push(piece);validatePaths(art);
    }
    const bodies=[new Element('g'),new Element('g')];bodies[1].setAttribute('transform','translate(-28 82) scale(.43)');
    const habitat={querySelectorAll:q=>root.querySelectorAll(q),querySelector:q=>q.includes('#primary-worm')?bodies[0]:q.includes('#companion-worm')?bodies[1]:root.querySelector(q)};
    const effects=root.appendChild(new Element('g')),saved=new Map();let sounds=0;
    const remember=(n,keys=['transform'])=>{if(!saved.has(n))saved.set(n,Object.fromEntries(keys.map(k=>[k,n.getAttribute(k)])));};
    const run=mod.createLeafCutRun({habitat,root,effects,remember,pin:()=>{},reduced:false,snip:()=>sounds++});assert(run);
    for(let ms=0;ms<5700;ms+=20){assert.equal(run.frame(ms),false);validatePaths(root);}
    assert.equal(sounds,1);assert.equal(effects.querySelectorAll('[data-leaf-ant]').length,1);assert.equal(effects.querySelector('[data-leaf-ant]').querySelectorAll('[data-scissor-half]').length,0);
    assert(run.frame(5700));run.finish();assert.equal(root.querySelector('[data-leaf-tip]').getAttribute('opacity'),'0');mod.resetLeafCut(habitat);assert.equal(root.querySelector('[data-leaf-tip]').getAttribute('opacity'),'1');
    assert.equal(pieces[0].querySelector('.location-accessory-art').getAttribute('transform'),`translate(231 31) rotate(150) scale(${.55*extraScale})`,'User size and base placement untouched');
  }
  const antRoot=new Element('g');const ant=mod.drawLeafAnt(antRoot);assert.equal(ant.legs.length,6);assert.equal(ant.legs.filter(l=>l.far).length,3);
  const catalogue=fs.readFileSync(path.join(__dirname,'../game-of-worms/accessory-designs.js'),'utf8');assert.match(catalogue,/"Leaf cutting", "qg2726-leaf-cutting"/);assert(!catalogue.split('const catalogueByKey')[0].includes('forest-census map fans'));
  console.log('Leaf cutting: valid paths, six ant legs, blade contact timeline, one snip, grounded pickup, three custom scales, cut/reset and reduced motion pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});
