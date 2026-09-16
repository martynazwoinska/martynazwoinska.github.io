const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
const url=f=>pathToFileURL(path.join(__dirname,'../game-of-worms',f));
(async()=>{
  const {potteryFrame,teaFrame}=await import(url('taipei-play.js'));
  const {clayProfile,apronPoint,teaStrawPoint,updateTea,drawTaipei,WHEEL,APRON,TEA}=await import(url('taipei-art.js'));
  for(const male of [false,true]){
    let previous;let wobble=0;
    for(let ms=0;ms<=4300;ms+=10){
      const p=potteryFrame(ms,male),t=teaFrame(ms,male);
      for(const value of [...Object.values(p),...Object.values(t)])assert(Number.isFinite(Number(value)));
      for(const value of [p.form,p.reach,t.lift,t.sip,t.pearl])assert(value>=0&&value<=1);
      if(previous)assert(Math.abs(p.form-previous.form)<.01,'Clay rises continuously');
      previous=p;wobble=Math.max(wobble,Math.abs(p.wobble));
      for(let variant=0;variant<3;variant++)assert(!/NaN|Infinity/.test(clayProfile(p.form,male,variant,p.wobble).d));
    }
    assert(male?wobble>5:wobble===0,'Only the male has a wobbling pot');
    assert.equal(potteryFrame(0,male).form,0);
    assert.equal(potteryFrame(4200,male).form,1);
    assert.equal(potteryFrame(4200,male).reach,0);
    assert.equal(teaFrame(4100,male).lift,0);
    assert.equal(teaFrame(1700,male).lift,1,'Straw stays at the mouth while sipping');
    assert.equal(new Set([0,1,2].map(v=>clayProfile(1,male,v).d)).size,3);
    assert.deepEqual(teaStrawPoint(0,male),{x:12,y:65});
    assert(Math.abs(teaStrawPoint(1,male).x-58)<1e-10);assert.equal(teaStrawPoint(1,male).y,male?-134:-158);
    const left=teaStrawPoint(.58-1e-6,male),right=teaStrawPoint(.58+1e-6,male);
    assert(Math.hypot(left.x-right.x,left.y-right.y)<.001,'Pearl follows a continuous straw path');
    for(const frame of [potteryFrame(350,male,true),teaFrame(350,male,true)])assert(frame.done);
    assert.equal(potteryFrame(100,male,true).wobble,0);assert.equal(teaFrame(100,male,true).lift,0);
  }
  for(const male of [false,true]){
    for(let y=0;y<=132;y+=2){
      const c=apronPoint(0,y,male),edge=apronPoint(22,y,male);
      assert(Math.abs(Math.hypot(c.x-edge.x,c.y-edge.y)-22*(male?.91:1))<1e-8,'Canvas remains within the body width');
    }
    for(const x of [-20,0,20]){
      const a=apronPoint(x,-1e-6,male),b=apronPoint(x,1e-6,male);
      assert(Math.hypot(a.x-b.x,a.y-b.y)<1e-4,'Neck straps meet the curved bib continuously');
    }
  }
  assert.deepEqual(apronPoint(0,0),{x:278,y:113});assert.deepEqual(apronPoint(0,132),{x:181,y:203});
  const element=tag=>({tag,attrs:{},children:[],setAttribute(k,v){this.attrs[k]=String(v);},appendChild(n){this.children.push(n);},
    replaceChildren(...n){this.children=n;},querySelectorAll(s){const key=s.slice(1,-1);return this.children.flatMap(n=>[...(key in n.attrs?[n]:[]),...n.querySelectorAll(s)]);},querySelector(s){return this.querySelectorAll(s)[0];}});
  global.document={createElementNS:(_,tag)=>element(tag)};
  for(const family of [WHEEL,APRON,TEA]){
    const a=element('g'),b=element('g');assert(drawTaipei(a,family,false));assert(drawTaipei(b,family,true));
    assert.notDeepEqual(a.children,b.children,'Paired objects use separate construction');
    if(family===TEA)for(const g of [a,b]){updateTea(g,false,.78);assert(Math.abs(Number(g.querySelector('[data-tea-liquid]').attrs.y)+12.9)<1e-9);updateTea(g,false,1);assert.equal(g.querySelector('[data-tea-liquid]').attrs.y,'-36');}
    const walk=n=>[n,...n.children.flatMap(walk)];
    for(const g of [a,b]){const nodes=walk(g),ids=nodes.map(n=>n.attrs.id).filter(Boolean);assert.equal(ids.length,new Set(ids).size);for(const n of nodes)for(const value of Object.values(n.attrs)){assert(!/NaN|Infinity|undefined/.test(value));for(const m of value.matchAll(/url\(#([^)]*)\)/g))assert(ids.includes(m[1]));}}
    if(family===WHEEL)for(const g of [a,b])assert.equal(g.querySelector('[data-clay-clip]').attrs.d,g.querySelector('[data-clay-wall]').attrs.d,'Details clipped to actual clay outline');
  }
  console.log('Taipei: continuous clay shaping, distinct paired pottery, aprons and tea cups, bounded sip and pearl motion, reduced motion, and contained clay details pass.');
})().catch(error=>{console.error(error);process.exitCode=1;});
