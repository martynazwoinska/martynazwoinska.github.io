import {svg,pieces,pointsText,outline,rotate} from './treasure-pieces.js?v=20260920-discovery-2';

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

export function drawPuzzleRecess(board,easy){
 const id=`jewel-recess-${++serial}`,defs=svg(board,'defs');
 const floor=svg(defs,'linearGradient',{id,x1:0,y1:0,x2:'.25',y2:1});
 svg(floor,'stop',{offset:0,'stop-color':'#193e37'});
 svg(floor,'stop',{offset:'.4','stop-color':'#2c594d'});
 svg(floor,'stop',{offset:1,'stop-color':'#366656'});
 const clip=svg(defs,'clipPath',{id:`${id}-clip`});
 svg(clip,'polygon',{points:pointsText(outline)});
 const guide=svg(board,'g',{transform:'translate(0 80)','aria-hidden':'true','pointer-events':'none'});
 // A fine lower rim catches the light; the inner top wall casts a shallow shadow.
 svg(guide,'polygon',{points:pointsText(outline),transform:'translate(0 2)',fill:'none',stroke:'#adc49a','stroke-opacity':.65,'stroke-width':5,'stroke-linejoin':'round'});
 svg(guide,'polygon',{points:pointsText(outline),fill:`url(#${id})`,stroke:'#122f29','stroke-width':2.5,'stroke-linejoin':'round'});
 const wall=svg(guide,'g',{'clip-path':`url(#${id}-clip)`});
 svg(wall,'polygon',{points:pointsText(outline),transform:'translate(0 5)',fill:'none',stroke:'#0e2c26','stroke-opacity':.45,'stroke-width':9,'stroke-linejoin':'round'});
 if(easy)for(const p of pieces)svg(guide,'polygon',{points:pointsText(p.points),fill:'none',stroke:'#b9cbaa','stroke-opacity':.8,'stroke-width':1.25,'stroke-dasharray':'3 5'});
 return guide;
}

// Use the actual assembled coordinates for the clipped finish.
export function assemblyPolygons(puzzle){
 return pieces.map((piece,i)=>piece.local.map(([x,y])=>{const p=puzzle.poses[i],q=rotate(x,y,p.a);return[p.x+q.x,p.y+q.y];}));
}

export function celebrateHeart(board,puzzle,animate=true){
 if(board.querySelector('[data-heart-finish]'))return;
 const polygons=assemblyPolygons(puzzle),points=polygons.flat(),xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);
 const left=Math.min(...xs),right=Math.max(...xs),top=Math.min(...ys),bottom=Math.max(...ys),cx=(left+right)/2,cy=(top+bottom)/2;
 const id=`heart-finish-${++serial}`,defs=svg(board,'defs'),clip=svg(defs,'clipPath',{id});
 for(const poly of polygons)svg(clip,'polygon',{points:pointsText(poly)});
 const finish=svg(board,'g',{'data-heart-finish':'','aria-hidden':'true','pointer-events':'none'});
 const sheen=svg(finish,'g',{'clip-path':`url(#${id})`});
 const light=svg(sheen,'path',{d:`M${left-130} ${top-30}h38l-115 ${bottom-top+60}h-38Z`,fill:'#fffce5',opacity:0});
 const stars=[];
 for(let i=0;i<12;i++){
  const angle=i*Math.PI/6-.3,x=Math.max(32,Math.min(568,cx+Math.cos(angle)*(right-left+34)/2)),y=Math.max(32,Math.min(618,cy+Math.sin(angle)*(bottom-top+34)/2));
  const star=svg(finish,'g',{transform:`translate(${x} ${y})`});
  const size=i%3===0?8:5;
  const twinkle=svg(star,'path',{d:`M0 ${-size}Q1 -1 ${size} 0Q1 1 0 ${size}Q-1 1 ${-size} 0Q-1 -1 0 ${-size}Z`,fill:i%2?'#e8cc84':'#fff8d8',opacity:.75});
  stars.push(twinkle);
 }
 if(!animate||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 light.animate([{transform:'translateX(0)',opacity:0},{opacity:.48,offset:.15},{opacity:.48,offset:.8},{transform:`translateX(${right-left+280}px)`,opacity:0}],{duration:1900,delay:180,easing:'ease-in-out'});
 stars.forEach((star,i)=>star.animate([{opacity:0,transform:'scale(.2)'},{opacity:1,transform:'scale(1.25)',offset:.45},{opacity:.75,transform:'scale(1)'}],{duration:1050,delay:220+i*95,fill:'backwards',easing:'ease-out'}));
}
