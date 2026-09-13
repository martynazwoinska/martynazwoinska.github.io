// Field recording and real leaf foley. Attribution and reuse terms: audio/SOURCES.md.
const clips={
  bird:new URL('./assets/audio/pohnpei-lorikeet.mp3',import.meta.url).href,
  leaf:new URL('./assets/audio/pohnpei-leaves.ogg',import.meta.url).href
};
export function createPohnpeiSound(){
  let ctx,voice;
  const buffers=new Map(),loads=new Map();
  async function unlock(kind){
    try{
      const Audio=window.AudioContext||window.webkitAudioContext;
      if(!Audio)return false;
      ctx??=new Audio();await ctx.resume();
      if(buffers.has(kind))return true;
      if(loads.has(kind))return loads.get(kind);
      const task=(async()=>{
        const ctl=new AbortController(),timer=setTimeout(()=>ctl.abort(),3000);
        try{
          const r=await fetch(clips[kind],{signal:ctl.signal});
          if(!r.ok)return false;
          const b=await ctx.decodeAudioData(await r.arrayBuffer());buffers.set(kind,b);return true;
        }catch{return false;}finally{clearTimeout(timer);loads.delete(kind);}
      })();loads.set(kind,task);return task;
    }catch{return false;}
  }
  function stop(){if(voice){try{voice.stop();}catch{}voice=null;}}
  function play(kind,offset=0,duration=1,peak=.09){
    stop();const b=buffers.get(kind);
    if(!b||ctx?.state!=='running'||document.hidden)return false;
    duration=Math.min(duration,b.duration-offset);if(duration<=0)return false;
    let maximum=.001;
    for(let ch=0;ch<b.numberOfChannels;ch++){
      const values=b.getChannelData(ch);
      for(let i=Math.floor(offset*b.sampleRate);i<Math.min(values.length,(offset+duration)*b.sampleRate);i++)maximum=Math.max(maximum,Math.abs(values[i]));
    }
    const source=ctx.createBufferSource(),gain=ctx.createGain(),now=ctx.currentTime,level=Math.min(.7,peak/maximum),fade=Math.min(.10,duration*.18);
    source.buffer=b;source.connect(gain);gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(level,now+.015);
    gain.gain.setValueAtTime(level,now+duration-fade);gain.gain.linearRampToValueAtTime(0,now+duration);
    source.onended=()=>{source.disconnect();gain.disconnect();if(voice===source)voice=null;};
    voice=source;source.start(now,offset,duration);return true;
  }
  return{unlock,play,stop};
}
