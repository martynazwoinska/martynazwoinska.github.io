import {createOahuBike} from './oahu-bike-play.js?v=20260909-bike-2';
import {TASTING} from './oahu-chocolate-art.js?v=20260909-chocolate-2';
import {add,path,C} from './oahu-bike-art.js?v=20260909-bike-1';
import {createChocolateSound} from './oahu-chocolate-audio.js?v=20260909-gift-3';
import {createOahuGifts} from './oahu-gift-play.js?v=20260909-gift-3';
const clamp=x=>Math.max(0,Math.min(1,x)),mix=(a,b,q)=>a+(b-a)*q;
const ease=x=>{x=clamp(x);return x*x*(3-2*x);};
export function chocolateFrame(ms,reduced=false){
  if(reduced)return{done:ms>=650,reach:0,eat:0,chew:0};
  return {done:ms>=3300,
    reach:ease(ms/550)*(1-ease((ms-2600)/650)),
    eat:ease((ms-850)/950),
    chew:ms>1800&&ms<2450?Math.sin((ms-1800)/100)*.5+.5:0};
}
function arm(g,male){
  const n=add(g,'g',{'data-choc-arm':''}),skin=path(n,'','var(--worm-color)',C.ink,.7),hand=add(n,'g');
  path(hand,'M-4 4Q-8 0-5-4L0-5Q4-6 6-2L6 3Q2 7-4 4Z','#fff1d7',C.ink,.8);
  path(hand,'M-3 0Q-7-4-4-6L0-2M2-3L3 0','none','#bda587',.7);return{n,skin,hand,male};
}
function setArm(a,from,to,q){
  const dx=to.x-from.x,dy=to.y-from.y,len=Math.max(1,Math.hypot(dx,dy)),nx=-dy/len,ny=dx/len,w=a.male?2:3.5;
  const ex=mix(from.x,to.x,.5)-4,ey=mix(from.y,to.y,.5)+Math.min(13,len*.16);
  a.skin.setAttribute('d',`M${from.x+nx*w} ${from.y+ny*w}Q${ex+nx*w} ${ey+ny*w} ${to.x+nx} ${to.y+ny}L${to.x-nx} ${to.y-ny}Q${ex-nx*w} ${ey-ny*w} ${from.x-nx*w} ${from.y-ny*w}Z`);
  a.hand.setAttribute('transform',`translate(${to.x} ${to.y}) rotate(${Math.atan2(dy,dx)*180/Math.PI-90}) scale(${a.male?.58:.8})`);a.n.setAttribute('opacity',q);
}
export function createOahuChocolate(habitat,refresh=()=>{}){
  const bike=createOahuBike(habitat,refresh),gifts=createOahuGifts(habitat,refresh),reduced=window.matchMedia('(prefers-reduced-motion: reduce)'),sound=createChocolateSound();
  let run=null,raf=0;
  const handles=p=>gifts.handles(p)||bike.handles(p)||p?.dataset.accessoryFamily===TASTING;
  function cancel(){
    gifts.cancel();bike.cancel();cancelAnimationFrame(raf);raf=0;sound.stop();if(!run)return;
    const r=run;run=null;
    for(const[n,attrs]of r.saved)for(const[k,v]of Object.entries(attrs))v===null?n.removeAttribute(k):n.setAttribute(k,v);
    r.effects.remove();delete habitat.dataset.oahuChocolate;refresh();
  }
  function start(piece){
    if(!handles(piece)||!piece.isConnected||piece.closest('[hidden]'))return false;
    if(gifts.handles(piece)){if(run||bike.active)cancel();return gifts.start(piece);}
    if(gifts.active)gifts.cancel();
    if(run?.piece===piece){cancel();return true;}
    if(bike.handles(piece)){if(run)cancel();return bike.start(piece);}
    cancel();
    const root=habitat.querySelector('#worm-species'),art=piece.querySelector('[data-chocolate-art]');if(!root||!art)return false;
    const male=piece.dataset.wormPart==='companion',kind='taste';
    const body=habitat.querySelector(male?'.companion-body':'.worm-body');
    const effects=add(root,'g',{'data-oahu-chocolate-effects':'','aria-hidden':'true','pointer-events':'none'});
    const r={piece,effects,saved:new Map()};run=r;habitat.dataset.oahuChocolate=kind;
    const save=(n,keys)=>{if(n&&!r.saved.has(n))r.saved.set(n,Object.fromEntries(keys.map(k=>[k,n.getAttribute(k)])));return n;};
    const matrix=n=>{const m=root.getScreenCTM().inverse().multiply(n.getScreenCTM());return new DOMMatrix([m.a,m.b,m.c,m.d,m.e,m.f]);};
    const point=(n,x,y)=>new DOMPoint(x,y).matrixTransform(matrix(n));
    save(body,['style']);body.style.animationPlayState='paused';
    if(!reduced.matches)for(const n of habitat.querySelectorAll('.accessory-piece'))if(n!==piece){save(n,['style']);n.style.opacity='0';n.style.pointerEvents='none';}
    save(art,['transform']);
    const face=body.querySelector('.worm-smile');save(face,['d']);
    const reachArm=arm(effects,male),part=name=>art.querySelector(`[data-choc-part="${name}"]`);
    const bite=part('bite'),cut=part('cut'),bar=part('bar'),wrapper=part('wrapper');
    [bite,cut,bar,wrapper].filter(Boolean).forEach(n=>save(n,['transform','opacity','style']));
    // Front overlay makes hands and moving food readable above the worm.
    const moving=bite;
    const copy=add(effects,'g',{transform:matrix(moving).toString()}),clone=moving.cloneNode(true);
    clone.removeAttribute('transform');clone.setAttribute('opacity','1');copy.appendChild(clone);moving.style.visibility='hidden';
    effects.appendChild(reachArm.n);
    const from=matrix(moving),mouth=point(body,331,75),shoulder=point(body,291,111);
    const centre=male?{x:0,y:0}:{x:13,y:10};
    const biteFrom=new DOMPoint(centre.x,centre.y).matrixTransform(from);
    const begun=performance.now();let rustled=false,bitten=false;
    if(!reduced.matches)sound.unlock(male);
    function tick(now){
      if(run!==r)return;
      if(document.hidden||!piece.isConnected||piece.closest('[hidden]')){cancel();return;}
      const ms=now-begun,s=chocolateFrame(ms,reduced.matches);
      if(s.done){
        cancel();
        bite.setAttribute('opacity','0');cut.setAttribute('opacity','1');
        return;
      }
      if(reduced.matches){copy.setAttribute('opacity','0');reachArm.n.setAttribute('opacity','0');}
      else{
        if(!rustled&&ms>=430){rustled=true;if(!male)sound.play('paper',male,ms-430);}
        if(!bitten&&ms>=1810){bitten=true;sound.play('bite',male,ms-1810);}
        if(wrapper)wrapper.setAttribute('transform',`translate(0 ${2*Math.sin(clamp((ms-380)/450)*Math.PI)})`);
        // Follow a shallow arc, centre the piece at the mouth, then take the bite.
        const q=s.eat,dx=(mouth.x-biteFrom.x)*q,dy=(mouth.y-biteFrom.y)*q-Math.sin(q*Math.PI)*(male?10:18);
        const shrink=1-ease((ms-1810)/320);
        copy.setAttribute('transform',`translate(${dx} ${dy}) ${from.toString()}`);
        clone.setAttribute('transform',`translate(${centre.x} ${centre.y}) scale(${Math.max(.01,shrink)}) translate(${-centre.x} ${-centre.y})`);
        copy.setAttribute('opacity',ms<2100?1:0);
        cut.setAttribute('opacity',ease((ms-850)/250));
        const grip={x:biteFrom.x+dx,y:biteFrom.y+dy+3};
        setArm(reachArm,shoulder,grip,s.reach*(1-ease((ms-2320)/420)));
        if(face)face.setAttribute('d',ms>1600&&ms<2450?`M322 72Q330 ${85+5*s.chew} 340 72Q331 ${77+2*s.chew} 322 72`:r.saved.get(face).d);
      }
      raf=requestAnimationFrame(tick);
    }
    raf=requestAnimationFrame(tick);return true;
  }
  function reset(){
    cancel();bike.reset();gifts.reset();
    habitat.querySelectorAll('[data-chocolate-art]').forEach(art=>{
      art.querySelector('[data-choc-part="bite"]')?.setAttribute('opacity','1');
      art.querySelector('[data-choc-part="cut"]')?.setAttribute('opacity','0');
    });
  }
  for(const event of['pagehide','resize'])window.addEventListener(event,cancel);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});reduced.addEventListener('change',cancel);
  return{handles,start,cancel,clear:cancel,reset,get active(){return!!run||bike.active||gifts.active;}};
}
