import {svg,pieces,drawGem,pointsText,rotate} from './treasure-pieces.js?v=20260920-discovery-2';
import {newPuzzle,moveGroup,rotateGroup,snap,target} from './treasure-model.js?v=20260920-discovery-2';
import {drawPuzzleSetting,drawPuzzleRecess,celebrateHeart} from './treasure-board-art.js?v=20260921-sockets-1';

export function mountPuzzle(host,state,save,announce){
 const panel=document.createElement('section');panel.className='gem-assembly';host.append(panel);
 panel.innerHTML=`<h3>Choose your puzzle</h3><div class="gem-levels">
 <button type="button" data-level="easy"><strong>Easy</strong></button>
 <button type="button" data-level="medium"><strong>Mystery</strong></button></div>
 <p class="gem-puzzle-help" hidden></p>
 <div class="gem-board-wrap" hidden></div><div class="gem-tools" hidden><button type="button" data-rotate>Turn piece ↻</button><button type="button" data-restart>Start this puzzle again</button></div>
 <p class="gem-result" role="status"></p>`;
 const boardWrap=panel.querySelector('.gem-board-wrap'),help=panel.querySelector('.gem-puzzle-help'),tools=panel.querySelector('.gem-tools'),result=panel.querySelector('.gem-result');
 let board,selected=-1,drag=null,nodes=[];
 const complete=(animate=true)=>{if(!state.puzzle?.solved)return;result.textContent='A heart! Eight discoveries, one treasure.';boardWrap.before(result);board.classList.add('is-solved');panel.classList.add('is-complete');celebrateHeart(board,state.puzzle,animate);if(!state.wins.includes(state.puzzle.mode)){state.wins.push(state.puzzle.mode);announce('Puzzle complete. You made a heart!');}save();};
 function paint(){const puzzle=state.puzzle;if(!puzzle||!board)return;nodes.forEach((n,i)=>{const p=puzzle.poses[i];n.setAttribute('transform',`translate(${p.x} ${p.y}) rotate(${p.a})`);n.classList.toggle('is-selected',selected>=0&&p.group===puzzle.poses[selected].group);n.classList.toggle('is-placed',p.locked);const shade=rotate(p.locked?0:3,p.locked?1:7,-p.a);n.querySelector('.gem-contact-shadow').setAttribute('transform',`translate(${shade.x} ${shade.y})`);n.setAttribute('aria-label',`Gem ${i+1}${p.locked?', placed':selected===i?', selected':''}`);n.setAttribute('aria-pressed',String(selected===i));});panel.querySelector('[data-rotate]').disabled=selected<0||puzzle.mode==='easy'||puzzle.poses[selected].locked;}
 function constrain(id){const puzzle=state.puzzle,g=puzzle.poses[id].group,pts=[];puzzle.poses.forEach((p,i)=>{if(p.group===g)for(const[x,y]of pieces[i].local){const d=rotate(x,y,p.a);pts.push([p.x+d.x,p.y+d.y]);}});const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]),left=Math.min(...xs),right=Math.max(...xs),top=Math.min(...ys),bottom=Math.max(...ys);moveGroup(puzzle,id,left<8?8-left:right>592?592-right:0,top<8?8-top:bottom>642?642-bottom:0);}
 function settle(){if(selected<0)return;const joined=snap(state.puzzle,selected);if(joined)announce('Piece placed.');constrain(selected);paint();save();complete();}
 const point=e=>new DOMPoint(e.clientX,e.clientY).matrixTransform(board.getScreenCTM().inverse());
 function choose(id){if(state.puzzle.solved)return;selected=id;const group=state.puzzle.poses[id].group;nodes.forEach((n,i)=>{if(state.puzzle.poses[i].group===group)board.append(n);});paint();}
 function render(){
  if(!state.puzzle)return;const puzzle=state.puzzle;selected=-1;drag=null;result.textContent='';panel.classList.remove('is-complete');boardWrap.hidden=false;tools.hidden=false;boardWrap.replaceChildren();
  help.hidden=false;
  panel.querySelectorAll('[data-level]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.level===puzzle.mode)));
  help.textContent='Fit the gems into the outline.';
  help.textContent+=' Drag, or select a piece then tap its destination. Keyboard: arrows move, R turns, Enter checks the fit.';
  board=svg(boardWrap,'svg',{viewBox:'0 0 600 650',class:'gem-board','aria-label':'Gem assembly board'});
  drawPuzzleSetting(board);
  drawPuzzleRecess(board,puzzle.mode==='easy');
  nodes=pieces.map((p,i)=>{const n=svg(board,'g',{class:'gem-piece',role:'button',tabindex:0,'data-puzzle-piece':i,'aria-keyshortcuts':'ArrowUp ArrowDown ArrowLeft ArrowRight r Enter Space'});svg(n,'polygon',{class:'gem-contact-shadow',points:pointsText(p.local),fill:'#061d18',stroke:'#061d18','stroke-width':5,'stroke-linejoin':'round','pointer-events':'none'});drawGem(n,i);svg(n,'polygon',{class:'gem-selection',points:pointsText(p.local),fill:'transparent',stroke:'#8b3d5c','stroke-width':4,'stroke-linejoin':'round'});
   n.addEventListener('pointerdown',e=>{if(e.button!==0)return;e.stopPropagation();e.preventDefault();choose(i);n.focus({preventScroll:true});if(puzzle.poses[i].locked||puzzle.solved)return;drag={id:i,origin:point(e),last:point(e),moved:false,pointer:e.pointerId};board.setPointerCapture(e.pointerId);});
   n.addEventListener('keydown',e=>{if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','r','R','Enter',' '].includes(e.key))return;e.preventDefault();choose(i);if(puzzle.solved)return;if(e.key==='r'||e.key==='R'){rotateGroup(puzzle,i);constrain(i);paint();save();}else if(e.key==='Enter'||e.key===' ')settle();else{const step=e.shiftKey?3:12;moveGroup(puzzle,i,e.key==='ArrowLeft'?-step:e.key==='ArrowRight'?step:0,e.key==='ArrowUp'?-step:e.key==='ArrowDown'?step:0);constrain(i);paint();save();}});return n;});
  board.addEventListener('pointermove',e=>{if(!drag||drag.pointer!==e.pointerId)return;const p=point(e);if(Math.hypot(p.x-drag.origin.x,p.y-drag.origin.y)>3)drag.moved=true;if(drag.moved){moveGroup(puzzle,drag.id,p.x-drag.last.x,p.y-drag.last.y);constrain(drag.id);paint();}drag.last=p;});
  board.addEventListener('pointerup',e=>{if(!drag||drag.pointer!==e.pointerId)return;const moved=drag.moved;drag=null;board.releasePointerCapture(e.pointerId);if(moved)settle();});
  board.addEventListener('pointercancel',()=>{drag=null;save();});
  board.addEventListener('pointerdown',e=>{if(e.target.closest('[data-puzzle-piece]')||selected<0||puzzle.solved)return;e.preventDefault();const p=point(e),v=puzzle.poses[selected];moveGroup(puzzle,selected,p.x-v.x,p.y-v.y);constrain(selected);settle();});
  // Recompute completion rather than trusting a stored completion flag.
  puzzle.solved=puzzle.poses.every(p=>p.locked);
  paint();complete(false);
 }
 panel.querySelectorAll('[data-level]').forEach(b=>b.addEventListener('click',()=>{if(state.puzzle?.mode===b.dataset.level)return;state.puzzle=newPuzzle(b.dataset.level);save();render();}));
 panel.querySelector('[data-rotate]').addEventListener('click',()=>{if(selected<0||state.puzzle.solved)return;rotateGroup(state.puzzle,selected);constrain(selected);paint();save();nodes[selected].focus({preventScroll:true});});
 panel.querySelector('[data-restart]').addEventListener('click',()=>{state.puzzle=newPuzzle(state.puzzle.mode);save();render();});
 render();return {save:()=>{drag=null;save();}};
}
