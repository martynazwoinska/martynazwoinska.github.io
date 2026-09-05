// Structural regression checks supplement the separate production-size browser review.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
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
  const approvedSource=execFileSync('git',['show','5f6d3a2:game-of-worms/santeuil-accessories.js'],{cwd:root,encoding:'utf8'});
  const approved=await import('data:text/javascript;base64,'+Buffer.from(approvedSource).toString('base64'));
  for(const [family,small] of [['santeuil-railway-driver-uniform',false],['santeuil-railway-driver-uniform',true],['santeuil-cylinder-organ-instrument',false],['santeuil-hogweed-locomotive',false]]) {
    const before=new Element('g'),after=new Element('g');
    approved.drawSanteuilRefinement(before,{family},small);
    drawSanteuilRefinement(after,{family},small);
    if (family === 'santeuil-railway-driver-uniform') {
      const artwork = root => walk(root).filter(n=>n.tag!=='g').map(n=>[n.tag,n.attrs]);
      assert.deepEqual(artwork(after),artwork(before),'Uniform artwork stays intact while fit groups change');
      assert.equal(after.children[0].attrs.class,'santeuil-jacket-fit');
      assert.equal(after.children[0].attrs.transform,small?'matrix(1 0 -0.18 1 25 2)':'matrix(1 0 -0.25 1 34 3)');
      assert.equal(after.children[1].attrs.class,'santeuil-cap-fit');
      assert.equal(after.children[1].attrs.transform,small?'translate(330 34) rotate(27)':'translate(331 33) rotate(27)');
    } else {
      assert.equal(JSON.stringify(after),JSON.stringify(before),family+' approved geometry and paint must remain unchanged');
    }
  }
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
  assert(dispatch.includes('companion ? "concertina" : "cylinder organ"'));
  assert(dispatch.includes('companion ? "railway trolley" : "hogweed-stem locomotive"'));
  console.log('Santeuil: separate cap/jacket fit, preserved uniform artwork and primary props, distinct male props and per-piece naming verified.');
})().catch(error=>{console.error(error);process.exitCode=1});
