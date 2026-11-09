const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {pathToFileURL}=require('node:url');
(async()=>{
 const wav=fs.readFileSync(path.resolve(__dirname,'../game-of-worms/assets/audio/reunion-eat.wav'));
 assert.equal(wav.toString('ascii',0,4),'RIFF');assert.equal(wav.toString('ascii',8,12),'WAVE');
 let rate,bytesPerSecond,dataBytes;
 for(let p=12;p+8<=wav.length;){const id=wav.toString('ascii',p,p+4),size=wav.readUInt32LE(p+4);if(id==='fmt '){rate=wav.readUInt32LE(p+12);bytesPerSecond=wav.readUInt32LE(p+16);}if(id==='data')dataBytes=size;p+=8+size+(size%2);}
 const duration=dataBytes/bytesPerSecond;
 const {FEEDING_AUDIO,FEEDING_BEATS,feedingTime,feedingFrame,playFeedingSound}=await import(pathToFileURL(path.resolve(__dirname,'../game-of-worms/n2-feeding.js')));
 assert(FEEDING_AUDIO.offsets.every(offset=>offset>=0&&offset+FEEDING_AUDIO.duration<=duration),'Every bite fits the unchanged recording');
 const end=feedingTime(23350),length=FEEDING_AUDIO.duration*1000;
 assert.equal(FEEDING_BEATS[0],feedingTime(4350),'Sound begins only after landing');
 assert(FEEDING_BEATS.at(-1)+length<end,'The final bite settles before departure');
 for(let i=0;i<FEEDING_BEATS.length;i++){
  const beat=FEEDING_BEATS[i];assert.equal(feedingFrame(beat).crawler,1);assert.equal(feedingFrame(beat+length).crawler,1);
  if(i)assert(beat-FEEDING_BEATS[i-1]-length>=500,'At least half a second of quiet separates bites');
 }
 const sources=[],filters=[],envelopes=[],starts=[],stops=[];let requests=0;
 global.window={AudioContext:class{
  constructor(){this.state='running';this.currentTime=0;this.destination={};}
  async resume(){}
  async decodeAudioData(){return{duration,numberOfChannels:1,sampleRate:rate,getChannelData:()=>new Float32Array(Math.ceil(duration*rate)).fill(.4)}}
  createBufferSource(){const n={connections:[],connect(to){this.connections.push(to)},disconnect(){this.disconnected=true},start(...args){starts.push(args)},stop(...args){stops.push(args)}};sources.push(n);return n;}
  createBiquadFilter(){const n={frequency:{value:0},Q:{value:0},connections:[],connect(to){this.connections.push(to)},disconnect(){this.disconnected=true}};filters.push(n);return n;}
  createGain(){const calls=[];envelopes.push(calls);return{connect(){},disconnect(){},gain:{setValueAtTime(v,t){calls.push(['set',v,t])},linearRampToValueAtTime(v,t){calls.push(['ramp',v,t])},cancelScheduledValues(){},setTargetAtTime(){}}};}
 }};
 global.fetch=async()=>{requests++;return{ok:true,arrayBuffer:async()=>wav.buffer}};
 const {recordedSound}=await import(pathToFileURL(path.resolve(__dirname,'../game-of-worms/scene-performance.js')));
 const sound=recordedSound({eat:'reunion-eat.wav'},FEEDING_AUDIO);
 assert.equal(sound.play('eat'),false,'No sound before gesture preparation');await sound.prepare(['eat']);await sound.prepare(['eat']);assert.equal(requests,1);
 for(let i=0;i<FEEDING_BEATS.length;i++)assert(playFeedingSound(sound,i,false));
 assert.equal(starts.length,FEEDING_BEATS.length);assert(starts.every(v=>v[2]===FEEDING_AUDIO.duration));
 assert(Math.max(...envelopes.flat().map(v=>v[1]))*.4<=.009,'The peak is at most half the previous N2 level, before filtering');
 for(const calls of envelopes){assert.equal(calls[1][2],.07,'Soft attack replaces the sharp12ms onset');assert.equal(calls[2][2],.24);assert.equal(calls[3][2],.36,'The bite fades out across its final120ms');}
 assert.equal(filters.length,FEEDING_BEATS.length*2);
 filters.forEach((f,i)=>{assert.equal(f.type,i%2?'lowpass':'highpass');assert.equal(f.frequency.value,i%2?1100:180);assert.equal(f.Q.value,.5);});
 sources.forEach((source,i)=>{assert.equal(source.connections[0],filters[2*i]);assert.equal(filters[2*i].connections[0],filters[2*i+1]);});
 sound.stop();assert.equal(stops.length,starts.length);sound.stop();assert.equal(stops.length,starts.length,'Stopping an early exit twice is safe');
 sources.forEach(n=>n.onended());assert(filters.every(f=>f.disconnected),'Ending or stopping a bite disconnects every filter');
 assert(playFeedingSound(sound,0,false,.1));assert.equal(starts.at(-1)[2],.1,'A short remaining window trims the sound');sound.stop();sources.at(-1).onended();
 // Other scenes retain the exact previous routing and envelope by default.
 const filterCount=filters.length,plain=recordedSound({eat:'reunion-eat.wav'});await plain.prepare(['eat']);plain.play('eat',0,.12,.08);
 assert.equal(filters.length,filterCount,'No filters are added to another scene');
 const normal=envelopes.at(-1);assert.equal(normal[1][2],.012);assert(Math.abs(normal[2][2]-.08)<1e-10);assert.equal(normal[3][2],.12);plain.stop();sources.at(-1).onended();
 global.fetch=async()=>{throw Error('offline')};const offline=recordedSound({eat:'missing.wav'},FEEDING_AUDIO);await offline.prepare(['eat']);assert.equal(offline.play('eat'),false);
 console.log('Feeding audio: separated quiet bites, soft envelope, N2-only filters, unchanged defaults, cached decoding, cleanup and offline fallback pass.');
})().catch(e=>{console.error(e);process.exitCode=1});
