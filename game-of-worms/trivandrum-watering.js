import {add,at,relative,matrix,ease,clamp,recordedSound} from './scene-performance.js?v=20260919-uniform-1';
import {pathPoints} from './guadeloupe-dance.js?v=20260916-gwoka-11';
export const WATERING_FAMILY='trivandrum-garden-watering-can';
export const SHOWER_DURATION=7800;
const envelope=(ms,start,rise,end,fall)=>ease((ms-start)/rise)*(1-ease((ms-end)/fall));
export function wateringFrame(ms,male=false,reduced=false) {
  if(reduced)return {reach:0,lift:0,turn:0,angle:0,water:0,duck:0,rub:0,shake:0,effort:0,phase:0,done:ms>=300};
  if(male){
    const lift=envelope(ms,450,900,2800,850);
    return {reach:envelope(ms,0,650,3300,600),lift,turn:0,angle:55*lift,
      water:envelope(ms,1400,150,2800,180),duck:0,rub:0,shake:0,effort:lift,phase:ms/620,done:ms>=4100};
  }
  const lift=envelope(ms,650,1100,4000,1050);
  return {reach:envelope(ms,0,700,4850,700),lift,turn:envelope(ms,650,700,4000,1050),angle:55*lift,
    water:envelope(ms,1850,180,3550,200),duck:envelope(ms,1550,750,4200,900),
    rub:envelope(ms,3850,400,4900,450),
    shake:envelope(ms,5400,230,6450,600)*Math.sin((ms-5400)/240*Math.PI)||0,
    effort:lift,phase:ms/620,done:ms>=SHOWER_DURATION};
}
// Bend the existing paths, keeping the tail planted and optical windows live.
export function showerPoint(x,y,f,male=false){
  const front=ease((x-105)/210),middle=Math.sin(Math.PI*clamp((x-95)/230));
  return {x:x+(male?f.duck*-24+f.shake*20:f.effort*-28)*front,
    y:y+(male?f.duck*43:f.effort*18)*front+(male?f.shake*5:f.effort*8)*middle};
}
const restore=(n,key,value)=>value===null?n.removeAttribute(key):n.setAttribute(key,value);
function actor(body,root,male){
  const paused=body.getAnimations({subtree:true}).filter(a=>a.playState==='running');paused.forEach(a=>a.pause());
  const base=relative(root,body),children=[...body.children];
  const paths=children.filter(n=>n.matches('.worm-line,.worm-shadow,.worm-highlight,.companion-line,.companion-shadow,.companion-highlight,.male-tail')).map(n=>({n,d:n.getAttribute('d'),points:pathPoints(n.getAttribute('d'))}));
  const face=add(body,'g',{'data-shower-face':''});children.filter(n=>!paths.some(p=>p.n===n)).forEach(n=>face.appendChild(n));
  let frame=wateringFrame(0);
  return {point(x,y){const q=showerPoint(x,y,frame,male);return at(base,q.x,q.y);},
    pose(f){frame=f;for(const p of paths)p.n.setAttribute('d',p.points.map(q=>{if(q.close)return 'Z';const v=showerPoint(q.x,q.y,f,male);return `${q.move?'M':'L'}${v.x.toFixed(3)} ${v.y.toFixed(3)}`;}).join(' '));
      const q=showerPoint(329,65,f,male);face.setAttribute('transform',`translate(${q.x-329} ${q.y-65})`);},
    restore(){paths.forEach(p=>p.n.setAttribute('d',p.d));children.forEach(n=>body.appendChild(n));face.remove();paused.forEach(a=>{if(a.playState==='paused')a.play();});}};
}
function hand(layer,male){return {back:add(layer,'path',{fill:'none',stroke:'var(--worm-deep)','stroke-width':male?3.5:5.8,'stroke-linecap':'round'}),front:add(layer,'path',{fill:'none',stroke:'var(--worm-color)','stroke-width':male?2:3.8,'stroke-linecap':'round'}),tip:add(layer,'ellipse',{rx:male?2.6:4,ry:male?2.2:3,fill:'var(--worm-color)',stroke:'var(--worm-deep)','stroke-width':.7})};}
function reach(h,body,target,amount,anchor=[245,137]){
  const a=body.point(...anchor),b={x:a.x+(target.x-a.x)*amount,y:a.y+(target.y-a.y)*amount};
  for(const n of [h.back,h.front])n.setAttribute('d',`M${a.x} ${a.y}Q${(a.x+b.x)/2} ${Math.max(a.y,b.y)+14*amount} ${b.x} ${b.y}`);
  h.tip.setAttribute('cx',b.x);h.tip.setAttribute('cy',b.y);
  for(const n of Object.values(h))n.setAttribute('opacity',clamp(amount*4));
}
export function createTrivandrumWatering(habitat) {
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const sound=recordedSound({pour:'kauai-bath-pour-v2.wav',splash:'lombok-splash.wav',rub:'kauai-bath-squeeze.wav'});
  let active=null,raf=0;
  const handles=piece=>piece?.dataset.accessoryFamily===WATERING_FAMILY;
  function cancel(){cancelAnimationFrame(raf);raf=0;sound.stop();const a=active;active=null;if(!a)return;
    if(a.motion)restore(a.motion,'transform',a.original);
    a.anchors?.forEach(([n,v])=>restore(n,'style',v));a.actors?.forEach(b=>b.restore());
    a.paused?.forEach(p=>{if(p.playState==='paused')p.play();});a.layer?.remove();delete a.piece.dataset.watering;
  }
  function start(piece){
    if(!handles(piece)||!piece.isConnected||piece.closest('[hidden]')||document.hidden)return false;
    cancel();const a={piece,male:piece.dataset.wormPart==='companion',cues:new Set()};active=a;piece.dataset.watering='loading';
    // Audio failure must never prevent the physical action.
    sound.prepare(['pour','splash','rub']).finally(()=>{if(active===a&&!document.hidden)begin(a);});return true;
  }
  function begin(a){
    if(!a.piece.isConnected||a.piece.closest('[hidden]')){cancel();return;}
    const root=habitat.querySelector('#worm-species');a.motion=a.piece.querySelector('[data-watering-motion]');
    if(!root||!a.motion){cancel();return;}
    a.original=a.motion.getAttribute('transform');
    a.anchors=[a.piece,a.motion.parentNode].map(n=>{const style=n.getAttribute('style'),b=n.getBBox();n.style.transformBox='view-box';n.style.transformOrigin=`${b.x+b.width/2}px ${b.y+b.height/2}px`;return[n,style];});
    a.paused=a.piece.getAnimations({subtree:true}).filter(p=>p.playState==='running');a.paused.forEach(p=>p.pause());
    a.actors=[actor(habitat.querySelector('#primary-worm > .worm-body'),root,false),actor(habitat.querySelector('#companion-worm > .companion-body'),root,true)];
    a.layer=add(root,'g',{'data-trivandrum-shower':'','pointer-events':'none','aria-hidden':'true'});
    a.hands=[hand(a.layer,a.male),hand(a.layer,a.male),hand(a.layer,true),hand(a.layer,true)];
    a.water=add(a.layer,'g',{'data-trivandrum-water':''});
    a.drops=Array.from({length:22},()=>add(a.water,'path',{fill:'none',stroke:'#e1f8ff','stroke-width':a.male?1.1:1.5,'stroke-linecap':'round'}));
    a.splashes=Array.from({length:8},()=>add(a.layer,'path',{fill:'none',stroke:'#bdebf2','stroke-width':1.25,'stroke-linecap':'round'}));
    a.started=performance.now();a.root=root;raf=requestAnimationFrame(tick);
  }
  function cue(a,key,time,duration,level,ms){if(ms>=time&&!a.cues.has(key)){a.cues.add(key);sound.play(key,0,duration,level);}}
  function tick(now){
    const a=active;if(!a)return;
    if(!a.piece.isConnected||a.piece.closest('[hidden]')||document.hidden){cancel();return;}
    const ms=now-a.started,f=wateringFrame(ms,a.male,reduced.matches),[female,male]=a.actors;
    if(f.done){cancel();return;}
    a.piece.dataset.watering=reduced.matches?'still':f.water>.1?'pour':f.rub>.1?'rub':ms>=5400?'shake':f.lift>.1?'lift':'reach';
    female.pose(a.male?wateringFrame(0):f);male.pose(a.male?{...f,duck:f.lift*.18,shake:0}:f);
    const rotation=new DOMMatrix().translate(a.male?-5:-66,a.male?-66:-75).scale(1-2*f.turn,1).rotate(f.angle).translate(a.male?5:66,a.male?66:75);
    const parent=relative(a.root,a.motion.parentNode),base=parent.multiply(rotation);
    const head=male.point(326,43),rose=at(base,a.male?111:138,a.male?-49:-80);
    // Aim above the recipient, with the stream following his ducking head.
    const dx=a.male?0:(head.x-12-rose.x)*f.lift,dy=a.male?-24*f.lift:(head.y-30-rose.y)*f.lift;
    const placed=new DOMMatrix().translate(dx,dy).multiply(base);
    a.motion.setAttribute('transform',matrix(parent.inverse().multiply(placed)));
    const carrier=a.male?male:female;
    reach(a.hands[0],carrier,at(placed,a.male?-5:-66,a.male?-70:-83),f.reach);
    reach(a.hands[1],carrier,at(placed,a.male?-72:-162,12),f.reach,[219,163]);
    const rubX=Math.sin(ms/150)*9*f.rub;
    reach(a.hands[2],male,male.point(319+rubX,30),a.male?0:f.rub,[252,136]);
    reach(a.hands[3],male,male.point(348-rubX,47),a.male?0:f.rub*.8,[232,154]);
    const from=at(placed,a.male?111:138,a.male?-49:-80),to=a.male?{x:from.x+12,y:from.y+54}:head;
    a.water.setAttribute('opacity',f.water);
    a.drops.forEach((drop,i)=>{const t=(f.phase+i/22)%1,u=Math.min(1,t+.055),spread=(i%5-2)*2;
      const pt=v=>[from.x+(to.x-from.x)*v+spread*v,from.y+(to.y-from.y)*v*v];drop.setAttribute('d',`M${pt(t).join(' ')}L${pt(u).join(' ')}`);});
    a.splashes.forEach((drop,i)=>{const shake=!a.male&&ms>5400&&ms<6820,age=((ms-5400)/430+i/8)%1;
      const origin=shake?male.point(329,52):to,angle=(-Math.PI+i/7*Math.PI),distance=shake?8+age*36:4+(i%3)*3;
      const x=origin.x+Math.cos(angle)*distance,y=origin.y+Math.sin(angle)*distance+(shake?age*age*25:0);
      drop.setAttribute('d',`M${x} ${y}l${Math.cos(angle)*3} ${Math.sin(angle)*3}`);drop.setAttribute('opacity',shake?(1-age)*Math.min(1,Math.abs(f.shake)*2):f.water*.65);});
    if(!reduced.matches){cue(a,'pour',a.male?1400:1850,a.male?1.55:1.9,.11,ms);
      if(!a.male){cue(a,'rub',3930,.64,.035,ms);cue(a,'splash',5550,.7,.055,ms);}}
    raf=requestAnimationFrame(tick);
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')cancel();});
  window.addEventListener('resize',cancel);window.addEventListener('pagehide',cancel);reduced.addEventListener('change',cancel);
  return {handles,start,cancel,get active(){return !!active;}};
}
