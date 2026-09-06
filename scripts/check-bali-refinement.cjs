const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
class Element {
  constructor(tag) { this.tag=tag; this.children=[]; this.attributes={}; this.dataset={}; }
  setAttribute(k,v) { this.attributes[k]=String(v); }
  appendChild(n) { this.children.push(n); return n; }
}
global.document={createElementNS:(_,tag)=>new Element(tag)};
const walk=n=>[n,...n.children.flatMap(walk)];
(async()=>{
  const {drawBaliRefinement:draw}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/bali-refinement.js')));
  const ids=[];
  for(const family of ['ju1873-cacao-specimen-lantern','ju1873-balinese-endek-wrap','ju1873-balinese-gamelan-gong']) {
    const pair=[false,true].map(male=>{
      const g=new Element('g');
      assert(draw(g,{id:'wallacei::Sanda, Bali · JU1873::wrap',family},male));
      assert.equal(g.dataset.refinement,'bali-20260906');
      const nodes=walk(g),shapes=nodes.filter(n=>['path','ellipse'].includes(n.tag));
      if(family==='ju1873-cacao-specimen-lantern' && !male) {
        assert.equal(shapes.length,10,'Female keeps only the unchanged machete');
        assert(!nodes.some(n=>n.attributes.transform?.includes('translate(48 78)')),'Female pod removed');
      } else assert(shapes.length>15);
      for(const n of shapes) {
        assert(n.attributes.fill); assert(n.attributes.stroke);
        assert(!Object.values(n.attributes).some(v=>/NaN|Infinity|undefined/.test(v)));
        if(n.tag==='path')assert(!/[^MmZzLlHhVvCcSsQqTtAaEe0-9.,+\s-]/.test(n.attributes.d));
      }
      for(const n of nodes) {
        if(n.attributes.id)ids.push(n.attributes.id);
        const ref=n.attributes['clip-path'];
        if(ref)assert(nodes.some(c=>ref===`url(#${c.attributes.id})`));
      }
      if(family.includes('endek'))assert(nodes.some(n=>n.attributes['clip-path']));
      if(family==='ju1873-cacao-specimen-lantern')assert.equal(nodes.some(n=>n.attributes['data-tool']==='wooden-club'),male);
      return nodes.map(n=>n.attributes);
    });
    assert.notDeepEqual(pair[0],pair[1]);
    assert.notEqual(pair[0].length,pair[1].length,'Pair has independent construction');
  }
  assert.equal(new Set(ids).size,ids.length,'Unique clipping identifiers');
  assert.equal(draw(new Element('g'),{id:'tropicalis::Panama::wrap',family:'ju1873-balinese-endek-wrap'},false),false);
  console.log('Bali: six distinct drawings, explicit paint, clipped weave, valid geometry and isolated dispatch.');
})().catch(e=>{console.error(e);process.exitCode=1;});
