import {pathPoints} from './guadeloupe-dance.js?v=20260916-gwoka-11';
export const SHELL='praslin-giant-tortoise-shell-costume',BELL='praslin-seychelles-carnival-bell-bracelet';
const CAP='praslin-black-parrot-carnival-cap',NS='http://www.w3.org/2000/svg';
const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clamp(x);return x*x*(3-2*x);};
const add=(parent,tag,attrs={})=>{const n=document.createElementNS(NS,tag);for(const [k,v]of Object.entries(attrs))n.setAttribute(k,v);parent.append(n);return n;};
const matrix=m=>`matrix(${[m.a,m.b,m.c,m.d,m.e,m.f].join(' ')})`;
export function measurePath(d){
  let length=0;const points=pathPoints(d).filter(p=>!p.close).map((p,i,a)=>{if(i)length+=Math.hypot(p.x-a[i-1].x,p.y-a[i-1].y);return {...p,d:length};});return {points,length};
}
export function pointAt(path,fraction){
  const distance=clamp(fraction)*path.length;let i=1;while(i<path.points.length-1&&path.points[i].d<distance)i++;
  const a=path.points[i-1],b=path.points[i],t=(distance-a.d)/(b.d-a.d||1);return {x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t};
}
export function tailOffset(x,y,amount){const weight=(1-ease((x-90)/90))*ease((y-155)/45);return {x:x+amount*weight*1.4,y:y+amount*weight*4};}
// Bend the complete front of the body into the shell; never trim its path.
export function foldedPoint(point, fraction, centre, anchor, amount){
  const t=clamp((fraction-.32)/.68),u=1-t;
  if(!t)return {...point};
  const target={x:u*u*u*anchor.x+3*u*u*t*(anchor.x-8)+3*u*t*t*(centre.x-52)+t*t*t*centre.x,
    y:u*u*u*anchor.y+3*u*u*t*(anchor.y-54)+3*u*t*t*(centre.y+28)+t*t*t*centre.y};
  // The head leads a small travelling bend, which settles at either endpoint.
  const lead=amount+Math.sin(Math.PI*amount)*.13*t;
  const blend=clamp(lead);
  return {x:point.x+(target.x-point.x)*blend,y:point.y+(target.y-point.y)*blend};
}
// The rear follows the head into a compact curve under the shell. During a
// peek it stays tucked, so only the face and the little tail tip are visible.
export function tuckedPoint(point,fraction,centre,anchor,amount,tuck,seat){
  const q=foldedPoint(point,fraction,centre,anchor,amount);
  if(!tuck||!seat)return q;
  const f=clamp(fraction),u=1-f,head=foldedPoint(seat.head,1,centre,anchor,amount);
  const c2={x:centre.x+(head.x-centre.x)*.45,y:centre.y+(head.y-centre.y)*.45};
  const target={x:u*u*u*seat.tail.x+3*u*u*f*seat.turn.x+3*u*f*f*c2.x+f*f*f*head.x,
    y:u*u*u*seat.tail.y+3*u*u*f*seat.turn.y+3*u*f*f*c2.y+f*f*f*head.y};
  return {x:q.x+(target.x-q.x)*tuck,y:q.y+(target.y-q.y)*tuck};
}
export function bentPath(path,centre,anchor,amount,tail=0,tuck=0,seat=null){
  return path.points.map((p,i)=>{const q=tuckedPoint(p,p.d/path.length,centre,anchor,amount,tuck,seat),r=tailOffset(q.x,q.y,tail*(1-tuck));return `${i?'L':'M'}${r.x.toFixed(3)} ${r.y.toFixed(3)}`;}).join(' ');
}
export function nextState(state,family){
  if(family===SHELL)return state==='out'?'hidden':'out';
  if(family===BELL)return state==='hidden'?'peek':'out';
  return state;
}
export function actionFrame(ms,from,to,reduced=false){
  const duration=reduced?180:to==='hidden'?2450:from==='hidden'&&to==='peek'?1900:from!=='out'&&to==='out'?2900:1500;
  const progress=reduced?1:ease((ms-(to==='hidden'?100:350))/(duration-(to==='hidden'?250:550)));
  const ring=t=>{const x=ms-t;return x<0||x>1050?0:Math.sin(x/105)*Math.sin(Math.PI*clamp(x/1050))**2;};
  return {progress,ring:reduced?0:ring(140),answer:reduced||from==='out'||to!=='out'?0:ring(1510),done:ms>=duration};
}
function bellSound(){
  let context,buffer,loading,onset=0,level=.2;const voices=new Set();
  function stop(){for(const n of voices){try{n.stop();}catch{}}voices.clear();}
  function prepare(){
    try{const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return Promise.resolve();context??=new Audio();const unlocked=context.resume().catch(()=>{});
      if(!buffer&&!loading){const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),4000);
        loading=fetch(new URL('./assets/audio/praslin-small-bell.mp3',import.meta.url),{signal:controller.signal}).then(r=>{if(!r.ok)throw Error(r.status);return r.arrayBuffer();}).then(b=>context.decodeAudioData(b)).then(b=>{buffer=b;const samples=b.getChannelData(0);let peak=0;for(const value of samples)peak=Math.max(peak,Math.abs(value));const first=samples.findIndex(value=>Math.abs(value)>peak*.04);onset=Math.max(0,first/b.sampleRate-.008);level=Math.min(.6,.12/Math.max(.01,peak));}).catch(()=>{}).finally(()=>{clearTimeout(timeout);loading=null;});}
      return Promise.all([unlocked,loading]);
    }catch{return Promise.resolve();}
  }
  function play(answer=false){
    if(!buffer||context?.state!=='running')return;
    const n=context.createBufferSource(),gain=context.createGain(),now=context.currentTime,duration=Math.min(answer?.65:1.05,buffer.duration-onset),volume=level*(answer?.65:1);
    n.buffer=buffer;n.connect(gain);gain.connect(context.destination);gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(volume,now+.012);gain.gain.setValueAtTime(volume,now+duration-.12);gain.gain.linearRampToValueAtTime(0,now+duration);
    voices.add(n);n.onended=()=>{voices.delete(n);n.disconnect();gain.disconnect();};n.start(now,onset,duration);
  }
  return {prepare,play,stop};
}
export function createPraslinPlay(habitat,refresh=()=>{}){
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),sound=bellSound(),scenes=new Map(),actions=new Map();let raf=0,request=0;
  const visible=p=>p?.isConnected&&!p.closest('[hidden]');
  const find=(family,part)=>habitat.querySelector(`[data-accessory-family="${family}"][data-worm-part="${part}"]`);
  const handles=p=>p?.dataset.accessoryFamily===BELL||p?.dataset.accessoryFamily===SHELL;
  const state=part=>scenes.get(part)?.state??'out';
  const busy=part=>[...actions.values()].some(a=>a.parts.includes(part));
  const pause=(node,owner)=>{for(const a of node.getAnimations())if(a.playState==='running'){a.pause();owner.paused.push(a);}};
  function clearScene(part){
    const s=scenes.get(part);if(!s)return;
    for(const [n,v]of s.hidden){if(v===null)n.removeAttribute('visibility');else n.setAttribute('visibility',v);}
    s.paused.forEach(a=>{if(a.playState==='paused')a.play();});s.effects.remove();scenes.delete(part);
  }
  function cancel(){request++;cancelAnimationFrame(raf);raf=0;sound.stop();actions.clear();for(const part of [...scenes.keys()])clearScene(part);delete habitat.dataset.praslinState;refresh();}
  function build(part){
    if(scenes.has(part))return scenes.get(part);
    const root=habitat.querySelector('#worm-species'),male=part==='companion',body=habitat.querySelector(male?'#companion-worm > .companion-body':'#primary-worm > .worm-body');
    const shell=find(SHELL,part),s={part,state:'out',amount:0,tuck:0,hidden:[],paused:[]};pause(body,s);
    s.effects=add(root,'g',{'data-praslin-effects':part,'data-state':'out','aria-hidden':'true','pointer-events':'none'});
    if(male&&scenes.has('primary'))root.insertBefore(s.effects,scenes.get('primary').effects);
    const relative=n=>root.getScreenCTM().inverse().multiply(n.getScreenCTM());
    function copy(node){const m=relative(node),base=new DOMMatrix([m.a,m.b,m.c,m.d,m.e,m.f]),layer=add(s.effects,'g',{transform:matrix(base)}),clone=node.cloneNode(true);clone.removeAttribute('id');clone.removeAttribute('transform');clone.style.transform='none';clone.style.animation='none';layer.append(clone);s.hidden.push([node,node.getAttribute('visibility')]);node.setAttribute('visibility','hidden');return {layer,clone,base};}
    s.body=copy(body);const prefix=male?'companion':'worm';
    s.paths=[...s.body.clone.querySelectorAll(`.${prefix}-line,.${prefix}-shadow,.${prefix}-highlight`)].map(node=>({node,path:measurePath(node.getAttribute('d'))}));
    s.line=s.paths.find(p=>p.node.classList.contains(`${prefix}-line`)).path;s.tip=pointAt(s.line,1);s.anchor=pointAt(s.line,.32);
    s.face=add(s.body.clone,'g',{'data-praslin-face':''});for(const n of [...s.body.clone.querySelectorAll('circle,.worm-smile')])s.face.append(n);
    const cap=find(CAP,part);if(visible(cap))s.cap=copy(cap.querySelector('.location-accessory-art'));
    if(visible(shell)){
      const art=shell.querySelector('.location-accessory-art');
      const shellToBody=body.getScreenCTM().inverse().multiply(art.getScreenCTM()),at=(x,y)=>new DOMPoint(x,y).matrixTransform(shellToBody);
      s.centre=at(0,0);s.seat={tail:at(male?-87:-101,male?48:63),turn:at(-12,38),head:s.tip};s.shell=copy(art);
    }else s.centre={x:230,y:130};
    const bell=find(BELL,part);if(visible(bell))s.bell=copy(bell.querySelector('.location-accessory-art'));
    if(s.bell){s.bellOrigin=new DOMPoint(0,0).matrixTransform(s.body.base.inverse().multiply(s.bell.base));if(s.shell)s.effects.insertBefore(s.bell.layer,s.shell.layer);}
    s.bells=s.bell?[...s.bell.clone.querySelectorAll('.praslin-bracelet-bell')].map(n=>({node:n.parentNode,base:n.parentNode.getAttribute('transform')})):[];
    // Preserve the exact original male tail outline while gently ringing.
    const tail=s.body.clone.querySelector('.male-tail');if(tail)s.tail={node:tail,path:measurePath(tail.getAttribute('d'))};
    scenes.set(part,s);return s;
  }
  function pose(s,amount,ring=0,tuck=s.tuck){
    s.amount=amount;s.tuck=tuck;
    for(const p of s.paths){
      const tip=pointAt(p.path,1),offset={x:tip.x-s.tip.x,y:tip.y-s.tip.y},centre={x:s.centre.x+offset.x,y:s.centre.y+offset.y};
      const shifted=q=>({x:q.x+offset.x,y:q.y+offset.y}),seat=s.seat?{tail:shifted(s.seat.tail),turn:shifted(s.seat.turn),head:tip}:null;
      p.node.setAttribute('d',bentPath(p.path,centre,pointAt(p.path,.32),amount,ring,tuck,seat));
    }
    if(s.tail){
      const base=s.line.points[0],tip=tuckedPoint(base,0,s.centre,s.anchor,amount,tuck,s.seat),scale=1-tuck*.65;
      s.tail.node.setAttribute('d',s.tail.path.points.map((p,i)=>{const q=tailOffset(tip.x+(p.x-base.x)*scale,tip.y+(p.y-base.y)*scale,ring*(1-tuck));return `${i?'L':'M'}${q.x} ${q.y}`;}).join(' ')+' Z');
    }
    const tip=foldedPoint(s.tip,1,s.centre,s.anchor,amount),dx=tip.x-s.tip.x,dy=tip.y-s.tip.y,angle=18*Math.sin(Math.PI*amount)+amount*8;
    const head=new DOMMatrix().translate(dx,dy).translate(s.tip.x,s.tip.y).rotate(angle).translate(-s.tip.x,-s.tip.y);
    s.face.setAttribute('transform',matrix(head));
    if(s.cap)s.cap.layer.setAttribute('transform',matrix(s.body.base.multiply(head).multiply(s.body.base.inverse()).multiply(s.cap.base)));
    if(s.bell&&s.seat){const b=s.body.base,dx=(s.centre.x-s.bellOrigin.x)*tuck,dy=(s.centre.y-s.bellOrigin.y)*tuck;
      s.bell.layer.setAttribute('transform',`translate(${b.a*dx+b.c*dy} ${b.b*dx+b.d*dy}) ${matrix(s.bell.base)}`);}
    s.bells.forEach((b,i)=>b.node.setAttribute('transform',`${b.base} rotate(${ring*(i===1?21:15)} 0 0)`));
  }
  function tick(now){
    raf=0;if(document.hidden){cancel();return;}
    for(const [part,a]of [...actions]){
      if(!visible(a.piece)){cancel();return;}
      const ms=now-a.started,f=actionFrame(ms,a.from,a.to,reduced.matches),amount=a.fromAmount+(a.toAmount-a.fromAmount)*f.progress;
      const rear=a.to==='hidden'?ease((f.progress-.2)/.8):f.progress,tuck=a.fromTuck+(a.toTuck-a.fromTuck)*rear;
      pose(a.target,amount,a.kind===BELL?f.answer:0,tuck);
      if(a.kind===BELL){
        pose(a.actor,a.actor.amount,f.ring);
        if(ms>=220&&!a.played){a.played=true;if(!reduced.matches)sound.play();}
        if(ms>=1630&&a.from!=='out'&&a.to==='out'&&!a.answered){a.answered=true;if(!reduced.matches)sound.play(true);}
      }
      if(f.done){a.target.state=a.to;a.target.effects.dataset.state=a.to;pose(a.target,a.toAmount,0,a.toTuck);if(a.actor!==a.target)pose(a.actor,a.actor.amount);actions.delete(part);}
    }
    for(const [part,s]of scenes)if(s.state==='out'&&!busy(part))clearScene(part);
    habitat.dataset.praslinState=['primary','companion'].map(p=>`${p}:${state(p)}`).join(' ');
    if(actions.size)raf=requestAnimationFrame(tick);else refresh();
  }
  function animate(piece){
    const part=piece.dataset.wormPart,kind=piece.dataset.accessoryFamily,other=part==='primary'?'companion':'primary',targetPart=kind===SHELL?part:other;
    const parts=kind===SHELL?[part]:[part,other];if(parts.some(busy))return;
    const from=state(targetPart),to=nextState(from,kind),target=build(targetPart),actor=kind===SHELL?target:build(part);
    const a={piece,kind,parts,from,to,target,actor,started:performance.now(),fromAmount:target.amount,fromTuck:target.tuck,toTuck:to==='out'?0:1,toAmount:to==='hidden'?1:to==='peek'?.30:0};
    actions.set(part,a);target.effects.dataset.state=to;
    if(!raf)raf=requestAnimationFrame(tick);
  }
  function start(piece){
    if(!handles(piece)||!visible(piece))return false;
    const token=request;
    if(piece.dataset.accessoryFamily===SHELL){if(!reduced.matches)sound.prepare();animate(piece);return true;}
    Promise.resolve(reduced.matches?null:sound.prepare()).then(()=>{if(token===request&&visible(piece)&&!document.hidden)animate(piece);});return true;
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});window.addEventListener('resize',cancel);window.addEventListener('pagehide',cancel);reduced.addEventListener('change',cancel);
  return {handles,start,cancel,get active(){return !!scenes.size||!!actions.size;}};
}
