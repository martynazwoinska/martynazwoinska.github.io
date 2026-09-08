import {SCOOTER,FRUIT,COFFEE,add,path,part,fruitBox,C} from './hcmc-art.js?v=20260908-hcmc-1';
import {createHcmcSound} from './hcmc-audio.js?v=20260908-hcmc-1';
export const clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x);},mix=(a,b,q)=>a+(b-a)*q;
export function rideFrame(ms,reduced=false){
  if(reduced)return{done:ms>=750,mount:0,x:0,y:0,angle:0,spin:0};
  const mount=ease(ms/700)*(1-ease((ms-5300)/700));
  let x=0,y=0,angle=0;
  if(ms>=1000&&ms<2450){const q=clamp((ms-1000)/1450);x=900*q*q;y=-25*Math.sin(q*Math.PI);angle=-4*Math.sin(q*Math.PI);}
  else if(ms>=2450&&ms<2850)x=900;
  else if(ms>=2850&&ms<4950){const q=ease((ms-2850)/2100);x=-900*(1-q);y=24*Math.sin(q*Math.PI);angle=3*Math.sin(q*Math.PI);}
  return{done:ms>=6050,mount,x,y,angle,spin:ms>1000&&ms<4950?(ms-1000)*.34:0};
}
export function fruitFrame(ms,male,reduced=false){
  if(reduced)return{done:ms>=700,cut:0,count:3,stage:3,q:0,eat:0};
  const elapsed=Math.max(0,ms-500),stage=Math.min(3,Math.floor(elapsed/750)),q=clamp((elapsed-stage*750)/750);
  const cut=stage<3?ease(q/.45)*(1-ease((q-.56)/.4)):0;
  return{done:ms>=4400,cut,count:Math.min(3,stage+(q>=.48?1:0)),stage,q,eat:male?ease((ms-2900)/480)*(1-ease((ms-3660)/450)):0};
}
export function coffeeFrame(ms,male,reduced=false){
  if(reduced)return{done:ms>=700,brew:1,stir:0,blend:male?1:0};
  const stirring=ease((ms-400)/250)*(1-ease((ms-2950)/450));
  return{done:ms>=3900,brew:ease((ms-600)/2450),stir:male?stirring:0,blend:male?ease((ms-650)/2050):0};
}
function hand(g,small){
  const n=part(g,'hand');path(n,'M-4 4Q-9 0-5-5L-1-5Q2-8 5-4L7 2Q5 8-1 7Z','#fff0d6',C.ink,1);
  path(n,'M-3 0Q-10-5-6-7L-1-2M1-4L2 0M4-3L5 1','none','#b5a187',.8);
  return n;
}
function arm(g,male){return{g:part(g,'arm'),male};}
function setArm(a,from,to,alpha=1){
  if(!a.skin){a.skin=path(a.g,'', 'var(--worm-color)',C.ink,.8);a.light=path(a.g,'','none','#ffe3bd88',a.male?.8:1.4);a.hand=hand(a.g,a.male);}
  const dx=to.x-from.x,dy=to.y-from.y,len=Math.max(1,Math.hypot(dx,dy)),nx=-dy/len,ny=dx/len,w=a.male?2.5:4.3,tip=a.male?1.4:2.2;
  const elbow={x:mix(from.x,to.x,.47)-4,y:mix(from.y,to.y,.48)+Math.min(a.male?10:18,len*.20)};
  a.skin.setAttribute('d',`M${from.x+nx*w} ${from.y+ny*w}Q${elbow.x+nx*w} ${elbow.y+ny*w} ${to.x+nx*tip} ${to.y+ny*tip}L${to.x-nx*tip} ${to.y-ny*tip}Q${elbow.x-nx*w} ${elbow.y-ny*w} ${from.x-nx*w} ${from.y-ny*w}Z`);
  a.light.setAttribute('d',`M${from.x+nx*w*.4} ${from.y+ny*w*.4}Q${elbow.x} ${elbow.y} ${to.x} ${to.y}`);
  a.hand.setAttribute('transform',`translate(${to.x} ${to.y}) rotate(${Math.atan2(dy,dx)*180/Math.PI-90}) scale(${a.male?.54:.82})`);
  a.g.setAttribute('opacity',alpha);
}
const seated=[92,140,125,160,165,160,185,135,202,111,235,103,278,113,330,121,355,82,326,54];
const passenger=[78,228,122,247,158,223,185,177,210,127,240,111,278,113,330,121,355,82,326,54];
const numbers=d=>[...d.matchAll(/-?\d*\.?\d+/g)].map(m=>Number(m[0]));
function curve(values){return `M${values.slice(0,2).join(' ')} C${values.slice(2,8).join(' ')} C${values.slice(8,14).join(' ')} C${values.slice(14).join(' ')}`;}
export function createHcmcPlay(habitat,refreshTargets=()=>{}){
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)'),sound=createHcmcSound();
  let active=null,raf=0;
  const handles=p=>[SCOOTER,FRUIT,COFFEE].includes(p?.dataset.accessoryFamily);
  function cancel(){
    cancelAnimationFrame(raf);raf=0;sound.stop();if(!active)return;
    for(const[n,attrs]of active.saved)for(const[k,v]of Object.entries(attrs))v===null?n.removeAttribute(k):n.setAttribute(k,v);
    for(const[n,style]of active.styles)style===null?n.removeAttribute('style'):n.setAttribute('style',style);
    active.effects.remove();delete habitat.dataset.hcmcAction;active=null;
    refreshTargets();
  }
  function start(piece){
    if(!handles(piece)||!piece.isConnected||piece.closest('[hidden]'))return false;
    cancel();
    const root=habitat.querySelector('#worm-species'),art=piece.querySelector('.location-accessory-art');if(!root||!art)return false;
    const kind=piece.dataset.accessoryFamily===SCOOTER?'ride':piece.dataset.accessoryFamily===FRUIT?'fruit':'coffee';
    const effects=add(root,'g',{'data-hcmc-effects':'','aria-hidden':'true','pointer-events':'none'});
    const run={effects,saved:new Map(),styles:new Map()};active=run;habitat.dataset.hcmcAction=kind;
    const save=(n,keys=['transform'])=>{if(n&&!run.saved.has(n))run.saved.set(n,Object.fromEntries(keys.map(k=>[k,n.getAttribute(k)])));return n;};
    const style=n=>{if(n&&!run.styles.has(n))run.styles.set(n,n.getAttribute('style'));return n;};
    const pin=n=>{const b=n.getBBox();style(n);n.style.transformBox='view-box';n.style.transformOrigin=`${b.x+b.width/2}px ${b.y+b.height/2}px`;};
    const matrix=n=>{const m=root.getScreenCTM().inverse().multiply(n.getScreenCTM());return new DOMMatrix([m.a,m.b,m.c,m.d,m.e,m.f]);};
    const point=(n,x,y)=>new DOMPoint(x,y).matrixTransform(matrix(n));
    const inArt=(n,x,y)=>new DOMPoint(x,y).matrixTransform(art.getScreenCTM().inverse().multiply(n.getScreenCTM()));
    pin(piece);
    const male=piece.dataset.wormPart==='companion',body=habitat.querySelector(male?'.companion-body':'.worm-body');
    style(body).style.animationPlayState='paused';
    let players=[],vehicle=null,vehicleBase=null,spokes=[],stand=null;
    if(kind==='ride'&&!reduced.matches){
      vehicle=save(art.querySelector('[data-hc-vehicle]'));vehicleBase=matrix(art);
      spokes=[...art.querySelectorAll('[data-hc-spokes]')].map(n=>save(n));stand=save(art.querySelector('[data-hc-stand]'),['opacity']);
      players=['primary','companion'].map(wormPart=>{
        const small=wormPart==='companion',original=habitat.querySelector(small?'.companion-body':'.worm-body');
        style(original).style.animationPlayState='paused';
        const from=matrix(original),clone=original.cloneNode(true);
        clone.removeAttribute('class');clone.removeAttribute('id');clone.setAttribute('style','animation:none;transform:none');
        for(const n of clone.querySelectorAll('[id]'))n.removeAttribute('id');
        const holder=part(effects,'rider',{'data-rider':wormPart});holder.appendChild(clone);
        const paths=[...clone.querySelectorAll(small?'.companion-line,.companion-highlight,.companion-shadow':'.worm-line,.worm-highlight,.worm-shadow')].map(n=>({n,from:numbers(n.getAttribute('d'))}));
        const tail=clone.querySelector('.male-tail');
        // Original worm colours and faces remain intact. Only the riding body curls.
        style(original).style.visibility='hidden';
        const seat=new DOMMatrix().translate(small?-150:-145,small?-117:-147).scale(small?.32:.68);
        const cargo=small?part(holder,'cargo',{opacity:0}):null;
        if(cargo){const box=fruitBox(cargo,true);box.setAttribute('transform','translate(235 105) scale(1.05)');}
        const arms=[arm(effects,small),arm(effects,small)];
        return{small,holder,clone,from,seat,paths,tail,cargo,arms};
      });
      for(const n of habitat.querySelectorAll('.worm-ground-shadow'))style(n).style.opacity='0';
    }
    const animated=[...art.querySelectorAll('[data-hc-knife],[data-hc-whole-fruit],[data-hc-cut-slice],[data-hc-fork],[data-hc-snack],[data-hc-spoon],[data-hc-swirl],[data-hc-blend],[data-hc-drops],[data-drop],[data-hc-pack-source]')];
    for(const n of animated)save(n,['transform','opacity']);
    const knife=art.querySelector('[data-hc-knife]'),whole=art.querySelector('[data-hc-whole-fruit]'),slices=[...art.querySelectorAll('[data-hc-cut-slice]')];
    const fork=art.querySelector('[data-hc-fork]'),snack=art.querySelector('[data-hc-snack]'),spoon=art.querySelector('[data-hc-spoon]');
    const blend=art.querySelector('[data-hc-blend]'),swirl=art.querySelector('[data-hc-swirl]'),drops=art.querySelector('[data-hc-drops]');
    const brew=save(art.querySelector('[data-hc-brew-coffee]'),['d']);
    const smile=kind==='fruit'&&male?save(body.querySelector('.worm-smile'),['d']):null;
    const arms=kind==='ride'?[]:Array.from({length:kind==='fruit'&&!male?2:1},()=>arm(effects,male));
    const cues=new Set(),began=performance.now();if(!reduced.matches)sound.unlock(kind);
    function cue(key,at,type,level=1){if(cues.has(key)||msNow<at)return;cues.add(key);if(!reduced.matches&&msNow-at<100)sound.play(type,level,msNow-at);}
    let msNow=0;
    function tick(now){
      if(active!==run)return;
      if(document.hidden||!piece.isConnected||piece.closest('[hidden]')){cancel();return;}
      const ms=msNow=now-began,s=kind==='ride'?rideFrame(ms,reduced.matches):kind==='fruit'?fruitFrame(ms,male,reduced.matches):coffeeFrame(ms,male,reduced.matches);
      if(s.done){cancel();return;}
      if(kind==='ride'){
        if(!vehicle){raf=requestAnimationFrame(tick);return;}
        const travel=new DOMMatrix().translate(s.x,s.y).translate(0,43).rotate(s.angle).translate(0,-43);
        vehicle.setAttribute('transform',travel.toString());stand.setAttribute('opacity',1-s.mount);
        spokes.forEach(n=>n.setAttribute('transform',`rotate(${s.spin})`));
        players.forEach(p=>{
          const target=vehicleBase.multiply(travel).multiply(p.seat),v=['a','b','c','d','e','f'].map(k=>mix(p.from[k],target[k],s.mount));
          p.holder.setAttribute('transform',`matrix(${v.join(' ')})`);
          const pose=p.small?passenger:seated;
          p.paths.forEach(({n,from})=>n.setAttribute('d',curve(from.map((x,i)=>mix(x,pose[i]+(n.matches('.worm-highlight,.companion-highlight')?(i%2?-5:-3):0),s.mount)))));
          if(p.cargo)p.cargo.setAttribute('opacity',s.mount);
          const targets=p.small?[point(p.cargo,203,110),point(p.cargo,265,105)]:[point(vehicle,57,-100),point(vehicle,100,-98)];
          p.arms.forEach((a,i)=>setArm(a,point(p.holder,i?272:300,110),targets[i],s.mount));
        });
        cue('engine-out',700,'engine',.75);
        cue('engine-back',3200,'engine',.65);
      }else if(kind==='fruit'){
        let targets;
        if(!male){
          knife.setAttribute('transform',`translate(${23-s.stage*3} ${-36+s.cut*22}) rotate(${20-s.cut*13})`);
          whole.setAttribute('transform',`translate(${-10-s.count*3} -4) rotate(12) scale(${1-s.count*.07} 1)`);
          slices.forEach((n,i)=>n.setAttribute('opacity',i<s.count?'1':'0'));
          targets=[point(knife,6,-31),point(whole,-34,-12)];
          for(let i=0;i<3;i++)cue(`cut-${i}`,860+i*750,'cut',.7);
        }else{
          const mouth=inArt(body,333,73),q=ease(s.q),collect=s.stage<3;
          let x=collect?mix(-70+s.stage*12,12,q):27,y=collect?mix(40,-19,q)-Math.sin(q*Math.PI)*25:-41;
          x=mix(x,mouth.x,s.eat);y=mix(y,mouth.y+26,s.eat);
          fork.setAttribute('transform',`translate(${x} ${y}) rotate(${19*(1-s.eat)})`);
          snack.setAttribute('opacity',ms>3520?'0':'1');
          snack.setAttribute('transform',`translate(0 ${-26*ease((ms-3350)/170)}) scale(${1-ease((ms-3350)/170)})`);
          art.querySelectorAll('[data-hc-pack-source]').forEach((n,i)=>n.setAttribute('opacity',i<s.stage?'0':'1'));
          if(smile)smile.setAttribute('d',ms>3350&&ms<3830?'M325 73Q330 68 333 73Q336 78 341 73':run.saved.get(smile).d);
          targets=[point(fork,0,12)];
        }
        arms.forEach((a,i)=>setArm(a,point(body,i?284:298,i?122:111),targets[i],reduced.matches?1:ease(ms/200)));
      }else{
        let target;
        if(male){
          const angle=ms/180,x=8+Math.cos(angle)*8*s.stir,y=-2+Math.sin(angle)*3*s.stir;
          spoon.setAttribute('transform',`translate(${x} ${y}) rotate(${13+Math.sin(angle)*10*s.stir})`);
          blend.setAttribute('opacity',s.blend);swirl.setAttribute('opacity',s.stir*.8);swirl.setAttribute('transform',`translate(${Math.sin(angle)*5*s.stir} 0)`);
          target=point(spoon,2,-63);cue('stir',600,'stir',.55);
        }else{
          drops.setAttribute('opacity',!reduced.matches&&ms>650&&ms<3100?'1':'0');
          const level=14-s.brew*15;brew.setAttribute('d',`M-28 ${level}Q0 ${level-6} 28 ${level}V22Q0 28-28 22Z`);
          for(const n of drops.children){const q=((ms-650+Number(n.dataset.drop)*250)%850)/850;n.setAttribute('transform',`translate(0 ${-30+q*35})`);}
          target=point(art,22,18);
        }
        setArm(arms[0],point(body,297,114),target,reduced.matches?1:ease(ms/200));
      }
      raf=requestAnimationFrame(tick);
    }
    raf=requestAnimationFrame(tick);return true;
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});
  habitat.addEventListener('animationend',event=>{if(event.animationName==='accessory-pop'&&event.target.querySelector?.('[data-hcmc-art]'))refreshTargets();});
  window.addEventListener('pagehide',cancel);window.addEventListener('resize',cancel);reduced.addEventListener('change',cancel);
  return{handles,start,cancel,reset:cancel,clear:cancel,get active(){return !!active;}};
}
