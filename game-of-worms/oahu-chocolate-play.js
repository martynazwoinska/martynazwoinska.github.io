import {createOahuBike} from './oahu-bike-play.js?v=20260909-bike-1';
import {MOULDS,TASTING} from './oahu-chocolate-art.js?v=20260909-chocolate-1';
import {add,path,C} from './oahu-bike-art.js?v=20260909-bike-1';
import {createNambuccaSound} from './nambucca-audio.js?v=20260908-nambucca-recorded';
const clamp=x=>Math.max(0,Math.min(1,x)),mix=(a,b,q)=>a+(b-a)*q;
const ease=x=>{x=clamp(x);return x*x*(3-2*x);};
export function chocolateFrame(ms,kind,male=false,reduced=false){
  if(reduced)return{done:ms>=650,reach:0,work:0,fill:1,eat:0,chew:0};
  const tasting=kind==='taste';
  return {done:ms>=(tasting?3300:4100),
    reach:ease(ms/550)*(1-ease((ms-(tasting?2600:3350))/650)),
    work:ease((ms-650)/650)*(1-ease((ms-2750)/450)),
    fill:ease((ms-1250)/1300),
    eat:tasting?ease((ms-850)/950):0,
    chew:tasting&&ms>1800&&ms<2450?Math.sin((ms-1800)/100)*.5+.5:0};
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
  const bike=createOahuBike(habitat,refresh),reduced=window.matchMedia('(prefers-reduced-motion: reduce)'),sound=createNambuccaSound();
  let run=null,raf=0;
  const handles=p=>bike.handles(p)||[MOULDS,TASTING].includes(p?.dataset.accessoryFamily);
  function cancel(){
    bike.cancel();cancelAnimationFrame(raf);raf=0;sound.stop();if(!run)return;
    const r=run;run=null;
    for(const[n,attrs]of r.saved)for(const[k,v]of Object.entries(attrs))v===null?n.removeAttribute(k):n.setAttribute(k,v);
    r.effects.remove();delete habitat.dataset.oahuChocolate;refresh();
  }
  function start(piece){
    if(!handles(piece)||!piece.isConnected||piece.closest('[hidden]'))return false;
    if(run?.piece===piece){cancel();return true;}
    if(bike.handles(piece)){if(run)cancel();return bike.start(piece);}
    cancel();
    const root=habitat.querySelector('#worm-species'),art=piece.querySelector('[data-chocolate-art]');if(!root||!art)return false;
    const male=piece.dataset.wormPart==='companion',kind=piece.dataset.accessoryFamily===TASTING?'taste':'mould';
    const body=habitat.querySelector(male?'.companion-body':'.worm-body');
    const effects=add(root,'g',{'data-oahu-chocolate-effects':'','aria-hidden':'true','pointer-events':'none'});
    const r={piece,effects,saved:new Map()};run=r;habitat.dataset.oahuChocolate=kind;
    const save=(n,keys)=>{if(n&&!r.saved.has(n))r.saved.set(n,Object.fromEntries(keys.map(k=>[k,n.getAttribute(k)])));return n;};
    const matrix=n=>{const m=root.getScreenCTM().inverse().multiply(n.getScreenCTM());return new DOMMatrix([m.a,m.b,m.c,m.d,m.e,m.f]);};
    const point=(n,x,y)=>new DOMPoint(x,y).matrixTransform(matrix(n));
    save(body,['style']);body.style.animationPlayState='paused';
    if(!reduced.matches)for(const n of habitat.querySelectorAll('.accessory-piece'))if(n!==piece){save(n,['style']);n.style.opacity='0';}
    save(art,['transform']);
    const face=body.querySelector('.worm-smile');save(face,['d']);
    const reachArm=arm(effects,male),supportArm=kind==='mould'?arm(effects,male):null,part=name=>art.querySelector(`[data-choc-part="${name}"]`);
    const fills=[...art.querySelectorAll('[data-choc-part="fill"]')];fills.forEach(n=>save(n,['opacity']));
    const bite=part('bite'),cut=part('cut'),tool=part('tool'),stream=part('stream'),bar=part('bar'),wrapper=part('wrapper');
    [bite,cut,tool,stream,bar,wrapper].filter(Boolean).forEach(n=>save(n,['transform','opacity','style']));
    // Front overlay makes hands and moving food readable above the worm.
    const moving=kind==='taste'?bite:tool;
    const copy=add(effects,'g',{transform:matrix(moving).toString()}),clone=moving.cloneNode(true);
    clone.removeAttribute('transform');clone.setAttribute('opacity','1');copy.appendChild(clone);moving.style.visibility='hidden';
    effects.appendChild(reachArm.n);if(supportArm)effects.appendChild(supportArm.n);
    const from=matrix(moving),mouth=point(body,331,75),shoulder=point(body,291,111);
    const near=new DOMPoint(shoulder.x+(male?-17:35),shoulder.y+(male?30:45)).matrixTransform(matrix(art).inverse());
    const centre=kind==='taste'?(male?{x:0,y:0}:{x:13,y:10}):{x:0,y:0};
    const biteFrom=new DOMPoint(centre.x,centre.y).matrixTransform(from);
    const begun=performance.now();let rustled=false;
    if(!reduced.matches&&kind==='taste')sound.unlock('press');
    function tick(now){
      if(run!==r)return;
      if(document.hidden||!piece.isConnected||piece.closest('[hidden]')){cancel();return;}
      const ms=now-begun,s=chocolateFrame(ms,kind,male,reduced.matches);
      if(s.done){
        cancel();
        if(kind==='mould')fills.forEach(n=>n.setAttribute('opacity','1'));
        else{bite.setAttribute('opacity','0');cut.setAttribute('opacity','1');}
        return;
      }
      if(reduced.matches){copy.setAttribute('opacity','0');reachArm.n.setAttribute('opacity','0');supportArm?.n.setAttribute('opacity','0');}
      else if(kind==='taste'){
        if(!rustled&&ms>=430){rustled=true;if(!male)sound.play('paper',0,.55,ms-430);}
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
      }else{
        art.setAttribute('transform',`translate(${near.x*s.reach} ${near.y*s.reach})`);
        // Bowl tips towards the mould. The male draws the scraper flush across it.
        const m=matrix(art),work=s.work;
        const x=male?2+35*ease((ms-1050)/1600):mix(-23,-8,work);
        const y=male?mix(-21,12,work):mix(-45,-30,work);
        const angle=male?mix(-14,7,work):mix(-9,28,work);
        const placement=new DOMMatrix().translate(x,y).rotate(angle);
        copy.setAttribute('transform',m.multiply(placement).toString());
        const handAt=new DOMPoint(male?0:-22,male?-8:6).matrixTransform(m.multiply(placement));
        setArm(reachArm,shoulder,handAt,s.reach);
        setArm(supportArm,point(body,276,122),point(art,-45,37),s.reach);
        fills.forEach((n,i)=>n.setAttribute('opacity',mix(male?.55:.17,1,ease((s.fill-i*.07)/.65))));
        if(!male){
          const lip=new DOMPoint(36,-3).matrixTransform(placement),flow=ms>1300&&ms<2710;
          stream.setAttribute('opacity',flow?ease((ms-1300)/180)*(1-ease((ms-2520)/190)):0);
          stream.firstElementChild.setAttribute('d',`M${lip.x} ${lip.y}Q${lip.x+2} 3 6 18L2 17Q${lip.x-2} 1 ${lip.x-3} ${lip.y}Z`);
        }
      }
      raf=requestAnimationFrame(tick);
    }
    raf=requestAnimationFrame(tick);return true;
  }
  function reset(){
    cancel();bike.reset();
    habitat.querySelectorAll('[data-chocolate-art]').forEach(art=>{
      art.querySelectorAll('[data-choc-part="fill"]').forEach(n=>n.setAttribute('opacity',art.dataset.chocolateArt==='male'?'.55':'.17'));
      art.querySelector('[data-choc-part="bite"]')?.setAttribute('opacity','1');
      art.querySelector('[data-choc-part="cut"]')?.setAttribute('opacity','0');
    });
  }
  for(const event of['pagehide','resize'])window.addEventListener(event,cancel);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});reduced.addEventListener('change',cancel);
  return{handles,start,cancel,clear:cancel,reset,get active(){return!!run||bike.active;}};
}
