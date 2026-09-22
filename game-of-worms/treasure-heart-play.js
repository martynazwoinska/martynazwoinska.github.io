import {svg,pointsText} from './treasure-pieces.js?v=20260920-discovery-2';
import {assemblyPolygons} from './treasure-board-art.js?v=20260921-heartbeat-1';

// A single, stable hit area lets the finished stones move together underneath it.
export function makeHeartPlayable(board,puzzle,sound){
 const assembly=board.querySelector('[data-heart-assembly]'),polygons=assemblyPolygons(puzzle);
 const points=polygons.flat(),xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);
 assembly.style.transformOrigin=`${(Math.min(...xs)+Math.max(...xs))/2}px ${(Math.min(...ys)+Math.max(...ys))/2}px`;
 const hit=svg(board,'g',{class:'gem-heart-touch',role:'button',tabindex:0,'aria-label':'A heart! Eight discoveries, one treasure.','aria-keyshortcuts':'Enter Space'});
 const light=svg(assembly,'g',{'aria-hidden':'true','pointer-events':'none',opacity:0});
 polygons.forEach(poly=>{svg(hit,'polygon',{points:pointsText(poly),fill:'transparent'});svg(light,'polygon',{points:pointsText(poly),fill:'#fff9dc'});});
 const hadFocus=board.contains(document.activeElement);
 board.querySelectorAll('[data-puzzle-piece]').forEach(node=>{node.removeAttribute('tabindex');node.removeAttribute('role');node.removeAttribute('aria-pressed');node.classList.remove('is-selected');});
 if(hadFocus)hit.focus({preventScroll:true});
 let pressed=null,disposed=false,animations=[];
 const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
 function clear(){animations.forEach(a=>a?.cancel());animations=[];}
 function cancel(){const pointer=pressed;pressed=null;clear();hit.classList.remove('is-pressed');if(typeof pointer==='number'&&hit.hasPointerCapture(pointer))hit.releasePointerCapture(pointer);}
 function down(id){
  if(disposed||pressed!==null||document.hidden)return false;
  clear();assembly.getAnimations().forEach(a=>a.cancel());pressed=id;hit.classList.add('is-pressed');
  if(!reduced())animations.push(assembly.animate([{transform:'scale(1)'},{transform:'translateY(3px) scale(.978,.96)'}],{duration:140,easing:'ease-out',fill:'forwards'}));
  animations.push(light.animate([{opacity:0},{opacity:.12}],{duration:140,fill:'forwards'}));return true;
 }
 function up(id){
  if(pressed!==id||disposed)return;cancel();sound.play('heartbeat');
  if(!reduced())animations.push(assembly.animate([
   {transform:'translateY(3px) scale(.978,.96)',offset:0},
   {transform:'translateY(-1px) scale(1.025,1.035)',offset:.16},
   {transform:'scale(.993,.985)',offset:.34},
   {transform:'scale(1.015,1.022)',offset:.48},
   {transform:'scale(1)',offset:1}
  ],{duration:780,easing:'ease-in-out'}));
  animations.push(light.animate([{opacity:.12},{opacity:.2,offset:.16},{opacity:.02,offset:.34},{opacity:.13,offset:.48},{opacity:0}],{duration:780,easing:'ease-out'}));
 }
 hit.addEventListener('pointerdown',e=>{if(e.button!==0)return;e.preventDefault();e.stopPropagation();if(down(e.pointerId)){hit.focus({preventScroll:true});hit.setPointerCapture(e.pointerId);}});
 hit.addEventListener('pointerup',e=>{e.stopPropagation();up(e.pointerId);});
 hit.addEventListener('pointercancel',cancel);hit.addEventListener('lostpointercapture',()=>{if(pressed!==null)cancel();});
 hit.addEventListener('keydown',e=>{if(!['Enter',' '].includes(e.key))return;e.preventDefault();if(!e.repeat)down(e.key);});
 hit.addEventListener('keyup',e=>{if(!['Enter',' '].includes(e.key))return;e.preventDefault();up(e.key);});
 // Assistive technology may activate a button without pointer or key events.
 hit.addEventListener('click',e=>{if(e.detail===0&&pressed===null&&down('click'))up('click');});
 hit.addEventListener('blur',()=>{if(pressed!==null)cancel();});
 const hide=()=>{if(document.hidden){cancel();sound.stop();}};
 document.addEventListener('visibilitychange',hide);
 return{dispose(){disposed=true;cancel();document.removeEventListener('visibilitychange',hide);hit.remove();light.remove();}};
}
