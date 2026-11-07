import {add} from './scene-performance.js?v=20260919-uniform-1';

// Drawing and animation share the free end and the board's top surface.
export const N2_PLATFORM={backX:68,tipX:212,tailX:192,topY:238};
export const boardContact=(position,scale=.64)=>({x:N2_PLATFORM.tailX+position.x,y:N2_PLATFORM.topY-23*scale+position.y});

export function constrainTower(wanted,art,scene){
 const minX=scene.left-art.left,maxX=scene.right-art.right,minY=scene.top-art.top,maxY=scene.bottom-art.bottom;
 return {x:Math.max(minX,Math.min(maxX,wanted.x)),y:Math.max(minY,Math.min(maxY,wanted.y))};
}

export function createDivingTower(root,habitat,position,onMove){
 const tower=add(root,'g',{class:'n2-diving-tower','data-n2-diving-tower':'',role:'group',tabindex:0,'aria-label':'Diving tower','aria-roledescription':'movable object','aria-keyshortcuts':'ArrowUp ArrowDown ArrowLeft ArrowRight Home'});
 const primary=root.querySelector('#primary-worm');if(primary)root.insertBefore(tower,primary);
 const art=add(tower,'g',{'data-n2-tower-art':''});
 add(art,'ellipse',{class:'n2-tower-shadow',cx:101,cy:330,rx:55,ry:5});
 // Far rail and rear leg sit behind the deck; the cantilever projects right.
 add(art,'path',{class:'n2-tower-rail far',d:'M78 235V220Q78 214 84 214H117V235'});
 add(art,'path',{class:'n2-tower-support far',d:'M82 242H91L99 325H89Z'});
 add(art,'path',{class:'n2-tower-support',d:'M118 242H130L145 325H134Z'});
 add(art,'path',{class:'n2-tower-brace',d:'M89 315L126 255M94 267L134 311'});
 add(art,'path',{class:'n2-tower-ladder',d:'M43 325L66 244M69 325L88 244'});
 for(let y=260;y<=312;y+=13){const q=(y-244)/81;add(art,'path',{class:'n2-tower-step',d:`M${66-23*q} ${y}H${88-19*q}`});}
 add(art,'path',{class:'n2-tower-feet',d:'M39 327H74M86 327H103M130 327H151'});
 add(art,'path',{class:'n2-tower-board-side',d:'M68 238H212V244Q164 247 68 245Z'});
 add(art,'path',{class:'n2-tower-board',d:'M68 238L77 231H218L212 238Z'});
 add(art,'path',{class:'n2-tower-board-line',d:'M83 233H209'});
 add(art,'path',{class:'n2-tower-rail',d:'M61 245V226Q61 220 67 220H103V238M63 232H103'});
 add(art,'circle',{class:'n2-tower-bolt',cx:126,cy:247,r:2.4});
 const hit=add(tower,'rect',{class:'n2-tower-hit',x:34,y:199,width:191,height:139,rx:7,fill:'transparent'});
 const update=()=>{tower.setAttribute('transform',`translate(${position.x} ${position.y})`);tower.setAttribute('aria-description',`Drag or use arrow keys to move. Home resets. Tap the agar plate to start the dive. Position: ${Math.round(position.x)} across, ${Math.round(-position.y)} up.`);};
 function constraints(){
  const box=habitat.getBoundingClientRect(),map=root.getScreenCTM();if(!map||!box.width||!box.height)return null;
  const bounds=art.getBBox(),left=bounds.x-3,right=bounds.x+bounds.width+3,top=bounds.y-3,bottom=bounds.y+bounds.height+3,corners=[[left,top],[right,top],[left,bottom],[right,bottom]].map(([x,y])=>new DOMPoint(x,y).matrixTransform(map));
  return {map,origin:new DOMPoint(0,0).matrixTransform(map),art:{left:Math.min(...corners.map(p=>p.x)),right:Math.max(...corners.map(p=>p.x)),top:Math.min(...corners.map(p=>p.y)),bottom:Math.max(...corners.map(p=>p.y))},scene:{left:box.left+10,right:box.right-10,top:box.top+10,bottom:box.bottom-10}};
 }
 const move=wanted=>{const c=constraints();if(!c)return;const client=new DOMPoint(wanted.x,wanted.y).matrixTransform(c.map),shift=constrainTower({x:client.x-c.origin.x,y:client.y-c.origin.y},c.art,c.scene),p=new DOMPoint(c.origin.x+shift.x,c.origin.y+shift.y).matrixTransform(c.map.inverse());position.x=Math.abs(p.x)<1e-8?0:p.x;position.y=Math.abs(p.y)<1e-8?0:p.y;update();};
 let drag=null;
 tower.addEventListener('pointerdown',e=>{if(e.button!==0||drag)return;e.preventDefault();e.stopPropagation();tower.focus({preventScroll:true});drag={id:e.pointerId,x:e.clientX,y:e.clientY,position:{...position},map:root.getScreenCTM().inverse(),moved:false};tower.setPointerCapture(e.pointerId);});
 tower.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;if(!drag.moved){if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)<6)return;drag.moved=true;onMove();}const a=new DOMPoint(drag.x,drag.y).matrixTransform(drag.map),b=new DOMPoint(e.clientX,e.clientY).matrixTransform(drag.map);move({x:drag.position.x+b.x-a.x,y:drag.position.y+b.y-a.y});});
 const release=e=>{if(drag&&e.pointerId===drag.id)drag=null;};for(const name of['pointerup','pointercancel','lostpointercapture'])tower.addEventListener(name,release);
 tower.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();});
 tower.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(e.key))return;e.preventDefault();e.stopPropagation();onMove();const step=e.shiftKey?16:5;if(e.key==='Home')move({x:0,y:0});else move({x:position.x+(e.key==='ArrowRight'?step:e.key==='ArrowLeft'?-step:0),y:position.y+(e.key==='ArrowDown'?step:e.key==='ArrowUp'?-step:0)});});
 const reflow=()=>{if(tower.isConnected&&!drag)move({...position});};
 window.addEventListener('resize',reflow);move({...position});
 return {element:tower,remove(){window.removeEventListener('resize',reflow);tower.remove();}};
}
