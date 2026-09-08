import { bookPage, insideCover, SPREADS, SMALL_REFLECTION } from './claremont-book-art.js?v=20260909-wormbook-4';
const NS='http://www.w3.org/2000/svg';
export const BOOK='eca250-bookworm-book', LEMONADE='eca250-california-lemonade';
const clamp=n=>Math.max(0,Math.min(1,n));
const ease=n=>{n=clamp(n);return n*n*(3-2*n);};
const make=(tag,attrs={})=>{const n=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,v);return n;};
const path=(d,attrs={})=>make('path',{d,...attrs});
let serial=0;
export const nextBookPage=(index,small=false)=>small?(index% (SPREADS.length-1))+1:(index+1)%SPREADS.length;
export const pageDuration=(small,opening)=>small?(opening?920:780):680;

export function leafPose(progress,small=false){
  const p=ease(progress),scale=Math.cos(Math.PI*p)*(1-.06*Math.sin(Math.PI*p));
  return {scale,skew:-.14*Math.sin(Math.PI*p),back:p>.5,hinge:small?-73:-9};
}
export function pourFrame(ms){
  return {approach:ease(ms/550),tilt:ease((ms-350)/450)*(1-ease((ms-1950)/350)),
    fill:ease((ms-800)/1150),returning:ease((ms-2300)/600),flow:ms>800&&ms<1950,done:ms>=2900};
}
export function lemonadeLevels(servings){return {cup:1-16*Math.min(2,Math.max(0,servings)),jug:-8+8*Math.min(2,Math.max(0,servings))};}
export function sipFrame(ms,small=false){
  const t=ms/(small?1450:1700),arrive=.36,leave=.67;
  return {reach:t<arrive?ease(t/arrive):1-ease((t-leave)/(1-leave)),contact:t>=arrive&&t<=leave,consumed:ease((t-arrive)/(leave-arrive)),done:t>=1};
}
export function soundProfile(kind){return kind==='paper'?{duration:.17,volume:.024}:kind==='slurp'?{duration:.28,volume:.038}:{duration:.65,volume:.036};}
export function waterPolygon(level,slope,small=false){
  const box=small?[-54,-55,52,77]:[-77,-89,65,108],cx=small?0:-5;
  const corners=[[box[0],box[1]],[box[2],box[1]],[box[2],box[3]],[box[0],box[3]]],out=[];
  const depth=p=>p[1]-level-slope*(p[0]-cx);
  for(let i=0;i<4;i++){
    const a=corners[i],b=corners[(i+1)%4],da=depth(a),db=depth(b);
    if(da>=0)out.push(a);
    if((da>=0)!==(db>=0)){const t=da/(da-db);out.push([a[0]+t*(b[0]-a[0]),a[1]+t*(b[1]-a[1])]);}
  }
  return out;
}

// Original, quiet foley. Sources are created only after a user gesture.
export function createReadingSound(){
  let ctx,voices=[];
  function stop(){for(const v of voices){try{v.source.stop();}catch{}v.nodes.forEach(n=>n.disconnect());}voices=[];}
  function prepare(){try{const A=window.AudioContext||window.webkitAudioContext;if(!A)return;if(!ctx||ctx.state==='closed')ctx=new A();return ctx.resume();}catch{}}
  function play(kind){
    if(!ctx||ctx.state!=='running'||document.hidden)return false;
    stop();const {duration,volume}=soundProfile(kind),at=ctx.currentTime;
    const source=ctx.createBufferSource(),buffer=ctx.createBuffer(1,Math.ceil(ctx.sampleRate*duration),ctx.sampleRate),data=buffer.getChannelData(0);
    for(let i=0;i<data.length;i++){
      const t=i/ctx.sampleRate,tau=t%.13;
      data[i]=kind==='paper'?(Math.random()*2-1)*Math.sin(Math.PI*t/duration)**2:kind==='slurp'?
        (Math.random()*2-1)*(.25+.6*Math.sin(Math.PI*t/duration)**2)+.2*Math.sin(2*Math.PI*(600*t+900*t*t)):
        (Math.random()*2-1)*.36+.5*Math.sin(2*Math.PI*(900*tau-1800*tau*tau))*Math.exp(-45*tau);
    }
    source.buffer=buffer;const filter=ctx.createBiquadFilter(),gain=ctx.createGain();
    filter.type=kind==='paper'||kind==='slurp'?'bandpass':'lowpass';filter.frequency.value=kind==='paper'?2600:kind==='slurp'?1250:1300;filter.Q.value=kind==='slurp'?1.8:.6;
    gain.gain.setValueAtTime(0,at);gain.gain.linearRampToValueAtTime(volume,at+.025);
    gain.gain.setValueAtTime(volume,at+duration*.6);gain.gain.linearRampToValueAtTime(0,at+duration);
    source.connect(filter);filter.connect(gain);gain.connect(ctx.destination);
    const entry={source,nodes:[source,filter,gain]};voices.push(entry);
    source.onended=()=>{entry.nodes.forEach(n=>n.disconnect());voices=voices.filter(v=>v!==entry);};
    source.start(at);source.stop(at+duration);return true;
  }
  return {prepare,play,stop};
}


export function createClaremontPlay(habitat,onChange=()=>{}){
  const sound=createReadingSound(),reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const books=new Map(),fluids=new Map(),origins=new Map(),sips={primary:0,companion:0};let run=null,raf=0,servings=0,soundRequest=0;
  const handles=p=>[BOOK,LEMONADE].includes(p?.dataset.accessoryFamily);
  const visible=p=>p?.isConnected&&!p.closest('[hidden]');
  const artOf=p=>p?.querySelector('.location-accessory-art');
  const pair=part=>habitat.querySelector(`[data-accessory-family="${LEMONADE}"][data-worm-part="${part}"]`);
  // Opening a cover changes its bounds. Keep the original scale pivot so the
  // user's size and position do not jump with those changing bounds.
  function lockOrigin(piece){
    if(origins.has(piece))return;
    const saved=[piece,artOf(piece)].map(node=>{
      const box=node.getBBox();
      return {node,box,values:['transform-box','transform-origin'].map(key=>[key,node.style.getPropertyValue(key),node.style.getPropertyPriority(key)])};
    });
    for(const {node,box} of saved){node.style.setProperty('transform-box','view-box');node.style.setProperty('transform-origin',`${box.x+box.width/2}px ${box.y+box.height/2}px`);}
    origins.set(piece,saved);
  }
  function releaseOrigin(piece){for(const saved of origins.get(piece)||[])for(const [key,value,priority] of saved.values){if(value)saved.node.style.setProperty(key,value,priority);else saved.node.style.removeProperty(key);}origins.delete(piece);}
  function cancel(){soundRequest++;cancelAnimationFrame(raf);raf=0;sound.stop();if(run){const old=run;run=null;old.restore();onChange();}}
  function immediateSound(kind){const token=soundRequest;Promise.resolve(sound.prepare()).then(()=>{if(token===soundRequest&&!document.hidden)sound.play(kind);}).catch(()=>{});}
  function bookState(piece){
    if(books.has(piece))return books.get(piece);
    lockOrigin(piece);const art=artOf(piece),small=piece.dataset.wormPart==='companion';
    const contents=[art.querySelector('[data-book-content]')];
    const s={piece,art,small,contents,index:0,layer:null,original:contents.map(n=>n.getAttribute('visibility'))};books.set(piece,s);return s;
  }
  function hideContents(s,hide){s.contents.forEach((n,i)=>{if(hide)n.setAttribute('visibility','hidden');else if(s.original[i]===null)n.removeAttribute('visibility');else n.setAttribute('visibility',s.original[i]);});}
  function surface(s,index,side){return bookPage(s.small,index,side);}
  function smallBack(){return insideCover();}
  function folded(g,pose,small){
    const h=pose.hinge,k=small?.062:0;
    // Hinge follows the sloping binding of the small hardback.
    g.setAttribute('transform',`translate(${h} 0) skewX(${Math.atan(k)*180/Math.PI}) matrix(${pose.scale} ${pose.skew} 0 1 0 0) skewX(${-Math.atan(k)*180/Math.PI}) translate(${-h} 0)`);
  }
  function paintBook(s,index){
    s.layer?.remove();s.layer=null;hideContents(s,index!==0);
    if(index===0)return;
    const layer=make('g',{'data-reading-pages':String(index),'pointer-events':'none','aria-hidden':'true'});
    if(s.small){const cover=smallBack(s);folded(cover,leafPose(1,true),true);layer.append(cover,surface(s,index,'left'),surface(s,index,'right'));}
    else layer.append(surface(s,index,'left'),surface(s,index,'right'));
    const anchor=s.art.querySelector('[data-book-binding]');anchor.before(layer);s.layer=layer;
  }
  function turnBook(piece){
    cancel();const s=bookState(piece),previous=s.index,next=nextBookPage(previous,s.small),opening=s.small&&previous===0;
    if(reduced.matches){s.index=next;paintBook(s,next);onChange();immediateSound('paper');return true;}
    paintBook(s,next);
    if(opening){s.layer.children[0].setAttribute('visibility','hidden');s.layer.children[1].setAttribute('visibility','hidden');}
    const stillLeft=s.small?(previous>0?surface(s,previous,'left'):null):surface(s,previous,'left');
    const turning=make('g',{'data-turning-page':'','pointer-events':'none'}),front=make('g'),back=make('g');
    if(opening){for(const n of s.contents){const c=n.cloneNode(true);c.removeAttribute('visibility');front.append(c);}back.append(smallBack(s));const endpaper=surface(s,next,'left');endpaper.setAttribute('transform',SMALL_REFLECTION);back.append(endpaper);}
    else {front.append(surface(s,previous,'right'));back.append(surface(s,next,'left'));back.setAttribute('transform',s.small?SMALL_REFLECTION:'translate(-18 0) scale(-1 1)');}
    turning.append(front,back);if(stillLeft)s.art.append(stillLeft);s.art.append(turning);
    const started=performance.now(),r={piece,restore(){turning.remove();stillLeft?.remove();paintBook(s,s.index);delete piece.dataset.readingActive;}};
    run=r;piece.dataset.readingActive='page';
    Promise.resolve(sound.prepare()).then(()=>{if(run===r)sound.play('paper');}).catch(()=>{});
    function tick(now){if(run!==r)return;if(!visible(piece)){cancel();return;}const t=clamp((now-started)/pageDuration(s.small,opening)),pose=leafPose(t,s.small);
      if(opening)pose.skew*=.25;
      folded(turning,pose,s.small);front.setAttribute('display',pose.back?'none':'inline');back.setAttribute('display',pose.back?'inline':'none');
      turning.setAttribute('opacity',String(1-.12*Math.sin(Math.PI*t)));
      if(t===1){s.index=next;cancel();return;}raf=requestAnimationFrame(tick);
    }raf=requestAnimationFrame(tick);return true;
  }
  function fluid(piece,level){
    if(!visible(piece))return;lockOrigin(piece);let f=fluids.get(piece);const art=artOf(piece),small=piece.dataset.wormPart==='companion';
    if(!f){
      const original=[...art.querySelectorAll('.eca250-lemonade-liquid,.eca250-liquid-surface')];
      const layer=make('g',{'data-lemonade-fill':'','pointer-events':'none'}),id=`claremont-glass-${++serial}`,defs=make('defs'),clip=make('clipPath',{id});
      clip.append(path(small?'M-54-45Q0-56 52-44L45 66Q0 77-46 65Z':'M-77-72Q-8-90 65-67L59 88Q-5 108-68 86Z'));defs.append(clip);
      const clipped=make('g',{'clip-path':`url(#${id})`}),liquid=path('',{fill:'rgba(245,200,75,.76)',stroke:'#c99d30','stroke-width':2}),top=make('ellipse',{fill:'#ffeb8b',stroke:'#c99d30','stroke-width':2});
      clipped.append(liquid,top);layer.append(defs,clipped);original[0].before(layer);
      f={original,vis:original.map(n=>n.getAttribute('visibility')),layer,liquid,top};original.forEach(n=>n.setAttribute('visibility','hidden'));fluids.set(piece,f);
    }
    const m=art.getScreenCTM(),slope=m?-m.b/m.d:0,cx=small?0:-5;
    const polygon=waterPolygon(level,slope,small);
    f.liquid.setAttribute('d',polygon.length?'M'+polygon.map(p=>p.join(' ')).join('L')+'Z':'');
    const surfacePoints=polygon.filter(p=>Math.abs(p[1]-level-slope*(p[0]-cx))<.01);
    const x1=surfacePoints[0]?.[0]??cx,x2=surfacePoints[1]?.[0]??cx,mid=(x1+x2)/2;
    f.top.setAttribute('cx',mid);f.top.setAttribute('cy',level);f.top.setAttribute('rx',Math.abs(x2-x1)/2);f.top.setAttribute('ry',small?5:6);
    f.top.setAttribute('transform',`translate(0 ${-slope*cx}) matrix(1 ${slope} 0 1 0 0)`);
    f.layer.dataset.lemonadeLevel=String(level);
  }
  function clearFluids(){for(const [piece,f] of fluids){f.layer.remove();f.original.forEach((n,i)=>{if(f.vis[i]===null)n.removeAttribute('visibility');else n.setAttribute('visibility',f.vis[i]);});releaseOrigin(piece);}fluids.clear();releaseOrigin(pair('primary'));releaseOrigin(pair('companion'));}
  function levels(amount){const l=lemonadeLevels(amount);fluid(pair('primary'),Math.min(76,l.jug+6*sips.primary));fluid(pair('companion'),Math.min(60,l.cup+10*sips.companion));}
  function restoreLevels(){if(servings||sips.primary||sips.companion)levels(servings);else clearFluids();}
  const point=(node,x,y,parent)=>new DOMPoint(x,y).matrixTransform(parent.getScreenCTM().inverse().multiply(node.getScreenCTM()));
  function pour(){
    cancel();const jug=pair('primary'),cup=pair('companion');if(!visible(jug)||!visible(cup)||servings>=2)return false;
    lockOrigin(jug);lockOrigin(cup);
    if(reduced.matches){levels(++servings);immediateSound('pour');return true;}
    const art=artOf(jug),glass=artOf(cup),original=art.getAttribute('transform'),wrapper=make('g',{'data-pouring-jug':''});art.before(wrapper);wrapper.append(art);
    const shadow=art.querySelector('.eca250-ground-shadow'),shadowVisibility=shadow?.getAttribute('visibility');shadow?.setAttribute('visibility','hidden');
    const svg=jug.ownerSVGElement,streamLayer=make('g',{'data-lemonade-stream':'','aria-hidden':'true','pointer-events':'none'}),stream=path('',{fill:'none',stroke:'#e9bd48','stroke-width':3,'stroke-linecap':'round'}),shine=path('',{fill:'none',stroke:'#fff0b0','stroke-width':1.1});
    streamLayer.append(stream,shine);svg.append(streamLayer);
    const start=performance.now(),r={piece:jug,restore(){art.setAttribute('transform',original);wrapper.replaceWith(art);streamLayer.remove();if(shadow){if(shadowVisibility===null)shadow.removeAttribute('visibility');else shadow.setAttribute('visibility',shadowVisibility);}restoreLevels();delete jug.dataset.readingActive;}};
    run=r;jug.dataset.readingActive='pour';Promise.resolve(sound.prepare()).catch(()=>{});let played=false;
    function tick(now){
      if(run!==r)return;if(!visible(jug)||!visible(cup)){cancel();return;}const ms=now-start,f=pourFrame(ms);
      art.setAttribute('transform',`${original} rotate(${-55*f.tilt} -84 -76)`);wrapper.removeAttribute('transform');
      const target=point(glass,0,-48,wrapper.parentElement),tip=point(art,-84,-76,wrapper.parentElement),screenUnit=habitat.getBoundingClientRect().height/430;
      const parentScale=Math.hypot(wrapper.parentElement.getScreenCTM().c,wrapper.parentElement.getScreenCTM().d);
      const weight=f.approach*(1-f.returning);
      wrapper.setAttribute('transform',`translate(${(target.x-tip.x)*weight} ${(target.y-tip.y-22*screenUnit/parentScale)*weight})`);
      levels(servings+f.fill);
      const a=point(art,-84,-76,streamLayer),b=point(glass,0,-43,streamLayer);
      const d=`M${a.x} ${a.y}Q${a.x+5} ${(a.y+b.y)/2} ${b.x} ${b.y}`;stream.setAttribute('d',d);shine.setAttribute('d',d);
      streamLayer.setAttribute('opacity',f.flow?'1':'0');
      if(f.flow&&!played){played=true;sound.play('pour');}
      if(f.done){servings++;cancel();return;}raf=requestAnimationFrame(tick);
    }raf=requestAnimationFrame(tick);return true;
  }
  function sip(piece){
    cancel();const part=piece.dataset.wormPart,small=part==='companion';
    const mouth=habitat.querySelector(small?'#companion-worm .worm-smile':'#primary-worm .worm-smile');
    if(!mouth)return false;
    const base=lemonadeLevels(servings),level=small?base.cup+10*sips.companion:base.jug+6*sips.primary,limit=small?60:76;
    if(level>=limit)return false;
    if(reduced.matches){sips[part]++;levels(servings);immediateSound('slurp');return true;}
    lockOrigin(piece);const art=artOf(piece),wrapper=make('g',{'data-sipping-drink':''});art.before(wrapper);wrapper.append(art);
    const shadow=art.querySelector('.eca250-ground-shadow'),shadowVis=shadow?.getAttribute('visibility'),mouthVis=mouth.getAttribute('visibility');
    shadow?.setAttribute('visibility','hidden');
    const lips=make('ellipse',{cx:331,cy:77,rx:3.2,ry:2.1,fill:'#284653',stroke:'#a96e59','stroke-width':.8,'data-slurp-mouth':'','pointer-events':'none',opacity:0});mouth.after(lips);
    const bead=make('circle',{r:small?1.8:2.3,fill:'#fff4b6',opacity:0,'pointer-events':'none'});art.append(bead);
    const end=small?[63,-96]:[77,-142],begin=small?[25,-50]:[17,-78];
    const started=performance.now(),r={piece,restore(){wrapper.replaceWith(art);lips.remove();bead.remove();if(mouthVis===null)mouth.removeAttribute('visibility');else mouth.setAttribute('visibility',mouthVis);if(shadow){if(shadowVis===null)shadow.removeAttribute('visibility');else shadow.setAttribute('visibility',shadowVis);}restoreLevels();delete piece.dataset.readingActive;}};
    run=r;piece.dataset.readingActive='sip';Promise.resolve(sound.prepare()).catch(()=>{});let played=false;
    function tick(now){
      if(run!==r)return;if(!visible(piece)){cancel();return;}const ms=now-started,f=sipFrame(ms,small);
      wrapper.removeAttribute('transform');const target=point(mouth,331,77,wrapper.parentElement),tip=point(art,...end,wrapper.parentElement);
      wrapper.setAttribute('transform',`translate(${(target.x-tip.x)*f.reach} ${(target.y-tip.y)*f.reach})`);
      lips.setAttribute('opacity',f.contact?'1':'0');lips.setAttribute('rx',String(3.2-.5*Math.sin(ms*.04)));
      if(f.contact)mouth.setAttribute('visibility','hidden');else if(mouthVis===null)mouth.removeAttribute('visibility');else mouth.setAttribute('visibility',mouthVis);
      const b=(ms%180)/180;bead.setAttribute('cx',begin[0]+(end[0]-begin[0])*b);bead.setAttribute('cy',begin[1]+(end[1]-begin[1])*b);bead.setAttribute('opacity',f.contact?'.85':'0');
      fluid(piece,Math.min(limit,level+(small?10:6)*f.consumed));
      if(f.contact&&!played){played=true;sound.play('slurp');}
      if(f.done){sips[part]++;cancel();return;}raf=requestAnimationFrame(tick);
    }raf=requestAnimationFrame(tick);return true;
  }
  function start(piece,pourRequested=false){if(!handles(piece)||!visible(piece)||document.hidden)return false;if(run?.piece===piece){cancel();return true;}return piece.dataset.accessoryFamily===BOOK?turnBook(piece):pourRequested?pour():sip(piece);}
  function drop(piece){
    if(piece?.dataset.accessoryFamily!==LEMONADE||piece.dataset.wormPart!=='primary')return false;
    const cup=pair('companion');if(!visible(cup))return false;
    const a=artOf(piece).getBoundingClientRect(),b=artOf(cup).getBoundingClientRect(),unit=habitat.getBoundingClientRect().width/600;
    return Math.hypot(a.x+a.width/2-b.x-b.width/2,a.y+a.height/2-b.y-b.height/2)<130*unit?pour():false;
  }
  function reset(piece){cancel();if(piece?.dataset.accessoryFamily===LEMONADE){servings=0;sips.primary=sips.companion=0;clearFluids();}const s=books.get(piece);if(s){s.index=0;paintBook(s,0);books.delete(piece);releaseOrigin(piece);}onChange();}
  function clear(){cancel();for(const s of books.values()){s.index=0;paintBook(s,0);releaseOrigin(s.piece);}books.clear();servings=0;sips.primary=sips.companion=0;clearFluids();}
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});document.addEventListener('keydown',e=>{if(e.key==='Escape')cancel();});
  window.addEventListener('resize',cancel);window.addEventListener('pagehide',clear);reduced.addEventListener('change',cancel);
  return {handles,start,drop,cancel,clear,reset,get active(){return !!run;}};
}
