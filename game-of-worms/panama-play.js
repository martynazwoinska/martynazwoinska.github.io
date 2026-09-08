import { createLeafCutRun, resetLeafCut, LEAF_FAMILY } from './panama-leaf-cutting.js?v=20260908-snip-2';
import { createLeafCutSound } from './panama-leaf-audio.js?v=20260908-snip-2';
const NS='http://www.w3.org/2000/svg';
const kinds={'qg2726-gustavia-flower-headpiece':'flower','qg2726-flower-bait':'bait',[LEAF_FAMILY]:'leaf'};
const clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x);};
const add=(g,t,a={})=>{const n=document.createElementNS(NS,t);Object.entries(a).forEach(([k,v])=>n.setAttribute(k,v));g.appendChild(n);return n;};
const path=(g,d,fill,stroke='#37666a',width=1.2)=>add(g,'path',{d,fill,stroke,'stroke-width':width,'stroke-linecap':'round','stroke-linejoin':'round'});

export function closedPetalPath(open,closed,fold){
  const numbers=/-?\d*\.?\d+/g,from=open.match(numbers).map(Number);
  let index=0;
  if(fold<=0)return open;
  if(fold>=1)return closed;
  return closed.replace(numbers,value=>{const start=from[index++];return String(start+(Number(value)-start)*fold);});
}

export function panamaFrame(ms,kind,male=false,reduced=false){
  const duration=reduced?1000:kind==='bait'?3800:kind==='flower'?2900:3200;
  const q=clamp(ms/duration),env=q===1?0:Math.sin(Math.PI*q)**2;
  if(ms>=duration)return {done:true,served:true,angle:0,fold:0,travel:0,power:0,phase:0,env:0};
  if(reduced)return {done:ms>=duration,served:true,angle:0,fold:0,travel:kind==='bait'&&male?1:0,power:kind==='bait'?1:0,phase:0,env:0};
  return {done:ms>=duration,served:ms>=1550,phase:ms/1000,env,
    angle:env?(male?-22:17)*Math.sin(q*Math.PI*(male?10:8))*env:0,
    fold:ease(ms/700)*(1-ease((ms-1400)/600)),
    travel:ease((ms-650)/900)*(1-ease((ms-2450)/700)),
    power:ease((ms-350)/400)*(1-ease((ms-2650)/500))};
}

function glove(g){
  const h=add(g,'g');
  path(h,'M-5 4Q-8 0-5-4L-3-7Q0-9 2-5Q5-7 7-3L7 3Q5 8-2 7Z','#fff0dc');
  path(h,'M-4 3Q-10 0-8-4Q-6-5-3-1L0 1','#f3dbc0');
  path(h,'M-1-4V0M3-4V0','none','#b68c79',.65);
  return h;
}

export function createPanamaPlay(habitat){
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let active=null,raf=0,audio=null,sound=null;
  const leafSound=createLeafCutSound(()=>audio);
  const handles=piece=>!!kinds[piece?.dataset.accessoryFamily];
  function stopSound(){leafSound.stop();if(sound){try{sound.stop();}catch{}sound=null;}}
  function cancel(complete=false){
    cancelAnimationFrame(raf);raf=0;stopSound();
    if(!active)return;
    const run=active;
    for(const [node,attrs] of run.saved)for(const [key,value] of Object.entries(attrs)){if(value===null)node.removeAttribute(key);else node.setAttribute(key,value);}
    for(const [node,style] of run.anchors){if(style===null)node.removeAttribute('style');else node.setAttribute('style',style);}
    if(complete&&run.kind==='bait'&&run.male){run.piece.querySelector('[data-panama-serving]').setAttribute('opacity',1);run.piece.querySelector('[data-panama-spoonful]').setAttribute('opacity',0);}
    if(complete&&run.leafRun)run.leafRun.finish();
    run.effects.remove();delete run.piece.dataset.panamaAction;active=null;
  }
  function playSound(kind){
    if(reduced.matches)return;
    if(kind==='snip'){leafSound.play();return;}
    try{
      const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;
      audio??=new Audio();audio.resume().catch(()=>{});
      const gain=audio.createGain(),filter=audio.createBiquadFilter();let source;
      const duration=kind==='bait'?3.2:1;
      if(kind==='bait'){
        source=audio.createOscillator();source.type='sawtooth';source.frequency.setValueAtTime(70,audio.currentTime);source.frequency.linearRampToValueAtTime(125,audio.currentTime+.7);
        filter.type='lowpass';filter.frequency.value=650;
      }else{
        source=audio.createBufferSource();const buffer=audio.createBuffer(1,Math.ceil(audio.sampleRate*duration),audio.sampleRate),data=buffer.getChannelData(0);
        for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*Math.sin(i/audio.sampleRate*Math.PI*3.2)**2;
        source.buffer=buffer;filter.type='lowpass';filter.frequency.value=1600;
      }
      const now=audio.currentTime,level=kind==='bait'?.025:.035;
      gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(level,now+.18);gain.gain.setValueAtTime(level,now+duration-.25);gain.gain.linearRampToValueAtTime(0,now+duration);
      source.connect(filter);filter.connect(gain);gain.connect(audio.destination);sound=source;
      source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();if(sound===source)sound=null;};source.start();source.stop(now+duration);
    }catch{}
  }
  function start(piece){
    if(!handles(piece)||!piece.isConnected||piece.closest('[hidden]'))return false;
    cancel();
    const root=habitat.querySelector('#worm-species'),male=piece.dataset.wormPart==='companion',kind=kinds[piece.dataset.accessoryFamily];
    const body=habitat.querySelector(male?'#companion-worm .companion-body':'#primary-worm .worm-body');
    const art=piece.querySelector('.location-accessory-art');if(!root||!body||!art)return false;
    const effects=add(root,'g',{'data-panama-effects':'','aria-hidden':'true','pointer-events':'none'});
    const run={piece,root,male,kind,body,art,effects,saved:new Map(),anchors:[]};active=run;piece.dataset.panamaAction=kind;
    const remember=(n,keys=['transform'])=>{if(n&&!run.saved.has(n))run.saved.set(n,Object.fromEntries(keys.map(k=>[k,n.getAttribute(k)])));return n;};
    // Pin scaling origins before animating descendants, preserving drag and size.
    const pinned=new Set();
    const pin=n=>{if(!n||pinned.has(n))return;pinned.add(n);const box=n.getBBox();run.anchors.push([n,n.getAttribute('style')]);n.style.transformBox='view-box';n.style.transformOrigin=`${box.x+box.width/2}px ${box.y+box.height/2}px`;};
    for(const n of [piece,art])pin(n);
    if(kind==='leaf'){
      // Unlock audio inside the input gesture. The snip itself follows blade contact.
      try{const Audio=window.AudioContext||window.webkitAudioContext;if(Audio&&!reduced.matches){audio??=new Audio();audio.resume().catch(()=>{});leafSound.prepare();}}catch{}
      const leafRun=createLeafCutRun({habitat,root,effects,remember,pin,reduced:reduced.matches,snip:()=>playSound('snip')});run.leafRun=leafRun;
      if(!leafRun){cancel();return false;}
      const began=performance.now();
      const tick=now=>{if(active!==run)return;if(!piece.isConnected||piece.closest('[hidden]')||document.hidden){cancel();return;}if(leafRun.frame(now-began)){cancel(true);return;}raf=requestAnimationFrame(tick);};
      raf=requestAnimationFrame(tick);return true;
    }
    const flower=remember(piece.querySelector('[data-panama-flower]'));
    const spoon=remember(piece.querySelector('[data-panama-spoon]'));
    const petals=remember(piece.querySelector('[data-panama-petals]'),['transform','opacity']);
    const swirl=remember(piece.querySelector('[data-panama-swirl]'),['transform','opacity']);
    const dial=remember(piece.querySelector('[data-panama-dial]'));
    const serving=remember(piece.querySelector('[data-panama-serving]'),['opacity']);
    const spoonful=remember(piece.querySelector('[data-panama-spoonful]'),['opacity']);
    const flowerPetals=[...piece.querySelectorAll('[data-panama-petal]')].map(n=>remember(n));
    const closingPetals=[...piece.querySelectorAll('[data-panama-closed-petal]')].map(n=>remember(n,['d']));
    const stamens=remember(piece.querySelector('[data-panama-stamens]'),['transform','opacity']);
    const budSeam=remember(piece.querySelector('[data-panama-bud-seam]'),['opacity']);
    const arms=kind==='flower'?[]:Array.from({length:kind==='bait'&&!male?2:1},()=>({line:path(effects,'','none','#437f80',male?3.8:5.3),light:path(effects,'','none','#a9d8cd',male?1.5:2),hand:glove(effects)}));
    const point=(node,x,y)=>new DOMPoint(x,y).matrixTransform(root.getScreenCTM().inverse().multiply(node.getScreenCTM()));
    const original=n=>run.saved.get(n)?.transform||'';
    const began=performance.now();if(!(kind==='bait'&&male))playSound(kind);
    function tick(now){
      if(active!==run)return;
      if(!piece.isConnected||piece.closest('[hidden]')||document.hidden){cancel();return;}
      const s=panamaFrame(now-began,kind,male,reduced.matches);if(s.done){cancel(true);return;}
      let targets=[];
      if(kind==='flower'){
        if(male){
          // Fold the existing petals around their fixed base, without a stem or hand.
          closingPetals.forEach(n=>n.setAttribute('d',closedPetalPath(run.saved.get(n).d,n.getAttribute('data-panama-closed-petal'),s.fold)));
          stamens?.setAttribute('opacity',Math.max(0,1-s.fold*2.2));
          budSeam?.setAttribute('opacity',s.fold*.7);
          stamens?.setAttribute('transform',`translate(4 28) scale(${1-s.fold*.75} ${1-s.fold*.3}) translate(-4 -28)`);
        }else{
          const shake=now-began>1400?s.angle*.55:0;
          flower.setAttribute('transform',`${original(flower)} translate(0 ${s.fold*47}) rotate(${shake})`);
          flowerPetals.forEach(n=>n.setAttribute('transform',`${original(n)} scale(${1-s.fold*.18} ${1-s.fold*.48})`));
        }
      }else if(male){
        serving.setAttribute('opacity',s.served?1:0);spoonful.setAttribute('opacity',s.served?0:1);
        spoon.setAttribute('transform',`translate(${94*s.travel} ${43*s.travel-45*Math.sin(Math.PI*s.travel)}) ${original(spoon)} rotate(${s.travel*35})`);
        targets=[point(spoon,3,-77)];
      }else{
        petals.setAttribute('transform',`translate(${-3+s.power*4*Math.sin(s.phase*30)} ${s.power*12}) rotate(${s.power*Math.sin(s.phase*24)*12} 0 -85)`);
        petals.setAttribute('opacity',1-s.power*.83);swirl.setAttribute('opacity',s.power*.75);
        swirl.setAttribute('transform',`translate(${s.power*Math.sin(s.phase*26)*2} 0)`);
        dial.setAttribute('transform',`rotate(${s.power*65} -2 37)`);
        targets=[point(art,-2,37),point(art,-14,-167)];
      }
      arms.forEach((arm,i)=>{
        const operating=kind==='bait'&&!male;
        const from=operating?point(body,i?303:214,i?106:163):point(body,304,101),to=targets[i]||targets[0];
        const bend=male?10:15;const d=`M${from.x} ${from.y}Q${from.x-bend} ${from.y+18} ${(from.x+to.x)/2-(operating&&!i?20:0)} ${(from.y+to.y)/2+12}Q${to.x-9} ${to.y+9} ${to.x} ${to.y}`;
        arm.line.setAttribute('d',d);arm.light.setAttribute('d',d);arm.hand.setAttribute('transform',`translate(${to.x} ${to.y}) scale(${male?.65:.9})`);
        arm.line.setAttribute('opacity',reduced.matches?1:ease((now-began)/220));arm.light.setAttribute('opacity',reduced.matches?1:ease((now-began)/220));
      });
      raf=requestAnimationFrame(tick);
    }
    raf=requestAnimationFrame(tick);return true;
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});window.addEventListener('pagehide',()=>cancel());reduced.addEventListener('change',()=>cancel());
  window.addEventListener('resize',()=>cancel());
  function reset(piece){cancel();if(piece?.dataset.accessoryFamily===LEAF_FAMILY)resetLeafCut(habitat);piece?.querySelector('[data-panama-serving]')?.setAttribute('opacity',0);piece?.querySelector('[data-panama-spoonful]')?.setAttribute('opacity',1);}
  return {handles,start,cancel,reset,get active(){return !!active;}};
}
