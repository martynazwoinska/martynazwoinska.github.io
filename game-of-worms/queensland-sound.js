// Recorded foley only. Source identities, licences and hashes: assets/audio/SOURCES.md.
export const canopyClips={
  motor:new URL('./assets/audio/queensland-lift.mp3',import.meta.url).href,
  shutter:new URL('./assets/audio/queensland-shutter.mp3',import.meta.url).href,
  instant:new URL('./assets/audio/queensland-instant.mp3',import.meta.url).href
};
export function createCanopySound(){
  let ctx;
  const voices=new Map();
  const buffers=new Map(),loads=new Map();
  async function unlock(kind){
    try{
      const Audio=window.AudioContext||window.webkitAudioContext;
      if(!Audio)return false;
      ctx??=new Audio(); await ctx.resume();
      if(buffers.has(kind))return true;
      if(loads.has(kind))return loads.get(kind);
      const task=(async()=>{
        const ctl=new AbortController(),timer=setTimeout(()=>ctl.abort(),2500);
        try{
          const response=await fetch(canopyClips[kind],{signal:ctl.signal});
          if(!response.ok)return false;
          const decoded=ctx.decodeAudioData(await response.arrayBuffer());
          const buffer=await Promise.race([decoded,new Promise(resolve=>setTimeout(()=>resolve(null),2500))]);
          if(!buffer)return false; buffers.set(kind,buffer);return true;
        }catch{return false;}finally{clearTimeout(timer);loads.delete(kind);}
      })(); loads.set(kind,task); return task;
    }catch{return false;}
  }
  function stop(kind){
    for(const[key,voice]of voices)if(kind===undefined||key===kind){try{voice.stop();}catch{}voices.delete(key);}
  }
  function play(kind,offset=0,duration=1,peak=.10){
    stop(kind); const buffer=buffers.get(kind);
    if(!buffer||ctx?.state!=='running'||document.hidden)return false;
    duration=Math.min(duration,buffer.duration-offset);
    if(duration<=0)return false;
    let maximum=.001;
    for(let ch=0;ch<buffer.numberOfChannels;ch++){
      const values=buffer.getChannelData(ch);
      for(let i=Math.floor(offset*buffer.sampleRate);i<Math.min(values.length,(offset+duration)*buffer.sampleRate);i++)maximum=Math.max(maximum,Math.abs(values[i]));
    }
    const source=ctx.createBufferSource(),gain=ctx.createGain(),now=ctx.currentTime;
    const level=Math.min(.7,peak/maximum),fade=Math.min(.12,duration*.15);
    gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(level,now+Math.min(.02,fade));
    gain.gain.setValueAtTime(level,now+duration-fade);gain.gain.linearRampToValueAtTime(0,now+duration);
    source.buffer=buffer;source.connect(gain);gain.connect(ctx.destination);voices.set(kind,source);
    source.onended=()=>{source.disconnect();gain.disconnect();if(voices.get(kind)===source)voices.delete(kind);};
    source.start(now,offset,duration);return true;
  }
  return{unlock,play,stop};
}
