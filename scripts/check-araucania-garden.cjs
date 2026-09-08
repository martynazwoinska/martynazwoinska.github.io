const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL,fileURLToPath}=require('node:url');
const root=path.join(__dirname,'../game-of-worms');
class Element{
  constructor(tag){this.tag=tag;this.attrs={};this.children=[];}
  setAttribute(k,v){this.attrs[k]=String(v);}
  append(...nodes){this.children.push(...nodes);}
}
const walk=n=>[n,...n.children.flatMap(walk)];
(async()=>{
  global.document={hidden:false,createElementNS:(_,tag)=>new Element(tag)};
  const artSource=fs.readFileSync(path.join(root,'araucania-art.js'),'utf8');
  const artURL='data:text/javascript;base64,'+Buffer.from(artSource).toString('base64');
  const {drawAraucaniaWork,COMPOST,MATE,FOOD,araucaniaLayouts}=await import(artURL);
  const all=[];
  const cartLayout=araucaniaLayouts[COMPOST].primary;
  const dumpEdge=cartLayout[0]+74*cartLayout[2];
  for(const [part,halfWidth] of [['primary',111],['companion',78]]){
    const board=araucaniaLayouts[FOOD][part];
    assert.ok(board[0]+halfWidth*board[2]<dumpEdge-60,'Food boards must stay behind the unloading area');
  }
  for(const family of[COMPOST,MATE,FOOD]){
    const forms=[];
    for(const small of[false,true]){
      const g=new Element('g');assert.equal(drawAraucaniaWork(g,{family},small),true);
      const nodes=walk(g);assert.ok(nodes.some(n=>n.tag==='path'&&n.attrs.d),'Object must render path geometry');
      for(const n of nodes)for(const v of Object.values(n.attrs))assert.ok(!/NaN|undefined|Infinity/.test(v));
      assert.equal(nodes.filter(n=>n.tag==='text').length,0,'Silhouettes must stand without labels');
      forms.push(JSON.stringify(g));all.push(...nodes);
      const layout=araucaniaLayouts[family][small?'companion':'primary'];assert.equal(layout.length,4);assert.ok(layout.every(Number.isFinite));
    }
    assert.notEqual(...forms,'Pair must have two different drawings');
  }
  for(const attr of['data-cart','data-passenger-slot','data-cart-front','data-fork','data-mate-cup','data-kettle','data-rolling-pin','data-bread-board','data-snack'])assert.ok(all.some(n=>attr in n.attrs),attr);
  assert.ok(!all.some(n=>'data-cutter' in n.attrs),'The male gets ready-to-eat bread, not a cutter');
  assert.deepEqual(all.filter(n=>'data-serving' in n.attrs).map(n=>n.attrs['data-serving']).sort(),['0','1','2']);
  const playSource=fs.readFileSync(path.join(root,'araucania-play.js'),'utf8').replace(/\.\/araucania-art\.js\?v=[^']+/,artURL)
    .replaceAll('import.meta.url',JSON.stringify(pathToFileURL(path.join(root,'araucania-play.js')).href));
  const rolling=playSource.split("else if(kind==='roll'){")[1].split("else if(kind==='eat'){")[0];
  assert.ok(!rolling.includes('moveTo('),'Rolling must not carry the food board into the compost area');
  const {actionFor,durations,envelope,createGardenSound,fillPourSound,pourWindow,gardenRecordings,eatingFrame,breadBites}=await import('data:text/javascript;base64,'+Buffer.from(playSource).toString('base64'));
  assert.equal(eatingFrame(0).reach,0);assert.equal(eatingFrame(1).reach,0);
  assert.equal(eatingFrame(.2).bite,0);assert.equal(eatingFrame(.35).bite,1);assert.equal(eatingFrame(.6).bite,2);assert.equal(eatingFrame(.8).bite,3);
  assert.equal(eatingFrame(.5).chewing,true);assert.equal(eatingFrame(.95).chewing,false);
  assert.ok(breadBites.every((t,i)=>i===0||t>breadBites[i-1]));
  assert.ok(eatingFrame(.4).reach<eatingFrame(.29).reach,'Hand pauses away from mouth between bites');
  assert.match(playSource,/servings\+\+/);assert.match(playSource,/data-garden-chew/);assert.match(playSource,/clip-rule/);
  const pourSeconds=durations.pour*(pourWindow.end-pourWindow.start)/1000;
  assert.ok(pourSeconds>.7&&pourSeconds<.8,'Pour must match the short visible stream');
  for(const rate of[44100,48000]){
    let seed=71;const random=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);
    const data=new Float32Array(Math.ceil(rate*pourSeconds));fillPourSound(data,rate,random);
    assert.ok(data.every(Number.isFinite));assert.equal(Math.abs(data[0]),0);assert.ok(Math.abs(data.at(-1))<.0001);
    const peak=Math.max(...data.map(Math.abs)),rms=Math.sqrt(data.reduce((sum,v)=>sum+v*v,0)/data.length);
    assert.ok(peak<.8&&rms>.01&&rms<.2,'Pour should remain audible and unclipped');
  }
  const clips=Object.values(gardenRecordings).flat(),durationsByClip=[.46,.42,.38,.58];
  assert.equal(clips.length,4);assert.equal(new Set(clips).size,4);
  const clipBytes=clips.map((url,i)=>{
    const b=fs.readFileSync(fileURLToPath(url));
    assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.toString('ascii',8,12),'WAVE');
    assert.equal(b.readUInt16LE(20),1);assert.equal(b.readUInt16LE(22),1);assert.equal(b.readUInt16LE(34),16);
    assert.equal(b.readUInt32LE(24),44100);assert.ok(b.length<55000);
    const seconds=b.readUInt32LE(40)/88200;assert.ok(Math.abs(seconds-durationsByClip[i])<.0001);
    const samples=Array.from({length:b.readUInt32LE(40)/2},(_,n)=>b.readInt16LE(44+n*2)/32768);
    assert.equal(samples[0],0);assert.equal(samples.at(-1),0);
    const peak=Math.max(...samples.map(Math.abs)),rms=Math.sqrt(samples.reduce((sum,v)=>sum+v*v,0)/samples.length);
    assert.ok(peak>.39&&peak<.4,'Recorded clips peak at -8 dBFS before the quiet playback gain');
    assert.ok(rms>.019&&rms<.04,'Clips contain an audible event without sustained loud noise');
    return b;
  });
  assert.equal(new Set(clipBytes.map(b=>b.toString('base64'))).size,4,'Use distinct takes, not pitch-shifted duplicates');
  assert.ok(!playSource.includes('fillSlurpSound'),'Do not restore the rejected synthetic slurp');
  assert.equal(actionFor(COMPOST,false,false,false),'tip');assert.equal(actionFor(COMPOST,false,true,false),'ride');
  assert.equal(actionFor(COMPOST,true,false,false),'fork');assert.equal(actionFor(MATE,false,false,false),'sip');assert.equal(actionFor(MATE,true,false,false),'pour');
  assert.equal(actionFor(FOOD,true,false),'eat');assert.equal(actionFor(FOOD,true,true),'eat');assert.equal(actionFor(FOOD,false,false),'roll');
  assert.ok(!playSource.includes("kind==='cut'"),'No intermediate cutting activity');
  assert.equal(envelope(0),0);assert.equal(envelope(1),0);assert.equal(envelope(.5),1);
  assert.ok(Object.values(durations).every(n=>n>=1000&&n<=4500));
  let active=0,peak=0,created=0,fetches=0;const filters=[],gains=[],sources=[];
  class Audio{
    constructor(){created++;this.state='running';this.sampleRate=400;this.destination={};}
    resume(){return Promise.resolve();}
    createBuffer(_,length){return{getChannelData:()=>new Float32Array(length)};}
    decodeAudioData(bytes){return Promise.resolve({recording:Buffer.from(bytes).toString('base64')});}
    createBufferSource(){let started=false;const source={connect(){},disconnect(){},start(){started=true;active++;peak=Math.max(peak,active);},stop(){if(started){active--;started=false;this.onended?.();}}};sources.push(source);return source;}
    createBiquadFilter(){const n={frequency:{},Q:{},connect(){},disconnect(){}};filters.push(n);return n;}
    createGain(){const n={gain:{},connect(){},disconnect(){}};gains.push(n);return n;}
  }
  const fetchClip=async url=>{fetches++;return {ok:true,arrayBuffer:async()=>Uint8Array.from(fs.readFileSync(fileURLToPath(url))).buffer};};
  global.fetch=fetchClip;global.window={AudioContext:Audio};const sound=createGardenSound();sound.play('soil');assert.equal(created,0);assert.equal(fetches,0);
  await sound.prepare();for(const kind of['soil','wheel','pour','sip','wood','crunch'])sound.play(kind);assert.equal(peak,1);sound.stop();assert.equal(active,0);
  assert.equal(filters[2].type,'lowpass');assert.equal(gains[2].gain.value,.028);
  for(const i of[0,1,3])assert.equal(filters[i].type,'bandpass');
  for(const i of[0,1,4])assert.equal(gains[i].gain.value,.035);
  for(const i of[3,5])assert.equal(gains[i].gain.value,.8);
  assert.equal(filters.length,4,'Recorded sounds bypass the synthetic bandpass filter');
  for(let i=0;i<3;i++)sound.play('crunch');sound.stop();
  assert.deepEqual(sources.filter(s=>s.buffer?.recording).map(s=>s.buffer.recording),[clipBytes[3],clipBytes[0],clipBytes[1],clipBytes[2],clipBytes[0]].map(b=>b.toString('base64')));
  await sound.prepare();assert.equal(fetches,4,'Decode and fetch once, then reuse cached recordings');
  document.hidden=true;sound.play('sip');assert.equal(active,0);document.hidden=false;
  // A cancelled action must never make a late sound when downloading finishes.
  const releases=[];global.fetch=url=>new Promise(resolve=>releases.push(()=>resolve(fetchClip(url))));
  const slow=createGardenSound(),preparing=slow.prepare();slow.play('sip');slow.stop();assert.equal(active,0);
  releases.forEach(release=>release());await preparing;assert.equal(active,0);
  slow.play('sip');assert.equal(active,1);slow.stop();assert.equal(active,0);
  // Failure is silent and retryable, never replaced by the old noise effect.
  global.fetch=async()=>({ok:false});const retry=createGardenSound();await retry.prepare();retry.play('crunch');assert.equal(active,0);
  global.fetch=fetchClip;await retry.prepare();retry.play('crunch');assert.equal(active,1);retry.stop();
  const game=fs.readFileSync(path.join(root,'game.js'),'utf8');
  for(const hook of['araucaniaPlay.clear()','araucaniaPlay.cancel()','araucaniaPlay.start(piece)','araucaniaPlay.reset(piece)','araucaniaPlay.handles(piece)'])assert.ok(game.includes(hook),hook);
  assert.match(playSource,/if\(reduced\.matches\)/);assert.match(playSource,/visibilitychange/);assert.match(playSource,/resize/);assert.match(playSource,/current\.ending/);
  assert.match(playSource,/run===current&&!current.ready/);assert.match(playSource,/else if\(current.ready\)/);
  console.log('Araucanía: props, action phases, four recorded clips, gesture-only audio, loading/cancellation/retry and single-voice checks pass.');
})().catch(e=>{console.error(e);process.exit(1);});
