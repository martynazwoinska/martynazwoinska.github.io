const assert=require('node:assert/strict');
(async()=>{
 const {feedingPlatePlacement,feedingSceneChanged}=await import('../game-of-worms/n2-feeding.js');
 assert.equal(feedingSceneChanged({width:360,height:258},{width:360,height:258,top:200}),false,'Scrolling or browser bars must not interrupt an unchanged scene');
 assert.equal(feedingSceneChanged({width:360,height:258},{width:360.2,height:258.1}),false,'Subpixel rounding must not interrupt feeding');
 assert.equal(feedingSceneChanged({width:360,height:258},{width:786,height:563}),true,'An orientation change must restore the scene safely');
 const regular={left:220,right:276,top:170,bottom:196,width:56,height:26},scene={left:10,right:320,top:10,bottom:226};
 assert.deepEqual(feedingPlatePlacement(regular,{x:248,y:183},scene,{scale:2.05,x:9,y:-4}),{scale:2.05,x:9,y:-4},'An already-fitting meal keeps its existing size and shift');
 let cases=0,capped=0;
 for(const width of[330,360,400,786,1120])for(const fraction of[.17,.35,.65])for(const angle of[-.2,0,.15])for(const sx of[0,.5,1])for(const sy of[0,.5,1]){
  const height=width*430/600,scene={left:10,right:width-10,top:10,bottom:height-10},w=width*fraction,h=w*.46;
  const bw=Math.abs(w*Math.cos(angle))+Math.abs(h*Math.sin(angle)),bh=Math.abs(w*Math.sin(angle))+Math.abs(h*Math.cos(angle));
  const left=10+(width-20-bw)*sx,top=10+(height-20-bh)*sy,bounds={left,right:left+bw,top,bottom:top+bh,width:bw,height:bh},origin={x:left+bw*.48,y:top+bh*.55},wanted={scale:width<500?2.05:1.62,x:width*.03,y:-4};
  const fit=feedingPlatePlacement(bounds,origin,scene,wanted);cases++;if(fit.scale<wanted.scale)capped++;
  assert(Object.values(fit).every(Number.isFinite));
  for(let i=0;i<=100;i++){
   const t=i/100,scale=1+t*(fit.scale-1),x=fit.x*t,y=fit.y*t;
   const edges={left:origin.x+(left-origin.x)*scale+x,right:origin.x+(bounds.right-origin.x)*scale+x,top:origin.y+(top-origin.y)*scale+y,bottom:origin.y+(bounds.bottom-origin.y)*scale+y};
   assert(edges.left>=scene.left-1e-8&&edges.right<=scene.right+1e-8&&edges.top>=scene.top-1e-8&&edges.bottom<=scene.bottom+1e-8,'The whole plate must fit throughout expansion and the reversed return');
   if(!i){assert(Math.abs(edges.left-left)<1e-8);assert(Math.abs(edges.top-top)<1e-8);}
  }
 }
 assert(capped>0,'Oversized user plates exercise the expansion cap');
 console.log(`N2 mobile: ${cases} moved, rotated and resized plate cases fit at every transition step; resting coordinates and scene-resize guard pass.`);
})().catch(e=>{console.error(e);process.exitCode=1;});
