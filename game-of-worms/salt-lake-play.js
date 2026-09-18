import {GIANT,SMALL,PICNIC,add,drawLoop,drawApricotSlice} from './salt-lake-art.js?v=20260918-picnic-2';
import {pathPoints} from './guadeloupe-dance.js?v=20260916-gwoka-11';
const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clamp(x);return x*x*(3-2*x);};
const matrix=m=>new DOMMatrix([m.a,m.b,m.c,m.d,m.e,m.f]);
const visible=p=>p?.isConnected&&!p.closest('[hidden]');
// Quintic timing stops smoothly at each handling stage, including acceleration.
const settle=x=>{x=clamp(x);return x*x*x*(x*(x*6-15)+10);};
export function bubblePose(x,y,lean,phase=0,crouch=0){
 const front=ease((x-115)/200),middle=Math.sin(Math.PI*clamp((y-85)/180))**2*ease((x-90)/80);
 const dx=-lean*(front*25+middle*15)+crouch*front*12,dy=lean*front*3+crouch*(front*30+middle*12);
 const turn=(crouch*7-lean*4)*Math.PI/180*ease((x-279)/40),cx=x-329,cy=y-65;
 return {x:x+dx+cx*(Math.cos(turn)-1)-cy*Math.sin(turn),y:y+dy+cx*Math.sin(turn)+cy*(Math.cos(turn)-1)};
}
export function bubbleFrame(ms,small=false){
 const dip=settle((ms-450)/650),lift=settle((ms-1350)/1000),pull=settle((ms-2400)/1900),relax=settle((ms-4700)/1400);
 return {dip,lift,pull,relax,done:ms>=6300,
  crouch:dip*(1-lift)*(small?.7:.95),
  lean:(-.16*dip*(1-lift)+(small?.22:.65)*pull)*(1-relax),
  grip:settle(ms/430)*(1-settle((ms-6100)/200))};
}
// Staggered trajectories keep successive bubbles readable as a loose stream.
export function maleBubbleFlight(index){
 const [r,vx,vy]=[[9,-12,-20],[11,31,-9],[10,22,-29],[13,39,-17],[12,17,-36]][index];
 return {r,vx,vy,maleStream:true};
}
export function picnicFrame(ms){
 return {reach:settle(ms/750),lift:settle((ms-750)/650),offer:settle((ms-1400)/1000),receive:settle((ms-2450)/650),
  relax:settle((ms-4950)/900),eat:ms>=3200&&ms<4750,done:ms>=6000};
}
function sounds(){
 let context;const buffers=new Map(),loading=new Set(),voices=new Set();
 const stop=()=>{for(const n of voices){try{n.stop();}catch{}}voices.clear();};
 function prepare(){try{context??=new(window.AudioContext||window.webkitAudioContext)();context.resume().catch(()=>{});
  for(const key of ['pop','blow','eat']){if(buffers.has(key)||loading.has(key))continue;loading.add(key);
   fetch(new URL(key==='eat'?'./assets/audio/reunion-eat.wav':`./assets/audio/salt-lake-${key}.mp3`,import.meta.url),{signal:AbortSignal.timeout(5000)}).then(r=>{if(!r.ok)throw Error(r.status);return r.arrayBuffer();}).then(b=>context.decodeAudioData(b)).then(b=>{
    const samples=b.getChannelData(0);let peak=0;for(const v of samples)peak=Math.max(peak,Math.abs(v));
    const onset=key==='eat'?.145:Math.max(0,samples.findIndex(v=>Math.abs(v)>peak*.05)/b.sampleRate-.015);buffers.set(key,{buffer:b,onset,gain:Math.min(.8,(key==='pop'?.11:key==='eat'?.04:.06)/Math.max(.01,peak))});
   }).catch(()=>{}).finally(()=>loading.delete(key));}
 }catch{}}
 function play(key){const b=buffers.get(key);if(!b||context?.state!=='running')return;const n=context.createBufferSource(),g=context.createGain(),now=context.currentTime,duration=Math.min(key==='pop'?.35:key==='eat'?.19:1.1,b.buffer.duration-b.onset);if(duration<=0)return;
  n.buffer=b.buffer;n.connect(g);g.connect(context.destination);g.gain.setValueAtTime(0,now);g.gain.linearRampToValueAtTime(b.gain,now+.015);g.gain.setValueAtTime(b.gain,now+duration-.045);g.gain.linearRampToValueAtTime(0,now+duration);voices.add(n);n.onended=()=>{voices.delete(n);n.disconnect();g.disconnect();};n.start(now,b.onset,duration);
 }
 return {prepare,play,stop};
}
export function createSaltLakeBubbles(habitat,refresh=()=>{}){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),audio=sounds(),actors=new Map();
 let root,layer,raf=0,serial=0,round=0,bubbles=[],sparks=[],lastPop=0,lastFrame=0,picnic=null;
 const handles=p=>[GIANT,SMALL,PICNIC].includes(p?.dataset.accessoryFamily);
 const local=(node,x,y)=>new DOMPoint(x,y).matrixTransform(matrix(root.getScreenCTM()).inverse().multiply(matrix(node.getScreenCTM())));
 function ensure(){root=habitat.querySelector('#worm-species');if(!layer?.isConnected){layer=add(root,'g',{'data-salt-lake-bubbles':'','aria-label':'Floating bubbles'});}return layer;}
 function bounds(r){const h=habitat.getBoundingClientRect(),inv=matrix(root.getScreenCTM()).inverse();const a=new DOMPoint(h.left+10,h.top+12).matrixTransform(inv),b=new DOMPoint(h.right-10,h.bottom-45).matrixTransform(inv);return {left:a.x+r,right:b.x-r,top:a.y+r,bottom:b.y-r};}
 function fit(x,y,r){const b=bounds(r);return {x:Math.max(b.left,Math.min(b.right,x)),y:Math.max(b.top,Math.min(b.bottom,y))};}
 function capture(part){
  if(actors.has(part))return actors.get(part);
  const body=habitat.querySelector(part==='primary'?'#primary-worm > .worm-body':'#companion-worm > .companion-body');
  const paused=body.getAnimations().filter(a=>a.playState==='running');paused.forEach(a=>a.pause());
  const saved=[...body.children].map(n=>({n,d:n.getAttribute('d'),transform:n.getAttribute('transform'),points:n.matches('.worm-line,.worm-shadow,.worm-highlight,.companion-line,.companion-shadow,.companion-highlight')?pathPoints(n.getAttribute('d')):null}));
  const a={part,body,paused,saved,lean:0,recoilAt:0,run:null};actors.set(part,a);return a;
 }
 function restore(a){for(const {n,d,transform}of a.saved){if(d!==null)n.setAttribute('d',d);if(transform===null)n.removeAttribute('transform');else n.setAttribute('transform',transform);}a.paused.forEach(n=>{if(n.playState==='paused')n.play();});actors.delete(a.part);}
 function bend(a,amount,phase,crouch=0){
  const face=bubblePose(329,65,amount,phase,crouch),angle=crouch*7-amount*4;
  for(const {n,points,transform}of a.saved){if(points)n.setAttribute('d',points.map(p=>{if(p.close)return 'Z';const q=bubblePose(p.x,p.y,amount,phase,crouch);return `${p.move?'M':'L'}${q.x.toFixed(2)} ${q.y.toFixed(2)}`;}).join(''));
   else if(!n.matches('.male-tail'))n.setAttribute('transform',`translate(${face.x-329} ${face.y-65}) rotate(${angle} 329 65) ${transform||''}`);
  }
 }
 function createBubble(x,y,r,options={}){
  ensure();const pos=fit(x,y,r),g=add(layer,'g',{'data-pop-bubble':String(++serial),role:'button',tabindex:0,'aria-label':r>35?'Pop giant bubble':'Pop bubble','aria-keyshortcuts':'Enter Space',style:'cursor:pointer;pointer-events:all;touch-action:manipulation;outline:none;'});
  const hit=add(g,'circle',{r:1,fill:'transparent'});
  const focusRing=add(g,'circle',{r:1.12,fill:'none',stroke:'#8b3d5c','stroke-width':2,'vector-effect':'non-scaling-stroke',visibility:'hidden'});
  g.addEventListener('focus',()=>focusRing.setAttribute('visibility','visible'));g.addEventListener('blur',()=>focusRing.setAttribute('visibility','hidden'));
  // Transparent centre keeps the orchard visible; coloured arcs suggest thin film.
  add(g,'circle',{r:1,fill:'#c7efef','fill-opacity':.09,stroke:'#e9f3e0','stroke-width':.025});
  const arcs=[['M-.89-.18A.91.91 0 0 1-.28-.88','#f3b6da'],['M.03-.91A.91.91 0 0 1 .9-.1','#b5eff4'],['M.88.2A.9.9 0 0 1-.18.9','#f2df99'],['M-.25.86A.9.9 0 0 1-.83.36','#c6b9ed']];
  for(const [d,color]of arcs)add(g,'path',{d,fill:'none',stroke:color,'stroke-width':.055,'stroke-linecap':'round',opacity:.8});
  add(g,'path',{d:'M-.68-.37Q-.55-.68-.28-.71',fill:'none',stroke:'#fffdf0','stroke-width':.055,'stroke-linecap':'round'});
  add(g,'ellipse',{cx:-.72,cy:-.2,rx:.035,ry:.07,fill:'#fffdf0',opacity:.85});
  const b={g,hit,x:pos.x,y:pos.y,r,born:performance.now(),vx:options.vx??(serial%2?5:-4),vy:options.vy??-5,life:options.life??16000,...options};bubbles.push(b);
  const pop=event=>{event.preventDefault();event.stopPropagation();audio.prepare();burst(b,true);};
  g.addEventListener('pointerdown',e=>e.stopPropagation());g.addEventListener('click',pop);g.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key))pop(e);if(e.key==='Escape'){e.stopPropagation();cancel();}});
  drawBubble(b,performance.now());wake();return b;
 }
 function drawBubble(b,now,dt=0){const age=(now-b.born)/1000;if(!b.attached&&!b.growing&&!reduced.matches){const puff=b.maleStream?1+.65*Math.max(0,1-age/.9):1;const p=fit(b.x+b.vx*puff*dt,b.y+b.vy*puff*dt,b.r);b.x=p.x;b.y=p.y;}
  const wobble=reduced.matches?0:Math.sin(age*2.5+b.born)*.045;
  const screen=root.getScreenCTM(),unit=Math.hypot(screen.a,screen.b);
  b.hit.setAttribute('r',Math.max(1,22/Math.max(.01,b.r*unit)));
  b.g.setAttribute('transform',`translate(${b.x} ${b.y}) scale(${b.r*(b.stretch||1)*(1+wobble)} ${b.r*(b.squash||1)*(1-wobble)})`);
 }
 function burst(b,clicked=false){
  if(!bubbles.includes(b))return;const focused=document.activeElement===b.g;const big=b.r>35;
  bubbles=bubbles.filter(x=>x!==b);b.g.remove();for(const child of bubbles)if(child.attached===b){child.attached=null;child.born=performance.now();}
  if(clicked&&!reduced.matches)audio.play('pop');
  if(!reduced.matches){const g=add(layer,'g',{'pointer-events':'none'});for(let i=0;i<9;i++){const a=i*Math.PI*2/9;add(g,'path',{d:`M${Math.cos(a)*b.r*.8} ${Math.sin(a)*b.r*.8}l${Math.cos(a)*7} ${Math.sin(a)*7}`,stroke:i%2?'#e5c7df':'#e8f6ed','stroke-width':1.5,'stroke-linecap':'round'});}sparks.push({g,x:b.x,y:b.y,born:performance.now()});}
  if(clicked&&big){lastPop=performance.now();if(!reduced.matches){for(const part of ['primary','companion'])capture(part).recoilAt=lastPop;}
   if(++round%2){for(let i=0;i<3;i++)createBubble(b.x+(i-1)*22,b.y+i*6,12+i*3,{vx:(i-1)*9,vy:-8,life:11000});}
  }
  if(focused){const next=bubbles[0]?.g||habitat.querySelector(`[data-accessory-family="${GIANT}"] .accessory-piece`)||habitat.querySelector(`.accessory-piece[data-accessory-family="${GIANT}"]`);next?.focus({preventScroll:true});}
  wake();
 }
 function endRun(a){const r=a.run;if(!r)return;r.effects.remove();if(r.wandVisibility===null)r.idleWand.removeAttribute('visibility');else r.idleWand.setAttribute('visibility',r.wandVisibility);a.run=null;}
 function start(piece){
  if(!handles(piece)||!visible(piece))return false;
  if(piece.dataset.accessoryFamily===PICNIC)return startPicnic(piece);
  if(picnic)return true;
  ensure();const small=piece.dataset.accessoryFamily===SMALL||piece.dataset.wormPart==='companion',part=small?'companion':'primary';if(actors.get(part)?.run)return true;
  if(bubbles.length>14){for(const b of [...bubbles].slice(0,bubbles.length-10))burst(b);}
  if(!reduced.matches)audio.prepare();
  if(reduced.matches){const art=piece.querySelector('.location-accessory-art'),p=local(art,0,-30);createBubble(p.x,p.y-30,small?17:50,{life:20000});return true;}
  const a=capture(part),art=piece.querySelector('.location-accessory-art'),idleWand=art.querySelector('[data-bubble-wand]'),effects=add(layer,'g',{'pointer-events':'none','data-bubble-action':part});
  const relative=matrix(root.getScreenCTM()).inverse().multiply(matrix(idleWand.getScreenCTM()));
  const r={flat:(relative.a*relative.d-relative.b*relative.c)/(relative.a**2+relative.b**2),scale:Math.hypot(relative.a,relative.b),angle:Math.atan2(relative.b,relative.a)*180/Math.PI,piece,art,idleWand,wandVisibility:idleWand.getAttribute('visibility'),effects,small,began:performance.now(),made:0,played:false};a.run=r;idleWand.setAttribute('visibility','hidden');
  r.arm=add(effects,'path',{fill:'none',stroke:'var(--worm-deep)','stroke-width':small?4:7,'stroke-linecap':'round'});
  r.armLight=add(effects,'path',{fill:'none',stroke:'var(--worm-color)','stroke-width':small?2.5:4.5,'stroke-linecap':'round'});
  r.wand=drawLoop(effects,small);
  r.rim=art.querySelector('[data-bubble-near-rim]')?.cloneNode(true);if(r.rim){effects.appendChild(r.rim);r.rim.setAttribute('pointer-events','none');}
  r.hand=add(effects,'ellipse',{rx:small?4:6,ry:small?3:4,fill:'var(--worm-color)',stroke:'var(--worm-deep)','stroke-width':1.2});
  wake();return true;
 }
 function endPicnic(){
  if(!picnic)return;picnic.effects.remove();
  if(picnic.servings){if(picnic.visibility===null)picnic.servings.removeAttribute('visibility');else picnic.servings.setAttribute('visibility',picnic.visibility);}
  for(const a of actors.values())a.picnic=false;picnic=null;
 }
 function startPicnic(piece){
  if(picnic)return true;
  // Hands finish their previous task before taking food; floating bubbles remain poppable.
  for(const a of [...actors.values()]){endRun(a);restore(a);}audio.stop();ensure();
  const primary=capture('primary'),male=capture('companion');primary.picnic=male.picnic=true;
  const effects=add(layer,'g',{'data-picnic-action':'','pointer-events':'none'}),art=piece.querySelector('.location-accessory-art');
  const servings=art.querySelector('[data-picnic-servings]');
  picnic={piece,art,effects,servings,visibility:servings?.getAttribute('visibility'),began:performance.now(),played:0,primary,male,arms:[],slices:[]};
  servings?.setAttribute('visibility','hidden');
  for(let i=0;i<3;i++)picnic.arms.push({line:add(effects,'path',{fill:'none',stroke:'var(--worm-deep)','stroke-width':i===2?3.8:6,'stroke-linecap':'round'}),light:add(effects,'path',{fill:'none',stroke:'var(--worm-color)','stroke-width':i===2?2.2:4,'stroke-linecap':'round'}),hand:add(effects,'ellipse',{rx:i===2?3.4:5,ry:i===2?2.5:3.8,fill:'var(--worm-color)',stroke:'var(--worm-deep)','stroke-width':1})});
  picnic.slices=[drawApricotSlice(effects),drawApricotSlice(effects)];
  if(!reduced.matches)audio.prepare();wake();return true;
 }
 function animatePicnic(now){
  const p=picnic;if(!p)return;if(!visible(p.piece)){endPicnic();return;}
  const ms=now-p.began,f=picnicFrame(ms),still=reduced.matches;
  const bodyPoint=(a,x,y)=>{const q=bubblePose(x,y,a.lean,0,a.crouch||0);return local(a.body,q.x,q.y);};
  const mouth=bodyPoint(p.primary,334,76),maleMouth=bodyPoint(p.male,334,76),anchor=bodyPoint(p.primary,280,124),maleAnchor=bodyPoint(p.male,282,126);
  const from=local(p.art,-15,-11),other=local(p.art,15,-7),offer={x:maleMouth.x+26,y:maleMouth.y+23};
  const mix=(a,b,t)=>({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t});
  const own=still?{x:mouth.x+7,y:mouth.y+3}:mix(from,{x:mouth.x+7,y:mouth.y+3},f.lift);
  let shared=still?{x:maleMouth.x+7,y:maleMouth.y+3}:mix(other,{x:other.x-8,y:other.y-42},f.lift);
  if(!still){shared=mix(shared,offer,f.offer);shared=mix(shared,{x:maleMouth.x+7,y:maleMouth.y+3},f.receive);}
  const giving=f.receive>0?offer:shared,ends=[own,mix(giving,anchor,f.receive),shared];
  p.arms.forEach((arm,i)=>{const origin=i===2?maleAnchor:anchor,grip=still?0:(i===2?f.offer:f.reach)*(1-f.relax)*(i===1?1-f.receive:1),end=mix(origin,ends[i],grip);
   const d=`M${origin.x} ${origin.y}Q${(origin.x+end.x)/2} ${Math.max(origin.y,end.y)+13*grip} ${end.x} ${end.y}`;
   for(const n of [arm.line,arm.light]){n.setAttribute('d',d);n.setAttribute('opacity',Math.min(1,grip*5));}arm.hand.setAttribute('cx',end.x);arm.hand.setAttribute('cy',end.y);arm.hand.setAttribute('opacity',Math.min(1,grip*5));});
  p.slices.forEach((slice,i)=>{const pos=i?shared:own,first=ms>3350+i*350,last=ms>4100+i*350,scale=i?.65:.88;
   slice.setAttribute('transform',`translate(${pos.x} ${pos.y}) rotate(${i?-15:12}) scale(${scale})`);slice.setAttribute('opacity',still?1:ms>4650+i*100?0:1);
   if(first){slice.children[0].setAttribute('d',last?'M-8 4Q-3 10 3 5Q8 10 14 0Q10 16-1 14Q-11 13-8 4Z':'M-16-5Q-17 2-10 1Q-10 8-3 5Q3 11 8 3L16-6Q13 13-1 14Q-14 13-16-5Z');slice.children[1].setAttribute('opacity',0);slice.children[2].setAttribute('opacity',0);}
  });
  if(!still){for(const [i,a]of [p.primary,p.male].entries()){const smile=a.body.querySelector('.worm-smile'),saved=a.saved.find(v=>v.n===smile);if(smile&&saved)smile.setAttribute('d',f.eat?`M323 74Q332 ${78+Math.sin((ms-i*350)/140)*2} 341 72`:saved.d);}
   if(ms>3350+p.played*350&&p.played<2){audio.play('eat');p.played++;}}
  if(still?ms>1300:f.done)endPicnic();
 }
 function animateRun(a,now){
  const r=a.run,ms=now-r.began,f=bubbleFrame(ms,r.small),tip=bubblePose(337,76,a.lean,0,f.crouch),mouth=local(a.body,tip.x,tip.y);
  const resting=local(r.idleWand,0,0),dip=local(r.art,0,r.small?43:105);
  const lifted=r.small?{x:mouth.x+13,y:mouth.y-2}:local(r.art,12,-12);
  const reach=r.small?lifted:local(r.art,42,-52);
  let x=resting.x+(dip.x-resting.x)*f.dip,y=resting.y+(dip.y-resting.y)*f.dip;
  x+=(lifted.x-x)*f.lift;y+=(lifted.y-y)*f.lift;
  x+=(reach.x-lifted.x)*f.pull;y+=(reach.y-lifted.y)*f.pull;
  x+=(resting.x-x)*f.relax;y+=(resting.y-y)*f.relax;
  // The large hoop rises edge-first from the shallow solution; the small loop
  // fits through its bottle neck and is held just clear of the male's mouth.
  const pitch=r.flat+(1-r.flat)*f.lift*(1-f.relax);
  const turn=r.angle+(r.small?-12:22)*f.lift*(1-f.relax),angle=turn*Math.PI/180;
  const length=(r.small?48:76)*r.scale*pitch,grip={x:x-Math.sin(angle)*length,y:y+Math.cos(angle)*length};
  const q=bubblePose(281,120,a.lean,0,f.crouch),anchor=local(a.body,q.x,q.y);
  const hand={x:anchor.x+(grip.x-anchor.x)*f.grip,y:anchor.y+(grip.y-anchor.y)*f.grip};
  r.wand.setAttribute('transform',`translate(${x} ${y}) rotate(${turn}) scale(${r.scale} ${r.scale*pitch})`);
  if(r.rim){const m=matrix(root.getScreenCTM()).inverse().multiply(matrix(r.art.getScreenCTM()));r.rim.setAttribute('transform',m.toString());r.rim.setAttribute('opacity',1-f.lift);}
  const d=`M${anchor.x} ${anchor.y}Q${anchor.x+(hand.x-anchor.x)*.42} ${Math.max(anchor.y,hand.y)+12*f.grip} ${hand.x} ${hand.y}`;
  r.arm.setAttribute('d',d);r.armLight.setAttribute('d',d);for(const n of [r.arm,r.armLight,r.hand])n.setAttribute('opacity',Math.min(1,f.grip*5));r.hand.setAttribute('cx',hand.x);r.hand.setAttribute('cy',hand.y);
  if(r.small){const smile=a.body.querySelector('.worm-smile');const saved=a.saved.find(v=>v.n===smile);if(smile&&saved)smile.setAttribute('d',ms>2350&&ms<4700?'M333 74a3 3.8 0 1 0 6 0a3 3.8 0 1 0-6 0':saved.d);}
  if(ms>2430&&!r.played){r.played=true;audio.play('blow');}
  if(!r.small&&ms>2450&&ms<4400){if(!r.bubble)r.bubble=createBubble(x,y,8,{growing:true,life:19000});
   if(bubbles.includes(r.bubble)){const radius=8+f.pull*49,p=fit(x+radius*.7*f.pull,y-9*f.pull,radius);r.bubble.r=radius;r.bubble.x=p.x;r.bubble.y=p.y;r.bubble.stretch=1+Math.sin(Math.PI*f.pull)*.4;r.bubble.squash=1-Math.sin(Math.PI*f.pull)*.12;r.bubble.g.setAttribute('aria-label',radius>35?'Pop giant bubble':'Pop bubble');}}
  if(r.bubble&&ms>=4400)r.bubble.growing=false;
  if(r.small&&ms>2450+r.made*520&&r.made<5){const n=r.made++,flight=maleBubbleFlight(n),b=createBubble(x+10,y-2,flight.r,{...flight,life:15000});
   if(n===0){b.noseUntil=now+700;b.noseActor=a;}}
  if(f.done)endRun(a);
 }
 function tick(now){raf=0;const dt=Math.min(.05,(now-(lastFrame||now))/1000);lastFrame=now;if(!root?.isConnected){cancel();return;}
  for(const a of [...actors.values()]){
   if(a.run&&!visible(a.run.piece)){endRun(a);}
   const reaction=a.recoilAt?Math.max(0,1-(now-a.recoilAt)/850):0;
   const pf=picnic&&a.picnic?picnicFrame(now-picnic.began):null;
   const f=pf&&!reduced.matches?{lean:(a.part==='primary'?.24:-.15)*pf.offer*(1-pf.relax),crouch:(a.part==='primary'?.65:.2)*pf.reach*(1-pf.lift)}:a.run?bubbleFrame(now-a.run.began,a.run.small):{lean:0,crouch:0};
   a.lean=f.lean+.3*Math.sin(Math.PI*(1-reaction))**2;a.crouch=f.crouch;
   bend(a,a.lean,0,f.crouch);if(a.run)animateRun(a,now);
   if(!a.run&&!a.picnic&&reaction<=0)restore(a);
  }
  if(picnic)animatePicnic(now);
  for(const b of [...bubbles]){
   if(b.noseUntil>now&&b.noseActor){const a=b.noseActor,q=bubblePose(348,74,a.lean,0,a.crouch||0),p=local(a.body,q.x,q.y);b.x=p.x+5;b.y=p.y;b.growing=true;}else if(b.noseUntil){b.noseUntil=0;b.growing=false;}
   if(b.attached&&bubbles.includes(b.attached)){b.x=b.attached.x+Math.cos(b.attachAngle)*(b.attached.r+b.r*.6);b.y=b.attached.y+Math.sin(b.attachAngle)*(b.attached.r+b.r*.6);}
   if(!b.attached&&!b.growing&&b.r<30&&!reduced.matches){const big=bubbles.find(g=>g.r>35&&!g.growing&&Math.hypot(g.x-b.x,g.y-b.y)<g.r+b.r);if(big){b.attached=big;b.attachAngle=Math.atan2(b.y-big.y,b.x-big.x);}}
   if(now-b.born>b.life&&!b.growing)burst(b);else drawBubble(b,now,dt);
  }
  sparks=sparks.filter(s=>{const t=(now-s.born)/350;if(t>=1){s.g.remove();return false;}s.g.setAttribute('transform',`translate(${s.x} ${s.y}) scale(${1+t*.35})`);s.g.setAttribute('opacity',1-t);return true;});
  if(actors.size||bubbles.length||sparks.length)wake();else {layer?.remove();layer=null;refresh();}
 }
 function wake(){if(!raf)raf=requestAnimationFrame(tick);}
 function cancel(){cancelAnimationFrame(raf);raf=0;lastFrame=0;audio.stop();endPicnic();for(const a of [...actors.values()]){endRun(a);restore(a);}bubbles=[];sparks=[];layer?.remove();layer=null;}
 document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});window.addEventListener('pagehide',cancel);window.addEventListener('resize',cancel);reduced.addEventListener('change',cancel);
 return {handles,start,cancel,get active(){return actors.size>0;}};
}
