import {GINGER,RINSE,TOWEL,bathFamilies,add,p,e,part,C,faceCloth} from './kauai-bath-art.js?v=20260909-bath-2';
import {createBathSound} from './kauai-bath-audio.js?v=20260909-bath-pour-1';
const clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x);};
const mix=(a,b,q)=>a+(b-a)*q;
export function bathFrame(kind,ms,reduced=false,male=false){
  if(reduced)return{done:ms>=700,lift:0,work:0,squeeze:0,flow:0,wipe:0,tangle:0,show:0};
  if(kind==='rinse'){
    const stop=male?2820:3170,end=stop+1300;
    return{done:ms>=end,lift:ease(ms/850)*(1-ease((ms-(stop+250))/850)),
      work:ease((ms-880)/390)*(1-ease((ms-(stop-180))/380)),squeeze:0,
      flow:ease((ms-1240)/140)*(1-ease((ms-(stop-180))/180)),
      wipe:0,tangle:0,show:ease(ms/220)*(1-ease((ms-(end-400))/350))};
  }
  const end=kind==='ginger'?5100:3900;
  const work=ease((ms-1000)/240)*(1-ease((ms-(kind==='ginger'?2600:2800))/350));
  return{done:ms>=end,lift:ease(ms/850)*(1-ease((ms-(end-1100))/800)),work,
    squeeze:kind==='ginger'?Math.sin(clamp((ms-1100)/640)*Math.PI)**2+Math.sin(clamp((ms-2060)/640)*Math.PI)**2:0,
    flow:0,
    wipe:kind==='towel'?Math.sin((ms-1150)/170)*work:0,
    tangle:kind==='towel'?ease((ms-1700)/350)*(1-ease((ms-2600)/350)):0,
    show:ease(ms/220)*(1-ease((ms-(end-400))/350))};
}
export function bathPourAim(base,hit,male){
  // Place the lip, not the vessel centre, above the recipient at any user size.
  const angle=(male?-103:-96)*Math.PI/180,lx=male?-18:-42,ly=male?-2:-38;
  const x=lx*Math.cos(angle)-ly*Math.sin(angle),y=lx*Math.sin(angle)+ly*Math.cos(angle);
  return{x:hit.x+(male?16:20)-(base.a*x+base.c*y),y:hit.y-(male?40:44)-(base.b*x+base.d*y)};
}
export function bathPourGeometry(from,to,width){
  // A down-curving stream, slightly widening as it breaks onto the skin.
  const cy=from.y+(to.y-from.y)*.18,w=width/2;
  return{
    ribbon:`M${from.x-w*.5} ${from.y}Q${to.x-w} ${cy} ${to.x-w*1.4} ${to.y}L${to.x+w*1.4} ${to.y}Q${to.x+w} ${cy} ${from.x+w*.5} ${from.y}Z`,
    core:`M${from.x} ${from.y}Q${to.x} ${cy} ${to.x} ${to.y}`
  };
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
    const stream=p(effects,'',C.water,'#72abbc',.65),streamLight=p(effects,'','none','#f2fff4',1.1);
    const drops=Array.from({length:15},()=>e(effects,0,0,1.4,2.2,'#cbeef0','#76b2c2',.35));
    const runoff=Array.from({length:3},()=>p(effects,'','none','#d3f4f4',1.5));
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
    const token=epoch,ready=reduced.matches?Promise.resolve():sound.unlock(kind==='towel'?'cloth':kind==='ginger'?'squeeze':male?'scoop':'pour');
    ready.then(()=>{if(run!==action||token!==epoch)return;const began=performance.now();
      function cue(key,at,type,level,ms){if(cues.has(key)||ms<at)return;cues.add(key);if(!reduced.matches&&ms-at<100)sound.play(type,level,ms-at);}
      function tick(now){
        if(run!==action)return;if(document.hidden||!selected.every(visible)){cancel();return;}
        const ms=now-began,s=bathFrame(kind,ms,reduced.matches,male);
        if(s.done){cancel();return;}
        arms.forEach(a=>a.group.setAttribute('opacity',0));drops.forEach(d=>d.setAttribute('opacity',0));runoff.forEach(d=>d.setAttribute('opacity',0));ripple.setAttribute('opacity',0);
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
          cue('squeeze-1',1100,'squeeze',.72,ms);cue('squeeze-2',2060,'squeeze',.66,ms);
        }else if(kind==='rinse'){
          // The larger worm rinses the male's crown. He returns the favour at
          // the nearer lower body curve, with a small dipper from his basin.
          const hit=point(otherBody,male?185:326,male?218:33);
          const vessel=male?dipper:jug,aim=bathPourAim(bases.get(vessel),hit,male);
          pose(vessel,aim,s.lift,(male?-103:-96)*s.work);
          const hand=male?arms[1]:arms[0];reach(hand,point(myBody,282,123),point(vessel,male?35:42,male?-3:-7),s.show,male?-1:1);
          if(!male)reach(arms[2],point(myBody,265,133),point(vessel,12,43),s.show,-1);
          const from=point(vessel,male?-18:-42,male?-2:-38);
          const water=bathPourGeometry(from,hit,(male?3.8:5.2)*(.84+.16*Math.sin(ms/71)**2));
          stream.setAttribute('d',water.ribbon);streamLight.setAttribute('d',water.core);
          stream.setAttribute('opacity',s.flow*.76);streamLight.setAttribute('opacity',s.flow*.85);
          const last=male?2820:3170,tail=ease((ms-1340)/140)*(1-ease((ms-last)/390));
          for(let i=0;i<drops.length;i++){
            const q=((ms-1340)/620+i*.137)%1,d=drops[i];if(q<0)continue;
            const vx=Math.sin(i*2.4)*(male?24:18),vy=9+(i%4)*2;
            d.setAttribute('cx',hit.x+vx*q);d.setAttribute('cy',hit.y-vy*4*q*(1-q)+q*q*29);
            d.setAttribute('rx',.9+(i%3)*.26);d.setAttribute('ry',1.4+q*1.6);
            d.setAttribute('opacity',tail*(1-q)*.88);
          }
          runoff.forEach((n,i)=>{
            const shift=(i-1)*3,y=hit.y+3,x=hit.x+shift,len=male?29:20;
            n.setAttribute('d',`M${x} ${y}Q${x+5+shift} ${y+len*.35} ${x+shift*.7} ${y+len}`);
            n.setAttribute('opacity',tail*(.24+i*.1));
          });
          cue('rinse',1280,male?'scoop':'pour',male?.72:.82,ms);
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
