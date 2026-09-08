const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {pathToFileURL,fileURLToPath}=require('node:url');
const root=path.join(__dirname,'../game-of-worms'),mod=n=>import(pathToFileURL(path.join(root,n)));
class Element{constructor(tag){this.tag=tag;this.children=[];this.attributes={};}setAttribute(k,v){this.attributes[k]=String(v);}appendChild(n){this.children.push(n);return n;}}
const walk=n=>[n,...n.children.flatMap(walk)];global.document={createElementNS:(_,t)=>new Element(t)};
(async()=>{
  const {drawHcmc:draw,SCOOTER,FRUIT,COFFEE,hcmcLayouts}=await mod('hcmc-art.js');
  const {rideFrame,fruitFrame,coffeeFrame}=await mod('hcmc-play.js');
  const ids=[];
  for(const family of [SCOOTER,FRUIT,COFFEE]){
    const versions=[];
    for(const male of family===SCOOTER?[false]:[false,true]){
      const g=new Element('g');assert(draw(g,{family},male));const nodes=walk(g);
      for(const n of nodes){assert(!Object.values(n.attributes).some(v=>/NaN|undefined|Infinity/.test(v)));if(n.tag==='path')assert(n.attributes.fill&&n.attributes.stroke);if(n.attributes.id)ids.push(n.attributes.id);if(n.attributes['clip-path'])assert(nodes.some(c=>'url(#'+c.attributes.id+')'===n.attributes['clip-path']));}
      assert(hcmcLayouts[family][male?'companion':'primary'].every(Number.isFinite));
      assert.match(g.attributes.style,/transform-origin:0 0/);
      if(family===SCOOTER)assert.equal(nodes.filter(n=>'data-hc-wheel' in n.attributes).length,2);
      if(family===FRUIT)assert.equal(nodes.filter(n=>(male?'data-hc-pack-source':'data-hc-cut-slice') in n.attributes).length,3);
      if(family===COFFEE)assert(nodes.some(n=>(male?'data-hc-spoon':'data-hc-phin') in n.attributes));
      versions.push(JSON.stringify(nodes));
    }
    if(versions.length===2)assert.notEqual(...versions,'Separate paired constructions');
  }
  assert.equal(ids.length,new Set(ids).size);assert(!draw(new Element('g'),{family:'unrelated'},false));
  for(const male of [false,true])for(const reduced of [false,true])for(let ms=0;ms<=6100;ms+=20){
    const ride=rideFrame(ms,reduced),fruit=fruitFrame(ms,male,reduced),coffee=coffeeFrame(ms,male,reduced);
    for(const frame of [ride,fruit,coffee])assert(Object.values(frame).every(v=>typeof v==='boolean'||Number.isFinite(v)));
    assert(ride.mount>=0&&ride.mount<=1);assert(fruit.cut>=0&&fruit.cut<=1&&fruit.count>=0&&fruit.count<=3);
    assert(coffee.blend>=0&&coffee.blend<=1&&coffee.brew>=0&&coffee.brew<=1);
    if(reduced){assert.equal(ride.x,0);assert.equal(ride.mount,0);assert.equal(coffee.stir,0);}
  }
  assert(rideFrame(2100).x>400);assert(rideFrame(3000).x< -800);assert.equal(rideFrame(5000).x,0);assert.equal(rideFrame(6020).mount,0);
  assert(rideFrame(6100).done&&fruitFrame(4450,false).done&&coffeeFrame(3950,true).done);
  const {hcmcClips:clips,createHcmcSound}=await mod('hcmc-audio.js');
  const bytes=new Map();let total=0;
  for(const[k,url]of Object.entries(clips)){
    const b=fs.readFileSync(fileURLToPath(url));bytes.set(url,b);total+=b.length;
    assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.readUInt16LE(22),1);assert.equal(b.readUInt32LE(24),44100);assert.equal(b.readUInt16LE(34),16);
    assert.equal((b.length-44)/88200,{engine:2.3,cut:.48,stir:2.1}[k]);assert.equal(b.readInt16LE(44),0);assert.equal(b.readInt16LE(b.length-2),0);
    let peak=0;for(let i=44;i<b.length;i+=2)peak=Math.max(peak,Math.abs(b.readInt16LE(i)/32768));assert(Math.abs(peak-{engine:.3,cut:.34,stir:.26}[k])<.001);
  }
  assert(total<440000);
  let requests=0,contexts=0,active=0,max=0;const sources=[];
  const ctx={state:'running',destination:{},resume:async()=>{},decodeAudioData:async b=>({duration:(b.byteLength-44)/88200}),createGain:()=>({gain:{},connect(){},disconnect(){}}),createBufferSource(){let on=false;const n={connect(){},disconnect(){},start(t,offset){this.offset=offset;on=true;active++;max=Math.max(max,active);},stop(){if(on){on=false;active--;this.onended?.();}}};sources.push(n);return n;}};
  global.window={AudioContext:function(){contexts++;return ctx;}};global.document={hidden:false};
  const fetchClip=async url=>{requests++;return{ok:true,arrayBuffer:async()=>Uint8Array.from(bytes.get(url)).buffer};};global.fetch=fetchClip;
  const sound=createHcmcSound();sound.play('engine');assert.equal(contexts,0);assert.equal(requests,0);
  await Promise.all([sound.unlock('ride'),sound.unlock('ride')]);assert.equal(requests,1);assert.equal(contexts,1);
  sound.play('engine');sound.play('engine');assert.equal(max,1);sound.stop();assert.equal(active,0);
  await sound.unlock('fruit');sound.play('cut',.7,40);assert.equal(sources.at(-1).offset,.04);sound.stop();
  document.hidden=true;sound.play('cut');assert.equal(active,0);document.hidden=false;ctx.state='suspended';sound.play('cut');assert.equal(active,0);ctx.state='running';
  sound.play('cut',1,600);assert.equal(active,0);await sound.unlock('coffee');assert.equal(requests,3);
  let release;global.fetch=url=>new Promise(resolve=>{release=()=>resolve(fetchClip(url));});const slow=createHcmcSound(),pending=slow.unlock('ride');slow.play('engine');slow.stop();release();await pending;assert.equal(active,0);
  global.fetch=async()=>({ok:false});const retry=createHcmcSound();assert.equal(await retry.unlock('fruit'),false);global.fetch=fetchClip;assert.equal(await retry.unlock('fruit'),true);retry.play('cut');assert.equal(active,1);retry.stop();
  const game=fs.readFileSync(path.join(root,'game.js'),'utf8'),catalogue=fs.readFileSync(path.join(root,'accessory-designs.js'),'utf8');
  assert.match(catalogue,/sharedAccessoryFamilies = new Set\(\[[^\n]+ju4356-shared-scooter/);
  assert.match(game,/hcmcPlay.active/);assert.match(game,/hcmcPlay.start\(piece\)/);assert.match(game,/hcmcPlay.cancel\(\)/);
  console.log('HCMC: five original SVGs, shared scooter, paired differences, finite action frames, reduced motion, recorded audio levels, gesture loading, cancellation and failure/retry checks pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});
