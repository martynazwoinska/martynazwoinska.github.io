// CC0 mechanical and bean recordings. Source details in assets/audio/SOURCES.md.
export const bikeClips={chain:new URL('./assets/audio/oahu-bike-chain.mp3',import.meta.url).href,beans:new URL('./assets/audio/oahu-bean-rattle.mp3',import.meta.url).href};
export function createBikeSound(){
  let ctx=null,token=0;const buffers=new Map(),loading=new Map(),voices=new Set();
  async function unlock(){
    try{
      const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return false;
      ctx??=new Audio();await ctx.resume();
      await Promise.all(Object.entries(bikeClips).map(async([kind,url])=>{
        if(buffers.has(kind))return;if(loading.has(kind))return loading.get(kind);
        const work=(async()=>{const ctl=new AbortController(),timer=setTimeout(()=>ctl.abort(),4500);
          try{const r=await fetch(url,{signal:ctl.signal});if(r.ok)buffers.set(kind,await ctx.decodeAudioData(await r.arrayBuffer()));}
          catch{}finally{clearTimeout(timer);loading.delete(kind);}
        })();loading.set(kind,work);return work;
      }));return buffers.size===2;
    }catch{return false;}
  }
  function stop(){token++;for(const s of voices){try{s.stop();}catch{}}voices.clear();}
  function voice(kind,offset,duration,delay,level,fade=.12){
    const b=buffers.get(kind);if(!b||!ctx||document.hidden)return;
    duration=Math.min(duration,b.duration-offset);if(duration<=.06)return;
    let peak=.01;for(let c=0;c<b.numberOfChannels;c++){const data=b.getChannelData(c);for(let i=Math.floor(offset*b.sampleRate);i<Math.min(data.length,(offset+duration)*b.sampleRate);i++)peak=Math.max(peak,Math.abs(data[i]));}
    const s=ctx.createBufferSource(),g=ctx.createGain(),filter=ctx.createBiquadFilter();s.buffer=b;
    filter.type='lowpass';filter.frequency.value=kind==='chain'?6800:8000;
    const now=ctx.currentTime+delay,vol=Math.min(.85,level/peak);
    g.gain.setValueAtTime(0,now);g.gain.linearRampToValueAtTime(vol,now+.06);
    g.gain.setValueAtTime(vol,now+Math.max(.07,duration-fade));g.gain.linearRampToValueAtTime(0,now+duration);
    s.connect(filter);filter.connect(g);g.connect(ctx.destination);voices.add(s);
    s.onended=()=>{s.disconnect();filter.disconnect();g.disconnect();voices.delete(s);};s.start(now,offset,duration);
  }
  async function start(){
    stop();const id=token,began=performance.now();await unlock();if(id!==token||document.hidden||ctx?.state!=='running')return;
    const late=(performance.now()-began)/1000;
    // One chain bed and two short bean pours, with no synth loop or loud stinger.
    if(late<1.4)voice('chain',.8,5.95,Math.max(0,1.1-late),.13,1.15);
    if(late<2)voice('beans',1.2,1.15,Math.max(0,2.05-late),.10,.18);
    if(late<3.5)voice('beans',4.2,1.2,Math.max(0,3.55-late),.085,.22);
  }
  return{start,stop};
}
