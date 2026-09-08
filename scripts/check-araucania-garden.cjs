const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
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
  const playSource=fs.readFileSync(path.join(root,'araucania-play.js'),'utf8').replace(/\.\/araucania-art\.js\?v=[^']+/,artURL);
  const rolling=playSource.split("else if(kind==='roll'){")[1].split("else if(kind==='eat'){")[0];
  assert.ok(!rolling.includes('moveTo('),'Rolling must not carry the food board into the compost area');
  const {actionFor,durations,envelope,createGardenSound,fillPourSound,pourWindow,fillSlurpSound,slurpSeconds,eatingFrame,breadBites}=await import('data:text/javascript;base64,'+Buffer.from(playSource).toString('base64'));
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
    const slurp=new Float32Array(Math.ceil(rate*slurpSeconds));fillSlurpSound(slurp,rate,random);
    assert.ok(slurp.every(Number.isFinite));assert.equal(Math.abs(slurp[0]),0);assert.ok(Math.abs(slurp.at(-1))<.0001);
    assert.ok(Math.max(...slurp.map(Math.abs))<1.1);assert.ok(slurpSeconds<=.35);
  }
  assert.equal(actionFor(COMPOST,false,false,false),'tip');assert.equal(actionFor(COMPOST,false,true,false),'ride');
  assert.equal(actionFor(COMPOST,true,false,false),'fork');assert.equal(actionFor(MATE,false,false,false),'sip');assert.equal(actionFor(MATE,true,false,false),'pour');
  assert.equal(actionFor(FOOD,true,false),'eat');assert.equal(actionFor(FOOD,true,true),'eat');assert.equal(actionFor(FOOD,false,false),'roll');
  assert.ok(!playSource.includes("kind==='cut'"),'No intermediate cutting activity');
  assert.equal(envelope(0),0);assert.equal(envelope(1),0);assert.equal(envelope(.5),1);
  assert.ok(Object.values(durations).every(n=>n>=1000&&n<=4500));
  let active=0,peak=0,created=0;const filters=[],gains=[];
  class Audio{
    constructor(){created++;this.state='running';this.sampleRate=400;this.destination={};}
    resume(){return Promise.resolve();}
    createBuffer(_,length){return{getChannelData:()=>new Float32Array(length)};}
    createBufferSource(){let started=false;return {connect(){},disconnect(){},start(){started=true;active++;peak=Math.max(peak,active);},stop(){if(started){active--;started=false;this.onended?.();}}};}
    createBiquadFilter(){const n={frequency:{},Q:{},connect(){},disconnect(){}};filters.push(n);return n;}
    createGain(){const n={gain:{},connect(){},disconnect(){}};gains.push(n);return n;}
  }
  global.window={AudioContext:Audio};const sound=createGardenSound();sound.play('soil');assert.equal(created,0);
  await sound.prepare();for(const kind of['soil','wheel','pour','sip','wood','crunch'])sound.play(kind);assert.equal(peak,1);sound.stop();assert.equal(active,0);
  assert.equal(filters[2].type,'lowpass');assert.equal(gains[2].gain.value,.028);
  assert.equal(filters[3].frequency.value,1250);assert.equal(filters[3].Q.value,1.8);assert.equal(gains[3].gain.value,.038);
  for(const i of[0,1,4,5]){assert.equal(filters[i].type,'bandpass');assert.equal(gains[i].gain.value,.035);}
  const game=fs.readFileSync(path.join(root,'game.js'),'utf8');
  for(const hook of['araucaniaPlay.clear()','araucaniaPlay.cancel()','araucaniaPlay.start(piece)','araucaniaPlay.reset(piece)','araucaniaPlay.handles(piece)'])assert.ok(game.includes(hook),hook);
  assert.match(playSource,/if\(reduced\.matches\)/);assert.match(playSource,/visibilitychange/);assert.match(playSource,/resize/);assert.match(playSource,/current\.ending/);
  console.log('Araucanía: six distinct props, motion hooks, action phases, bounded gesture-only sound and single-voice handover checks pass.');
})().catch(e=>{console.error(e);process.exit(1);});
