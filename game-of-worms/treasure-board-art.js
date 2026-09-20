import {svg,pieces,pointsText,rotate} from './treasure-pieces.js?v=20260920-discovery-2';

let serial=0;
export function drawPuzzleSetting(board){
 const id=`jewel-board-${++serial}`,defs=svg(board,'defs');
 const felt=svg(defs,'radialGradient',{id,cx:'.46',cy:'.38',r:'.76'});
 svg(felt,'stop',{offset:0,'stop-color':'#386e61'});
 svg(felt,'stop',{offset:1,'stop-color':'#183f39'});
 const background=svg(board,'g',{'aria-hidden':'true','pointer-events':'none'});
 svg(background,'rect',{x:1,y:1,width:598,height:648,rx:29,fill:'#b99a60'});
 svg(background,'rect',{x:5,y:5,width:590,height:640,rx:25,fill:'#fff6dc',stroke:'#e4cf9a','stroke-width':2});
 svg(background,'rect',{x:12,y:12,width:576,height:626,rx:20,fill:`url(#${id})`,stroke:'#486754','stroke-width':2});
 svg(background,'rect',{x:20,y:20,width:560,height:610,rx:15,fill:'none',stroke:'#cfbb826b','stroke-width':1});
 for(const [x,y,a] of [[28,28,0],[572,28,90],[572,622,180],[28,622,270]]){
  const corner=svg(background,'g',{transform:`translate(${x} ${y}) rotate(${a})`,fill:'none',stroke:'#d5bf87','stroke-width':1.4,'stroke-linecap':'round'});
  svg(corner,'path',{d:'M0 39V12Q0 0 12 0H39M8 29Q22 24 24 9M12 23Q8 11 16 7Q24 13 12 23M18 17Q29 18 32 9Q24 4 18 17'});
  svg(corner,'path',{d:'m4 4 3-3 3 3-3 3Z',fill:'#d5bf87',stroke:'none'});
 }
 return background;
}

// Use the actual assembled coordinates, including free-position Mystery hearts.
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
