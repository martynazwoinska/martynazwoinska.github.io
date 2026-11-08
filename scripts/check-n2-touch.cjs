const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync(require('node:path').join(__dirname,'../game-of-worms/game.js'),'utf8');
const handlers=source.slice(source.indexOf('function finishAccessoryDrag('),source.indexOf('function turnTelescopeFocus('));

// Replay the actual shared pointer handlers, with other scenes inert. This
// catches tap/drag routing regressions without duplicating their decisions.
function replay({distance,family='ngm-agar-plate',active=false,cancel=false,pinch=false}){
 const calls=[],position={x:0,y:0,scale:1},piece={dataset:{accessoryFamily:family},classList:{remove(){}}};
 const scene={left:0,top:0,right:360,bottom:260,width:360,height:260},bounds={left:200,top:150,right:250,bottom:180,width:50,height:30};
 const idle=new Proxy({active:false},{get:(o,k)=>k in o?o[k]:()=>false});
 const context={Math,Map,console,activeAccessoryDrag:{id:'plates',wormPart:'primary',piece,moved:false,pointers:new Map([[1,{x:225,y:165}]]),primaryPointerId:1,startClientPoint:{x:225,y:165},startPosition:{...position},startBounds:bounds,pinch:null},
  els:{habitat:{getBoundingClientRect:()=>scene,hasPointerCapture:()=>false}},document:{documentElement:{classList:{remove(){}}}},
  accessoryPosition:()=>({...position}),accessoryPieceBounds:()=>bounds,screenDeltaToAccessorySpace:(p,x,y)=>({x,y}),accessoryBottomMargin:12,
  moveAccessory:(id,part,p)=>{Object.assign(position,p);calls.push('move');return p;},announceAccessory(){},accessoryName(){return 'plate';},t(){},queueAccessoryConstraints(){},
  n2Feeding:{drag(){calls.push('held-drag');},release(p,reposition,cancelled){calls.push(cancelled?'cancel-release':'release');return active;},start(){calls.push('feed');}}
 };
 for(const name of ['finalScenes','orsayPlay','saltLakePlay','mahahualPlay','praslinPlay','ju1375Play','taipeiPlay','guadeloupePlay','mauritiusPlay','araucaniaPlay','claremontPlay','edinburghPipes','n2CryoFlight','baliGongs','baliCacao','ahmedabadFans','canberraCafe','ishigakiPlay','ahmedabadHands','trivandrumWatering','panamaPlay','doisRiosPlay','nambuccaPlay','hcmcPlay','oahuBike','reunionPlay','kauaiBath','lombokPlay','canopyPlay','pohnpeiPlay','saoTomePlay','umbrellaPivot'])context[name]=idle;
 context.turnTelescopeFocus=()=>false;
 if(pinch){context.activeAccessoryDrag.pointers.set(2,{x:250,y:165});context.activeAccessoryDrag.pinch={startDistance:25,startScale:1};}
 vm.createContext(context);vm.runInContext(handlers,context);
 context.moveActiveAccessoryPointer({pointerId:pinch?2:1,clientX:(pinch?250:225)+distance,clientY:165,preventDefault(){}});
 context.finishAccessoryDrag({pointerId:pinch?2:1,type:cancel?'pointercancel':'pointerup'});
 assert.equal(context.activeAccessoryDrag,null,'Every release clears the drag state');
 return{calls,position};
}
for(const distance of[0,1,3,6]){
 const idle=replay({distance});assert.equal(idle.position.x,0);assert(idle.calls.includes('feed'),'Small finger wobble remains a feeding tap');assert(!idle.calls.includes('held-drag'));
 const paused=replay({distance,active:true});assert.equal(paused.position.x,0);assert(!paused.calls.includes('feed'),'A paused meal resumes without starting over');
}
for(const distance of[6.1,20,60])for(const active of[false,true]){
 const drag=replay({distance,active});assert(Math.abs(drag.position.x-distance)<1e-9);assert(drag.calls.includes('held-drag'));assert(!drag.calls.includes('feed'),'A genuine drag must not start feeding');
}
const interrupted=replay({distance:3,active:true,cancel:true});assert(interrupted.calls.includes('cancel-release'));assert(!interrupted.calls.includes('feed'));
const pinchWobble=replay({distance:3,pinch:true,active:true});assert.equal(pinchWobble.position.scale,1);assert(!pinchWobble.calls.includes('held-drag'));
const resized=replay({distance:10,pinch:true,active:true});assert.equal(resized.position.scale,1.4);assert(resized.calls.includes('held-drag'));assert(!resized.calls.includes('feed'));
assert.equal(replay({distance:3,family:'unrelated-prop'}).position.x,3,'Other scenes retain their existing movement threshold');
console.log('N2 touch: idle and active wobble taps, genuine drags, pinch resizing, cancellation, and unrelated-prop routing pass.');
