const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL,fileURLToPath}=require('node:url');

(async()=>{
  const root=path.join(__dirname,'../game-of-worms');
  const {createLeafCutSound,leafSnipURL}=await import(pathToFileURL(path.join(root,'panama-leaf-audio.js')));
  const {leafSnipAt}=await import(pathToFileURL(path.join(root,'panama-leaf-cutting.js')));
  const clip=fs.readFileSync(fileURLToPath(leafSnipURL));
  assert.equal(clip.toString('ascii',0,4),'RIFF');
  assert.equal(clip.toString('ascii',8,12),'WAVE');
  let pcm,rate;
  for(let p=12;p+8<=clip.length;){
    const tag=clip.toString('ascii',p,p+4),size=clip.readUInt32LE(p+4);
    if(tag==='fmt '){assert.equal(clip.readUInt16LE(p+8),1);assert.equal(clip.readUInt16LE(p+10),1);rate=clip.readUInt32LE(p+12);assert.equal(clip.readUInt16LE(p+22),16);}
    if(tag==='data')pcm=clip.subarray(p+8,p+8+size);
    p+=8+size+(size%2);
  }
  assert.equal(rate,44100);assert.equal(pcm.length/2/rate,.4);assert(clip.length<36000);
  let peak=0,peakAt=0,power=0;
  for(let i=0;i<pcm.length/2;i++){const x=pcm.readInt16LE(i*2)/32768;power+=x*x;if(Math.abs(x)>peak){peak=Math.abs(x);peakAt=i/rate;}}
  assert(peak>.39&&peak<.41);assert(Math.sqrt(power/(pcm.length/2))>.04);
  assert.equal(pcm.readInt16LE(0),0);assert.equal(pcm.readInt16LE(pcm.length-2),0);
  assert(Math.abs(leafSnipAt+peakAt*1000-1380)<25,'Strongest recorded closure lands on the visible cut');

  let ctx=null,fetches=0,decodes=0,active=0,most=0;
  const sources=[],gains=[];
  const audio={state:'running',destination:{},
    decodeAudioData:async data=>{decodes++;assert.deepEqual(Buffer.from(data),clip);return {duration:.4,recorded:true};},
    createBufferSource(){let running=false;const n={connect(){},disconnect(){},start(){running=true;active++;most=Math.max(most,active);},stop(){if(running){running=false;active--;this.onended?.();}}};sources.push(n);return n;},
    createGain(){const n={gain:{},connect(){},disconnect(){}};gains.push(n);return n;}
  };
  const fetchClip=async url=>{fetches++;assert.equal(url,leafSnipURL);return {ok:true,arrayBuffer:async()=>Uint8Array.from(clip).buffer};};
  global.fetch=fetchClip;global.document={hidden:false};
  const sound=createLeafCutSound(()=>ctx);
  sound.play();assert.equal(active,0);assert.equal(await sound.prepare(),false);assert.equal(fetches,0,'No loading before audio is unlocked by a gesture');
  ctx=audio;await Promise.all([sound.prepare(),sound.prepare()]);assert.equal(fetches,1);assert.equal(decodes,1);
  sound.play();sound.play();assert.equal(most,1);assert.equal(active,1);sound.stop();assert.equal(active,0);
  assert(sources.every(n=>n.buffer.recorded));assert(gains.every(n=>n.gain.value===.8));
  document.hidden=true;sound.play();assert.equal(active,0);document.hidden=false;
  ctx.state='suspended';sound.play();assert.equal(active,0);ctx.state='running';
  await sound.prepare();assert.equal(fetches,1,'Reuse the short decoded clip');

  let release;
  global.fetch=url=>new Promise(resolve=>{release=()=>resolve(fetchClip(url));});
  const slow=createLeafCutSound(()=>ctx),pending=slow.prepare();
  slow.play();slow.stop();assert.equal(active,0);release();await pending;assert.equal(active,0,'Late downloads never trigger a delayed snip');
  slow.play();assert.equal(active,1);slow.stop();
  global.fetch=async()=>({ok:false});const retry=createLeafCutSound(()=>ctx);
  assert.equal(await retry.prepare(),false);retry.play();assert.equal(active,0);
  global.fetch=fetchClip;assert.equal(await retry.prepare(),true);retry.play();assert.equal(active,1);retry.stop();
  global.fetch=()=>{throw Error('Network blocked');};const blocked=createLeafCutSound(()=>ctx);
  assert.equal(await blocked.prepare(),false);global.fetch=fetchClip;
  assert.equal(await blocked.prepare(),true,'Synchronous network failure can retry too');
  const play=fs.readFileSync(path.join(root,'panama-play.js'),'utf8');
  assert(!play.includes('fillLeafSnip'));assert.match(play,/function stopSound\(\)\{leafSound.stop\(\)/);
  assert.match(play,/if\(reduced.matches\)return;\s*if\(kind==='snip'\)/);
  console.log('Panama scissors: real 400 ms recording, safe levels, synchronized closure, gesture-only loading, one voice, cancellation, retry and no late sound pass.');
})().catch(error=>{console.error(error);process.exitCode=1;});
