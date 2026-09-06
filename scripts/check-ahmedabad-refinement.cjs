const assert = require('node:assert/strict');
const {pathToFileURL} = require('node:url');
const path = require('node:path');
class Element {
  constructor(tag) { this.tag=tag; this.attributes={}; this.children=[]; this.dataset={}; this.classList={add:()=>{}}; }
  setAttribute(k,v) { this.attributes[k]=String(v); }
  appendChild(n) { this.children.push(n); return n; }
}
global.document={createElementNS:(_,tag)=>new Element(tag)};
const walk=n=>[n,...n.children.flatMap(walk)];
(async()=>{
  const {drawAhmedabadRefinement:draw}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/ahmedabad-refinement.js')));
  for (const family of ['lattice-fan','kite-rig','soil-kit']) {
    const pair=[false,true].map(male=>{
      const g=new Element('g');
      assert(draw(g,{id:'briggsae::Ahmedabad, India · AF16::headwear',family},male));
      if(family==='kite-rig') {
        const cord=walk(g).find(n=>n.attributes.class==='af16-flight-cord');
        assert(cord.attributes.d.startsWith('M0 0C'),'Curved line starts at the fixed reel exit');
        const end=cord.attributes.d.match(/(-?[\d.]+) (-?[\d.]+)$/).slice(1).map(Number);
        const [x,y,angle,kx,ky]=male?[-26,-196,-16,12,12]:[20,-218,13,15,14];
        const r=angle*Math.PI/180;
        assert(Math.hypot(end[0]-(x+kx*Math.cos(r)-ky*Math.sin(r)),
          end[1]-(y+kx*Math.sin(r)+ky*Math.cos(r)))<.001,'Thread ends at transformed bridle knot');
        assert(Math.hypot(...end)>180,'Long flying thread');
        const paper=walk(g).find(n=>n.attributes.class==='af16-kite-paper-motion');
        assert.equal(paper.attributes.style,`transform-origin: ${kx}px ${ky}px;`,'Paper tilts around its tether');
        const canopy=walk(g).find(n=>n.attributes.class==='af16-kite-canopy');
        assert.equal(canopy.attributes.transform,`translate(${kx} ${ky}) scale(${male?1.65:1.5}) translate(${-kx} ${-ky})`,'Only the canopy grows around the fixed knot');
        assert(g.children.length>1,'Reel remains outside animated flight group');
      }
      const shapes=walk(g).filter(n=>['path','ellipse'].includes(n.tag));
      assert(shapes.length>=15);
      for(const n of shapes) {
        assert(n.attributes.fill,'Explicit paint prevents black fallback');
        assert(n.attributes.stroke,'Explicit outline prevents inherited paint');
        assert(!Object.values(n.attributes).some(v=>/NaN|undefined|Infinity/.test(v)));
        if(n.tag==='path') assert(!/[^MmZzLlHhVvCcSsQqTtAaEe0-9.,+\s-]/.test(n.attributes.d));
      }
      return shapes.map(n=>n.attributes.d||[n.attributes.cx,n.attributes.cy,n.attributes.rx,n.attributes.ry].join(','));
    });
    assert.notDeepEqual(pair[0],pair[1],`${family}: individually constructed pair`);
  }
  assert.equal(draw(new Element('g'),{id:'briggsae::Orsay::headwear',family:'lattice-fan'},false),false);
  console.log('Ahmedabad: six distinct drawings, explicit paint, valid path data and location-scoped dispatch.');
})().catch(e=>{console.error(e);process.exitCode=1});
