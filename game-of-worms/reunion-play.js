import {LYCHEE,COAT,FLOWERS,add,p,e,part,C} from './reunion-art.js?v=20260909-reunion-2';
import {createReunionSound} from './reunion-audio.js?v=20260909-reunion-2';
const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clamp(x);return x*x*(3-2*x);},mix=(a,b,q)=>a+(b-a)*q;
export const lycheeBiteTime=male=>2790+(male?150:0);
export function lycheeFrame(ms,male=false,reduced=false){
  if(reduced)return{done:ms>=800,lift:0,peel:1,eat:0,bite:0,lower:0};
  const delay=male?150:0,t=ms-delay;
  return{done:ms>=5150,lift:ease(t/650)*(1-ease((t-3950)/650)),peel:ease((t-750)/1100),
    eat:ease((t-2000)/650)*(1-ease((t-3250)/700)),bite:ease((t-2790)/230),lower:ease((t-3900)/650)};
}
export function flowerFrame(ms,reduced=false){
  if(reduced)return{done:ms>=800,lift:0,travel:0,insert:1,adjust:0};
  return{done:ms>=5750,lift:ease(ms/600),travel:ease((ms-800)/1900),insert:ease((ms-2850)/700),
    adjust:ease((ms-3600)/300)*(1-ease((ms-4750)/400))};
}
function makeArm(g,male){
  const group=part(g,'arm'),skin=p(group,'','var(--worm-color)',C.ink,.65),light=p(group,'','none','#fff4cf88',male?.8:1.3);
  const hand=part(group,'hand');p(hand,'M-4 4Q-8 0-4-5L0-5Q3-7 5-3L6 3Q4 8-1 7Z',C.cream,C.ink,1);
  p(hand,'M-3 0Q-9-5-5-6L0-2M1-3L2 1M4-2L4 2','none','#b4a187',.8);
  return{group,skin,light,hand,male};
}
function reach(a,from,to,opacity=1){
  const dx=to.x-from.x,dy=to.y-from.y,len=Math.max(1,Math.hypot(dx,dy)),nx=-dy/len,ny=dx/len,w=a.male?2.3:4,tip=a.male?1.2:2;
  const x=mix(from.x,to.x,.52)+(a.bend||0)*Math.min(len*.24,18),y=mix(from.y,to.y,.5)+Math.min(len*.16,a.male?9:19);
  a.skin.setAttribute('d',`M${from.x+nx*w} ${from.y+ny*w}Q${x+nx*w} ${y+ny*w} ${to.x+nx*tip} ${to.y+ny*tip}L${to.x-nx*tip} ${to.y-ny*tip}Q${x-nx*w} ${y-ny*w} ${from.x-nx*w} ${from.y-ny*w}Z`);
  a.light.setAttribute('d',`M${from.x+nx*w*.3} ${from.y+ny*w*.3}Q${x} ${y} ${to.x} ${to.y}`);
  a.hand.setAttribute('transform',`translate(${to.x} ${to.y}) rotate(${Math.atan2(dy,dx)*180/Math.PI-90}) scale(${a.male?.54:.8})`);a.group.setAttribute('opacity',opacity);
}
export function createReunionPlay(habitat,refreshTargets=()=>{}){
  const sound=createReunionSound(),reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let run=null,raf=0,rainRaf=0,rainLayer=null,rainEpoch=0,rainOn=false,holdRaf=0,holdLayer=null;
  const handles=piece=>[LYCHEE,COAT,FLOWERS].includes(piece?.dataset.accessoryFamily);
  const coats=()=>[...habitat.querySelectorAll(`[data-accessory-family="${COAT}"]`)];
  function stopHold(){cancelAnimationFrame(holdRaf);holdRaf=0;holdLayer?.remove();holdLayer=null;}
  function syncHold(){
    stopHold();const root=habitat.querySelector('#worm-species');
    const pair=[...habitat.querySelectorAll(`.accessory-piece[data-accessory-family="${FLOWERS}"]`)];
    if(!root||document.hidden||!pair.length||pair.some(n=>n.closest('[hidden]')))return;
    holdLayer=add(root,'g',{'data-reunion-hold':'','aria-hidden':'true','pointer-events':'none'});
    const hands=pair.map(n=>({piece:n,male:n.dataset.wormPart==='companion',arm:makeArm(holdLayer,n.dataset.wormPart==='companion')}));
    hands.forEach(h=>{h.arm.bend=h.male?-1:1;});
    function hold(){
      if(document.hidden||pair.some(n=>!n.isConnected||n.closest('[hidden]'))){stopHold();return;}
      const inverse=root.getScreenCTM()?.inverse();if(!inverse){stopHold();return;}
      for(const h of hands){
        const body=habitat.querySelector(h.male?'.companion-body':'.worm-body');
        const target=h.piece.querySelector(h.male?'[data-re-offered]':'[data-re-bouquet]');
        const point=(n,x,y)=>new DOMPoint(x,y).matrixTransform(inverse.multiply(n.getScreenCTM()));
        const busy=habitat.dataset.reunionAction;
        reach(h.arm,point(body,h.male?289:278,h.male?122:130),point(target,0,h.male?55:12),(busy==='lychee'&&run?.male===h.male)||(h.male&&busy==='flowers')?0:1);
      }
      holdRaf=requestAnimationFrame(hold);
    }
    hold();
  }
  function cancel(){
    cancelAnimationFrame(raf);raf=0;sound.stopVoice();sound.duck(false);if(!run)return;
    const old=run;run=null;
    for(const[n,attrs]of old.saved)for(const[k,v]of Object.entries(attrs))v===null?n.removeAttribute(k):n.setAttribute(k,v);
    old.effects.remove();delete habitat.dataset.reunionAction;refreshTargets();
  }
  function stopRain(){
    rainEpoch++;rainOn=false;cancelAnimationFrame(rainRaf);rainRaf=0;sound.stopRain();rainLayer?.remove();rainLayer=null;
    habitat.querySelectorAll('[data-re-coat-drops]').forEach(n=>n.setAttribute('opacity',0));delete habitat.dataset.reunionRain;
  }
  function startRain(){
    stopRain();if(!coats().some(n=>!n.closest('[hidden]')))return;
    rainOn=true;habitat.dataset.reunionRain='on';const epoch=rainEpoch;
    rainLayer=add(habitat,'svg',{viewBox:'0 0 600 430','aria-hidden':'true','data-reunion-rain':'',preserveAspectRatio:'none',style:'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2;border-radius:inherit;overflow:hidden'});
    const drops=Array.from({length:56},(_,i)=>{
      const depth=i%3;return{n:p(rainLayer,`M0 0l${-1.5-depth*.6} ${5+depth*2.5}`,'none',depth?'#e0f5f2':'#adcfdc',depth?.9:.6),x:(i*113.7)%630,y:(i*79.3)%465,speed:85+depth*35};
    });
    const rings=Array.from({length:8},(_,i)=>e(rainLayer,45+i*69,338+(i%3)*23,2,1,'none','#d4ebe8',.8));
    habitat.querySelectorAll('[data-re-coat-drops]').forEach(n=>n.setAttribute('opacity',.7));
    if(!reduced.matches){
      sound.unlock('rain').then(ok=>{if(ok&&rainOn&&epoch===rainEpoch&&!document.hidden){sound.startRain();sound.duck(!!run);}});
      sound.unlock('coat').then(ok=>{if(ok&&rainOn&&epoch===rainEpoch&&!run&&!document.hidden)sound.play('coat',.35);});
    }
    const began=performance.now();
    function shower(now){
      if(!rainOn||epoch!==rainEpoch)return;
      if(document.hidden||!coats().some(n=>!n.closest('[hidden]'))){stopRain();return;}
      const t=reduced.matches?1:(now-began)/1000;
      for(const d of drops){const y=(d.y+t*d.speed)%470-20,x=d.x-(y+20)*.18;d.n.setAttribute('transform',`translate(${x} ${y})`);d.n.setAttribute('opacity',reduced.matches?.23:.30+(d.speed-85)/400);}
      rings.forEach((n,i)=>{const q=(t*.7+i*.17)%1;n.setAttribute('rx',2+q*6);n.setAttribute('ry',.6+q*1.8);n.setAttribute('opacity',reduced.matches?.2:(1-q)*.48);});
      if(!reduced.matches)rainRaf=requestAnimationFrame(shower);
    }
    shower(began);
  }
  function clear(){cancel();stopRain();}
  function syncCoats(accessory,show){
    if(accessory.querySelector(`[data-accessory-family="${COAT}"]`))show?startRain():stopRain();
    if(accessory.querySelector(`[data-accessory-family="${FLOWERS}"]`))syncHold();
  }
  function start(piece){
    if(!handles(piece)||!piece.isConnected||piece.closest('[hidden]'))return false;
    cancel();
    if(piece.dataset.accessoryFamily===COAT){rainOn?stopRain():startRain();return true;}
    const root=habitat.querySelector('#worm-species'),art=piece.querySelector('.location-accessory-art');if(!root||!art)return false;
    const kind=piece.dataset.accessoryFamily===LYCHEE?'lychee':'flowers',male=piece.dataset.wormPart==='companion';
    const effects=add(root,'g',{'data-reunion-effects':'','aria-hidden':'true','pointer-events':'none'});
    const action={saved:new Map(),effects,male};run=action;habitat.dataset.reunionAction=kind;sound.duck(true);
    const save=(n,keys)=>{if(n){const old=action.saved.get(n)||{};for(const k of keys)if(!(k in old))old[k]=n.getAttribute(k);action.saved.set(n,old);}return n;};
    const set=(n,k,v)=>{if(n){save(n,[k]);n.setAttribute(k,v);}};
    const original=(n,k)=>action.saved.get(n)?.[k]??n.getAttribute(k);
    const point=(n,x,y)=>new DOMPoint(x,y).matrixTransform(root.getScreenCTM().inverse().multiply(n.getScreenCTM()));
    const inside=(parent,n,x,y)=>new DOMPoint(x,y).matrixTransform(parent.getScreenCTM().inverse().multiply(n.getScreenCTM()));
    for(const n of habitat.querySelectorAll('.worm-body,.companion-body,.fitted-headwear-motion')){save(n,['style']);n.style.animationPlayState='paused';}
    // Pin transform origins while descendant bounds move. User sizes/positions stay intact.
    const pieces=kind==='flowers'?[...habitat.querySelectorAll(`.accessory-piece[data-accessory-family="${FLOWERS}"]`)]:[piece];
    for(const n of pieces){const b=n.getBBox();save(n,['style']);n.style.transformBox='view-box';n.style.transformOrigin=`${b.x+b.width/2}px ${b.y+b.height/2}px`;}
    const body=habitat.querySelector(male?'.companion-body':'.worm-body');
    const arms=[makeArm(effects,male),makeArm(effects,male)];
    const held=art.querySelector('[data-re-held-fruit]'),left=held?.querySelector('[data-re-shell-left]'),right=held?.querySelector('[data-re-shell-right]'),flesh=held?.querySelector('[data-re-flesh]');
    const mouth=inside(art,body,333,73),smile=save(body.querySelector('.worm-smile'),['d']);
    let clip=null,chew=null;
    if(kind==='lychee'){
      const id=male?'re-bite-m':'re-bite-h',mask=add(add(effects,'defs'),'mask',{id,maskUnits:'userSpaceOnUse',x:-40,y:-50,width:90,height:110});
      add(mask,'rect',{x:-40,y:-50,width:90,height:110,fill:'white'});clip=e(mask,0,-52,17,15,'black','none');set(flesh,'mask',`url(#${id})`);
      chew=add(effects,'path',{fill:'none',stroke:C.ink,'stroke-width':male?1:1.9,'stroke-linecap':'round',opacity:0});
    }
    const large=habitat.querySelector(`[data-accessory-family="${FLOWERS}"][data-worm-part="primary"] .location-accessory-art`);
    const small=habitat.querySelector(`[data-accessory-family="${FLOWERS}"][data-worm-part="companion"] .location-accessory-art`);
    const offered=small?.querySelector('[data-re-offered]'),received=large?.querySelector('[data-re-received]'),arrange=large?.querySelector('[data-re-arrange-stem]'),bouquet=large?.querySelector('[data-re-bouquet]');
    let transfer=null,transferBase=null,transferTarget=null,flowerArms=null;
    if(kind==='flowers'&&large&&small&&offered){
      transfer=offered.cloneNode(true);transfer.removeAttribute('transform');transfer.removeAttribute('data-re-offered');effects.appendChild(transfer);set(offered,'opacity',0);
      transferBase=root.getScreenCTM().inverse().multiply(offered.getScreenCTM());
      transferTarget=root.getScreenCTM().inverse().multiply(large.getScreenCTM()).translate(0,-78).scale(.85/.83);
      flowerArms=[makeArm(effects,false),makeArm(effects,true)];arms.forEach(a=>a.group.setAttribute('opacity',0));
    }
    const cues=new Set(),began=performance.now();let elapsed=0;
    if(!reduced.matches){sound.unlock(kind==='lychee'?'peel':'paper');if(kind==='lychee')sound.unlock('eat');}
    function cue(key,at,type,level){if(cues.has(key)||elapsed<at)return;cues.add(key);if(!reduced.matches&&elapsed-at<100)sound.play(type,level,elapsed-at);}
    function tick(now){
      if(run!==action)return;if(document.hidden||!piece.isConnected||piece.closest('[hidden]')){cancel();return;}
      const ms=elapsed=now-began,s=kind==='lychee'?lycheeFrame(ms,male,reduced.matches):flowerFrame(ms,reduced.matches);
      if(s.done){cancel();return;}
      if(kind==='lychee'){
        const x=mix(male?2:0,mouth.x,s.eat),y=mix(-3-20*s.lift,mouth.y+15,s.eat),angle=((male?13:-8)+(male&&!reduced.matches?Math.sin(ms/210)*9*(1-s.peel):0))*(1-s.eat);
        set(held,'transform',`translate(${x} ${y}) rotate(${angle})`);
        set(left,'transform',`translate(${-14*s.peel} ${11*s.peel}) rotate(${-52*s.peel} -12 20)`);
        set(right,'transform',`translate(${14*s.peel} ${11*s.peel}) rotate(${52*s.peel} 12 20)`);
        set(held.querySelector('[data-re-fruit-stem]'),'opacity',1-s.peel);
        const eatingMs=ms-(male?150:0);
        if(clip){clip.setAttribute('cy',-52+35*s.bite);clip.setAttribute('rx',17+12*ease((eatingMs-3100)/300));}
        set(flesh,'opacity',1-ease((eatingMs-3200)/230));set(art.querySelector('[data-re-seed]'),'opacity',ease((ms-4350)/200));
        const show=reduced.matches?1:ease(ms/250)*(1-ease((ms-4650)/350));
        reach(arms[0],point(body,296,116),point(left,-18,8),show);reach(arms[1],point(body,282,129),point(right,18,8),show);
        if(smile&&eatingMs>2800&&eatingMs<3500){set(smile,'d','M324 74Q332 79 340 73');const m=point(body,333,73);chew.setAttribute('d',`M${m.x-3} ${m.y+3}q3 ${Math.sin(ms/85)*2} 6 -1`);chew.setAttribute('opacity',.65);}else if(smile){set(smile,'d',original(smile,'d'));chew.setAttribute('opacity',0);}
        cue('peeling',900,'peel',.38);cue('peel-turn',1450,'peel',.27);
        cue('soft-bite',lycheeBiteTime(male),'eat',male?.48:.56);
      }else if(transfer&&flowerArms){
        const q=s.travel,arc=Math.sin(q*Math.PI),v=['a','b','c','d','e','f'].map(k=>mix(transferBase[k],transferTarget[k],q));
        v[5]-=16*s.lift*(1-s.insert)+24*arc;v[4]-=12*arc;
        transfer.setAttribute('transform',`matrix(${v.join(' ')})`);transfer.setAttribute('opacity',s.insert>.98?0:1);
        set(received,'opacity',s.insert>.98?1:0);
        set(arrange,'transform',`translate(16 -68) rotate(${18+Math.sin(ms/350)*7*s.adjust}) scale(.72)`);
        const turn=reduced.matches?0:Math.sin((ms-3550)/520)*9*s.adjust;
        set(bouquet,'transform',`rotate(${turn} 0 12)`);
        const paperLift=reduced.matches?0:ease((ms-200)/400)*(1-ease((ms-950)/450));
        set(small.querySelector('[data-re-paper-wrap]'),'transform',`rotate(${-9*paperLift} -7 50)`);
        const hbody=habitat.querySelector('.worm-body'),mbody=habitat.querySelector('.companion-body'),fade=ease(ms/250)*(1-ease((ms-5050)/500));
        // One hand supports the bouquet. The other takes and spaces the new stem.
        reach(flowerArms[1],point(mbody,295,116),point(transfer,0,55),fade*(1-ease((q-.4)/.24)));
        reach(flowerArms[0],point(hbody,287,123),s.insert>.98?point(arrange,0,53):point(transfer,0,52),fade*ease((q-.3)/.25));
        cue('paper-lift',370,'paper',.6);cue('paper-settle',1020,'paper',.32);
      }
      raf=requestAnimationFrame(tick);
    }
    raf=requestAnimationFrame(tick);return true;
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden){clear();stopHold();}else syncHold();});
  window.addEventListener('pagehide',()=>{clear();stopHold();});window.addEventListener('resize',clear);reduced.addEventListener('change',clear);
  return{handles,start,cancel,clear,reset:clear,syncCoats,syncHold,get active(){return !!run;},get raining(){return rainOn;}};
}
