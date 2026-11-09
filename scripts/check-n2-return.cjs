const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
(async()=>{
 const {feedingExit,feedingPlayback,feedingFrame,feedingTime,feedingRoute,feedingWormPose,returnToSourcePose,FEEDING_DURATION,FEEDING_LAPS}=await import('../game-of-worms/n2-feeding.js');
 // Count complete rotations, rather than only comparing matching endpoints.
 assert.equal(FEEDING_LAPS,2);
 for(const direction of[-1,1]){
  let total=0,last;
  for(let step=0;step<=2000;step++){
   const progress=feedingFrame(feedingTime(3850+19500*step/2000)).crawl,p=feedingRoute(progress,direction),angle=Math.atan2(p.y/10.5,p.x/38);
   if(last!==undefined)total+=Math.atan2(Math.sin(angle-last),Math.cos(angle-last));last=angle;
  }
  assert(Math.abs(total/(2*Math.PI)-direction*2)<1e-8,'The uninterrupted meal completes exactly two laps');
 }
 const source=Array.from({length:33},(_,i)=>({x:80+i*8,y:90+80*Math.sin(i/32*Math.PI)}));
 for(const story of[0,3850,3900,4300,4749,4750,8000,9700,10000,10349,10350,16000,23349]){
  const ms=feedingTime(story),exit=feedingExit(ms),before=feedingFrame(exit.at),departure=feedingPlayback(exit.at,exit);
  assert.equal(exit.at,Math.max(ms,feedingTime(4750)),'A partial body is allowed to clear the agar before exit');
  assert(exit.crawl>=1/13&&exit.crawl<=1,'No submerged tail is exposed by an early return');
  assert.equal(departure.frame.crawl,before.crawl,'Exit begins at the exact current route point');
  assert.equal(departure.frame.plate,before.plate);assert.equal(departure.frame.jumpBack,1);
  assert.equal(departure.frame.consumed,story>=10350,'An early exit cannot consume a portion retroactively');
  if(ms<exit.at)assert.deepEqual(feedingPlayback(ms,exit).frame,feedingFrame(ms),'Queued exit keeps immersion and emergence intact');
  for(const direction of[-1,1]){
   const pose=feedingWormPose(exit.crawl,false,{x:17,y:6},1,direction),mapped=pose.samples.map(p=>({x:p.x+250,y:p.y+250}));
   assert.deepEqual(returnToSourcePose(source,mapped,0).points,[...mapped].reverse(),'The first return pose is exactly the crawling body');
   assert.deepEqual(returnToSourcePose(source,mapped,1).points,source,'The final pose restores the full-size body');
   let previous=returnToSourcePose(source,mapped,0),scale=previous.scale;
   for(let step=1;step<=200;step++){
    const next=returnToSourcePose(source,mapped,step/200);
    assert(next.points.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)));
    assert(next.scale>=scale-1e-9,'The departing miniature grows continuously');scale=next.scale;
    assert(Math.max(...next.points.map((p,i)=>Math.hypot(p.x-previous.points[i].x,p.y-previous.points[i].y)))<10,'No body segment teleports during the return');previous=next;
   }
  }
  for(let elapsed=0;elapsed<=5650;elapsed+=25){const f=feedingPlayback(exit.at+elapsed,exit).frame;assert.equal(f.crawler,0);assert.equal(f.crawl,exit.crawl);assert.equal(f.consumed,exit.consumed);assert(Math.abs(f.worm+f.jumpOpacity-1)<1e-9,'Return always has exactly one visible actor');}
  const end=feedingPlayback(exit.at+5650,exit).frame;assert(end.done);assert.equal(end.worm,1);assert.equal(end.plate,0);
 }
 for(const story of[23350,25000,29000])assert.equal(feedingExit(feedingTime(story)),null,'A tap during the natural return cannot restart it');
 assert.deepEqual(feedingPlayback(FEEDING_DURATION).frame,feedingFrame(FEEDING_DURATION));

 // Replay the production lifecycle with a seeded current meal. Only setup is
 // bypassed; pointer pause/release, keyboard start, cancellation and audio stop
 // use the same closure functions as the browser.
 let now=0,nextFrame=0,stops=0,restores=0;const frames=new Map();
 const dots=Array.from({length:5},()=>({setAttribute(k,v){this[k]=v}})),piece={dataset:{accessoryFamily:'ngm-agar-plate',wormPart:'primary'},closest:()=>null,querySelectorAll:()=>dots};
 const context={console,Math,Map,Set,Number,performance:{now:()=>now},matchMedia:()=>({matches:false,addEventListener(){}}),window:{addEventListener(){}},document:{addEventListener(){}},recordedSound:()=>({stop(){stops++}}),cancelAnimationFrame:id=>frames.delete(id),requestAnimationFrame:fn=>{frames.set(++nextFrame,fn);return nextFrame;},ease:t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t)},clamp:t=>Math.max(0,Math.min(1,t)),DIVE_PREPARE_MS:2233,DIVE_FLIGHT_MS:1820};
 let code=fs.readFileSync(path.join(__dirname,'../game-of-worms/n2-feeding.js'),'utf8').replace(/^import .*\r?\n/gm,'').replace(/\bexport /g,'');
 code=code.replace('return {handles,start,cancel,clear,grab,drag,release,','return {setRun(value){run=value;},getRun(){return run;},handles,start,cancel,clear,grab,drag,release,');
 vm.createContext(context);vm.runInContext(code,context);const feed=context.createN2Feeding({querySelector:()=>null,querySelectorAll:()=>[piece]});
 const seed=story=>{now=feedingTime(story);const action={piece,lastMs:now,started:0,pausedAt:null,exit:null,tick(){},restore(){restores++}};feed.setRun(action);return action;};
 for(const story of[3900,8000,10349,10350,25000]){
  const action=seed(story);assert(feed.grab(piece));assert.equal(action.pausedAt,now);now+=400;
  assert(feed.release(piece,()=>assert.fail('A tap cannot reposition the plate')));assert.equal(action.started,400);assert.equal(action.pausedAt,null);
  const request=action.exit;assert.equal(request===null,story>=23350);
  assert(feed.start(piece),'Enter/Space shares the same active-meal handler');assert.equal(action.exit,request,'Keyboard and repeated taps retain one return request');
  assert.equal(feed.getRun(),action,'A tap never replaces the current meal');
  assert(feed.grab(piece));assert(feed.release(piece,()=>{},true));assert.equal(feed.active,false,'A cancelled pointer clears the meal safely');
 }
 const keyboard=seed(8000);assert(feed.start(piece));assert(keyboard.exit);assert(feed.start(piece));assert.equal(feed.getRun(),keyboard);feed.cancel();feed.cancel();
 assert.equal(restores,6,'Every interrupted meal restores once');assert(stops>=18,'Exit requests and cancellation stop feeding audio');assert.equal(frames.size,0,'Cancellation leaves no scheduled frame');
 console.log('N2 return: exactly two laps, early-emergence queue, pose continuity, gradual growth, portion timing, pointer/keyboard taps, repeat taps and cleanup pass.');
})().catch(e=>{console.error(e);process.exitCode=1});
