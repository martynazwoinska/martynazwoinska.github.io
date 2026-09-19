const assert=require('node:assert/strict');
const fs=require('node:fs');
const {execFileSync}=require('node:child_process');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
class Element{constructor(tag){this.tag=tag;this.attrs={};this.children=[];this.classList={add(){}};}setAttribute(k,v){this.attrs[k]=String(v);}appendChild(n){this.children.push(n);return n;}}
global.document={createElementNS:(_,tag)=>new Element(tag)};
const walk=n=>[n,...n.children.flatMap(walk)];
const paint=n=>walk(n).filter(n=>n.tag!=='g').map(n=>[n.tag,Object.fromEntries(Object.entries(n.attrs).filter(([k])=>!k.startsWith('data-')))]);
(async()=>{
 const root=path.join(__dirname,'..'),game=path.join(root,'game-of-worms');
 const data=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
 // Added identity groups must leave every existing visible construction intact.
 for(const [file,fn,families]of [
  ['santeuil-accessories.js','drawSanteuilRefinement',['santeuil-railway-driver-uniform','santeuil-cylinder-organ-instrument','santeuil-hogweed-locomotive']],
  ['tenerife-accessories.js','drawTenerifeRefinement',['tenerife-atlantic-canary-costume','tenerife-timple-guitar','tenerife-avocado-snack-bowl']],
  ['kauai-recording.js','drawKauaiRecording',['xz1516-forest-bird-headphones','xz1516-ohia-blossom-microphone','xz1516-reel-to-reel-recorder']]]){
  const before=await import(data(execFileSync('git',['show',`66be258:game-of-worms/${file}`],{cwd:root,encoding:'utf8'})));
  const after=await import(data(fs.readFileSync(path.join(game,file),'utf8')));
  for(const family of families)for(const male of [false,true]){const a=new Element('g'),b=new Element('g');before[fn](a,{family},male);after[fn](b,{family},male);assert.deepEqual(paint(a),paint(b),`${family}/${male}: approved artwork`);}
 }
 const {bodyPoint}=await import(pathToFileURL(path.join(game,'scene-performance.js')));
 const {performanceEnvelope,railTravel,strumTimes,whistleTimes}=await import(pathToFileURL(path.join(game,'final-scenes-play.js')));
 for(const bend of [-1,-.5,0,.5,1])for(const look of [-.4,0,.4])assert.deepEqual(bodyPoint(78,228,bend,look),{x:78,y:228},'Tail remains planted');
 assert(Math.abs(bodyPoint(210,180,1,0).x-210)>4,'Middle bends visibly');
 for(const duration of [4000,5700,5800,6500,7000,9000,9600]){assert.equal(performanceEnvelope(0,duration),0);assert.equal(performanceEnvelope(duration,duration),0);}
 let last=railTravel(0);for(let t=0;t<=7000;t+=10){const x=railTravel(t);assert(x>=0&&x<=42);assert(Math.abs(x-last)<.5,'No sudden train jumps');last=x;}assert.equal(last,0,'Returns to saved position');
 assert.notDeepEqual(strumTimes(),strumTimes(true));assert.notDeepEqual(whistleTimes('primary'),whistleTimes('companion'));
 for(const times of [strumTimes(),strumTimes(true),whistleTimes('primary'),whistleTimes('companion')])for(let i=1;i<times.length;i++)assert(times[i]-times[i-1]>=200,'Gestures have time to settle');
 console.log('Final scenes: approved artwork preserved, planted tails, smooth bounded railway travel, exact settling and distinct musical phrases pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});
