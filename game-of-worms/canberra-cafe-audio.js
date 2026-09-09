// CC0 human coffee slurp and actual sulphur-crested cockatoo. See audio/SOURCES.md.
export const cafeClips=Object.freeze({
  sip:{url:new URL('./assets/audio/canberra-coffee-slurp.mp3',import.meta.url).href,offset:.15,duration:.52,peak:.32},
  screech:{url:new URL('./assets/audio/canberra-cockatoo.mp3',import.meta.url).href,offset:.02,duration:1.32,peak:.38}
});
export const cafeCue=kind=>kind==='sip'?{clip:'sip',at:836}:kind==='raid'?{clip:'screech',at:80}:null;
export function createCafeSound(){
  let ctx=null,voice=null;const buffers=new Map(),loading=new Map();
  async function unlock(kind){
    const clip=cafeClips[kind];if(!clip)return false;
    try{
      const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return false;
      ctx??=new Audio();await ctx.resume();
      if(buffers.has(kind))return true;if(loading.has(kind))return loading.get(kind);
      const work=(async()=>{
        const ctl=new AbortController(),timer=setTimeout(()=>ctl.abort(),4500);
        try{
          const r=await fetch(clip.url,{signal:ctl.signal});if(!r.ok)return false;
          const buffer=await ctx.decodeAudioData(await r.arrayBuffer());let peak=0;
          const first=Math.floor(clip.offset*buffer.sampleRate),last=Math.min(buffer.length,Math.ceil((clip.offset+clip.duration)*buffer.sampleRate));
          for(let c=0;c<buffer.numberOfChannels;c++){
            const data=buffer.getChannelData(c);for(let i=first;i<last;i++)peak=Math.max(peak,Math.abs(data[i]));
          }
          buffers.set(kind,{buffer,gain:Math.min(1,clip.peak/Math.max(peak,.001))});return true;
        }catch{return false;}finally{clearTimeout(timer);loading.delete(kind);}
      })();loading.set(kind,work);return work;
    }catch{return false;}
  }
  function stop(){if(voice){try{voice.stop();}catch{}voice=null;}}
  function play(kind,elapsed=0){
    stop();const clip=cafeClips[kind],saved=buffers.get(kind),late=Math.max(0,elapsed/1000);
    if(!saved||!clip||ctx?.state!=='running'||document.hidden||late>=clip.duration)return false;
    const duration=Math.min(clip.duration-late,saved.buffer.duration-clip.offset-late);if(duration<=.02)return false;
    const source=ctx.createBufferSource(),gain=ctx.createGain(),now=ctx.currentTime;
    source.buffer=saved.buffer;source.connect(gain);gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(saved.gain,now+Math.min(.012,duration/3));
    gain.gain.setValueAtTime(saved.gain,now+Math.max(duration*.5,duration-.055));gain.gain.linearRampToValueAtTime(0,now+duration);
    source.onended=()=>{source.disconnect();gain.disconnect();if(voice===source)voice=null;};
    voice=source;source.start(0,clip.offset+late,duration);return true;
  }
  return{unlock,play,stop};
}
