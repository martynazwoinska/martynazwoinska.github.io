import { drawSunscreenTube } from './mahahual-art.js?v=20260917-mahahual-22';
const NS='http://www.w3.org/2000/svg';
export const SWIM='mahahual-reef-ruffle-swim-costumes';
const GLASSES='mahahual-caribbean-sun-spectacles';
const clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x);};
const mix=(a,b,t)=>({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t});
const add=(p,tag,attrs={})=>{const n=document.createElementNS(NS,tag);for(const [k,v]of Object.entries(attrs))n.setAttribute(k,v);p.append(n);return n;};
const matrix=m=>`matrix(${[m.a,m.b,m.c,m.d,m.e,m.f].join(' ')})`;
export function sunscreenFrame(ms,reduced=false){
  if(reduced)return {approach:0,turn:0,reach:0,squeeze:0,rub:0,cream:0,finish:0,done:ms>=250};
  const turn=ms<5400?0:1,t=ms-900-turn*4500;
  const rub=ease((t-1450)/2050);
  return {approach:ease(ms/900)*(1-ease((ms-10100)/1100)),turn,
    reach:ease(t/650)*(1-ease((t-3500)/750)),squeeze:ease((t-750)/450)*(1-ease((t-1250)/300)),
    rub,cream:ease((t-1000)/400)*(1-ease((t-1900)/1600)),finish:ease((ms-9900)/1200),done:ms>=11300};
}
// Recorded hand-lotion application by BigHoly (CC0), with two different takes.
function sound(){
 let context,buffer,loading,level=.3;const voices=new Set();
 function stop(){for(const n of voices){try{n.stop();}catch{}}voices.clear();}
 function prepare(){try{const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;context??=new Audio();context.resume().catch(()=>{});if(buffer||loading)return;
  const abort=new AbortController(),timeout=setTimeout(()=>abort.abort(),4000);loading=fetch(new URL('./assets/audio/mahahual-lotion.mp3',import.meta.url),{signal:abort.signal}).then(r=>{if(!r.ok)throw Error(r.status);return r.arrayBuffer();}).then(b=>context.decodeAudioData(b)).then(b=>{buffer=b;let peak=0;for(const v of b.getChannelData(0))peak=Math.max(peak,Math.abs(v));level=Math.min(.7,.15/Math.max(.01,peak));}).catch(()=>{}).finally(()=>{clearTimeout(timeout);loading=null;});
 }catch{}}
 function play(turn){if(!buffer||context?.state!=='running')return;const n=context.createBufferSource(),g=context.createGain(),now=context.currentTime,offset=turn?6.1:1.2,duration=Math.min(2.1,buffer.duration-offset);if(duration<=0)return;n.buffer=buffer;n.connect(g);g.connect(context.destination);g.gain.setValueAtTime(0,now);g.gain.linearRampToValueAtTime(level,now+.06);g.gain.setValueAtTime(level,now+duration-.13);g.gain.linearRampToValueAtTime(0,now+duration);voices.add(n);n.onended=()=>{voices.delete(n);n.disconnect();g.disconnect();};n.start(now,offset,duration);}
 return {prepare,play,stop};
}
export function createMahahualPlay(habitat,refresh=()=>{}){
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),audio=sound();let run=null,raf=0;
  const handles=p=>p?.dataset.accessoryFamily===SWIM;
  const visible=p=>p?.isConnected&&!p.closest('[hidden]');
  function cancel(){cancelAnimationFrame(raf);raf=0;audio.stop();if(!run)return;const r=run;run=null;for(const [n,v]of r.hidden){if(v===null)n.removeAttribute('visibility');else n.setAttribute('visibility',v);}r.paused.forEach(a=>{if(a.playState==='paused')a.play();});r.effects.remove();delete habitat.dataset.mahahualAction;refresh();}
  function start(piece){
    if(!handles(piece)||!visible(piece))return false;if(run)return true;
    const root=habitat.querySelector('#worm-species'),r={piece,root,hidden:[],paused:[],played:new Set(),began:performance.now(),first:piece.dataset.wormPart==='companion'?'companion':'primary'};run=r;
    r.effects=add(root,'g',{'data-mahahual-effects':'','pointer-events':'none','aria-hidden':'true'});
    // Keep movable umbrellas in front during sunscreen application as well.
    const umbrellas=habitat.querySelector('[data-beach-layer="front"]');
    if(umbrellas?.parentNode===root)root.insertBefore(r.effects,umbrellas);
    const relative=n=>{const m=root.getScreenCTM().inverse().multiply(n.getScreenCTM());return new DOMMatrix([m.a,m.b,m.c,m.d,m.e,m.f]);};
    const hide=n=>{r.hidden.push([n,n.getAttribute('visibility')]);n.setAttribute('visibility','hidden');};
    const pause=n=>{for(const a of n.getAnimations())if(a.playState==='running'){a.pause();r.paused.push(a);}};
    const restingTube=habitat.querySelector('[data-worm-part="sunscreen"] .location-accessory-art');
    if(visible(restingTube))hide(restingTube);
    r.worms={};
    for(const part of ['companion','primary']){
      const male=part==='companion',body=habitat.querySelector(male?'#companion-worm > .companion-body':'#primary-worm > .worm-body');pause(body);
      const layer=add(r.effects,'g',{'data-sunscreen-worm':part}),base=relative(body);
      function copy(node){const wrapper=add(layer,'g',{transform:matrix(relative(node))}),clone=node.cloneNode(true);clone.removeAttribute('id');clone.removeAttribute('transform');clone.style.transform='none';clone.style.animation='none';wrapper.append(clone);hide(node);return clone;}
      copy(body);
      for(const family of [SWIM,GLASSES]){for(const owner of male?[part]:[part,'primary-top']){for(const art of habitat.querySelectorAll(`[data-accessory-family="${family}"][data-worm-part="${owner}"] .location-accessory-art`)){if(visible(art)){pause(art.parentElement);copy(art);}}}}
      const point=(x,y)=>new DOMPoint(x,y).matrixTransform(base);
      r.worms[part]={layer,anchor:point(male?311:262,male?119:133),skin:point(male?289:302,male?119:111),offset:{x:0,y:0},male};
    }
    r.cream=add(r.effects,'g');
    r.smears=[-1,0,1].map((v)=>add(r.cream,'path',{d:`M${v*6-6} ${v*3}Q${v*6} ${v*3-5} ${v*6+7} ${v*3-1}`,fill:'none',stroke:'#fffbed','stroke-width':4,'stroke-linecap':'round'}));
    r.hands=Array.from({length:2},()=>{const group=add(r.effects,'g'),arm=add(group,'path',{fill:'none',stroke:'var(--worm-deep)','stroke-width':9,'stroke-linecap':'round'}),inner=add(group,'path',{fill:'none',stroke:'var(--worm-color)','stroke-width':6,'stroke-linecap':'round'}),palm=add(group,'g');
      add(palm,'path',{d:'M-7 3Q-10-1-7-5Q-5-8-2-5L2-6Q6-6 7-2L8 2Q6 8 0 8Q-4 8-7 3Z',fill:'var(--worm-color)',stroke:'var(--worm-deep)','stroke-width':1.4});
      add(palm,'path',{d:'M-2-4L-1 1M2-5L3 0M5-3L6 1',fill:'none',stroke:'var(--worm-deep)','stroke-width':.85,'stroke-linecap':'round'});return {group,arm,inner,palm};});
    r.tube=drawSunscreenTube(r.effects,true);r.drop=add(r.effects,'path',{d:'M0-3Q-4 0-3 4Q0 7 3 4Q4 1 0-3Z',fill:'#fffbed',stroke:'#d4cbaa','stroke-width':.6});r.effects.append(r.hands[1].palm);
    function hand(h,anchor,end,male,opacity){const bend={x:(anchor.x+end.x)/2,y:Math.max(anchor.y,end.y)+15};const d=`M${anchor.x} ${anchor.y}Q${bend.x} ${bend.y} ${end.x} ${end.y}`;h.arm.setAttribute('d',d);h.inner.setAttribute('d',d);h.arm.setAttribute('stroke-width',male?6:9);h.inner.setAttribute('stroke-width',male?4:6);h.palm.setAttribute('transform',`translate(${end.x} ${end.y}) scale(${male?.72:1})`);h.group.setAttribute('opacity',opacity);h.palm.setAttribute('opacity',opacity);}
    if(!reduced.matches)audio.prepare();
    function tick(now){if(run!==r)return;if(!visible(piece)||document.hidden){cancel();return;}const ms=now-r.began,f=sunscreenFrame(ms,reduced.matches),giverPart=f.turn===0?r.first:r.first==='primary'?'companion':'primary',otherPart=giverPart==='primary'?'companion':'primary';
      const giver=r.worms[giverPart],receiver=r.worms[otherPart];
      for(const [part,w]of Object.entries(r.worms)){const swap=ease((ms-4950)/900),extra=r.first==='companion'?1-swap:swap,close=part==='companion'?60+12*extra:-15;w.offset={x:close*f.approach,y:(part==='companion'?-46:26)*f.approach};w.layer.setAttribute('transform',`translate(${w.offset.x} ${w.offset.y})`);}
      const shifted=(w,p)=>({x:p.x+w.offset.x,y:p.y+w.offset.y}),anchor=shifted(giver,giver.anchor),skin=shifted(receiver,receiver.skin),rest={x:anchor.x+12,y:anchor.y+29};
      const envelope=Math.sin(Math.PI*f.rub),rubbing={x:skin.x+Math.sin(f.rub*Math.PI*6)*7*envelope,y:skin.y+Math.sin(f.rub*Math.PI*6+Math.PI/2)*3*envelope};
      const palm=mix(rest,rubbing,f.reach),bottle={x:anchor.x+(giver.male?17:-17),y:anchor.y+30};
      hand(r.hands[0],anchor,palm,giver.male,f.reach);
      const nozzle=mix({x:bottle.x,y:bottle.y+18},{x:skin.x,y:skin.y-13},f.squeeze),tubeScale=giver.male?.72:.9;
      hand(r.hands[1],{x:anchor.x+8,y:anchor.y+8},{x:nozzle.x+12*tubeScale,y:nozzle.y-26*tubeScale},giver.male,f.reach);
      r.tube.setAttribute('transform',`translate(${nozzle.x} ${nozzle.y-27*tubeScale}) scale(${tubeScale*(1-f.squeeze*.09)} ${tubeScale})`);r.tube.setAttribute('opacity',f.reach);
      r.drop.setAttribute('transform',`translate(${skin.x} ${skin.y-8*(1-f.squeeze)})`);r.drop.setAttribute('opacity',f.squeeze);
      r.cream.setAttribute('transform',`translate(${skin.x} ${skin.y}) scale(${giver.male?1:.68})`);r.cream.setAttribute('opacity',f.cream);
      habitat.dataset.mahahualAction=`${giverPart}-applying`;
      const t=ms-900-f.turn*4500;if(t>=1450&&!r.played.has(f.turn)){r.played.add(f.turn);if(!reduced.matches&&t-1450<150)audio.play(f.turn);}
      if(f.done){cancel();return;}raf=requestAnimationFrame(tick);
    }
    tick(r.began);return true;
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});window.addEventListener('resize',cancel);window.addEventListener('pagehide',cancel);reduced.addEventListener('change',cancel);
  return {handles,start,cancel,get active(){return !!run;}};
}
