import {COMPOST,MATE,FOOD,element} from './araucania-art.js?v=20260909-araucania-bites-5';
const clamp=n=>Math.max(0,Math.min(1,n));
export const ease=n=>{n=clamp(n);return n*n*(3-2*n);};
export const envelope=t=>ease(t/.2)*(1-ease((t-.76)/.24));
export const actionFor=(family,small,empty)=>family===COMPOST?(small?'fork':empty?'ride':'tip'):family===MATE?(small?'pour':'sip'):small?'eat':'roll';
export const durations={tip:2600,fork:2100,ride:4300,pour:2800,sip:1900,roll:2400,eat:3000};
export const breadBites=[.29,.52,.72];
export function eatingFrame(t){
  const retreat=.14*Math.sin(Math.PI*clamp((t-.32)/.17))+.1*Math.sin(Math.PI*clamp((t-.55)/.14));
  return {reach:ease(t/.23)*(1-ease((t-.81)/.19))*(1-retreat),bite:breadBites.filter(at=>t>=at).length,chewing:t>=.27&&t<.89};
}
export const pourWindow={start:.36,end:.63};
export const slurpSeconds=.32;
export function fillSlurpSound(data,sampleRate,random=Math.random){
  const duration=data.length/sampleRate;
  for(let i=0;i<data.length;i++){
    const t=i/sampleRate,shape=ease(t/.025)*ease((duration-t)/.055);
    const suction=(random()*2-1)*(.25+.6*Math.sin(Math.PI*t/duration)**2);
    data[i]=shape*(suction+.2*Math.sin(2*Math.PI*(600*t+900*t*t)));
  }
}
// A quiet continuous trickle with irregular, short water resonances.
export function fillPourSound(data,sampleRate,random=Math.random){
  const duration=data.length/sampleRate,soften=1-Math.exp(-2*Math.PI*900/sampleRate);
  let flow=0;
  for(let i=0;i<data.length;i++){flow+=soften*((random()*2-1)-flow);data[i]=flow*.12;}
  for(let start=.012;start<duration-.045;start+=.012+random()*.022){
    const frequency=450+random()*1650,decay=.008+random()*.014,amplitude=.12+random()*.1;
    const onset=Math.floor(start*sampleRate),length=Math.min(data.length-onset,Math.ceil(decay*5*sampleRate));
    for(let j=0;j<length;j++){const t=j/sampleRate,attack=1-Math.exp(-t/.0015);
      data[onset+j]+=amplitude*attack*Math.exp(-t/decay)*Math.sin(2*Math.PI*frequency*(t+1.8*t*t));}
  }
  for(let i=0;i<data.length;i++){const t=i/sampleRate;data[i]*=ease(t/.04)*ease((duration-t)/.055);}
}
const path=(d,attrs={})=>element('path',{d,fill:'none','stroke-linecap':'round','stroke-linejoin':'round',...attrs});
const local=(node,x,y,parent)=>new DOMPoint(x,y).matrixTransform(parent.getScreenCTM().inverse().multiply(node.getScreenCTM()));
let passengerSerial=0;

// Gesture-only short foley. One voice at a time, also stopped during handovers.
export function createGardenSound(){
  let ctx,voice;
  const stop=()=>{if(voice){try{voice.stop();}catch{}voice=null;}};
  async function prepare(){try{const A=window.AudioContext||window.webkitAudioContext;if(!A)return;if(!ctx)ctx=new A();await ctx.resume();}catch{}}
  function play(kind){
    stop();if(!ctx||ctx.state!=='running'||document.hidden)return;
    const duration=kind==='pour'?durations.pour*(pourWindow.end-pourWindow.start)/1000:kind==='wheel'?.45:kind==='sip'?slurpSeconds:.2;
    const source=ctx.createBufferSource(),b=ctx.createBuffer(1,Math.ceil(ctx.sampleRate*duration),ctx.sampleRate),data=b.getChannelData(0);
    if(kind==='pour')fillPourSound(data,ctx.sampleRate);
    else if(kind==='sip')fillSlurpSound(data,ctx.sampleRate);
    else for(let i=0;i<data.length;i++){const t=i/ctx.sampleRate,w=Math.sin(Math.PI*t/duration)**2;
      data[i]=w*(kind==='wheel'?.4*Math.sin(2*Math.PI*(420*t+25*Math.sin(t*14))):kind==='wood'?(Math.random()*2-1)*Math.exp(-t*22):(Math.random()*2-1)*(.5+.3*Math.sin(t*(kind==='sip'?140:60))));}
    source.buffer=b;const filter=ctx.createBiquadFilter(),gain=ctx.createGain();filter.type='bandpass';filter.frequency.value=kind==='wood'?600:kind==='wheel'?650:1300;filter.Q.value=.8;gain.gain.value=.035;
    if(kind==='pour'){filter.type='lowpass';filter.frequency.value=2400;filter.Q.value=.55;gain.gain.value=.028;}
    if(kind==='sip'){filter.frequency.value=1250;filter.Q.value=1.8;gain.gain.value=.038;}
    source.connect(filter);filter.connect(gain);gain.connect(ctx.destination);voice=source;source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();if(voice===source)voice=null;};source.start();
  }
  return {prepare,play,stop};
}

export function createAraucaniaPlay(habitat,onChange=()=>{}){
  const sound=createGardenSound(),reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let run=null,raf=0,pending=null,empty=false,rolled=false,sipSmall=false,servings=0;
  const handles=p=>[COMPOST,MATE,FOOD].includes(p?.dataset.accessoryFamily);
  const visible=p=>p?.isConnected&&!p.closest('[hidden]');
  const pieceOf=(family,part)=>habitat.querySelector(`[data-accessory-family="${family}"][data-worm-part="${part}"]`);
  const artOf=p=>p.querySelector('.location-accessory-art');
  function updateState(){
    const cart=pieceOf(COMPOST,'primary');cart?.querySelector('[data-compost-load]')?.setAttribute('opacity',empty?'0':'1');
    pieceOf(FOOD,'companion')?.querySelectorAll('[data-serving]').forEach(n=>n.setAttribute('opacity',Number(n.dataset.serving)<servings?'0':'1'));
  }
  function cancel(){pending=null;cancelAnimationFrame(raf);raf=0;sound.stop();if(run){const old=run;run=null;old.restore();}delete habitat.dataset.gardenActivity;updateState();onChange();}
  function clear(){cancel();empty=false;rolled=false;sipSmall=false;servings=0;updateState();}
  function reset(p){cancel();if(p?.dataset.accessoryFamily===COMPOST)empty=false;if(p?.dataset.accessoryFamily===FOOD){rolled=false;servings=0;}updateState();}
  function build(piece,kind){
    const svg=piece.ownerSVGElement,art=artOf(piece),small=piece.dataset.wormPart==='companion';
    const cleanups=[],checks=[piece],effects=element('g',{'data-garden-effects':kind,'aria-hidden':'true','pointer-events':'none'});svg.append(effects);
    cleanups.push(()=>effects.remove());
    // Freeze stable user-size pivots while internal objects move or open.
    for(const p of [...habitat.querySelectorAll('[data-araucania-art]')].map(n=>n.closest('.accessory-piece'))){
      for(const n of [p,artOf(p)]){const box=n.getBBox(),values=['transform-box','transform-origin'].map(k=>[k,n.style.getPropertyValue(k)]);
        n.style.setProperty('transform-box','view-box');n.style.setProperty('transform-origin',`${box.x+box.width/2}px ${box.y+box.height/2}px`);
        cleanups.push(()=>values.forEach(([k,v])=>v?n.style.setProperty(k,v):n.style.removeProperty(k)));}
    }
    const body=habitat.querySelector(small?'.companion-body':'.worm-body');
    for(const b of habitat.querySelectorAll('.worm-body,.companion-body')){const value=b.style.animationPlayState;b.style.animationPlayState='paused';cleanups.push(()=>b.style.animationPlayState=value);}
    function keep(n,key){const v=n.getAttribute(key);cleanups.push(()=>v===null?n.removeAttribute(key):n.setAttribute(key,v));}
    function wrap(n){const g=element('g',{'data-garden-motion':''});n.before(g);g.append(n);cleanups.push(()=>g.replaceWith(n));return g;}
    function arm(b,target,x,y,anchor=[265,131],offset=0){
      const edge=path('',{stroke:'#b69a6b','stroke-width':6}),limb=path('',{stroke:'#e8cc96','stroke-width':4.4}),hand=element('ellipse',{rx:3.3,ry:4.2,fill:'#f4dfb1',stroke:'#ab9065','stroke-width':.9});effects.append(edge,limb,hand);
      return strength=>{const a=local(b,anchor[0],anchor[1],effects),z=local(target,x,y,effects);const dx=z.x-a.x,dy=z.y-a.y;
        const d=`M${a.x} ${a.y}C${a.x+dx*.15+offset} ${a.y+dy*.7+8} ${a.x+dx*.75+offset} ${z.y+5} ${z.x} ${z.y}`;edge.setAttribute('d',d);limb.setAttribute('d',d);hand.setAttribute('cx',z.x);hand.setAttribute('cy',z.y);for(const n of[edge,limb,hand])n.setAttribute('opacity',strength);};
    }
    function moveTo(n,target,x,y,tx,ty){const wrapper=wrap(n);return weight=>{wrapper.removeAttribute('transform');const a=local(n,x,y,wrapper.parentElement),b=local(target,tx,ty,wrapper.parentElement);wrapper.setAttribute('transform',`translate(${(b.x-a.x)*weight} ${(b.y-a.y)*weight})`);};}
    let frame=()=>{},finish=()=>{},soundKind='wood',soundAt=.3;
    if(kind==='tip'||kind==='ride'){
      const cart=art.querySelector('[data-cart]'),load=cart.querySelector('[data-compost-load]'),wheel=cart.querySelector('[data-cart-wheel]');keep(cart,'transform');keep(load,'opacity');keep(wheel,'transform');
      const a1=arm(body,cart,-133,-49,[242,135],-4),a2=arm(body,cart,-123,-35,[260,128],7);
      if(kind==='tip'){
        const crumbs=element('g');effects.append(crumbs);for(let i=0;i<12;i++)crumbs.append(element('ellipse',{rx:1.8+i%3,ry:1.4,fill:i%3?'#695039':'#a3a273'}));
        frame=(t,s)=>{const e=envelope(t)*s,tilt=ease((t-.2)/.25)*(1-ease((t-.63)/.3))*s;cart.setAttribute('transform',`translate(${12*e} ${-3*e}) rotate(${38*tilt} 76 47)`);wheel.setAttribute('transform',`rotate(${32*e} 76 47)`);load.setAttribute('opacity',1-ease((t-.37)/.15));a1(e);a2(e);
          const p=local(cart,74,-41,effects);[...crumbs.children].forEach((n,i)=>{const q=clamp((t-.38-i*.008)/.23);n.setAttribute('cx',p.x+q*(9+i*.6));n.setAttribute('cy',p.y+q*q*28);n.setAttribute('opacity',t>.38&&t<.7?s*(1-q):0);});};finish=()=>{empty=true;};soundKind='soil';soundAt=.4;
      }else{
        const male=habitat.querySelector('.companion-body'),slot=cart.querySelector('[data-passenger-slot]');
        const passenger=male.cloneNode(true);passenger.removeAttribute('class');passenger.setAttribute('data-garden-passenger','');for(const n of passenger.querySelectorAll('[id]'))n.removeAttribute('id');
        // Existing worm shapes and expression, placed inside the tray behind its near wall.
        const holder=element('g');slot.append(holder);holder.append(passenger);cleanups.push(()=>holder.remove());keep(male,'visibility');
        const clipId=`garden-passenger-${++passengerSerial}`,defs=element('defs'),clip=element('clipPath',{id:clipId});clip.append(path('M-69-150H91V-45L55 12Q-4 24-49 4Z'));defs.append(clip);slot.append(defs);cleanups.push(()=>defs.remove());keep(slot,'clip-path');
        const matrix=slot.getScreenCTM().inverse().multiply(male.getScreenCTM()),start=[matrix.a,matrix.b,matrix.c,matrix.d,matrix.e,matrix.f];
        const end=[.53,0,0,.53,-105,-114];
        frame=(t,s)=>{const e=envelope(t)*s,boarding=ease(t/.18)*(1-ease((t-.81)/.19))*s,travel=Math.sin(Math.PI*clamp((t-.22)/.54))*s;
          cart.setAttribute('transform',`translate(${35*travel} ${-4*Math.sin(t*30)*travel}) rotate(${-4*travel} 76 47)`);wheel.setAttribute('transform',`rotate(${105*travel} 76 47)`);
          holder.setAttribute('transform',`matrix(${start.map((v,i)=>v+(end[i]-v)*boarding).join(' ')})`);if(boarding>.95)slot.setAttribute('clip-path',`url(#${clipId})`);else slot.removeAttribute('clip-path');male.setAttribute('visibility',boarding>0?'hidden':'visible');a1(e);a2(e);};soundKind='wheel';soundAt=.28;
      }
    }else if(kind==='fork'){
      const tool=art.querySelector('[data-fork]');keep(tool,'transform');const a1=arm(body,tool,0,-35,[281,113]),a2=arm(body,tool,0,11,[291,111],5);
      frame=(t,s)=>{const e=envelope(t)*s,stroke=Math.sin(t*Math.PI*4);tool.setAttribute('transform',`translate(${9*stroke*e} ${12*e*Math.max(0,stroke)}) rotate(${-19*stroke*e} 0 -35)`);a1(e);a2(e);};finish=()=>{empty=false;};soundKind='soil';
    }else if(kind==='pour'){
      const cupPiece=pieceOf(MATE,'primary');if(!visible(cupPiece))return {invalid:true,restore(){cleanups.reverse().forEach(f=>f());}};
      checks.push(cupPiece);const cup=artOf(cupPiece).querySelector('[data-mate-cup]'),pot=art.querySelector('[data-kettle]'),mover=wrap(pot);keep(pot,'transform');
      const cupMove=moveTo(cup,body,0,-20,445,92),holdCup=arm(habitat.querySelector('.worm-body'),cup,0,18,[278,124],4);
      const stream=path('',{stroke:'#b4d5d6','stroke-width':2.6}),shine=path('',{stroke:'#fff9de','stroke-width':.8});effects.append(stream,shine);
      const a1=arm(body,pot,-3,-70,[282,115]);
      frame=(t,s)=>{const e=envelope(t)*s,tilt=ease((t-.18)/.2)*(1-ease((t-.62)/.18))*s;cupMove(e);holdCup(e);pot.setAttribute('transform',`rotate(${-38*tilt} -82 -36)`);mover.removeAttribute('transform');const p=local(pot,-82,-36,mover.parentElement),q=local(cup,-8,-37,mover.parentElement);mover.setAttribute('transform',`translate(${(q.x-p.x)*e} ${(q.y-p.y)*e})`);
        const x=local(pot,-82,-36,effects),z=local(cup,-8,-21,effects),d=`M${x.x} ${x.y}Q${x.x+3} ${z.y-9} ${z.x} ${z.y}`;for(const n of[stream,shine]){n.setAttribute('d',d);n.setAttribute('opacity',t>pourWindow.start&&t<pourWindow.end?s:0);}a1(e);};soundKind='pour';soundAt=pourWindow.start;
    }else if(kind==='sip'){
      const b=habitat.querySelector(sipSmall?'.companion-body':'.worm-body'),cup=art.querySelector('[data-mate-cup]');
      const move=moveTo(cup,b,42,-64,331,73),a1=arm(b,cup,0,18,[282,118]);
      frame=(t,s)=>{const e=envelope(t)*s;move(e);a1(e);};finish=()=>{sipSmall=!sipSmall;};soundKind='sip';soundAt=.4;
    }else if(kind==='roll'){
      const pin=art.querySelector('[data-rolling-pin]'),dough=art.querySelector('[data-dough]');keep(pin,'transform');keep(dough,'transform');
      const a1=arm(body,pin,-74,-7,[191,241],-8),a2=arm(body,pin,74,-7,[199,211],8);
      frame=(t,s)=>{const e=envelope(t)*s;pin.setAttribute('transform',`translate(0 ${Math.sin(t*Math.PI*6)*14*e})`);dough.setAttribute('transform',`scale(${1+.06*e} ${1+.12*e})`);a1(e);a2(e);};finish=()=>{rolled=true;};
    }else if(kind==='eat'){
      const plate=pieceOf(FOOD,'companion');if(!visible(plate))return {invalid:true,restore(){cleanups.reverse().forEach(f=>f());}};checks.push(plate);
      const snack=artOf(plate).querySelector(`[data-serving="${servings}"]`),move=moveTo(snack,body,0,-12,331,78),a1=arm(body,snack,0,8,[285,114]);keep(snack,'opacity');keep(snack,'clip-path');
      const id=`garden-bread-${++passengerSerial}`,defs=element('defs'),clip=element('clipPath',{id,clipPathUnits:'userSpaceOnUse'}),edge=path('',{'clip-rule':'evenodd',fill:'#000'});clip.append(edge);defs.append(clip);effects.append(defs);
      const smile=body.querySelector('.worm-smile'),mouth=element('ellipse',{cx:331,cy:76,rx:3.8,ry:2.5,fill:'#29444b','data-garden-chew':'',opacity:0});keep(smile,'opacity');smile.after(mouth);cleanups.push(()=>mouth.remove());
      const crumbs=element('g',{'data-bread-crumbs':''});effects.append(crumbs);for(let i=0;i<3;i++)crumbs.append(element('ellipse',{rx:1.1+i*.2,ry:.8,fill:'#d5a15c',opacity:0}));
      frame=(t,s)=>{const f=eatingFrame(t),e=envelope(t)*s;move(f.reach*s);a1(e);
        if(f.bite===1){edge.setAttribute('d','M-40-40H40V40H-40ZM10-14A10 10 0 1 0-10-14A10 10 0 1 0 10-14Z');snack.setAttribute('clip-path',`url(#${id})`);}
        else if(f.bite>=2){edge.setAttribute('d','M-40-40H40V40H-40ZM20-15A21 21 0 1 0-22-15A21 21 0 1 0 20-15Z');snack.setAttribute('clip-path',`url(#${id})`);}else snack.removeAttribute('clip-path');
        snack.setAttribute('opacity',f.bite===3?'0':'1');mouth.setAttribute('opacity',f.chewing?s:0);smile.setAttribute('opacity',f.chewing?1-s:1);mouth.setAttribute('rx',3.1+1.1*(.5+.5*Math.sin(t*60)));mouth.setAttribute('ry',1.5+1.3*(.5+.5*Math.cos(t*60)));
        const last=breadBites.filter(at=>t>=at).at(-1),q=last===undefined?1:clamp((t-last)/.12),p=local(body,331,80,effects);[...crumbs.children].forEach((n,i)=>{n.setAttribute('cx',p.x+(i-1)*8*q);n.setAttribute('cy',p.y+18*q*q);n.setAttribute('opacity',last!==undefined&&q<1?(1-q)*s:0);});
      };finish=()=>{servings++;if(!small)rolled=false;};soundKind='crunch';soundAt=breadBites[0];
    }
    return {piece,checks,kind,frame,finish,soundKind,soundAt,restore(){cleanups.reverse().forEach(f=>f());}};
  }
  function launch(piece){
    const kind=piece.dataset.accessoryFamily===FOOD&&piece.dataset.wormPart==='primary'&&rolled?'eat':actionFor(piece.dataset.accessoryFamily,piece.dataset.wormPart==='companion',empty);
    if(kind==='eat'&&servings>=3){servings=0;updateState();}
    const action=build(piece,kind);if(action.invalid){action.restore();return false;}
    if(reduced.matches){action.finish();action.restore();updateState();onChange();return true;}
    run={...action,started:performance.now(),last:0,played:false};const current=run;habitat.dataset.gardenActivity=kind;
    Promise.resolve(sound.prepare()).catch(()=>{});
    function tick(now){
      if(run!==current)return;if(document.hidden||!current.checks.every(visible)){cancel();return;}
      if(current.ending){const strength=1-ease((now-current.ending)/180);current.frame(current.last,strength);if(strength===0){const next=pending;cancel();if(next&&visible(next))launch(next);return;}}
      else{const t=clamp((now-current.started)/durations[kind]);current.last=t;current.frame(t,1);if(kind==='eat'){const bites=breadBites.filter(at=>t>=at).length;if(bites>(current.bitesPlayed||0)){current.bitesPlayed=bites;sound.play(current.soundKind);}}else if(t>=current.soundAt&&!current.played){current.played=true;sound.play(current.soundKind);}if(t===1){current.finish();cancel();return;}}
      raf=requestAnimationFrame(tick);
    }raf=requestAnimationFrame(tick);return true;
  }
  function start(piece){if(!handles(piece)||!visible(piece)||document.hidden)return false;if(run){pending=run.piece===piece?null:piece;run.ending||=performance.now();sound.stop();return true;}return launch(piece);}
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});document.addEventListener('keydown',e=>{if(e.key==='Escape')cancel();});
  window.addEventListener('resize',cancel);window.addEventListener('pagehide',clear);reduced.addEventListener('change',cancel);
  return {handles,start,cancel,clear,reset,get active(){return !!run;}};
}
