// An original short plucked-string phrase and dry hand-drum answer.
// No recordings or borrowed composition. Sound is unlocked only by a tap/key.
export const DUET_BEATS=[0,.25,.50,.875,1.25,1.5,1.75,2,2.25,2.5,2.875,3.25];
export function makePluck(rate,hz,duration=.7){
  const data=new Float32Array(Math.ceil(rate*duration)),n=Math.round(rate/hz),ring=new Float32Array(n);
  let seed=1583;
  const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/2147483648-1;};
  for(let i=0;i<n;i++)ring[i]=random()*.65;
  // Karplus-Strong loop: a fast steel-string attack followed by a damped decay.
  for(let i=0;i<data.length;i++){
    const j=i%n,v=ring[j];ring[j]=.496*(v+ring[(j+1)%n]);
    const t=i/rate;data[i]=v*Math.min(1,t/.0015)*Math.min(1,(duration-t)/.035);
  }
  return data;
}
export function makeDrum(rate,tap=false){
  const duration=tap?.20:.31,out=new Float32Array(Math.ceil(rate*duration));
  for(let i=0;i<out.length;i++){
    const t=i/rate;
    const membrane=(Math.sin(2*Math.PI*(tap?255:158)*t)+.38*Math.sin(2*Math.PI*1.593*(tap?255:158)*t))*Math.exp(-t*(tap?38:23));
    let jingle=0;
    for(const hz of [1913,2751,3691,4517,5943])jingle+=Math.sin(t*2*Math.PI*hz+Math.sin(t*84)*.6)*Math.exp(-t*40)/5;
    out[i]=(.45*membrane+.15*jingle)*Math.min(1,t/.001);
  }
  return out;
}
export function createDoisRiosSound(){
  let context=null,master=null;const voices=new Set();
  function stop(){for(const s of voices){try{s.stop();}catch{}}voices.clear();if(master){master.disconnect();master=null;}}
  function unlock(){try{const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return false;context??=new Audio();context.resume().catch(()=>{});return true;}catch{return false;}}
  function begin(){stop();if(!context||context.state!=='running'||document.hidden)return false;master=context.createGain();master.gain.value=.32;master.connect(context.destination);return true;}
  function buffer(data,at,gain=.5){
    const b=context.createBuffer(1,data.length,context.sampleRate);b.copyToChannel(data,0);
    const source=context.createBufferSource(),level=context.createGain();source.buffer=b;level.gain.value=gain;source.connect(level);level.connect(master);voices.add(source);
    source.onended=()=>{source.disconnect();level.disconnect();voices.delete(source);};source.start(at);
  }
  function duet(primary=true,male=true){
    if(!begin())return;
    const now=context.currentTime+.025,rate=context.sampleRate;
    DUET_BEATS.forEach((beat,i)=>{
      // First two bars ask, the following taps answer. Finish with one shared beat.
      const guitar=i<4||i===8||i===9||i===11;
      if(guitar&&primary){
        const chord=i<4?[293.66,392,493.88,587.33]:i<11?[293.66,440,523.25,659.25]:[293.66,392,493.88,587.33];
        chord.forEach((hz,j)=>buffer(makePluck(rate,hz),now+beat+j*.014,.45));
      }
      if(!guitar&&male||i===11&&male)buffer(makeDrum(rate,i%2===0),now+beat,.8);
    });
  }
  function snap(){
    if(!begin())return;
    const rate=context.sampleRate,data=new Float32Array(Math.ceil(rate*.09));
    for(let i=0;i<data.length;i++){const t=i/rate;data[i]=Math.sin(2*Math.PI*(270*t+1150*t*t))*Math.exp(-t*62)*Math.min(1,t/.002)*.65;}
    buffer(data,context.currentTime,.28);
  }
  return {unlock,duet,snap,stop};
}
