const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
 const load=file=>import(pathToFileURL(path.resolve(__dirname,'../game-of-worms',file)).href);
 const {celebrateHeart,assemblyPolygons}=await load('treasure-board-art.js');
 const {newPuzzle}=await load('treasure-model.js');
 const {pieces,rotate}=await load('treasure-pieces.js');
 class Element{
  constructor(tag){this.tag=tag;this.attrs={};this.children=[];}
  setAttribute(k,v){this.attrs[k]=v;}
  append(child){this.children.push(child);}
  querySelector(){return this.children.find(n=>'data-heart-finish' in n.attrs);}
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
  const board=new Element('svg');animations=[];celebrateHeart(board,puzzle);
  assert.equal(animations.length,13);assert.ok(animations.every(a=>!a.options.iterations&&a.options.duration+(a.options.delay||0)<2600),'celebration finishes, never loops');
  celebrateHeart(board,puzzle);assert.equal(animations.length,13,'completion does not stack effects');
  reduced=true;animations=[];const quiet=new Element('svg');celebrateHeart(quiet,puzzle);assert.equal(animations.length,0);assert.ok(quiet.querySelector(),'reduced motion retains the static finish');reduced=false;
  animations=[];celebrateHeart(new Element('svg'),puzzle,false);assert.equal(animations.length,0,'reopening a solved puzzle does not replay the celebration');
 }
 console.log('PASS: shine tracks rotated/free-position hearts, finite celebration, no duplicate effects, reduced-motion finish and no replay on restore.');
})().catch(error=>{console.error(error);process.exitCode=1;});
