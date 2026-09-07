// Original, quiet synthesized wing buzz for the fantasy flight.
export function createIshigakiAudio() {
  let audio=null,active=null;
  function cancel() {
    const run=active; active=null;
    if(!run?.gain)return;
    const now=audio.currentTime;
    run.gain.gain.cancelScheduledValues(now);
    run.gain.gain.setTargetAtTime(0,now,.01);
    for(const source of run.sources)try{source.stop(now+.05);}catch{}
  }
  function start(male=false,reduced=false) {
    cancel();
    if(reduced)return;
    const run={sources:[],nodes:[]},began=performance.now(); active=run;
    try {
      const Audio=window.AudioContext||window.webkitAudioContext;
      if(!Audio){active=null;return;}
      if(!audio||audio.state==='closed')audio=new Audio();
      Promise.resolve(audio.resume()).then(()=>{
        if(active!==run||document.hidden||audio.state!=='running')return;
        const duration=male?3.1:3.6,elapsed=(performance.now()-began)/1000;
        if(elapsed>.3){active=null;return;}
        const at=audio.currentTime,end=at+duration-elapsed;
        const buzz=audio.createOscillator(),flutter=audio.createOscillator();
        const filter=audio.createBiquadFilter(),pulse=audio.createGain(),depth=audio.createGain(),gain=audio.createGain();
        run.sources=[buzz,flutter];run.nodes=[buzz,flutter,filter,pulse,depth,gain];run.gain=gain;
        // Filtered harmonics give a soft papery buzz, with wingbeat-rate tremolo.
        buzz.type='sawtooth';
        buzz.frequency.setValueAtTime(male?190:155,at);
        buzz.frequency.linearRampToValueAtTime(male?235:195,at+.7);
        buzz.frequency.linearRampToValueAtTime(male?170:140,end);
        filter.type='lowpass';filter.frequency.value=1150;filter.Q.value=.45;
        pulse.gain.value=.72;depth.gain.value=.22;
        flutter.frequency.value=1000/(Math.PI*2*(male?20:24));
        flutter.connect(depth);depth.connect(pulse.gain);
        buzz.connect(filter);filter.connect(pulse);pulse.connect(gain);gain.connect(audio.destination);
        gain.gain.setValueAtTime(0,at);
        gain.gain.linearRampToValueAtTime(.045,at+.55);
        gain.gain.linearRampToValueAtTime(.035,end-.55);
        gain.gain.linearRampToValueAtTime(0,end);
        let remaining=2;
        for(const source of run.sources) {
          source.onended=()=>{if(--remaining===0){run.nodes.forEach(node=>node.disconnect());if(active===run)active=null;}};
          source.start(at);source.stop(end+.02);
        }
      }).catch(()=>{if(active===run)cancel();});
    } catch {cancel();}
  }
  return {start,cancel};
}
