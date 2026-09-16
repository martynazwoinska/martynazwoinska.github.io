import {WHEEL,TEA,APRON,add,updateClay,updateTea,teaStrawPoint,clayProfile} from './taipei-art.js?v=20260916-pottery-9';
const clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x);};
const matrix=m=>`matrix(${[m.a,m.b,m.c,m.d,m.e,m.f].join(' ')})`;
export function potteryFrame(ms,male,reduced=false){
  if(reduced)return {form:1,wobble:0,turn:0,reach:0,done:ms>=350};
  return {form:ease((ms-450)/2450),wobble:male?7*Math.sin(ms/165)*ease((ms-1200)/500)*(1-ease((ms-3200)/600)):0,
    turn:ms*.31,reach:ease(ms/450)*(1-ease((ms-3400)/600)),done:ms>=4200};
}
export function teaFrame(ms,male,reduced=false){
  if(reduced)return {lift:0,sip:1,pearl:1,done:ms>=350};
  return {lift:ease(ms/700)*(1-ease((ms-3200)/650)),sip:ease((ms-1000)/1800),
    pearl:male?(ms<2150?Math.max(0,Math.sin((ms-1100)/170))*clamp((ms-1100)/400)*.45:ease((ms-2150)/650)):ease((ms-1200)/800),done:ms>=4100};
}
// Reuse the site's credited recordings without altering their files.
const clips={sip:'araucania-straw-sip.wav',clay:'kauai-bath-squeeze.wav'};
function sound(){
  let context;const buffers=new Map(),loading=new Map(),voices=new Set();
  function stop(){for(const n of voices){try{n.stop();}catch{}}voices.clear();}
  function prepare(kind){
    try{
      const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;
      context??=new Audio();context.resume().catch(()=>{});
      if(buffers.has(kind)||loading.has(kind))return;
      const abort=new AbortController(),timeout=setTimeout(()=>abort.abort(),4000);
      const p=fetch(new URL('./assets/audio/'+clips[kind],import.meta.url),{signal:abort.signal}).then(r=>{if(!r.ok)throw Error(r.status);return r.arrayBuffer();}).then(b=>context.decodeAudioData(b)).then(b=>buffers.set(kind,b)).catch(()=>{}).finally(()=>{clearTimeout(timeout);loading.delete(kind);});
      loading.set(kind,p);
    }catch{/* Visual action still works without audio. */}
  }
  function play(kind){
    if(!buffers.has(kind)||context?.state!=='running')return;
    const n=context.createBufferSource(),g=context.createGain();n.buffer=buffers.get(kind);g.gain.value=kind==='clay'?.25:.6;n.connect(g);g.connect(context.destination);voices.add(n);
    n.onended=()=>{n.disconnect();g.disconnect();voices.delete(n);};n.start();
  }
  return {prepare,play,stop};
}
export function createTaipeiPlay(habitat,refresh=()=>{}){
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),audio=sound(),turns=new WeakMap();
  let run=null,raf=0;
  const handles=p=>[WHEEL,TEA].includes(p?.dataset.accessoryFamily);
  const visible=p=>p?.isConnected&&!p.closest('[hidden]');
  function cancel(complete=false){
    cancelAnimationFrame(raf);raf=0;audio.stop();if(!run)return;
    const r=run;run=null;
    r.art.replaceChildren(...[...r.saved.childNodes].map(n=>n.cloneNode(true)));
    if(r.visibility===null)r.art.removeAttribute('visibility');else r.art.setAttribute('visibility',r.visibility);
    r.effects.remove();r.paused.forEach(a=>{if(a.playState==='paused')a.play();});delete habitat.dataset.taipeiAction;
    if(complete){
      if(r.kind===WHEEL)updateClay(r.art.querySelector('[data-taipei-clay]'),1,r.male,r.variant);
      if(r.kind===TEA)updateTea(r.art,r.male,1-.22*((r.variant%4)+1));
      turns.set(r.piece,r.variant+1);refresh();
    }
  }
  function start(piece){
    if(!handles(piece)||!visible(piece))return false;
    if(run?.piece===piece)return true;
    cancel();const male=piece.dataset.wormPart==='companion',kind=piece.dataset.accessoryFamily;
    const art=piece.querySelector('.location-accessory-art'),root=habitat.querySelector('#worm-species');
    const body=habitat.querySelector(male?'.companion-body':'.worm-body');
    const r={piece,art,root,body,male,kind,variant:turns.get(piece)||0,saved:art.cloneNode(true),visibility:art.getAttribute('visibility'),paused:[],played:new Set(),began:performance.now()};
    run=r;r.effects=add(root,'g',{'data-taipei-effects':'','aria-hidden':'true','pointer-events':'none'});
    // Vessel fronts occlude the hands, leaving only the fingers at the sides.
    if(kind===WHEEL)root.insertBefore(r.effects,root.querySelector('#primary-worm'));
    const apronMotion=habitat.querySelector(`[data-accessory-family="${APRON}"][data-worm-part="${male?'companion':'primary'}"] .fitted-headwear-motion`);
    for(const node of [body,apronMotion])for(const a of node?.getAnimations()||[])if(a.playState==='running'){a.pause();r.paused.push(a);}
    const toRoot=(node,x,y)=>new DOMPoint(x,y).matrixTransform(root.getScreenCTM().inverse().multiply(node.getScreenCTM()));
    const fromBody=(x,y)=>toRoot(body,x,y);
    r.anchor=fromBody(300,109);r.mouth=fromBody(333,75);
    function hand(){
      const arm=add(r.effects,'path',{fill:'none',stroke:'#70b9b1','stroke-width':male?5:10,'stroke-linecap':'round'});
      const glove=add(r.effects,'ellipse',{rx:kind===TEA?(male?1.6:2.5):(male?2:3.4),ry:kind===TEA?(male?2.7:4):(male?3:4.8),fill:'#f1d1b2',stroke:'#876f59','stroke-width':1});return {arm,glove};
    }
    const hands=Array.from({length:2},hand);
    function poseHand(h,end,reach=1){
      const x=r.anchor.x+(end.x-r.anchor.x)*reach,y=r.anchor.y+(end.y-r.anchor.y)*reach;
      h.arm.setAttribute('d',`M${r.anchor.x} ${r.anchor.y}Q${(r.anchor.x+x)/2-12} ${Math.max(r.anchor.y,y)+9} ${x} ${y}`);
      h.glove.setAttribute('cx',x);h.glove.setAttribute('cy',y);h.arm.setAttribute('opacity',reach);h.glove.setAttribute('opacity',reach);
    }
    if(kind===TEA){
      r.teaMove=add(r.effects,'g');
      r.tea=art.cloneNode(true);r.tea.removeAttribute('transform');r.tea.style.transform='none';r.tea.style.animation='none';r.tea.querySelector('[data-tea-coaster]')?.remove();
      for(const n of r.tea.querySelectorAll('[id]')){const id=n.id;n.id=id+'-sip';for(const ref of r.tea.querySelectorAll('[clip-path]'))if(ref.getAttribute('clip-path')===`url(#${id})`)ref.setAttribute('clip-path',`url(#${id}-sip)`);}
      r.teaMove.append(r.tea);
      r.base=root.getScreenCTM().inverse().multiply(art.getScreenCTM());const tip=teaStrawPoint(1,male);r.tip=toRoot(art,tip.x,tip.y);
      r.dx=r.mouth.x-r.tip.x;r.dy=r.mouth.y-r.tip.y;art.setAttribute('visibility','hidden');
      art.querySelector('[data-tea-coaster]')?.setAttribute('visibility','visible');
      r.pearl=add(r.tea,'circle',{r:4,fill:'#483d45',stroke:'#d9b794','stroke-width':.8});
      r.grips=[toRoot(art,male?-47:-63,14),toRoot(art,male?46:62,23)];
    }
    const cue=kind===TEA?'sip':'clay';if(!reduced.matches)audio.prepare(cue);
    habitat.dataset.taipeiAction=kind;
    function contact(key,at,ms){if(!reduced.matches&&ms>=at&&!r.played.has(key)){r.played.add(key);if(ms-at<120)audio.play(cue);}}
    function tick(now){
      if(run!==r)return;
      if(!visible(piece)||document.hidden){cancel();return;}
      const ms=now-r.began;let done=false;
      if(kind===WHEEL){
        const f=potteryFrame(ms,male,reduced.matches),p=clayProfile(f.form,male,r.variant,f.wobble);
        updateClay(art.querySelector('[data-taipei-clay]'),f.form,male,r.variant,f.wobble);
        art.querySelector('[data-wheel-spin]').setAttribute('transform',`translate(0 5) scale(1 .24) rotate(${f.turn})`);
        hands.forEach((h,i)=>poseHand(h,toRoot(art,(i?1:-1)*(p.rim+2)+p.x,-p.h*.55),f.reach));
        contact('squeeze1',700,ms);contact('squeeze2',1800,ms);done=f.done;
      }else{
        const f=teaFrame(ms,male,reduced.matches);
        const b=r.base;r.teaMove.setAttribute('transform',matrix(new DOMMatrix([b.a,b.b,b.c,b.d,b.e+r.dx*f.lift,b.f+r.dy*f.lift])));
        updateTea(r.tea,male,1-.22*(r.variant%4+f.sip));
        const pearl=teaStrawPoint(f.pearl,male);
        r.pearl.setAttribute('cx',pearl.x);r.pearl.setAttribute('cy',pearl.y);r.pearl.setAttribute('opacity',f.lift>.97&&f.pearl<.98?1:0);
        hands.forEach((h,i)=>poseHand(h,{x:r.grips[i].x+r.dx*f.lift,y:r.grips[i].y+r.dy*f.lift},f.lift));
        contact('sip1',1100,ms);if(male)contact('sip2',2250,ms);done=f.done;
      }
      if(done){cancel(true);return;}raf=requestAnimationFrame(tick);
    }
    tick(r.began);return true;
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});
  window.addEventListener('pagehide',()=>cancel());window.addEventListener('resize',()=>cancel());reduced.addEventListener('change',()=>cancel());
  return {handles,start,cancel,get active(){return !!run;}};
}
