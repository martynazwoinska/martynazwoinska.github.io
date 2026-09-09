import {GINGER,RINSE,TOWEL,bathFamilies,add,p,e,part,C,faceCloth} from './kauai-bath-art.js?v=20260909-bath-2';
import {createBathSound} from './kauai-bath-audio.js?v=20260909-bath-2';
const clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x);};
const mix=(a,b,q)=>a+(b-a)*q;
export function bathFrame(kind,ms,reduced=false){
  if(reduced)return{done:ms>=700,lift:0,work:0,squeeze:0,flow:0,wipe:0,tangle:0,show:0};
  const end=kind==='ginger'?5100:kind==='rinse'?3700:3900;
  const work=ease((ms-1000)/240)*(1-ease((ms-(kind==='ginger'?2600:kind==='rinse'?2400:2800))/350));
  return{done:ms>=end,lift:ease(ms/850)*(1-ease((ms-(end-1100))/800)),work,
    squeeze:kind==='ginger'?Math.pow(Math.sin(clamp((ms-1050)/1600)*Math.PI*2),2)*work:0,
    flow:kind==='rinse'?ease((ms-1100)/100)*(1-ease((ms-2330)/170)):0,
    wipe:kind==='towel'?Math.sin((ms-1150)/170)*work:0,
    tangle:kind==='towel'?ease((ms-1700)/350)*(1-ease((ms-2600)/350)):0,
    show:ease(ms/220)*(1-ease((ms-(end-400))/350))};
}
function arm(g,male){
  const group=part(g,'arm'),skin=p(group,'','var(--worm-color)',C.ink,.65),shine=p(group,'','none','#fff4d955',male?.8:1.3);
  const hand=part(group,'hand');p(hand,'M-4 4Q-8 0-4-5L0-5Q3-7 5-3L6 3Q4 8-1 7Z',C.cream,C.ink,1);
  p(hand,'M-3 0Q-9-5-5-6L0-2M1-3L2 1M4-2L4 2','none','#ad9d8b',.8);
  return{group,skin,shine,hand,male};
}
function reach(a,from,to,opacity=1,bend=1){
  const dx=to.x-from.x,dy=to.y-from.y,len=Math.max(1,Math.hypot(dx,dy)),nx=-dy/len,ny=dx/len;
  const w=a.male?2:3.6,tip=a.male?.9:1.8;
  const x=mix(from.x,to.x,.52)+nx*Math.min(len*.2,24)*bend,y=mix(from.y,to.y,.52)+ny*Math.min(len*.2,24)*bend;
  a.skin.setAttribute('d',`M${from.x+nx*w} ${from.y+ny*w}Q${x+nx*w} ${y+ny*w} ${to.x+nx*tip} ${to.y+ny*tip}L${to.x-nx*tip} ${to.y-ny*tip}Q${x-nx*w} ${y-ny*w} ${from.x-nx*w} ${from.y-ny*w}Z`);
  a.shine.setAttribute('d',`M${from.x} ${from.y}Q${x} ${y} ${to.x} ${to.y}`);
  a.hand.setAttribute('transform',`translate(${to.x} ${to.y}) rotate(${Math.atan2(dy,dx)*180/Math.PI-90}) scale(${a.male?.55:.82})`);
  a.group.setAttribute('opacity',opacity);
}
export function createKauaiBath(habitat,refresh=()=>{}){
  const sound=createBathSound(),reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let run=null,raf=0,holdRaf=0,holdLayer=null,epoch=0;
  const handles=n=>bathFamilies.includes(n?.dataset.accessoryFamily);
  const piece=(family,male)=>habitat.querySelector(`.accessory-piece[data-accessory-family="${family}"][data-worm-part="${male?'companion':'primary'}"]`);
  const visible=n=>n?.isConnected&&!n.closest('[hidden]');
  const body=male=>habitat.querySelector(male?'.companion-body':'.worm-body');
  function stopHold(){cancelAnimationFrame(holdRaf);holdRaf=0;holdLayer?.remove();holdLayer=null;}
  function syncHold(){
    stopHold();if(document.hidden)return;
    const root=habitat.querySelector('#worm-species'),pair=[piece(GINGER,false),piece(GINGER,true)];
    if(!root||!pair.every(visible))return;
    holdLayer=add(root,'g',{'data-bath-hold':'','aria-hidden':'true','pointer-events':'none'});
    const arms=[arm(holdLayer,false),arm(holdLayer,true)];
    function tick(){
      if(document.hidden||!pair.every(visible)){stopHold();return;}
      const inv=root.getScreenCTM()?.inverse();if(!inv){stopHold();return;}
      const pt=(n,x,y)=>new DOMPoint(x,y).matrixTransform(inv.multiply(n.getScreenCTM()));
      pair.forEach((n,i)=>reach(arms[i],pt(body(!!i),i?288:272,125),pt(n.querySelector('.location-accessory-art'),i?-28:5,i?3:17),run?0:1,i?-1:1));
      holdRaf=requestAnimationFrame(tick);
    }
    tick();
  }
  function cancel(){
    epoch++;cancelAnimationFrame(raf);raf=0;sound.stop();
    if(!run)return;const old=run;run=null;
    for(const[n,attrs]of old.saved)for(const[k,v]of Object.entries(attrs))v===null?n.removeAttribute(k):n.setAttribute(k,v);
    const{node,next}=old.stack;if(node.isConnected)node.parentNode.insertBefore(node,next?.parentNode===node.parentNode?next:null);
    old.effects.remove();delete habitat.dataset.bathAction;refresh();
  }
  function clear(){cancel();stopHold();}
  function start(target){
    if(!handles(target)||!visible(target))return false;
    cancel();
    const root=habitat.querySelector('#worm-species'),male=target.dataset.wormPart==='companion';
    const family=target.dataset.accessoryFamily,kind=family===GINGER?'ginger':family===RINSE?'rinse':'towel';
    const selected=[piece(family,false),piece(family,true)];if(!selected.every(visible))return false;
    const effects=add(root,'g',{'data-bath-effects':'','aria-hidden':'true','pointer-events':'none'});
    const node=selected[0].parentNode,stack={node,next:node.nextSibling};
    // The used vessel moves in front of the wrap, then returns to its old layer.
    node.parentNode.appendChild(node);
    const action={saved:new Map(),effects,stack};run=action;habitat.dataset.bathAction=kind;
    const save=(n,key)=>{if(!n)return;const attrs=action.saved.get(n)||{};if(!(key in attrs))attrs[key]=n.getAttribute(key);action.saved.set(n,attrs);};
    const set=(n,key,value)=>{if(n){save(n,key);n.setAttribute(key,value);}};
    for(const n of habitat.querySelectorAll('.worm-body,.companion-body,.fitted-headwear-motion')){save(n,'style');n.style.animationPlayState='paused';}
    // Descendant motion must not shift the visitor's scale pivot.
    for(const n of selected){save(n,'style');const b=n.getBBox();n.style.transformBox='view-box';n.style.transformOrigin=`${b.x+b.width/2}px ${b.y+b.height/2}px`;}
    const point=(n,x,y)=>new DOMPoint(x,y).matrixTransform(root.getScreenCTM().inverse().multiply(n.getScreenCTM()));
    const bases=new Map();
    function prepare(n){if(n&&!bases.has(n))bases.set(n,root.getScreenCTM().inverse().multiply(n.getScreenCTM()));return n;}
    function pose(n,to,q,angle=0){
      if(!n)return;const base=bases.get(n),origin=new DOMPoint(0,0).matrixTransform(base);
      const matrix=new DOMMatrix().translate((to.x-origin.x)*q,(to.y-origin.y)*q).multiply(base).rotate(angle);
      const parent=n.parentNode.getScreenCTM().inverse().multiply(root.getScreenCTM());
      // WebKit-backed previews may return the legacy SVGMatrix type here.
      const local=new DOMMatrix([parent.a,parent.b,parent.c,parent.d,parent.e,parent.f]).multiply(matrix);
      set(n,'transform',`matrix(${[local.a,local.b,local.c,local.d,local.e,local.f].join(' ')})`);
    }
    const arts=selected.map(n=>n.querySelector('.location-accessory-art'));
    const arms=[arm(effects,false),arm(effects,true),arm(effects,false)];
    const stream=p(effects,'','none',C.water,2),streamLight=p(effects,'','none','#f2fff4',.75);
    const drops=Array.from({length:9},()=>e(effects,0,0,1.4,2.2,'#cbeef0','#76b2c2',.35));
    const ripple=e(effects,0,0,0,0,'none','#e5f9f5',1);stream.setAttribute('opacity',0);streamLight.setAttribute('opacity',0);
    let cone=null,jug=null,bowl=null,dipper=null,cloth=null,clothAt=null,flap=null;
    if(kind==='ginger'){prepare(arts[0]);prepare(arts[1]);cone=arts[0].querySelector('[data-bath-cone]');bowl=arts[1].querySelector('[data-bath-bowl-liquid]');}
    if(kind==='rinse'){jug=prepare(arts[0].querySelector('[data-bath-jug]'));dipper=prepare(arts[1].querySelector('[data-bath-dipper]'));}
    if(kind==='towel'){
      flap=arts[male?1:0].querySelector('[data-bath-towel-flap]');clothAt=point(flap,male?249:263,120);
      cloth=part(effects,'face-cloth');faceCloth(cloth,male);
    }
    const myBody=body(male),otherBody=body(!male),cues=new Set();
    // Decode before starting the first gesture's timeline, with a bounded silent fallback.
    const token=epoch,ready=reduced.matches?Promise.resolve():sound.unlock(kind==='towel'?'cloth':kind==='ginger'?'drip':'pour');
    ready.then(()=>{if(run!==action||token!==epoch)return;const began=performance.now();
      function cue(key,at,type,level,ms){if(cues.has(key)||ms<at)return;cues.add(key);if(!reduced.matches&&ms-at<100)sound.play(type,level,ms-at);}
      function tick(now){
        if(run!==action)return;if(document.hidden||!selected.every(visible)){cancel();return;}
        const ms=now-began,s=bathFrame(kind,ms,reduced.matches);
        if(s.done){cancel();return;}
        arms.forEach(a=>a.group.setAttribute('opacity',0));drops.forEach(d=>d.setAttribute('opacity',0));ripple.setAttribute('opacity',0);
        if(kind==='ginger'){
          const centre=point(body(false),165,94);
          pose(arts[0],{x:centre.x,y:centre.y-43},s.lift,26*s.lift);
          pose(arts[1],{x:centre.x-8,y:centre.y+24},s.lift);
          set(cone,'transform',`scale(${1-.09*s.squeeze} ${1+.025*s.squeeze})`);
          set(bowl,'opacity',.18+.7*ease((ms-1250)/1750));
          reach(arms[0],point(body(false),280,123),point(arts[0],18,3),s.show);
          reach(arms[2],point(body(false),264,132),point(arts[0],-18,4),s.show,-1);
          reach(arms[1],point(body(true),286,127),point(arts[1],-26,9),s.show,-1);
          const from=point(arts[0],0,28),to=point(arts[1],0,-2);
          for(let i=0;i<3;i++){const q=((ms-1100)/470+i*.31)%1;if(ms<1100||ms>2950)continue;const d=drops[i];d.setAttribute('cx',mix(from.x,to.x,q));d.setAttribute('cy',mix(from.y,to.y,q*q));d.setAttribute('rx',1.2);d.setAttribute('ry',2.8);d.setAttribute('opacity',s.work*.85);}
          ripple.setAttribute('cx',to.x);ripple.setAttribute('cy',to.y);ripple.setAttribute('rx',3+(ms%450)/45);ripple.setAttribute('ry',1+(ms%450)/180);ripple.setAttribute('opacity',s.work*.5);
          cue('squeeze-1',1200,'drip',.55,ms);cue('squeeze-2',2020,'drip',.48,ms);
        }else if(kind==='rinse'){
          // The larger worm rinses the male's crown. He returns the favour at
          // the nearer lower body curve, with a small dipper from his basin.
          const hit=point(otherBody,male?185:326,male?218:33);
          const vessel=male?dipper:jug,aim={x:hit.x+(male?22:47),y:hit.y-(male?34:43)};
          pose(vessel,aim,s.lift,(male?-62:-68)*s.work);
          const hand=male?arms[1]:arms[0];reach(hand,point(myBody,282,123),point(vessel,male?35:42,male?-3:-7),s.show,male?-1:1);
          const from=point(vessel,male?-18:-42,male?-2:-38);
          const d=`M${from.x} ${from.y}Q${mix(from.x,hit.x,.64)} ${from.y+9} ${hit.x} ${hit.y}`;
          stream.setAttribute('d',d);streamLight.setAttribute('d',d);stream.setAttribute('opacity',s.flow*.8);streamLight.setAttribute('opacity',s.flow*.8);
          for(let i=0;i<drops.length;i++){const q=((ms-1100)/430+i*.17)%1,d=drops[i];d.setAttribute('cx',hit.x+Math.sin(i*2.7)*q*(male?17:10));d.setAttribute('cy',hit.y+q*(male?22:17)-Math.sin(q*Math.PI)*5);d.setAttribute('rx',male?1.1:.75);d.setAttribute('ry',male?1.8:1.3);d.setAttribute('opacity',s.flow*(1-q)*.9);}
          cue('rinse',1100,'pour',male?.47:.62,ms);
        }else{
          set(flap,'opacity',1-s.lift);
          const face=point(myBody,330,65),scale=male?.52:.88;
          const x=mix(clothAt.x,face.x+(male?s.wipe*3:s.wipe*4),s.lift),y=mix(clothAt.y,face.y+(male?-10*s.tangle:s.wipe*2),s.lift);
          cloth.setAttribute('transform',`translate(${x} ${y}) rotate(${male?20*s.tangle:-14+s.wipe*7}) scale(${scale})`);cloth.setAttribute('opacity',s.show);
          reach(male?arms[1]:arms[0],point(myBody,285,121),point(cloth,12,10),s.show,male?-1:1);
          cue('cloth-1',1100,'cloth',.6,ms);cue('cloth-2',1900,'cloth',.45,ms);
        }
        raf=requestAnimationFrame(tick);
      }
      raf=requestAnimationFrame(tick);
    });return true;
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)clear();else syncHold();});
  window.addEventListener('pagehide',clear);window.addEventListener('resize',cancel);reduced.addEventListener('change',cancel);
  return{handles,start,cancel,clear,syncHold,reset:cancel,get active(){return !!run;}};
}
