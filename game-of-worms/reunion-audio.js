// Material recordings only. Sources, licences and excerpt times: assets/audio/SOURCES.md.
export const reunionClips=Object.freeze(Object.fromEntries(['rain','coat','peel','eat'].map(k=>[k,new URL(`./assets/audio/reunion-${k}.wav`,import.meta.url).href]).concat([
  ['paper',new URL('./assets/audio/nambucca-paper-slide.wav',import.meta.url).href]
])));
export function createReunionSound(){
  let ctx=null,voice=null,rain=null;const buffers=new Map(),loading=new Map();
  async function unlock(kind){
    try{
      const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return false;
      ctx??=new Audio();await ctx.resume();
      if(buffers.has(kind))return true;if(loading.has(kind))return loading.get(kind);
      const work=(async()=>{
        const ctl=new AbortController(),timer=setTimeout(()=>ctl.abort(),6000);
        try{const r=await fetch(reunionClips[kind],{signal:ctl.signal});if(!r.ok)return false;
          buffers.set(kind,await ctx.decodeAudioData(await r.arrayBuffer()));return true;
        }catch{return false;}finally{clearTimeout(timer);loading.delete(kind);}
      })();loading.set(kind,work);return work;
    }catch{return false;}
  }
  function stopVoice(){if(voice){try{voice.source.stop();}catch{}voice=null;}}
  function stopRain(){if(rain){try{rain.source.stop();}catch{}rain=null;}}
  function node(kind,level,loop=false,offset=0){
    const buffer=buffers.get(kind);if(!buffer||ctx?.state!=='running'||document.hidden||offset>=buffer.duration)return null;
    const source=ctx.createBufferSource(),gain=ctx.createGain();source.buffer=buffer;source.loop=loop;
    gain.gain.value=Math.max(0,Math.min(1,level));source.connect(gain);gain.connect(ctx.destination);
    const n={source,gain};source.onended=()=>{source.disconnect();gain.disconnect();if(voice===n)voice=null;if(rain===n)rain=null;};source.start(0,offset);return n;
  }
  function play(kind,level=.6,elapsed=0){stopVoice();voice=node(kind,level,false,elapsed/1000);}
  function startRain(){stopRain();rain=node('rain',0,true);duck(false);}
  function duck(quiet){if(!rain)return;rain.gain.gain.cancelScheduledValues(ctx.currentTime);rain.gain.gain.setTargetAtTime(quiet?.12:.32,ctx.currentTime,.25);}
  return{unlock,play,startRain,duck,stopVoice,stopRain,stop(){stopVoice();stopRain();}};
}
