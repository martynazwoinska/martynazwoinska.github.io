// Short real water/cloth recordings, with provenance in assets/audio/SOURCES.md.
export const bathClips=Object.freeze(Object.fromEntries(['pour','drip','cloth'].map(k=>[k,new URL(`./assets/audio/kauai-bath-${k}.wav`,import.meta.url).href])));
export function createBathSound(){
  let ctx=null,voice=null;const buffers=new Map(),loading=new Map();
  async function unlock(kind){
    try{
      const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio||!bathClips[kind])return false;
      ctx??=new Audio();await ctx.resume();if(buffers.has(kind))return true;if(loading.has(kind))return loading.get(kind);
      const work=(async()=>{const ctl=new AbortController(),timer=setTimeout(()=>ctl.abort(),4500);
        try{const r=await fetch(bathClips[kind],{signal:ctl.signal});if(!r.ok)return false;buffers.set(kind,await ctx.decodeAudioData(await r.arrayBuffer()));return true;}
        catch{return false;}finally{clearTimeout(timer);loading.delete(kind);}
      })();loading.set(kind,work);return work;
    }catch{return false;}
  }
  function stop(){if(voice){try{voice.stop();}catch{}voice=null;}}
  function play(kind,level=.6,elapsed=0){
    stop();const b=buffers.get(kind),offset=Math.max(0,elapsed/1000);
    if(!b||ctx?.state!=='running'||document.hidden||offset>=b.duration)return false;
    const source=ctx.createBufferSource(),gain=ctx.createGain();source.buffer=b;
    gain.gain.value=Math.max(0,Math.min(1,level));source.connect(gain);gain.connect(ctx.destination);voice=source;
    source.onended=()=>{source.disconnect();gain.disconnect();if(voice===source)voice=null;};source.start(0,offset);return true;
  }
  return{unlock,play,stop};
}
