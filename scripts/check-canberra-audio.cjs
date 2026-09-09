const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const{pathToFileURL,fileURLToPath}=require('node:url');
(async()=>{
 const{cafeClips,createCafeSound,cafeCue}=await import(pathToFileURL(path.resolve(__dirname,'../game-of-worms/canberra-cafe-audio.js')));
 const hashes={sip:'5c3ec26e873b4e86162576643ff9d47a1bef9ceaab8badbb8e03fdf4a193cfc0',screech:'1ffb49ee61f8fc7c3ddc354a1607b6f2a4337280a0bc561411ea4c624d453a01'};
 let bytes=0;
 for(const[k,clip]of Object.entries(cafeClips)){
  const b=fs.readFileSync(fileURLToPath(clip.url));bytes+=b.length;assert.equal(crypto.createHash('sha256').update(b).digest('hex'),hashes[k]);
  assert(clip.offset>=0&&clip.duration>0&&clip.peak>0&&clip.peak<=.4);
 }
 assert(bytes<55000);assert.equal(cafeCue('sip').at,836);assert.equal(cafeCue('raid').clip,'screech');assert.equal(cafeCue('bite'),null);assert.equal(cafeCue('wipe'),null);
 let contexts=0,fetches=0,active=0,max=0;const sources=[],gains=[];
 const ctx={state:'running',currentTime:7,destination:{},resume:async()=>{},decodeAudioData:async()=>({duration:2,length:2000,sampleRate:1000,numberOfChannels:2,getChannelData:()=>new Float32Array(2000).fill(.8)}),
  createGain:()=>({gain:{setValueAtTime:(v,t)=>gains.push([v,t]),linearRampToValueAtTime:(v,t)=>gains.push([v,t])},connect(){},disconnect(){}}),
  createBufferSource(){let on=false;const n={connect(){},disconnect(){},start(t,offset,duration){this.offset=offset;this.duration=duration;active++;on=true;max=Math.max(max,active);},stop(){if(on){on=false;active--;this.onended?.();}}};sources.push(n);return n;}};
 global.window={AudioContext:function(){contexts++;return ctx;}};global.document={hidden:false};
 const fetchClip=async()=>{fetches++;return{ok:true,arrayBuffer:async()=>new ArrayBuffer(10)};};global.fetch=fetchClip;
 const sound=createCafeSound();assert.equal(sound.play('sip'),false);assert.equal(contexts,0);assert.equal(fetches,0);
 assert((await Promise.all([sound.unlock('sip'),sound.unlock('sip')])).every(Boolean));assert.equal(fetches,1);
 assert(sound.play('sip'));assert(Math.abs(sources.at(-1).offset-.15)<1e-8);assert.equal(sources.at(-1).duration,.52);
 assert(sound.play('sip',50));assert.equal(max,1);assert.equal(sources.at(-1).offset,.2);assert(Math.abs(sources.at(-1).duration-.47)<1e-8);
 assert(gains.every(([v])=>v>=0&&v<=.4));sound.stop();assert.equal(active,0);
 document.hidden=true;assert.equal(sound.play('sip'),false);document.hidden=false;ctx.state='suspended';assert.equal(sound.play('sip'),false);ctx.state='running';assert.equal(sound.play('sip',900),false);
 let release;global.fetch=()=>new Promise(r=>release=()=>r({ok:true,arrayBuffer:async()=>new ArrayBuffer(1)}));const slow=createCafeSound(),pending=slow.unlock('screech');await Promise.resolve();slow.stop();release();await pending;assert.equal(active,0);
 global.fetch=async()=>({ok:false});const failed=createCafeSound();assert.equal(await failed.unlock('sip'),false);global.fetch=fetchClip;assert.equal(await failed.unlock('sip'),true);
 assert.equal(await failed.unlock('unknown'),false);delete window.AudioContext;assert.equal(await createCafeSound().unlock('sip'),false);
 console.log('Canberra audio: exact CC0 source hashes, bounded excerpts, lazy/deduplicated decode, one voice, peak limits/fades, timing, hidden/stop/failure/retry and unavailable audio pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});
