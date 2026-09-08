const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL,fileURLToPath}=require('node:url');
const {createHash}=require('node:crypto');
(async()=>{
  const root=path.join(__dirname,'../game-of-worms');
  const {nambuccaClips:clips,nambuccaSoundCues:cues,createNambuccaSound}=await import(pathToFileURL(path.join(root,'nambucca-audio.js')));
  const {paintFrame,pressFrame}=await import(pathToFileURL(path.join(root,'nambucca-play.js')));
  const bytes=new Map(),durations=new Map(),peaksAt=new Map(),hashes=[];
  let total=0;
  for(const [kind,urls] of Object.entries(clips))for(const url of urls){
    const b=fs.readFileSync(fileURLToPath(url));bytes.set(url,b);total+=b.length;
    assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.toString('ascii',8,12),'WAVE');
    assert.equal(b.readUInt16LE(20),1);assert.equal(b.readUInt16LE(22),1);assert.equal(b.readUInt32LE(24),44100);assert.equal(b.readUInt16LE(34),16);
    assert.equal(b.toString('ascii',36,40),'data');
    const pcm=b.subarray(44),n=pcm.length/2,duration=n/44100;durations.set(url,duration);
    assert.equal(duration,kind==='press'?.3:.48);
    assert.equal(pcm.readInt16LE(0),0);assert.equal(pcm.readInt16LE(pcm.length-2),0);
    let peak=0,peakAt=0,power=0;
    for(let i=0;i<n;i++){const v=pcm.readInt16LE(i*2)/32768;power+=v*v;if(Math.abs(v)>peak){peak=Math.abs(v);peakAt=i/44100;}}
    const target=kind==='brush'?.18:kind==='paper'?.22:.25;
    assert(Math.abs(peak-target)<.001);assert(Math.sqrt(power/n)>.008);
    peaksAt.set(url,peakAt);hashes.push(createHash('sha256').update(b).digest('hex'));
  }
  assert.equal(new Set(hashes).size,5,'Three real brush takes and two distinct press recordings');
  assert(total<200000);
  for(const male of [false,true]){
    const brushCues=cues('paint',male);assert.equal(brushCues.length,5);
    for(let i=0;i<brushCues.length;i++){
      const c=brushCues[i],duration=durations.get(clips.brush[c.variant])*1000;
      assert.equal(paintFrame(c.at,5).progress,i,'Sound begins at bristle contact, after travel');
      assert(paintFrame(c.at+duration,5).progress<i+1,'Sound ends before the next lift');
      assert(c.level>0&&c.level<=1);
    }
    const pressCues=cues('press',male);
    if(male){assert.deepEqual(pressCues.map(x=>x.type),['paper','paper']);assert(pressFrame(pressCues[0].at,true).pull>0);assert(pressFrame(pressCues[1].at,true).pull<1);}
    else {assert.deepEqual(pressCues.map(x=>x.type),['press']);const contact=pressCues[0].at+peaksAt.get(clips.press[0])*1000;assert(pressFrame(contact,false).close>.995);}
  }
  let fetches=0,decodes=0,active=0,most=0,contexts=0;
  const sources=[],gains=[];
  const audio={state:'running',destination:{},resume:async()=>{},
    decodeAudioData:async b=>{decodes++;return {recorded:true,bytes:Buffer.from(b),duration:(b.byteLength-44)/2/44100};},
    createBufferSource(){let running=false;const s={connect(){},disconnect(){},start(when,offset){this.offset=offset;running=true;active++;most=Math.max(most,active);},stop(){if(running){running=false;active--;this.onended?.();}}};sources.push(s);return s;},
    createGain(){const g={gain:{},connect(){},disconnect(){}};gains.push(g);return g;}
  };
  global.window={AudioContext:function(){contexts++;return audio;}};
  global.document={hidden:false};
  const fetchClip=async url=>{fetches++;assert(bytes.has(url));return {ok:true,arrayBuffer:async()=>Uint8Array.from(bytes.get(url)).buffer};};
  global.fetch=fetchClip;
  const sound=createNambuccaSound();sound.play('brush');assert.equal(contexts,0);assert.equal(fetches,0);
  assert((await Promise.all([sound.unlock('paint'),sound.unlock('paint')])).every(Boolean));
  assert.equal(contexts,1);assert.equal(fetches,3);assert.equal(decodes,3);
  sound.play('brush',0);sound.play('brush',1);assert.equal(most,1);assert.equal(active,1);
  assert.notDeepEqual(sources[0].buffer.bytes,sources[1].buffer.bytes);sound.stop();assert.equal(active,0);
  await sound.unlock('press');assert.equal(fetches,5);sound.play('paper');sound.play('press');assert.equal(active,1);sound.stop();
  await sound.unlock('paint');assert.equal(fetches,5,'Decoded files are reused');
  document.hidden=true;sound.play('brush');assert.equal(active,0);document.hidden=false;
  audio.state='suspended';sound.play('paper');assert.equal(active,0);audio.state='running';
  sound.play('brush',2,.45);assert.equal(gains.at(-1).gain.value,.7*.45);sound.stop();
  sound.play('brush',0,1,70);assert.equal(sources.at(-1).offset,.07,'Frame delay skips the elapsed audio so it still ends before the lift');sound.stop();
  sound.play('brush',0,1,600);assert.equal(active,0,'An expired clip stays silent');
  sound.play('missing');assert.equal(active,0);
  let releases=[];
  global.fetch=url=>new Promise(resolve=>releases.push(()=>resolve(fetchClip(url))));
  const slow=createNambuccaSound(),pending=slow.unlock('paint');slow.play('brush');slow.stop();assert.equal(active,0);
  releases.forEach(release=>release());await pending;assert.equal(active,0,'Late downloads never play out of sync');
  global.fetch=async()=>({ok:false});const retry=createNambuccaSound();assert.equal(await retry.unlock('paint'),false);retry.play('brush');assert.equal(active,0);
  global.fetch=fetchClip;assert.equal(await retry.unlock('paint'),true);retry.play('brush');assert.equal(active,1);retry.stop();
  global.fetch=()=>{throw Error('Blocked');};const blocked=createNambuccaSound();assert.equal(await blocked.unlock('press'),false);
  global.fetch=fetchClip;assert.equal(await blocked.unlock('press'),true);
  const play=fs.readFileSync(path.join(root,'nambucca-play.js'),'utf8');
  assert.match(play,/if\(!reduced.matches\)sound.unlock\(kind\)/);
  assert.match(play,/!reduced.matches&&ms-cue.at<90/);
  assert.match(play,/raf=0;sound.stop\(\)/);
  assert(!fs.readFileSync(path.join(root,'nambucca-audio.js'),'utf8').includes('Math.sin'));
  console.log('Nambucca audio: five recorded clips, safe levels, distinct brush takes, contact timing, silent lifts/screws, gesture-only loading, cancellation, retries and no delayed sounds pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});
