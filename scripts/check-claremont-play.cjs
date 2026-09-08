const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
(async()=>{
  const root=path.resolve(__dirname,'..');
  const art=fs.readFileSync(path.join(root,'game-of-worms/claremont-book-art.js'),'utf8');
  const artUrl='data:text/javascript;base64,'+Buffer.from(art).toString('base64');
  const source=fs.readFileSync(path.join(root,'game-of-worms/claremont-play.js'),'utf8').replace(/\.\/claremont-book-art\.js\?v=[^']+/,artUrl);
  const {leafPose,pourFrame,sipFrame,soundProfile,lemonadeLevels,waterPolygon,createReadingSound}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
  for(const small of [false,true]){
    assert.equal(leafPose(0,small).scale,1);
    assert.equal(leafPose(1,small).scale,-1);
    assert.equal(leafPose(.75,small).back,true);
    assert.equal(leafPose(.25,small).back,false);
    assert.equal(leafPose(.5,small).hinge,small?-73:-9);
    for(let t=0;t<=1;t+=.01){const p=leafPose(t,small);assert.ok(p.scale>=-1&&p.scale<=1);assert.ok(Math.abs(p.skew)<=.14);}
    for(let slope=-3;slope<=3;slope+=.1)for(let level=-32;level<=8;level+=4){
      const polygon=waterPolygon(level,slope,small),bounds=small?[-54,-55,52,77]:[-77,-89,65,108];
      assert.ok(polygon.length>=3&&polygon.length<=5);
      for(const [x,y] of polygon){
        assert.ok(Number.isFinite(x)&&Number.isFinite(y));
        assert.ok(x>=bounds[0]-.001&&x<=bounds[2]+.001&&y>=bounds[1]-.001&&y<=bounds[3]+.001);
        assert.ok(y-level-slope*(x-(small?0:-5))>=-.001);
      }
    }
  }
  assert.deepEqual(lemonadeLevels(-1),{cup:1,jug:-8});
  assert.deepEqual(lemonadeLevels(1),{cup:-15,jug:0});
  assert.deepEqual(lemonadeLevels(3),{cup:-31,jug:8});
  assert.equal(pourFrame(0).approach,0);assert.equal(pourFrame(900).flow,true);
  assert.equal(pourFrame(2200).flow,false);assert.equal(pourFrame(2900).done,true);
  assert.equal(pourFrame(2900).returning,1);assert.equal(pourFrame(2900).tilt,0);
  for(const small of [true,false]){
    const end=small?1450:1700;
    assert.equal(sipFrame(0,small).reach,0);assert.equal(sipFrame(end,small).reach,0);
    assert.equal(sipFrame(end*.5,small).contact,true);assert.equal(sipFrame(end,small).done,true);
    for(let t=0;t<=end;t+=10){const f=sipFrame(t,small);assert.ok(f.reach>=0&&f.reach<=1&&f.consumed>=0&&f.consumed<=1);}
  }
  assert.ok(soundProfile('paper').duration<.2&&soundProfile('paper').volume<.03);
  assert.ok(soundProfile('slurp').duration<.3);
  for(let ms=0;ms<=3200;ms+=10)for(const key of ['approach','tilt','fill','returning'])assert.ok(pourFrame(ms)[key]>=0&&pourFrame(ms)[key]<=1);
  const contexts=[];
  class Audio {
    constructor(){this.state='suspended';this.sampleRate=8000;this.currentTime=0;this.destination={};this.sources=[];this.nodes=[];contexts.push(this);}
    resume(){this.state='running';return Promise.resolve();}
    node(extra={}){const n={connect(){},disconnect(){this.disconnected=true;},...extra};this.nodes.push(n);return n;}
    createBufferSource(){const s=this.node({starts:[],stops:[],start(t){this.starts.push(t);},stop(t){this.stops.push(t);}});this.sources.push(s);return s;}
    createBuffer(_,length){const data=new Float32Array(length);return {getChannelData(){return data;}};}
    createBiquadFilter(){return this.node({frequency:{value:0},Q:{value:0}});}
    createGain(){return this.node({gain:{events:[],setValueAtTime(...a){this.events.push(a);},linearRampToValueAtTime(...a){this.events.push(a);}}});}
  }
  global.window={AudioContext:Audio};global.document={hidden:false};
  const sound=createReadingSound();assert.equal(contexts.length,0);assert.equal(sound.play('paper'),false);
  await sound.prepare();const ctx=contexts[0];assert.equal(sound.play('paper'),true);
  assert.equal(ctx.sources[0].buffer.getChannelData().length,1360);
  assert.equal(sound.play('pour'),true);assert.ok(ctx.sources[0].disconnected);
  assert.equal(ctx.sources[1].buffer.getChannelData().length,5200);
  assert.ok(ctx.sources[1].buffer.getChannelData().every(Number.isFinite));
  assert.equal(sound.play('slurp'),true);assert.equal(ctx.sources[2].buffer.getChannelData().length,2240);
  sound.stop();assert.ok(ctx.nodes.every(n=>n.disconnected));sound.stop();
  document.hidden=true;assert.equal(sound.play('pour'),false);
  document.hidden=false;ctx.state='suspended';assert.equal(sound.play('paper'),false);
  window.AudioContext=undefined;const silent=createReadingSound();await silent.prepare();assert.equal(silent.play('paper'),false);
  const game=fs.readFileSync(path.join(root,'game-of-worms/game.js'),'utf8');
  for(const call of ['start(piece)','drop(piece)','reset(piece)','clear()','cancel()'])assert.ok(game.includes('claremontPlay.'+call));
  for(const event of ['visibilitychange','pagehide','resize'])assert.ok(source.includes(event));
  assert.match(source,/prefers-reduced-motion/);assert.match(source,/lockOrigin\(piece\)/);
  class Element{
    constructor(tag){this.tag=tag;this.attrs={};this.children=[];}
    setAttribute(k,v){this.attrs[k]=String(v);}
    append(...nodes){this.children.push(...nodes);}
    get firstChild(){return this.children[0];}
  }
  document.createElementNS=(_,tag)=>new Element(tag);
  const {drawWormbook,bookPage}=await import(artUrl),walk=n=>[n,...n.children.flatMap(walk)];
  const signatures=[];
  for(const small of [true,false]){
    const g=new Element('g');drawWormbook(g,small);signatures.push(JSON.stringify(g));
    assert.ok(walk(g).some(n=>n.textContent==='Wormbook'));
    assert.ok(walk(g).some(n=>n.tag==='textPath'&&n.textContent==='Wormbook'));
    assert.ok(walk(g).some(n=>Object.hasOwn(n.attrs,'data-book-plate')));
    for(let index=0;index<3;index++)for(const side of ['left','right'])g.append(bookPage(small,index,side));
    const nodes=walk(g),ids=nodes.filter(n=>n.attrs.id).map(n=>n.attrs.id);
    assert.equal(new Set(ids).size,ids.length);
    for(const n of nodes)for(const v of Object.values(n.attrs)){
      assert.ok(!/NaN|Infinity|undefined/.test(v));
      for(const m of v.matchAll(/url\(#([^)]*)\)/g))assert.ok(ids.includes(m[1]));
    }
    for(const n of nodes.filter(n=>n.tag==='textPath'))assert.ok(ids.includes(n.attrs.href.slice(1)));
  }
  assert.notEqual(...signatures);
  console.log('Claremont: distinct Wormbook drawings, page clips/hinges, liquid bounds, pouring/sipping phases, short quiet audio and integration checks pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});
