import {svg,drawGem,revealTreasure,pieces} from './treasure-pieces.js?v=20260920-discovery-2';
import {treasures,SAVE_KEY,parseSave,emptySave,mergeHunts,restartHunt} from './treasure-model.js?v=20260921-restart-2';
import {mountPuzzle} from './treasure-puzzle.js?v=20260921-heartbeat-1';
import {drawCanopyCache} from './treasure-discoveries.js?v=20260920-discovery-2';

export function createTreasureHunt(habitat){
 let state=emptySave(),storageOK=true;try{state=parseSave(localStorage.getItem(SAVE_KEY));}catch{storageOK=false;}
 const toggle=document.getElementById('treasure-toggle'),count=document.getElementById('treasure-count'),live=document.getElementById('treasure-announcement');
 const dialog=document.createElement('dialog');dialog.className='treasure-dialog';dialog.id='treasure-dialog';dialog.setAttribute('aria-labelledby','treasure-title');document.body.append(dialog);
 const layer=document.createElement('div');layer.className='treasure-layer';habitat.append(layer);
 const noticeSlot=habitat.parentElement.querySelector('.dress-bar > div');noticeSlot.classList.add('gem-notice-slot');
 const notice=document.createElement('div');notice.className='treasure-notice';notice.hidden=true;noticeSlot.append(notice);
 let canopyCache=null,sceneSpecies='',scenePlace='',confirmingRestart=false;
 let current=null,anchor=null,clue=null,button=null,returnFocus=null,puzzleUI=null,timer=0,raf=0,last=0;
 const announce=text=>{live.textContent=text;};
 function save(){
  try{const other=parseSave(localStorage.getItem(SAVE_KEY)),restarted=other.restartedAt>state.restartedAt;Object.assign(state,mergeHunts(state,other));localStorage.setItem(SAVE_KEY,JSON.stringify(state));storageOK=true;if(restarted){puzzleUI=null;queueMicrotask(refreshHunt);}}catch{storageOK=false;}
  const note=dialog.querySelector('.treasure-save-note');if(note){note.hidden=storageOK;note.textContent=storageOK?'':'This browser cannot save progress. Keep this page open to continue your hunt.';}
 }
 function update(){count.textContent=`${state.found.length}/8`;toggle.setAttribute('aria-label',`Hidden gems: ${state.found.length} of 8 found. Open treasure chest.`);if(current)habitat.dataset.treasureState=state.found.includes(current.id)?'collected':state.revealed[current.id]?'revealed':'hidden';}
 function hideNotice(){notice.hidden=true;noticeSlot.classList.remove('has-gem-notice');}
 function say(text,duration=6500){announce(text);notice.textContent=text;notice.hidden=false;noticeSlot.classList.add('has-gem-notice');clearTimeout(timer);timer=setTimeout(hideNotice,duration);}
 function position(node,x,y){const m=node?.getScreenCTM?.(),b=habitat.getBoundingClientRect();if(!m||!b.width||!b.height)return null;const p=new DOMPoint(x,y).matrixTransform(m);return{x:Math.max(5,Math.min(95,(p.x-b.left)/b.width*100)),y:Math.max(9,Math.min(84,(p.y-b.top)/b.height*100))};}
 function collect(id){
  if(state.found.includes(id)||!state.revealed[id])return;
  state.found.push(id);save();update();button?.remove();button=null;clue?.remove();clue=null;cancelAnimationFrame(raf);
  say(state.found.length===8?'Hooray! You found all 8 gems! Now open your treasure chest and solve the puzzle.':`Gem found! ${state.found.length} of 8 collected.`,state.found.length===8?12000:6500);
  toggle.focus({preventScroll:true});
 }
 function mountCanopyCache(opened=false){
  const cache=document.createElement('button');canopyCache=cache;cache.type='button';cache.className='canopy-gem-cache';cache.setAttribute('aria-label','Look behind the canopy leaves');
  const {art,cover,gem}=drawCanopyCache(cache);layer.append(cache);
  const open=()=>{if(current?.id!=='canopy'||!cache.isConnected)return;cover.style.transformOrigin='95px 50px';cover.style.transform='rotate(-68deg)';gem.setAttribute('opacity',0);cache.disabled=true;cache.setAttribute('aria-hidden','true');if(!opened)revealTreasure(habitat,'canopy',art,53,68);anchor={node:art,x:53,y:68};placeButton();if(!opened)button?.focus({preventScroll:true});};
  if(opened){open();return;}
  cache.addEventListener('pointerdown',e=>e.stopPropagation());
  cache.addEventListener('click',e=>{
   e.stopPropagation();if(cache.disabled)return;cache.disabled=true;
   if(matchMedia('(prefers-reduced-motion: reduce)').matches)open();
   else{cover.style.transformOrigin='95px 50px';cover.animate([{transform:'rotate(0deg)'},{transform:'rotate(-68deg)'}],{duration:550,fill:'forwards',easing:'ease-in-out'}).finished.then(open).catch(()=>{});}
  });
 }
 habitat.addEventListener('treasure-canopy-photo',()=>{
  if(current?.id!=='canopy'||habitat.dataset.treasureState!=='hidden'||canopyCache)return;
  mountCanopyCache();say('A glint behind the leaves. Take a closer look.');
 });
 function showGem(){
  button?.remove();button=null;if(!current||state.found.includes(current.id)||!state.revealed[current.id])return;
  const id=current.id,index=treasures.indexOf(current);button=document.createElement('button');button.type='button';button.className='scene-gem';button.setAttribute('aria-label','Collect hidden gem');button.dataset.treasureGem=id;
  const art=svg(button,'svg',{viewBox:'-100 -100 200 200','aria-hidden':'true'});drawGem(art,index,85/Math.max(...pieces[index].local.flat().map(Math.abs)));button.addEventListener('pointerdown',e=>e.stopPropagation());button.addEventListener('click',e=>{e.stopPropagation();collect(id);});layer.append(button);placeButton();
 }
 function placeButton(){if(!button||!current)return;let p=state.revealed[current.id];if(anchor?.node?.isConnected&&!anchor.node.closest('[hidden]')){p=position(anchor.node,anchor.x,anchor.y)||p;state.revealed[current.id]=p;}if(p){button.style.left=`${p.x}%`;button.style.top=`${p.y}%`;}}
 habitat.addEventListener('treasure-reveal',e=>{
  const{id,node,x,y,fall,direction=1}=e.detail;if(current?.id!==id||state.found.includes(id)||state.revealed[id])return;
  const start=position(node,x,y)||{x:70,y:65};
  state.revealed[id]=fall?{x:Math.max(9,Math.min(91,start.x+direction*12)),y:78}:id==='bubbles'?{x:start.x,y:76}:start;
  // Dropped finds stay on the ground. Only the gem still inside its tube follows it.
  anchor=id==='india'?{node,x,y}:null;save();update();showGem();
  if(id==='bubbles'&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const dy=(start.y-76)*habitat.getBoundingClientRect().height/100;button?.animate([{translate:`0 ${dy}px`},{translate:'0 0'}],{duration:650,easing:'cubic-bezier(.35,0,.8,.65)'});}
  if(fall&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
   const b=habitat.getBoundingClientRect(),end=state.revealed[id],dx=(start.x-end.x)*b.width/100,dy=(start.y-end.y)*b.height/100;
   button?.animate([{translate:`${dx}px ${dy}px`,rotate:'-28deg',scale:'.55',offset:0},{translate:`${dx*.65}px ${dy*.75}px`,rotate:'8deg',scale:'.7',offset:.35},{translate:'0 0',rotate:'32deg',scale:'1',offset:.76},{translate:'0 -9px',rotate:'12deg',offset:.87},{translate:'0 0',rotate:'0deg',offset:1}],{duration:1050,easing:'ease-in',fill:'none'});
  }
  say('Something sparkled! Tap the gem to collect it.');
 });
 function mount(species,place){
  sceneSpecies=species;scenePlace=place;
  save();clue?.remove();clue=null;anchor=null;button?.remove();button=null;canopyCache?.remove();canopyCache=null;delete habitat.dataset.treasureCanopyReached;hideNotice();clearTimeout(timer);cancelAnimationFrame(raf);
  current=treasures.find(t=>t.species===species&&place.includes(t.place))||null;habitat.dataset.treasureId=current?.id||'';update();
  if(!current||state.found.includes(current.id))return;showGem();
  if(current.id==='canopy'&&state.revealed.canopy)mountCanopyCache(true);
  if(current.id==='india'&&habitat.dataset.treasureState==='hidden'){
   const contents=habitat.querySelector('[clip-path="url(#tri-tube-contents-female)"]');
   if(contents){clue=svg(contents,'g',{'data-treasure-clue':'india',transform:'translate(92 4)','pointer-events':'none'});drawGem(clue,0,.1);}
  }
  function tick(now){
   raf=requestAnimationFrame(tick);if(document.hidden||now-last<100)return;last=now;placeButton();
   if(current?.id!=='india'||habitat.dataset.treasureState!=='hidden'||!clue?.isConnected||clue.closest('[hidden]'))return;
   const m=clue.getScreenCTM();if(!m)return;const p=new DOMPoint(0,0).matrixTransform(m);
   for(const lens of habitat.querySelectorAll('[data-live-loupe] svg')){if(lens.closest('[hidden]'))continue;const lm=lens.getScreenCTM();if(!lm)continue;const q=p.matrixTransform(lm.inverse()),box=lens.viewBox.baseVal,r=Math.min(box.width,box.height)*.4;if(Math.hypot(q.x-box.x-box.width/2,q.y-box.y-box.height/2)<r){revealTreasure(habitat,'india',clue,0,0);break;}}
  }raf=requestAnimationFrame(tick);
 }
 function shell(title){confirmingRestart=false;puzzleUI?.save();puzzleUI=null;dialog.replaceChildren();const close=document.createElement('button');close.type='button';close.className='treasure-close';close.textContent='×';close.setAttribute('aria-label','Close');close.addEventListener('click',()=>dialog.close());const h=document.createElement('h2');h.id='treasure-title';h.textContent=title;const header=document.createElement('header');header.className='treasure-header';header.append(h,close);const content=document.createElement('div');content.className='treasure-content';dialog.append(header,content);return content;}
 function open(){if(!dialog.open){returnFocus=document.activeElement;dialog.showModal();}dialog.querySelector('.treasure-close').focus();}
 function chest(){
  confirmingRestart=false;
  const content=shell('Your treasure chest');const intro=document.createElement('p');intro.textContent=state.found.length===8?'Hooray! You found all 8 gems! Choose a difficulty and solve the puzzle.':'Find eight gems hidden in the worm scenes. Play with the accessories to uncover them.';content.append(intro);
  const tray=document.createElement('div');tray.className='gem-tray';tray.setAttribute('aria-label',`${state.found.length} of 8 gems collected`);content.append(tray);
  for(let i=0;i<8;i++){const slot=document.createElement('div');slot.className='gem-tray-slot';if(i<state.found.length){const t=treasures.find(t=>t.id===state.found[i]),art=svg(slot,'svg',{viewBox:'-110 -100 220 200','aria-hidden':'true'});const g=drawGem(art,treasures.indexOf(t));g.setAttribute('transform',`rotate(${[90,270,180,90,270,180,90,270][treasures.indexOf(t)]}) scale(${88/Math.max(...pieces[treasures.indexOf(t)].local.flat().map(Math.abs))})`);slot.setAttribute('role','img');slot.setAttribute('aria-label',`Gem ${treasures.indexOf(t)+1}`);}else{slot.classList.add('empty');slot.textContent='?';slot.setAttribute('aria-label','Undiscovered gem');}tray.append(slot);}
  if(state.found.length===8){
   puzzleUI=mountPuzzle(content,state,save,announce);
  }
  const restart=document.createElement('button');restart.type='button';restart.className='treasure-restart';restart.textContent='Restart gem hunt';restart.setAttribute('aria-expanded','false');restart.disabled=!state.found.length&&!Object.keys(state.revealed).length;restart.addEventListener('click',()=>{if(confirmingRestart)cancelRestart();else confirmRestart();});content.append(restart);
  const note=document.createElement('p');note.className='treasure-save-note';content.append(note);save();open();
 }
 function refreshHunt(){mount(sceneSpecies,scenePlace);if(dialog.open)chest();}
 function cancelRestart(){
  confirmingRestart=false;dialog.querySelector('.treasure-restart-confirmation')?.remove();
  const trigger=dialog.querySelector('.treasure-restart');trigger?.setAttribute('aria-expanded','false');trigger?.removeAttribute('aria-controls');trigger?.focus({preventScroll:true});
 }
 function confirmRestart(){
  const trigger=dialog.querySelector('.treasure-restart');confirmingRestart=true;
  const content=document.createElement('div');content.className='treasure-restart-confirmation';content.id='treasure-restart-confirmation';content.setAttribute('role','group');content.setAttribute('aria-labelledby','treasure-restart-question');trigger.after(content);trigger.setAttribute('aria-expanded','true');trigger.setAttribute('aria-controls',content.id);
  const explanation=document.createElement('p');explanation.id='treasure-restart-question';explanation.textContent='Hide all eight gems again and clear your puzzle progress?';content.append(explanation);
  const actions=document.createElement('div');actions.className='treasure-restart-actions';
  const keep=document.createElement('button');keep.type='button';keep.textContent='Keep my collection';keep.addEventListener('click',cancelRestart);
  const restart=document.createElement('button');restart.type='button';restart.textContent='Restart gem hunt';
  restart.addEventListener('click',()=>{
   let other=state;try{other=parseSave(localStorage.getItem(SAVE_KEY));}catch{}
   puzzleUI=null;state=restartHunt(state,other);save();refreshHunt();
   announce('Gem hunt restarted. Find all eight gems again.');
  });actions.append(keep,restart);content.append(actions);keep.focus();
 }
 function telescope(piece){
  if(current?.id!=='scotland'||state.found.includes('scotland'))return;
  const content=shell('Through the telescope');const p=document.createElement('p');p.textContent='A small sparkle in the distance. Bring it into focus.';content.append(p);
  const view=document.createElement('div');view.className='telescope-view';const spark=document.createElement('div');spark.className='telescope-spark';drawGem(svg(spark,'svg',{viewBox:'-120 -120 240 240','aria-hidden':'true'}),3);view.append(spark);content.append(view);
  const focus=document.createElement('button');focus.type='button';focus.textContent='Turn the focus wheel';content.append(focus);let turns=0;
  focus.addEventListener('click',()=>{if(turns<2){turns++;spark.style.filter=`blur(${turns===1?4:0}px)`;if(turns===2){revealTreasure(habitat,'scotland',piece,0,0);focus.textContent='Collect gem';p.textContent='There it is! A gem!';}}else{collect('scotland');dialog.close();}});open();
 }
 dialog.addEventListener('close',()=>{puzzleUI?.save();if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});else toggle.focus({preventScroll:true});});
 dialog.addEventListener('cancel',e=>{if(confirmingRestart){e.preventDefault();cancelRestart();}});
 toggle.addEventListener('click',chest);
 window.addEventListener('pagehide',save);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)save();});
 window.addEventListener('storage',e=>{if(e.key!==SAVE_KEY)return;const other=parseSave(e.newValue),restarted=other.restartedAt>state.restartedAt;Object.assign(state,mergeHunts(state,other));if(restarted){puzzleUI=null;refreshHunt();}else{update();showGem();if(dialog.open&&!puzzleUI)chest();}});
 update();return{mount,telescope};
}
