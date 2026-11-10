const assert=require('node:assert/strict');
(async()=>{
 const {INDIA_GEM,loupeGemPoint,gemClearRadius,clearGemLanding}=await import('../game-of-worms/treasure-geometry.js');
 const {pieces}=await import('../game-of-worms/treasure-pieces.js');
 const {gemLanding,gemDropFrames}=await import('../game-of-worms/treasure-motion.js');
 // Every vertex remains within the tube's straight interior, before its curved end.
 for(const [x,y]of pieces[0].local){const px=INDIA_GEM.x+x*INDIA_GEM.scale,py=INDIA_GEM.y+y*INDIA_GEM.scale;assert(px>=-128&&px<=122);assert(py>=-34&&py<=34);}
 assert(INDIA_GEM.scale>=.4,'The source is at least four times its previous size');
 const box={x:0,y:0,width:100,height:100};
 assert.deepEqual(loupeGemPoint({x:50,y:50},box),{x:50,y:50});
 assert.deepEqual(loupeGemPoint({x:60,y:45},box),{x:70,y:40});
 assert.equal(loupeGemPoint({x:80,y:50},box),null,'A physically covered but optically clipped gem must not reveal');
 assert.equal(loupeGemPoint({x:95,y:50},box),null);
 assert.deepEqual(loupeGemPoint({x:80,y:60},{x:20,y:10,width:100,height:100}),{x:90,y:60});
 let cases=0;
 for(const width of[280,315,360,568,724,1000,1440])for(const wrap of[31,62,84])for(const id of['bali','compost','towel','bubbles','mauritius'])for(const size of[.027,.063,.19,.3]){
  const height=width*.717,index={bali:1,compost:5,towel:7,bubbles:4,mauritius:2}[id];
  const radius=gemClearRadius(pieces[index].local,size*height);
  const labels=[{left:12,right:Math.min(112,width*.3),top:height-43,bottom:height-12},{left:Math.max(124,width-225),right:width-12,top:height-12-wrap,bottom:height-12}];
  const layout={width,height,radius,labels},start={x:72,y:35};
  const end=clearGemLanding({...gemLanding(start,id),size},layout,start.y);
  const x=end.x*width/100,y=end.y*height/100;
  assert(x-radius>=6-1e-8&&x+radius<=width-6+1e-8,'Complete gem and target remain inside scene');
  assert(y-radius>=6-1e-8&&y+radius<=height-6+1e-8);
  for(const r of labels)assert(x+radius<=r.left-6+1e-8||x-radius>=r.right+6-1e-8||y+radius<=r.top-6+1e-8||y-radius>=r.bottom+6-1e-8,'Labels remain clear, even when temporarily transparent');
  assert.equal(end.size,size,'Landing does not shrink a falling crystal');
  const next=clearGemLanding(end,layout);assert(Math.abs(next.x-end.x)<1e-8&&Math.abs(next.y-end.y)<1e-8,'Repeated frame checks do not drift');
  if(end.y>=start.y){const motion=gemDropFrames(start,end,width,height,0);let last=-Infinity;for(const f of motion.frames.slice(0,25)){const y=Number(f.translate.split(' ')[1].replace('px',''));assert(y>=last-1e-8);last=y;}}
  const resized=clearGemLanding(end,{width:315,height:226,radius:gemClearRadius(pieces[index].local,size*226),labels:[{left:124,right:303,top:152,bottom:214},{left:12,right:112,top:183,bottom:214}]});
  assert(Number.isFinite(resized.x)&&Number.isFinite(resized.y));cases++;
 }
 const low=clearGemLanding({x:80,y:81},{width:600,height:430,radius:24,labels:[{left:380,right:588,top:330,bottom:418}]},81);
 assert(low.y>=81,'A low release uses an available horizontal gap rather than falling upward');
 console.log(`PASS: clipped tube crystal, true optical visibility, and ${cases} size/width/label landing and resize cases.`);
})().catch(e=>{console.error(e);process.exitCode=1;});
