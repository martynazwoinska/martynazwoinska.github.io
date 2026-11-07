const assert=require('node:assert/strict');
(async()=>{
 const {createDiveGeometry,DIVE_PREPARE_MS,DIVE_FLIGHT_MS}=await import('../game-of-worms/n2-dive-motion.js');
 const {boardContact,N2_PLATFORM,constrainTower}=await import('../game-of-worms/n2-diving-tower.js');
 // Equal-arc samples of the actual production worm, including its curved tail.
 const source=[[78,228],[86.503,237.034],[96.049,244.951],[106.704,251.287],[118.382,255.416],[130.698,256.649],[142.888,254.536],[154.045,249.184],[163.507,241.195],[170.985,231.317],[176.456,220.193],[180.014,208.315],[182.114,196.085],[184.966,184.009],[188.941,172.256],[194.054,160.952],[200.331,150.252],[207.8,140.348],[216.474,131.483],[226.323,123.949],[237.235,118.064],[248.984,114.11],[261.24,112.248],[273.637,112.459],[285.964,113.88],[298.362,113.738],[310.531,111.401],[321.859,106.409],[331.27,98.402],[337.132,87.56],[337.924,75.274],[333.712,63.676],[326,54]].map(([x,y])=>({x,y}));
 const dive=createDiveGeometry(source),target={x:350,y:270},offset={x:24,y:-8};
 const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y),segments=p=>p.slice(1).map((q,i)=>distance(q,p[i])),original=segments(source),orientation=(a,b,c)=>Math.sign((b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x));
 function checkPose(pose,label){
  assert(Number.isFinite(pose.scale)&&pose.points.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)),label+' is finite');
  for(const [i,length]of segments(pose.points).entries())assert(Math.abs(length-original[i]*pose.scale)<1e-6,label+' preserves every segment proportion');
  const p=pose.points;for(let i=0;i<p.length-3;i++)for(let j=i+2;j<p.length-1;j++)assert(!(orientation(p[i],p[i+1],p[j])*orientation(p[i],p[i+1],p[j+1])<0&&orientation(p[j],p[j+1],p[i])*orientation(p[j],p[j+1],p[i+1])<0),label+' does not self-intersect');
 }
 const prepared=dive.prepare(1,offset),start=dive.flight(0,target,offset);
 assert(Math.max(...prepared.points.map((p,i)=>Math.hypot(p.x-start.points[i].x,p.y-start.points[i].y)))<1e-8,'Preparation hands off without a jump');
 assert(distance(prepared.points[0],boardContact(offset,dive.scale))<1e-8,'Launch anchor comes from the visible free end of the board');
 assert(N2_PLATFORM.backX<N2_PLATFORM.tailX&&N2_PLATFORM.tailX<N2_PLATFORM.tipX,'The board projects right from its rear support');
 for(const q of[.1,.2,.3]){const pose=dive.prepare(q,offset),a=pose.points[0];for(let i=1;i<source.length;i++)assert(distance({x:(pose.points[i].x-a.x)/pose.scale,y:(pose.points[i].y-a.y)/pose.scale},{x:source[i].x-source[0].x,y:source[i].y-source[0].y})<1e-8,'Boarding keeps the original silhouette, with no simultaneous pose morph');}
 for(let q=.34;q<=1;q+=.01)assert(Math.abs(Math.max(...dive.prepare(q,offset).points.map(p=>p.y))-boardContact(offset,dive.scale).y)<1e-8,'The body rests above the board throughout the change of posture');
 const centreY=p=>p.points.reduce((sum,p)=>sum+p.y,0)/p.points.length;
 assert(centreY(dive.prepare(.80,offset))>centreY(dive.prepare(.61,offset))+8,'The crouch visibly lowers the centre of mass');
 assert(centreY(dive.prepare(1,offset))<centreY(dive.prepare(.80,offset))-12,'Extension raises the body before release');
 for(let q=.61;q<=1;q+=.01)assert(distance(dive.prepare(q,offset).points[0],boardContact(offset,dive.scale))<1e-8,'The tail remains planted during crouch and push-off');
 const chord=p=>distance(p.points[0],p.points.at(-1));
 assert(chord(dive.flight(.10,target,offset))>dive.length*.98,'The early rise stays extended');
 assert(chord(dive.flight(.36,target,offset))<dive.length*.65,'The middle of flight has one readable hip fold');
 assert(chord(dive.flight(.72,target,offset))>dive.length*.999,'Entry is straight, without an airborne sine wave');
 const art={left:36,right:221,top:211,bottom:338},scene={left:-100,right:520,top:-60,bottom:390};
 for(const wanted of[{x:-900,y:0},{x:900,y:0},{x:0,y:-900},{x:0,y:900},{x:-20,y:-80}]){const p=constrainTower(wanted,art,scene),r={left:art.left+p.x,right:art.right+p.x,top:art.top+p.y,bottom:art.bottom+p.y};assert(r.left>=scene.left&&r.right<=scene.right&&r.top>=scene.top&&r.bottom<=scene.bottom,'The tower stays inside the scene');}
 assert(constrainTower({x:200,y:50},art,scene).y>0,'Movement includes downward placement');
 assert(constrainTower({x:0,y:-160},art,scene).y<-60,'Movement extends beyond the previous narrow vertical limit');
 assert(dive.flight(.2,target,offset).centre.y<start.centre.y-15,'Centre of mass rises after release');
 assert(Math.abs(dive.flight(.72,target,offset).rotation-Math.PI/2)<1e-8,'The opened body enters vertically');
 const entry=dive.flight(.72,target,offset);assert(Math.hypot(entry.points.at(-1).x-target.x,entry.points.at(-1).y-target.y)<1e-8,'Head meets the actual agar plane');
 for(const moved of[offset,{x:0,y:150},{x:0,y:-120}]){const before=dive.flight(.72-.00001,target,moved),entry=dive.flight(.72,target,moved),after=dive.flight(.72+.00001,target,moved);assert(Math.abs(entry.centre.x-before.centre.x)<.00001,'Horizontal travel settles before vertical entry');assert(before.centre.y<entry.centre.y&&entry.centre.y<after.centre.y,'Even a lowered tower enters the plate moving downwards');}
 assert(dive.flight(1,target,offset).points.every(p=>p.y>target.y),'The entire body passes below the agar at completion');
 for(let i=0;i<=100;i++){const q=i/100;checkPose(dive.prepare(q,offset),'Preparation');checkPose(dive.flight(q,target,offset),'Flight');checkPose(dive.return(q,target,offset),'Full return');}
 for(const pose of[dive.prepare(0,offset),dive.return(1,target,offset)])assert(Math.max(...pose.points.map((p,i)=>distance(p,source[i])))<1e-8,'The original worm is reconstructed exactly');
 assert(Math.max(...dive.return(.65,target,offset).points.map((p,i)=>distance(p,dive.prepare(.61,offset).points[i])))<1e-8,'The return visits the moved board without reversing the crouch');
 const mean=p=>p.points.reduce((s,p)=>({x:s.x+p.x/33,y:s.y+p.y/33}),{x:0,y:0}),epsilon=.00001,release=mean(dive.prepare(1,offset)),beforeRelease=mean(dive.prepare(1-epsilon,offset)),afterRelease=mean(dive.flight(epsilon,target,offset)),beforeVelocity={x:(release.x-beforeRelease.x)/(epsilon*DIVE_PREPARE_MS/1000),y:(release.y-beforeRelease.y)/(epsilon*DIVE_PREPARE_MS/1000)},afterVelocity={x:(afterRelease.x-release.x)/(epsilon*DIVE_FLIGHT_MS/1000),y:(afterRelease.y-release.y)/(epsilon*DIVE_FLIGHT_MS/1000)};
 assert(beforeVelocity.x>0&&beforeVelocity.y<-25,'The centre of mass pushes upward and forward before release');
 assert(distance(beforeVelocity,afterVelocity)<1,'The centre of mass keeps its push-off velocity at release');
 const pre=dive.prepare(1-epsilon,offset),post=dive.flight(epsilon,target,offset);
 for(let i=0;i<prepared.points.length;i++){const p=prepared.points[i],va={x:(p.x-pre.points[i].x)/(epsilon*DIVE_PREPARE_MS/1000),y:(p.y-pre.points[i].y)/(epsilon*DIVE_PREPARE_MS/1000)},vb={x:(post.points[i].x-p.x)/(epsilon*DIVE_FLIGHT_MS/1000),y:(post.points[i].y-p.y)/(epsilon*DIVE_FLIGHT_MS/1000)};assert(distance(va,vb)<1,'Every body segment carries its velocity smoothly across take-off');}
 for(let i=0;i<=720;i++)assert(Math.min(...dive.flight(i/1000,target,offset).points.map(p=>p.y))>14,'The default flight leaves room for body thickness below the top of the scene');
 const {feedingFrame,feedingTime,feedingEntryTarget,DIVE_DELAY}=await import('../game-of-worms/n2-feeding.js');
 const browserPoint=Object.create({get x(){return 125;},get y(){return -30;}}),entryTarget=feedingEntryTarget(browserPoint,{a:1.6*Math.cos(-.1),b:1.6*Math.sin(-.1)});
 assert.equal(entryTarget.x,125);assert.equal(entryTarget.y,-30);assert(Math.abs(Math.hypot(entryTarget.normal.x,entryTarget.normal.y)-1)<1e-12,'Native DOMPoint accessors survive conversion and plate scale does not stretch the entry normal');
 assert.equal(feedingFrame(240).anticipation,0,'The original body finishes its crossfade before boarding begins');
 for(let ms=3120;ms<=3850;ms+=10)assert.equal(feedingFrame(feedingTime(ms)).crawler,0,'The crawler stays hidden until submergence has finished');
 assert.equal(feedingFrame(feedingTime(3850)).jumpOpacity,0,'The diver is hidden before the crawler reveal begins');
 assert.equal(feedingFrame(feedingTime(4030)).crawler,1,'The crawler finishes its short reveal before crawling and eating start');
 // Exercise the full scene range, not only the default right/down target.
 // Plate scale changes its entry point; sample that change at both limits.
 let positionCases=0;
 const normalFor=a=>({x:-Math.sin(a),y:Math.cos(a)});
 for(const x of[-150,0,150,300])for(const y of[-250,-120,0,60])for(const tx of[-150,0,150,350,550])for(const ty of[-150,0,150,300,450])for(const angle of[-.2,0,.15]){
  positionCases++;const normal=normalFor(angle),target={x:tx,y:ty,normal},offset={x,y},signed=p=>(p.x-tx)*normal.x+(p.y-ty)*normal.y,tangent=p=>(p.x-tx)*normal.y-(p.y-ty)*normal.x;
  let side=null;
  for(let u=.3;u<1;u+=.01){
   const pose=dive.flight(u,target,offset),next=dive.flight(u+.00001,target,offset);
   assert(pose.points.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)),'Moved combinations remain finite');
   if(u<.72)assert(pose.points.every(p=>signed(p)<.001),'Every body segment clears the actual tilted food plane before entry');
   if(u>=.60){
    assert(signed(next.points.at(-1))>signed(pose.points.at(-1)),'The final head approach always moves into the food, never back out');
    const lateral=tangent(pose.points.at(-1));if(u<.72&&Math.abs(lateral)>.005){if(side)assert.equal(Math.sign(lateral),side,'The head does not overshoot then steer back at the last moment');side=Math.sign(lateral);}
   }
   if(u>=.72)assert(next.points.every((p,i)=>signed(p)>signed(pose.points[i])),'Every submerged segment continues down without re-emerging');
  }
  const clipStart=dive.flight(.72*.82,target,offset);
  assert(clipStart.points.every(p=>signed(p)+23*clipStart.scale<0),'Enabling the surface clip cannot suddenly cut a thick body segment');
  const contact=dive.flight(.72,target,offset),before=dive.flight(.72-epsilon,target,offset),after=dive.flight(.72+epsilon,target,offset);
  assert(distance(contact.points.at(-1),target)<1e-7,'The head reaches the moved plate entry point exactly');
  const submerged=dive.flight(1,target,offset);assert(submerged.points.every(p=>signed(p)>23*submerged.scale),'The entire thick body is below the food before the crawler may appear');
  for(let i=0;i<contact.points.length;i++){
   const p=contact.points[i],a={x:(p.x-before.points[i].x)/epsilon,y:(p.y-before.points[i].y)/epsilon},b={x:(after.points[i].x-p.x)/epsilon,y:(after.points[i].y-p.y)/epsilon};
   assert(distance(a,b)<2,'Every segment crosses the tilted surface without a velocity snap');
  }
 }
 for(const size of[.6,2])for(const offset of[{x:-150,y:-250},{x:300,y:60}]){
  const normal=normalFor(-Math.PI/30),target={x:150+38*.82*size*1.62,y:50+10.5*.82*size*1.62,normal};
  assert(distance(dive.flight(.72,target,offset).points.at(-1),target)<1e-7,'Small and enlarged plates use their actual transformed entry point');
 }
 const extreme={x:-200,y:700};for(let u=.72;u<1;u+=.005)assert(dive.flight(u+.001,extreme,{x:-200,y:-400}).centre.y>dive.flight(u,extreme,{x:-200,y:-400}).centre.y,'Very large drops cannot reverse during submergence');
 console.log(`N2 dive: proportions, continuous release and entry, ${positionCases} moved/tilted combinations, plate size limits, no early clipping, no last-moment overshoot or re-emergence pass.`);
})().catch(error=>{console.error(error);process.exitCode=1;});
