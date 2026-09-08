// Short recorded material sounds. Sources and processing: assets/audio/SOURCES.md.
export const nambuccaClips=Object.freeze({
  brush:Object.freeze([1,2,3].map(n=>new URL(`./assets/audio/nambucca-brush-${n}.wav`,import.meta.url).href)),
  paper:Object.freeze([new URL('./assets/audio/nambucca-paper-slide.wav',import.meta.url).href]),
  press:Object.freeze([new URL('./assets/audio/nambucca-press-close.wav',import.meta.url).href])
});

// Cue only while material contact is visible. Screw turning stays quiet.
export function nambuccaSoundCues(kind,male,count=5){
  if(kind==='paint')return Array.from({length:count},(_,i)=>({
    key:`stroke-${i}`,at:570+i*620,type:'brush',variant:i%3,level:male&&i>1?.45:1
  }));
  if(male)return [
    {key:'sheet-out',at:650,type:'paper',variant:0,level:1},
    {key:'sheet-in',at:2540,type:'paper',variant:0,level:.7}
  ];
  return [{key:'press-contact',at:970,type:'press',variant:0,level:1}];
}

export function createNambuccaSound(){
  let ctx=null,voice=null;
  const buffers=new Map(),loading=new Map();
  function prepare(url){
    if(buffers.has(url))return Promise.resolve(true);
    if(loading.has(url))return loading.get(url);
    const pending=(async()=>{
      const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),4000);
      try{
        const response=await fetch(url,{signal:controller.signal});
        if(!response.ok)throw Error('Nambucca recording unavailable');
        buffers.set(url,await ctx.decodeAudioData(await response.arrayBuffer()));
        return true;
      }catch{return false;}
      finally{clearTimeout(timeout);}
    })();
    loading.set(url,pending);pending.finally(()=>loading.delete(url));return pending;
  }
  function unlock(activity='paint'){
    try{
      const Audio=window.AudioContext||window.webkitAudioContext;
      if(!Audio)return Promise.resolve(false);
      ctx??=new Audio();ctx.resume().catch(()=>{});
      const urls=activity==='paint'?nambuccaClips.brush:[...nambuccaClips.paper,...nambuccaClips.press];
      return Promise.all(urls.map(prepare)).then(results=>results.every(Boolean));
    }catch{return Promise.resolve(false);}
  }
  function stop(){if(voice){try{voice.stop();}catch{}voice=null;}}
  function play(kind,variant=0,level=1,elapsedMs=0){
    stop();
    const urls=nambuccaClips[kind],buffer=urls&&buffers.get(urls[variant%urls.length]);
    // Loading never queues a late sound or substitutes a synthesized beep/hiss.
    if(!buffer||!ctx||ctx.state!=='running'||document.hidden)return;
    const offset=Math.max(0,elapsedMs/1000);
    if(offset>=buffer.duration)return;
    const source=ctx.createBufferSource(),gain=ctx.createGain();
    source.buffer=buffer;gain.gain.value=.7*Math.max(0,Math.min(1,level));
    source.connect(gain);gain.connect(ctx.destination);voice=source;
    source.onended=()=>{source.disconnect();gain.disconnect();if(voice===source)voice=null;};
    source.start(0,offset);
  }
  return {unlock,play,stop};
}
