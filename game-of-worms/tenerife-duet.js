import {at,bodyPoint,clamp,ease,matrix} from './scene-performance.js?v=20260919-uniform-1';
import {pathPoints} from './guadeloupe-dance.js?v=20260916-gwoka-11';

export const BEAT=60000/112, LEAD_IN=800, DUET_DURATION=LEAD_IN+16*BEAT+1250;
const other=part=>part==='primary'?'companion':'primary';
// An original rhythmic conversation: call, answer, shorter exchanges, unison.
export function duetScore(leader='primary'){
 const events=[];
 const phrase=(part,start,beats,section)=>beats.forEach((beat,i)=>events.push({
  part,at:LEAD_IN+(start+beat)*BEAT,beat:start+beat,section,
  up:beat%1!==0,accent:i===0?1:beat%1?.58:.8,fret:i%3
 }));
 phrase(leader,0,[0,1,1.5,2.5,3,3.5],'call');
 phrase(other(leader),4,[0,.5,1.5,2,2.5,3.5],'answer');
 phrase(leader,8,[0,1,1.5],'exchange');
 phrase(other(leader),10,[0,.5,1.5],'exchange');
 phrase(leader,12,[0,1,1.5,2.5,3],'together');
 phrase(other(leader),12,[0,.5,1.5,2,3],'together');
 for(const part of [leader,other(leader)])phrase(part,16,[0],'finish');
 return events.sort((a,b)=>a.at-b.at);
}
export function shakerScore(){
 const score=[];
 for(let beat=0;beat<=12;beat+=.5){
  const at=1600+beat*BEAT,finish=beat===12;
  score.push({part:'companion',key:'shaker',at,beat,accent:beat%1?.5:.85,section:finish?'finish':'percussion',up:false,fret:0});
  if(beat%2===0||beat%4===1.5||beat%4===3)score.push({part:'primary',at,beat,accent:beat%2===0?.85:.6,section:finish?'finish':'percussion',up:beat%1!==0,fret:Math.floor(beat/2)%3});
 }
 return score.sort((a,b)=>a.at-b.at);
}
export function shakerFrame(ms){
 const park=ease(ms/650)*(1-ease((ms-DUET_DURATION+650)/650));
 const lift=ease((ms-650)/700)*(1-ease((ms-DUET_DURATION+1550)/750));
 const energy=ease((ms-1350)/250)*(1-ease((ms-(1600+12*BEAT))/350));
 return {park,lift,shake:Math.cos((ms-1600)/BEAT*Math.PI*2)*energy};
}
export function duetFrame(ms,part,score){
 const own=score.filter(e=>e.part===part),beat=(ms-LEAD_IN)/BEAT;
 const phrase=own.find(e=>ms>=e.at-260&&ms<e.at+400);
 const stroke=own.find(e=>ms>=e.at-85&&ms<e.at+150);
 // Hand crosses the central strings exactly at the attack, then relaxes.
 let sweep=-23;
 if(stroke){const age=ms-stroke.at;
  if(stroke.up)sweep=age< -50?-23+46*ease((age+85)/35):age<0?23*(1-ease((age+50)/50)):-23*ease(age/65);
  else sweep=age<0?-23*(1-ease((age+85)/85)):age<65?23*ease(age/65):23-46*ease((age-65)/85);
 }
 const pulse=Math.max(0,...own.map(e=>{const age=ms-e.at;return age>=-110&&age<280?Math.sin(Math.PI*clamp((age+110)/390))**2*e.accent:0;}));
 const env=ease(ms/650)*(1-ease((ms-DUET_DURATION+700)/700));
 const engagement=Math.max(0,...own.map(e=>ease((ms-e.at+350)/300)*(1-ease((ms-e.at-180)/500))));
 const active=!!phrase,amplitude=.38+.87*engagement;
 const phase=(beat/4)*Math.PI*2+(part==='primary'?0:Math.PI*.24);
 const finish=ease((beat-15.7)/.3)*(1-ease((beat-16.4)/.8));
 return {bend:env*(amplitude*Math.sin(phase)-finish*.5),
  look:env*(-.12+.3*engagement+pulse*.5+finish*.25),
  sweep,grip:env,playing:!!stroke,active,pulse,
  fret:(phrase?.fret??0),wing:env*(pulse*2+finish*6),env};
}

// Deform temporary costume copies in the same coordinates as their bodies.
// The originals, including visitor placement/scale, remain untouched.
export function fitCostumes(stage,costumeFamily){
 const costumes={};
 for(const part of ['primary','companion']){
  const p=stage.prop(costumeFamily,part);if(!p)continue;
  const toBody=stage.actors[part].base.inverse().multiply(p.base),fromBody=toBody.inverse();
  const paths=[...p.copy.children].filter(n=>n.tagName==='path').map(n=>({n,points:pathPoints(n.getAttribute('d'))}));
  const wings=[...p.copy.querySelectorAll('[data-canary-wing]')];
  const buckle=p.copy.querySelector('ellipse');
  costumes[part]={p,toBody,fromBody,paths,wings,buckle};
 }
 return (part,f)=>{
   const costume=costumes[part];
   if(costume){
    const convert=(x,y)=>{const b=at(costume.toBody,x,y),q=bodyPoint(b.x,b.y,f.bend,f.look);return at(costume.fromBody,q.x,q.y);};
    for(const p of costume.paths)p.n.setAttribute('d',p.points.map(q=>{if(q.close)return 'Z';const v=convert(q.x,q.y);return `${q.move?'M':'L'}${v.x.toFixed(3)} ${v.y.toFixed(3)}`;}).join(' '));
    const joint=convert(262,104);
    for(const wing of costume.wings)wing.setAttribute('transform',`translate(${joint.x-262} ${joint.y-104}) rotate(${f.wing*(wing.dataset.canaryWing==='near'?-1:.45)} 262 104)`);
    if(costume.buckle){const x=+costume.buckle.getAttribute('cx'),y=+costume.buckle.getAttribute('cy'),q=convert(x,y);costume.buckle.setAttribute('transform',`translate(${q.x-x} ${q.y-y})`);}
   }
 };
}
export function prepareDuet(stage,instrumentFamily,costumeFamily,leader,shakerFamily=null){
 const score=shakerFamily?shakerScore().filter(e=>e.key==='shaker'||stage.prop(instrumentFamily,e.part)):duetScore(leader),fit=fitCostumes(stage,costumeFamily);
 return {score,paint(ms){
  let phase='ready';
  for(const event of score)if(event.at<=ms)phase=event.section;
  stage.layer.dataset.duetPhase=phase;
  for(const part of ['primary','companion']){
   const f=duetFrame(ms,part,score),actor=stage.actors[part];
   stage.pose(part,f.bend,f.look);fit(part,f);
   const p=stage.prop(instrumentFamily,part);
   if(shakerFamily&&part==='companion'){
    const r=stage.prop(shakerFamily,part),motion=shakerFrame(ms);
    let parked;
    if(p){parked=new DOMMatrix().translate(-25*motion.park,48*motion.park).multiply(p.base).rotate(22*motion.park);p.g.setAttribute('transform',matrix(parked));}
    if(r){
     const grip=at(r.base,0,58),target=stage.point(part,270,180);
     const dx=(target.x-grip.x+motion.shake*5)*motion.lift,dy=(target.y-grip.y-motion.shake*1.5)*motion.lift;
     const base=new DOMMatrix().translate(dx,dy).multiply(r.base).translate(0,58).rotate(motion.shake*18*motion.lift).translate(0,-58);
     r.g.setAttribute('transform',matrix(base));r.g.dataset.shakerLift=motion.lift.toFixed(3);
     const hand=at(base,0,58),putDown=parked?at(parked,0,14):stage.point(part,253,134);
     const reach=ease((ms-450)/250)*(1-ease((ms-DUET_DURATION+850)/300));
     stage.reach(this.hands[part][0],{x:putDown.x+(hand.x-putDown.x)*reach,y:putDown.y+(hand.y-putDown.y)*reach},f.grip,[253,134]);
    }
    if(parked)stage.reach(this.hands[part][1],at(parked,3,-66),(1-motion.lift)*f.grip,[228,160]);
    continue;
   }
   if(!p)continue;
   // The sling rests against the moving middle; hands target that moved prop.
   const anchor=bodyPoint(240,169,f.bend,f.look),shift=actor.base.translate(anchor.x-240,anchor.y-169).multiply(actor.base.inverse());
   const base=shift.multiply(p.base).rotate(f.bend*1.3);
   p.g.setAttribute('transform',matrix(base));p.g.dataset.duetPlaying=String(f.playing);
   stage.reach(this.hands[part][0],at(base,f.sweep,part==='primary'?14:10),f.grip,[253,134]);
   stage.reach(this.hands[part][1],at(base,3,(part==='primary'?-81:-66)+f.fret*7),f.grip,[228,160]);
  }
 }};
}

// Schedule on the audio clock, then drive the picture from the same clock.
// Existing CC0 nylon-string recordings retain their original pitch and speed.
export function createDuetSound(){
 let context,startTime=0,fallback=0,token=0;
 const buffers=new Map(),voices=new Set();
 async function prepare(percussion=false){try{
  context??=new(window.AudioContext||window.webkitAudioContext)();await context.resume();
  await Promise.all((percussion?['strum','up','shaker']:['strum','up']).map(async key=>{if(buffers.has(key))return;
   const file=key==='shaker'?'tenerife-shaker.mp3':key==='up'?'tenerife-strum-up.mp3':'tenerife-strum.mp3';
   const r=await fetch(new URL('./assets/audio/'+file,import.meta.url),{signal:AbortSignal.timeout(4000)});
   if(!r.ok)throw Error(r.status);const b=await context.decodeAudioData(await r.arrayBuffer());
   let peak=.001;for(let c=0;c<b.numberOfChannels;c++)for(const v of b.getChannelData(c))peak=Math.max(peak,Math.abs(v));
   // Ignore encoder padding/leading silence so the stroke lands on the sound.
   let first=b.length;for(let c=0;c<b.numberOfChannels;c++){const data=b.getChannelData(c);for(let i=0;i<data.length;i++)if(Math.abs(data[i])>=peak*.12){first=Math.min(first,i);break;}}
   const offset=Math.max(0,first/b.sampleRate-.003);
   buffers.set(key,{b,peak,offset});
  }));
 }catch{}}
 function stop(){token++;for(const v of voices){try{v.g.gain.cancelScheduledValues(context.currentTime);v.g.gain.setTargetAtTime(0,context.currentTime,.008);v.n.stop(context.currentTime+.04);}catch{}}voices.clear();}
 function start(score){stop();fallback=performance.now();startTime=context?.currentTime??0;
  if(context?.state!=='running')return;
  const generation=token;
  for(const e of score){const source=buffers.get(e.key??(e.up?'up':'strum'));if(!source)continue;
   const n=context.createBufferSource(),g=context.createGain(),pan=context.createStereoPanner(),filter=context.createBiquadFilter();
   const duration=Math.min(source.b.duration-source.offset,e.key==='shaker'?.2:e.section==='finish'?.8:e.up?.3:.44),when=startTime+e.at/1000;
   n.buffer=source.b;filter.type='lowpass';filter.frequency.value=e.part==='primary'?4200:6500;
   pan.pan.value=e.part==='primary'?.2:-.2;
   n.connect(filter);filter.connect(g);g.connect(pan);pan.connect(context.destination);
   const level=(e.key==='shaker'?.072:e.section==='together'||e.section==='finish'?.063:.105)*e.accent,gain=Math.min(.8,level/source.peak);
   g.gain.setValueAtTime(0,when);g.gain.linearRampToValueAtTime(gain,when+.006);g.gain.setValueAtTime(gain,when+duration-.09);g.gain.linearRampToValueAtTime(0,when+duration);
   const voice={n,g};voices.add(voice);n.onended=()=>{if(generation===token)voices.delete(voice);n.disconnect();filter.disconnect();g.disconnect();pan.disconnect();};n.start(when,source.offset,duration);
  }
 }
 return {prepare,start,stop,elapsed:()=>context?.state==='running'?(context.currentTime-startTime)*1000:performance.now()-fallback};
}
