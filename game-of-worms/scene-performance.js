import {pathPoints} from './guadeloupe-dance.js?v=20260916-gwoka-11';
export const clamp=x=>Math.max(0,Math.min(1,x));
export const ease=x=>{x=clamp(x);return x*x*x*(10+x*(-15+6*x));};
export const add=(p,t,a={})=>{const n=document.createElementNS('http://www.w3.org/2000/svg',t);for(const[k,v]of Object.entries(a))n.setAttribute(k,v);p.appendChild(n);return n;};
export const matrix=m=>`matrix(${[m.a,m.b,m.c,m.d,m.e,m.f].join(' ')})`;
const dom=m=>new DOMMatrix([m.a,m.b,m.c,m.d,m.e,m.f]);
export const relative=(root,n)=>dom(root.getScreenCTM()).inverse().multiply(dom(n.getScreenCTM()));
export const at=(base,x,y)=>new DOMPoint(x,y).matrixTransform(base);
export const visible=n=>n?.isConnected&&!n.closest('[hidden]');
export function bodyPoint(x,y,bend=0,look=0){
 const middle=Math.sin(Math.PI*clamp((y-87)/180))**2*ease((x-105)/75),front=ease((x-255)/65);
 return {x:x+bend*middle*10-look*front*8,y:y+look*front*10};
}
// Temporary copies carry the performance. Draggable originals retain every
// visitor transform, focus target and exact body path throughout the action.
export function performance(habitat,kind){
 const root=habitat.querySelector('#worm-species'),saved=[],paused=[],actors={},props=[];
 const layer=add(root,'g',{'data-scene-performance':kind,'pointer-events':'none','aria-hidden':'true'});
 const hide=n=>{saved.push([n,n.getAttribute('visibility')]);n.setAttribute('visibility','hidden');};
 const pause=n=>{for(const a of n.getAnimations({subtree:true}))if(a.playState==='running'){a.pause();paused.push(a);}};
 for(const part of ['primary','companion']){
  const body=habitat.querySelector(part==='primary'?'#primary-worm > .worm-body':'#companion-worm > .companion-body');pause(body);
  const base=relative(root,body),g=add(layer,'g',{transform:matrix(base)}),copy=body.cloneNode(true);copy.removeAttribute('id');copy.removeAttribute('transform');copy.style.transform='none';copy.style.animation='none';g.appendChild(copy);hide(body);
  const paths=[...copy.children].filter(n=>n.matches('.worm-line,.worm-shadow,.worm-highlight,.companion-line,.companion-shadow,.companion-highlight,.male-tail')).map(n=>({n,points:pathPoints(n.getAttribute('d')),closed:n.classList.contains('male-tail')}));
  const face=add(copy,'g');for(const n of [...copy.children])if(n!==face&&!paths.some(p=>p.n===n))face.appendChild(n);
  actors[part]={base,copy,paths,face,part,bend:0,look:0};
 }
 for(const piece of habitat.querySelectorAll('.accessory-piece')){
  if(!visible(piece))continue;const art=piece.querySelector('.location-accessory-art');if(!art)continue;pause(art);
  const base=relative(root,art),g=add(layer,'g',{transform:matrix(base)}),copy=art.cloneNode(true);copy.removeAttribute('transform');copy.style.transform='none';copy.style.animation='none';
  // IDs belong to the originals; temporary clip paths get their own names.
  const ids=new Map();for(const n of copy.querySelectorAll('[id]')){ids.set(n.id,n.id+'-performance');n.id+='-performance';}
  for(const n of [copy,...copy.querySelectorAll('*')])for(const attr of [...n.attributes])for(const [id,newId]of ids)if(attr.value.includes(`url(#${id})`))n.setAttribute(attr.name,attr.value.replaceAll(`url(#${id})`,`url(#${newId})`));
  for(const n of copy.querySelectorAll('*'))n.style.animation='none';
  g.appendChild(copy);hide(art);props.push({piece,base,g,copy,family:piece.dataset.accessoryFamily,part:piece.dataset.wormPart,headFit:copy.querySelector(".santeuil-cap-fit")?.getAttribute("transform")});
 }
 const prop=(family,part='primary')=>props.find(p=>p.family===family&&p.part===part);
 function pose(part,bend=0,look=0){const a=actors[part];a.bend=bend;a.look=look;
  for(const p of a.paths)p.n.setAttribute('d',p.points.map(q=>{if(q.close)return 'Z';const v=bodyPoint(q.x,q.y,bend,look);return `${q.move?'M':'L'}${v.x.toFixed(3)} ${v.y.toFixed(3)}`;}).join(' ')+(p.closed?' Z':''));
  const q=bodyPoint(329,65,bend,look);a.face.setAttribute('transform',`translate(${q.x-329} ${q.y-65})`);
  for(const p of props.filter(p=>p.part===part||(part==='primary'&&p.part==='primary-cap'))){
   const head=p.copy.querySelector('.santeuil-cap-fit');if(head){head.setAttribute('transform',`translate(${q.x-329} ${q.y-65}) `+p.headFit);}
   if(p.family==='xz1516-forest-bird-headphones')p.g.setAttribute('transform',matrix(a.base.translate(q.x-329,q.y-65).multiply(a.base.inverse()).multiply(p.base)));
  }
 }
 const point=(part,x,y)=>{const a=actors[part],q=bodyPoint(x,y,a.bend,a.look);return at(a.base,q.x,q.y);};
 function hand(part){const thin=part==='companion';return {part,back:add(layer,'path',{opacity:0,fill:'none',stroke:'var(--worm-deep)','stroke-width':thin?3.2:5.8,'stroke-linecap':'round'}),front:add(layer,'path',{opacity:0,fill:'none',stroke:'var(--worm-color)','stroke-width':thin?1.9:3.8,'stroke-linecap':'round'}),tip:add(layer,'ellipse',{opacity:0,rx:thin?2.7:4,ry:thin?2.2:3,fill:'var(--worm-color)',stroke:'var(--worm-deep)','stroke-width':.8})};}
 function reach(h,target,amount=1,anchor=[250,137]){const from=point(h.part,...anchor),end={x:from.x+(target.x-from.x)*amount,y:from.y+(target.y-from.y)*amount};
  for(const n of [h.back,h.front]){n.setAttribute('d',`M${from.x} ${from.y}Q${(from.x+end.x)/2} ${Math.max(from.y,end.y)+10*amount} ${end.x} ${end.y}`);n.setAttribute('opacity',clamp(amount*4));}
  h.tip.setAttribute('cx',end.x);h.tip.setAttribute('cy',end.y);h.tip.setAttribute('opacity',clamp(amount*4));
 }
 return {root,layer,actors,props,prop,pose,point,hand,reach,restore(){for(const[n,v]of saved){if(v===null)n.removeAttribute('visibility');else n.setAttribute('visibility',v);}layer.remove();for(const a of paused)if(a.playState==='paused')a.play();}};
}
export function recordedSound(files){
 let context;const buffers=new Map(),pending=new Map(),voices=new Map();
 async function prepare(keys){try{context??=new(window.AudioContext||window.webkitAudioContext)();await context.resume();await Promise.all(keys.map(key=>{
  if(buffers.has(key))return;if(!pending.has(key))pending.set(key,fetch(new URL(`./assets/audio/${files[key]}`,import.meta.url),{signal:AbortSignal.timeout(4000)}).then(r=>{if(!r.ok)throw Error(r.status);return r.arrayBuffer();}).then(b=>context.decodeAudioData(b)).then(b=>buffers.set(key,b)).catch(()=>{}).finally(()=>pending.delete(key)));return pending.get(key);
 }));}catch{}}
 function play(key,offset=0,duration=1,level=.12){const b=buffers.get(key);if(!b||context?.state!=='running')return false;duration=Math.min(duration,b.duration-offset);if(duration<=.02)return false;
  let peak=.001;for(let c=0;c<b.numberOfChannels;c++){const d=b.getChannelData(c);for(let i=Math.floor(offset*b.sampleRate);i<(offset+duration)*b.sampleRate;i++)peak=Math.max(peak,Math.abs(d[i]||0));}
  const n=context.createBufferSource(),g=context.createGain(),now=context.currentTime;n.buffer=b;n.connect(g);g.connect(context.destination);const gain=Math.min(.9,level/peak),fade=Math.min(.08,duration/3);
  g.gain.setValueAtTime(0,now);g.gain.linearRampToValueAtTime(gain,now+.012);g.gain.setValueAtTime(gain,now+duration-fade);g.gain.linearRampToValueAtTime(0,now+duration);voices.set(n,g);n.onended=()=>{voices.delete(n);n.disconnect();g.disconnect();};n.start(now,offset,duration);return true;
 }
 return {prepare,play,stop(){for(const [n,g] of voices){try{const now=context.currentTime;if(g.gain.cancelAndHoldAtTime)g.gain.cancelAndHoldAtTime(now);else g.gain.cancelScheduledValues(now);g.gain.setTargetAtTime(0,now,.008);n.stop(now+.04);}catch{}}voices.clear();}};
}
