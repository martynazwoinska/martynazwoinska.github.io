const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
class Matrix{
 constructor(values=[1,0,0,1,0,0]){[this.a,this.b,this.c,this.d,this.e,this.f]=values;}
 multiply(m){return new Matrix([this.a*m.a+this.c*m.b,this.b*m.a+this.d*m.b,this.a*m.c+this.c*m.d,this.b*m.c+this.d*m.d,this.a*m.e+this.c*m.f+this.e,this.b*m.e+this.d*m.f+this.f]);}
 inverse(){const z=this.a*this.d-this.b*this.c;return new Matrix([this.d/z,-this.b/z,-this.c/z,this.a/z,(this.c*this.f-this.d*this.e)/z,(this.b*this.e-this.a*this.f)/z]);}
 translate(x,y){return this.multiply(new Matrix([1,0,0,1,x,y]));}
 scale(s){return this.multiply(new Matrix([s,0,0,s,0,0]));}
}
class Point{constructor(x,y){this.x=x;this.y=y;}matrixTransform(m){return new Point(m.a*this.x+m.c*this.y+m.e,m.b*this.x+m.d*this.y+m.f);}}
global.DOMMatrix=Matrix;global.DOMPoint=Point;
(async()=>{
 const {defaultTowerPosition,constrainTower,createDivingTower}=await import('../game-of-worms/n2-diving-tower.js');
 const {feedingPlatePlacement,feedingRoute,feedingEntryTarget}=await import('../game-of-worms/n2-feeding.js');
 const {createDiveGeometry}=await import('../game-of-worms/n2-dive-motion.js');
 for(const width of[360,390,430,519,520,768,1024,1440])assert.deepEqual(defaultTowerPosition(width),{x:width<520?40:64,y:-16});
 const source=[[78,228],[86.503,237.034],[96.049,244.951],[106.704,251.287],[118.382,255.416],[130.698,256.649],[142.888,254.536],[154.045,249.184],[163.507,241.195],[170.985,231.317],[176.456,220.193],[180.014,208.315],[182.114,196.085],[184.966,184.009],[188.941,172.256],[194.054,160.952],[200.331,150.252],[207.8,140.348],[216.474,131.483],[226.323,123.949],[237.235,118.064],[248.984,114.11],[261.24,112.248],[273.637,112.459],[285.964,113.88],[298.362,113.738],[310.531,111.401],[321.859,106.409],[331.27,98.402],[337.132,87.56],[337.924,75.274],[333.712,63.676],[326,54]].map(([x,y])=>({x,y}));
 // Actual browser measurements, including the forager pose and scene scaling.
 const fixtures=[
  {width:360,scene:{left:15,top:212,width:315,height:225.75},svg:{left:33.90625,top:219.28125,width:277.1875},plate:{left:233.52788,top:386.07248,right:284.17828,bottom:409.54541}},
  {width:1440,scene:{left:151.5,top:253.796875,width:724.3125,height:519.078125},svg:{left:253.65625,top:315.234375,width:520},plate:{left:628.14447,top:628.13452,right:723.16461,bottom:672.16974}}
 ];
 const point=(m,x,y)=>new Point(x,y).matrixTransform(m),bounds=points=>({left:Math.min(...points.map(p=>p.x)),right:Math.max(...points.map(p=>p.x)),top:Math.min(...points.map(p=>p.y)),bottom:Math.max(...points.map(p=>p.y))});
 const measured=[];let cases=0;
 for(const fixture of fixtures){
  const s=fixture.svg.width/420,a=.714633,b=.0877459,c=-.0877459,d=.714633,map=new Matrix([s*a,s*b,s*c,s*d,fixture.svg.left+s*(26+210-a*210-c*170),fixture.svg.top+s*(18+170-b*210-d*170)]),inverse=map.inverse();
  const scene={left:fixture.scene.left+10,right:fixture.scene.left+fixture.scene.width-10,top:fixture.scene.top+10,bottom:fixture.scene.top+fixture.scene.height-10};
  const towerBounds=bounds([[31,196],[228,196],[31,341],[228,341]].map(([x,y])=>point(map,x,y))),origin=point(map,0,0),desired=defaultTowerPosition(fixture.width),client=point(map,desired.x,desired.y),shift=constrainTower({x:client.x-origin.x,y:client.y-origin.y},towerBounds,scene),position=point(inverse,origin.x+shift.x,origin.y+shift.y);
  assert(towerBounds.left+shift.x>=scene.left-1e-7&&towerBounds.right+shift.x<=scene.right+1e-7&&towerBounds.top+shift.y>=scene.top-1e-7&&towerBounds.bottom+shift.y<=scene.bottom+1e-7,'The complete tower and grab surface fit inside the scene');
  let minimum=Infinity;
  for(const userScale of[.7,1,1.6]){
   const centre=point(map,366,260),rect={};for(const k of['left','right'])rect[k]=centre.x+(fixture.plate[k]-centre.x)*userScale;for(const k of['top','bottom'])rect[k]=centre.y+(fixture.plate[k]-centre.y)*userScale;rect.width=rect.right-rect.left;rect.height=rect.bottom-rect.top;
   const wanted=point(map,366+(fixture.width<520?18:68),252),fit=feedingPlatePlacement(rect,centre,scene,{scale:fixture.width<520?2.05:1.62,x:wanted.x-centre.x,y:wanted.y-centre.y}),placed=point(inverse,centre.x+fit.x,centre.y+fit.y),angle=-6*Math.PI/180,scale=.82*userScale*fit.scale,art=new Matrix([scale*Math.cos(angle),scale*Math.sin(angle),-scale*Math.sin(angle),scale*Math.cos(angle),placed.x,placed.y]);
   for(const colony of[{x:-35,y:-3},{x:-17,y:7},{x:0,y:-8},{x:20,y:6},{x:36,y:-3}]){
    const route=feedingRoute(0,1,false,colony),entry=feedingEntryTarget(point(art,route.x,route.y),art),dive=createDiveGeometry(source);
    for(let i=0;i<=200;i++)for(const pose of[dive.prepare(i/200,position),dive.flight(i/200*.72,entry,position)]){
     const margin=27*pose.scale*Math.hypot(map.b,map.d),top=Math.min(...pose.points.map(p=>point(map,p.x,p.y).y))-margin;
     minimum=Math.min(minimum,top);assert(top>=scene.top,'The complete boarding and above-surface dive retain top clearance, including body thickness');
    }
    cases++;
   }
  }
  measured.push({width:fixture.width,x:+position.x.toFixed(2),y:+position.y.toFixed(2),topClearance:+(minimum-fixture.scene.top).toFixed(2)});
 }

 // Exercise actual tower pointer/keyboard controls with minimal SVG objects.
 class Element{
  constructor(tag){this.tag=tag;this.children=[];this.attrs={};this.listeners={};this.isConnected=true;}
  setAttribute(k,v){this.attrs[k]=String(v);}appendChild(n){n.parentNode=this;this.children.push(n);return n;}
  insertBefore(n,before){if(n.parentNode){const i=n.parentNode.children.indexOf(n);if(i>=0)n.parentNode.children.splice(i,1);}n.parentNode=this;const i=this.children.indexOf(before);this.children.splice(i<0?this.children.length:i,0,n);}
  querySelector(selector){return selector==='#primary-worm'?this.children.find(n=>n.attrs.id==='primary-worm'):null;}
  getScreenCTM(){return new Matrix();}getBBox(){return{x:34,y:199,width:191,height:139};}
  addEventListener(type,fn){this.listeners[type]=fn;}remove(){this.isConnected=false;}focus(){global.document.activeElement=this;}
  setPointerCapture(id){this.capture=id;}hasPointerCapture(id){return this.capture===id;}releasePointerCapture(){this.capture=null;}
 }
 const root=new Element('g'),primary=new Element('g');primary.attrs.id='primary-worm';root.appendChild(primary);
 global.document={createElementNS:(_,tag)=>new Element(tag)};global.window={addEventListener(){},removeEventListener(){}};global.innerWidth=1440;
 const habitat={getBoundingClientRect:()=>({left:0,top:0,right:600,bottom:450,width:600,height:450})},position={...defaultTowerPosition()},moves=[],tower=createDivingTower(root,habitat,position,reset=>moves.push(reset));
 const key=key=>tower.element.listeners.keydown({key,preventDefault(){},stopPropagation(){}});
 key('ArrowRight');assert.equal(position.x,69);key('Home');assert.deepEqual(position,{x:64,y:-16});assert.equal(moves.at(-1),true,'Home reports restoration of the automatic default');
 global.innerWidth=360;key('Home');assert.deepEqual(position,{x:40,y:-16},'Home uses the current narrow-screen default');
 tower.element.listeners.pointerdown({button:0,pointerId:1,clientX:100,clientY:100,preventDefault(){},stopPropagation(){}});
 tower.element.listeners.pointermove({pointerId:1,clientX:103,clientY:100});assert.equal(position.x,40,'Finger wobble cannot mark a tower as manually placed');
 tower.element.listeners.pointermove({pointerId:1,clientX:130,clientY:100});assert.equal(position.x,70);
 tower.element.listeners.pointermove({pointerId:1,clientX:10000,clientY:10000});assert.deepEqual(position,{x:362,y:99},'Dragging constrains the hit rectangle, not only the visible artwork');tower.remove();

 // The feeding owner must preserve visitor placement through reconstruction,
 // but refresh an automatic placement after cancellation and a width change.
 const plate={closest:()=>null,querySelectorAll:()=>[]},fakeRoot={},created=[];let nowWidth=1440;
 const context={console,Math,Map,Set,Number,Object,matchMedia:()=>({matches:false,addEventListener(){}}),window:{addEventListener(){}},document:{addEventListener(){}},recordedSound:()=>({stop(){}}),cancelAnimationFrame(){},defaultTowerPosition:()=>defaultTowerPosition(nowWidth),createDivingTower:(root,habitat,position,onMove)=>{const result={position,onMove,element:{isConnected:true,removeAttribute(){}},remove(){this.element.isConnected=false}};created.push(result);return result;},DIVE_PREPARE_MS:2233,DIVE_FLIGHT_MS:1820};
 let code=fs.readFileSync(path.join(__dirname,'../game-of-worms/n2-feeding.js'),'utf8').replace(/^import .*\r?\n/gm,'').replace(/\bexport /g,'');
 code=code.replace('return {handles,start,cancel,clear,grab,drag,release,','return {reveal(){towerRevealed=true;syncTower(true);},hideTower,handles,start,cancel,clear,grab,drag,release,');
 vm.createContext(context);vm.runInContext(code,context);const feeding=context.createN2Feeding({querySelector:s=>s==='#worm-species'?fakeRoot:plate,querySelectorAll:()=>[plate]});
 const coordinates=p=>({x:p.x,y:p.y});feeding.reveal();assert.deepEqual(coordinates(created.at(-1).position),{x:64,y:-16});feeding.cancel();nowWidth=360;feeding.reveal();assert.deepEqual(coordinates(created.at(-1).position),{x:40,y:-16},'Cancel, resize, and the next meal refresh an untouched tower');
 const manual=created.at(-1);manual.onMove();Object.assign(manual.position,{x:77,y:9});feeding.hideTower();nowWidth=1440;feeding.reveal();assert.deepEqual(coordinates(created.at(-1).position),{x:77,y:9},'Visitor movement survives hide/reveal and a wider viewport');
 created.at(-1).onMove(true);feeding.hideTower();feeding.reveal();assert.deepEqual(coordinates(created.at(-1).position),{x:64,y:-16},'Home restores automatic placement for subsequent meals');
 console.log('N2 tower placement:',JSON.stringify(measured),`${cases} full-trajectory cases; footprint, pointer, Home, cancel/resize and manual-position preservation pass.`);
})().catch(e=>{console.error(e);process.exitCode=1});
