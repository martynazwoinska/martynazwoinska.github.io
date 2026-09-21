// Gravity in scene pixels; a hard crystal gets two small, diminishing rebounds.
export function gemLanding(start,id,direction=1){
 const ground={bali:80,compost:81,towel:81,bubbles:80}[id]??start.y;
 const drift={bali:-3,compost:5,towel:5,bubbles:1.5}[id]??0;
 return {x:Math.max(7,Math.min(93,start.x+drift*direction)),y:Math.max(10,Math.min(84,Math.max(start.y,ground)))};
}
export function gemDropFrames(start,end,width,height,angle=0){
 const dx=(start.x-end.x)*width/100,dy=(start.y-end.y)*height/100;
 const fall=Math.max(0,-dy),flight=Math.max(220,Math.min(760,Math.sqrt(2*fall/1250)*1000));
 const bounce=Math.min(6,fall*.045),rebound=bounce?140:0,settle=100,total=flight+rebound+settle;
 const frames=[];
 for(let i=0;i<=24;i++){
  const q=i/24;frames.push({offset:flight*q/total,translate:dx*(1-q)+'px '+dy*(1-q*q)+'px',rotate:(angle+((bounce?18:0)-angle)*q)+'deg'});
 }
 if(bounce)for(let i=1;i<=12;i++){
  const q=i/12;frames.push({offset:(flight+rebound*q)/total,translate:'0 '+(-4*bounce*q*(1-q))+'px',rotate:(18*(1-q))+'deg'});
 }
 for(let i=1;i<=10;i++){
  const q=i/10;frames.push({offset:(flight+rebound+settle*q)/total,translate:'0 '+(-4*bounce*.18*q*(1-q))+'px',rotate:(-3*Math.sin(Math.PI*q))+'deg'});
 }
 return {frames,duration:total,contact:flight/total};
}
