const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
 const {snackFrame,snackServings,SNACK_DURATION,SWALLOW_AT,SNACK_SOUNDS,playSnackSounds}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/tenerife-snack.js')));
 const {bodyPoint}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/scene-performance.js')));
 const node=tagName=>({tagName,attrs:{},getAttribute(k){return this.attrs[k]??null;},setAttribute(k,v){this.attrs[k]=v;},removeAttribute(k){delete this.attrs[k];}});
 const rods=Array.from({length:3},()=>node('g')),dots=Array.from({length:3},()=>node('circle'));
 const bowl={dataset:{},querySelector:()=>({children:[...rods,...dots]})},servings=snackServings();
 assert.equal(servings.next(bowl),0);assert.equal(servings.next(bowl),0,'Cancelled reach keeps the same serving');
 for(let i=0;i<3;i++){
  assert.equal(servings.next(bowl),i);servings.consume(bowl,i);servings.consume(bowl,i);
  assert.equal(bowl.dataset.avocadoEaten,String(i+1),'A repeated paint cannot consume twice');
  assert.equal(rods.filter(n=>n.getAttribute('visibility')!=='hidden').length,2-i);
 }
 assert(rods.every(n=>n.getAttribute('visibility')==='hidden'),'All three can be eaten');
 assert.equal(servings.next(bowl),0,'Next click refills an empty bowl');assert(rods.every(n=>n.getAttribute('visibility')===null));
 servings.consume(bowl,0);servings.reset(bowl);assert.equal(servings.next(bowl),0,'Home resets portions');
 servings.consume(bowl,0);servings.clear();assert(rods.concat(dots).every(n=>n.getAttribute('visibility')===null),'Scene cleanup restores all originals');
 assert.equal(snackFrame(500).reach,1);assert.equal(snackFrame(650).lift,0,'Hand arrives before lifting');
 assert.equal(snackFrame(1700).lift,1);assert.equal(snackFrame(1700).bite,0,'No food vanishes before it reaches the mouth');
 assert.equal(snackFrame(SWALLOW_AT).bite,1);assert.equal(snackFrame(2200).back,0,'Hand waits until swallowing');
 let previous=snackFrame(0);
 for(let ms=5;ms<=SNACK_DURATION;ms+=5){const f=snackFrame(ms);
  for(const k of ['reach','lift','bite','back','bend','look','mouth'])assert(Math.abs(f[k]-previous[k])<.05,`${k} remains smooth`);
  assert.deepEqual(bodyPoint(78,228,f.bend,f.look),{x:78,y:228},'Tail stays planted');previous=f;
 }
 const end=snackFrame(SNACK_DURATION);for(const k of ['reach','bend','look','mouth'])assert.equal(end[k],0,'Returns to rest');
 const heard=[],cues=new Set();
 for(let ms=0;ms<SNACK_DURATION;ms+=10)playSnackSounds(ms,cues,(...args)=>heard.push({ms,args}));
 assert.equal(heard.length,2,'One bite and one chew per portion');
 heard.forEach(({ms,args},i)=>{const s=SNACK_SOUNDS[i];assert.equal(ms,s.at);assert.deepEqual(args,['eat',s.offset,s.duration,s.level]);assert(s.offset+s.duration<=.66,'Excerpts stay within the recording');assert(snackFrame(ms).mouth>.05,'Sound accompanies visible mouth movement');});
 assert(SNACK_SOUNDS[1].level<SNACK_SOUNDS[0].level,'Chew is quieter than the bite');
 const late=[];playSnackSounds(3000,new Set(),(...args)=>late.push(args));assert.equal(late.length,0,'Skipped frames do not stack delayed mouth sounds');
 console.log('Tenerife snack: three persistent portions, cancellation/reset, smooth eating, planted tail and two correctly timed eating sounds pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});
