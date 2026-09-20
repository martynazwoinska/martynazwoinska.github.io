// Original eight-piece faceted heart. Adjacent pieces share exact seam vertices.
export const NS='http://www.w3.org/2000/svg';
export const svg=(parent,tag,attrs={})=>{const n=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))n.setAttribute(k,v);parent?.append(n);return n;};
// Original dissection on a square lattice: only straight 45 and 90 degree edges.
export const GEOMETRY_VERSION=2;
const grid=[
 [[0,1],[1,0],[1,2],[0,2]],
 [[1,0],[2,0],[3,1],[3,2],[1,2]],
 [[3,1],[4,0],[5,0],[6,1]],
 [[3,1],[6,1],[6,2],[3,2]],
 [[0,2],[2,2],[2,4]],
 [[2,2],[4,2],[3,3],[2,3]],
 [[4,2],[6,2],[3,5],[3,3]],
 [[2,3],[3,3],[3,5],[2,4]]
];
const toBoard=([x,y])=>[120+x*60,100+y*60];
export const outline=[[0,1],[1,0],[2,0],[3,1],[4,0],[5,0],[6,1],[6,2],[3,5],[0,2]].map(toBoard);
export const jewelColours=[
 {h:346,s:72,l:47},{h:219,s:72,l:51},{h:42,s:91,l:51},{h:276,s:53,l:53},
 {h:151,s:65,l:38},{h:320,s:61,l:58},{h:184,s:74,l:42},{h:21,s:88,l:53}
];
export const pieces=grid.map((points,id)=>{
 points=points.map(toBoard);
 // Area centroid keeps the turning pivot inside each convex piece.
 let area=0,cx=0,cy=0;
 points.forEach(([x,y],i)=>{const [u,v]=points[(i+1)%points.length],cross=x*v-u*y;area+=cross;cx+=(x+u)*cross;cy+=(y+v)*cross;});
 cx/=3*area;cy/=3*area;
 return {id,points,cx,cy,local:points.map(([x,y])=>[x-cx,y-cy]),neighbors:[]};
});
// A positive shared edge counts; merely touching a corner does not.
const sharesEdge=(a,b)=>a.some((p,i)=>b.some((q,j)=>{
 const r=a[(i+1)%a.length],s=b[(j+1)%b.length],dx=r[0]-p[0],dy=r[1]-p[1];
 const cross=t=>dx*(t[1]-p[1])-dy*(t[0]-p[0]);
 if(Math.abs(cross(q))>.001||Math.abs(cross(s))>.001)return false;
 const axis=Math.abs(dx)>Math.abs(dy)?0:1;
 return Math.min(Math.max(p[axis],r[axis]),Math.max(q[axis],s[axis]))-Math.max(Math.min(p[axis],r[axis]),Math.min(q[axis],s[axis]))>.001;
}));
for(const p of pieces)p.neighbors=pieces.filter(q=>p!==q&&sharesEdge(p.points,q.points)).map(q=>q.id);
export const pointsText=points=>points.map(p=>p.join(',')).join(' ');
export const rotate=(x,y,a)=>{const r=a*Math.PI/180;return{x:x*Math.cos(r)-y*Math.sin(r),y:x*Math.sin(r)+y*Math.cos(r)};};
export const normalAngle=a=>((a%360)+360)%360;
// Visually identical half-turns must fit just like the original orientation.
export const symmetryAngles=pieces.map(p=>[0,90,180,270].filter(a=>p.local.every(([x,y])=>{const r=rotate(x,y,a);return p.local.some(([u,v])=>Math.hypot(r.x-u,r.y-v)<.001);} )));
// Offset each straight edge by the same distance for an even cut-crystal bevel.
export function insetPolygon(p,d){
 const lines=p.map(([x,y],i)=>{const [u,v]=p[(i+1)%p.length],dx=u-x,dy=v-y,len=Math.hypot(dx,dy);return{x:x-dy/len*d,y:y+dx/len*d,dx,dy};});
 return lines.map((b,i)=>{const a=lines[(i+lines.length-1)%lines.length],cross=a.dx*b.dy-a.dy*b.dx,t=((b.x-a.x)*b.dy-(b.y-a.y)*b.dx)/cross;return[a.x+t*a.dx,a.y+t*a.dy];});
}
let gemFinishId=0;
export function drawGem(parent,id,size=1){
 const piece=pieces[id],g=svg(parent,'g',{'data-gem-art':id,transform:`scale(${size})`,'pointer-events':'none'}),p=piece.local,c=jewelColours[id];
 const colour=(light,saturation=c.s)=>`hsl(${c.h} ${saturation}% ${light}%)`;
 const gradientId=`gem-face-${++gemFinishId}`,defs=svg(g,'defs'),gradient=svg(defs,'linearGradient',{id:gradientId,x1:0,y1:0,x2:1,y2:1});
 for(const [offset,light,saturation]of [[0,c.l+24,c.s-15],[.38,c.l+10,c.s],[.72,c.l,c.s],[1,c.l-13,c.s]])svg(gradient,'stop',{offset,'stop-color':colour(light,saturation)});
 svg(g,'polygon',{points:pointsText(p),fill:colour(c.l-15),stroke:colour(23),'stroke-width':1.3,'stroke-linejoin':'round'});
 const rim=insetPolygon(p,2),table=insetPolygon(p,10);
 // Broad crown facets alternate light and shade, with a fine polished outer rim.
 rim.forEach((point,i)=>{
  const n=(i+1)%p.length,next=rim[n],dx=next[0]-point[0],dy=next[1]-point[1],light=(-dy+dx)/Math.hypot(dx,dy),level=Math.max(22,Math.min(83,c.l+light*21));
  svg(g,'polygon',{points:pointsText([point,next,table[n],table[i]]),fill:colour(level),stroke:colour(level),'stroke-width':.35});
  svg(g,'polygon',{points:pointsText([point,next,table[i]]),fill:light>0?'#fff':'#102435','fill-opacity':light>0?.12:.16});
  svg(g,'path',{d:`M${point.join(' ')}L${table[i].join(' ')}`,stroke:'#fff','stroke-opacity':.2,'stroke-width':.65});
 });
 svg(g,'polygon',{points:pointsText(table),fill:`url(#${gradientId})`,stroke:colour(Math.min(88,c.l+31),c.s-25),'stroke-width':.8});
 // Quiet reflections sit within the table; the silhouette and hit area are unchanged.
 const mix=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t);
 svg(g,'polygon',{points:pointsText([table[0],table[1],mix(table[1],[0,0],.78),mix(table[0],[0,0],.64)]),fill:'#fff','fill-opacity':.16});
 const bright=rim.reduce((best,point,i)=>point[0]+point[1]<rim[best][0]+rim[best][1]?i:best,0),corner=rim[bright],before=mix(corner,rim[(bright+rim.length-1)%rim.length],.35),after=mix(corner,rim[(bright+1)%rim.length],.48);
 svg(g,'path',{d:`M${before.join(' ')}L${corner.join(' ')}L${after.join(' ')}`,fill:'none',stroke:'#fff','stroke-opacity':.72,'stroke-width':1.5,'stroke-linejoin':'round'});
 svg(g,'circle',{cx:corner[0],cy:corner[1],r:1.2,fill:'#fff','fill-opacity':.9});
 return g;
}
export function revealTreasure(habitat,id,node,x=0,y=0){
  if(habitat.dataset.treasureId!==id||habitat.dataset.treasureState!=='hidden')return;
  habitat.dispatchEvent(new CustomEvent('treasure-reveal',{detail:{id,node,x,y}}));
}
