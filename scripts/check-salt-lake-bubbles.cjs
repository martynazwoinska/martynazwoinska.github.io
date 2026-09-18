const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');const path=require('node:path');
(async()=>{
 const {bubblePose,bubbleFrame,picnicFrame}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/salt-lake-play.js')));
 assert.deepEqual(bubblePose(78,228,1),{x:78,y:228},'Tail stays planted while upper body bends');
 assert.deepEqual(bubblePose(78,228,1,0,1),{x:78,y:228},'Dipping keeps the tail planted');
 assert(bubblePose(329,65,0,0,1).y>90,'Body lowers towards the tray during dipping');
 assert(bubblePose(220,180,1).x<200,'Middle bends visibly, not rigid rotation');
 for(const small of [true,false]){let previous=bubbleFrame(0,small);for(let ms=10;ms<=6500;ms+=10){const f=bubbleFrame(ms,small);assert(Math.abs(f.lean-previous.lean)<.012,'Continuous lean');for(const v of [f.lift,f.pull,f.relax,f.dip,f.grip])assert(v>=0&&v<=1);previous=f;}assert(previous.done);assert(Math.abs(previous.lean)<1e-10);}
 assert(picnicFrame(6100).done);
 assert(picnicFrame(3500).eat);
 assert.equal(picnicFrame(0).reach,0);
 const nodes=[];global.document={createElementNS:(_,tag)=>{const n={tag,attrs:{},dataset:{},children:[],setAttribute(k,v){this.attrs[k]=String(v);},appendChild(c){this.children.push(c);return c;}};nodes.push(n);return n;}};
 const {drawSaltLakeBubbles,GIANT,SMALL,BLANKET,PICNIC}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/salt-lake-art.js')));
 for(const family of [GIANT,SMALL,BLANKET,PICNIC])assert(drawSaltLakeBubbles(document.createElementNS('','g'),{family}));
 const arity={m:2,l:2,h:1,v:1,c:6,s:4,q:4,t:2,a:7,z:0};
 for(const n of nodes.filter(n=>n.tag==='path'))for(const [,c,a]of n.attrs.d.matchAll(/([MmLlHhVvCcSsQqTtAaZz])([^MmLlHhVvCcSsQqTtAaZz]*)/g)){const count=(a.match(/[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?/g)||[]).length,u=arity[c.toLowerCase()];assert(u?count>=u&&count%u===0:count===0,`Malformed ${c}: ${n.attrs.d}`);}
 console.log('Salt Lake: planted tail, body bending, continuous movement, completion and SVG coordinates pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});
