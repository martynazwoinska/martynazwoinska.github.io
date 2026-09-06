const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
class Element {
  constructor(tag){this.tag=tag;this.children=[];this.attributes={};this.dataset={};}
  setAttribute(k,v){this.attributes[k]=String(v);}
  appendChild(n){this.children.push(n);return n;}
}
global.document={createElementNS:(_,tag)=>new Element(tag)};
const walk=n=>[n,...n.children.flatMap(walk)];
(async()=>{
  const {drawPanamaRefinement:draw}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/panama-refinement.js')));
  const ids=[];
  for(const family of ['qg2726-gustavia-flower-headpiece','qg2726-golden-fleece-cape','qg2726-bci-forest-census-map-fans']){
    const pair=[false,true].map(male=>{
      const g=new Element('g');assert(draw(g,{id:'tropicalis::Barro Colorado Island, Panama::wrap',family},male));
      const nodes=walk(g), shapes=nodes.filter(n=>['path','ellipse'].includes(n.tag));
      assert(shapes.length>12);
      for(const n of shapes){
        assert(n.attributes.fill);assert(n.attributes.stroke);
        assert(!Object.values(n.attributes).some(v=>/NaN|Infinity|undefined/.test(v)));
        if(n.tag==='path')assert(!/[^MmZzLlHhVvCcSsQqTtAaEe0-9.,+\s-]/.test(n.attributes.d));
      }
      for(const n of nodes){
        if(n.attributes.id)ids.push(n.attributes.id);
        const ref=n.attributes['clip-path'];
        if(ref)assert(nodes.some(c=>ref===`url(#${c.attributes.id})`));
      }
      if(family.includes('map-fans'))assert.equal(nodes.find(n=>n.tag==='text').textContent,'50 HA');
      return nodes.map(n=>n.attributes);
    });
    assert.notDeepEqual(pair[0],pair[1]);
  }
  assert.equal(new Set(ids).size,ids.length,'No duplicate clip identifiers');
  assert.equal(draw(new Element('g'),{id:'tropicalis::Oahu::wrap',family:'qg2726-golden-fleece-cape'},false),false);
  console.log('Panama: six distinct drawings, contained fleece and fan details, explicit paint, scoped dispatch and valid geometry.');
})().catch(e=>{console.error(e);process.exitCode=1});
