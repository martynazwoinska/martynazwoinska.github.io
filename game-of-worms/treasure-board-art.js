import {svg,pieces,pointsText,outline,rotate,insetPolygon} from './treasure-pieces.js?v=20260920-discovery-2';

let serial=0;
export function drawPuzzleSetting(board){
 const id=`jewel-board-${++serial}`,defs=svg(board,'defs');
 const felt=svg(defs,'radialGradient',{id,cx:'.46',cy:'.38',r:'.76'});
 svg(felt,'stop',{offset:0,'stop-color':'#407969'});
 svg(felt,'stop',{offset:1,'stop-color':'#193f38'});
 const lip=svg(defs,'linearGradient',{id:`${id}-lip`,x1:0,y1:0,x2:'.7',y2:1});
 svg(lip,'stop',{offset:0,'stop-color':'#102f2a'});
 svg(lip,'stop',{offset:'.48','stop-color':'#285748'});
 svg(lip,'stop',{offset:1,'stop-color':'#92ad83'});
 const background=svg(board,'g',{'aria-hidden':'true','pointer-events':'none'});
 svg(background,'rect',{x:1,y:1,width:598,height:648,rx:29,fill:'#b99a60'});
 svg(background,'rect',{x:5,y:5,width:590,height:640,rx:25,fill:'#fff6dc',stroke:'#e4cf9a','stroke-width':2});
 svg(background,'rect',{x:12,y:12,width:576,height:626,rx:20,fill:`url(#${id}-lip)`,stroke:'#486754','stroke-width':2});
 svg(background,'rect',{x:20,y:22,width:560,height:608,rx:15,fill:`url(#${id})`});
 svg(background,'path',{d:'M20 47V37Q20 22 35 22H560',fill:'none',stroke:'#102f2a','stroke-opacity':'.65','stroke-width':3});
 svg(background,'path',{d:'M40 630H565Q580 630 580 615V50',fill:'none',stroke:'#b1c199','stroke-opacity':'.3','stroke-width':1.5});
 for(const [x,y,a] of [[31,33,0],[569,33,90],[569,617,180],[31,617,270]]){
  const corner=svg(background,'g',{transform:`translate(${x} ${y}) rotate(${a})`,fill:'none',stroke:'#c9b983','stroke-width':1.3,'stroke-linecap':'round',opacity:.6});
  svg(corner,'path',{d:'M0 23V8Q0 0 8 0H23'});
 }
 return background;
}

// The outer collar stays outside the exact mating outline, leaving the fit unchanged.
function bevelRing(parent,outer,inner,colours){
 outer.forEach((a,i)=>{const j=(i+1)%outer.length,b=outer[j],dx=b[0]-a[0],dy=b[1]-a[1];
  const light=(dx-dy)/Math.hypot(dx,dy);
  const fill=light>.35?colours[0]:light<-.35?colours[2]:colours[1];
  svg(parent,'polygon',{points:pointsText([a,b,inner[j],inner[i]]),fill,stroke:fill,'stroke-width':.45});
 });
}
export function drawPuzzleRecess(board,easy){
 const id=`jewel-recess-${++serial}`,defs=svg(board,'defs');
 const floor=svg(defs,'linearGradient',{id,x1:0,y1:0,x2:'.25',y2:1});
 svg(floor,'stop',{offset:0,'stop-color':'#112e2a'});
 svg(floor,'stop',{offset:'.36','stop-color':'#1e453b'});
 svg(floor,'stop',{offset:1,'stop-color':'#376554'});
 const guide=svg(board,'g',{transform:'translate(0 80)','aria-hidden':'true','pointer-events':'none'});
 const outer=insetPolygon(outline,-15),crown=insetPolygon(outline,-10),lip=insetPolygon(outline,-3);
 // A solid raised collar with a visible lower side and a small contact shadow.
 svg(guide,'polygon',{points:pointsText(outer),transform:'translate(2 13)',fill:'#0a211d',opacity:.3,stroke:'#0a211d','stroke-width':6,'stroke-linejoin':'round'});
 svg(guide,'polygon',{points:pointsText(outer),transform:'translate(0 8)',fill:'#514831',stroke:'#343a2b','stroke-width':1});
 outer.forEach((a,i)=>{const b=outer[(i+1)%outer.length];if(b[0]<a[0])svg(guide,'polygon',{points:pointsText([a,b,[b[0],b[1]+8],[a[0],a[1]+8]]),fill:'#746441'});});
 bevelRing(guide,outer,crown,['#e0cb91','#b79a60','#786541']);
 bevelRing(guide,crown,lip,['#bdab76','#ae9865','#948155']);
 // Dark inner walls descend to the same outline used by the snapping logic.
 bevelRing(guide,lip,outline,['#3c4431','#596246','#a4ae7c']);
 svg(guide,'polygon',{points:pointsText(outline),fill:`url(#${id})`,stroke:'#0b2720','stroke-width':1.2});
 const clip=svg(defs,'clipPath',{id:`${id}-clip`});svg(clip,'polygon',{points:pointsText(outline)});
 const wall=svg(guide,'g',{'clip-path':`url(#${id}-clip)`});
 svg(wall,'polygon',{points:pointsText(outline),transform:'translate(0 7)',fill:'none',stroke:'#071e19','stroke-opacity':.6,'stroke-width':12,'stroke-linejoin':'round'});
 if(easy)for(const p of pieces){
  const socket=svg(guide,'g',{'data-piece-socket':p.id});
  const bed=insetPolygon(p.points,4);
  svg(socket,'polygon',{points:pointsText(p.points),fill:'#65816a'});
  bevelRing(socket,p.points,bed,['#253f32','#4e6853','#9aa680']);
  svg(socket,'polygon',{points:pointsText(bed),fill:`url(#${id})`});
 }
 return guide;
}

// Use the actual assembled coordinates for the clipped finish.
export function assemblyPolygons(puzzle){
 return pieces.map((piece,i)=>piece.local.map(([x,y])=>{const p=puzzle.poses[i],q=rotate(x,y,p.a);return[p.x+q.x,p.y+q.y];}));
}

export function celebrateHeart(board,puzzle,animate=true){
 if(board.querySelector('[data-heart-finish]'))return false;
 const polygons=assemblyPolygons(puzzle),points=polygons.flat(),xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);
 const left=Math.min(...xs),right=Math.max(...xs),top=Math.min(...ys),bottom=Math.max(...ys),cx=(left+right)/2,cy=(top+bottom)/2;
 const id=`heart-finish-${++serial}`,defs=svg(board,'defs'),clip=svg(defs,'clipPath',{id});
 for(const poly of polygons)svg(clip,'polygon',{points:pointsText(poly)});
 const assembly=board.querySelector('[data-heart-assembly]')||board;
 const finish=svg(assembly,'g',{'data-heart-finish':'','aria-hidden':'true','pointer-events':'none'});
 const glow=svg(finish,'g',{opacity:.055});
 for(const poly of polygons)svg(glow,'polygon',{points:pointsText(poly),fill:'#fff3c5'});
 const sheen=svg(finish,'g',{'clip-path':`url(#${id})`});
 const light=svg(sheen,'path',{d:`M${left-130} ${top-30}h38l-115 ${bottom-top+60}h-38Z`,fill:'#fffce5',opacity:0});
 const stars=[];
 for(let i=0;i<12;i++){
  const angle=i*Math.PI/6-.3,x=Math.max(32,Math.min(568,cx+Math.cos(angle)*(right-left+34)/2)),y=Math.max(32,Math.min(618,cy+Math.sin(angle)*(bottom-top+34)/2));
  const star=svg(finish,'g',{transform:`translate(${x} ${y})`});
  const size=i%3===0?8:5;
  const twinkle=svg(star,'path',{d:`M0 ${-size}Q1 -1 ${size} 0Q1 1 0 ${size}Q-1 1 ${-size} 0Q-1 -1 0 ${-size}Z`,fill:i%2?'#e8cc84':'#fff8d8',opacity:i%3===0?.4:0});
  stars.push(twinkle);
 }
 if(!animate||matchMedia('(prefers-reduced-motion: reduce)').matches)return animate;
 // Transform the whole assembly, keeping every seam and the light in register.
 assembly.style.transformOrigin=`${cx}px ${cy}px`;
 assembly.animate([
  {transform:'translateY(0) scale(1)',offset:0},
  {transform:'translateY(-10px) scale(1)',offset:.23},
  {transform:'translateY(-12px) scale(1.035)',offset:.32},
  {transform:'translateY(-10px) scale(1)',offset:.41},
  {transform:'translateY(-12px) scale(1.025)',offset:.52},
  {transform:'translateY(-10px) scale(1)',offset:.61},
  {transform:'translateY(-10px) scale(1)',offset:.76},
  {transform:'translateY(0) scale(1)',offset:1}
 ].map(frame=>({...frame,easing:'ease-in-out'})),{duration:3000});
 glow.animate([{opacity:.055},{opacity:.25,offset:.32},{opacity:.07,offset:.41},{opacity:.2,offset:.52},{opacity:.055}].map(frame=>({...frame,easing:'ease-in-out'})),{duration:3000});
 light.animate([{transform:'translateX(0)',opacity:0},{opacity:.38,offset:.15},{opacity:.38,offset:.8},{transform:`translateX(${right-left+280}px)`,opacity:0}],{duration:1800,delay:120,easing:'ease-in-out'});
 stars.forEach((star,i)=>star.animate([{opacity:0,transform:'translateY(8px) scale(.2)'},{opacity:.9,transform:'translateY(-5px) scale(1.15)',offset:.35},{opacity:0,transform:'translateY(-27px) scale(.3)'}],{duration:1050,delay:1550+i*32,fill:'backwards',easing:'ease-out'}));
 return true;
}
