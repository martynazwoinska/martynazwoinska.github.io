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
      const fruitScale = Math.hypot(base.a,base.b)/(run.male?.34:.42);
      const origin = point(base,...mouth);
      const basketArt = basket.querySelector('.location-accessory-art');
      const target = point(matrix(basketArt),run.male?55:94,12);
      // The ground pickup is inside the habitat regardless of user tool placement.
      const ground = {x:run.male?155:405,y:310};
      const carryEnd = {x:target.x+5,y:target.y-17};
      const coupling = point(base,run.male?-84:-118,-1);
      const linkage = add(effects,'path',{fill:'none',stroke:'#a34f67','stroke-width':3,'stroke-linecap':'round'});
      const moving = add(effects,'g');
      const copy = art.cloneNode(true); copy.setAttribute('transform',matrixText(base));
      copy.style.transformBox='view-box';copy.style.transformOrigin='0 0';moving.appendChild(copy);
      // Leave the fitted collar and harness in place, extending their linkage.
      const fixed = '.ju2909-body-clamp,.ju2909-grabber-bridge,.ju2909-grabber-harness,.ju2909-grabber-trigger,.ju2909-control-cable';
      copy.querySelectorAll(fixed).forEach(node=>node.remove());
      for (const node of art.children) if (!node.matches(fixed)) hide(node);
      copy.querySelectorAll('.ju2909-woody-nut,.ju2909-nut-groove').forEach(node=>node.remove());
      const lower = copy.querySelector('.ju2909-dodo-lower-beak');
      const oval = add(effects,'g',{'data-mauritius-fruit':run.male?'male':'female'});
      // Reuse the existing anonymous fruit silhouette and palette; only the
      // male's loose fruit is oversized. No source accessory geometry changes.
      const skin = basketArt.querySelector('.ju2909-gathered-fruit').cloneNode(true);
      skin.removeAttribute('class');skin.removeAttribute('transform'); skin.setAttribute('cx',0);skin.setAttribute('cy',0);
      skin.setAttribute('rx',run.male?13:11);skin.setAttribute('ry',run.male?10:8);
      skin.setAttribute('fill','#a34f67');skin.setAttribute('stroke','#253847');skin.setAttribute('stroke-width',1.2);
      oval.appendChild(skin);
      add(oval,'path',{d:'M-6-3Q-3-6 1-5',fill:'none',stroke:'#d99595','stroke-width':1.3,'stroke-linecap':'round'});
      let deposited = false;
      render = ms => {
        const s = fruitFrame(ms,run.male,reduced.matches);
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
        linkage.setAttribute('d',`M${coupling.x} ${coupling.y}Q${coupling.x-12} ${end.y+14} ${end.x} ${end.y}`);
        linkage.setAttribute('opacity',reduced.matches?0:Math.min(1,Math.hypot(dx,dy)/8));
        lower.setAttribute('transform',`rotate(${s.stage==='reach'||s.stage==='return'?12:0} 0 0)`);
        oval.setAttribute('transform',`translate(${where.x} ${where.y}) scale(${fruitScale})`);
        // The loose fruit sinks into the existing dark opening, behind its lip.
        const entering=s.stage==='deposit'?s.progress:s.stage==='return'?1:0;
        oval.setAttribute('opacity',1-entering*.85);
        if (!deposited && entering===1) {deposited=true;piece.dataset.mauritiusCollected=String(Number(piece.dataset.mauritiusCollected||0)+1);}
        return s.done;
      };
    } else {
      prepareSound();
      const base = matrix(art);
      // Copy only the original beaters; the instrument and harness stay fixed.
      const shafts = art.querySelector('.ju2909-beater-shaft');
      const heads = [...art.querySelectorAll('.ju2909-beater-head')];
      const beaters = add(effects,'g',{transform:matrixText(base)});
      [shafts,...heads].forEach(node=>{hide(node);const copy=node.cloneNode(true);copy.removeAttribute('visibility');beaters.appendChild(copy);});
      const score = drumScore(run.male); let played = -1;
      render = ms => {
        score.forEach((at,index)=>{if(index>played && ms>=at){played=index;if(ms-at<100)strike(run,index);}});
        const at=score.reduce((best,t)=>Math.abs(ms-t)<Math.abs(ms-best)?t:best,score[0]);
        const pulse=reduced.matches?0:Math.max(0,1-Math.abs(ms-at)/150);
        // Existing mallet heads meet the upper drum skin, then rebound.
        beaters.setAttribute('transform',matrixText(base.translate(run.male?-35*pulse:0,run.male?70*pulse:75*pulse)));
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
  return {handles,start,cancel,get active(){return !!active;}};
}
