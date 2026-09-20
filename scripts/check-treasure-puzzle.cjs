const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
 const load=file=>import(pathToFileURL(path.resolve(__dirname,'../game-of-worms',file)).href+'?v=20260920-gems-1');
 const {pieces,outline,rotate,jewelColours,insetPolygon,GEOMETRY_VERSION}=await load('treasure-pieces.js');
 const {newPuzzle,snap,rotateGroup,moveGroup,parseSave,treasures}=await load('treasure-model.js');
 const area=pts=>Math.abs(pts.reduce((s,[x,y],i)=>{const q=pts[(i+1)%pts.length];return s+x*q[1]-q[0]*y;},0)/2);
 assert.equal(pieces.length,8);assert.ok(Math.abs(pieces.reduce((s,p)=>s+area(p.points),0)-area(outline))<1e-6,'pieces must tile heart exactly');
 // Sample the silhouette densely: no internal gaps or overlapping piece interiors.
 const inside=(x,y,p)=>{let yes=false;for(let i=0,j=p.length-1;i<p.length;j=i++){const a=p[i],b=p[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])yes=!yes;}return yes;};
 for(let y=100.37;y<401;y+=3.71)for(let x=110.21;x<491;x+=3.37){const n=pieces.filter(p=>inside(x,y,p.points)).length;assert.equal(n,inside(x,y,outline)?1:0,`bad tiling at ${x},${y}`);}
 assert.equal(new Set(jewelColours.map(c=>c.h)).size,8,'each gem has a distinct colour');
 for(const p of pieces){
  p.points.forEach(([x,y],i)=>{const [u,v]=p.points[(i+1)%p.points.length],dx=Math.abs(u-x),dy=Math.abs(v-y);assert.ok(dx===0||dy===0||dx===dy,'edges follow the 45 degree lattice');});
  for(const [x,y]of insetPolygon(p.local,7))assert.ok(inside(x,y,p.local),'bevel stays inside the gem');
  for(const j of p.neighbors)assert.ok(pieces[j].neighbors.includes(p.id),'adjacency is reciprocal');
 }
 const oldSave=parseSave(JSON.stringify({version:1,found:treasures.map(t=>t.id),puzzle:{...newPuzzle('easy'),geometryVersion:GEOMETRY_VERSION-1}}));
 assert.equal(oldSave.found.length,8,'geometry changes retain collected gems');assert.equal(oldSave.puzzle,null,'old assembly is safely reset');
 const halfTurn=newPuzzle('medium');halfTurn.poses[3]={...halfTurn.poses[3],x:pieces[3].cx,y:pieces[3].cy+80,a:180};assert.ok(snap(halfTurn,3),'symmetric rectangle accepts a half-turn');
 for(const mode of ['easy','medium']){const p=newPuzzle(mode);p.poses.forEach((v,i)=>pieces[i].local.forEach(([x,y])=>{const d=rotate(x,y,v.a);assert.ok(v.x+d.x>=7.99&&v.x+d.x<=592.01&&v.y+d.y>=7.99&&v.y+d.y<=642.01,'initial pieces fully inside board');}));}
 for(const mode of ['easy','medium']){const p=newPuzzle(mode);p.poses.forEach((v,i)=>{v.x=pieces[i].cx+10;v.y=pieces[i].cy+80;v.a=90;assert.equal(snap(p,i),false);v.a=0;assert.equal(snap(p,i),true);});assert.ok(p.solved);}
 assert.equal(parseSave('{oops').found.length,0);assert.equal(parseSave(JSON.stringify({version:1,found:['india','india','fake']})).found.length,1);
 const bad=newPuzzle('medium');bad.poses[0].group=1;assert.equal(parseSave(JSON.stringify({version:1,found:treasures.map(t=>t.id),puzzle:bad})).puzzle,null);
 for(const mode of ['easy','medium']){const original=newPuzzle(mode);const loaded=parseSave(JSON.stringify({version:1,found:treasures.map(t=>t.id),puzzle:original}));assert.deepEqual(loaded.puzzle.poses,original.poses,'existing Easy and Medium arrangements survive');assert.equal(loaded.puzzle.mode,mode);}
 const legacy={...newPuzzle('medium'),mode:'mystery'};const migrated=parseSave(JSON.stringify({version:1,found:treasures.map(t=>t.id),puzzle:legacy,wins:['easy','medium','mystery']}));assert.equal(migrated.found.length,8);assert.equal(migrated.puzzle.mode,'medium');assert.deepEqual(migrated.wins,['easy','medium']);assert.throws(()=>newPuzzle('mystery'),RangeError);
 const easy=newPuzzle('easy');rotateGroup(easy,0);assert.equal(easy.poses[0].a,0);const harder=newPuzzle('medium');const before=harder.poses[0].a;rotateGroup(harder,0);assert.equal(harder.poses[0].a,(before+90)%360);
 console.log('PASS: exact eight-piece tiling, no gaps/overlaps, orientation checks, both levels solvable, rotation, preserved Easy/Medium saves, retired-level migration and corrupt-save recovery.');
})().catch(e=>{console.error(e);process.exitCode=1;});
