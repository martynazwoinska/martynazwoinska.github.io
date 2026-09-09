import {BIKE,add,path,part,C} from './oahu-bike-art.js?v=20260909-bike-1';
import {createBikeSound} from './oahu-bike-audio.js?v=20260909-bike-1';
export const clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x);},mix=(a,b,t)=>a+(b-a)*t;
// Integral of smoothstep gives continuous angular speed at both transitions.
const integral=x=>{x=clamp(x);return x*x*x-x*x*x*x/2;};
export function bikeFrame(ms,reduced=false){
  if(reduced)return{done:ms>=650,mount:0,angle:0,speed:0,feed:0,progress:1};
  const t=Math.max(0,ms-1100),coast=clamp((ms-5800)/1250);
  const turns= t<600?600*integral(t/600):t<4700?t-300:4400+1250*(coast-integral(coast));
  return{done:ms>=8250,mount:ease(ms/950)*(1-ease((ms-7200)/950)),angle:turns*.30,
    speed:ease(t/600)*(1-ease(coast)),feed:ease((ms-1600)/850)*(1-ease((ms-4800)/650)),progress:clamp((ms-2350)/3050)};
}
function arm(g,small){
  const a=part(g,'arm'),skin=path(a,'','var(--worm-color)',C.ink,small?.55:.8),light=path(a,'','none','#e2fff178',small?.8:1.4);
  const hand=part(a,'hand');path(hand,'M-4 4Q-8 1-5-4L-1-5Q2-7 5-3L6 3Q4 7-1 6Z','#fff0d6',C.ink,.9);
  path(hand,'M-3 0Q-8-4-5-6L-1-2M1-3L2 0M4-2L4 1','none','#b9a187',.7);
  return{a,skin,light,hand,small};
}
function moveArm(a,from,to,opacity){
  const dx=to.x-from.x,dy=to.y-from.y,len=Math.max(1,Math.hypot(dx,dy)),nx=-dy/len,ny=dx/len,w=a.small?2.3:4.2,tip=a.small?1.4:2.2;
  const ex=mix(from.x,to.x,.52)-Math.min(8,len*.13),ey=mix(from.y,to.y,.45)+Math.min(a.small?7:13,len*.23);
  a.skin.setAttribute('d',`M${from.x+nx*w} ${from.y+ny*w}Q${ex+nx*w} ${ey+ny*w} ${to.x+nx*tip} ${to.y+ny*tip}L${to.x-nx*tip} ${to.y-ny*tip}Q${ex-nx*w} ${ey-ny*w} ${from.x-nx*w} ${from.y-ny*w}Z`);
  a.light.setAttribute('d',`M${from.x} ${from.y}Q${ex} ${ey} ${to.x} ${to.y}`);
  a.hand.setAttribute('transform',`translate(${to.x} ${to.y}) rotate(${Math.atan2(dy,dx)*180/Math.PI-90}) scale(${a.small?.58:.85})`);a.a.setAttribute('opacity',opacity);
}
const malePose=[195,-10,225,30,180,68,220,82,250,95,250,101,278,113,330,121,355,82,326,54];
const largePose=[78,125,126,178,180,168,184,117,186,75,226,105,278,113,330,121,355,82,326,54];
const curve=v=>`M${v.slice(0,2).join(' ')}C${v.slice(2,8).join(' ')}C${v.slice(8,14).join(' ')}C${v.slice(14).join(' ')}`;
export function createOahuBike(habitat,refresh=()=>{}){
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)'),sound=createBikeSound();let active=null,raf=0;
  const handles=p=>p?.dataset.accessoryFamily===BIKE;
  function cancel(){
    cancelAnimationFrame(raf);raf=0;sound.stop();if(!active)return;
    const r=active;active=null;
    for(const[n,attrs]of r.saved)for(const[k,v]of Object.entries(attrs))v===null?n.removeAttribute(k):n.setAttribute(k,v);
    for(const[n,v]of r.styles)v===null?n.removeAttribute('style'):n.setAttribute('style',v);
    r.effects.remove();delete habitat.dataset.oahuBike;refresh();
  }
  function start(piece){
    if(!handles(piece)||!piece.isConnected||piece.closest('[hidden]'))return false;
    if(active){cancel();return true;}
    const root=habitat.querySelector('#worm-species'),art=piece.querySelector('.location-accessory-art');if(!root||!art)return false;
    const effects=add(root,'g',{'data-oahu-bike-effects':'','aria-hidden':'true','pointer-events':'none'}),run={effects,saved:new Map(),styles:new Map()};active=run;habitat.dataset.oahuBike='running';
    const save=(n,keys=['transform','opacity'])=>{if(n&&!run.saved.has(n))run.saved.set(n,Object.fromEntries(keys.map(k=>[k,n.getAttribute(k)])));return n;};
    const style=n=>{if(n&&!run.styles.has(n))run.styles.set(n,n.getAttribute('style'));return n;};
    const b=piece.getBBox();style(piece);piece.style.transformBox='view-box';piece.style.transformOrigin=`${b.x+b.width/2}px ${b.y+b.height/2}px`;
    const matrix=n=>{const m=root.getScreenCTM().inverse().multiply(n.getScreenCTM());return new DOMMatrix([m.a,m.b,m.c,m.d,m.e,m.f]);};
    const point=(n,x,y)=>new DOMPoint(x,y).matrixTransform(matrix(n));
    const base=matrix(art),players=[];
    if(!reduced.matches){
      for(const small of [false,true]){
        const original=habitat.querySelector(small?'.companion-body':'.worm-body');style(original).style.animationPlayState='paused';
        const from=matrix(original),clone=original.cloneNode(true);clone.removeAttribute('class');clone.removeAttribute('id');clone.setAttribute('style','animation:none;transform:none');
        clone.querySelectorAll('[id]').forEach(n=>n.removeAttribute('id'));
        const holder=part(effects,'worker',{'data-bike-worker':small?'male':'hermaphrodite'});holder.appendChild(clone);style(original).style.visibility='hidden';
        const paths=[...clone.querySelectorAll(small?'.companion-line,.companion-shadow,.companion-highlight':'.worm-line,.worm-shadow,.worm-highlight')].map(n=>({n,from:[...n.getAttribute('d').matchAll(/-?\d*\.?\d+/g)].map(m=>Number(m[0]))}));
        const to=base.multiply(small?new DOMMatrix().translate(0,25).scale(.4):new DOMMatrix().translate(-70,-175).scale(.78));
        players.push({small,holder,from,to,paths,tail:clone.querySelector('.male-tail'),arms:[arm(effects,small),arm(effects,small)]});
      }
      for(const n of habitat.querySelectorAll('.worm-ground-shadow,.accessory-piece'))if(n!==piece){style(n).style.opacity='0';n.style.pointerEvents='none';}
    }
    const nodes={};for(const key of ['wheel','crank','pedals','flywheel','fan','scoop','beans','grains','nibs','shells','roller'])nodes[key]=save(art.querySelector(`[data-bike-${key}]`));
    if(!reduced.matches){
      // The filled scoop stays in front of the body, with fingers in front of its handle.
      const layer=add(effects,'g',{transform:base.toString()}),clone=nodes.scoop.cloneNode(true);
      style(nodes.scoop).style.visibility='hidden';layer.appendChild(clone);nodes.scoop=clone;nodes.beans=clone.querySelector('[data-bike-beans]');
      players.forEach(p=>p.arms.forEach(a=>effects.appendChild(a.a)));
    }
    const chain=save(art.querySelector('[data-bike-chain]'),['stroke-dashoffset']),pedals=[...art.querySelectorAll('[data-bike-pedal]')].map(n=>save(n));
    const grains=[...nodes.grains.children].map(n=>save(n));const began=performance.now();if(!reduced.matches)sound.start();
    function tick(now){
      if(active!==run)return;if(document.hidden||!piece.isConnected||piece.closest('[hidden]')){cancel();return;}
      const ms=now-began,s=bikeFrame(ms,reduced.matches);
      habitat.dataset.oahuBike=ms<1100?'mounting':ms<5800?'working':ms<7200?'coasting':'returning';
      if(s.done){cancel();nodes.nibs.setAttribute('opacity','1');nodes.shells.setAttribute('opacity','1');return;}
      const a=s.angle,r=a*Math.PI/180;
      nodes.wheel.setAttribute('transform',`rotate(${a*1.8})`);nodes.crank.setAttribute('transform',`rotate(${a})`);
      nodes.pedals.setAttribute('transform',`translate(111 93) rotate(${a})`);
      pedals.forEach(n=>{const[x,y]=n.dataset.bikePedal.split(',').map(Number);n.setAttribute('transform',`translate(${x} ${y}) rotate(${-a})`);});
      nodes.flywheel.setAttribute('transform',`translate(247 46) rotate(${a*4})`);nodes.fan.setAttribute('transform',`translate(301 50) rotate(${a*6})`);
      chain.setAttribute('stroke-dashoffset',-a*.08);
      nodes.roller.setAttribute('transform',`translate(0 ${Math.sin(r*8)*.8*s.speed})`);
      const sx=215+25*s.feed,sy=-57-15*s.feed,sa=-12+50*s.feed;
      nodes.scoop.setAttribute('transform',`translate(${sx} ${sy}) rotate(${sa})`);nodes.beans.setAttribute('opacity',1-s.progress);
      nodes.nibs.setAttribute('opacity',s.progress);nodes.shells.setAttribute('opacity',s.progress);
      nodes.grains.setAttribute('opacity',1);
      grains.forEach((n,i)=>{
        const feeding=i<6,husks=i>=12,q=((ms+i*173)%760)/760;
        const visible=!reduced.matches&&(feeding?ms>2210&&ms<4700:ms>2750&&ms<5480);
        n.setAttribute('opacity',visible?1:0);
        const x=feeding?264+Math.sin(i)*3:husks?316+q*3:278+Math.sin(i)*q*8;
        const y=feeding?-60+q*q*25:husks?110+q*q*20:105+q*q*13;
        n.setAttribute('transform',`translate(${x} ${y}) rotate(${i*29+q*170}) scale(${husks?.26:.43} ${husks?.14:.43})`);
      });
      players.forEach(p=>{
        const v=['a','b','c','d','e','f'].map(k=>mix(p.from[k],p.to[k],s.mount));
        // Small body effort follows the pedal stroke, never moves the grip off it.
        v[5]+=p.small?Math.sin(r*2)*1.1*s.speed:0;p.holder.setAttribute('transform',`matrix(${v.join(' ')})`);
        const pose=p.small?malePose:largePose;
        p.paths.forEach(({n,from})=>n.setAttribute('d',curve(from.map((v,i)=>mix(v,pose[i]+(n.matches('.worm-highlight,.companion-highlight')?(i%2?-5:-3):n.matches('.worm-shadow,.companion-shadow')&&i%2?10:0),s.mount)))));
        if(p.tail){const x=mix(79,195,s.mount),y=mix(228,-10,s.mount);p.tail.setAttribute('d',`M${x} ${y}L${x-30} ${y-18}L${x-15} ${y+14}Z`);}
        const targets=p.small?[point(art,111+(-16*Math.cos(r)+13*Math.sin(r)),93+(-16*Math.sin(r)-13*Math.cos(r))),point(art,111+(16*Math.cos(r)-13*Math.sin(r)),93+(16*Math.sin(r)+13*Math.cos(r)))]:[point(nodes.scoop,-36,-6),point(nodes.scoop,18,7)];
        p.arms.forEach((arm,i)=>moveArm(arm,point(p.holder,i?286:299,i?115:103),targets[i],s.mount));
      });
      raf=requestAnimationFrame(tick);
    }
    raf=requestAnimationFrame(tick);return true;
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});window.addEventListener('pagehide',cancel);window.addEventListener('resize',cancel);reduced.addEventListener('change',cancel);
  function reset(){cancel();habitat.querySelectorAll('[data-bike-nibs],[data-bike-shells]').forEach(n=>n.setAttribute('opacity','0'));}
  return{handles,start,cancel,clear:cancel,reset,get active(){return!!active;}};
}
