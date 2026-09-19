const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url'),path=require('node:path');
(async()=>{
 const {sketchFrame,sketchPose,boundedPeek,modelArms,DURATION}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/orsay-play.js')));
 assert.deepEqual(sketchPose(78,228,1,1,{x:62,y:20}),{x:78,y:228},'Drawing leaves the artist tail planted');
 assert(sketchPose(220,180,1,0).x>240,'The middle bends rather than moving as a rigid shape');
 assert.deepEqual(sketchPose(329,65,1,0),{x:329,y:65},'Holding a curved pose does not displace the face');
 assert(Math.hypot(...Object.values(boundedPeek(1000,-1000)))<=62.00001,'Peeking is bounded even when props are moved far away');
 assert(sketchPose(329,65,0,0,{x:40,y:12}).x===369,'The front follows the peek while the tail stays planted');
 let last=sketchFrame(0);
 for(let t=10;t<=DURATION+200;t+=10){const f=sketchFrame(t);for(const key of ['enter','leave','open','progress','peek','envelope','posing']){assert(f[key]>=0&&f[key]<=1);assert(Math.abs(f[key]-last[key])<.04,`No jump in ${key}`);}last=f;}
 assert.equal(sketchFrame(2500).posing,1,'Model settles before the portrait develops');
 assert.equal(sketchFrame(6200).posing,1,'Model holds the pose while the artist draws');
 assert.equal(sketchFrame(7300).posing,0,'Model releases the pose to inspect the portrait');
 for(const male of [false,true])for(let i=0;i<=100;i++){
  const limbs=modelArms(male,i/100);
  limbs.forEach((a,j)=>{const length=(p,q)=>Math.hypot(p.x-q.x,p.y-q.y);assert(Math.abs(length(a.shoulder,a.elbow)-(j?48:47))<.001,'Upper arm keeps its length');assert(Math.abs(length(a.elbow,a.hand)-(j?56:53))<.001,'Forearm keeps its length');});
 }
 assert(last.done);assert.equal(last.envelope,0);assert.equal(last.open,0);
 const nodes=[];global.document={createElementNS:(_,tag)=>{const n={tag,attrs:{},children:[],setAttribute(k,v){this.attrs[k]=String(v);},appendChild(c){this.children.push(c);return c;}};nodes.push(n);return n;}};
 const {drawOrsayArt,BOOK,BAG,CROWN}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/orsay-art.js')));
 for(const family of [BOOK,BAG]){const a=document.createElementNS('','g'),b=document.createElementNS('','g');assert(drawOrsayArt(a,{family},false));assert(drawOrsayArt(b,{family},true));assert.notEqual(JSON.stringify(a),JSON.stringify(b),'Paired art has distinct construction');}
 assert(nodes.some(n=>'data-orsay-supplies' in n.attrs),'Drawing supplies are visible inside the bags');
 assert(!nodes.some(n=>'data-orsay-bag-fruit' in n.attrs),'No fruit props remain');
 assert.equal(drawOrsayArt(document.createElementNS('','g'),{family:CROWN}),false,'Approved crown renderer is preserved');
 const arity={m:2,l:2,h:1,v:1,c:6,s:4,q:4,t:2,a:7,z:0};
 for(const n of nodes.filter(n=>n.tag==='path'))for(const [,c,a]of n.attrs.d.matchAll(/([MmLlHhVvCcSsQqTtAaZz])([^MmLlHhVvCcSsQqTtAaZz]*)/g)){const count=(a.match(/[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?/g)||[]).length,u=arity[c.toLowerCase()];assert(u?count>=u&&count%u===0:count===0,`Malformed ${c}: ${n.attrs.d}`);}
 console.log('Orsay: planted tails and bounded peeking, continuous timing, full settling, paired art and SVG paths pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});
