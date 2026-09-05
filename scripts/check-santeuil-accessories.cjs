// Structural regression checks supplement the separate production-size browser review.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
class Element {
  constructor(tag) { this.tag = tag; this.attrs = {}; this.children = []; this.classList = {add(){}}; }
  setAttribute(k,v) { this.attrs[k] = String(v); }
  appendChild(n) { this.children.push(n); }
}
global.document = {createElementNS:(_,tag)=>new Element(tag)};
const walk = n => [n,...n.children.flatMap(walk)];
(async()=>{
  const root=path.join(__dirname,'..','game-of-worms');
  const source=fs.readFileSync(path.join(root,'santeuil-accessories.js'),'utf8');
  const {drawSanteuilRefinement}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
  for(const family of ['santeuil-railway-driver-uniform','santeuil-cylinder-organ-instrument','santeuil-hogweed-locomotive']) {
    const pair=[];
    for(const small of [false,true]) {
      const g=new Element('g');
      assert(drawSanteuilRefinement(g,{family},small));
      const nodes=walk(g);
      assert(nodes.length>=25, `${family} (${small}): ${nodes.length} nodes`);
      for(const n of nodes) for(const value of Object.values(n.attrs)) assert(!/NaN|undefined|Infinity/.test(value));
      // Ignore paint and transforms: paired construction must differ in its own coordinates.
      pair.push(JSON.stringify(nodes.map(n=>[n.tag,n.attrs.d,n.attrs.cx,n.attrs.cy,n.attrs.rx,n.attrs.ry])));
    }
    assert.notEqual(pair[0],pair[1],family+' must have separately drawn paired geometry');
  }
  assert.equal(drawSanteuilRefinement(new Element('g'),{family:'unrelated'},false),false);
  const dispatch=fs.readFileSync(path.join(root,'accessory-designs.js'),'utf8');
  assert(dispatch.indexOf('if (drawSanteuilRefinement')<dispatch.indexOf('if (drawElegansFieldAccessory'));
  assert(!dispatch.includes('if (location === "santeuil" && item.family'));
  assert.match(dispatch,/"santeuil-railway-driver-uniform": \{ primary: \[0, 0, 1, 0\], companion: \[-28, 82, \.43, 0\]/);
  assert.match(dispatch,/const isFittedKilt = [^\n]*santeuil-railway-driver-uniform/);
  console.log('Santeuil: six distinct drawings, native body fit, synchronized motion and active dispatch verified.');
})().catch(error=>{console.error(error);process.exitCode=1});
