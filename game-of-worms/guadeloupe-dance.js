const clamp=x=>Math.max(0,Math.min(1,x));
const smooth=x=>{x=clamp(x);return x*x*(3-2*x);};
export const DANCE_DURATION=4100;
export function drumPhrase(male){
  const times=male?[160,560,760,960,1360,1560,1760,2160,2360,2560,2860,3160]:[160,560,960,1160,1360,1760,1960,2160,2560,2760,2960,3160];
  const tones=male?['low','muted','open','low','open','muted','low','muted','open','low','muted','open']:['open','low','muted','open','muted','low','open','muted','low','muted','open','low'];
  return times.map((at,i)=>({at,tone:tones[i],hand:i%2,accent:[1,.62,.83,.91,.88,.57,.96,.65,.85,.93,.6,1][i]}));
}
export function danceEnvelope(ms){return smooth(ms/420)*smooth((DANCE_DURATION-ms)/650);}
export function bendPoint(x,y,ms,reduced=false){
  if(reduced)return {x,y};
  // The face and tail tip stay anchored. A travelling wave bends the middle.
  const weight=Math.sin(Math.PI*clamp((y-92)/172))**2*smooth((x-94)/68);
  const phase=ms/1600*Math.PI*2-(y-170)*.014;
  const envelope=danceEnvelope(ms);
  return {x:x+weight*envelope*(30*Math.sin(phase)+5*Math.sin(phase*2)),
    y:y+weight*envelope*6*Math.sin(phase+1.1)};
}
export function wingAngle(ms,side,reduced=false){return reduced?0:danceEnvelope(ms)*(8*Math.sin(ms/160*Math.PI)+3*Math.sin(ms/800*Math.PI))*side;}
export function handLift(ms,score,hand,reduced=false){
  if(reduced)return 0;
  let lift=0;
  for(const hit of score){
    if(hit.hand!==hand)continue;const t=ms-hit.at;
    if(t>=-140&&t<0)lift=Math.min(lift,-24*Math.sin(Math.PI*(t+140)/140));
    if(t>=0&&t<160)lift=Math.min(lift,-10*Math.sin(Math.PI*t/160));
  }
  return lift;
}

// Sample the existing paths once, then deform their points. This bends the
// stroke itself instead of shaking or rotating an unchanged worm silhouette.
export function pathPoints(d){
  const tokens=d.match(/[a-zA-Z]|[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/g)||[];
  const points=[];let i=0,command='',x=0,y=0,startX=0,startY=0;
  const n=()=>Number(tokens[i++]);
  while(i<tokens.length){
    if(/[a-zA-Z]/.test(tokens[i]))command=tokens[i++];
    const absolute=command===command.toUpperCase(),cmd=command.toUpperCase();
    const ox=x,oy=y,point=()=>{const a=n(),b=n();return [a+(absolute?0:ox),b+(absolute?0:oy)];};
    if(cmd==='Z'){points.push({close:true});x=startX;y=startY;command='';continue;}
    if(cmd==='M'){[x,y]=point();points.push({x,y,move:true});startX=x;startY=y;command=absolute?'L':'l';continue;}
    if(cmd==='L'){const [nx,ny]=point();for(let j=1;j<=4;j++)points.push({x:ox+(nx-ox)*j/4,y:oy+(ny-oy)*j/4});x=nx;y=ny;continue;}
    if(cmd==='C'){
      const [a,b]=point(),[c,e]=point(),[nx,ny]=point();
      for(let j=1;j<=18;j++){const t=j/18,u=1-t;points.push({x:u*u*u*ox+3*u*u*t*a+3*u*t*t*c+t*t*t*nx,y:u*u*u*oy+3*u*u*t*b+3*u*t*t*e+t*t*t*ny});}
      x=nx;y=ny;continue;
    }
    if(cmd==='Q'){
      const [a,b]=point(),[nx,ny]=point();
      for(let j=1;j<=12;j++){const t=j/12,u=1-t;points.push({x:u*u*ox+2*u*t*a+t*t*nx,y:u*u*oy+2*u*t*b+t*t*ny});}
      x=nx;y=ny;continue;
    }
    throw Error(`Unsupported dance path command: ${command}`);
  }
  return points;
}
export function bentPath(points,ms,reduced=false){return points.map(p=>{
  if(p.close)return 'Z';const q=bendPoint(p.x,p.y,ms,reduced);
  return `${p.move?'M':'L'}${q.x.toFixed(2)} ${q.y.toFixed(2)}`;
}).join('');}
