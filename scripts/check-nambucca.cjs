const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
class Element {
  constructor(tag){this.tag=tag;this.children=[];this.attributes={};}
  setAttribute(k,v){this.attributes[k]=String(v);}
  appendChild(n){this.children.push(n);return n;}
}
global.document={createElementNS:(_,tag)=>new Element(tag)};
const walk=n=>[n,...n.children.flatMap(walk)];
const mod=n=>import(pathToFileURL(path.join(__dirname,'../game-of-worms/',n)));
(async()=>{
  const {drawNambucca:draw,PRESS,PAINT,APRON,nambuccaLayouts}=await mod('nambucca-art.js');
  const {pressFrame,paintFrame,craftBodyPath,applyPaintProgress}=await mod('nambucca-play.js');
  const ids=[];
  for(const family of [PRESS,PAINT,APRON]){
    const pairs=[false,true].map(male=>{
      const g=new Element('g');assert(draw(g,{family},male));const nodes=walk(g);
      for(const n of nodes){
        assert(!Object.values(n.attributes).some(v=>/NaN|undefined|Infinity/.test(v)));
        if(n.tag==='path')assert(n.attributes.fill&&n.attributes.stroke);
        if(n.attributes.id)ids.push(n.attributes.id);
        if(n.attributes['clip-path'])assert(nodes.some(c=>`url(#${c.attributes.id})`===n.attributes['clip-path']));
      }
      assert(nambuccaLayouts[family][male?'companion':'primary'].every(Number.isFinite));
      assert.match(g.attributes.style,/transform-origin:0 0/);
      if(family===PRESS){
        assert.equal(nodes.filter(n=>'data-nb-nut' in n.attributes).length,male?0:4);
        assert(nodes.some(n=>(male?'data-nb-sheet':'data-nb-lid') in n.attributes));
      }
      if(family===PAINT){
        const strokes=nodes.filter(n=>'data-nb-stroke' in n.attributes);assert.equal(strokes.length,5);
        for(const s of strokes){assert.equal(s.attributes.opacity,'0');assert.equal((s.attributes.d.match(/M/g)||[]).length,1,'Each painted stroke must be continuous');}
        applyPaintProgress(strokes,1.5);assert.deepEqual(strokes.map(s=>s.attributes['stroke-dashoffset']),['0','0.5','1','1','1']);
        applyPaintProgress(strokes,0);assert(strokes.every(s=>s.attributes.opacity==='0'));
      }
      return JSON.stringify(nodes.slice(1).map(n=>n.attributes));
    });
    assert.notEqual(pairs[0],pairs[1],'Separate primary and companion constructions');
  }
  assert.equal(ids.length,new Set(ids).size);
  assert.equal(draw(new Element('g'),{family:'unrelated'},false),false);
  for(const male of [false,true])for(const reduced of [false,true]){
    let previous=-1;
    for(let ms=0;ms<=6500;ms+=20){
      const press=pressFrame(ms,male,reduced),paint=paintFrame(ms,5,reduced);
      for(const f of [press,paint])assert(Object.values(f).every(v=>typeof v==='boolean'||Number.isFinite(v)));
      assert(press.close>=0&&press.close<=1&&press.pull>=0&&press.pull<=1);
      assert(paint.progress>=previous&&paint.progress<=5);previous=paint.progress;
      if(reduced){assert.equal(press.close,0);assert.equal(press.twist,0);assert.equal(paint.progress,5);}
    }
    assert(pressFrame(3400,male).done);assert(paintFrame(6500,5).done);
  }
  const body='M78 228C122 280 173 255 181 203C188 151 225 105 278 113C330 121 355 82 326 54';
  const bent=craftBodyPath(body,40,20).match(/-?\d*\.?\d+/g).map(Number);
  assert.deepEqual(bent.slice(0,2),[78,228]);assert.deepEqual(bent.slice(-2),[366,74]);
  assert.deepEqual(craftBodyPath(body,0,0).match(/-?\d*\.?\d+/g),body.match(/-?\d*\.?\d+/g));
  assert.equal(paintFrame(3500,5).show,0);assert.equal(paintFrame(4700,5).show,1);assert.equal(paintFrame(6500,5).show,0);
  console.log('Nambucca: six distinct SVGs, fitted origins, four press fastenings, continuous brush paths, independent paint reset, finite action frames and reduced motion pass. Audio is covered by check-nambucca-audio.cjs.');
})().catch(e=>{console.error(e);process.exitCode=1;});
