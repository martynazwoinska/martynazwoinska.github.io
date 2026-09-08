const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {pathToFileURL,fileURLToPath}=require('node:url');
const {createHash}=require('node:crypto');
(async()=>{
  const root=path.join(__dirname,'../game-of-worms');
  const {createAhmedabadAudio,ahmedabadDiggingClips:clips,ahmedabadDiggingCues:cues}=await import(pathToFileURL(path.join(root,'ahmedabad-audio.js')));
  const {ahmedabadFrame:frame}=await import(pathToFileURL(path.join(root,'ahmedabad-hands.js')));
  const bytes=new Map(),peakTimes=[],hashes=[];let total=0;
  for(const [i,url] of clips.entries()){
    const b=fs.readFileSync(fileURLToPath(url));bytes.set(url,b);total+=b.length;
    assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.toString('ascii',8,12),'WAVE');
    assert.equal(b.readUInt16LE(20),1);assert.equal(b.readUInt16LE(22),1);assert.equal(b.readUInt32LE(24),48000);assert.equal(b.readUInt16LE(34),16);
    assert.equal(b.toString('ascii',36,40),'data');const pcm=b.subarray(44),n=pcm.length/2;
    assert.equal(n/48000,[.65,.35,.39][i]);assert.equal(pcm.readInt16LE(0),0);assert.equal(pcm.readInt16LE(pcm.length-2),0);
    let peak=0,peakAt=0,power=0;
    for(let k=0;k<n;k++){const v=pcm.readInt16LE(k*2)/32768;power+=v*v;if(Math.abs(v)>peak){peak=Math.abs(v);peakAt=k/48;}}
    assert(Math.abs(peak-[.36,.29,.29][i])<.001);assert(Math.sqrt(power/n)>.007);
    peakTimes.push(peakAt);hashes.push(createHash('sha256').update(b).digest('hex'));
  }
  assert.equal(new Set(hashes).size,3,'Three genuine takes');assert(total<135000);
  for(const male of [false,true]){
    assert.equal(cues(male).length,male?2:1);
    for(const c of cues(male)){
      assert(frame(c.at,'soil',male).pickup===1,'Worm reaches the soil before the sound');
      assert(frame(c.at+peakTimes[c.variant],'soil',male).down>.99999,'Main transient aligns with maximum blade pressure');
      assert(c.at+([.65,.35,.39][c.variant]*1000)<(male?4700:4300));
    }
  }
  let fetches=0,decodes=0,contexts=0,active=0,maxActive=0;const sources=[],gains=[];
  const ctx={state:'running',destination:{},resume:async()=>{},
    decodeAudioData:async b=>{decodes++;return {recorded:true,duration:(b.byteLength-44)/96000};},
    createBufferSource(){let running=false;const s={connect(){},disconnect(){},start(when,offset){this.offset=offset;running=true;active++;maxActive=Math.max(maxActive,active);},stop(){if(running){running=false;active--;this.onended?.();}}};sources.push(s);return s;},
    createGain(){const g={gain:{},connect(){},disconnect(){}};gains.push(g);return g;}
  };
  global.window={AudioContext:function(){contexts++;return ctx;}};global.document={hidden:false};
  const fetchClip=async url=>{fetches++;assert(bytes.has(url));return {ok:true,arrayBuffer:async()=>Uint8Array.from(bytes.get(url)).buffer};};global.fetch=fetchClip;
  const audio=createAhmedabadAudio();audio.play('soil');assert.equal(fetches+contexts,0);
  await audio.unlock();assert.equal(contexts,1);assert.equal(fetches,0,'Kite use does not download soil audio');
  assert((await Promise.all([audio.unlock('soil'),audio.unlock('soil')])).every(Boolean));assert.equal(fetches,3);assert.equal(decodes,3);
  for(let i=0;i<3;i++){audio.play('soil',i>0,i);assert.equal(active,1);assert(sources.at(-1).buffer.recorded);assert.equal(gains.at(-1).gain.value,i>0?.7:.8);audio.cancel();assert.equal(active,0);}
  await audio.unlock('soil');assert.equal(fetches,3,'Decoded recordings are reused');
  audio.play('soil',false,0,42);assert.equal(sources.at(-1).offset,.042);audio.cancel();
  audio.play('soil',false,0,700);assert.equal(active,0,'Expired cues stay silent');
  document.hidden=true;audio.play('soil');assert.equal(active,0);document.hidden=false;
  ctx.state='suspended';audio.play('soil');assert.equal(active,0);ctx.state='running';
  audio.play('invalid');audio.play('soil',false,99);assert.equal(active,0);
  let releases=[];global.fetch=url=>new Promise(resolve=>releases.push(()=>resolve(fetchClip(url))));
  const slow=createAhmedabadAudio(),pending=slow.unlock('soil');slow.play('soil');slow.cancel();releases.forEach(release=>release());await pending;assert.equal(active,0,'Late downloads never replay missed cues');
  global.fetch=async()=>({ok:false});const retry=createAhmedabadAudio();assert.equal(await retry.unlock('soil'),false);retry.play('soil');assert.equal(active,0);
  global.fetch=fetchClip;assert.equal(await retry.unlock('soil'),true);retry.play('soil');assert.equal(active,1);retry.cancel();
  global.fetch=()=>{throw Error('Blocked');};assert.equal(await createAhmedabadAudio().unlock('soil'),false);
  global.window={};const silent=createAhmedabadAudio();assert.equal(await silent.unlock('soil'),false);silent.play('soil');assert.equal(active,0);
  const hands=fs.readFileSync(path.join(root,'ahmedabad-hands.js'),'utf8');
  assert.match(hands,/if\(!reduced.matches\)sound.unlock\(entry.kind\)/);assert.match(hands,/!reduced.matches&&ms-cue.at<90/);assert.match(hands,/sound.cancel\(\);action=null/);
  assert.equal(maxActive,1);
  console.log('Ahmedabad audio: three short recorded takes, safe peaks/fades, blade-contact timing, gesture-only loading, caching, cancellation, retries, silent failures and no late playback pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});
