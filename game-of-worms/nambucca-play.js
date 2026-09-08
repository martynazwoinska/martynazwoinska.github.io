import { PRESS, PAINT, add } from './nambucca-art.js?v=20260908-nambucca-1';
import { createNambuccaSound } from './nambucca-audio.js?v=20260908-nambucca-1';
const clamp=x=>Math.min(1,Math.max(0,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x);};
export function pressFrame(ms,male,reduced=false) {
  if(reduced)return {done:ms>=650,close:0,twist:0,pull:male?1:0};
  const close=ease((ms-350)/650)*(1-ease((ms-2250)/650));
  return {done:ms>=3400,close,twist:ms>1000&&ms<2200?(ms-1000)/1200*720:0,
    pull:male?ease((ms-500)/950)*(1-ease((ms-2500)/700)):0};
}
export function paintFrame(ms,count,reduced=false) {
  if(reduced)return {done:ms>=650,progress:count,returning:1,travel:1};
  const drawEnd=450+count*620;
  const elapsed=Math.max(0,ms-450),index=Math.floor(elapsed/620),phase=elapsed-index*620;
  return {done:ms>=drawEnd+650,progress:Math.min(count,index+clamp((phase-120)/500)),
    returning:ease((ms-drawEnd)/600),travel:ease(phase/120)};
}
export function applyPaintProgress(paths,progress) {
  paths.forEach((path,i)=>{const amount=clamp(progress-i);path.setAttribute('stroke-dashoffset',String(1-amount));path.setAttribute('opacity',amount>0?'1':'0');});
}
function arm(g,male) {
  const a=add(g,'g');
  const skin=add(a,'path',{fill:'#91cda4',stroke:'#527e6e','stroke-width':1,'stroke-linejoin':'round'});
  const light=add(a,'path',{fill:'none',stroke:'#c9e8bb','stroke-width':male?1:1.6,'stroke-linecap':'round'});
  const hand=add(a,'g');
  add(hand,'path',{d:'M-4 4Q-9 1-6-4L-1-5Q2-9 5-5L7 1Q8 7 2 8L-4 4Z',fill:'#fff0d8',stroke:'#627265','stroke-width':1.2,'stroke-linejoin':'round'});
  add(hand,'path',{d:'M-4 0Q-11-5-6-7L-1-2M1-4L2 0M4-3L5 1',fill:'none',stroke:'#b7a384','stroke-width':1,'stroke-linecap':'round'});
  return {a,skin,light,hand};
}
export function createNambuccaPlay(habitat,refreshTargets=()=>{}) {
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)'),sound=createNambuccaSound();
  let active=null,raf=0;
  const handles=piece=>[PRESS,PAINT].includes(piece?.dataset.accessoryFamily);
  function cancel() {
    cancelAnimationFrame(raf);raf=0;sound.stop();if(!active)return;
    for(const [n,attrs] of active.saved)for(const [k,v] of Object.entries(attrs))v===null?n.removeAttribute(k):n.setAttribute(k,v);
    for(const [n,style] of active.styles)style===null?n.removeAttribute('style'):n.setAttribute('style',style);
    active.effects.remove();delete habitat.dataset.nambuccaAction;active=null;
  }
  function reset(piece) {
    cancel();if(!handles(piece))return;
    applyPaintProgress([...piece.querySelectorAll('[data-nb-stroke]')],0);
  }
  function clear(){cancel();}
  function start(piece) {
    if(!handles(piece)||!piece.isConnected||piece.closest('[hidden]'))return false;
    cancel();
    const root=habitat.querySelector('#worm-species'),art=piece.querySelector('.location-accessory-art');
    if(!root||!art)return false;
    const male=piece.dataset.wormPart==='companion',kind=piece.dataset.accessoryFamily===PAINT?'paint':'press';
    const body=habitat.querySelector(male?'.companion-body':'.worm-body');
    const effects=add(root,'g',{'data-nambucca-effects':'','pointer-events':'none','aria-hidden':'true'});
    const run={saved:new Map(),styles:new Map(),effects};active=run;habitat.dataset.nambuccaAction=kind;
    const save=(n,keys=['transform'])=>{if(n&&!run.saved.has(n))run.saved.set(n,Object.fromEntries(keys.map(k=>[k,n.getAttribute(k)])));return n;};
    const point=(n,x,y)=>new DOMPoint(x,y).matrixTransform(root.getScreenCTM().inverse().multiply(n.getScreenCTM()));
    for(const n of [piece]) {
      const b=n.getBBox();run.styles.set(n,n.getAttribute('style'));
      n.style.transformBox='view-box';n.style.transformOrigin=`${b.x+b.width/2}px ${b.y+b.height/2}px`;
    }
    // Freeze only this worm's normal bob so the hand remains anchored to its body.
    for(const n of [body,...habitat.querySelectorAll(`.fitted-headwear-motion.${male?'companion':'primary'}`)]) {
      run.styles.set(n,n.getAttribute('style'));n.style.animationPlayState='paused';
    }
    const strokes=[...art.querySelectorAll('[data-nb-stroke]')].map(n=>save(n,['stroke-dashoffset','opacity']));
    const lengths=strokes.map(n=>n.getTotalLength());
    const brush=save(art.querySelector('[data-nb-brush]'));
    const paintTip=save(art.querySelector('[data-nb-paint-tip]'),['fill']);
    const lid=save(art.querySelector('[data-nb-lid]')),sheet=save(art.querySelector('[data-nb-sheet]'));
    const nuts=[...art.querySelectorAll('[data-nb-nut]')].map(n=>save(n));
    const arms=Array.from({length:male&&kind==='press'?1:2},()=>arm(effects,male));
    const cues=new Set(),began=performance.now();
    if(!reduced.matches)sound.unlock();
    const cue=(key,type)=>{if(!cues.has(key)){cues.add(key);if(!reduced.matches)sound.play(type);}};
    function tick(now) {
      if(active!==run)return;
      if(document.hidden||!piece.isConnected||piece.closest('[hidden]')){cancel();return;}
      const ms=now-began,s=kind==='paint'?paintFrame(ms,strokes.length,reduced.matches):pressFrame(ms,male,reduced.matches);
      if(s.done){cancel();if(kind==='paint')applyPaintProgress(strokes,strokes.length);return;}
      let targets;
      if(kind==='paint') {
        applyPaintProgress(strokes,s.progress);
        const index=Math.min(strokes.length-1,Math.floor(s.progress)),fraction=clamp(s.progress-index);
        const tip=strokes[index].getPointAtLength(lengths[index]*fraction);
        // Lift between separate strokes, keeping new paint at the bristle tip.
        if(index>0&&fraction===0&&s.returning===0){
          const previous=strokes[index-1].getPointAtLength(lengths[index-1]);
          tip.x=previous.x+(tip.x-previous.x)*s.travel;
          tip.y=previous.y+(tip.y-previous.y)*s.travel-6*Math.sin(s.travel*Math.PI);
        }
        const ready=ease(ms/450),homeX=male?56:65,homeY=-43;
        const contactX=homeX+(tip.x-homeX)*ready,contactY=homeY+(tip.y-homeY)*ready;
        const x=contactX+(homeX-contactX)*s.returning,y=contactY+(homeY-contactY)*s.returning;
        const angle=male?27:32;
        brush.setAttribute('transform',`translate(${x} ${y}) rotate(${angle})`);
        paintTip.setAttribute('fill',strokes[index].getAttribute('stroke'));
        if(s.progress>0&&s.progress<strokes.length)cue('stroke-'+index,'brush');
        targets=[point(brush,0,-38),point(art,male?-45:-55,12)];
      } else if(male) {
        sheet.setAttribute('transform',`translate(${s.pull*52} ${-s.pull*39})`);
        if(s.pull>.2)cue('paper','paper');
        targets=[point(sheet,54,17)];
      } else {
        lid.setAttribute('transform',`translate(0 ${-44+s.close*44})`);
        const width=.30+.70*Math.abs(Math.cos(s.twist*Math.PI/180));
        nuts.forEach(n=>n.setAttribute('transform',`${run.saved.get(n).transform} scale(${width} 1)`));
        if(s.close>.98)cue('contact','wood');
        if(s.twist>180)cue('nut','paper');
        targets=[point(lid,-64,4),point(lid,24,-14)];
      }
      arms.forEach((a,i)=>{
        const from=point(body,kind==='paint'?(i?216:239):(i?254:279),kind==='paint'?(i?160:138):(i?127:121)),to=targets[i];
        const dx=to.x-from.x,dy=to.y-from.y,len=Math.max(1,Math.hypot(dx,dy));
        const nx=-dy/len,ny=dx/len,w=male?2.9:5.6,end=male?1.6:2.5;
        const elbow={x:from.x+dx*.46,y:from.y+dy*.50+(male?8:16)};
        a.skin.setAttribute('d',`M${from.x+nx*w} ${from.y+ny*w}Q${elbow.x+nx*w} ${elbow.y+ny*w} ${to.x+nx*end} ${to.y+ny*end}L${to.x-nx*end} ${to.y-ny*end}Q${elbow.x-nx*w} ${elbow.y-ny*w} ${from.x-nx*w} ${from.y-ny*w}Z`);
        a.light.setAttribute('d',`M${from.x+nx*w*.35} ${from.y+ny*w*.35}Q${elbow.x} ${elbow.y} ${to.x} ${to.y}`);
        a.hand.setAttribute('transform',`translate(${to.x} ${to.y}) rotate(${kind==='paint'&&i===0?male?27:32:0}) scale(${male?.6:.9})`);
        a.a.setAttribute('opacity',reduced.matches?1:ease(ms/180));
      });
      raf=requestAnimationFrame(tick);
    }
    raf=requestAnimationFrame(tick);return true;
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});
  // Measure the 44px touch target after the accessory's entrance scale settles.
  habitat.addEventListener('animationend',event=>{
    if(event.animationName==='accessory-pop'&&event.target.querySelector?.('[data-nambucca-art]'))refreshTargets();
  });
  window.addEventListener('pagehide',cancel);window.addEventListener('resize',cancel);reduced.addEventListener('change',cancel);
  return {handles,start,cancel,reset,clear,get active(){return !!active;}};
}
