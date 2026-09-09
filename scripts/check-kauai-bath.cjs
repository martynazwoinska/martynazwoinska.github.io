const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const{pathToFileURL,fileURLToPath}=require('node:url'),root=path.resolve(__dirname,'../game-of-worms');
const mod=n=>import(pathToFileURL(path.join(root,n)));
class Element{constructor(tag){this.tag=tag;this.children=[];this.attributes={};}setAttribute(k,v){this.attributes[k]=String(v);}appendChild(n){this.children.push(n);return n;}}
const walk=n=>[n,...n.children.flatMap(walk)];global.document={createElementNS:(_,t)=>new Element(t)};
(async()=>{
 const{drawKauaiBath:draw,bathFamilies,bathLayouts,GINGER,RINSE,TOWEL}=await mod('kauai-bath-art.js'),ids=[];
 for(const family of bathFamilies){const pairs=[];for(const male of[false,true]){
  const g=new Element('g');assert(draw(g,{family},male));const nodes=walk(g);
  assert(nodes.some(n=>n.tag==='path'));for(const n of nodes){assert(!Object.values(n.attributes).some(v=>/NaN|undefined|Infinity/.test(v)));if(n.tag==='path')assert(n.attributes.fill&&n.attributes.stroke);if(n.attributes.id)ids.push(n.attributes.id);}
  for(const n of nodes)for(const v of Object.values(n.attributes))if(v.startsWith('url(#'))assert(nodes.some(c=>`url(#${c.attributes.id})`===v));
  assert(bathLayouts[family][male?'companion':'primary'].every(Number.isFinite));
  const key=family===GINGER?(male?'bowl-liquid':'cone'):family===RINSE?(male?'dipper':'jug'):'towel-flap';assert(nodes.some(n=>('data-bath-'+key)in n.attributes));
  pairs.push(JSON.stringify(nodes));
 }assert.notEqual(...pairs);}
 assert.equal(ids.length,new Set(ids).size);assert(!draw(new Element('g'),{family:'other'},false));
 const{bathFrame}=await mod('kauai-bath-play.js');
 for(const kind of['ginger','rinse','towel'])for(const reduced of[false,true])for(let ms=0;ms<5500;ms+=16){const s=bathFrame(kind,ms,reduced);for(const[k,v]of Object.entries(s))assert(typeof v==='boolean'||Number.isFinite(v)&&(k==='wipe'?Math.abs(v)<=1:v>=0&&v<=1));if(reduced)assert(Object.entries(s).every(([k,v])=>k==='done'||v===0));}
 assert(bathFrame('ginger',5100).done);assert(bathFrame('rinse',1700).flow>.99);assert(bathFrame('towel',2200).tangle>.99);
 const{bathClips,createBathSound}=await mod('kauai-bath-audio.js'),bytes=new Map();let total=0;
 for(const[k,url]of Object.entries(bathClips)){const b=fs.readFileSync(fileURLToPath(url));bytes.set(url,b);total+=b.length;assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.readUInt16LE(22),1);assert.equal(b.readUInt32LE(24),44100);assert.equal(b.readUInt16LE(34),16);assert.equal((b.length-44)/88200,{pour:1.4,drip:.5,cloth:.62}[k]);assert.equal(b.readInt16LE(44),0);assert.equal(b.readInt16LE(b.length-2),0);let peak=0;for(let i=44;i<b.length;i+=2)peak=Math.max(peak,Math.abs(b.readInt16LE(i)));assert(peak>7000&&peak<13000);}
 assert(total<225000);
 let contexts=0,requests=0,active=0,max=0;const voices=[];
 const ctx={state:'running',destination:{},resume:async()=>{},decodeAudioData:async b=>({duration:(b.byteLength-44)/88200}),createGain:()=>({gain:{value:0},connect(){},disconnect(){}}),createBufferSource(){let on=false;const n={connect(){},disconnect(){},start(t,offset){this.offset=offset;on=true;active++;max=Math.max(max,active);},stop(){if(on){on=false;active--;this.onended?.();}}};voices.push(n);return n;}};
 global.window={AudioContext:function(){contexts++;return ctx;}};global.document={hidden:false};const fetchClip=async url=>{requests++;return{ok:true,arrayBuffer:async()=>Uint8Array.from(bytes.get(url)).buffer};};global.fetch=fetchClip;
 const sound=createBathSound();assert.equal(sound.play('pour'),false);assert.equal(contexts,0);assert.equal(requests,0);
 assert((await Promise.all([sound.unlock('pour'),sound.unlock('pour')])).every(Boolean));assert.equal(requests,1);
 sound.play('pour');sound.play('pour',.5,50);assert.equal(max,1);assert.equal(voices.at(-1).offset,.05);sound.stop();assert.equal(active,0);
 document.hidden=true;assert.equal(sound.play('pour'),false);document.hidden=false;ctx.state='suspended';assert.equal(sound.play('pour'),false);ctx.state='running';assert.equal(sound.play('pour',.5,2000),false);
 let release;global.fetch=url=>new Promise(resolve=>{release=()=>resolve(fetchClip(url));});const slow=createBathSound(),pending=slow.unlock('drip');await Promise.resolve();slow.stop();release();await pending;assert.equal(active,0);
 global.fetch=async()=>({ok:false});const retry=createBathSound();assert.equal(await retry.unlock('cloth'),false);global.fetch=fetchClip;assert.equal(await retry.unlock('cloth'),true);
 const game=fs.readFileSync(path.join(root,'game.js'),'utf8'),play=fs.readFileSync(path.join(root,'kauai-bath-play.js'),'utf8');
 for(const text of['kauaiBath.active','kauaiBath.start(piece)','kauaiBath.cancel()','kauaiBath.clear()','kauaiBath.syncHold()','kauaiBath.reset()'])assert(game.includes(text));
 for(const text of['run!==action||token!==epoch','new DOMMatrix([parent.a','old.stack',"'visibilitychange'","'pagehide'","'resize'"])assert(play.includes(text));
 assert(!play.includes('Oscillator'));assert(play.includes("save(n,'style')"));assert(play.includes("save(n,key)"));
 console.log('Kauai bath: six distinct drawings, resolved SVG paint references, finite/reduced timelines, three recorded WAVs, lazy audio, one voice, stop/failure/retry and shared control integration passed.');
})().catch(e=>{console.error(e);process.exitCode=1;});
