// Recorded short foley only. Attribution and exact excerpts: assets/audio/SOURCES.md.
export const hcmcClips=Object.freeze(Object.fromEntries(['engine','cut','stir'].map(kind=>[kind,new URL(`./assets/audio/hcmc-${kind}.wav`,import.meta.url).href])));
export function createHcmcSound(){
  let ctx=null,voice=null;const buffers=new Map(),loading=new Map();
  async function prepare(url){
    if(buffers.has(url))return true;if(loading.has(url))return loading.get(url);
    const promise=(async()=>{const control=new AbortController(),timeout=setTimeout(()=>control.abort(),4000);
      try{const r=await fetch(url,{signal:control.signal});if(!r.ok)return false;buffers.set(url,await ctx.decodeAudioData(await r.arrayBuffer()));return true;}
      catch{return false;}finally{clearTimeout(timeout);}})();
    loading.set(url,promise);promise.finally(()=>loading.delete(url));return promise;
  }
  function unlock(kind){try{const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return Promise.resolve(false);ctx??=new Audio();ctx.resume().catch(()=>{});return prepare(hcmcClips[kind==='ride'?'engine':kind==='fruit'?'cut':'stir']);}catch{return Promise.resolve(false);}}
  function stop(){if(voice){try{voice.stop();}catch{}voice=null;}}
  function play(kind,level=1,elapsed=0){
    stop();const buffer=buffers.get(hcmcClips[kind]);if(!buffer||ctx?.state!=='running'||document.hidden)return;
    const offset=Math.max(0,elapsed/1000);if(offset>=buffer.duration)return;
    const node=ctx.createBufferSource(),gain=ctx.createGain();node.buffer=buffer;gain.gain.value=.65*Math.max(0,Math.min(1,level));
    node.connect(gain);gain.connect(ctx.destination);voice=node;node.onended=()=>{node.disconnect();gain.disconnect();if(voice===node)voice=null;};node.start(0,offset);
  }
  return{unlock,play,stop};
}
