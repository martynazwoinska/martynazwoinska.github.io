const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const{pathToFileURL,fileURLToPath}=require('node:url'),root=path.resolve(__dirname,'../game-of-worms');
const mod=n=>import(pathToFileURL(path.join(root,n)));
class Element{
 constructor(tag){this.tag=tag;this.children=[];this.attributes={};}
 setAttribute(k,v){this.attributes[k]=String(v);}appendChild(n){this.children.push(n);return n;}
 querySelector(s){return walk(this).find(n=>s.startsWith('[')&&s.slice(1,-1) in n.attributes);}
}
const walk=n=>[n,...n.children.flatMap(walk)];global.document={createElementNS:(_,t)=>new Element(t)};
(async()=>{
 const{drawReunion:draw,LYCHEE,COAT,FLOWERS,reunionLayouts}=await mod('reunion-art.js');
 const{lycheeFrame,flowerFrame,lycheeBiteTime}=await mod('reunion-play.js');const ids=[];
 for(const family of[LYCHEE,COAT,FLOWERS]){
  const versions=[];
  for(const male of[false,true]){
   const g=new Element('g');assert(draw(g,{family},male));const nodes=walk(g);
   for(const n of nodes){assert(!Object.values(n.attributes).some(v=>/NaN|undefined|Infinity/.test(v)));if(n.tag==='path')assert(n.attributes.fill&&n.attributes.stroke);if(n.attributes.id)ids.push(n.attributes.id);}
   for(const n of nodes)for(const v of Object.values(n.attributes))if(v.startsWith('url(#'))assert(nodes.some(c=>`url(#${c.attributes.id})`===v),'Paint reference resolves');
   assert(reunionLayouts[family][male?'companion':'primary'].every(Number.isFinite));
   if(family===LYCHEE)assert(nodes.some(n=>'data-re-flesh'in n.attributes)&&nodes.some(n=>'data-re-seed'in n.attributes));
   if(family===COAT){assert.equal(nodes.filter(n=>'data-re-bead'in n.attributes).length,5);assert(nodes.some(n=>'data-re-hood'in n.attributes));}
   if(family===FLOWERS){assert(nodes.some(n=>(male?'data-re-offered':'data-re-received')in n.attributes));assert(!JSON.stringify(nodes).includes('re-vase'));if(!male)assert(nodes.some(n=>'data-re-bouquet-tie'in n.attributes));}
   versions.push(JSON.stringify(nodes));
  }
  assert.notEqual(...versions,'Pairs need distinct constructions');
 }
 assert.equal(ids.length,new Set(ids).size);assert(!draw(new Element('g'),{family:'other'},false));
 for(const reduced of[false,true])for(const male of[false,true])for(let ms=0;ms<=5800;ms+=16){
   for(const s of[lycheeFrame(ms,male,reduced),flowerFrame(ms,reduced)])for(const v of Object.values(s))assert(typeof v==='boolean'||Number.isFinite(v)&&v>=0&&v<=1);
   if(reduced)assert.equal(lycheeFrame(ms,male,reduced).eat,0);
 }
 assert(lycheeFrame(5200).done&&flowerFrame(5800).done);assert(lycheeFrame(3000).eat>.95);assert.equal(flowerFrame(4000).insert,1);
 for(const male of[false,true]){const t=lycheeBiteTime(male);assert.equal(lycheeFrame(t,male).bite,0);assert(lycheeFrame(t+115,male).bite>.49);assert.equal(lycheeFrame(t,male).eat,1);}
 const{reunionClips,createReunionSound}=await mod('reunion-audio.js');let total=0;const bytes=new Map();
 for(const[k,url]of Object.entries(reunionClips)){
  const b=fs.readFileSync(fileURLToPath(url));bytes.set(url,b);total+=b.length;
  assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.readUInt16LE(22),1);assert.equal(b.readUInt32LE(24),44100);assert.equal(b.readUInt16LE(34),16);
  assert.equal((b.length-44)/88200,{rain:10.5,coat:.8,peel:.65,eat:.66,paper:.48}[k]);
  if(k!=='rain'){assert.equal(b.readInt16LE(44),0);assert.equal(b.readInt16LE(b.length-2),0);}
 }
 assert(total<1200000);
 let contexts=0,requests=0,active=0,max=0;const voices=[],targets=[];
 const ctx={state:'running',currentTime:1,destination:{},resume:async()=>{},decodeAudioData:async b=>({duration:(b.byteLength-44)/88200}),createGain:()=>({gain:{cancelScheduledValues(){},setTargetAtTime(v){targets.push(v);}},connect(){},disconnect(){}}),createBufferSource(){let on=false;const n={connect(){},disconnect(){},start(t,offset){this.offset=offset;on=true;active++;max=Math.max(max,active);},stop(){if(on){on=false;active--;this.onended?.();}}};voices.push(n);return n;}};
 global.window={AudioContext:function(){contexts++;return ctx;}};global.document={hidden:false};
 const fetchClip=async url=>{requests++;return{ok:true,arrayBuffer:async()=>Uint8Array.from(bytes.get(url)).buffer};};global.fetch=fetchClip;
 const sound=createReunionSound();sound.play('peel');sound.startRain();assert.equal(contexts,0);assert.equal(requests,0);
 assert((await Promise.all([sound.unlock('rain'),sound.unlock('rain')])).every(Boolean));assert.equal(requests,1);
 sound.startRain();assert.equal(voices.at(-1).loop,true);await sound.unlock('peel');sound.play('peel');sound.play('peel');assert.equal(max,2);sound.duck(true);assert.equal(targets.at(-1),.12);
 sound.stopVoice();assert.equal(active,1);sound.stopRain();assert.equal(active,0);sound.play('peel',.6,50);assert.equal(voices.at(-1).offset,.05);sound.stop();
 await sound.unlock('eat');sound.play('eat',.5,20);assert.equal(voices.at(-1).buffer.duration,.66);assert.equal(voices.at(-1).offset,.02);sound.stop();
 document.hidden=true;sound.startRain();sound.play('peel');assert.equal(active,0);document.hidden=false;ctx.state='suspended';sound.play('peel');assert.equal(active,0);ctx.state='running';
 let release;global.fetch=url=>new Promise(resolve=>{release=()=>resolve(fetchClip(url));});const slow=createReunionSound(),pending=slow.unlock('rain');await Promise.resolve();slow.stop();release();await pending;assert.equal(active,0,'Loading alone never starts sound');
 global.fetch=async()=>({ok:false});const retry=createReunionSound();assert.equal(await retry.unlock('coat'),false);global.fetch=fetchClip;assert.equal(await retry.unlock('coat'),true);
 const game=fs.readFileSync(path.join(root,'game.js'),'utf8'),play=fs.readFileSync(path.join(root,'reunion-play.js'),'utf8');
 for(const fragment of['reunionPlay.active','reunionPlay.start(piece)','reunionPlay.syncCoats(accessory, shouldShow)','reunionPlay.clear()','reunionPlay.syncHold()'])assert(game.includes(fragment));
 assert(play.includes('.accessory-piece[data-accessory-family="${FLOWERS}"]'),'Only the two pieces receive holding hands');
 assert(play.includes('epoch===rainEpoch'));assert(play.includes("'visibilitychange'"));assert(play.includes("'resize'"));assert(!play.includes('Oscillator'));
 console.log('Réunion: six distinct drawings, unique paint IDs, finite action frames, reduced motion, recorded clips, one foreground voice plus ducked rain, lazy loading, stop and failure/retry tests passed.');
})().catch(e=>{console.error(e);process.exitCode=1;});
