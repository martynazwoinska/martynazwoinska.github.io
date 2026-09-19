import {BOOK,BAG,CROWN,add,pencil} from './orsay-art.js?v=20260919-orsay-pose-3';
import {pathPoints} from './guadeloupe-dance.js?v=20260916-gwoka-11';
const clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>{x=clamp(x);return x*x*x*(10+x*(-15+6*x));};
const mix=(a,b,t)=>({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t});
const mat=m=>new DOMMatrix([m.a,m.b,m.c,m.d,m.e,m.f]);
const transform=m=>`matrix(${[m.a,m.b,m.c,m.d,m.e,m.f].join(' ')})`;
export const DURATION=9400;
export function sketchFrame(ms){
 const enter=ease(ms/1100),leave=ease((ms-8200)/1200);
 return {enter,leave,envelope:enter*(1-leave),open:ease((ms-150)/550)*(1-ease((ms-8150)/900)),
  progress:clamp((ms-2100)/4600),
  posing:ease((ms-550)/1250)*(1-ease((ms-6600)/650)),
  peek:ease((ms-6700)/700)*(1-ease((ms-7700)/500)),done:ms>=DURATION};
}
// The tail stays planted. A curious lean grows along the upper body rather
// than translating the worm, while the middle holds an expressive curve.
export function sketchPose(x,y,bend=0,look=0,peek={x:0,y:0}){
 const middle=Math.sin(Math.PI*clamp((y-87)/180))**2*ease((x-105)/75);
 const front=ease((x-255)/65),lean=ease((x-170)/150);
 return {x:x+bend*middle*23-look*front*13+peek.x*lean,y:y+look*front*17+peek.y*lean};
}
export function boundedPeek(x,y){const scale=Math.min(1,62/Math.max(1,Math.hypot(x,y)));return {x:x*scale,y:y*scale};}
// One deliberate change of silhouette, held throughout the portrait. Keep the
// head and tail anchored so the model's accessories can stay where placed.
export function modelBody(ms,male){
 const stance=ease((ms-150)/1450)*(1-ease((ms-6700)/1000));
 return {bend:(male?-1.55:1.35)*stance,look:0,lean:{x:0,y:0}};
}
// Two fixed-length segments keep the elbow attached and prevent rubbery arms.
export function poseElbow(shoulder,hand,upper,lower,side=1){
 const dx=hand.x-shoulder.x,dy=hand.y-shoulder.y,d=Math.max(.001,Math.hypot(dx,dy));
 const along=(upper*upper-lower*lower+d*d)/(2*d),height=Math.sqrt(Math.max(0,upper*upper-along*along));
 return {x:shoulder.x+dx/d*along-dy/d*height*side,y:shoulder.y+dy/d*along+dx/d*height*side};
}
export function modelArms(male,amount){
 const shoulder={x:310,y:105},hand=mix({x:334,y:181},male?{x:274,y:123}:{x:335,y:87},amount);
 const elbow=poseElbow(shoulder,hand,47,53,male?-1:1);
 const supportShoulder={x:270,y:118},support=mix({x:281,y:190},male?{x:312,y:133}:elbow,amount);
 return [{shoulder,elbow,hand},{shoulder:supportShoulder,elbow:poseElbow(supportShoulder,support,48,56,1),hand:support}];
}
function foley(){
 let context;const buffers=new Map(),pending=new Set(),voices=new Set();
 function prepare(){try{context??=new(window.AudioContext||window.webkitAudioContext)();context.resume().catch(()=>{});
  for(const [key,file]of [['pencil','orsay-pencil.mp3'],['paper','nambucca-paper-slide.wav']]){
   if(buffers.has(key)||pending.has(key))continue;pending.add(key);
   fetch(new URL(`./assets/audio/${file}`,import.meta.url),{signal:AbortSignal.timeout(5000)}).then(r=>{if(!r.ok)throw Error(r.status);return r.arrayBuffer();}).then(b=>context.decodeAudioData(b)).then(buffer=>buffers.set(key,buffer)).catch(()=>{}).finally(()=>pending.delete(key));
  }
 }catch{}}
 function stop(){for(const v of voices){try{v.stop();}catch{}}voices.clear();}
 function play(key,index=0){
  const buffer=buffers.get(key);if(!buffer||context?.state!=='running')return;
  const offset=key==='paper'?0:[1.3,3.1,5.2,7.3][index%4],duration=key==='paper'?.44:.62;
  if(offset+duration>buffer.duration)return;
  const samples=buffer.getChannelData(0);let peak=.001;
  for(let i=Math.floor(offset*buffer.sampleRate);i<(offset+duration)*buffer.sampleRate;i++)peak=Math.max(peak,Math.abs(samples[i]||0));
  const volume=Math.min(.8,(key==='paper'?.045:.065)/peak),source=context.createBufferSource(),gain=context.createGain(),now=context.currentTime;
  source.buffer=buffer;source.connect(gain);gain.connect(context.destination);
  gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(volume,now+.025);gain.gain.setValueAtTime(volume,now+duration-.065);gain.gain.linearRampToValueAtTime(0,now+duration);
  voices.add(source);source.onended=()=>{voices.delete(source);source.disconnect();gain.disconnect();};source.start(now,offset,duration);
 }
 return {prepare,play,stop};
}
export function createOrsaySketching(habitat,refresh=()=>{}){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),audio=foley();let action=null,raf=0;
 const visible=n=>n?.isConnected&&!n.closest('[hidden]');
 const handles=p=>[BOOK,BAG].includes(p?.dataset.accessoryFamily);
 const find=(family,part)=>habitat.querySelector(`.accessory-piece[data-accessory-family="${family}"][data-worm-part="${part}"]`);
 function cancel(completed=false){
  cancelAnimationFrame(raf);raf=0;audio.stop();const a=action;if(!a)return;action=null;
  for(const [n,name,value]of a.saved){if(value===null)n.removeAttribute(name);else n.setAttribute(name,value);}
  for(const [n,offset]of a.strokes)n.setAttribute('stroke-dashoffset',completed?0:offset);
  for(const paused of a.paused)if(paused.playState==='paused')paused.play();
  a.layer.remove();delete habitat.dataset.orsayAction;refresh();
 }
 function save(a,node,name){if(node)a.saved.push([node,name,node.getAttribute(name)]);}
 function pause(a,node){for(const anim of node.getAnimations())if(anim.playState==='running'){anim.pause();a.paused.push(anim);}}
 function actor(a,part){
  const body=habitat.querySelector(part==='primary'?'#primary-worm > .worm-body':'#companion-worm > .companion-body');pause(a,body);
  const base=mat(a.root.getScreenCTM()).inverse().multiply(mat(body.getScreenCTM())),g=add(a.layer,'g',{transform:transform(base)}),clone=body.cloneNode(true);
  clone.removeAttribute('id');clone.removeAttribute('transform');clone.style.transform='none';clone.style.animation='none';g.appendChild(clone);save(a,body,'visibility');body.setAttribute('visibility','hidden');
  const paths=[...clone.children].filter(n=>n.matches('.worm-line,.worm-shadow,.worm-highlight,.companion-line,.companion-shadow,.companion-highlight,.male-tail')).map(n=>({n,points:pathPoints(n.getAttribute('d')),closed:n.classList.contains('male-tail')}));
  const face=add(clone,'g');for(const n of [...clone.children])if(n!==face&&!paths.some(p=>p.n===n))face.appendChild(n);
  const s={body,base,clone,paths,face,part,bend:0,look:0,peek:{x:0,y:0}};
  const crown=find(CROWN,part);
  if(visible(crown)){
   const art=crown.querySelector('.location-accessory-art');pause(a,art);
   s.crownBase=mat(a.root.getScreenCTM()).inverse().multiply(mat(art.getScreenCTM()));
   s.crown=add(a.layer,'g',{transform:transform(s.crownBase)});const copy=art.cloneNode(true);copy.removeAttribute('transform');copy.style.animation='none';copy.style.transform='none';s.crown.appendChild(copy);save(a,art,'visibility');art.setAttribute('visibility','hidden');
  }
  return s;
 }
 function pose(s,bend,look,peek={x:0,y:0}){
  s.bend=bend;s.look=look;s.peek=peek;
  for(const p of s.paths)p.n.setAttribute('d',p.points.map(q=>{if(q.close)return 'Z';const v=sketchPose(q.x,q.y,bend,look,peek);return `${q.move?'M':'L'}${v.x.toFixed(3)} ${v.y.toFixed(3)}`;}).join(' ') +(p.closed?' Z':''));
  const q=sketchPose(329,65,bend,look,peek),m=new DOMMatrix().translate(q.x-329,q.y-65).translate(329,65).rotate(look*7).translate(-329,-65);
  s.face.setAttribute('transform',transform(m));
  if(s.crown)s.crown.setAttribute('transform',transform(s.base.multiply(m).multiply(s.base.inverse()).multiply(s.crownBase)));
 }
 const point=(s,x,y)=>{const p=sketchPose(x,y,s.bend,s.look,s.peek);return new DOMPoint(p.x,p.y).matrixTransform(s.base);};
 function arm(a,male){return {back:add(a.layer,'path',{fill:'none',stroke:'var(--worm-deep)','stroke-width':male?3.4:6,'stroke-linecap':'round'}),front:add(a.layer,'path',{fill:'none',stroke:'var(--worm-color)','stroke-width':male?2:4,'stroke-linecap':'round'}),hand:add(a.layer,'ellipse',{rx:male?3:4.5,ry:male?2.3:3.2,fill:'var(--worm-color)',stroke:'var(--worm-deep)','stroke-width':1})};}
 function moveArm(arm,from,to,grip){
  const end=mix(from,to,grip),d=`M${from.x} ${from.y}Q${(from.x+end.x)/2} ${Math.max(from.y,end.y)+12*grip} ${end.x} ${end.y}`;
  for(const n of [arm.back,arm.front]){n.setAttribute('d',d);n.setAttribute('opacity',Math.min(1,grip*4));}
  arm.hand.setAttribute('cx',end.x);arm.hand.setAttribute('cy',end.y);arm.hand.setAttribute('opacity',Math.min(1,grip*4));
 }
 function modelArm(limb,actor,joints,opacity){
  const from=point(actor,joints.shoulder.x,joints.shoulder.y),elbow=point(actor,joints.elbow.x,joints.elbow.y),hand=point(actor,joints.hand.x,joints.hand.y);
  const before=mix(elbow,from,.17),after=mix(elbow,hand,.17);
  const d=`M${from.x} ${from.y}L${before.x} ${before.y}Q${elbow.x} ${elbow.y} ${after.x} ${after.y}L${hand.x} ${hand.y}`;
  for(const n of [limb.back,limb.front]){n.setAttribute('d',d);n.setAttribute('opacity',opacity);}
  limb.hand.setAttribute('cx',hand.x);limb.hand.setAttribute('cy',hand.y);limb.hand.setAttribute('opacity',opacity);
  limb.hand.setAttribute('transform',`rotate(${Math.atan2(hand.y-elbow.y,hand.x-elbow.x)*180/Math.PI} ${hand.x} ${hand.y})`);
 }
 function start(piece){
  if(!handles(piece)||!visible(piece))return false;
  if(action?.piece===piece)return true;cancel();
  if(piece.dataset.accessoryFamily===BAG){
   const flap=piece.querySelector('[data-orsay-flap]'),open=flap.dataset.open!=='true';
   flap.dataset.open=String(open);if(open)flap.setAttribute('transform','translate(0 -61) scale(1 -.48) translate(0 61)');else flap.removeAttribute('transform');
   return true;
  }
  const artistPart=piece.dataset.wormPart,modelPart=artistPart==='primary'?'companion':'primary';
  const book=piece,bag=find(BAG,artistPart),root=habitat.querySelector('#worm-species');
  const a={piece,root,book:visible(book)?book:null,bag:visible(bag)?bag:null,started:performance.now(),saved:[],paused:[],strokes:[],cues:new Set()};
  a.layer=add(root,'g',{'data-orsay-action':artistPart,'pointer-events':'none','aria-hidden':'true'});action=a;habitat.dataset.orsayAction=artistPart;
  a.artist=actor(a,artistPart);a.model=actor(a,modelPart);
  const relative=n=>mat(root.getScreenCTM()).inverse().multiply(mat(n.getScreenCTM()));
  // Keep the worn props in front of the temporary body poses. Their original
  // draggable nodes and all saved visitor transforms remain untouched.
  const copies=new Map();
  for(const family of [BAG,BOOK])for(const part of ['primary','companion']){
   const piece=find(family,part);if(!visible(piece))continue;
   const art=piece.querySelector('.location-accessory-art');pause(a,art);
   const base=relative(art),layer=add(a.layer,'g',{transform:transform(base)}),copy=art.cloneNode(true);
   copy.removeAttribute('transform');copy.style.transform='none';copy.style.animation='none';layer.appendChild(copy);
   save(a,art,'visibility');art.setAttribute('visibility','hidden');copies.set(piece,{copy,layer,base});
  }
  a.drawArm=arm(a,artistPart==='companion');a.holdArm=arm(a,artistPart==='companion');
  a.modelArms=[arm(a,modelPart==='companion'),arm(a,modelPart==='companion')];
  for(const limb of a.modelArms){limb.back.setAttribute('stroke-width',modelPart==='companion'?4:7);limb.front.setAttribute('stroke-width',modelPart==='companion'?2.5:4.8);}
  if(a.book){
   a.bookCopy=copies.get(a.book);a.page=a.bookCopy.copy.querySelector('[data-orsay-page]');
   const idle=a.bookCopy.copy.querySelector('[data-orsay-pencil]');a.pencilBase=relative(idle);idle.setAttribute('visibility','hidden');a.pencil=pencil(a.layer);
   a.strokes=[...a.book.querySelectorAll('[data-orsay-stroke]')].map(n=>[n,n.getAttribute('stroke-dashoffset')]);
   a.lines=[...a.page.querySelectorAll('[data-orsay-stroke]')].map(n=>({n,length:n.getTotalLength()}));
  }
  if(a.bag){
   const art=copies.get(a.bag).copy;a.flap=art.querySelector('[data-orsay-flap]');a.wasOpen=a.flap.dataset.open==='true';
   const tool=art.querySelector('[data-orsay-supply-pencil]');a.pencilBase=relative(tool);tool.setAttribute('visibility','hidden');
  }
  if(!reduced.matches)audio.prepare();raf=requestAnimationFrame(tick);return true;
 }
 function tick(now){
  raf=0;const a=action;if(!a)return;if(!visible(a.piece)||!a.root.isConnected||document.hidden){cancel();return;}
  const ms=now-a.started,still=reduced.matches,f=sketchFrame(still?6900:ms);
  const env=still?0:f.envelope,show=still?0:f.peek;
  pose(a.artist,-.36*env,(.65-.32*show)*env);
  const posing=still?0:f.posing,male=a.model.part==='companion';
  const bodyPose=modelBody(still?0:ms,male);
  pose(a.model,bodyPose.bend,bodyPose.look,bodyPose.lean);
  const limbs=modelArms(male,posing),limbOpacity=still?0:ease((ms-180)/450)*(1-ease((ms-7100)/600));
  limbs.forEach((joints,i)=>modelArm(a.modelArms[i],a.model,joints,limbOpacity));
  if(a.flap)a.flap.setAttribute('transform',`translate(0 -61) scale(1 ${1-(a.wasOpen?1:f.open)*1.48}) translate(0 61)`);
  if(a.book){
   const resting=new DOMPoint(0,0).matrixTransform(a.bookCopy.base),held=point(a.artist,268,170),lift=still?0:ease((ms-350)/1300)*(1-f.leave);
   const modelHead=point(a.model,329,65),toward=boundedPeek(modelHead.x-held.x,modelHead.y-held.y);
   const centre=mix(resting,{x:held.x+toward.x*show*.65,y:held.y+toward.y*show*.65},lift);
   a.bookCopy.layer.setAttribute('transform',transform(new DOMMatrix().translate(centre.x-resting.x,centre.y-resting.y).multiply(a.bookCopy.base)));
   a.pageBase=mat(a.root.getScreenCTM()).inverse().multiply(mat(a.page.getScreenCTM()));
   const progress=still?1:f.progress,segment=Math.min(a.lines.length-1,Math.floor(progress*a.lines.length)),within=progress===1?1:(progress*a.lines.length)%1;
   a.lines.forEach((line,i)=>line.n.setAttribute('stroke-dashoffset',1-clamp(progress*a.lines.length-i)));
   const line=a.lines[segment],contact=line.n.getPointAtLength(line.length*within),tip=new DOMPoint(contact.x,contact.y).matrixTransform(a.pageBase);
   const rest=new DOMPoint(0,0).matrixTransform(a.pencilBase),toPage=ease((ms-1000)/1000)*(1-f.leave),tipPosition=mix(rest,tip,still?0:toPage);
   const scale=Math.hypot(a.pencilBase.a,a.pencilBase.b),restAngle=Math.atan2(a.pencilBase.b,a.pencilBase.a)*180/Math.PI,angle=restAngle+(-24-restAngle+3*Math.sin(ms/270))*env;
   a.pencil.setAttribute('transform',`translate(${tipPosition.x} ${tipPosition.y}) rotate(${angle}) scale(${scale})`);
   const grip={x:tipPosition.x+Math.sin(angle*Math.PI/180)*22*scale,y:tipPosition.y-Math.cos(angle*Math.PI/180)*22*scale};
   moveArm(a.drawArm,point(a.artist,252,137),grip,env);
   const support=new DOMPoint(45,103).matrixTransform(a.pageBase);moveArm(a.holdArm,point(a.artist,228,158),support,env);
  }else {moveArm(a.drawArm,point(a.artist,250,140),point(a.artist,250,140),0);moveArm(a.holdArm,point(a.artist,230,160),point(a.artist,230,160),0);}
  if(!still){
   const cues=[{at:450,key:'paper'},...Array.from({length:6},(_,i)=>({at:2200+i*730,key:'pencil',index:i})),{at:8450,key:'paper'}];
   for(const [i,cue]of cues.entries())if(ms>=cue.at&&!a.cues.has(i)){a.cues.add(i);if(a.book)audio.play(cue.key,cue.index);}
  }
  if(still?ms>=1200:f.done){cancel(true);return;}
  raf=requestAnimationFrame(tick);
 }
 document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});window.addEventListener('resize',()=>cancel());window.addEventListener('pagehide',()=>cancel());reduced.addEventListener('change',()=>cancel());
 return {handles,start,cancel,get active(){return !!action;}};
}
