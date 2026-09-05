// Structural checks accompany the separate in-page visual and interaction review.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
class Element {
  constructor(tag) {
    this.nodeName = tag;
    this.attributes = {};
    this.children = [];
    this.dataset = {};
    this.style = {setProperty(k,v){this[k]=v;}};
    this.classList = {
      add: (...names) => { this.attributes.class = [...new Set([...(this.attributes.class || '').split(' ').filter(Boolean),...names])].join(' '); },
      contains: name => (this.attributes.class || '').split(' ').includes(name)
    };
  }
  setAttribute(k,v) { this.attributes[k] = String(v); }
  getAttribute(k) { return this.attributes[k] ?? null; }
  appendChild(n) { this.children.push(n); return n; }
  append(...nodes) { this.children.push(...nodes); }
  replaceChildren(...nodes) { this.children = nodes; }
  querySelector(selector) {
    assert(selector.startsWith('.'),'Mock supports class selectors only');
    return walk(this).slice(1).find(n=>n.classList.contains(selector.slice(1))) || null;
  }
}
global.document = {createElementNS:(_,tag)=>new Element(tag)};
const walk = n => [n,...n.children.flatMap(walk)];
(async()=>{
  const root=path.join(__dirname,'..','game-of-worms');
  const {renderLocationAccessories,auditAccessoryPairGeometry,accessoryCatalogue} =
    await import(pathToFileURL(path.join(root,'accessory-designs.js')));
  const targets = Object.fromEntries(['headwear','wrap','charm','extra'].map(key=>[key,new Element('g')]));
  renderLocationAccessories(targets,'elegans','Kauaʻi, Hawaiʻi');
  assert.equal(targets.headwear.children.length,2);
  assert.equal(targets.wrap.children.length,2);
  assert.equal(targets.charm.children.length,1,'Shared recorder must render only once');
  assert.equal(targets.charm.children[0].dataset.sharedAccessory,'true');
  const reels=walk(targets.charm).filter(n=>n.attributes.class==='kauai-tape-reel');
  assert.equal(reels.length,2);
  for(const target of Object.values(targets)) for(const n of walk(target)) {
    for(const value of Object.values(n.attributes)) assert(!/NaN|undefined|Infinity/.test(value));
  }
  const audit=auditAccessoryPairGeometry();
  assert(audit.valid,JSON.stringify(audit));
  assert.equal(audit.sharedCount,1);
  assert.equal(audit.pairCount+audit.sharedCount,accessoryCatalogue.reduce((n,d)=>n+3+(d.extra?1:0),0));
  renderLocationAccessories(targets,'elegans','Santeuil, France');
  assert.equal(targets.charm.children.length,2,'Other locations retain their pair');
  assert(targets.charm.children.every(n=>!n.dataset.sharedAccessory));
  const code=fs.readFileSync(path.join(root,'accessory-designs.js'),'utf8');
  assert(!code.includes('xz1516-genome-tuning-wheel'));
  assert(!code.includes('genome tuning wheels'));
  const css=fs.readFileSync(path.join(root,'style.css'),'utf8');
  assert.match(css,/@media \(prefers-reduced-motion: no-preference\) \{\s*\.accessory:not\(\[hidden\]\) \.kauai-tape-reel \{ animation: kauai-tape-run 4\.8s linear 1;/);
  console.log('Kauaʻi: five pieces, one shared recorder, two reels, reduced-motion guard and full-catalogue geometry verified.');
})().catch(e=>{console.error(e);process.exitCode=1});
