// Clear swim lenses, silicone seals and a split strap. Construction references
// and the distinction between the spring-inspired prop and collection site
// are recorded in docs/game-of-worms-location-research/lombok-hpt26.md.
const add=(p,t,a={})=>{const n=document.createElementNS('http://www.w3.org/2000/svg',t);for(const[k,v]of Object.entries(a))n.setAttribute(k,v);p.appendChild(n);return n;};
const path=(p,d,fill,stroke='#304a55',width=1)=>add(p,'path',{d,fill,stroke,'stroke-width':width,'stroke-linejoin':'round','stroke-linecap':'round'});
export const swimLayouts={
  'hpt26-swimming-goggles':{primary:[331.5,53.5,1,27.9],companion:[114.545,105.005,.5,27.9]},
  'hpt26-splashing-pool':{primary:[192,263,1,0],companion:[192,263,1,0]}
};
export function drawLombokSwim(group,item,male){
  if(!swimLayouts[item.family])return false;
  group.dataset.renderer=item.family;
  if(item.family==='hpt26-swimming-goggles'){
    const rim='#824960',edge='#d59cb0';
    if(male){
      // Round compact eyecups with a narrow flexible bridge and offset buckle.
      path(group,'M-16-2Q-20-4-21-8M-16 2Q-21 1-22-3M16-1L18-3M16 3L19 1','none',rim,2.2);
      path(group,'M-2-1Q0-4 2-1','none',rim,2.5);
      for(const x of[-8.27,8.27]){
        add(group,'ellipse',{cx:x,cy:1,rx:7.8,ry:7.9,fill:'#473641',opacity:.22});
        add(group,'ellipse',{cx:x,cy:0,rx:7.5,ry:7.4,fill:'none',stroke:rim,'stroke-width':2.4});
        add(group,'ellipse',{cx:x,cy:0,rx:5.9,ry:5.8,fill:'#d8fcff','fill-opacity':.07,stroke:edge,'stroke-width':.8});
        path(group,`M${x-3.5}-3.2Q${x}-5 ${x+2}-3.8`,'none','#f4ffff',1.1);
      }
      path(group,'M-22-7L-19-5L-21-1L-24-3Z','#d4d7d5',rim,.8);
    }else{
      // Wider swept lenses, cushioned seals and a double strap around the head.
      path(group,'M-19-2Q-25-3-27-7M-19 2Q-25 2-28-2M19-2L22-4M19 2L23 0','none',rim,2.5);
      path(group,'M-2-1Q0-5 2-1','none',rim,2.8);
      const lens=(x,far)=>{
        const d=`M${x-7.3}-4.5Q${x-1}-8.8 ${x+5.5}-5.8Q${x+9.3} 0 ${x+5.8} 5.7Q${x} 8.7 ${x-6.7} 5.1Q${x-10} .7 ${x-7.3}-4.5Z`;
        const g=add(group,'g',{transform:far?'translate(0 .2)':''});
        path(g,d,'#c6f5f80d',rim,2.6);
        path(g,d,'none',edge,.65);
        path(g,`M${x-5.8}-3.5Q${x-1}-6.2 ${x+3.5}-4.4`,'none','#f5ffff',1.2);
        path(g,`M${x+5.8} 1.4Q${x+5} 4.3 ${x+2.5} 4.8`,'none','#add8de',.8);
      };
      lens(-9.61,true);lens(9.61,false);
      path(group,'M-26-5L-23-4L-24 0L-27-1Z','#cbd3d3',rim,.9);
      path(group,'M-25-3L-25-1','none','#f4ffff',.7);
    }
    return true;
  }
  // One shallow, irregular stone-lined pool for the pair. Front and back
  // surfaces are separate so the moving worms can sit partly in the water.
  const back=add(group,'g',{'data-lombok-pool-back':''});
  add(back,'ellipse',{cx:0,cy:30,rx:169,ry:23,fill:'#263b3a',opacity:.18});
  path(back,'M-173-2C-168-34-97-52-24-44C44-58 138-42 169-11C196 15 143 48 54 51C-42 63-157 40-173-2Z','#69716a','#3c514e',1.7);
  path(back,'M-162-5C-133-35-52-32-17-35C60-47 138-29 159-7C178 12 117 38 39 41C-54 47-148 23-162-5Z','#4a878c','#386267',1.3);
  path(back,'M-157-7C-99-29-45-16 14-24C68-31 123-18 151-5C137 18 79 28 17 29C-59 31-130 15-157-7Z','#7bc3c5','none');
  path(back,'M-143-12Q-106-25-65-22M-18-31Q49-38 107-23M-137 10Q-103 23-57 26','none','#c7e8dc',2);
  path(back,'M-109-4Q-63-17-27-8M8 11Q48 17 92 1M73-18L108-10','none','#b6e0d9',1.2);
  path(back,'M-110 8Q-51 24-2 18M15-17Q55-24 81-14','none','#458e9a',1.1);
  [[-142,-22,23,8],[-101,-33,28,9],[-53,-38,22,7],[2,-44,27,8],[57,-40,24,8],[111,-28,27,9],[151,-9,19,9]].forEach(([x,y,rx,ry],i)=>{
    add(back,'ellipse',{cx:x,cy:y,rx,ry,fill:i%2?'#8d9585':'#a3a798',stroke:'#59675d','stroke-width':1.2,transform:`rotate(${i%2?7:-7} ${x} ${y})`});
    path(back,`M${x-rx*.6} ${y-2}Q${x} ${y-ry*.7} ${x+rx*.5} ${y-2}`,'none','#c4c8b5',1.3);
  });
  const front=add(group,'g',{'data-lombok-pool-front':''});
  path(front,'M-161 0C-107 26-19 35 67 25Q129 20 163-3C164 22 94 44 17 45C-67 46-145 26-161 0Z','#76bfc3b0','#649aa0',.8);
  path(front,'M-153 2C-84 32 80 37 150 4','none','#e1f2e5',2);
  path(front,'M-159 11Q-88 45 3 43Q103 46 164 9L161 24Q75 64-30 51Q-123 42-159 24Z','#656f63','#485e55',1.3);
  [[-139,20,21,10],[-103,33,24,11],[-62,42,25,10],[-17,46,27,11],[31,45,27,11],[79,37,28,11],[124,24,25,10],[155,12,17,9]].forEach(([x,y,rx,ry],i)=>{
    path(front,`M${x-rx} ${y-2}Q${x-rx*.9} ${y-ry} ${x-4} ${y-ry+1}Q${x+rx*.8} ${y-ry-2} ${x+rx} ${y}L${x+rx-5} ${y+ry-2}Q${x} ${y+ry+2} ${x-rx+3} ${y+ry-3}Z`,i%2?'#919781':'#a1a68e','#59695a',1.1);
    path(front,`M${x-rx+5} ${y-2}Q${x-2} ${y-ry+2} ${x+rx-5} ${y-2}`,'none','#c2c7ad',1.4);
    path(front,`M${x-rx+5} ${y+ry-5}Q${x} ${y+ry} ${x+rx-6} ${y+ry-4}`,'none','#65765f',1.1);
  });
  return true;
}
