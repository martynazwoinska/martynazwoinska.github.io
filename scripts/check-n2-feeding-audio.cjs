const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {pathToFileURL}=require('node:url');
(async()=>{
 const wav=fs.readFileSync(path.resolve(__dirname,'../game-of-worms/assets/audio/reunion-eat.wav'));
 assert.equal(wav.toString('ascii',0,4),'RIFF');assert.equal(wav.toString('ascii',8,12),'WAVE');
 let rate,bytesPerSecond,dataBytes;
 for(let p=12;p+8<=wav.length;){const id=wav.toString('ascii',p,p+4),size=wav.readUInt32LE(p+4);if(id==='fmt '){rate=wav.readUInt32LE(p+12);bytesPerSecond=wav.readUInt32LE(p+16);}if(id==='data')dataBytes=size;p+=8+size+(size%2);}
 const duration=dataBytes/bytesPerSecond;assert(duration>=.54,'Recording covers every bite excerpt');
 const starts=[],stops=[],gains=[];let requests=0;
 global.window={AudioContext:class{constructor(){this.state='running';this.currentTime=0;}async resume(){}async decodeAudioData(){return{duration,numberOfChannels:1,sampleRate:rate,getChannelData:()=>new Float32Array(Math.ceil(duration*rate)).fill(.4)}}createBufferSource(){return{connect(){},disconnect(){},start(...args){starts.push(args)},stop(...args){stops.push(args)}}}createGain(){return{connect(){},disconnect(){},gain:{setValueAtTime(v){gains.push(v)},linearRampToValueAtTime(v){gains.push(v)},cancelScheduledValues(){},setTargetAtTime(){}}}}}};
 global.fetch=async()=>{requests++;return{ok:true,arrayBuffer:async()=>wav.buffer}};
 const {recordedSound}=await import(pathToFileURL(path.resolve(__dirname,'../game-of-worms/scene-performance.js')));
 const sound=recordedSound({eat:'reunion-eat.wav'});assert.equal(sound.play('eat'),false,'No playback before gesture preparation');await sound.prepare(['eat']);await sound.prepare(['eat']);assert.equal(requests,1);
 for(let i=0;i<3;i++)assert(sound.play('eat',i%2?.25:0,.29,.11));assert.equal(starts.length,3);assert(starts.every(v=>v[2]===.29));assert(Math.max(...gains)<=.9);
 sound.stop();assert.equal(stops.length,3);sound.stop();assert.equal(stops.length,3);
 global.fetch=async()=>{throw Error('offline')};const offline=recordedSound({eat:'missing.wav'});await offline.prepare(['eat']);assert.equal(offline.play('eat'),false);
 console.log('Feeding audio: valid recording, gesture preparation, cached decoding, three quiet excerpts, cancellation and offline fallback pass.');
})().catch(e=>{console.error(e);process.exitCode=1});
