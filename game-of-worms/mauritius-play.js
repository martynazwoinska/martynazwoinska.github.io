import {revealTreasure} from './treasure-pieces.js?v=20260920-gems-1';
import { drumHandOffset } from "./mauritius-drums.js?v=20260915-hand-drums-1";
import { basketSlot, drawFruit, putBasketFruit } from "./mauritius-baskets.js?v=20260916-ground-fruit-1";
// JU2909 only. Animate temporary copies; never write visitor position or scale.
const NS = 'http://www.w3.org/2000/svg';
export const GRABBER = 'mauritius-dodo-beak-fruit-grabber';
export const BASKET = 'mauritius-vacoas-tail-scoop';
export const DRUM = 'mauritius-ravanne-crawler-drum';
const clamp = x => Math.max(0, Math.min(1, x));
const ease = x => { x = clamp(x); return x*x*(3-2*x); };
const mix = (a,b,t) => ({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t});
const matrixText = m => `matrix(${[m.a,m.b,m.c,m.d,m.e,m.f].join(' ')})`;
const add = (parent, tag, attrs = {}) => {
  const node = document.createElementNS(NS, tag);
  for (const [key,value] of Object.entries(attrs)) node.setAttribute(key,value);
  parent.appendChild(node); return node;
};

// One pickup, two hesitant lifts for the male, then a deliberate deposit.
export function fruitFrame(ms, male, reduced = false) {
  if (reduced) return {stage:'deposit',progress:1,effort:0,done:ms>=700};
  const liftAt = male ? 1950 : 1050;
  if (ms<750) return {stage:'reach',progress:ease(ms/750),effort:0};
  if (ms<liftAt) return {stage:'grip',progress:0,effort:male?Math.sin(clamp((ms-850)/1100)*Math.PI*2)**2:0};
  if (ms<liftAt+1350) return {stage:'carry',progress:ease((ms-liftAt)/1350),effort:0};
  if (ms<liftAt+1950) return {stage:'deposit',progress:ease((ms-liftAt-1350)/350),effort:0};
  return {stage:'return',progress:ease((ms-liftAt-1950)/800),effort:0,done:ms>=liftAt+2750};
}

export function drumScore(male) {
  return male ? [220,700,940,1420,1900] : [220,700,1180,1420,1900];
}

export function createMauritiusPlay(habitat, ensureBasket) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let active = null, raf = 0, context = null, buffer = null, loading = null, onset = 0, level = 1;
  const handles = piece => [GRABBER,DRUM].includes(piece?.dataset.accessoryFamily);
  const visible = piece => piece?.isConnected && !piece.closest('[hidden]');
  const find = (family,part) => habitat.querySelector(`.accessory-piece[data-accessory-family="${family}"][data-worm-part="${part}"]`);

  function resetGround() {
    cancel();
    habitat.querySelector('[data-mauritius-ground]')?.remove();
    if (!find(GRABBER,'primary')) return;
    const root=habitat.querySelector('#worm-species');
    const ground=add(root,'g',{'data-mauritius-ground':'','aria-hidden':'true','pointer-events':'none'});
    for (const part of ['primary','companion']) {
      const male=part==='companion';
      for (let slot=0;slot<5;slot++) {
        const x=(male?-55:400)+[0,30,-28,48,8][slot],y=285+[0,17,21,-14,-22][slot];
        const radius=basketSlot(male,slot).r*(male ? .4 : .5);
        const fruit=add(ground,'g',{'data-ground-part':part,'data-ground-slot':slot,'data-ground-x':x,'data-ground-y':y,'data-ground-radius':radius,transform:`translate(${x} ${y})`});
        drawFruit(fruit,slot,radius);
      }
    }
  }

  function prepareSound() {
    if (reduced.matches) return;
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) return;
      context ??= new Audio(); context.resume().catch(()=>{});
      if (!buffer && !loading) {
        loading = (async()=> {
          const abort = new AbortController(), timeout = setTimeout(()=>abort.abort(),4000);
          try {
            const response = await fetch(new URL('./assets/audio/mauritius-frame-drum.mp3',import.meta.url),{signal:abort.signal});
            if (!response.ok) throw Error(response.status);
            buffer = await context.decodeAudioData(await response.arrayBuffer());
            const samples=buffer.getChannelData(0);
            let peak=0;for(const sample of samples)peak=Math.max(peak,Math.abs(sample));
            const first=samples.findIndex(sample=>Math.abs(sample)>peak*.12);
            onset=Math.max(0,first/buffer.sampleRate-.003);
            level=Math.min(3,.45/Math.max(.01,peak));
          } catch { /* A missing recording leaves the visible action usable. */ }
          finally { clearTimeout(timeout); loading = null; }
        })();
      }
    } catch { /* Audio is optional. No synthetic substitute or late playback. */ }
  }
  function strike(run,index) {
    if (!buffer || context?.state!=='running' || reduced.matches) return;
    const source = context.createBufferSource(), gain = context.createGain();
    source.buffer = buffer;
    const now = context.currentTime, duration = Math.min(.42,buffer.duration-onset);
    gain.gain.setValueAtTime((index%2 ? .55 : .8)*level,now);
    gain.gain.setValueAtTime((index%2 ? .55 : .8)*level,now+duration-.055);
    gain.gain.linearRampToValueAtTime(0,now+duration);
    source.connect(gain); gain.connect(context.destination); run.voices.add(source);
    source.onended = ()=>{source.disconnect();gain.disconnect();run.voices.delete(source);};
    source.start(now,onset,duration);
  }
  function cancel() {
    cancelAnimationFrame(raf); raf = 0;
    if (!active) return;
    for (const [node,key,value] of active.saved) {
      if (value===null) node.removeAttribute(key); else node.setAttribute(key,value);
    }
    for (const animation of active.paused) if (animation.playState==='paused') animation.play();
    for (const voice of active.voices) { try { voice.stop(); } catch {} }
    active.effects.remove(); delete active.piece.dataset.mauritiusAction;
    active = null;
  }
  function start(piece) {
    if (!handles(piece) || !visible(piece)) return false;
    cancel();
    const fruit = piece.dataset.accessoryFamily===GRABBER;
    if (fruit && !visible(find(BASKET,piece.dataset.wormPart))) ensureBasket(piece);
    const basket = find(BASKET,piece.dataset.wormPart);
    if (fruit && !visible(basket)) return false;
    const groundFruit=fruit&&habitat.querySelector(`[data-ground-part="${piece.dataset.wormPart}"]`);
    if (fruit && !groundFruit) return true;
    // Measure at the resting size even when collection just enabled baskets.
    for (const item of [piece,basket]) {
      for (const animation of item?.closest('.accessory')?.getAnimations() || []) {
        if (animation.animationName==='accessory-pop') animation.finish();
      }
    }
    const root = habitat.querySelector('#worm-species'), art = piece.querySelector('.location-accessory-art');
    if (!root || !art) return false;
    const effects = add(root,'g',{class:'mauritius-ju2909-accessory','data-mauritius-effects':'','aria-hidden':'true','pointer-events':'none'});
    const run = {piece,effects,saved:[],paused:[],voices:new Set(),male:piece.dataset.wormPart==='companion'};
    active = run; piece.dataset.mauritiusAction = fruit ? 'gather' : 'drum';
    const save = (node,key) => {run.saved.push([node,key,node.getAttribute(key)]);};
    const hide = node => {save(node,'visibility');node.setAttribute('visibility','hidden');};
    // Freeze the current body pose; resuming preserves the bob's existing phase.
    for (const body of habitat.querySelectorAll('.worm-body,.companion-body')) {
      for (const animation of body.getAnimations()) if (animation.playState==='running') {animation.pause();run.paused.push(animation);}
    }
    const matrix = node => root.getScreenCTM().inverse().multiply(node.getScreenCTM());
    const point = (m,x,y) => new DOMPoint(x,y).matrixTransform(m);
    let render;
    if (fruit) {
      const base = matrix(art), mouth = run.male ? [62,20] : [91,30];
      const origin = point(base,...mouth);
      const basketArt = basket.querySelector('.location-accessory-art');
      const basketMatrix=matrix(basketArt.querySelector('[data-basket-vessel]'));
      const slot=Number(groundFruit.dataset.groundSlot),landing=basketSlot(run.male,slot);
      const target=point(basketMatrix,landing.x,landing.y);
      const heavy=run.male&&slot===0, radius=Number(groundFruit.dataset.groundRadius);
      const ground={x:Number(groundFruit.dataset.groundX),y:Number(groundFruit.dataset.groundY)};
      const carryEnd={x:target.x,y:target.y-22};
      const finalScale=Math.hypot(basketMatrix.a,basketMatrix.b)*landing.r/radius;
      const coupling = point(base,run.male?-84:-118,-1);
      const linkage = add(effects,'g');
      const arm = add(linkage,'path',{fill:'none',stroke:'#494238','stroke-width':5,'stroke-linecap':'round','stroke-linejoin':'round'});
      const armFace = add(linkage,'path',{fill:'none',stroke:'#c9bba0','stroke-width':2.5,'stroke-linecap':'round','stroke-linejoin':'round'});
      const elbowJoint = add(linkage,'circle',{r:3.2,fill:'#bc9958',stroke:'#494238','stroke-width':1});
      const moving = add(effects,'g');
      const copy = art.cloneNode(true); copy.setAttribute('transform',matrixText(base));
      copy.style.transformBox='view-box';copy.style.transformOrigin='0 0';moving.appendChild(copy);
      // Leave the fitted collar and harness in place, extending their linkage.
      const fixed = '.ju2909-body-clamp,.ju2909-grabber-bridge,.ju2909-grabber-harness,.ju2909-grabber-trigger,.ju2909-control-cable';
      copy.querySelectorAll(fixed).forEach(node=>node.remove());
      for (const node of art.children) if (!node.matches(fixed)) hide(node);
      copy.querySelectorAll('.ju2909-woody-nut,.ju2909-nut-groove').forEach(node=>node.remove());
      const lower = copy.querySelector('.ju2909-dodo-lower-beak');
      hide(groundFruit);
      const oval=add(effects,'g',{'data-mauritius-fruit':slot,transform:`translate(${ground.x} ${ground.y})`});
      drawFruit(oval,slot,radius);
      let settled=false;
      const deposit=()=>{
        if(settled)return;
        settled=true;oval.setAttribute('visibility','hidden');
        putBasketFruit(basketArt,run.male,slot,slot);
        revealTreasure(habitat,'mauritius',root,ground.x,ground.y);
        groundFruit.remove();
        piece.dataset.mauritiusCollected=String(Number(piece.dataset.mauritiusCollected||0)+1);
      };
      render = ms => {
        const s = fruitFrame(ms,heavy,reduced.matches);
        let grip,where;
        if (s.stage==='reach') {grip=mix(origin,ground,s.progress);where=ground;}
        if (s.stage==='grip') {grip={x:ground.x+s.effort*Math.sin(ms/38)*1.1,y:ground.y-s.effort*7};where=grip;}
        if (s.stage==='carry') {grip=mix(ground,carryEnd,s.progress);grip.y-=Math.sin(Math.PI*s.progress)*48;where=grip;}
        if (s.stage==='deposit') {grip=carryEnd;where=mix(carryEnd,target,s.progress);}
        if (s.stage==='return') {grip=mix(carryEnd,origin,s.progress);where=target;}
        if (reduced.matches) {grip=origin;where=target;}
        const dx=grip.x-origin.x,dy=grip.y-origin.y;
        moving.setAttribute('transform',`translate(${dx} ${dy})`);
        const end={x:coupling.x+dx,y:coupling.y+dy};
        const elbow={x:(coupling.x+end.x)/2-12,y:(coupling.y+end.y)/2+14};
        const armPath=`M${coupling.x} ${coupling.y}L${elbow.x} ${elbow.y}L${end.x} ${end.y}`;
        arm.setAttribute('d',armPath);armFace.setAttribute('d',armPath);
        elbowJoint.setAttribute('cx',elbow.x);elbowJoint.setAttribute('cy',elbow.y);
        linkage.setAttribute('opacity',reduced.matches?0:Math.min(1,Math.hypot(dx,dy)/8));
        lower.setAttribute('transform',`rotate(${s.stage==='reach'||s.stage==='return'?12:0} 0 0)`);
        const entering=s.stage==='deposit'?s.progress:s.stage==='return'?1:0;
        const fruitScale=1+(finalScale-1)*entering;
        oval.setAttribute('transform',`translate(${where.x} ${where.y}) scale(${fruitScale})`);
        if(entering===1)deposit();
        return s.done;
      };
    } else {
      prepareSound();
      const base = matrix(art);
      const hand = art.querySelector("[data-mauritius-drum-hand]");
      const handLayer = add(effects,"g",{transform:matrixText(base)});
      hide(hand);const handCopy=hand.cloneNode(true);handCopy.removeAttribute("visibility");handLayer.appendChild(handCopy);
      const score = drumScore(run.male); let played = -1;
      render = ms => {
        score.forEach((at,index)=>{if(index>played && ms>=at){played=index;if(ms-at<100)strike(run,index);}});
        const handMove=drumHandOffset(ms,run.male,reduced.matches);
        handLayer.setAttribute("transform",matrixText(base.translate(handMove.x,handMove.y)));
        return ms>2350;
      };
    }
    const began=performance.now();
    function tick(now) {
      if (active!==run) return;
      if (!visible(piece) || document.hidden || fruit&&!visible(basket)) {cancel();return;}
      if (render(now-began)) {cancel();return;}
      raf=requestAnimationFrame(tick);
    }
    render(0);raf=requestAnimationFrame(tick);return true;
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});
  window.addEventListener('pagehide',cancel);window.addEventListener('resize',cancel);
  reduced.addEventListener('change',cancel);
  return {handles,start,cancel,resetGround,get active(){return !!active;}};
}
