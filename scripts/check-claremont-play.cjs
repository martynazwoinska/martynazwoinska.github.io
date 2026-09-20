const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
(async()=>{
  const root=path.resolve(__dirname,'..');
  const art=fs.readFileSync(path.join(root,'game-of-worms/claremont-book-art.js'),'utf8');
  const artUrl='data:text/javascript;base64,'+Buffer.from(art).toString('base64');
  const source=fs.readFileSync(path.join(root,'game-of-worms/claremont-play.js'),'utf8').replace(/\.\/claremont-book-art\.js\?v=[^']+/,artUrl);
  const {leafPose,pourFrame,sipFrame,soundProfile,lemonadeLevels,waterPolygon,createReadingSound,nextBookPage,pageDuration}=await import(pathToFileURL(path.join(root,'game-of-worms/claremont-play.js')));
  assert.deepEqual([0,1,2,3].map(n=>nextBookPage(n)),[1,2,3,0]);
  assert.deepEqual([0,1,2,3].map(n=>nextBookPage(n,true)),[1,2,3,0]);
  assert.ok(pageDuration(true,true)>pageDuration(true,false));
  for(const y of [-82,0,91]){const x=-73+.062*y;assert.ok(Math.abs((-x+.124*y-146)-x)<1e-10);}
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
  assert.ok(soundProfile('paper').duration<.5&&soundProfile('paper').volume<.05);
  assert.ok(soundProfile('slurp').duration<.3);
  for(let ms=0;ms<=3200;ms+=10)for(const key of ['approach','tilt','fill','returning'])assert.ok(pourFrame(ms)[key]>=0&&pourFrame(ms)[key]<=1);
  const {readingFrame,readingPoint,companionReadingPose,READING_DURATION,PAGE_DELAY}=await import(pathToFileURL(path.join(root,'game-of-worms/claremont-reading.js')));
  for(let ms=0;ms<=READING_DURATION;ms+=10){
    const f=readingFrame(ms),pose=companionReadingPose(30,92,f.companion.lean,f.companion.sleep);
    assert(pose.y<=32,'Male stays behind the book even when dozing');
    assert(pose.angle<=14,'Male does not fold onto the page');
  }
  const asleep=readingFrame(READING_DURATION);
  assert.equal(asleep.companion.sleep,1,'The male stays asleep between page turns');
  assert.equal(asleep.hand,0,'Hands rest after turning');
  assert.equal(readingFrame(0,asleep).companion.sleep,1,'Next page starts from the held doze');
  assert(readingFrame(PAGE_DELAY+450,asleep).companion.sleep<.05,'Paper rustle wakes the male');
  assert(readingFrame(2500).companion.sleep===0,'Peeking comes before sleep');
  assert(readingFrame(5000).companion.sleep>.7,'Drowsiness develops gradually');
  for(let ms=0;ms<=READING_DURATION;ms+=10){
    const f=readingFrame(ms),pose={x:-55*f.primary.lean,y:92*f.primary.lean,angle:15*f.primary.lean};
    assert.deepEqual(readingPoint(78,228,pose),{x:78,y:228},'Tail remains planted');
    assert(f.companion.sleep>=0&&f.companion.sleep<=1);
    const previous=readingFrame(Math.max(0,ms-10));
    assert(Math.abs(f.companion.sleep-previous.companion.sleep)<.02,'No head snap into sleep');
  }
  const after=readingPoint(329,65,{x:-55,y:92,angle:15});assert.deepEqual(after,{x:274,y:157},'Head reaches a visible reading pose');
  for(const file of ['nambucca-paper-slide.wav','araucania-straw-sip.wav','kauai-bath-pour-v2.wav'])assert(fs.existsSync(path.join(root,'game-of-worms/assets/audio',file)));
  global.document={hidden:false};
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
  const {drawWormbook,bookPage,SPREADS,SMALL_SPREADS,SMALL_REFLECTION}=await import(artUrl),walk=n=>[n,...n.children.flatMap(walk)];
  assert.equal(new Set(SPREADS.flat()).size,8);
  assert.equal(SMALL_REFLECTION,'matrix(-1 0 .124 1 -146 0)');
  assert.equal(bookPage(false,0,'right').attrs['data-page-subject'],'title','Title opens on the reader left, viewer right');
  assert.equal(bookPage(false,3,'left').attrs['data-page-subject'],'sharing');
  assert.equal(bookPage(true,3,'left').attrs['data-page-subject'],'dream');
  assert.equal(SMALL_SPREADS.length,SPREADS.length);
  assert.equal(SMALL_SPREADS.flat().filter(s=>SPREADS.flat().includes(s)).length,1,'Only the title is shared between the two stories');
  const signatures=[];
  for(const small of [true,false]){
    const g=new Element('g');drawWormbook(g,small);signatures.push(JSON.stringify(g));
    assert.ok(walk(g).some(n=>n.textContent==='Wormbook'));
    assert.ok(walk(g).some(n=>n.tag==='textPath'&&n.textContent==='Wormbook'));
    assert.ok(walk(g).some(n=>Object.hasOwn(n.attrs,'data-book-plate')));
    assert.ok(walk(g).some(n=>Object.hasOwn(n.attrs,'data-book-plane')));
    assert.equal(walk(g).filter(n=>Object.hasOwn(n.attrs,'data-reader-facing')).length,2,'Both pages face the reader from the start');
    for(let index=0;index<4;index++)for(const side of ['left','right'])g.append(bookPage(small,index,side));
    const nodes=walk(g),ids=nodes.filter(n=>n.attrs.id).map(n=>n.attrs.id);
    assert.equal(new Set(ids).size,ids.length);
    for(const n of nodes)for(const v of Object.values(n.attrs)){
      assert.ok(!/NaN|Infinity|undefined/.test(v));
      for(const m of v.matchAll(/url\(#([^)]*)\)/g))assert.ok(ids.includes(m[1]));
    }
    for(const n of nodes.filter(n=>n.tag==='textPath'))assert.ok(ids.includes(n.attrs.href.slice(1)));
  }
  assert.notEqual(...signatures);
  console.log('Claremont: distinct Wormbook drawings, page clips/hinges, liquid bounds, pouring/sipping phases, recorded sound cues, reading/dozing/waking continuity, planted tails and integration checks pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});
