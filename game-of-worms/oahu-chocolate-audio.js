// Recorded eating and wrapper foley. Licences and excerpts: assets/audio/SOURCES.md.
export const chocolateClips=Object.freeze({
  bite:new URL('./assets/audio/oahu-chocolate-eating.mp3',import.meta.url).href,
  paper:new URL('./assets/audio/nambucca-paper-slide.wav',import.meta.url).href
});
export function chocolateCue(kind,male=false){
  if(kind==='paper')return {at:430,offset:0,duration:.44,peak:.055};
  return {at:1810,offset:male?6.60:.80,duration:male?.64:.62,peak:male?.11:.10};
}
export function createChocolateSound({clips=chocolateClips,cueFor=chocolateCue,keysFor=male=>male?[chocolateClips.bite]:Object.values(chocolateClips)}={}){
  let ctx=null,voice=null;
  const buffers=new Map(),loading=new Map();
  function prepare(url){
    if(buffers.has(url))return Promise.resolve(true);
    if(loading.has(url))return loading.get(url);
    const pending=(async()=>{
      const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),4000);
      try{
        const response=await fetch(url,{signal:controller.signal});
        if(!response.ok)return false;
        buffers.set(url,await ctx.decodeAudioData(await response.arrayBuffer()));return true;
      }catch{return false;}finally{clearTimeout(timer);}
    })();
    loading.set(url,pending);pending.finally(()=>loading.delete(url));return pending;
  }
  function unlock(male=false){
    try{
      const Audio=window.AudioContext||window.webkitAudioContext;
      if(!Audio)return Promise.resolve(false);
      ctx??=new Audio();ctx.resume().catch(()=>{});
      return Promise.all(keysFor(male).map(prepare))
        .then(results=>results.every(Boolean));
    }catch{return Promise.resolve(false);}
  }
  function stop(){if(voice){try{voice.stop();}catch{}voice=null;}}
  function play(kind,male=false,elapsedMs=0){
    stop();
    const buffer=buffers.get(clips[kind]);
    if(!buffer||!ctx||ctx.state!=='running'||document.hidden)return false;
    const cue=cueFor(kind,male),late=Math.max(0,elapsedMs/1000);
    const offset=cue.offset+late,duration=Math.min(cue.duration-late,buffer.duration-offset);
    // Never queue a sound after its visible bite or restart a cancelled gesture.
    if(duration<=.04)return false;
    let peak=.01;
    for(let channel=0;channel<buffer.numberOfChannels;channel++){
      const data=buffer.getChannelData(channel);
      for(let i=Math.floor(offset*buffer.sampleRate);i<Math.min(data.length,(offset+duration)*buffer.sampleRate);i++)
        peak=Math.max(peak,Math.abs(data[i]));
    }
    const source=ctx.createBufferSource(),gain=ctx.createGain(),now=ctx.currentTime;
    source.buffer=buffer;
    const level=Math.min(.8,cue.peak/peak),fade=Math.min(.06,duration/3);
    gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(level,now+.008);
    gain.gain.setValueAtTime(level,now+duration-fade);gain.gain.linearRampToValueAtTime(0,now+duration);
    source.connect(gain);gain.connect(ctx.destination);voice=source;
    source.onended=()=>{source.disconnect();gain.disconnect();if(voice===source)voice=null;};
    source.start(now,offset,duration);return true;
  }
  return{unlock,play,stop};
}
