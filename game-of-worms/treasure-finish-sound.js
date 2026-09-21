// An original, quiet three-second musical finish. No external sound assets.
export function createHeartFinishSound(isActive=()=>true){
 let context=null,timer=0,watch=0;
 function stop(){
  clearTimeout(timer);clearInterval(watch);
  if(context){const old=context;context=null;old.close().catch(()=>{});}
 }
 function play(){
  stop();
  if(document.hidden||!isActive())return;
  const Audio=globalThis.AudioContext||globalThis.webkitAudioContext;
  if(!Audio)return;
  try{
   const requested=performance.now(),ctx=context=new Audio();
   timer=setTimeout(stop,3200);
   watch=setInterval(()=>{if(document.hidden||!isActive())stop();},100);
   // Resume directly inside the final placement gesture. Never replay late.
   ctx.resume().then(()=>{
    if(context!==ctx||document.hidden||!isActive()||ctx.state!=='running'||performance.now()-requested>250){if(context===ctx)stop();return;}
    const now=ctx.currentTime;
    function note(hz,delay,length,volume,attack=.012,endHz=hz){
     const voice=ctx.createOscillator(),gain=ctx.createGain(),start=now+delay;
     voice.type='sine';voice.frequency.setValueAtTime(hz,start);
     voice.frequency.exponentialRampToValueAtTime(endHz,start+length);
     gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(volume,start+attack);
     gain.gain.exponentialRampToValueAtTime(.0001,start+length);
     voice.connect(gain);gain.connect(ctx.destination);
     voice.onended=()=>{voice.disconnect();gain.disconnect();};
     voice.start(start);voice.stop(start+length+.02);
    }
    // A glass-like strike, two cushioned low notes, then a warm major-sixth chord.
    note(1046.5,0,.75,.055);note(2093,0,.32,.012);note(3139.5,0,.2,.004);
    note(104.65,.96,.28,.11,.025,78.4);note(98,1.56,.3,.085,.025,73.4);
    [261.63,329.63,392,440].forEach((hz,i)=>note(hz,1.85+i*.045,1,.025,.11));
    note(1568,2.02,.7,.013,.016);

   }).catch(()=>{if(context===ctx)stop();});
  }catch{stop();}
 }
 return{play,stop};
}
