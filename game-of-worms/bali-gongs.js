// Original synthesized percussion, not a recording or a claim of traditional tuning.
export const GONG_FAMILY = 'ju1873-balinese-gamelan-gong';
export function gongScore(male) {
  return male
    ? [{at:180, index:0, hz:286, decay:1.65}, {at:570, index:1, hz:341, decay:1.5}]
    : [{at:180, index:0, hz:112, decay:3.3}];
}

export function gongMotion(ms, male, index, reduced = false) {
  const hit=gongScore(male)[index], t=ms-hit.at;
  if(reduced)return {x:0,y:0,vibration:0};
  // Approach the existing boss, rebound, then return to the exact resting pose.
  const travel=t<0 ? Math.max(0,1+t/180)**2 : Math.max(0,1-t/290)**2;
  const dx=male ? (index===0?28:-14) : -81;
  const dy=male ? (index===0?39:42) : -3;
  const vibration=t<0?0:Math.sin(t/26)*Math.exp(-t/580)*(male?.75:1.7);
  return {x:travel?dx*travel:0,y:travel?dy*travel:0,vibration};
}

export function createBaliGongs(habitat) {
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let audio=null, active=null, frame=0;
  function cancel() {
    cancelAnimationFrame(frame); frame=0;
    if(!active)return;
    for(const [node,transform] of active.originals) {
      if(transform===null)node.removeAttribute('transform');
      else node.setAttribute('transform',transform);
    }
    for(const voice of active.voices) {
      // A short release avoids clicks, including when a second instrument starts.
      const now=audio.currentTime;
      voice.bus.gain.cancelScheduledValues(now);
      voice.bus.gain.setTargetAtTime(0,now,.008);
      voice.oscillators.forEach(osc=>osc.stop(now+.04));
    }
    delete active.piece.dataset.gongPlaying;
    active=null;
  }
  function tone(hit, at, run) {
    const bus=audio.createGain();
    bus.gain.value=.22; bus.connect(audio.destination);
    const voice={bus,oscillators:[]}; run.voices.push(voice);
    // Inharmonic modes with faster high-frequency decay and a quiet beating pair.
    const modes=[[1,.45,1],[1.006,.15,.9],[1.51,.2,.65],[2.03,.1,.48],[2.72,.065,.3],[3.89,.035,.16]];
    let remaining=modes.length;
    modes.forEach(([ratio,level,tail])=>{
      const osc=audio.createOscillator(), envelope=audio.createGain();
      osc.type='sine'; osc.frequency.setValueAtTime(hit.hz*ratio,at);
      osc.frequency.exponentialRampToValueAtTime(hit.hz*ratio*.997,at+.35);
      envelope.gain.setValueAtTime(.0001,at);
      envelope.gain.linearRampToValueAtTime(level,at+.012);
      envelope.gain.exponentialRampToValueAtTime(.0001,at+hit.decay*tail);
      osc.connect(envelope); envelope.connect(bus);
      osc.onended=()=>{osc.disconnect();envelope.disconnect();if(--remaining===0)bus.disconnect();};
      voice.oscillators.push(osc); osc.start(at); osc.stop(at+hit.decay*tail+.03);
    });
  }
  function start(piece) {
    if(piece?.dataset.accessoryFamily!==GONG_FAMILY || piece.closest('[hidden]') || !piece.isConnected)return false;
    cancel();
    const mallets=[...piece.querySelectorAll('[data-gong-mallet]')];
    const metals=[...piece.querySelectorAll('[data-gong-metal]')];
    const male=piece.dataset.wormPart==='companion', score=gongScore(male);
    if(mallets.length!==score.length || metals.length!==score.length)return false;
    const run={piece,voices:[],originals:[...mallets,...metals].map(n=>[n,n.getAttribute('transform')])};
    active=run; piece.dataset.gongPlaying='true';
    const began=performance.now();
    // Create/resume audio only within the user's gesture. Silent fallback keeps motion working.
    try {
      const Audio=window.AudioContext || window.webkitAudioContext;
      if(Audio) {
        if(!audio || audio.state==='closed')audio=new Audio();
        Promise.resolve(audio.resume()).then(()=>{
          if(active!==run || document.hidden || audio.state!=='running')return;
          const elapsed=performance.now()-began;
          // Never produce a late strike after a delayed permission/resume response.
          score.filter(hit=>hit.at>=elapsed).forEach(hit=>tone(hit,audio.currentTime+(hit.at-elapsed)/1000,run));
        }).catch(()=>{});
      }
    } catch { /* Unsupported audio must not disable the instrument interaction. */ }
    function tick(now) {
      if(active!==run)return;
      if(!piece.isConnected || piece.closest('[hidden]')) {cancel();return;}
      const elapsed=now-began;
      for(const hit of score) {
        const state=gongMotion(elapsed,male,hit.index,reduced.matches);
        mallets[hit.index].setAttribute('transform',`translate(${state.x} ${state.y})`);
        metals[hit.index].setAttribute('transform',`translate(${state.vibration} 0)`);
      }
      if(elapsed>Math.max(...score.map(hit=>hit.at+hit.decay*1000))+100) {cancel();return;}
      frame=requestAnimationFrame(tick);
    }
    frame=requestAnimationFrame(tick); return true;
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});
  window.addEventListener('pagehide',cancel);
  reduced.addEventListener('change',cancel);
  return {start,cancel};
}
