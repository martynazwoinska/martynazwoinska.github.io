const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const {pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'../game-of-worms');
class Element{
  constructor(tag){this.tag=tag;this.children=[];this.attributes={};this.dataset={};}
  setAttribute(k,v){this.attributes[k]=String(v);}
  appendChild(n){this.children.push(n);return n;}
}
global.document={createElementNS:(_,tag)=>new Element(tag)};
const walk=n=>[n,...n.children.flatMap(walk)];
const load=n=>import(pathToFileURL(path.join(root,n)));
(async()=>{
  const {TASTING,drawOahuChocolate,chocolateLayouts}=await load('oahu-chocolate-art.js');
  for(const family of[TASTING]){
    const signatures=[];
    for(const small of[false,true]){
      const g=new Element('g');assert(drawOahuChocolate(g,{family},small));
      const nodes=walk(g),ids=nodes.flatMap(n=>n.attributes.id?[n.attributes.id]:[]);
      assert.equal(ids.length,new Set(ids).size);
      assert(nodes.length>20);
      for(const n of nodes)for(const [k,v]of Object.entries(n.attributes)){
        assert(!/NaN|Infinity|undefined/.test(v));
        if(v.startsWith('url(#'))assert(ids.includes(v.slice(5,-1)));
        if(n.tag==='path')assert(n.attributes.fill&&n.attributes.stroke);
      }
      assert(nodes.some(n=>n.attributes['data-choc-part']==='bite'));
      assert(!nodes.some(n=>n.attributes['data-choc-part']==='tray'));
      assert(chocolateLayouts[family][small?'companion':'primary'].every(Number.isFinite));
      signatures.push(JSON.stringify(g));
    }
    assert.notEqual(...signatures,'Paired objects must be separately constructed');
  }
  assert(!drawOahuChocolate(new Element('g'),{family:'other'},false));
  assert(!drawOahuChocolate(new Element('g'),{family:'eca789-chocolate-moulds'},false));
  const {chocolateFrame}=await load('oahu-chocolate-play.js');
  {
    for(let ms=0;ms<4300;ms+=10){
      const s=chocolateFrame(ms);
      assert(Object.values(s).every(v=>typeof v==='boolean'||Number.isFinite(v)));
      for(const k of['reach','eat','chew'])assert(s[k]>=0&&s[k]<=1);
    }
    const reduced=chocolateFrame(650,true);
    assert(reduced.done);assert.equal(reduced.reach,0);assert.equal(reduced.eat,0);
    assert.equal(chocolateFrame(0).reach,0);
    assert(chocolateFrame(4300).done);
  }
  const code=fs.readFileSync(path.join(root,'oahu-chocolate-play.js'),'utf8');
  for(const hook of['pagehide','visibilitychange','resize'])assert(code.includes(hook));
  assert(code.includes('reduced.addEventListener'));
  assert(code.includes('new DOMMatrix([m.a,m.b,m.c,m.d,m.e,m.f])'));
  assert(code.includes("clone.setAttribute('opacity','1')"),'Repeated tasting must show a fresh piece');
  assert(code.includes('r.saved'));assert(code.includes('bike.cancel()'));assert(code.includes('sound.stop()'));
  const source=fs.readFileSync(path.join(root,'accessory-designs.js'),'utf8');
  const row=source.split('\n').find(l=>l.includes('["tropicalis", "Oʻahu'));
  assert(row.includes('eca789-chocolate-gifts')&&row.includes(TASTING));assert(!/trumpet|harp|xylophone|mould/i.test(row));
  assert(code.includes("sound.play('bite',male,ms-1810)"));
  assert(code.includes("n.style.pointerEvents='none'"));
  const game=fs.readFileSync(path.join(root,'game.js'),'utf8');
  assert(game.includes('els.localHeadwearLabel.closest("button").hidden = !accessoryDesign.headwear'));
  assert(game.includes('const width = 44 / scaleX, height = 44 / scaleY'));
  assert(game.includes('new DOMPoint(111, 93)'));
  assert(!/bonbon/i.test(fs.readFileSync(path.join(root,'oahu-chocolate-art.js'),'utf8')));
  console.log('Oahu chocolate: independent gifts, moulds removed, distinct tasting drawings, finite/reduced motion, timed bites, cancellation and 44 px crank target passed.');
})().catch(e=>{console.error(e);process.exitCode=1;});
