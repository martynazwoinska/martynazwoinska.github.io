import {at,bodyPoint,ease,matrix,relative,visible,performance as makePerformance,recordedSound} from './scene-performance.js?v=20260919-uniform-1';
export const GONG_FAMILY='ju1873-balinese-gamelan-gong',GONG_DURATION=11600;
const WRAP='ju1873-balinese-endek-wrap';
// An original playful exchange, not a transcription of traditional gamelan.
export function gongScore(male){
 const times=male?[1400,1700,2000,3800,4100,4400,6200,6500,6800,7100,8000]:[800,3200,5600,8000];
 return times.map((at,i)=>({at,index:male?i%2:0,key:male?(i%2?'two':'one'):'low',level:male?(i%3===0?.095:.075):.14,duration:male?1.4:3.5,offset:male?(i%2?.426:.048):.198}));
}
export function gongEnvelope(ms){return ease(ms/650)*(1-ease((ms-9400)/1000));}
export function gongStroke(ms,male,index){
 let strike=0,anticipation=0,vibration=0;
 for(const hit of gongScore(male).filter(h=>h.index===index)){
  const t=ms-hit.at;
  if(t>=-270&&t< -100)anticipation=Math.max(anticipation,ease((t+270)/170));
  if(t>=-100&&t<0){anticipation=Math.max(anticipation,1-ease((t+100)/100));strike=Math.max(strike,ease((t+100)/100));}
  if(t>=0&&t<300)strike=Math.max(strike,1-ease(t/300));
  if(t>=0&&t<1500)vibration+=Math.sin(t/31)*Math.exp(-t/420)*(male?.35:.65);
 }
 return {strike,anticipation,vibration};
}
export function gongMalletPose(ms,male,index){
 const f=gongStroke(ms,male,index),hold=gongEnvelope(ms);
 const rest=male?(index?{x:46,y:-38,angle:43}:{x:-61,y:-28,angle:-40}):{x:76,y:17,angle:-25};
 const boss=male?(index?{x:35,y:0}:{x:-36,y:7}):{x:-5,y:7};
 const angle=male?-145+(index?-12:8)-f.anticipation*9+f.strike*8:-58+f.anticipation*12-f.strike*7;
 // Padded heads arrive at the raised boss on the audible beat, then rebound.
 const x=boss.x+(male?0:38)*(1-f.strike)+(male?0:8)*f.anticipation;
 const y=boss.y-(male?25:3)*(1-f.strike)-(male?9:2)*f.anticipation;
 const a=rest.angle*Math.PI/180,head=male?-5:-6;
 return {x:rest.x-Math.sin(a)*head+(x-rest.x+Math.sin(a)*head)*hold,
  y:rest.y+Math.cos(a)*head+(y-rest.y-Math.cos(a)*head)*hold,
  angle:rest.angle+(angle-rest.angle)*hold,hold,...f};
}
export function gongBodyPose(ms,male){
 const hold=gongEnvelope(ms),pulse=Math.max(...gongScore(male).map(h=>{
  const t=ms-h.at;return t<0?ease((t+240)/240):1-ease(t/430);
 }));
 return {bend:hold*(male?-.6-.55*pulse:.6+.65*pulse),look:hold*(.55+.3*pulse)};
}
export function playGongCues(ms,score,cues,play){
 for(const h of score)if(ms>=h.at&&!cues.has(h)){
  cues.add(h);if(ms-h.at<130)play(h.key,h.offset,h.duration,h.level);
 }
}
export function prepareGongs(stage){
 const players=[];
 for(const part of ['primary','companion']){
  const prop=stage.prop(GONG_FAMILY,part);if(!prop)continue;
  const male=part==='companion',wrap=stage.prop(WRAP,part);
  const mallets=[...prop.copy.querySelectorAll('[data-gong-mallet]')].map(n=>({n,original:relative(prop.copy,n.children[0])}));
  const metals=[...prop.copy.querySelectorAll('[data-gong-metal]')];
  players.push({part,prop,male,wrap,mallets,metals,hands:[stage.hand(part),stage.hand(part)]});
 }
 const score=players.flatMap(p=>gongScore(p.male)).sort((a,b)=>a.at-b.at);
 return {score,paint(ms){
  stage.layer.dataset.gongPhase=ms<650?'ready':ms<8300?'duet':'ring';
  for(const p of players){
   const body=gongBodyPose(ms,p.male);stage.pose(p.part,body.bend,body.look);
   const hold=gongEnvelope(ms),base=new DOMMatrix().translate((p.male?20:-55)*hold,(p.male?-15:-40)*hold).multiply(p.prop.base);
   p.prop.g.setAttribute('transform',matrix(base));
   if(p.wrap){const a=stage.actors[p.part],q=bodyPoint(235,145,body.bend,body.look);
    p.wrap.g.setAttribute('transform',matrix(a.base.translate(q.x-235,q.y-145).multiply(a.base.inverse()).multiply(p.wrap.base)));
   }
   p.mallets.forEach((mallet,index)=>{
    const f=gongMalletPose(ms,p.male,index),head=p.male?-5:-6;
    const moved=new DOMMatrix().translate(f.x,f.y).rotate(f.angle).translate(0,-head);
    mallet.n.setAttribute('transform',matrix(moved.multiply(mallet.original.inverse())));
    stage.reach(p.hands[index],at(base.multiply(moved),0,p.male?50:62),f.hold,p.male?(index?[289,115]:[228,160]):[289,115]);
    p.metals[index]?.setAttribute('transform',`translate(${f.vibration} 0)`);
   });
   if(!p.male)stage.reach(p.hands[1],at(base,-63,60),hold,[228,160]);
  }
 }};
}
export function createBaliGongs(habitat,{sound=recordedSound({low:'bali-gong-low.mp3',one:'bali-kettle-one.mp3',two:'bali-kettle-two.mp3'}),makeStage=makePerformance}={}){
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 let active=null,raf=0;
 function cancel(){cancelAnimationFrame(raf);raf=0;sound.stop();if(!active)return;
  active.stage?.restore();delete active.piece.dataset.gongPlaying;active=null;
 }
 function start(piece){if(piece?.dataset.accessoryFamily!==GONG_FAMILY||!visible(piece))return false;
  cancel();if(reduced.matches)return true;
  const run=active={piece,cues:new Set()};piece.dataset.gongPlaying='true';
  const begin=()=>{if(active!==run)return;if(!visible(piece)||document.hidden){cancel();return;}
   run.stage=makeStage(habitat,GONG_FAMILY);const concert=prepareGongs(run.stage),began=performance.now();
   const tick=now=>{if(active!==run)return;if(!visible(piece)||document.hidden){cancel();return;}
    const ms=now-began;concert.paint(ms);playGongCues(ms,concert.score,run.cues,sound.play);
    if(ms>=GONG_DURATION){cancel();return;}raf=requestAnimationFrame(tick);
   };raf=requestAnimationFrame(tick);
  };
  sound.prepare(['low','one','two']).then(begin,begin);return true;
 }
 for(const name of ['pagehide','resize'])window.addEventListener(name,cancel);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});reduced.addEventListener('change',cancel);
 return {start,cancel,get active(){return !!active;}};
}
