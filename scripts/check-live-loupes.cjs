const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
class Matrix {
  constructor(a=1,b=0,c=0,d=1,e=0,f=0) { Object.assign(this,{a,b,c,d,e,f}); }
  multiply(n) { const m=this; return new Matrix(m.a*n.a+m.c*n.b,m.b*n.a+m.d*n.b,m.a*n.c+m.c*n.d,m.b*n.c+m.d*n.d,m.a*n.e+m.c*n.f+m.e,m.b*n.e+m.d*n.f+m.f); }
  translate(x,y) { return this.multiply(new Matrix(1,0,0,1,x,y)); }
  scale(s) { return this.multiply(new Matrix(s,0,0,s)); }
  inverse() { const m=this,t=m.a*m.d-m.b*m.c; return new Matrix(m.d/t,-m.b/t,-m.c/t,m.a/t,(m.c*m.f-m.d*m.e)/t,(m.b*m.e-m.a*m.f)/t); }
}
class Element {
  constructor(tag) { this.tag=tag; this.children=[]; this.attributes={}; this.style={}; this.screen=new Matrix(); }
  setAttribute(k,v) { this.attributes[k]=String(v); }
  removeAttribute(k) { delete this[k]; delete this.attributes[k]; }
  appendChild(n) { if(n.parentNode) n.parentNode.children=n.parentNode.children.filter(c=>c!==n); this.children.push(n); n.parentNode=this; return n; }
  insertBefore(n,next) { this.appendChild(n); this.children.pop(); this.children.splice(next?this.children.indexOf(next):this.children.length,0,n); }
  closest() { return this.hidden?this:null; }
  querySelector() { return this.children[0]; }
  getScreenCTM() { return this.screen; }
}
global.DOMMatrix=Matrix;
global.document={hidden:false,createElementNS:(_,tag)=>new Element(tag)};
global.innerHeight=900;
let callback, cancelled=false;
global.requestAnimationFrame=fn=>{callback=fn;return 1};
global.cancelAnimationFrame=()=>{cancelled=true};
(async()=>{
  const {mountLiveLoupes}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/live-loupes.js')));
  assert.equal(typeof mountLiveLoupes({querySelectorAll:()=>[]}), 'function');
  const parent=new Element('g'), head=new Element('g'), wrap=new Element('g'), charm=new Element('g');
  parent.appendChild(head);parent.appendChild(wrap);parent.appendChild(charm);head.nextSibling=wrap;
  const sources={'#local-headwear':head,'#local-wrap':wrap,'#local-charm':charm};
  for(const name of ['#location-scene','.companion-body','.worm-body']) sources[name]=parent.appendChild(new Element('g'));
  wrap.id='local-wrap';charm.id='local-charm';sources['#location-scene'].id='location-scene';
  const frames=[new Element('foreignObject'),new Element('foreignObject')];
  for(const frame of frames) { const svg=frame.appendChild(new Element('svg'));svg.viewBox={baseVal:{width:140,height:144}}; }
  const habitat={querySelectorAll:()=>frames,querySelector:s=>sources[s]||null,getBoundingClientRect:()=>({top:0,bottom:500})};
  const stop=mountLiveLoupes(habitat);callback();
  assert.equal(parent.children.at(-1),head,'Lenses above sampled props');
  const lens=frames[0].children[0], layer=lens.children[0];
  assert.equal(layer.attributes.transform,'matrix(2 0 0 2 -70 -72)','Twofold magnification about lens centre');
  lens.screen=new Matrix(1,0,0,1,25,10);callback();
  assert.equal(layer.attributes.transform,'matrix(2 0 0 2 -120 -92)','Scene moves beneath a dragged lens');
  lens.screen=new Matrix(2,0,0,2,0,0);callback();
  assert.equal(layer.attributes.transform,'matrix(1 0 0 1 -70 -72)','Resized lens preserves world magnification');
  wrap.hidden=true;callback();
  assert.equal(lens.children[3].style.display,'none','Hidden accessory excluded');
  assert(lens.children.every(n=>n.children[0].attributes.href!=='#local-headwear'),'No recursive lenses');
  stop();assert(cancelled);assert.equal(parent.children.indexOf(head)+1,parent.children.indexOf(wrap),'Original order restored');
  assert(!sources['.worm-body'].id,'Temporary source identifiers removed');
  console.log('Live loupes: 2x centred optics, drag/resize mapping, hidden props, no recursion and cleanup pass.');
})().catch(e=>{console.error(e);process.exitCode=1});
