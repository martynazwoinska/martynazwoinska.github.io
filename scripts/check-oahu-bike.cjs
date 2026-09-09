const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const{pathToFileURL,fileURLToPath}=require('node:url'),root=path.resolve(__dirname,'../game-of-worms');
const mod=n=>import(pathToFileURL(path.join(root,n)));
class Element{constructor(tag){this.tag=tag;this.children=[];this.attributes={};this.dataset={};}setAttribute(k,v){this.attributes[k]=String(v);}appendChild(n){this.children.push(n);return n;}}
const walk=n=>[n,...n.children.flatMap(walk)];global.document={createElementNS:(_,t)=>new Element(t)};
(async()=>{
 const {BIKE,drawOahuBike,bikeLayouts}=await mod('oahu-bike-art.js'),g=new Element('g');
 assert(drawOahuBike(g,{family:BIKE}));assert(!drawOahuBike(new Element('g'),{family:'other'}));
 const nodes=walk(g),ids=nodes.filter(n=>n.attributes.id).map(n=>n.attributes.id);
 assert.equal(new Set(ids).size,ids.length);assert(nodes.length>200);assert(bikeLayouts[BIKE].primary.every(Number.isFinite));
 for(const n of nodes){for(const v of Object.values(n.attributes)){assert(!/NaN|undefined|Infinity/.test(v));if(v.startsWith('url(#'))assert(ids.includes(v.slice(5,-1)));}if(n.tag==='path')assert(n.attributes.fill&&n.attributes.stroke);}
 for(const name of['wheel','front-wheel','crank','pedals','flywheel','fan','scoop','beans','grains','nibs','shells'])assert(nodes.some(n=>('data-bike-'+name)in n.attributes),name);
 const {bikeFrame}=await mod('oahu-bike-play.js');
 let previous=0;
 for(let ms=0;ms<=8500;ms+=10){const s=bikeFrame(ms);assert(Object.values(s).every(v=>typeof v==='boolean'||Number.isFinite(v)));for(const k of['mount','speed','feed','progress'])assert(s[k]>=0&&s[k]<=1);assert(s.angle>=previous);previous=s.angle;}
 for(const ms of[1100,1700,5800,7050])assert(Math.abs(bikeFrame(ms+.01).angle-bikeFrame(ms-.01).angle)<.007);
 assert.equal(bikeFrame(3000).speed,1);assert.equal(bikeFrame(3000).mount,1);assert.equal(bikeFrame(3000).feed,1);
 assert.equal(bikeFrame(7200).speed,0);assert.equal(bikeFrame(8250).mount,0);assert(bikeFrame(8250).done);
 assert(bikeFrame(6200).speed>bikeFrame(6500).speed);assert(bikeFrame(6500).speed>bikeFrame(7000).speed);
 for(const ms of[0,100,600,650]){const f=bikeFrame(ms,true);assert.equal(f.angle,0);assert.equal(f.mount,0);assert.equal(f.progress,1);}assert(bikeFrame(650,true).done);
 const {bikeClips,createBikeSound}=await mod('oahu-bike-audio.js');
 const hashes={chain:'1890c9b51ba9606e175797c14cce6d2cd7e7770d2723474118ac4d7ef8f8d415',beans:'9f8d7679745b1ad897793107b4c6f75846eab4f7bf867d2e913dbedcb455f38b'};
 let bytes=0;for(const[k,u]of Object.entries(bikeClips)){const b=fs.readFileSync(fileURLToPath(u));bytes+=b.length;assert.equal(crypto.createHash('sha256').update(b).digest('hex'),hashes[k]);assert(b.length>100000);}assert(bytes<600000);
 let requests=0,contexts=0;const sources=[],levels=[];
 const parameter=()=>({setValueAtTime(v,t){levels.push({v,t});},linearRampToValueAtTime(v,t){levels.push({v,t});}});
 const ctx={state:'running',currentTime:10,destination:{},resume:async()=>{},decodeAudioData:async()=>({duration:10.5,numberOfChannels:1,sampleRate:100,getChannelData:()=>Float32Array.from({length:1050},()=>.5)}),
 createGain:()=>({gain:parameter(),connect(){},disconnect(){}}),createBiquadFilter:()=>({frequency:{value:0},connect(){},disconnect(){}}),
 createBufferSource(){const s={connect(){},disconnect(){},start(t,offset,duration){this.when=t;this.offset=offset;this.duration=duration;this.active=true;},stop(){this.active=false;this.onended?.();}};sources.push(s);return s;}};
 global.window={AudioContext:function(){contexts++;return ctx;}};global.document={hidden:false};
 const fetchOK=async()=>{requests++;return{ok:true,arrayBuffer:async()=>new ArrayBuffer(12)};};global.fetch=fetchOK;
 const sound=createBikeSound();assert.equal(contexts,0);assert.equal(requests,0);await sound.start();assert.equal(contexts,1);assert.equal(requests,2);assert.equal(sources.length,3);
 assert(levels.every(({v})=>v>=0&&v<=.85));assert.equal(sources[0].duration,5.95);assert(sources[1].when+sources[1].duration<sources[2].when);
 sound.stop();assert(sources.every(s=>!s.active));await sound.start();assert.equal(requests,2);sound.stop();
 const releases=[];global.fetch=()=>new Promise(resolve=>releases.push(()=>resolve({ok:true,arrayBuffer:async()=>new ArrayBuffer(12)})));
 const slow=createBikeSound(),pending=slow.start();await new Promise(resolve=>setImmediate(resolve));slow.stop();releases.forEach(r=>r());await pending;assert(sources.every(s=>!s.active));
 global.fetch=async()=>({ok:false});const retry=createBikeSound();await retry.start();assert(sources.every(s=>!s.active));global.fetch=fetchOK;await retry.start();assert(sources.some(s=>s.active));retry.stop();
 document.hidden=true;await sound.start();assert(sources.every(s=>!s.active));document.hidden=false;
 const game=fs.readFileSync(path.join(root,'game.js'),'utf8'),catalogue=fs.readFileSync(path.join(root,'accessory-designs.js'),'utf8'),play=fs.readFileSync(path.join(root,'oahu-bike-play.js'),'utf8');
 assert.match(catalogue,/sharedAccessoryFamilies = new Set\(\[[^\n]+eca789-chocolate-bike/);
 assert.match(game,/oahuBike.active/);assert.match(game,/oahuBike.start\(piece\)/);assert.match(game,/oahuBike.reset\(\)/);assert.match(game,/oahuBike.cancel\(\)/);
 for(const hook of['visibilitychange','pagehide','resize'])assert(play.includes(hook));assert(play.includes('reduced.addEventListener'));
 assert(play.includes('cloneNode(true)'));assert(play.includes('run.styles'));assert(play.includes('run.saved'));
 console.log('Oahu bike: original shared SVG, resolved paints, real MP3 hashes, finite/continuous motion, reduced motion, quiet overlapping audio cues, lazy loading, cancellation, retry and input integration passed.');
})().catch(e=>{console.error(e);process.exitCode=1;});
