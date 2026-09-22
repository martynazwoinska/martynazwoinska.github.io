import {add,at,relative,matrix,ease,clamp,visible,recordedSound} from './scene-performance.js?v=20260919-uniform-1';
export const SAMPLE_FAMILY='trivandrum-sample-tube';
export const SAMPLE_DURATION=7900;
export const SAMPLE_RETURN_DURATION=900;
const pulse=(t,a,b,c,d)=>ease((t-a)/b)*(1-ease((t-c)/d));
export function sampleFrame(ms,reduced=false){
 if(reduced)return {reach:1,open:0,lift:0,tip:0,transfer:1,inspect:1,holding:true};
 return {reach:ease(ms/750),open:pulse(ms,750,700,6300,800),
 lift:pulse(ms,1700,1400,4700,1500),tip:pulse(ms,2900,650,4350,700),
 transfer:ease((ms-3450)/850),inspect:ease((ms-5600)/1300),holding:ms>=SAMPLE_DURATION};
}
export function sampleReturnFrame(ms,from,reduced=false){
 const amount=reduced?0:1-ease(ms/SAMPLE_RETURN_DURATION),f={...from,holding:false,done:reduced||ms>=SAMPLE_RETURN_DURATION};
 for(const key of ['reach','open','lift','tip','inspect'])f[key]=from[key]*amount;
 return f;
}
export const isSamplePlate=p=>p?.dataset.accessoryFamily===SAMPLE_FAMILY&&p.dataset.wormPart==='companion';
const isLoupe=p=>p?.dataset.accessoryFamily==='trivandrum-field-loupe';
export function createTrivandrumSamples(habitat,{actor,hand,reach}){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const sound=recordedSound({cap:'nambucca-press-close.wav',leaf:'nambucca-paper-slide.wav'});
 let run=null,raf=0;
 const handles=p=>isSamplePlate(p)||(!!run&&isLoupe(p)&&p.dataset.wormPart==='companion');
 const preserves=p=>!!run&&(p?.dataset.accessoryFamily===SAMPLE_FAMILY||isLoupe(p));
 const piece=(family,part)=>habitat.querySelector(`.accessory-piece[data-accessory-family="${family}"][data-worm-part="${part}"]`);
 function cancel(){cancelAnimationFrame(raf);raf=0;sound.stop();const r=run;run=null;if(!r)return;
  for(const [n,k,v]of r.saved)v===null?n.removeAttribute(k):n.setAttribute(k,v);
  for(const [n,key,value,priority]of r.styles)value?n.style.setProperty(key,value,priority):n.style.removeProperty(key);
  for(const a of r.actors)a.restore();for(const a of r.paused)if(a.playState==='paused')a.play();r.layer.remove();delete habitat.dataset.sampleActivity;
 }
 function save(r,n,key){if(n&&!r.saved.some(x=>x[0]===n&&x[1]===key))r.saved.push([n,key,n.getAttribute(key)]);}
 function prop(r,p){if(!visible(p))return null;const art=p.querySelector('.location-accessory-art');
  for(const n of [p,art]){for(const key of ['transform-box','transform-origin'])r.styles.push([n,key,n.style.getPropertyValue(key),n.style.getPropertyPriority(key)]);const b=n.getBBox();n.style.transformBox='view-box';n.style.transformOrigin=`${b.x+b.width/2}px ${b.y+b.height/2}px`;}
  const paused=p.getAnimations({subtree:true}).filter(a=>a.playState==='running');paused.forEach(a=>a.pause());r.paused.push(...paused);save(r,art,'transform');
  return {p,art,base:relative(r.root,art),parent:relative(r.root,art.parentNode)};
 }
 const position=(p,dx,dy,angle=0)=>{if(!p)return;const next=new DOMMatrix().translate(dx,dy).multiply(p.base).rotate(angle);p.art.setAttribute('transform',matrix(p.parent.inverse().multiply(next)));return next;};
 function start(target){if(!handles(target)||!visible(target)||document.hidden)return false;
  if(run){
   if(run.returning)return true;
   if(isLoupe(target)){
    if(run.lastFrame?.holding){run.loupeFrom=run.loupeAmount;run.loupeTo=run.loupeTo?0:1;run.loupeStarted=performance.now();}
   }else run.returning={start:performance.now(),from:run.lastFrame||sampleFrame(0,reduced.matches)};
   return true;
  }
  const root=habitat.querySelector('#worm-species'),r={target,root,saved:[],styles:[],paused:[],actors:[],cues:new Set(),delivered:false,start:performance.now()};run=r;
  r.layer=add(root,'g',{'data-sample-action':'','pointer-events':'none','aria-hidden':'true'});
  r.actors=[actor(habitat.querySelector('#primary-worm > .worm-body'),root,false),actor(habitat.querySelector('#companion-worm > .companion-body'),root,true)];
  r.tube=prop(r,piece(SAMPLE_FAMILY,'primary'));r.dish=prop(r,piece(SAMPLE_FAMILY,'companion'));
  r.loupe=prop(r,piece('trivandrum-field-loupe','companion'));r.loupeFrom=1;r.loupeTo=1;r.loupeAmount=1;r.loupeStarted=r.start;
  if(!r.tube||!r.dish){cancel();return false;}
  r.vessel=r.tube.art.querySelector('[data-sample-vessel]');r.cap=r.tube.art.querySelector('[data-sample-cap]');r.leaf=r.tube.art.querySelector('[data-sample-leaf]');
  r.received=r.dish.art.querySelector('[data-dish-leaf]');r.worm=r.dish.art.querySelector('[data-specimen-worm]');
  save(r,r.cap,'transform');save(r,r.leaf,'opacity');save(r,r.worm,'d');save(r,r.worm,'opacity');save(r,r.received,'opacity');
  r.received.setAttribute('opacity',0);r.worm.setAttribute('opacity',0);
  r.flying=r.leaf.cloneNode(true);r.flying.removeAttribute('data-sample-leaf');r.flying.setAttribute('opacity',0);r.layer.appendChild(r.flying);
  r.hands=[hand(r.layer,false),hand(r.layer,false),hand(r.layer,true),hand(r.layer,true)];
  r.dishBase=at(r.dish.base,0,7);r.lensBase=r.loupe?at(r.loupe.base,34,-26):null;
  sound.prepare(['cap','leaf']);habitat.dataset.sampleActivity='opening';raf=requestAnimationFrame(tick);return true;
 }
 function cue(r,key,ms,atMs,duration,level){if(ms>=atMs&&!r.cues.has(key)){r.cues.add(key);sound.play(key==='close'?'cap':key,0,duration,level);}}
 function tick(now){const r=run;if(!r)return;if(!visible(r.target)){cancel();return;}if(document.hidden){raf=0;return;}
  const ms=now-r.start,f=r.returning?sampleReturnFrame(now-r.returning.start,r.returning.from,reduced.matches):sampleFrame(ms,reduced.matches),[female,male]=r.actors;r.lastFrame=f;
  if(f.done){cancel();return;}
  habitat.dataset.sampleActivity=r.returning?'returning':f.holding?'holding':f.inspect>.95?'examining':f.inspect>.05?'lifting':f.transfer>0&&f.transfer<1?'transferring':f.open>.05?'opening':'settling';
  female.pose({effort:f.lift*.7,duck:0,shake:0});male.pose({effort:0,duck:f.inspect*.6,shake:0});
  const hold=male.point(390,125),inspectAt=male.point(375,112),dx=(hold.x-r.dishBase.x)*f.reach+(inspectAt.x-hold.x)*f.inspect,dy=(hold.y-r.dishBase.y)*f.reach+(inspectAt.y-hold.y)*f.inspect;
  const dishMatrix=position(r.dish,dx,dy),dishAt=at(dishMatrix,0,7);
  // The mouth of the tube approaches the receiver before any material falls.
  const tentative=r.tube.base.rotate(-35*f.tip),vesselBase=relative(r.root,r.vessel);
  const localVessel=relative(r.root,r.tube.art).inverse().multiply(vesselBase);
  const mouth=at(tentative.multiply(localVessel),-145,0),destination={x:dishAt.x+24,y:dishAt.y-35};
  const tubeMatrix=position(r.tube,(destination.x-mouth.x)*f.lift,(destination.y-mouth.y)*f.lift,-35*f.tip);
  const vessel=tubeMatrix.multiply(localVessel);
  r.cap.setAttribute('transform',`translate(${-37*f.open} ${-20*Math.sin(Math.PI*f.open)}) rotate(${-12*f.open} -135 0)`);
  const capAt=at(vessel,-145-37*f.open,-20*Math.sin(Math.PI*f.open));
  const carry=pulse(ms,0,750,7000,900)*(r.returning?f.reach:1);
  reach(r.hands[0],female,at(vessel,60,26),carry,[229,159]);
  reach(r.hands[1],female,capAt,carry*f.open,[252,128]);
  reach(r.hands[2],male,at(dishMatrix,65,18),f.reach,[243,145]);
  r.loupeAmount=r.loupeFrom+(r.loupeTo-r.loupeFrom)*(reduced.matches?1:ease((now-r.loupeStarted)/400));
  if(r.loupe){const inspect=f.inspect*r.loupeAmount;position(r.loupe,(dishAt.x-r.lensBase.x)*inspect,(dishAt.y-r.lensBase.y)*inspect);
   reach(r.hands[3],male,at(relative(r.root,r.loupe.art),-12,63),inspect,[263,115]);}
  const q=f.transfer;
  if(q>0&&q<1){r.leaf.setAttribute('opacity',0);const source=at(vessel,-72,7),exit=at(vessel,-160,4);let x,y;
   if(q<.55){const t=ease(q/.55);x=source.x+(exit.x-source.x)*t;y=source.y+(exit.y-source.y)*t;}
   else {const t=(q-.55)/.45;x=exit.x+(dishAt.x-exit.x)*t;y=exit.y+(dishAt.y-exit.y)*t*t;}
   r.flying.setAttribute('transform',matrix(new DOMMatrix().translate(x,y).rotate(17+q*25).scale(Math.hypot(vessel.a,vessel.b))));r.flying.setAttribute('opacity',1);
  }else r.flying.setAttribute('opacity',0);
  if(q>=1&&!r.delivered){r.delivered=true;r.received.setAttribute('opacity',1);r.worm.setAttribute('opacity',1);for(const item of r.saved)if(item[1]==='opacity'&&(item[0]===r.received||item[0]===r.worm))item[2]='1';}
  if(r.delivered&&!reduced.matches){const wave=Math.sin(ms/280)*3*f.inspect;r.worm.setAttribute('d',`M-18 2Q-8 ${-6+wave} 2 2T22 ${2-wave}`);r.worm.setAttribute('opacity',.85);}
  if(!reduced.matches){cue(r,'cap',ms,1350,.16,.025);cue(r,'leaf',ms,3540,.65,.022);cue(r,'close',ms,6880,.16,.025);}
  raf=requestAnimationFrame(tick);
 }
 window.addEventListener('pagehide',cancel);
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;sound.stop();}else if(run&&!raf)raf=requestAnimationFrame(tick);});
 return {handles,preserves,start,cancel,get active(){return !!run;}};
}
