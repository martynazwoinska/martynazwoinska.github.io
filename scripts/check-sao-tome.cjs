const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {pathToFileURL}=require('node:url');
const moduleAt=n=>import(pathToFileURL(path.resolve('game-of-worms',n)));
class Element {
  constructor(tag){this.tag=this.nodeName=tag;this.attributes={};this.children=[];this.dataset={};this.style={setProperty(k,v){this[k]=v;}};this.classList={add:(...a)=>{this.attributes.class=[this.attributes.class||'',...a].join(' ').trim();}};}
  setAttribute(k,v){this.attributes[k]=String(v);}getAttribute(k){return this.attributes[k]??null;}
  appendChild(n){this.children.push(n);return n;}
  append(...nodes){nodes.forEach(n=>this.appendChild(n));}
  querySelector(selector){return walk(this).slice(1).find(n=>selector.startsWith('.')?(n.attributes.class||'').split(/\s+/).includes(selector.slice(1)):selector.startsWith('[')?selector.slice(1,-1) in n.attributes:n.tag===selector)||null;}
}
const walk=n=>[n,...n.children.flatMap(walk)];
(async()=>{
  const {snailFrame,lowWormPath,crawlingPath,rideWormPath,riderBoard,RIDE_TIMING,glideProgress,snailRoute,snailGait,pedalRimPath}=await moduleAt('sao-tome-play.js');
  const body='M78 228C122 280 173 255 181 203C188 151 225 105 278 113C330 121 355 82 326 54';
  for(const kind of['ride','leaf'])for(let ms=0;ms<=15000;ms+=16){
    const f=snailFrame(ms,kind);
    for(const key of['pose','lift','travel','disembark','returning'])assert(f[key]>=0&&f[key]<=1,kind+' '+key+' '+ms);
    const points=crawlingPath(lowWormPath(body,f.pose),ms,f.pose).match(/-?\d*\.?\d+/g).map(Number);
    assert.equal(points.length,20);assert(points.every(Number.isFinite));
    assert.deepEqual(points.slice(-2),[326,54]);
    for(const male of[false,true]){
      const ride=rideWormPath(body,male,riderBoard(ms,male),f.disembark,f.returning).match(/-?\d*\.?\d+/g).map(Number);
      assert.equal(ride.length,20);assert(ride.every(Number.isFinite));assert.deepEqual(ride.slice(-2),[326,54]);
    }
    const reduced=snailFrame(ms,kind,true);assert.equal(reduced.pose,0);assert.equal(reduced.travel,0);assert.equal(reduced.disembark,0);
  }
  assert.equal(snailFrame(0,'ride').pose,0);assert.equal(snailFrame(RIDE_TIMING.end,'ride').returning,1);
  assert(snailFrame(RIDE_TIMING.end,'ride').done);assert(snailFrame(6800,'leaf').done);
  assert.equal(snailFrame(3000,'leaf').lift,1);assert.equal(snailFrame(6000,'leaf').lift,0);
  assert(riderBoard(1300,true)>riderBoard(1300,false),'Staggered boarding');
  assert.equal(riderBoard(2800,false),1);assert.equal(riderBoard(2800,true),1);
  assert.equal(snailFrame(RIDE_TIMING.boardEnd,'ride').travel,0);assert.equal(snailFrame(RIDE_TIMING.rideEnd,'ride').travel,1);
  assert.equal(snailFrame(RIDE_TIMING.rideEnd,'ride').disembark,0);assert.equal(snailFrame(RIDE_TIMING.land,'ride').disembark,1);
  assert.equal(snailFrame(RIDE_TIMING.land,'ride').returning,0);
  assert.equal(RIDE_TIMING.rideEnd-RIDE_TIMING.boardEnd,8600);
  assert(!snailFrame(9900,'ride').done,'Ride lasts beyond the previous whole sequence');
  for(let q=0;q<=1;q+=.001){
    assert(glideProgress(q)>=glideProgress(q-.001),'Never slide backwards');
    assert(glideProgress(q)<=1);
  }
  const speed=q=>(glideProgress(q+.001)-glideProgress(q))/.001;
  assert(Math.abs(speed(.35)-speed(.65))<1e-9,'Steady middle section');
  assert(speed(0)<.001);assert(speed(.999)<.001);
  assert.equal(snailRoute(130,0),130,'Left-hand snail starts where it stands');
  assert.equal(snailRoute(210,1),285);
  for(let ms=0;ms<=RIDE_TIMING.end;ms+=16){
    const g=snailGait(ms);
    assert(g.strength>=0&&g.strength<=1);assert(Math.abs(g.headX)<=2.3);
    assert(Math.abs(g.headTilt)<=.8);assert(g.near>=-18&&g.near<=6);assert(g.far>=-6&&g.far<=20);
    assert(Math.abs(g.nearBend)<=3);assert(Math.abs(g.farBend)<=2);
    if(ms<=RIDE_TIMING.boardEnd||ms>=RIDE_TIMING.rideEnd)assert.equal(g.strength,0);
    for(const key of ['strength','near','far','nearBend','farBend'])assert.equal(Math.abs(snailGait(ms,true)[key]),0);
    const rim=pedalRimPath(ms,g.strength).match(/-?\d*\.?\d+/g).map(Number);
    assert(rim.every(Number.isFinite));assert.equal(rim.length,82);
    for(let j=1;j<rim.length;j+=2)assert(rim[j]>9&&rim[j]<23,'Sole stays by the ground');
  }
  assert.notEqual(rideWormPath(body,false,1,0,0),rideWormPath(body,true,1,0,0),'Separately shaped riders');
  const feelerSamples=Array.from({length:86},(_,i)=>snailGait(2800+i*100));
  assert(Math.max(...feelerSamples.map(g=>g.near))-Math.min(...feelerSamples.map(g=>g.near))>20,'Visible near-tentacle sweep');
  assert(Math.max(...feelerSamples.map(g=>g.far))-Math.min(...feelerSamples.map(g=>g.far))>22,'Independent far-tentacle sweep');
  assert.deepEqual(rideWormPath(body,false,1,1,1).match(/-?\d*\.?\d+/g).map(Number),body.match(/-?\d*\.?\d+/g).map(Number));
  global.document={createElementNS:(_,tag)=>new Element(tag),querySelector:()=>null};
  const {RIDE,LEAF,HATS,drawSaoTomeAccessory,saoTomeLayouts}=await moduleAt('sao-tome-art.js');
  const drawings=[];
  for(const [family,male] of [[RIDE,false],[LEAF,false],[HATS,false],[HATS,true]]){
    const p=new Element('g');assert(drawSaoTomeAccessory(p,{family},male));drawings.push(p);
    const nodes=walk(p),ids=nodes.map(n=>n.attributes.id).filter(Boolean);
    assert.equal(ids.length,new Set(ids).size);
    for(const n of nodes)for(const v of Object.values(n.attributes)){
      assert(!/NaN|Infinity|undefined/.test(v));
      for(const m of v.matchAll(/url\(#([^)]*)\)/g))assert(ids.includes(m[1]),'Missing SVG paint target');
    }
  }
  assert.notEqual(JSON.stringify(drawings[0].children),JSON.stringify(drawings[1].children));
  assert(!saoTomeLayouts[LEAF].companion);assert(!saoTomeLayouts[RIDE].companion);
  assert.equal(saoTomeLayouts[RIDE].primary[0],130);
  assert(saoTomeLayouts[LEAF].primary[0]-saoTomeLayouts[RIDE].primary[0]>=150,'Separate initial prop positions');
  assert.notEqual(JSON.stringify(drawings[2].children),JSON.stringify(drawings[3].children),'Distinct leaf hat construction');
  assert(walk(drawings[0]).some(n=>'data-obo-shell'in n.attributes));
  assert(!walk(drawings[1]).some(n=>'data-obo-shell'in n.attributes),'Leaf does not contain a second idle snail');
  const catalogue=await moduleAt('accessory-designs.js');
  assert(catalogue.auditAccessoryCatalogue().valid);
  const pairs=catalogue.auditAccessoryPairGeometry();assert(pairs.valid,JSON.stringify(pairs));
  const design=catalogue.getAccessoryDesign('nigoni','São Tomé · JU2484');
  assert.equal(design.headwear.family,RIDE);assert.equal(design.wrap.family,LEAF);
  assert.equal(design.charm.family,HATS);assert.equal(design.charm.label,'Leaf hats');
  const game=fs.readFileSync('game-of-worms/game.js','utf8'),play=fs.readFileSync('game-of-worms/sao-tome-play.js','utf8');
  for(const hook of['saoTomePlay.start(piece)','saoTomePlay.handles(piece)','saoTomePlay.adjust(piece)','saoTomePlay.cancel()','saoTomePlay.clear()','saoTomePlay.active'])assert(game.includes(hook));
  for(const hook of['IntersectionObserver','visibilitychange','pagehide','resize',"reduced.addEventListener('change'", "n.setAttribute('style',v)", "e.key==='Escape'",'run===r','new DOMMatrix([m.a,m.b,m.c,m.d,m.e,m.f])'])assert(play.includes(hook));
  assert(!play.includes('dataset.userScale'));assert(!play.includes("unlock('bird')"));
  assert(!play.includes('drawFlag'));assert(!play.includes('RACE'));
  assert(play.includes('snailPose.multiply(seat)'),'Riders use the travelling snail coordinate system');
  assert(play.includes('from.inverse().multiply(r.matrix(art))'),'Worn hats preserve relative placement during both actions');
  assert(!play.includes('r.snailParts.foot.setAttribute'),'Foot does not rock back and forth as a rigid piece');
  assert(game.includes('Some nematodes reach new feeding sites by travelling with snails and slugs, a form of hitchhiking called phoresy.'));
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync('game-of-worms/assets/audio/pohnpei-leaves.ogg')).digest('hex'),'678c0da00ef1092f4be7c2d8c7b22c1c91c5fc8ca1f3f9570ce59de995c0138c');
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync('game-of-worms/assets/sao-tome-ju2484-painted-background.webp')).digest('hex'),'32adbd6afb8ab3d65f24cb3ab6a176479d9e72066c96f00b2aa078a37d9244b8');
  console.log('PASS: Sao Tome reference-led vectors, one shared snail, separate leaf, no flags, SVG paint targets and complete catalogue/pair audits');
  console.log('PASS: bounded shared ride/reveal, distinct coils, staggered boarding, stationary dismount, full restoration, stable faces, reduced motion and lifecycle/keyboard hooks');
  console.log('PASS: existing licensed leaf recording unchanged, no synthetic snail call, no saved visitor-transform mutation');
  console.log('PASS: 8.6-second steady glide, smooth speed ramps, bounded independent feelers and subtle sole contractions');
})().catch(e=>{console.error(e);process.exitCode=1;});
