import {add,at,clamp,ease,matrix,relative,visible,performance as makePerformance,recordedSound} from './scene-performance.js?v=20260919-final-3';
export const ORGAN='santeuil-cylinder-organ-instrument',TRAIN='santeuil-hogweed-locomotive';
export const TIMPLE='tenerife-timple-guitar',BOWL='tenerife-avocado-snack-bowl',CANARY='tenerife-atlantic-canary-costume';
export const MIC='xz1516-ohia-blossom-microphone',TAPE='xz1516-reel-to-reel-recorder';
export function whistleTimes(part){return part==='primary'?[0,570,1320]:[0,350,900,1320];}
export function strumTimes(male=false){return male?[900,1320,1530,2160,2580,3000,3210,3840]:[900,1500,1800,2400,3000,3300,3900,4500];}
export function performanceEnvelope(ms,duration){return ease(ms/800)*(1-ease((ms-duration+900)/900));}
export function railTravel(ms){return 42*(ease((ms-650)/2100)-ease((ms-3900)/2100));}
export function createFinalScenes(habitat,refresh=()=>{}){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const audio=recordedSound({organ:'santeuil-organ.wav',reeds:'santeuil-reeds.mp3',whistle:'santeuil-whistle.mp3',strum:'tenerife-strum.mp3',up:'tenerife-strum-up.mp3',eat:'reunion-eat.wav',voice:'kauai-whistle.mp3'});
 let action=null,raf=0,takes=[];
 const handles=p=>[ORGAN,TRAIN,TIMPLE,BOWL,MIC,TAPE].includes(p?.dataset.accessoryFamily);
 function cancel(){cancelAnimationFrame(raf);raf=0;audio.stop();if(!action)return;const old=action;action=null;old.stage?.restore();delete habitat.dataset.sceneAction;refresh();}
 function start(piece){if(!handles(piece)||!visible(piece))return false;if(action?.piece===piece)return true;cancel();
  const family=piece.dataset.accessoryFamily,part=piece.dataset.wormPart;
  const a={piece,family,part,cues:new Set(),duration:family===MIC?4000:family===TAPE?6500:family===BOWL?5700:family===TIMPLE?5800:family===TRAIN?7000:part==='primary'?9000:9600};action=a;habitat.dataset.sceneAction='loading';
  const keys=[MIC,TAPE].includes(family)?['voice']:family===BOWL?['eat']:family===TIMPLE?['strum','up']:family===TRAIN?['whistle']:[part==='primary'?'organ':'reeds'];
  const begin=()=>{if(action!==a||!visible(piece)||document.hidden)return;const s=a.stage=makePerformance(habitat,family);a.started=performance.now();a.hands={};for(const p of ['primary','companion'])a.hands[p]=[s.hand(p),s.hand(p)];
   if(family===TRAIN){for(const part of ['primary','companion']){const p=s.prop(TRAIN,part);if(!p)continue;
    const rail=add(s.layer,'g',{transform:matrix(p.base)});s.layer.insertBefore(rail,s.layer.firstChild);const ground=part==='primary'?55:41;for(const y of [ground,ground-6])add(rail,'path',{d:`M-105 ${y}H145`,fill:'none',stroke:y===ground?'#82908a':'#394c4b','stroke-width':2.4});
    for(let x=-96;x<145;x+=22)add(rail,'path',{d:`M${x} ${ground-8}v11`,stroke:'#806248','stroke-width':5});
    p.rail=rail;if(part==='primary')p.puffs=Array.from({length:3},()=>add(p.copy,'ellipse',{cx:52,cy:-71,rx:5,ry:4,fill:'#ecede2',opacity:0}));
   }}
   if(family===BOWL){const p=s.prop(BOWL,part),food=p?.copy.querySelector('[data-avocado-food] > g');if(food){a.food=food;a.foodBase=relative(s.root,food);a.morsel=food.cloneNode(true);a.morsel.removeAttribute('transform');a.foodLayer=add(s.layer,'g',{transform:matrix(a.foodBase)});a.foodLayer.appendChild(a.morsel);food.setAttribute('visibility','hidden');}}
   if([MIC,TAPE].includes(family)){
    a.takes=family===MIC?[part]:takes.length?[...takes]:['primary','companion'];
    a.whistles=a.takes.flatMap((part,i)=>whistleTimes(part).map(t=>({part,at:900+i*2400+t})));
    a.mouths={};for(const part of ['primary','companion'])a.mouths[part]=add(s.actors[part].face,'ellipse',{cx:333,cy:79,rx:2.4,ry:2.6,fill:'var(--worm-deep)',opacity:0});
    if(family===TAPE)a.duration=900+a.takes.length*2400+800;
   }
   habitat.dataset.sceneAction=family===MIC?'recording':family===TAPE?'playback':family===BOWL?'snack':family===TRAIN?'railway':'music';raf=requestAnimationFrame(tick);
  };
  if(reduced.matches)begin();else Promise.race([audio.prepare(keys),new Promise(resolve=>setTimeout(resolve,4000))]).then(begin);return true;
 }
 function recording(a,env){const s=a.stage,tape=s.prop(TAPE),playback=a.family===TAPE;
  let level=0;for(const [i,w]of a.whistles.entries()){
   const age=a.ms-w.at,pulse=age<0||age>460?0:Math.sin(Math.PI*age/460);level=Math.max(level,pulse);
   if(age>=0&&!a.cues.has(i)){a.cues.add(i);audio.play('voice',0,.48,w.part==='primary'?.07:.052);}
  }
  for(const part of ['primary','companion']){
   const pulse=Math.max(0,...a.whistles.filter(w=>w.part===part).map(w=>a.ms-w.at>=0&&a.ms-w.at<460?Math.sin(Math.PI*(a.ms-w.at)/460):0));
   s.pose(part,(playback?.35:.18)*env*Math.sin(a.ms/490+(part==='primary'?0:1)),(playback?-.13:part===a.part?.28:-.1)*env);
   a.mouths[part].setAttribute('opacity',playback?0:pulse);
   const smile=s.actors[part].face.querySelector('.worm-smile');if(smile)smile.setAttribute('opacity',playback?1:1-pulse);
   if(!playback&&part===a.part){const mic=s.prop(MIC,part);if(mic)s.reach(a.hands[part][0],at(mic.base,0,29),env);}
  }
  if(tape){
   const turning=ease((a.ms-450)/450)*(1-ease((a.ms-a.duration+1000)/500));
   for(const reel of tape.copy.querySelectorAll('[data-reel-centre]')){const [x,y]=reel.dataset.reelCentre.split(' ').map(Number);reel.setAttribute('transform',`rotate(${720*ease((a.ms-450)/(a.duration-1000))} ${x} ${y})`);}
   for(const needle of tape.copy.querySelectorAll('[data-tape-meter]')){const [x,y]=needle.dataset.tapeMeter.split(' ').map(Number);needle.setAttribute('transform',`rotate(${level*48} ${x} ${y})`);}
   tape.copy.querySelector('[data-record-lamp]')?.setAttribute('fill',playback?'#a1c89a':'#ed715f');
   // The smaller worm operates transport controls while the performer whistles.
   const press=ease(a.ms/500)*(1-ease((a.ms-1000)/600));s.reach(a.hands.companion[1],at(tape.base,playback?-50:22,71),press,[228,160]);
  }
 }
 function guitar(a,env){const s=a.stage,p=s.prop(TIMPLE,a.part);if(!p)return;const times=strumTimes(a.part==='companion');
  s.pose(a.part,.45*Math.sin(a.ms/380)*env,0);const other=a.part==='primary'?'companion':'primary';s.pose(other,.8*Math.sin(a.ms/420+.6)*env,0);
  const last=times.findLast(t=>t<=a.ms)??-1000,phase=clamp((a.ms-last)/185),sweep=phase<.45?-20+43*ease(phase/.45):23-43*ease((phase-.45)/.55);
  s.reach(a.hands[a.part][0],at(p.base,sweep,a.part==='primary'?15:10),env);s.reach(a.hands[a.part][1],at(p.base,3,-70+9*Math.floor(a.ms/1200)%18),env,[228,160]);
  for(const [i,t]of times.entries())if(a.ms>=t&&!a.cues.has(i)){a.cues.add(i);audio.play(i%3===2?'up':'strum',0,i%3===2?.53:.64,i%3===0?.12:.085);}
  // Small wing gestures hinge at the original feather roots, never at the head.
  for(const part of [a.part,other]){const costume=s.prop(CANARY,part);for(const wing of costume?.copy.querySelectorAll('[data-canary-wing]')||[]){const angle=Math.sin(a.ms/420+(part===other?.6:0))*env*(part===other?5:2)*(wing.dataset.canaryWing==='near'?1:-.6);wing.setAttribute('transform',`rotate(${angle} 262 104)`);}}
 }
 function snack(a,env){const s=a.stage;if(!a.foodLayer)return;const lift=ease((a.ms-800)/1300),back=ease((a.ms-3500)/1200),hold=lift*(1-back);
  s.pose(a.part,.3*env,.3*hold);const from=at(a.foodBase,0,0),mouth=s.point(a.part,331,80),x=from.x+(mouth.x-from.x)*hold,y=from.y+(mouth.y-from.y)*hold-14*Math.sin(Math.PI*hold);
  const bite=ease((a.ms-2650)/650);a.foodLayer.setAttribute('transform',matrix(new DOMMatrix().translate(x-from.x,y-from.y).multiply(a.foodBase)));a.morsel.setAttribute('opacity',1-bite);
  s.reach(a.hands[a.part][0],{x,y},env);const smile=s.actors[a.part].face.querySelector('.worm-smile');if(smile&&a.ms>2550&&a.ms<3450)smile.setAttribute('transform',`translate(331 80) scale(1 ${1+.1*Math.sin(a.ms/120)}) translate(-331 -80)`);
  cue(a,'eat',2700,.45,.08,.016);
 }
 function cue(a,key,time,offset,duration,level=.12){if(time<=a.ms&&!a.cues.has(key)){a.cues.add(key);audio.play(key,offset,duration,level);}}
 function music(a,env){const s=a.stage,p=s.prop(ORGAN,a.part);if(!p)return;
  const t=a.ms/1000,active=ease((a.ms-650)/450)*(1-ease((a.ms-a.duration+1350)/450));
  s.pose(a.part,Math.sin(t*3.2)*.45*env,.23*env);s.pose(a.part==='primary'?'companion':'primary',Math.sin(t*3.2-.7)*.35*env,-.12*env);
  if(a.part==='primary'){
   const crank=p.copy.querySelector('[data-organ-crank]'),angle=1440*ease((a.ms-650)/(a.duration-1400));crank?.setAttribute('transform',`translate(57 8) scale(1 .62) rotate(${angle}) scale(1 ${1/.62}) translate(-57 -8)`);
   const r=angle*Math.PI/180;s.reach(a.hands.primary[0],at(p.base,57+34*Math.cos(r),8+21*Math.sin(r)),env);s.reach(a.hands.primary[1],at(p.base,-44,10),env,[227,160]);cue(a,'organ',700,0,7.2,.14);
  }else{
   const stretch=1+active*.2*Math.sin((t-.65)*Math.PI*1.15),delta=38*(stretch-1);
   p.copy.querySelector('[data-concertina-bellows]')?.setAttribute('transform',`scale(${stretch} 1)`);
   p.copy.querySelector('[data-concertina-far]')?.setAttribute('transform',`translate(${-delta} 0)`);p.copy.querySelector('[data-concertina-near]')?.setAttribute('transform',`translate(${delta} 0)`);
   s.reach(a.hands.companion[0],at(p.base,62+delta,5),env);s.reach(a.hands.companion[1],at(p.base,-48-delta,5),env,[228,160]);cue(a,'reeds',700,0,7.9,.13);
  }
 }
 function railway(a,env){const s=a.stage,t=a.ms/1000,travel=railTravel(a.ms);
  for(const part of ['primary','companion']){const p=s.prop(TRAIN,part);if(!p)continue;const shift=part==='primary'?travel:travel*.7;
   // Local short shunting paths retain the visitor's chosen position and size.
   const m=p.base.translate(shift,0);p.g.setAttribute('transform',matrix(m));p.rail.setAttribute('opacity',env);
   for(const w of p.copy.querySelectorAll('[data-rail-wheel]')){const [x,y,r]=w.dataset.railWheel.split(' ').map(Number);w.setAttribute('transform',`rotate(${shift/r*180/Math.PI} ${x} ${y})`);}
   const phase=shift/19;p.copy.querySelector('[data-rail-rod]')?.setAttribute('transform',`translate(${5*Math.sin(phase)} ${5*Math.cos(phase)-5})`);
   const pump=Math.sin(t*3.6)*16*env;p.copy.querySelector('[data-trolley-handle]')?.setAttribute('transform',`rotate(${pump} 31 -49)`);
   s.pose(part,Math.sin(t*3.6+(part==='primary'?1:0))*.4*env,.2*env);
   if(part==='companion'){
    const h=new DOMMatrix().translate(-60,0).translate(31,-49).rotate(pump).translate(-31,49);
    s.reach(a.hands[part][0],at(m.multiply(h),72,-39),env);s.reach(a.hands[part][1],at(m.multiply(h),-5,-60),env,[228,160]);
   }else {s.reach(a.hands[part][0],at(m,-50,-9),env);s.reach(a.hands[part][1],at(m,-78,10),env,[228,160]);}
   p.puffs?.forEach((n,i)=>{const phase=((t*.65+i/3)%1);n.setAttribute('cy',-71-phase*30);n.setAttribute('cx',52-phase*13);n.setAttribute('rx',4+phase*9);n.setAttribute('ry',3+phase*6);n.setAttribute('opacity',env*.45*Math.sin(Math.PI*phase));});
  }
  cue(a,'whistle',850,0,1.7,.09);
 }
 function tick(now){raf=0;const a=action;if(!a)return;if(!visible(a.piece)||document.hidden){cancel();return;}
  a.ms=now-a.started;const still=reduced.matches,env=still?0:performanceEnvelope(a.ms,a.duration);
  if(!still){if(a.family===ORGAN)music(a,env);else if(a.family===TRAIN)railway(a,env);else if(a.family===TIMPLE)guitar(a,env);else if(a.family===BOWL)snack(a,env);else recording(a,env);}
  if(a.ms>=(still?300:a.duration)){if(!still&&a.family===MIC&&a.stage.prop(TAPE))takes=[...takes.filter(p=>p!==a.part),a.part].slice(-2);cancel();return;}raf=requestAnimationFrame(tick);
 }
 document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});window.addEventListener('resize',cancel);window.addEventListener('pagehide',cancel);reduced.addEventListener('change',cancel);
 return {handles,start,cancel,clear(){cancel();takes=[];},get active(){return !!action;}};
}
