import {add,at,relative,matrix,ease,clamp} from './scene-performance.js?v=20260919-uniform-1';
import {pathPoints} from './guadeloupe-dance.js?v=20260916-gwoka-11';
export const READING_DURATION=6600, PAGE_DELAY=900;
const mix=(a,b,t)=>a+(b-a)*t;
export function readingFrame(ms,previous=null){
 const lean=ease(ms/1100),sleep=ease((ms-3400)/2200),peek=ease(ms/1300);
 const awake={primary:{lean,scan:Math.sin((ms-1400)/1700)*.035*ease((ms-1300)/800)*(1-sleep)},companion:{lean:peek,sleep}};
 if(previous){
  const wake=ease((ms-700)/550);
  awake.primary.lean=mix(previous.primary.lean,1,ease(ms/700));
  awake.primary.scan=mix(previous.primary.scan,awake.primary.scan,ease(ms/700));
  awake.companion.lean=mix(previous.companion.lean,1,wake);
  awake.companion.sleep=mix(previous.companion.sleep,sleep,wake);
 }
 return {...awake,hand:ease(ms/650)*(1-ease((ms-1700)/550)),done:ms>=READING_DURATION};
}
export function readingPoint(x,y,p){
 const w=ease((x-108)/190),r=p.angle*Math.PI/180*w,dx=x-329,dy=y-65;
 return {x:329+dx*Math.cos(r)-dy*Math.sin(r)+p.x*w,y:65+dx*Math.sin(r)+dy*Math.cos(r)+p.y*w};
}
export function createReaders(habitat,previous=null){
 const root=habitat.querySelector('#worm-species'),actors=[],paused=[];
 const freeze=n=>{for(const a of n.getAnimations({subtree:true}))if(a.playState==='running'){a.pause();paused.push(a);}};
 const restore=(n,k,v)=>v===null?n.removeAttribute(k):n.setAttribute(k,v);
 for(const part of ['primary','companion']){
  const male=part==='companion',body=habitat.querySelector(male?'#companion-worm > .companion-body':'#primary-worm > .worm-body');freeze(body);
  const base=relative(root,body),children=[...body.children],paths=children.filter(n=>n.matches('.worm-line,.worm-shadow,.worm-highlight,.companion-line,.companion-shadow,.companion-highlight,.male-tail')).map(n=>({n,d:n.getAttribute('d'),points:pathPoints(n.getAttribute('d'))}));
  const face=add(body,'g',{'data-reading-face':part});children.filter(n=>!paths.some(p=>p.n===n)).forEach(n=>face.appendChild(n));
  const eyes=[...face.querySelectorAll('.worm-eye,.worm-eye-shine')].map(n=>({n,t:n.getAttribute('transform'),v:n.getAttribute('visibility')}));
  const glasses=habitat.querySelector(`.accessory-piece[data-accessory-family="eca250-sunny-reading-glasses"][data-worm-part="${part}"] .location-accessory-art`);
  let glassesWrap,glassesParent,glassesStyles=[];
  if(glasses&&!glasses.closest('[hidden]')){const piece=glasses.closest('.accessory-piece');freeze(piece);glassesStyles=[piece,glasses].map(n=>{const style=n.getAttribute('style'),b=n.getBBox();n.style.transformBox='view-box';n.style.transformOrigin=`${b.x+b.width/2}px ${b.y+b.height/2}px`;return[n,style];});glassesParent=relative(root,glasses.parentNode);glassesWrap=add(glasses.parentNode,'g',{'data-reading-glasses':part});glasses.before(glassesWrap);glassesWrap.appendChild(glasses);}
  const book=habitat.querySelector(`.accessory-piece[data-accessory-family="eca250-bookworm-book"][data-worm-part="primary"] .location-accessory-art`);
  const target=book?at(base.inverse().multiply(relative(root,book)),20,-25):{x:290,y:200};
  actors.push({part,male,body,base,children,paths,face,eyes,glasses,glassesWrap,glassesParent,glassesStyles,
   dx:Math.max(-65,Math.min(30,target.x-329)),dy:Math.max(38,Math.min(92,target.y-110)),pose:{x:0,y:0,angle:0}});
 }
 const layer=add(root,'g',{'data-reading-hands':'','pointer-events':'none','aria-hidden':'true'});
 const hands=[0,1].map(()=>({back:add(layer,'path',{fill:'none',stroke:'var(--worm-deep)','stroke-width':5.5,'stroke-linecap':'round'}),front:add(layer,'path',{fill:'none',stroke:'var(--worm-color)','stroke-width':3.5,'stroke-linecap':'round'}),tip:add(layer,'ellipse',{rx:3.6,ry:2.8,fill:'var(--worm-color)',stroke:'var(--worm-deep)','stroke-width':.7})}));
 let frame=readingFrame(0,previous);
 function point(a,x,y){const q=readingPoint(x,y,a.pose);return at(a.base,q.x,q.y);}
 function paint(f,turning=null,book=null,small=false){
  frame=f;
  for(const a of actors){const v=f[a.part];a.pose=a.male?{x:30*v.lean-12*v.sleep,y:14*v.lean+50*v.sleep,angle:7*v.lean+17*v.sleep}:{x:a.dx*v.lean+v.scan*35,y:a.dy*v.lean,angle:15*v.lean};
   for(const p of a.paths)p.n.setAttribute('d',p.points.map(q=>{if(q.close)return 'Z';const v=readingPoint(q.x,q.y,a.pose);return `${q.move?'M':'L'}${v.x.toFixed(3)} ${v.y.toFixed(3)}`;}).join(' '));
   const {x,y,angle}=a.pose;a.face.setAttribute('transform',`translate(${x} ${y}) rotate(${angle} 329 65)`);
   for(const e of a.eyes){const cx=+e.n.getAttribute('cx'),cy=+e.n.getAttribute('cy'),open=1-(v.sleep||0)*.93;e.n.setAttribute('transform',`translate(${cx} ${cy}) scale(1 ${open}) translate(${-cx} ${-cy}) ${e.t||''}`);if(e.n.classList.contains('worm-eye-shine')&&open<.3)e.n.setAttribute('visibility','hidden');else restore(e.n,'visibility',e.v);}
   if(a.glassesWrap){const move=a.base.translate(x,y).translate(329,65).rotate(angle).translate(-329,-65).multiply(a.base.inverse());a.glassesWrap.setAttribute('transform',matrix(a.glassesParent.inverse().multiply(move).multiply(a.glassesParent)));}
  }
  const owner=actors[small?1:0];
  for(let i=0;i<2;i++){const h=hands[i],from=point(owner,i?220:251,i?161:136),node=i?book:turning;
   const target=node?at(relative(root,node),i?-75:65,35):from,amount=f.hand;
   const end={x:mix(from.x,target.x,amount),y:mix(from.y,target.y,amount)};
   for(const n of [h.back,h.front]){n.setAttribute('d',`M${from.x} ${from.y}Q${(from.x+end.x)/2} ${Math.max(from.y,end.y)+8} ${end.x} ${end.y}`);n.setAttribute('stroke-width',small?(n===h.back?3.2:1.8):(n===h.back?5.5:3.5));}
   h.tip.setAttribute('cx',end.x);h.tip.setAttribute('cy',end.y);h.tip.setAttribute('rx',small?2.4:3.6);h.tip.setAttribute('ry',small?2:2.8);for(const n of Object.values(h))n.setAttribute('opacity',clamp(amount*4));
  }
 }
 paint(frame);
 return {paint,get frame(){return frame;},restore(){for(const a of actors){for(const p of a.paths)p.n.setAttribute('d',p.d);for(const e of a.eyes){restore(e.n,'transform',e.t);restore(e.n,'visibility',e.v);}a.children.forEach(n=>a.body.appendChild(n));a.face.remove();if(a.glassesWrap)a.glassesWrap.replaceWith(a.glasses);a.glassesStyles.forEach(([n,v])=>restore(n,'style',v));}layer.remove();paused.forEach(a=>{if(a.playState==='paused')a.play();});}};
}
