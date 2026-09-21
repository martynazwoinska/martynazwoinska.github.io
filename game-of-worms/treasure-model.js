import {pieces,rotate,normalAngle,GEOMETRY_VERSION,symmetryAngles} from './treasure-pieces.js?v=20260920-discovery-2';
export const treasures=[
 {id:'india',species:'nigoni',place:'Trivandrum',name:'Trivandrum India',hint:'Look closely at the material inside a sample tube. Move a loupe over it.'},
 {id:'bali',species:'wallacei',place:'Sanda',name:'Sanda Bali',hint:'Use the machete to open the hanging cacao pod.'},
 {id:'mauritius',species:'nigoni',place:'Mauritius',name:'Mauritius',hint:'Ask a dodo grabber to lift a fruit from the ground.'},
 {id:'scotland',species:'elegans',place:'Edinburgh',name:'Edinburgh Scotland',hint:'Look through a telescope, then bring the distant sparkle into focus.'},
 {id:'bubbles',species:'briggsae',place:'Salt Lake',name:'Salt Lake City United States',hint:'Blow bubbles. One carries something heavier than air. Pop it!'},
 {id:'compost',species:'elegans',place:'Araucanía',name:'Araucanía Chile',hint:'Tip the wheelbarrow and look through what falls out.'},
 {id:'canopy',species:'tropicalis',place:'Queensland',name:'Queensland Australia',hint:'Ride into the canopy and take a photo. Then look behind the glinting leaves.'},
 {id:'towel',species:'briggsae',place:'QG130',name:'Kauaʻi forest bath',hint:'Use a towel and watch its folds as the worm wipes.'}
];
export const SAVE_KEY='worm-atlas-treasures-v1';
export const emptySave=()=>({version:1,restartedAt:0,found:[],revealed:{},puzzle:null,wins:[]});
// A newer hunt replaces an old one, so another open tab cannot restore its gems.
export function mergeHunts(local,other){
 if(other.restartedAt>local.restartedAt)return other;
 if(other.restartedAt<local.restartedAt)return local;
 return {...local,found:[...new Set([...local.found,...other.found])],revealed:{...other.revealed,...local.revealed},wins:[...new Set([...local.wins,...other.wins])]};
}
export function restartHunt(local,other=local){return {...emptySave(),restartedAt:Math.max(Date.now(),local.restartedAt+1,other.restartedAt+1)};}
export function parseSave(raw){
 const clean=emptySave();try{const s=JSON.parse(raw);if(s?.version!==1)return clean;
 clean.restartedAt=Number.isSafeInteger(s.restartedAt)&&s.restartedAt>=0?s.restartedAt:0;
 clean.found=[...new Set((Array.isArray(s.found)?s.found:[]).filter(id=>treasures.some(t=>t.id===id)))];
 for(const t of treasures){const p=s.revealed?.[t.id];if(p&&Number.isFinite(p.x)&&Number.isFinite(p.y))clean.revealed[t.id]={x:Math.max(4,Math.min(96,p.x)),y:Math.max(8,Math.min(85,p.y)),...(Number.isFinite(p.size)&&p.size>0?{size:Math.min(.3,p.size)}:{}),...(Number.isFinite(p.angle)?{angle:normalAngle(p.angle)}:{})};}
 clean.wins=[...new Set((Array.isArray(s.wins)?s.wins:[]).filter(x=>['easy','medium','mystery'].includes(x)).map(x=>x==='mystery'?'medium':x))];
 // Keep the former Medium save key: Mystery now names these same outline rules.
 // Retired free-form boards restart at the new Mystery level without losing gems.
 const p=s.puzzle;if(clean.found.length===8&&p?.mode==='mystery'){clean.puzzle=newPuzzle('medium');return clean;}
 if(clean.found.length===8&&p&&p.geometryVersion===GEOMETRY_VERSION&&['easy','medium'].includes(p.mode)&&Array.isArray(p.poses)&&p.poses.length===8&&p.poses.every((v,i)=>v&&[v.x,v.y,v.a,v.group].every(Number.isFinite)&&v.x>=-200&&v.x<=900&&v.y>=-200&&v.y<=900&&v.group===i&&normalAngle(v.a)%90===0)){
 clean.puzzle={geometryVersion:GEOMETRY_VERSION,mode:p.mode,poses:p.poses.map(v=>({x:v.x,y:v.y,a:normalAngle(v.a),group:v.group,locked:v.locked===true})),solved:false};
 // Joined groups must share a rigid transform. Reject corrupted saves, not the hunt.
 const ok=clean.puzzle.poses.every((v,i)=>clean.puzzle.poses.every((w,j)=>{if(v.group!==w.group)return true;const d=rotate(pieces[j].cx-pieces[i].cx,pieces[j].cy-pieces[i].cy,v.a);return v.a===w.a&&Math.hypot(w.x-v.x-d.x,w.y-v.y-d.y)<.05;}));
 const validLocks=clean.puzzle.poses.every((v,i)=>!v.locked||(v.a===0&&Math.hypot(v.x-pieces[i].cx,v.y-pieces[i].cy-80)<.05));
 if(!ok||!validLocks)clean.puzzle=null;
 }
 }catch{}return clean;
}
export function newPuzzle(mode){
 if(!['easy','medium'].includes(mode))throw new RangeError('Unknown puzzle level');
 const positions=[[88,100],[290,76],[518,100],[100,310],[515,300],[125,523],[330,540],[525,515]];
 const puzzle={geometryVersion:GEOMETRY_VERSION,mode,solved:false,poses:pieces.map((p,i)=>({x:positions[i][0],y:positions[i][1],a:mode==='easy'?0:[90,270,180,90,270,180,90,270][i],group:i,locked:false}))};
 for(const [i,v]of puzzle.poses.entries()){
  const ps=pieces[i].local.map(([x,y])=>rotate(x,y,v.a)),xs=ps.map(p=>v.x+p.x),ys=ps.map(p=>v.y+p.y);
  v.x+=Math.min(...xs)<8?8-Math.min(...xs):Math.max(...xs)>592?592-Math.max(...xs):0;
  v.y+=Math.min(...ys)<8?8-Math.min(...ys):Math.max(...ys)>642?642-Math.max(...ys):0;
 }
 return puzzle;
}
export const target=p=>({x:p.cx,y:p.cy+80});
export function moveGroup(puzzle,id,dx,dy){const group=puzzle.poses[id].group;for(const p of puzzle.poses)if(p.group===group&&!p.locked){p.x+=dx;p.y+=dy;}}
export function rotateGroup(puzzle,id){const pivot=puzzle.poses[id];if(puzzle.mode==='easy'||pivot.locked)return;for(const p of puzzle.poses)if(p.group===pivot.group){const d=rotate(p.x-pivot.x,p.y-pivot.y,90);p.x=pivot.x+d.x;p.y=pivot.y+d.y;p.a=normalAngle(p.a+90);}}
export function snap(puzzle,id){
 const v=puzzle.poses[id];let joined=false;
  const t=target(pieces[id]);if(symmetryAngles[id].includes(v.a)&&Math.hypot(v.x-t.x,v.y-t.y)<(puzzle.mode==='easy'?35:23)){v.x=t.x;v.y=t.y;v.a=0;v.locked=true;joined=true;}
  puzzle.solved=puzzle.poses.every(p=>p.locked);return joined;
}
