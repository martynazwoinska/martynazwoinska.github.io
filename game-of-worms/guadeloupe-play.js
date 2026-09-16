import { DANCE_DURATION, drumPhrase, bendPoint, wingAngle, handLift, pathPoints, bentPath } from "./guadeloupe-dance.js?v=20260916-gwoka-11";
const NS='http://www.w3.org/2000/svg';
export const DRUM='guadeloupe-gwoka-drum';
const COSTUME='guadeloupe-hummingbird-costume';
const matrixText=m=>`matrix(${[m.a,m.b,m.c,m.d,m.e,m.f].join(' ')})`;
const add=(parent,tag,attrs={})=>{
  const n=document.createElementNS(NS,tag);
  for(const [k,v] of Object.entries(attrs))n.setAttribute(k,v);
  parent.appendChild(n);return n;
};

export function drawGuadeloupeHands(group,male) {
  for(const side of [-1,1]){
    const hand=add(group,'g',{'data-gua-hand':side,transform:`translate(${side*(male?20:29)} ${male?-58:-54}) scale(${male?.72:.9}) rotate(${side*12})`});
    add(hand,'path',{d:'M-8 12L-11 0L-11-13Q-9-18-7-12L-4-3L-5-20Q-3-25 0-19L2-5L3-22Q6-26 8-20L8-4L11-16Q14-20 16-14L14 2L19-2Q25-2 22 4L12 15Q2 20-8 12Z',
      fill:male?'#efb999':'#f5c5a4',stroke:'#865a45','stroke-width':2.3,'stroke-linejoin':'round'});
    add(hand,'path',{d:'M-3 5Q3 2 10 5M0 10L8 11',fill:'none',stroke:'#b78162','stroke-width':1.2});
  }
}

// Real conga recordings used as hand-drum foley, at their original pitch.
export function createGuadeloupeSound() {
  let context,loading;const clips=new Map(),voices=new Set();
  function stop(){for(const v of voices){try{v.stop();}catch{}}voices.clear();}
  function prepare(){
    try {
      const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return Promise.resolve();
      context??=new Audio();const unlocked=context.resume().catch(()=>{});
      if(!loading)loading=Promise.all(['low','open','muted'].filter(tone=>!clips.has(tone)).map(async tone=>{
        const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),4000);
        try{
          const response=await fetch(new URL(`./assets/audio/guadeloupe-${tone}.mp3`,import.meta.url),{signal:controller.signal});
          if(!response.ok)throw Error(response.status);
          const buffer=await context.decodeAudioData(await response.arrayBuffer());
          const samples=buffer.getChannelData(0);let peak=0;
          for(const x of samples)peak=Math.max(peak,Math.abs(x));
          const first=samples.findIndex(x=>Math.abs(x)>peak*.06);
          clips.set(tone,{buffer,onset:Math.max(0,first/buffer.sampleRate-.002),gain:Math.min(2,.24/Math.max(.01,peak))});
        }catch{/* A failed sample never substitutes a synthetic sound. */}
        finally{clearTimeout(timeout);}
      })).finally(()=>{loading=null;});
      return Promise.all([unlocked,loading]);
    }catch{return Promise.resolve();}
  }
  function play(tone,delay=0,accent=1){
    const clip=clips.get(tone);if(!clip||context?.state!=='running')return false;
    const source=context.createBufferSource(),gain=context.createGain(),now=context.currentTime+delay;
    const duration=Math.min(.65,clip.buffer.duration-clip.onset);
    source.buffer=clip.buffer;source.connect(gain);gain.connect(context.destination);
    gain.gain.setValueAtTime(clip.gain*accent,now);
    gain.gain.setValueAtTime(clip.gain*accent,now+Math.max(0,duration-.07));
    gain.gain.linearRampToValueAtTime(0,now+duration);
    if(voices.size>=24){const oldest=voices.values().next().value;try{oldest.stop();}catch{}voices.delete(oldest);}
    voices.add(source);source.onended=()=>{voices.delete(source);source.disconnect();gain.disconnect();};
    source.start(now,clip.onset,duration);return true;
  }
  function phrase(score){stop();for(const hit of score)play(hit.tone,hit.at/1000,hit.accent);}
  return {prepare,play,phrase,stop};
}

export function createGuadeloupePlay(habitat) {
  const quiet=matchMedia('(prefers-reduced-motion: reduce)'),sound=createGuadeloupeSound();
  let run=null,raf=0,request=0,pending=false;
  const handles=p=>p?.dataset.accessoryFamily===DRUM;
  const visible=n=>n?.isConnected&&!n.closest('[hidden]');
  const find=(family,part)=>habitat.querySelector(`.accessory-piece[data-accessory-family="${family}"][data-worm-part="${part}"]`);
  function cancel(){
    request++;pending=false;cancelAnimationFrame(raf);raf=0;sound.stop();
    if(!run)return;
    for(const [node,value] of run.hidden)if(value===null)node.removeAttribute('visibility');else node.setAttribute('visibility',value);
    for(const animation of run.paused)if(animation.playState==='paused')animation.play();
    run.effects.remove();delete habitat.dataset.guadeloupeDrummer;delete habitat.dataset.guadeloupeStep;
    run=null;
  }
  function build(piece){
    const root=habitat.querySelector('#worm-species'),male=piece.dataset.wormPart==='companion';
    const part=male?'primary':'companion',body=habitat.querySelector(male?'.worm-body':'.companion-body');
    const r={piece,male,hidden:[],paused:[],flex:[],wings:[],hands:[]};
    for(const b of habitat.querySelectorAll('.worm-body,.companion-body,.fitted-headwear-motion')){
      for(const a of b.getAnimations())if(a.playState==='running'){a.pause();r.paused.push(a);}
    }
    r.effects=add(root,'g',{'data-guadeloupe-effects':'','pointer-events':'none','aria-hidden':'true'});
    r.dance=add(r.effects,'g',{'data-guadeloupe-dancer':part});
    const relative=node=>root.getScreenCTM().inverse().multiply(node.getScreenCTM());
    const hide=node=>{r.hidden.push([node,node.getAttribute('visibility')]);node.setAttribute('visibility','hidden');};
    function clone(node,parent){
      const base=relative(node),layer=add(parent,'g',{transform:matrixText(base)}),copy=node.cloneNode(true);
      copy.removeAttribute('transform');copy.removeAttribute('id');copy.removeAttribute('visibility');
      copy.style.transform='none';copy.style.animation='none';copy.style.transition='none';
      copy.style.filter=getComputedStyle(node).filter;
      // Pattern paint servers must live in the visible dance copy. Referencing
      // the hidden original loses the cloth fill in some SVG renderers.
      const paints=new Map();
      copy.querySelectorAll('[id]').forEach(n=>{
        if(n.tagName.toLowerCase()==='pattern'){
          const id=n.getAttribute('id');paints.set(id,`${id}-dance`);n.setAttribute('id',`${id}-dance`);
        }else n.removeAttribute('id');
      });
      copy.querySelectorAll('[fill]').forEach(n=>{
        const fill=n.getAttribute('fill');
        for(const [id,next] of paints)if(fill===`url(#${id})`)n.setAttribute('fill',`url(#${next})`);
      });
      layer.append(copy);hide(node);
      return {base,layer,copy};
    }
    const bodyCopy=clone(body,r.dance).copy;
    const flex=n=>r.flex.push({node:n,points:pathPoints(n.getAttribute('d'))});
    bodyCopy.querySelectorAll('path').forEach(flex);
    const costume=find(COSTUME,part);
    if(visible(costume)){
      const {copy}=clone(costume.querySelector('.location-accessory-art'),r.dance);
      copy.querySelectorAll('[data-gua-flex]').forEach(flex);
      copy.querySelectorAll('[data-gua-wing]').forEach(g=>r.wings.push({g,side:Number(g.dataset.guaWing),x:Number(g.dataset.hingeX),y:Number(g.dataset.hingeY)}));
    }
    // Keep the quiet crown above the copied face, in its original position.
    const crown=find('guadeloupe-madras-carnival-crown',part);
    if(visible(crown))clone(crown.querySelector('.location-accessory-art'),r.dance);
    // The drummer's instrument stays exactly where the visitor placed it.
    for(const hand of piece.querySelectorAll('[data-gua-hand]')){
      const h=clone(hand,r.effects);r.hands.push(h);
    }
    return r;
  }
  function beat(piece){
    const male=piece.dataset.wormPart==='companion';
    cancel();run=build(piece);
    const r=run;r.score=drumPhrase(male);r.began=performance.now();
    habitat.dataset.guadeloupeDrummer=piece.dataset.wormPart;
    if(!quiet.matches)sound.phrase(r.score);
    cancelAnimationFrame(raf);
    function tick(now){
      if(run!==r)return;
      if(!visible(piece)||document.hidden){cancel();return;}
      const ms=now-r.began;
      for(const f of r.flex)f.node.setAttribute('d',bentPath(f.points,ms,quiet.matches));
      for(const w of r.wings){const p=bendPoint(w.x,w.y,ms,quiet.matches);w.g.setAttribute('transform',`translate(${p.x} ${p.y}) rotate(${wingAngle(ms,w.side,quiet.matches)})`);}
      r.hands.forEach((h,i)=>{
        const lift=handLift(ms,r.score,i,quiet.matches);
        h.layer.setAttribute('transform',matrixText(h.base.translate(0,lift)));
      });
      if(ms>=(quiet.matches?240:DANCE_DURATION)){cancel();return;}raf=requestAnimationFrame(tick);
    }
    tick(r.began);
  }
  function start(piece){
    if(!handles(piece)||!visible(piece))return false;
    if(run?.piece===piece)return true;
    const token=++request,started=performance.now();pending=true;
    // Decode only after a gesture, and never play an old queued tap.
    Promise.resolve(quiet.matches?null:sound.prepare()).then(()=>{
      if(token!==request)return;
      pending=false;
      if(visible(piece)&&!document.hidden&&performance.now()-started<4500)beat(piece);
    });
    return true;
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});
  window.addEventListener('pagehide',cancel);window.addEventListener('resize',cancel);quiet.addEventListener('change',cancel);
  return {handles,start,cancel,get active(){return !!run||pending;}};
}
