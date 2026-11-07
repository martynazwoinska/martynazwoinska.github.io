const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {pathToFileURL}=require('node:url');
(async()=>{
 const wav=fs.readFileSync(path.resolve(__dirname,'../game-of-worms/assets/audio/reunion-eat.wav'));
 assert.equal(wav.toString('ascii',0,4),'RIFF');assert.equal(wav.toString('ascii',8,12),'WAVE');
 let rate,bytesPerSecond,dataBytes;
 for(let p=12;p+8<=wav.length;){const id=wav.toString('ascii',p,p+4),size=wav.readUInt32LE(p+4);if(id==='fmt '){rate=wav.readUInt32LE(p+12);bytesPerSecond=wav.readUInt32LE(p+16);}if(id==='data')dataBytes=size;p+=8+size+(size%2);}
 const duration=dataBytes/bytesPerSecond;
 const {FEEDING_AUDIO,FEEDING_BEATS,feedingTime,feedingFrame,playFeedingSound}=await import(pathToFileURL(path.resolve(__dirname,'../game-of-worms/n2-feeding.js')));
 assert(FEEDING_AUDIO.offsets.every(offset=>offset>=0&&offset+FEEDING_AUDIO.duration<=duration),'Every slurp excerpt fits the existing recording');
 const end=feedingTime(23350),length=FEEDING_AUDIO.duration*1000;
 assert.equal(FEEDING_BEATS[0],feedingTime(4350),'Sound begins with the crawl, after landing');
 assert(end-FEEDING_BEATS.at(-1)-length>=0&&end-FEEDING_BEATS.at(-1)-length<50,'Slurping ends just before departure');
 for(let i=0;i<FEEDING_BEATS.length;i++){
  const beat=FEEDING_BEATS[i];assert.equal(feedingFrame(beat).crawler,1);assert.equal(feedingFrame(beat+length).crawler,1);
  if(i)assert(beat-FEEDING_BEATS[i-1]<=length-80,'Adjacent excerpts overlap through the full fade-out instead of leaving silent gaps');
 }
 const starts=[],stops=[],gains=[];let requests=0;
 global.window={AudioContext:class{constructor(){this.state='running';this.currentTime=0;}async resume(){}async decodeAudioData(){return{duration,numberOfChannels:1,sampleRate:rate,getChannelData:()=>new Float32Array(Math.ceil(duration*rate)).fill(.4)}}createBufferSource(){return{connect(){},disconnect(){},start(...args){starts.push(args)},stop(...args){stops.push(args)}}}createGain(){return{connect(){},disconnect(){},gain:{setValueAtTime(v){gains.push(v)},linearRampToValueAtTime(v){gains.push(v)},cancelScheduledValues(){},setTargetAtTime(){}}}}}};
 global.fetch=async()=>{requests++;return{ok:true,arrayBuffer:async()=>wav.buffer}};
 const {recordedSound}=await import(pathToFileURL(path.resolve(__dirname,'../game-of-worms/scene-performance.js')));
 const sound=recordedSound({eat:'reunion-eat.wav'});assert.equal(sound.play('eat'),false,'No playback before gesture preparation');await sound.prepare(['eat']);await sound.prepare(['eat']);assert.equal(requests,1);
 for(const small of[false,true])for(let i=0;i<FEEDING_BEATS.length;i++)assert(playFeedingSound(sound,i,small));
 assert.equal(starts.length,FEEDING_BEATS.length*2);assert(starts.every(v=>v[2]===FEEDING_AUDIO.duration));assert(Math.max(...gains)*.4<=.055,'Peak level remains gentle despite the longer playback');
 sound.stop();assert.equal(stops.length,starts.length);sound.stop();assert.equal(stops.length,starts.length,'Cancellation is idempotent');
 assert(playFeedingSound(sound,FEEDING_BEATS.length-1,false,.3));assert.equal(starts.at(-1)[2],.3,'A delayed final frame trims the sound to the remaining crawl time');sound.stop();
 global.fetch=async()=>{throw Error('offline')};const offline=recordedSound({eat:'missing.wav'});await offline.prepare(['eat']);assert.equal(offline.play('eat'),false);
 console.log('Feeding audio: continuous coverage of both laps, valid overlapping excerpts, quiet levels for both worms, gesture preparation, cached decoding, cancellation and offline fallback pass.');
})().catch(e=>{console.error(e);process.exitCode=1});
