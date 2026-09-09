const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {pathToFileURL,fileURLToPath}=require('node:url');
(async()=>{
  const {chocolateClips,chocolateCue,createChocolateSound}=await import(pathToFileURL(path.resolve(__dirname,'../game-of-worms/oahu-chocolate-audio.js')));
  const recording=fs.readFileSync(fileURLToPath(chocolateClips.bite));
  assert.equal(recording.length,349152);
  assert.equal(crypto.createHash('sha256').update(recording).digest('hex'),'028bc10adb609ae26da929c04f4ede1c4c696f3b1247dfb6e027d2ff0e0a83cc');
  for(const male of[false,true]){
    const cue=chocolateCue('bite',male);
    assert.equal(cue.at,1810);assert(cue.duration<=.65);
    assert(cue.at+cue.duration*1000<=2450);assert(cue.peak<=.11);
  }
  assert.notEqual(chocolateCue('bite').offset,chocolateCue('bite',true).offset);
  let contexts=0,requests=0;
  const sources=[],levels=[];
  const ctx={state:'running',currentTime:10,destination:{},resume:async()=>{},
    decodeAudioData:async()=>({duration:13.845,sampleRate:100,numberOfChannels:1,getChannelData:()=>Float32Array.from({length:1385},()=>.5)}),
    createGain:()=>({gain:{setValueAtTime(v){levels.push(v);},linearRampToValueAtTime(v){levels.push(v);}},connect(){},disconnect(){}}),
    createBufferSource(){const s={connect(){},disconnect(){},start(time,offset,duration){Object.assign(this,{time,offset,duration,active:true});},stop(){this.active=false;this.onended?.();}};sources.push(s);return s;}
  };
  global.window={AudioContext:function(){contexts++;return ctx;}};
  global.document={hidden:false};
  const goodFetch=async()=>{requests++;return{ok:true,arrayBuffer:async()=>new ArrayBuffer(8)};};
  global.fetch=goodFetch;
  const sound=createChocolateSound();
  assert.equal(contexts,0);assert.equal(requests,0);assert.equal(sound.play('bite'),false);
  await sound.unlock();assert.equal(contexts,1);assert.equal(requests,2);
  assert(sound.play('bite'));assert.equal(sources.at(-1).offset,.8);assert.equal(sources.at(-1).duration,.62);
  assert(sound.play('bite',true));assert.equal(sources.filter(s=>s.active).length,1);assert.equal(sources.at(-1).offset,6.6);
  sound.stop();assert(sources.every(s=>!s.active));
  assert(!sound.play('bite',false,700));document.hidden=true;assert(!sound.play('bite'));document.hidden=false;
  assert(sound.play('paper'));assert.equal(sources.at(-1).duration,.44);sound.stop();
  assert(levels.every(v=>v>=0&&v<=.22));
  await sound.unlock();assert.equal(requests,2,'Decoded audio is reused');
  const releases=[];global.fetch=()=>new Promise(resolve=>releases.push(()=>resolve({ok:true,arrayBuffer:async()=>new ArrayBuffer(8)})));
  const slow=createChocolateSound(),pending=slow.unlock();slow.stop();releases.forEach(fn=>fn());await pending;
  assert(sources.every(s=>!s.active),'Late decoding cannot schedule playback');
  global.fetch=async()=>({ok:false});const retry=createChocolateSound();await retry.unlock();
  assert(!retry.play('bite'));global.fetch=goodFetch;await retry.unlock(true);assert(retry.play('bite',true));retry.stop();
  console.log('Oahu eating audio: CC0 file hash, two short bite excerpts, mouth timing, level caps, fades, one voice, lazy loading, cancellation and failure/retry passed.');
})().catch(error=>{console.error(error);process.exitCode=1;});
