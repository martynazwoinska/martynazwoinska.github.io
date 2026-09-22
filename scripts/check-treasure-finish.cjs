const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
 const load=file=>import(pathToFileURL(path.resolve(__dirname,'../game-of-worms',file)).href);
 const {celebrateHeart,assemblyPolygons}=await load('treasure-board-art.js');
 const {newPuzzle}=await load('treasure-model.js');
 const {pieces,rotate}=await load('treasure-pieces.js');
 class Element{
  constructor(tag){this.tag=tag;this.attrs={};this.style={};this.children=[];}
  setAttribute(k,v){this.attrs[k]=v;}
  append(child){this.children.push(child);}
  querySelector(selector="[data-heart-finish]"){const key=selector.slice(1,-1);return this.children.find(n=>key in n.attrs)||this.children.map(n=>n.querySelector(selector)).find(Boolean);}
  animate(frames,options){animations.push({frames,options});}
 }
 let animations=[],reduced=false;
 global.document={createElementNS:(_,tag)=>new Element(tag)};
 global.matchMedia=()=>({matches:reduced});
 for(const angle of [0,90,180,270]){
  const puzzle=newPuzzle('medium');
  puzzle.poses.forEach((p,i)=>{const q=rotate(pieces[i].cx-300,pieces[i].cy-240,angle);Object.assign(p,{x:300+q.x,y:325+q.y,a:angle,group:0});});
  const polygons=assemblyPolygons(puzzle);
  polygons.forEach((poly,i)=>poly.forEach((point,j)=>{const q=rotate(pieces[i].points[j][0]-300,pieces[i].points[j][1]-240,angle);assert.ok(Math.hypot(point[0]-q.x-300,point[1]-q.y-325)<1e-8,'shine follows the assembled heart at every rotation');}));
  const board=new Element('svg'),assembly=new Element('g');assembly.attrs['data-heart-assembly']='';board.append(assembly);animations=[];assert.equal(celebrateHeart(board,puzzle),true);assert.equal(board.children.length,2,'gem assembly remains intact beside effect definitions');assert.ok(assembly.style.transformOrigin,'lift is centred on the assembled heart');
  assert.equal(animations.length,15);assert.ok(animations.every(a=>!a.options.iterations&&a.options.duration+(a.options.delay||0)<=3000),'celebration finishes, never loops');
  assert.equal(celebrateHeart(board,puzzle),false);assert.equal(animations.length,15,'completion does not stack effects');
  reduced=true;animations=[];const quiet=new Element('svg');celebrateHeart(quiet,puzzle);assert.equal(animations.length,0);assert.ok(quiet.querySelector(),'reduced motion retains the static finish');reduced=false;
  animations=[];celebrateHeart(new Element('svg'),puzzle,false);assert.equal(animations.length,0,'reopening a solved puzzle does not replay the celebration');
 }
 const {createHeartFinishSound}=await load('treasure-finish-sound.js');
 const realTimeout=global.setTimeout,realInterval=global.setInterval;let expiry,watch;
 global.setTimeout=(fn,ms)=>{assert.ok([1000,3200].includes(ms));expiry=fn;return 1;};global.clearTimeout=()=>{};
 global.setInterval=fn=>{watch=fn;return 2;};global.clearInterval=()=>{};
 let voices=[],contexts=[];
 class Param{setValueAtTime(){}linearRampToValueAtTime(){}exponentialRampToValueAtTime(){}}
 class Audio{constructor(){this.currentTime=10;this.state='running';contexts.push(this);}resume(){return Promise.resolve();}close(){this.closed=true;return Promise.resolve();}createGain(){return{gain:new Param(),connect(){},disconnect(){}};}createOscillator(){const v={frequency:new Param(),connect(){},disconnect(){},start(t){this.startAt=t;},stop(t){this.stopAt=t;}};voices.push(v);return v;}}
 global.AudioContext=Audio;global.document.hidden=false;let active=true;const sound=createHeartFinishSound(()=>active);
 sound.play();await Promise.resolve();assert.equal(voices.length,10);assert.ok(voices.every(v=>v.stopAt>v.startAt&&v.stopAt<=13.1),'all voices have a scheduled finite release');
 assert.ok(voices.some(v=>Math.abs(v.startAt-10.96)<.001)&&voices.some(v=>Math.abs(v.startAt-11.56)<.001),'low notes coincide with heart pulses');
 expiry();assert.ok(contexts.at(-1).closed,'context closes after the phrase');
 sound.play();sound.stop();await Promise.resolve();assert.equal(voices.length,10,'closing before resume prevents late audio');
 sound.play();await Promise.resolve();active=false;watch();assert.ok(contexts.at(-1).closed,'closing or replacing the board cancels sound');
 const count=contexts.length;global.document.hidden=true;sound.play();assert.equal(contexts.length,count,'hidden page stays quiet');
 global.document.hidden=false;active=true;voices=[];sound.play('heartbeat');await Promise.resolve();assert.equal(voices.length,2);assert.ok(voices.every(v=>v.stopAt<11),'heartbeat ends in less than a second');sound.stop();
 delete global.AudioContext;global.document.hidden=false;active=true;assert.doesNotThrow(()=>sound.play(),'audio unavailable never breaks completion');
 global.setTimeout=realTimeout;global.setInterval=realInterval;
 console.log('PASS: shine tracks rotated/free-position hearts, finite celebration, no duplicate effects, reduced-motion finish and no replay on restore, timed sound, cancellation and unsupported audio.');
})().catch(error=>{console.error(error);process.exitCode=1;});
