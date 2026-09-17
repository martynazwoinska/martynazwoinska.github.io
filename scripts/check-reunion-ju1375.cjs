const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
const url=f=>pathToFileURL(path.join(__dirname,'../game-of-worms',f));
(async()=>{
  const {reunionFrame,borderPoint,geckoTrip,geckoRoute,geckoPose,pressFrame}=await import(url('reunion-ju1375-play.js'));
  const {VINE,JUICE,GECKO,drawReunionJU1375,juiceLevel}=await import(url('reunion-ju1375-art.js'));
  for(const kind of [VINE,JUICE,GECKO])for(const male of [false,true]){
    let previous;
    for(let ms=0;ms<=4500;ms+=10){
      const f=reunionFrame(kind,ms,male);for(const [key,value] of Object.entries(f))assert(Number.isFinite(Number(value)),key);
      for(const key of ['reach','step','sip','stir'])assert(f[key]>=0&&f[key]<=1,key);
      if(previous)for(const key of ['reach','step','sip','stir'])assert(Math.abs(f[key]-previous[key])<.08,'Continuous '+key);
      previous=f;
    }
    assert(previous.done);assert.equal(previous.reach,0);assert.equal(previous.step,0);
    const reduced=reunionFrame(kind,350,male,true);assert(reduced.done);assert.equal(reduced.reach+reduced.step+reduced.sway+reduced.stir,0);
  }
  assert.equal(reunionFrame(JUICE,2200,false).reach,1,'Straw stays at the mouth throughout sipping');
  assert.equal(reunionFrame(JUICE,400,true).stir,0,'The male has a different drink action');
  const element=tag=>({tag,attrs:{},children:[],setAttribute(k,v){this.attrs[k]=String(v);},appendChild(n){this.children.push(n);},querySelectorAll(s){const key=s.slice(1,-1);return this.children.flatMap(n=>[...(key in n.attrs?[n]:[]),...n.querySelectorAll(s)]);},querySelector(s){return this.querySelectorAll(s)[0];}});
  global.document={createElementNS:(_,tag)=>element(tag)};
  const walk=n=>[n,...n.children.flatMap(walk)];
  for(const family of [VINE,JUICE,GECKO]){
    const a=element('g'),b=element('g');assert(drawReunionJU1375(a,family,false));assert(drawReunionJU1375(b,family,true));assert.notDeepEqual(a.children,b.children);
    for(const g of [a,b]){const nodes=walk(g),ids=nodes.map(n=>n.attrs.id).filter(Boolean);assert.equal(ids.length,new Set(ids).size);for(const n of nodes)for(const value of Object.values(n.attrs)){assert(!/NaN|undefined|Infinity/.test(value));for(const m of value.matchAll(/url\(#([^)]*)\)/g))assert(ids.includes(m[1]));}}
    if(family===GECKO)for(const g of [a,b])assert.equal(g.querySelectorAll('[data-gecko-foot]').length,4);
    if(family===JUICE)for(const [g,male] of [[b,true]]){let y=-Infinity;for(const fraction of [1,.8,.6,.4,.2]){juiceLevel(g,male,fraction);const next=+g.querySelector('[data-juice-fill]').attrs.y;assert(next>y);y=next;assert.equal(+g.querySelector('[data-juice-surface]').attrs.cy,next);}}
  }
  for(const [w,h] of [[360,245],[768,500],[1440,720]]){let prev;for(let q=0;q<=1;q+=.001){const p=borderPoint(q,w,h);assert(p.x>=24.99&&p.x<=w-24.99);assert(p.y>=24.99&&p.y<=h-24.99);if(prev)assert(Math.hypot(p.x-prev.x,p.y-prev.y)<5,'Continuous corner position');prev=p;}}
  // A complete excursion stays above both labels, walks nose-first and returns home.
  for(const [w,h] of [[345,247],[428,307],[600,430],[720,516]])for(const male of [false,true]){
    const scale=w/600*(male?.29:.36)*.92,radius=165*scale+8,labelTop=h-56,inset=Math.max(24,radius),bottomInset=h-labelTop+radius;
    const origin={x:w*(male?.28:.47),y:h*.55,angle:male?-52:-45};
    const route=geckoRoute(origin,w,h,inset,bottomInset,male);let previous,paused=0,done=false;
    for(let ms=0;ms<=180000;ms+=20){
      const f=geckoTrip(ms,male,route,scale),p=geckoPose(f,route,origin,male);
      assert(Number.isFinite(p.x+p.y+p.angle));
      if(f.phase==='border'||f.phase==='turn'){
        assert(p.y+radius<=labelTop+.01,'Entire gecko clears the label band');
        assert(p.x-radius>=-.01&&p.x+radius<=w+.01,'Tail remains inside scene');
      }
      if(previous){const distance=Math.hypot(p.x-previous.p.x,p.y-previous.p.y);
        assert(distance<=140*scale*.02+.02,'No fast entry, corner or return jump');
        if(distance<.0001)paused++;
      }
      previous={p,f};if(f.done){done=true;assert(Math.hypot(p.x-origin.x,p.y-origin.y)<.01);assert(ms>20000&&ms<100000,'Short finite outing');break;}
    }
    assert(done);assert(paused>100,'Feet settle and pause instead of continuous sliding');
  }
  // Departing from the male at the press still leads back to the saved home.
  const travellingOrigin={x:340,y:200,angle:15},savedHome={x:130,y:220,angle:-52};
  const homeRoute=geckoRoute(travellingOrigin,600,430,58,110,true,savedHome);
  const homePoint=homeRoute.home.samples.at(-1);
  assert.equal(homePoint.x,savedHome.x);assert.equal(homePoint.y,savedHome.y);
  const settled=geckoPose({phase:'settle',turn:1},homeRoute,travellingOrigin,true,savedHome);
  assert.equal(settled.x,savedHome.x);assert.equal(settled.y,savedHome.y);
  assert.equal(pressFrame(4500).press,1);assert.equal(pressFrame(4500).reach,0);assert.equal(pressFrame(350,true).angle,0);
  console.log('JU1375: distinct pairs, four articulated feet, valid SVG clips, slow label-safe gecko outings, continuous bounded actions, sip contact and reduced motion pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});
