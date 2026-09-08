export const leafSnipURL=new URL('./assets/audio/panama-scissor-snip.wav',import.meta.url).href;

// A recorded scissors closure. Load on the gesture, play only at the visual cue.
export function createLeafCutSound(getContext){
  let buffer=null,loading=null,voice=null;
  function stop(){if(voice){try{voice.stop();}catch{}voice=null;}}
  function prepare(){
    const ctx=getContext();
    if(!ctx)return Promise.resolve(false);
    if(buffer)return Promise.resolve(true);
    if(loading)return loading;
    loading=(async()=>{
      const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),4000);
      try{
        const response=await fetch(leafSnipURL,{signal:controller.signal});
        if(!response.ok)throw Error('Scissors recording unavailable');
        buffer=await ctx.decodeAudioData(await response.arrayBuffer());
        return true;
      }catch{return false;}
      finally{clearTimeout(timeout);}
    })().finally(()=>{loading=null;});
    return loading;
  }
  function play(){
    stop();
    const ctx=getContext();
    // Never substitute noise or play a late snip when loading misses the cut.
    if(!buffer||!ctx||ctx.state!=='running'||document.hidden)return;
    const source=ctx.createBufferSource(),gain=ctx.createGain();
    source.buffer=buffer;gain.gain.value=.8;
    source.connect(gain);gain.connect(ctx.destination);voice=source;
    source.onended=()=>{source.disconnect();gain.disconnect();if(voice===source)voice=null;};
    source.start();
  }
  return {prepare,play,stop};
}
