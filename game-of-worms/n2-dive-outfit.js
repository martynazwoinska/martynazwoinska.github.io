import {add,at,relative,matrix,clamp,ease} from './scene-performance.js?v=20260919-uniform-1';
import {pathPoints} from './guadeloupe-dance.js?v=20260916-gwoka-11';

export const DIVE_WORN_FAMILIES=['n2-lab-coat','cryo-vial-jetpack','n2-lab-goggles'];
const length=(a,b)=>Math.hypot(b.x-a.x,b.y-a.y);
export function outfitFrame(points,station){
 const index=clamp(station)*(points.length-1),i=Math.min(points.length-2,Math.floor(index)),q=index-i,a=points[i],b=points[i+1];
 const tangent=k=>{const p=points[Math.max(0,k-1)],n=points[Math.min(points.length-1,k+1)],d=length(p,n)||1;return{x:(n.x-p.x)/d,y:(n.y-p.y)/d};},ta=tangent(i),tb=tangent(i+1),tx=ta.x+(tb.x-ta.x)*q,ty=ta.y+(tb.y-ta.y)*q,d=Math.hypot(tx,ty)||1;
 return{x:a.x+(b.x-a.x)*q,y:a.y+(b.y-a.y)*q,tx:tx/d,ty:ty/d};
}
export function bindOutfitPoint(points,p){
 let best={distance:Infinity,station:0};
 for(let i=0;i<points.length-1;i++){const a=points[i],b=points[i+1],dx=b.x-a.x,dy=b.y-a.y,q=clamp(((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy||1)),distance=Math.hypot(p.x-a.x-q*dx,p.y-a.y-q*dy);if(distance<best.distance)best={distance,station:(i+q)/(points.length-1)};}
 const f=outfitFrame(points,best.station),dx=p.x-f.x,dy=p.y-f.y;
 return {station:best.station,along:dx*f.tx+dy*f.ty,normal:-dx*f.ty+dy*f.tx};
}
export function mapOutfitPoint(points,binding,scale){
 const f=outfitFrame(points,binding.station),x=binding.along*scale,y=binding.normal*scale;
 return {x:f.x+x*f.tx-y*f.ty,y:f.y+x*f.ty+y*f.tx};
}
const between=(a,b,t)=>({station:a.station+(b.station-a.station)*t,along:a.along+(b.along-a.along)*t,normal:a.normal+(b.normal-a.normal)*t});
// Clip in body-material coordinates before bending, so a coat cannot appear
// on a section of the crawler that has not yet emerged from the food.
export function visibleOutfitPath(vertices,threshold=-1){
 const closed=vertices.at(-1)?.close,source=vertices.filter(p=>!p.close);if(threshold<0)return vertices;
 const result=[];let previous=closed?source.at(-1):null;
 for(const p of source){const inside=p.station>=threshold,was=previous?.station>=threshold;
  if(previous&&inside!==was){const q=between(previous,p,(threshold-previous.station)/(p.station-previous.station));result.push({...q,move:!was});}
  if(inside)result.push({...p,move:!previous||(!was&&result.length===0)});
  previous=p;
 }
 if(closed&&result.length){result[0].move=true;result.slice(1).forEach(p=>p.move=false);result.push({close:true});}
 return result;
}
let outfitId=0;
export function createDiveOutfit(root,body,layer,source,part='primary'){
 const pieces=DIVE_WORN_FAMILIES.flatMap(family=>[...root.querySelectorAll(`.accessory-piece[data-worm-part="${part}"][data-accessory-family="${family}"]`)]).filter(p=>!p.closest('[hidden]'));
 const paused=[];for(const p of pieces)for(const a of p.getAnimations?.({subtree:true})||[])if(a.playState==='running'){a.pause();paused.push(a);}
 const container=add(layer,'g',{'data-n2-dive-outfit':'','pointer-events':'none','aria-hidden':'true'}),defs=add(container,'defs'),items=[];
 const rigid=(art,parent,station)=>{
  const anchor=outfitFrame(source,station),base=relative(root,art),wrap=add(parent,'g'),copy=art.cloneNode(true),id=`n2-outfit-entry-${++outfitId}`,clip=add(defs,'clipPath',{id,clipPathUnits:'userSpaceOnUse'}),rect=add(clip,'rect',{x:0,y:-3000,width:6000,height:6000});
  const placement=add(wrap,'g',{transform:matrix(base)});
  copy.removeAttribute('transform');copy.style.transform='none';copy.style.animation='none';placement.append(copy);
  return {set(points,scale,threshold){const f=outfitFrame(points,station),angle=Math.atan2(f.ty,f.tx)-Math.atan2(anchor.ty,anchor.tx),warp=new DOMMatrix().translate(f.x,f.y).rotate(angle*180/Math.PI).scale(scale).translate(-anchor.x,-anchor.y);wrap.setAttribute('transform',matrix(warp));
   if(threshold>=0){const cut=outfitFrame(source,threshold);rect.setAttribute('transform',`matrix(${cut.tx} ${cut.ty} ${-cut.ty} ${cut.tx} ${cut.x} ${cut.y})`);wrap.setAttribute('clip-path',`url(#${id})`);}else wrap.removeAttribute('clip-path');
  }};
 };
 for(const piece of pieces){
  const family=piece.dataset.accessoryFamily,art=piece.querySelector('.location-accessory-art'),group=add(container,'g',{'data-n2-outfit-family':family});
  if(family!=='n2-lab-coat'){
   const anchor=family==='n2-lab-goggles'?1:bindOutfitPoint(source,at(relative(root,art),0,0)).station;
   items.push(rigid(art,group,anchor));continue;
  }
  // Retain the approved coat's seams, pockets, buttons and tie. Only their
  // coordinates bend; the source artwork and the draggable originals do not.
  for(const node of art.querySelectorAll('path,circle')){
   if(node.tagName.toLowerCase()==='circle'){const centre=at(relative(root,node),+node.getAttribute('cx'),+node.getAttribute('cy'));items.push(rigid(node,group,bindOutfitPoint(source,centre).station));continue;}
   const base=relative(root,node),vertices=pathPoints(node.getAttribute('d')).map(p=>p.close?p:{...bindOutfitPoint(source,at(base,p.x,p.y)),move:p.move}),copy=node.cloneNode(true),paint=getComputedStyle(node),stroke=parseFloat(paint.strokeWidth)*Math.sqrt(Math.abs(base.a*base.d-base.b*base.c));
   copy.removeAttribute('transform');group.append(copy);
   for(const key of ['fill','stroke','fillOpacity','strokeOpacity','strokeLinecap','strokeLinejoin','opacity'])copy.style[key]=paint[key];
   items.push({set(points,scale,threshold){const visible=visibleOutfitPath(vertices,threshold);copy.setAttribute('d',visible.map(p=>{if(p.close)return 'Z';const q=mapOutfitPoint(points,p,scale);return`${p.move?'M':'L'}${q.x.toFixed(3)} ${q.y.toFixed(3)}`;}).join(' '));copy.style.strokeWidth=String(stroke*scale);}});
  }
 }
 return {set(points,scale,emergence=1){const threshold=emergence<1?1-emergence:-1;container.setAttribute('opacity',String(ease(emergence/.08)));for(const item of items)item.set(points,scale,threshold);},remove(){container.remove();for(const a of paused)if(a.playState==='paused')a.play();}};
}
