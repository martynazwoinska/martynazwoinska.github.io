const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {pathToFileURL}=require('node:url');
function decode(wav){
 assert.equal(wav.toString('ascii',0,4),'RIFF');assert.equal(wav.toString('ascii',8,12),'WAVE');
 let rate,channels,bits,data;
 for(let p=12;p+8<=wav.length;){const id=wav.toString('ascii',p,p+4),size=wav.readUInt32LE(p+4);if(id==='fmt '){assert.equal(wav.readUInt16LE(p+8),1);channels=wav.readUInt16LE(p+10);rate=wav.readUInt32LE(p+12);bits=wav.readUInt16LE(p+22);}if(id==='data')data=wav.subarray(p+8,p+8+size);p+=8+size+(size%2);}
 assert.equal(channels,1);assert.equal(bits,16);assert([24000,44100].includes(rate));
 const samples=Float32Array.from({length:data.length/2},(_,i)=>data.readInt16LE(i*2)/32768);
 return{duration:samples.length/rate,numberOfChannels:1,sampleRate:rate,getChannelData:()=>samples};
}
(async()=>{
 const {DIVE_SOUNDS,playDiveSound,FEEDING_AUDIO,FEEDING_CLIPS,FEEDING_CUES,FEEDING_BEATS,feedingTime,feedingFrame,feedingBiteFrame,feedingMouthPose,feedingWormPose,playFeedingSound}=await import(pathToFileURL(path.resolve(__dirname,'../game-of-worms/n2-feeding.js')));
 const hashes=[],peaks=[];
 for(const [key,clip]of Object.entries(FEEDING_CLIPS)){
  const wav=fs.readFileSync(path.resolve(__dirname,'../game-of-worms/assets/audio',clip.file)),buffer=decode(wav),samples=buffer.getChannelData(0);
  hashes.push(crypto.createHash('sha256').update(wav).digest('hex'));peaks.push(Math.max(...samples.map(Math.abs)));
  assert.equal(buffer.duration,clip.duration);
  assert.equal(clip.duration,key==='a'?.398:.283,'Play each complete approved slurp');
  assert.equal(samples[0],0);assert.equal(samples.at(-1),0);
  const windowSamples=Math.round(buffer.sampleRate*.022);
  let energy=0,maxEnergy=0,peakSample=0;
  for(let i=0;i<samples.length;i++){
   energy+=samples[i]**2;
   if(i>=windowSamples)energy-=samples[i-windowSamples]**2;
   if(i>=windowSamples-1 && energy>maxEnergy){
    maxEnergy=energy;
    peakSample=i+1-windowSamples/2;
   }
  }
  assert(Math.abs(peakSample/buffer.sampleRate-clip.peak)<.001,'The mouth peaks with the recorded intake');
 }
 assert.deepEqual(hashes,['32cd78192dd22d168381a49b2e37d59279f528b82ac329055fecfc2c6d7c111d','43224e4c1e3c09f64a3815fe641a88d4b4e6becc36c671be9b19d932c0abf156'],'Both approved audio files remain byte-identical');
 assert.equal(FEEDING_CUES.length,15);
 const end=feedingTime(23350),intervals=[];let audioDuration=0;
 for(let i=0;i<FEEDING_CUES.length;i++){
  const cue=FEEDING_CUES[i],clip=FEEDING_CLIPS[cue.key],beat=FEEDING_BEATS[i],duration=clip.duration*1000;audioDuration+=duration;
  assert.equal(feedingFrame(beat).crawler,1);assert.equal(feedingFrame(beat+duration).crawler,1);assert(beat+duration<end);
  assert.equal(feedingBiteFrame(beat-1).amount,0);assert.equal(feedingBiteFrame(beat+duration).amount,0);
  assert(Math.abs(feedingBiteFrame(beat+clip.peak*1000).amount-1)<1e-12,'A sound and its mouth pulse share the exact peak');
  for(let ms=0;ms<=duration;ms+=2){const f=feedingBiteFrame(beat+ms);assert(f.amount>=0&&f.amount<=1);}
  if(i){
   const previous=FEEDING_CUES[i-1];
   const interval=beat-FEEDING_BEATS[i-1];
   const gap=interval-FEEDING_CLIPS[previous.key].duration*1000;
   intervals.push(interval);
   assert(gap>=200 && gap<=1500,'Every intake has a short rest before the next');
   if(cue.cluster!==previous.cluster){
    assert(gap>=1000,'Separate feeding groups have at least a second of silence');
   }
  }
 }
 assert(new Set(intervals).size>=5,'The recordings do not repeat on a regular metronomic interval');assert.equal(audioDuration,5050,'Fifteen short intakes leave time for quiet between mouth movements');
 assert.deepEqual([1,2,3,4,5,6,7,8,9].map(cluster=>FEEDING_CUES.filter(c=>c.cluster===cluster).length),[2,2,1,2,1,2,2,2,1]);
 assert(FEEDING_CUES.some(c=>c.story>=9700&&c.story+FEEDING_CLIPS[c.key].duration*1000<=10350),'An intake coincides with visible colony consumption');
 // Head and throat markers follow the actual miniature, without bending or
 // relocating its body and without adding a detached face.
 for(const direction of[-1,1])for(const progress of[.08,.2,.5,.8,1])for(const scale of[.5,1,2]){
  const samples=feedingWormPose(progress,false,{x:17,y:6},1,direction).samples,before=JSON.stringify(samples),closed=feedingMouthPose(samples,0,scale),open=feedingMouthPose(samples,1,scale);
  assert(Object.values(open).every(Number.isFinite));assert(Math.hypot(open.x-samples[0].x,open.y-samples[0].y)<=.19*scale);assert.equal(open.throatX,samples[3].x);assert.equal(open.throatY,samples[3].y);
  assert.equal(open.x,closed.x);assert.equal(open.y,closed.y);assert(open.rx>closed.rx&&open.ry>closed.ry&&open.throatOpacity>closed.throatOpacity);assert.equal(JSON.stringify(samples),before,'The two-lap route and exit pose remain untouched');
 }
 const sources=[],envelopes=[],starts=[],stops=[];let requests=0;
 global.window={AudioContext:class{
  constructor(){this.state='running';this.currentTime=0;this.destination={};}async resume(){}
  async decodeAudioData(array){return decode(Buffer.from(array));}
  createBufferSource(){const n={connect(){},disconnect(){this.disconnected=true},start(...args){starts.push(args)},stop(...args){stops.push(args)}};sources.push(n);return n;}
  createBiquadFilter(){assert.fail('The approved short slurps must not be altered by runtime filters');}
  createGain(){const calls=[];envelopes.push(calls);return{connect(){},disconnect(){},gain:{setValueAtTime(v,t){calls.push(['set',v,t])},linearRampToValueAtTime(v,t){calls.push(['ramp',v,t])},cancelScheduledValues(){},setTargetAtTime(){}}};}
 }};
 global.fetch=async url=>{requests++;const wav=fs.readFileSync(path.resolve(__dirname,'../game-of-worms/assets/audio',path.basename(new URL(url).pathname)));return{ok:true,arrayBuffer:async()=>wav.buffer.slice(wav.byteOffset,wav.byteOffset+wav.byteLength)}};
 const {recordedSound}=await import(pathToFileURL(path.resolve(__dirname,'../game-of-worms/scene-performance.js'))),files=Object.fromEntries(Object.entries(FEEDING_CLIPS).map(([key,clip])=>[key,clip.file])),sound=recordedSound(files,FEEDING_AUDIO);
 assert.equal(playFeedingSound(sound,0),false,'No sound before gesture preparation');await sound.prepare(Object.keys(files));await sound.prepare(Object.keys(files));assert.equal(requests,2,'Each approved recording decodes once');
 for(let i=0;i<FEEDING_BEATS.length;i++){assert(playFeedingSound(sound,i));assert.equal(starts.at(-1)[2],FEEDING_CLIPS[FEEDING_CUES[i].key].duration);}
 assert.equal(starts.length,15);
 for(let i=0;i<envelopes.length;i++){
  const calls=envelopes[i],clip=FEEDING_CLIPS[FEEDING_CUES[i].key];
  const peak=peaks[FEEDING_CUES[i].key==='a'?0:1];
  assert(calls[1][1]*peak<=.01600001,'Each cue stays at the quiet playback level');
  assert.equal(calls[1][2],.004);
  assert(Math.abs(calls[2][2]-(clip.duration-.006))<1e-12);
 }
 assert(Math.abs(envelopes[0][1][1]-envelopes[1][1][1])<.0001,'The first pair preserves the relative levels of preview A');
 assert.equal(FEEDING_BEATS[1]-FEEDING_BEATS[0],680,'The first pair preserves the timing of preview A');
 sound.stop();assert.equal(stops.length,starts.length);sound.stop();assert.equal(stops.length,starts.length,'Repeated exit requests cannot revive or duplicate sound');sources.forEach(n=>n.onended());assert(sources.every(n=>n.disconnected));
 assert(playFeedingSound(sound,0,80));assert.equal(starts.at(-1)[1],.08);assert(Math.abs(starts.at(-1)[2]-(FEEDING_CLIPS.a.duration-.08))<1e-12,'Late frames play only the remaining excerpt, aligned with the existing mouth phase');sound.stop();sources.at(-1).onended();
 assert.equal(playFeedingSound(sound,0,700),false,'A stale cue is never replayed');assert.equal(playFeedingSound(sound,999),false);
 // Takeoff and contact play brief, quiet excerpts only when their clock cue occurs.
 const diveFiles=Object.fromEntries(Object.entries(DIVE_SOUNDS).map(([key,cue])=>[key,cue.file]));
 const dive=recordedSound(diveFiles,{attack:.006,release:.045});
 assert.equal(playDiveSound(dive,'takeoff'),false,'No jump audio before preparation');
 await dive.prepare(Object.keys(diveFiles));
 assert.equal(feedingTime(DIVE_SOUNDS.takeoff.story),2493,'Board sound follows the visible push-off');
 assert(Math.abs(feedingTime(DIVE_SOUNDS.landing.story)-3803.4)<1e-8,'Contact sound follows the first agar contact');
 for(const [key,cue]of Object.entries(DIVE_SOUNDS)){
  const wav=fs.readFileSync(path.resolve(__dirname,'../game-of-worms/assets/audio',cue.file)),buffer=decode(wav);
  assert(cue.offset+cue.duration<=buffer.duration);
  assert(cue.duration<=.22&&cue.level<=.018,'Jump effects are short and subdued');
  assert(playDiveSound(dive,key));assert.deepEqual(starts.at(-1).slice(1),[cue.offset,cue.duration]);
  assert(playDiveSound(dive,key,50));assert(Math.abs(starts.at(-1)[1]-cue.offset-.05)<1e-10);assert(Math.abs(starts.at(-1)[2]-cue.duration+.05)<1e-10);
 }
 const beforeSkip=starts.length;
 assert.equal(playDiveSound(dive,'takeoff',120),false);assert.equal(playDiveSound(dive,'landing',500),false);assert.equal(playDiveSound(dive,'missing'),false);
 assert.equal(starts.length,beforeSkip,'A missed or repeated stale jump cue cannot sound later');
 const beforeStop=stops.length;dive.stop();assert.equal(stops.length-beforeStop,4,'Cancellation silences both jump events and their test offsets');dive.stop();assert.equal(stops.length-beforeStop,4);
 sources.slice(-4).forEach(n=>n.onended());
 const controller=fs.readFileSync(path.resolve(__dirname,'../game-of-worms/n2-feeding.js'),'utf8');
 assert(controller.includes('diveCues:new Set()')&&controller.includes('!action.diveCues.has(key)')&&controller.includes('action.diveCues.add(key)'),'Paused actions retain consumed jump cues');
 assert(controller.match(/sound\.stop\(\);diveSound\.stop\(\);/g).length>=3,'Cancel, pointer pause and early return all silence jump audio');
 // Default playback for other scenes remains unchanged.
 const plain=recordedSound(files);await plain.prepare(['a']);plain.play('a',0,.12,.08);const normal=envelopes.at(-1);assert.equal(normal[1][2],.012);assert(Math.abs(normal[2][2]-.08)<1e-10);assert.equal(normal[3][2],.12);plain.stop();sources.at(-1).onended();
 global.fetch=async()=>{throw Error('offline')};const offline=recordedSound(files,FEEDING_AUDIO);await offline.prepare(Object.keys(files));assert.equal(playFeedingSound(offline,0),false);
 console.log('Feeding audio: two short slurps from approved preview A, fifteen quiet cues, nine irregular groups, recording-aligned mouth pulses, delayed-frame sync, cache, cancellation and offline fallback pass.');
})().catch(e=>{console.error(e);process.exitCode=1});
