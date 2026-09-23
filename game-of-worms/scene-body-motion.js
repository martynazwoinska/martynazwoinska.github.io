import {pathPoints} from './guadeloupe-dance.js?v=20260916-gwoka-11';
import {add,at,relative,matrix,ease,clamp} from './scene-performance.js?v=20260919-uniform-1';

// Keep the tail planted while the front and middle take the weight of an action.
export function workingPoint(x,y,dx=0,dy=0,bend=0){
 const front=ease((x-105)/210),middle=Math.sin(Math.PI*clamp((x-105)/230));
 return {x:x+dx*front+bend*middle,y:y+dy*front};
}
export function workingBody(habitat,part,clothing=[]){
 const root=habitat.querySelector('#worm-species'),body=habitat.querySelector(part==='companion'?'.companion-body':'.worm-body');
 const paused=body.getAnimations({subtree:true}).filter(a=>a.playState==='running');paused.forEach(a=>a.pause());
 const children=[...body.children],base=relative(root,body),paths=children.filter(n=>n.matches('.worm-line,.worm-shadow,.worm-highlight,.companion-line,.companion-shadow,.companion-highlight,.male-tail')).map(n=>({n,d:n.getAttribute('d'),points:pathPoints(n.getAttribute('d'))}));
 const face=add(body,'g',{'data-working-face':''});children.filter(n=>!paths.some(p=>p.n===n)).forEach(n=>face.appendChild(n));
 const clothes=clothing.flatMap(family=>[...habitat.querySelectorAll(`.accessory-piece[data-accessory-family="${family}"][data-worm-part="${part}"]`)]).filter(p=>!p.closest('[hidden]')).map(p=>{
  const art=p.querySelector('.location-accessory-art'),styles=[p,art].map(n=>{const style=n.getAttribute('style'),b=n.getBBox();n.style.transformBox='view-box';n.style.transformOrigin=`${b.x+b.width/2}px ${b.y+b.height/2}px`;return {n,style};});
  const wrap=add(art.parentNode,'g',{'data-working-cloth':''});art.before(wrap);wrap.append(art);
  const parent=relative(root,wrap.parentNode);return {art,wrap,parent,styles};
 });
 let pose={dx:0,dy:0,bend:0};
 const point=(x,y)=>{const q=workingPoint(x,y,pose.dx,pose.dy,pose.bend);return at(base,q.x,q.y);};
 function set(dx=0,dy=0,bend=0){pose={dx,dy,bend};
  for(const p of paths)p.n.setAttribute('d',p.points.map(q=>{if(q.close)return 'Z';const v=workingPoint(q.x,q.y,dx,dy,bend);return `${q.move?'M':'L'}${v.x.toFixed(3)} ${v.y.toFixed(3)}`;}).join(' '));
  const head=workingPoint(329,65,dx,dy,bend);face.setAttribute('transform',`translate(${head.x-329} ${head.y-65})`);
  const q=workingPoint(270,120,dx,dy,bend),a=at(base,270,120),b=at(base,q.x,q.y);
  for(const c of clothes)c.wrap.setAttribute('transform',matrix(c.parent.inverse().multiply(new DOMMatrix().translate(b.x-a.x,b.y-a.y)).multiply(c.parent)));
 }
 return {body,base,point,set,restore(){paths.forEach(p=>p.n.setAttribute('d',p.d));children.forEach(n=>body.appendChild(n));face.remove();clothes.forEach(c=>{c.wrap.replaceWith(c.art);c.styles.forEach(({n,style})=>style===null?n.removeAttribute('style'):n.setAttribute('style',style));});paused.forEach(a=>{if(a.playState==='paused')a.play();});}};
}
