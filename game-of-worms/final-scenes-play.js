import {SNACK_DURATION,snackServings,prepareSnack,playSnackSounds} from './tenerife-snack.js?v=20260920-snack-sound-1';
import {DUET_DURATION,duetScore,prepareDuet,createDuetSound} from './tenerife-duet.js?v=20260920-snack-2';
import {RAILWAY_DURATION,railwayProgress,prepareRailway,moveRailway,drawRailwayTrack,createRailwaySound} from './santeuil-railway.js?v=20260922-railway-1';
import {vocalPhrases,vocalLevel,vocalSequence,vocalMouth,vocalMotion} from './kauai-vocals.js?v=20260919-vocals-4';
import {add,at,clamp,ease,matrix,relative,visible,performance as makePerformance,recordedSound} from './scene-performance.js?v=20260919-uniform-1';
export const SANTEUIL_MARCH_SECONDS=14.4;
export const ORGAN='santeuil-cylinder-organ-instrument',TRAIN='santeuil-hogweed-locomotive';
export const TIMPLE='tenerife-timple-guitar',BOWL='tenerife-avocado-snack-bowl',CANARY='tenerife-atlantic-canary-costume';
export const MIC='xz1516-ohia-blossom-microphone',TAPE='xz1516-reel-to-reel-recorder';
export function strumTimes(male=false){return duetScore().filter(e=>e.part===(male?'companion':'primary')).map(e=>e.at);}
export function performanceEnvelope(ms,duration){return ease(ms/800)*(1-ease((ms-duration+900)/900));}
export function railTravel(ms){return railwayProgress(ms).travel;}
export function createFinalScenes(habitat,refresh=()=>{}){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const audio=recordedSound({organ:'santeuil-organ-long.wav',reeds:'santeuil-reeds.mp3',whistle:'santeuil-whistle.mp3',strum:'tenerife-strum.mp3',up:'tenerife-strum-up.mp3',eat:'reunion-eat.wav',primary:vocalPhrases.primary.file,companion:vocalPhrases.companion.file});
 const duetAudio=createDuetSound(),railAudio=createRailwaySound(),servings=snackServings();
 let action=null,raf=0,takes=[],idleTrack;
 function syncRailway(){
  idleTrack?.remove();idleTrack=null;
  if(action?.family===TRAIN)return;
  const root=habitat.querySelector('#worm-species');if(!root)return;
  const vehicles=[...habitat.querySelectorAll(`.accessory-piece[data-accessory-family="${TRAIN}"]`)].filter(visible).map(piece=>({part:piece.dataset.wormPart,base:relative(root,piece.querySelector('.location-accessory-art'))}));
  if(vehicles.length)idleTrack=drawRailwayTrack(root,vehicles).track;
 }

 const handles=p=>[ORGAN,TRAIN,TIMPLE,BOWL,MIC,TAPE].includes(p?.dataset.accessoryFamily);
 function cancel(){cancelAnimationFrame(raf);raf=0;audio.stop();duetAudio.stop();railAudio.stop();if(!action)return;const old=action;action=null;old.stage?.restore();delete habitat.dataset.sceneAction;delete habitat.dataset.railwayPhase;refresh();}
 function start(piece){if(!handles(piece)||!visible(piece))return false;if(action?.piece===piece)return true;cancel();
  const family=piece.dataset.accessoryFamily,part=piece.dataset.wormPart,percussion=family===BOWL&&part==='companion';
  const a={piece,family,part,percussion,cues:new Set(),duration:percussion?DUET_DURATION:family===MIC?4000:family===TAPE?6500:family===BOWL?SNACK_DURATION:family===TIMPLE?DUET_DURATION:family===TRAIN?RAILWAY_DURATION:part==='primary'?SANTEUIL_MARCH_SECONDS*1000+1800:9600};action=a;syncRailway();habitat.dataset.sceneAction='loading';
  const keys=[MIC,TAPE].includes(family)?['primary','companion']:family===BOWL?['eat']:family===TIMPLE?['strum','up']:family===TRAIN?['whistle']:[part==='primary'?'organ':'reeds'];
  const begin=()=>{if(action!==a||!visible(piece)||document.hidden)return;const portion=family===BOWL&&!percussion?servings.next(piece):-1;const s=a.stage=makePerformance(habitat,family);a.started=performance.now();a.hands={};for(const p of ['primary','companion'])a.hands[p]=[s.hand(p),s.hand(p)];
   if(family===TIMPLE||percussion){a.duet=prepareDuet(s,TIMPLE,CANARY,part,percussion?BOWL:null);a.duet.hands=a.hands;if(!reduced.matches)duetAudio.start(a.duet.score);}
   if(family===TRAIN){if(!reduced.matches)railAudio.prepare();a.ride=prepareRailway(s,TRAIN);a.ride.hands=a.hands.companion;}
   if(portion>=0){a.snack=prepareSnack(s,piece,portion,BOWL,CANARY,a.hands[part],servings.consume);if(reduced.matches)a.snack.paint(SNACK_DURATION);}
   if([MIC,TAPE].includes(family)){
    const other=part==='primary'?'companion':'primary';
    a.takes=family===MIC?[part,...(s.prop(MIC,other)?[other]:[])]:takes.length?[...takes]:['primary','companion'];
    a.vocals=vocalSequence(a.takes);
    a.duration=a.vocals.at(-1).at+a.vocals.at(-1).duration+800;
    a.mouths={};for(const part of ['primary','companion']){
     const n=s.actors[part].face.querySelector('.worm-smile');
     const tongue=add(s.actors[part].face,'path',{fill:'#cb8589',opacity:0,'pointer-events':'none'});
     a.mouths[part]={n,tongue,rest:n.getAttribute('d'),level:0};
     n.setAttribute('data-vocal-mouth',part);
    }
   }
   habitat.dataset.sceneAction=percussion?'percussion':family===MIC?'recording':family===TAPE?'playback':family===BOWL?'snack':family===TRAIN?'railway':'music';raf=requestAnimationFrame(tick);
  };
  if(reduced.matches)begin();else Promise.race([(family===TIMPLE||percussion)?duetAudio.prepare(percussion):audio.prepare(keys),new Promise(resolve=>setTimeout(resolve,4000))]).then(begin);return true;
 }
 function recording(a,env){const s=a.stage,tape=s.prop(TAPE),playback=a.family===TAPE;
  let level=0;
  const active=a.vocals.find(v=>a.ms>=v.at-250&&a.ms<v.at+v.duration+380);
  for(const [i,v]of a.vocals.entries()){
   const age=a.ms-v.at;level=Math.max(level,vocalLevel(v.part,age));
   if(age>=0&&!a.cues.has(i)){a.cues.add(i);audio.play(v.part,0,v.duration/1000,vocalPhrases[v.part].level);}
  }
  for(const part of ['primary','companion']){
   const v=a.vocals.find(v=>v.part===part),age=v?a.ms-v.at:-1;
   const pulse=vocalLevel(part,age),singing=!playback&&active?.part===part;
   const hold=!playback&&v?ease((age+650)/500)*(1-ease((age-v.duration)/550)):0;
   const rhythm=active?vocalMotion(active.part,a.ms-active.at-(singing?0:70)):{bend:0,nod:0};
   const strength=playback?.5:singing?1.25:.42;
   const mirror=part==='primary'?1:-1;
   s.pose(part,mirror*rhythm.bend*strength*env,
    ((playback?-.08:.22*hold-.08*(1-hold))+rhythm.nod*(singing?.48:.2))*env);
   if(playback)s.reach(a.hands[part][1],s.point(part,228,160),0,[228,160]);
   if(!playback){
    const palm=s.point(part,274+rhythm.bend*10,132-rhythm.nod*20);
    s.reach(a.hands[part][1],palm,hold*env,[228,160]);
   }
   const mouth=a.mouths[part],target=pulse;
   // Short attack/release smooths frame jitter without losing consonant closures.
   const dt=Math.min(80,Math.max(0,a.ms-(mouth.lastMs??a.ms)));mouth.lastMs=a.ms;
   mouth.level+=(target-mouth.level)*(1-Math.exp(-dt/(target>mouth.level?24:38)));
   const open=mouth.level;
   if(open>.035){
    mouth.n.setAttribute('d',vocalMouth(open));
    mouth.n.setAttribute('transform','translate(331.5 75) rotate(-8)');
    mouth.n.style.fill='var(--ink)';mouth.n.style.strokeWidth='1.4';
    const h=15*Math.pow(open,.55),w=(11.5-1.5*open)*.53;
    mouth.tongue.setAttribute('d',`M${-w} ${h*.4}Q0 ${h*.16} ${w} ${h*.4}Q0 ${h*.9} ${-w} ${h*.4}Z`);
    mouth.tongue.setAttribute('transform','translate(331.5 75) rotate(-8)');
    mouth.tongue.setAttribute('opacity',clamp((open-.08)*3));
   }else{
    mouth.n.setAttribute('d',mouth.rest);mouth.n.removeAttribute('transform');
    mouth.tongue.setAttribute('opacity',0);
    mouth.n.style.removeProperty('fill');mouth.n.style.removeProperty('stroke-width');
   }
   if(!playback){const mic=s.prop(MIC,part);if(mic)s.reach(a.hands[part][0],at(mic.base,0,29),hold*env);}
  }
  if(tape){
   for(const reel of tape.copy.querySelectorAll('[data-reel-centre]')){const [x,y]=reel.dataset.reelCentre.split(' ').map(Number);reel.setAttribute('transform',`rotate(${720*ease((a.ms-450)/(a.duration-1000))} ${x} ${y})`);}
   for(const needle of tape.copy.querySelectorAll('[data-tape-meter]')){const [x,y]=needle.dataset.tapeMeter.split(' ').map(Number);needle.setAttribute('transform',`rotate(${level*48} ${x} ${y})`);}
   tape.copy.querySelector('[data-record-lamp]')?.setAttribute('fill',playback?'#a1c89a':'#ed715f');
   // The smaller worm operates transport controls while the performers sing.
   const press=ease(a.ms/500)*(1-ease((a.ms-1000)/600));if(press>0)s.reach(a.hands.companion[1],at(tape.base,playback?-50:22,71),press,[228,160]);
  }
 }
 function snack(a){a.snack?.paint(a.ms);playSnackSounds(a.ms,a.cues,audio.play);}
 function cue(a,key,time,offset,duration,level=.12){if(time<=a.ms&&!a.cues.has(key)){a.cues.add(key);audio.play(key,offset,duration,level);}}
 function music(a,env){const s=a.stage,p=s.prop(ORGAN,a.part);if(!p)return;
  const t=a.ms/1000,active=ease((a.ms-650)/450)*(1-ease((a.ms-a.duration+1350)/450));
  s.pose(a.part,Math.sin(t*3.2)*.45*env,.23*env);s.pose(a.part==='primary'?'companion':'primary',Math.sin(t*3.2-.7)*.35*env,-.12*env);
  if(a.part==='primary'){
   const crank=p.copy.querySelector('[data-organ-crank]'),angle=1440*(a.duration-1400)/7600*ease((a.ms-650)/(a.duration-1400));crank?.setAttribute('transform',`translate(57 8) scale(1 .62) rotate(${angle}) scale(1 ${1/.62}) translate(-57 -8)`);
   const r=angle*Math.PI/180;s.reach(a.hands.primary[0],at(p.base,57+34*Math.cos(r),8+21*Math.sin(r)),env);s.reach(a.hands.primary[1],at(p.base,-44,10),env,[227,160]);cue(a,'organ',700,0,SANTEUIL_MARCH_SECONDS,.14);
  }else{
   const stretch=1+active*.2*Math.sin((t-.65)*Math.PI*1.15),delta=38*(stretch-1);
   p.copy.querySelector('[data-concertina-bellows]')?.setAttribute('transform',`scale(${stretch} 1)`);
   p.copy.querySelector('[data-concertina-far]')?.setAttribute('transform',`translate(${-delta} 0)`);p.copy.querySelector('[data-concertina-near]')?.setAttribute('transform',`translate(${delta} 0)`);
   s.reach(a.hands.companion[0],at(p.base,62+delta,5),env);s.reach(a.hands.companion[1],at(p.base,-48-delta,5),env,[228,160]);cue(a,'reeds',700,0,7.9,.13);
  }
 }
 function railway(a,env){
  const s=a.stage,ms=a.ms;
  moveRailway(s,a.ride,ms,env);
  habitat.dataset.railwayPhase=a.ride.phase;
  const push=ease((ms-900)/700)*(1-ease((ms-3200)/900));
  s.pose('primary',-1.3*push,.8*push);
  if(a.ride.engineMatrix){
   s.reach(a.hands.primary[0],at(a.ride.engineMatrix,-82,-8),push*env,[207,184]);
   s.reach(a.hands.primary[1],at(a.ride.engineMatrix,-90,20),push*env,[182,209]);
  }
  // The larger worm waves after release, then acknowledges the return.
  const wave=ease((ms-4600)/600)*(1-ease((ms-7000)/700));
  const greet=ease((ms-13500)/650)*(1-ease((ms-15500)/900));
  if(wave+greet>.001)s.reach(a.hands.primary[0],s.point('primary',305+5*Math.sin(ms/230),74),Math.max(wave,greet)*env);
  const clack=Math.floor(a.ride.travel/11);
  if(clack!==a.ride.clack&&Math.abs(a.ride.speed)>1){a.ride.clack=clack;railAudio.clack(a.ride.speed);}
  cue(a,'whistle',1700,0,1.7,.065);
 }
 function tick(now){raf=0;const a=action;if(!a)return;if(!visible(a.piece)||document.hidden){cancel();return;}
  a.ms=(a.family===TIMPLE||a.percussion)&&!reduced.matches?duetAudio.elapsed():now-a.started;const still=reduced.matches,env=still?0:performanceEnvelope(a.ms,a.duration);
  if(!still){if(a.family===ORGAN)music(a,env);else if(a.family===TRAIN)railway(a,env);else if(a.family===TIMPLE||a.percussion)a.duet.paint(a.ms);else if(a.family===BOWL)snack(a,env);else recording(a,env);}
  if(a.ms>=(still?300:a.duration)){if(!still&&a.family===MIC&&a.stage.prop(TAPE))takes=[...takes.filter(p=>!a.takes.includes(p)),...a.takes].slice(-2);cancel();return;}raf=requestAnimationFrame(tick);
 }
 document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});window.addEventListener('resize',cancel);window.addEventListener('pagehide',cancel);reduced.addEventListener('change',cancel);
 return {handles,start,cancel,syncRailway,reset:servings.reset,clear(){cancel();takes=[];servings.clear();},get active(){return !!action;}};
}
