import {VINE,JUICE,GECKO,add,juiceLevel} from './reunion-ju1375-art.js?v=20260917-reunion-7';
const clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x);};
export function reunionFrame(kind,ms,male,reduced=false){
  if(reduced)return {reach:0,step:0,sip:kind===JUICE?1:0,sway:0,stir:0,done:ms>=350};
  if(kind===JUICE)return {reach:ease((ms-900)/650)*(1-ease((ms-3300)/700)),sip:ease((ms-1800)/1100),stir:male?0:ease(ms/200)*(1-ease((ms-750)/250)),step:0,sway:0,done:ms>=4100};
  const end=kind===VINE?1800:4200,envelope=ease(ms/400)*(1-ease((ms-end+650)/650));
  return {reach:0,step:kind===GECKO?ease(ms/1450)*(1-ease((ms-2700)/1450)):0,sip:0,stir:0,sway:Math.sin(ms/(male?270:320))*envelope,done:ms>=end};
}
function makeSound(){
  let context;const buffers=new Map(),loading=new Set(),voices=new Set();
  const files={sip:'araucania-straw-sip.wav',stir:'hcmc-stir.wav',gear:'oahu-bike-chain.mp3',pour:'kauai-bath-pour-v2.wav',leaf:'pohnpei-leaves.ogg'};
  function prepare(kind){
    try{const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;context??=new Audio();context.resume().catch(()=>{});
      if(buffers.has(kind)||loading.has(kind))return;loading.add(kind);
      const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),4000);
      fetch(new URL('./assets/audio/'+files[kind],import.meta.url),{signal:controller.signal}).then(r=>{if(!r.ok)throw Error(r.status);return r.arrayBuffer();}).then(b=>context.decodeAudioData(b)).then(b=>buffers.set(kind,b)).catch(()=>{}).finally(()=>{clearTimeout(timeout);loading.delete(kind);});
    }catch{/* Audio is optional; movement still completes. */}
  }
  function play(kind){
    const buffer=buffers.get(kind);if(!buffer||context?.state!=='running')return false;
    const n=context.createBufferSource(),g=context.createGain(),duration=Math.min(buffer.duration,kind==='leaf'?.45:kind==='gear'?.85:kind==='pour'?1.5:kind==='stir'?.65:.58),now=context.currentTime;
    n.buffer=buffer;n.connect(g);g.connect(context.destination);g.gain.setValueAtTime(0,now);g.gain.linearRampToValueAtTime(kind==='leaf'?.075:kind==='gear'?.13:kind==='pour'?.23:kind==='stir'?.22:.5,now+.025);g.gain.setValueAtTime(kind==='leaf'?.075:kind==='gear'?.13:kind==='pour'?.23:kind==='stir'?.22:.5,now+duration-.045);g.gain.linearRampToValueAtTime(0,now+duration);
    voices.add(n);n.onended=()=>{voices.delete(n);n.disconnect();g.disconnect();};n.start(now,0,duration);return true;
  }
  function stop(){for(const n of voices){try{n.stop();}catch{}}voices.clear();}
  return {prepare,play,stop};
}
// Clockwise rounded border; every corner has a continuous position and tangent.
export function borderPoint(q,w,h,inset=25,bottomInset=inset){
  const r=Math.min(44,(w-2*inset)/4,(h-inset-bottomInset)/4),x=inset,y=inset,right=w-inset,bottom=h-bottomInset;
  const horizontal=right-x-2*r,vertical=bottom-y-2*r,arc=Math.PI*r/2;
  const segments=[horizontal,arc,vertical,arc,horizontal,arc,vertical,arc];
  const perimeter=segments.reduce((a,b)=>a+b,0);let d=((q%1)+1)%1*perimeter,i=0;
  while(i<7&&d>segments[i]){d-=segments[i];i++;}
  const t=d/segments[i];
  if(i===0)return {x:x+r+d,y,angle:0};if(i===2)return {x:right,y:y+r+d,angle:90};
  if(i===4)return {x:right-r-d,y:bottom,angle:180};if(i===6)return {x,y:bottom-r-d,angle:270};
  const angle=(-90+(i-1)*45)+90*t,rad=angle*Math.PI/180;
  const cx=i===1||i===3?right-r:x+r,cy=i===1||i===7?y+r:bottom-r;
  return {x:cx+Math.cos(rad)*r,y:cy+Math.sin(rad)*r,angle:angle+90};
}
export function pressFrame(ms,reduced=false){
  if(reduced)return {reach:0,press:1,angle:0,flow:false,done:ms>=350};
  const press=ease((ms-900)/2400);
  return {reach:ease(ms/800)*(1-ease((ms-3500)/900)),press,angle:press*720,flow:ms>1150&&ms<3300,done:ms>=4500};
}
// Distance-sampled curves prevent acceleration at the corners.
export function geckoRoute(origin,w,h,inset,bottomInset,male,homeOrigin=origin){
  const direction=male?-1:1;let start=0,nearest=Infinity;
  for(let i=0;i<360;i++){const p=borderPoint(i/360,w,h,inset,bottomInset),d=Math.hypot(p.x-origin.x,p.y-origin.y);if(d<nearest){nearest=d;start=i/360;}}
  const edge=borderPoint(start,w,h,inset,bottomInset),heading=(edge.angle+(male?180:0))*Math.PI/180;
  function approachFrom(from){
    const distance=Math.hypot(edge.x-from.x,edge.y-from.y),control={x:edge.x-Math.cos(heading)*Math.min(distance*.45,55),y:edge.y-Math.sin(heading)*Math.min(distance*.45,55)},points=[];
    for(let i=0;i<=80;i++){const t=i/80,u=1-t;points.push({x:u*u*from.x+2*u*t*control.x+t*t*edge.x,y:u*u*from.y+2*u*t*control.y+t*t*edge.y});}return points;
  }
  const approach=approachFrom(origin),homeApproach=approachFrom(homeOrigin);
  const border=[];for(let i=0;i<=720;i++)border.push(borderPoint(start+direction*i/720*(male?.22:.3),w,h,inset,bottomInset));
  function measure(points){let length=0;const samples=points.map((p,i)=>{if(i)length+=Math.hypot(p.x-points[i-1].x,p.y-points[i-1].y);return {...p,d:length};});return {samples,length};}
  return {approach:measure(approach),border:measure(border),home:measure([...border].reverse().concat([...homeApproach].reverse().slice(1)))};
}
export function routePoint(route,fraction,reverse=false){
  const d=clamp(fraction)*route.length,points=route.samples;let i=1;
  while(i<points.length-1&&points[i].d<d)i++;
  const a=points[i-1],b=points[i],t=(d-a.d)/(b.d-a.d||1);
  return {x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,angle:Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI+(reverse?180:0)};
}
// Alternating diagonal feet push, settle, and rest after every fourth step.
function crawlPlan(length,scale){
  const steps=Math.max(1,Math.ceil(length/(72*scale)));
  return {steps,duration:steps*1100+Math.floor((steps-1)/4)*850};
}
function crawlFrame(ms,plan){
  let step=0,t=Math.max(0,ms);
  while(step<plan.steps){const duration=1100+(step%4===3&&step<plan.steps-1?850:0);if(t<duration)break;t-=duration;step++;}
  const push=step>=plan.steps?1:ease(t/820),phase=step+push;
  return {progress:clamp(phase/plan.steps),gait:Math.sin(phase*Math.PI),active:step<plan.steps&&t<820,peek:step%4===3?ease((t-1100)/220)*(1-ease((t-1690)/260)):0};
}
export function geckoTrip(ms,male,route,scale=1){
  const approach=crawlPlan(route?.approach.length??120,scale),border=crawlPlan(route?.border.length??360,scale),home=crawlPlan(route?.home.length??480,scale);
  const turn=800,turnBack=1200,borderStart=turn+approach.duration,returnStart=borderStart+border.duration+turnBack,settleStart=returnStart+home.duration,duration=settleStart+turn;
  let phase,clock,plan;
  if(ms<turn)return {phase:'orient',turn:ease(ms/turn),gait:0,peek:0,done:false};
  if(ms<borderStart){phase='approach';clock=ms-turn;plan=approach;}
  else if(ms<borderStart+border.duration){phase='border';clock=ms-borderStart;plan=border;}
  else if(ms<returnStart)return {phase:'turn',turn:ease((ms-borderStart-border.duration)/turnBack),gait:0,peek:0,done:false};
  else if(ms<settleStart){phase='return';clock=ms-returnStart;plan=home;}
  else return {phase:'settle',turn:ease((ms-settleStart)/turn),gait:0,peek:0,done:ms>=duration};
  return {...crawlFrame(clock,plan),phase,done:false};
}
export function geckoPose(f,route,origin,male,homeOrigin=origin){
  const first=routePoint(route.approach,0),last=routePoint(route.border,1);
  if(f.phase==='orient')return {...origin,angle:angleMix(origin.angle-(male?12:0),first.angle,f.turn)};
  if(f.phase==='approach')return routePoint(route.approach,f.progress);
  if(f.phase==='border')return routePoint(route.border,f.progress);
  if(f.phase==='turn')return {...last,angle:last.angle+180*f.turn};
  if(f.phase==='return')return routePoint(route.home,f.progress);
  return {...homeOrigin,angle:angleMix(routePoint(route.home,1).angle,homeOrigin.angle-(male?12:0),f.turn)};
}
const matrix=m=>`matrix(${[m.a,m.b,m.c,m.d,m.e,m.f].join(' ')})`;
const interpolate=(a,b,t)=>a+(b-a)*t;
const angleMix=(a,b,t)=>a+(((b-a+540)%360)-180)*t;
export function createReunionJU1375Play(habitat,refresh=()=>{}){
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),audio=makeSound(),levels=new WeakMap(),geckos=new Map(),hiddenNodes=new Map();let run=null,raf=0;
  const handles=p=>[VINE,JUICE,GECKO].includes(p?.dataset.accessoryFamily);
  const visible=p=>p?.isConnected&&!p.closest('[hidden]');
  const pieceFor=(family,part)=>habitat.querySelector(`[data-accessory-family="${family}"][data-worm-part="${part}"]`);
  function hide(owner,node){
    let state=hiddenNodes.get(node);if(!state){state={value:node.getAttribute('visibility'),owners:new Set()};hiddenNodes.set(node,state);}
    state.owners.add(owner);owner.hidden.push(node);node.setAttribute('visibility','hidden');
  }
  function reveal(owner){
    for(const node of owner.hidden){const state=hiddenNodes.get(node);if(!state)continue;state.owners.delete(owner);if(state.owners.size)continue;
      if(state.value===null)node.removeAttribute('visibility');else node.setAttribute('visibility',state.value);hiddenNodes.delete(node);
    }
  }
  function updateActivity(){
    const kinds=[...(run?[run.kind]:[]),...(geckos.size?[GECKO]:[])];
    if(kinds.length)habitat.dataset.ju1375Action=kinds.join(' ');else delete habitat.dataset.ju1375Action;
  }
  function cloneArt(source,parent,suffix){
    const clone=source.cloneNode(true);clone.removeAttribute('transform');clone.removeAttribute('visibility');clone.style.transform='none';clone.style.animation='none';
    for(const n of clone.querySelectorAll('[id]')){const id=n.id;n.id=id+suffix;for(const ref of clone.querySelectorAll('[clip-path]'))if(ref.getAttribute('clip-path')===`url(#${id})`)ref.setAttribute('clip-path',`url(#${id+suffix})`);}
    parent.append(clone);return clone;
  }
  function finishActivity(complete=false){
    cancelAnimationFrame(raf);raf=0;audio.stop();if(!run)return;const r=run;run=null;
    r.art.replaceChildren(...[...r.saved.childNodes].map(n=>n.cloneNode(true)));
    reveal(r);r.effects?.remove();r.paused.forEach(a=>{if(a.playState==='paused')a.play();});
    if(complete&&r.kind===JUICE){const next=r.male?(r.canDrink?0:r.level):Math.min(1,r.level+1/3);levels.set(r.cupPiece,next);juiceLevel(r.cupArt,true,next);}
    updateActivity();refresh();
  }
  function finishGecko(r){
    cancelAnimationFrame(r.raf);geckos.delete(r.piece);reveal(r);r.overlay?.remove();updateActivity();refresh();
  }
  function cancel(){
    finishActivity();for(const r of [...geckos.values()])finishGecko(r);
  }
  function startGecko(piece){
    if(geckos.has(piece))return true;
    const art=piece.querySelector('.location-accessory-art'),male=piece.dataset.wormPart==='companion',box=habitat.getBoundingClientRect();
    const originFor=node=>{const m=node.getScreenCTM();return {x:m.e-box.left,y:m.f-box.top,angle:Math.atan2(m.b,m.a)*180/Math.PI,scale:Math.hypot(m.a,m.b)};};
    const homeOrigin=originFor(art),origin=originFor(male&&run?.passenger?run.passenger:art),scale=homeOrigin.scale;
    const r={piece,art,male,origin,homeOrigin,scale,hidden:[],began:performance.now(),last:performance.now(),saved:art.cloneNode(true),raf:0};
    const radius=165*scale+8,labelTop=Math.min(...[...habitat.querySelectorAll('.scene-name,.worm-name-tag')].map(n=>n.getBoundingClientRect().top-box.top),box.height),inset=Math.max(24,radius),bottomInset=Math.max(inset,box.height-labelTop+radius);
    r.noTrip=reduced.matches||box.width<=inset*2+24||box.height<=inset+bottomInset+24;
    if(!r.noTrip){
      r.route=geckoRoute(origin,box.width,box.height,inset,bottomInset,male,homeOrigin);
      r.overlay=add(habitat,'svg',{viewBox:`0 0 ${box.width} ${box.height}`,'aria-hidden':'true','data-ju1375-border':male?'companion':'primary',style:'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:5;overflow:hidden'});
      r.move=add(r.overlay,'g');r.gecko=cloneArt(art,r.move,male?'-border-male':'-border-primary');hide(r,art);
    }
    geckos.set(piece,r);updateActivity();
    if(male&&run?.passenger)run.passenger.setAttribute('visibility','hidden');
    function tick(now){
      if(geckos.get(piece)!==r)return;if(!visible(piece)||document.hidden){finishGecko(r);return;}
      let ms=now-r.began,f=r.noTrip?{done:ms>=350}:geckoTrip(ms,male,r.route,scale);
      // Wait naturally before returning while the male is still away at the press.
      if(male&&run?.person&&(f.phase==='return'||f.phase==='settle')){r.began+=now-r.last;ms=now-r.began;f=geckoTrip(ms,male,r.route,scale);}
      r.last=now;
      if(!r.noTrip){
        const p=geckoPose(f,r.route,origin,male,homeOrigin),walking=f.gait;
        r.move.setAttribute('transform',`translate(${p.x} ${p.y}) rotate(${p.angle+(male?12:0)}) scale(${scale})`);
        r.gecko.querySelector('[data-gecko-motion]').setAttribute('transform',`rotate(${walking*1.6})`);
        r.gecko.querySelector('[data-gecko-tail]').setAttribute('transform',`rotate(${-walking*3.5} -38 0)`);
        r.gecko.querySelector('[data-gecko-head]').setAttribute('transform',`rotate(${-10*f.peek-walking} 40 -6)`);
        [...r.gecko.querySelectorAll('[data-gecko-foot]')].forEach((n,i)=>{const rest=r.saved.querySelectorAll('[data-gecko-foot]')[i].getAttribute('transform'),pair=[1,-1,-1,1][i];n.setAttribute('transform',`translate(${-walking*pair*15} ${Math.abs(walking)*pair*1.5}) ${rest} rotate(${walking*pair*6})`);});
      }
      if(f.done){finishGecko(r);return;}r.raf=requestAnimationFrame(tick);
    }
    tick(r.began);return true;
  }
  function start(piece){
    if(!handles(piece)||!visible(piece))return false;if(piece.dataset.accessoryFamily===GECKO)return startGecko(piece);if(run?.piece===piece)return true;finishActivity();
    const art=piece.querySelector('.location-accessory-art'),kind=piece.dataset.accessoryFamily,male=piece.dataset.wormPart==='companion';
    const root=habitat.querySelector('#worm-species'),body=habitat.querySelector(male?'.companion-body':'.worm-body');
    const r={piece,art,kind,male,root,body,saved:art.cloneNode(true),hidden:[],paused:[],played:new Set(),began:performance.now()};
    if(kind===JUICE){r.cupPiece=pieceFor(JUICE,'companion');r.cupArt=r.cupPiece?.querySelector('.location-accessory-art');if(!visible(r.cupPiece))return false;r.level=levels.get(r.cupPiece)||0;r.canDrink=r.level>.99;if(!male&&r.level>.99)return true;}
    run=r;
    const toRoot=(node,x,y)=>new DOMPoint(x,y).matrixTransform(root.getScreenCTM().inverse().multiply(node.getScreenCTM()));
    const freeze=n=>{for(const a of n?.getAnimations()||[])if(a.playState==='running'){a.pause();r.paused.push(a);}};
    for(const n of habitat.querySelectorAll('.worm-body,.companion-body,.fitted-headwear-motion'))freeze(n);
    const effects=()=>r.effects??=add(root,'g',{'data-ju1375-effects':'','aria-hidden':'true','pointer-events':'none'});
    function hand(anchor,small=false){const group=effects(),arm=add(group,'path',{fill:'none',stroke:'#79bdaa','stroke-width':small?5:8,'stroke-linecap':'round'}),palm=add(group,'ellipse',{rx:small?2:3.5,ry:small?3:4.5,fill:'#a0cfb4',stroke:'#4c8c75','stroke-width':.7});return (end,amount=1,offset={x:0,y:0})=>{const a={x:anchor.x+offset.x,y:anchor.y+offset.y};const x=interpolate(a.x,end.x,amount),y=interpolate(a.y,end.y,amount);arm.setAttribute('d',`M${a.x} ${a.y}Q${(a.x+x)/2-8} ${Math.max(a.y,y)+8} ${x} ${y}`);palm.setAttribute('cx',x);palm.setAttribute('cy',y);arm.setAttribute('opacity',amount);palm.setAttribute('opacity',amount);};}
    if(kind===JUICE){
      const maleBody=habitat.querySelector('.companion-body');r.anchor=toRoot(body,293,115);r.mouth=toRoot(maleBody,333,75);r.maleAnchor=toRoot(maleBody,293,115);
      r.posePrimary=!male?hand(r.anchor):null;
      if(!male&&!reduced.matches){
        // The male comes to the press with his glass, then returns to his own spot.
        const spout=toRoot(art,-74,64);r.spout=spout;r.slide={x:spout.x-42-r.mouth.x,y:spout.y-22-r.mouth.y};r.person=add(effects(),'g');
        const original=habitat.querySelector('#companion-worm'),holder=add(r.person,'g',{transform:matrix(root.getScreenCTM().inverse().multiply(original.getScreenCTM()))});
        const clone=cloneArt(original,holder,'-press');clone.removeAttribute('id');const cb=clone.querySelector('.companion-body');cb.style.animation='none';cb.style.transform=getComputedStyle(maleBody).transform;hide(r,original);
        for(const family of [VINE,GECKO]){const p=pieceFor(family,'companion');if(!visible(p))continue;const a=p.querySelector('.location-accessory-art'),g=add(r.person,'g',{transform:matrix(root.getScreenCTM().inverse().multiply(a.getScreenCTM()))});const passenger=cloneArt(a,g,'-press');if(family===GECKO){r.passenger=passenger;r.geckoPiece=p;if(geckos.has(p))passenger.setAttribute('visibility','hidden');}hide(r,a);}
      }
      r.move=add(effects(),'g');r.cup=cloneArt(r.cupArt,r.move,'-action');r.cup.querySelector('[data-juice-shadow]')?.remove();r.base=root.getScreenCTM().inverse().multiply(r.cupArt.getScreenCTM());
      r.grip=toRoot(r.cupArt,59,12);r.poseMale=hand(r.maleAnchor,true);
      const tip=toRoot(r.cupArt,male?21:0,male?-115:-46);const target=male?r.mouth:{x:r.spout?.x??toRoot(art,-74,64).x,y:(r.spout?.y??toRoot(art,-74,64).y)+12};r.dx=target.x-tip.x;r.dy=target.y-tip.y;
      hide(r,r.cupArt);r.cupArt.querySelector('[data-juice-shadow]')?.setAttribute('visibility','visible');
      if(!male)r.stream=add(effects(),'path',{fill:'none',stroke:'#d3cf78','stroke-width':3.4,'stroke-linecap':'round',opacity:0});
      if(!reduced.matches){if(male&&r.canDrink)audio.prepare('sip');if(!male){audio.prepare('gear');audio.prepare('pour');}}
    }else if(!reduced.matches)audio.prepare('leaf');
    updateActivity();
    function cue(name,at,type,ms){if(reduced.matches||ms<at||r.played.has(name))return;if(ms-at>250||audio.play(type))r.played.add(name);}
    function tick(now){
      if(run!==r)return;if(!visible(piece)||document.hidden){finishActivity();return;}
      const ms=now-r.began;let done=false;
      if(kind===JUICE){
        const f=male?reunionFrame(JUICE,ms,true,reduced.matches):pressFrame(ms,reduced.matches),reach=f.reach,b=r.base;
        r.move.setAttribute('transform',`matrix(${b.a} ${b.b} ${b.c} ${b.d} ${b.e+r.dx*reach} ${b.f+r.dy*reach})`);
        const fraction=male?r.level*(1-(r.canDrink?f.sip:0)):Math.min(1,r.level+f.press/3);juiceLevel(r.cup,true,fraction);
        const offset=male?{x:0,y:0}:{x:(r.slide?.x||0)*reach,y:(r.slide?.y||0)*reach};
        r.person?.setAttribute('transform',`translate(${offset.x} ${offset.y})`);
        if(r.passenger)r.passenger.setAttribute('visibility',geckos.has(r.geckoPiece)?'hidden':'visible');
        r.poseMale({x:r.grip.x+r.dx*reach,y:r.grip.y+r.dy*reach},reach,offset);
        if(!male){
          art.querySelector('[data-press-crank]').setAttribute('transform',`translate(66 -13) rotate(${f.angle})`);
          for(const n of art.querySelectorAll('[data-press-roller]'))n.setAttribute('transform',`translate(32 ${n.dataset.pressRoller}) rotate(${f.angle*(+n.dataset.pressRoller===-48?1:-1)})`);
          art.querySelector('[data-press-cane]').setAttribute('transform',`translate(${f.press*88} 0)`);
          const a=f.angle*Math.PI/180;r.posePrimary(toRoot(art,66+43*Math.cos(a)-25*Math.sin(a),-13+43*Math.sin(a)+25*Math.cos(a)),reach);
          const sp=toRoot(art,-74,64);r.stream.setAttribute('d',`M${sp.x} ${sp.y}Q${sp.x+1} ${sp.y+8} ${sp.x} ${sp.y+17}`);r.stream.setAttribute('opacity',f.flow?1:0);
          cue('gear1',900,'gear',ms);cue('gear2',1800,'gear',ms);cue('gear3',2700,'gear',ms);cue('pour',1250,'pour',ms);
        }else if(r.canDrink){cue('sip',1900,'sip',ms);cue('sip2',2550,'sip',ms);}
        done=f.done;
      }else{const f=reunionFrame(VINE,ms,male,reduced.matches);for(const n of art.querySelectorAll('[data-vanilla-petals]'))n.setAttribute('transform',`scale(${1+f.sway*.06} ${1+f.sway*.08})`);cue('leaf',220,'leaf',ms);done=f.done;}
      if(done){finishActivity(true);return;}raf=requestAnimationFrame(tick);
    }
    tick(r.began);return true;
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});window.addEventListener('pagehide',()=>cancel());window.addEventListener('resize',()=>cancel());reduced.addEventListener('change',()=>cancel());
  return {handles,start,cancel,get active(){return !!run||geckos.size>0;}};
}
