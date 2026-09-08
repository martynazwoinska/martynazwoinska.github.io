// Original miniature phrases and synthesized reeds, not a sampled performance.
export const PIPE_FAMILY = 'great-highland-bagpipes';
export function pipeScore(male=false) {
  const notes=male?[4,5,4,2,1,2,0]:[0,2,4,5,4,2,1,0];
  const lengths=male?[.28,.28,.42,.28,.28,.42,.72]:[.42,.28,.28,.56,.28,.28,.42,.72];
  let at=.55;
  return notes.map((note,i)=>{const entry={at,note,duration:lengths[i]};at+=lengths[i];return entry;});
}
export function pipeDuration(male=false) {const last=pipeScore(male).at(-1);return last.at+last.duration+.7;}
export function pipeMotion(seconds,male=false,reduced=false) {
  const end=pipeDuration(male), smooth=x=>{x=Math.min(1,Math.max(0,x));return x*x*(3-2*x);};
  const hold=reduced?0:smooth(seconds/.5)*(1-smooth((seconds-end+.5)/.5));
  const note=pipeScore(male).findLast(n=>n.at<=seconds)?.note??0;
  return {hold,squeeze:hold*.018*(.5+.5*Math.sin(seconds*8)),finger:note%3};
}

export function createPipeAudio() {
  let audio=null, run=null;
  function stop() {
    if(!run)return;
    const old=run;run=null;
    const now=audio.currentTime;
    if(old.bus.gain.cancelAndHoldAtTime)old.bus.gain.cancelAndHoldAtTime(now);
    else old.bus.gain.cancelScheduledValues(now);
    old.bus.gain.setTargetAtTime(0,now,.008);
    old.voices.forEach(v=>{try{v.stop(now+.04);}catch{}});
  }
  function prepare() {
    try {
      const Audio=window.AudioContext||window.webkitAudioContext;
      if(!Audio)return;
      if(!audio||audio.state==='closed')audio=new Audio();
      return audio.resume();
    } catch { return Promise.resolve(); }
  }
  function play(male=false) {
    if(!audio||audio.state!=='running'||document.hidden)return false;
    stop();
    const bus=audio.createGain(), start=audio.currentTime, end=start+pipeDuration(male)-.2;
    bus.connect(audio.destination);bus.gain.setValueAtTime(0,start);
    bus.gain.linearRampToValueAtTime(.14,start+.23);
    bus.gain.setValueAtTime(.14,end-.25);bus.gain.linearRampToValueAtTime(0,end);
    const current={bus,voices:[]};run=current;let alive=4;
    const voice=(hz,level,reed)=>{
      const osc=audio.createOscillator(), gain=audio.createGain();
      const real=new Float32Array(13),imag=new Float32Array(13);
      for(let i=1;i<13;i++)imag[i]=(reed?(i%2?.8:.43):.55)/Math.pow(i,reed?.92:1.45);
      osc.setPeriodicWave(audio.createPeriodicWave(real,imag));
      osc.frequency.setValueAtTime(hz,start);gain.gain.value=level;
      osc.connect(gain);gain.connect(bus);
      osc.onended=()=>{osc.disconnect();gain.disconnect();if(--alive===0){bus.disconnect();if(run===current)run=null;}};
      current.voices.push(osc);return {osc,gain};
    };
    // One bass and two tenor drones below the continuous chanter.
    const tonic=466.16;
    [tonic/4,tonic/2,tonic/2*1.0006].forEach((hz,i)=>{
      const v=voice(hz,i?.21:.28,false);v.osc.start(start);v.osc.stop(end+.02);
    });
    const chanter=voice(tonic,.65,true);
    chanter.gain.gain.setValueAtTime(0,start);
    chanter.gain.gain.setValueAtTime(0,start+.515);
    chanter.gain.gain.linearRampToValueAtTime(.65,start+.53);
    const ratios=[1,9/8,5/4,4/3,3/2,5/3,7/4,2];
    const score=pipeScore(male);
    score.forEach((note,i)=>{
      const at=start+note.at;
      if(i)chanter.osc.frequency.setValueAtTime(tonic*2,at-.025);
      chanter.osc.frequency.setValueAtTime(tonic*ratios[note.note],at);
    });
    const finish=start+score.at(-1).at+score.at(-1).duration;
    chanter.gain.gain.setValueAtTime(.65,finish-.04);
    chanter.gain.gain.linearRampToValueAtTime(0,finish+.08);
    chanter.osc.start(start);chanter.osc.stop(end+.02);return true;
  }
  return {prepare,play,stop};
}

export function createEdinburghPipes(habitat) {
  const sound=createPipeAudio(), reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let active=null,frame=0;
  const handles=p=>p?.dataset.accessoryFamily===PIPE_FAMILY;
  function cancel() {
    cancelAnimationFrame(frame);frame=0;sound.stop();
    if(!active)return;
    const r=active;active=null;
    r.blow.setAttribute('transform',r.originalBlow);
    r.wrapper.replaceWith(r.art);r.hands.remove();delete r.piece.dataset.pipesPlaying;
  }
  function start(piece) {
    if(!handles(piece)||!piece.isConnected||piece.closest('[hidden]')||document.hidden)return false;
    if(active?.piece===piece){cancel();return true;}
    cancel();
    const art=piece.querySelector('.location-accessory-art'), mouthpiece=art?.querySelector('.efr-blowpipe-mouthpiece');
    if(!mouthpiece)return false;
    const male=piece.dataset.wormPart==='companion', blow=mouthpiece.parentElement;
    const ns='http://www.w3.org/2000/svg', wrapper=document.createElementNS(ns,'g');
    wrapper.dataset.pipeMotion='';art.before(wrapper);wrapper.append(art);
    const hands=document.createElementNS(ns,'g');hands.setAttribute('pointer-events','none');hands.setAttribute('aria-hidden','true');
    const chanter=art.querySelector('.efr-chanter-body').parentElement;chanter.append(hands);
    // Temporary finger pads grip the chanter, leaving the resting drawing intact.
    for(const y of (male?[29,54]:[35,72]))for(let i=0;i<3;i++){
      const finger=document.createElementNS(ns,'path');
      finger.setAttribute('d',`M-13 ${y+i*4}Q-5 ${y-4+i*4} 7 ${y+i*4}`);
      finger.setAttribute('fill','none');finger.setAttribute('stroke','#e9cb92');
      finger.setAttribute('stroke-width','5');finger.setAttribute('stroke-linecap','round');hands.append(finger);
    }
    const r={piece,art,wrapper,blow,hands,male,originalBlow:blow.getAttribute('transform'),began:performance.now()};
    active=r;piece.dataset.pipesPlaying='true';
    Promise.resolve(sound.prepare()).then(()=>{
      if(active===r&&!document.hidden&&performance.now()-r.began<300)sound.play(male);
    }).catch(()=>{});
    const body=habitat.querySelector(male?'#companion-worm .companion-body':'#primary-worm .worm-body');
    function tick(now) {
      if(active!==r)return;
      if(!piece.isConnected||piece.closest('[hidden]')){cancel();return;}
      const seconds=(now-r.began)/1000;
      if(seconds>=pipeDuration(male)){cancel();return;}
      const pose=pipeMotion(seconds,male,reduced.matches);
      const angle=(male?51:49)*(1-pose.hold)-60*pose.hold;
      blow.setAttribute('transform',`translate(${male?43:56} ${male?-31:-38}) rotate(${angle})`);
      wrapper.setAttribute('transform',`scale(${1-pose.squeeze} 1)`);
      if(pose.hold){
        const inverse=wrapper.parentElement.getScreenCTM().inverse();
        const mouth=new DOMPoint(331,73).matrixTransform(inverse.multiply(body.getScreenCTM()));
        const tip=new DOMPoint(male?82:102,0).matrixTransform(inverse.multiply(blow.getScreenCTM()));
        wrapper.setAttribute('transform',`translate(${(mouth.x-tip.x)*pose.hold} ${(mouth.y-tip.y)*pose.hold}) scale(${1-pose.squeeze} 1)`);
      }
      hands.setAttribute('opacity',reduced.matches?'0':String(pose.hold));
      [...hands.children].forEach((finger,i)=>finger.setAttribute('transform',`translate(${i%3===pose.finger?-2:0} 0)`));
      frame=requestAnimationFrame(tick);
    }
    frame=requestAnimationFrame(tick);return true;
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')cancel();});
  window.addEventListener('pagehide',cancel);window.addEventListener('resize',cancel);
  reduced.addEventListener('change',cancel);
  return {start,cancel,handles,get active(){return !!active;}};
}
