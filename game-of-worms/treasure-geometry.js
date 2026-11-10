// The existing crystal fits wholly inside the straight, clear end of the tube.
export const INDIA_GEM={x:96,y:4,scale:.4};

// Match the live loupe's two-times optical transform, including off-centre views.
export function loupeGemPoint(point,box){
 const cx=box.x+box.width/2,cy=box.y+box.height/2,r=Math.min(box.width,box.height)*.4;
 if(2*Math.hypot(point.x-cx,point.y-cy)>=r)return null;
 return {x:cx+2*(point.x-cx),y:cy+2*(point.y-cy)};
}

// Reserve the complete crystal through its small settling rotation, plus its
// 48 px collection target. Coordinates below are scene-local CSS pixels.
export function gemClearRadius(points,size){
 const extent=Math.max(...points.flat().map(Math.abs));
 return Math.max(24,...points.map(([x,y])=>Math.hypot(x,y)*size*.425/extent));
}
export function clearGemLanding(point,{width,height,radius,labels=[]},minimumY=0){
 const gap=6,edge=radius+gap;
 const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
 const left=Math.min(edge,width/2),right=Math.max(left,width-edge);
 const top=Math.min(edge,height/2),bottom=Math.max(top,height-edge);
 const x=clamp(point.x*width/100,left,right),y=clamp(point.y*height/100,top,bottom);
 const obstacles=labels.filter(r=>r.right>0&&r.left<width&&r.bottom>0&&r.top<height)
  .map(r=>({left:r.left-edge,right:r.right+edge,top:r.top-edge,bottom:r.bottom+edge}));
 const clear=(a,b)=>!obstacles.some(r=>a>r.left&&a<r.right&&b>r.top&&b<r.bottom);
 const xs=[x,...obstacles.flatMap(r=>[r.left,r.right]),left,right].map(a=>clamp(a,left,right));
 const ys=[y,...obstacles.flatMap(r=>[r.top,r.bottom]),top,bottom].map(b=>clamp(b,top,bottom));
 const candidates=ys.flatMap(b=>xs.map(a=>({x:a,y:b}))).filter(p=>clear(p.x,p.y));
 // Prefer a downward landing. A very low release can instead settle sideways;
 // when neither fits, the caller uses a fade rather than an upward gravity arc.
 const downward=candidates.filter(p=>p.y>=minimumY*height/100);
 const available=downward.length?downward:candidates;
 available.sort((a,b)=>((a.x-x)**2+(a.y-y)**2)-((b.x-x)**2+(b.y-y)**2));
 const end=available[0]||{x,y};
 return {...point,x:end.x/width*100,y:end.y/height*100};
}
