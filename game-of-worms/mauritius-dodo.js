// Original carved dodo-shaped tools, informed by NHM reconstruction profiles.
// These are fantasy grabbers, not reconstructions of living dodos.
const NS='http://www.w3.org/2000/svg';
const add=(g,t,a={})=>{const n=document.createElementNS(NS,t);for(const [k,v] of Object.entries(a))n.setAttribute(k,v);g.appendChild(n);return n;};
const path=(g,d,fill='none',stroke='#494238',w=3)=>add(g,'path',{d,fill,stroke,'stroke-width':w,'stroke-linejoin':'round','stroke-linecap':'round'});
const circle=(g,x,y,r,fill,stroke='#494238',w=2)=>add(g,'circle',{cx:x,cy:y,r,fill,stroke,'stroke-width':w});

export function drawDodoGrabber(group,male) {
  const fixed=add(group,'g',{class:'ju2909-body-clamp'});
  path(fixed,male?'M-111-28Q-130-9-113 20L-104 15Q-118-8-103-23Z':'M-160-36Q-184-7-161 30L-151 25Q-171-6-150-30Z','#bd9352','#6a5033',2.5);
  path(fixed,male?'M-111 17L-84-1':'M-158 26L-118-1','none','#6a5033',9);
  path(fixed,male?'M-111 17L-84-1':'M-158 26L-118-1','none','#c9bba0',4);
  const grip=add(group,'g',{class:'ju2909-grabber-harness'});
  path(grip,male?'M-83 9L-87 51Q-88 62-98 59L-108 51':'M-116 13L-123 70Q-125 86-140 80L-153 65','none','#685340',6);
  path(grip,male?'M-102 53L-96 56':'M-143 69L-134 75','none','#c59a62',8);
  // Small dome and long tapering bill with a deep hook; no parrot crest.
  path(group,male?'M-88 12Q-94-15-80-32Q-69-45-53-38Q-37-32-31-19L-10-9L-5 8Q-33 5-45 18Q-68 32-88 12Z':'M-122 15Q-134-16-113-43Q-97-61-75-52Q-56-45-49-28Q-25-16-3-12L5 9Q-35 5-52 24Q-86 41-122 15Z','#92918a');
  path(group,male?'M-84 6Q-67 21-45 12L-56 23Q-71 29-84 17Z':'M-117 12Q-87 29-56 15L-70 32Q-98 38-117 23Z','#74756e','none');
  path(group,male?'M-73-32Q-62-38-53-28':'M-107-40Q-91-51-78-40','none','#c6c3b6',3.5);
  // Upper and lower jaws have a real gap for the loose fruit.
  path(group,male?'M-12-11Q14-12 40-5L64-12Q86-15 95 2Q102 16 90 33L83 39L83 16Q67 9 47 10L5 10Z':'M-7-14Q24-15 63-6Q86-27 114-20Q144-13 146 9Q147 30 129 46L122 49L125 17Q109 5 82 12L15 11Z','#d6c392');
  path(group,male?'M64-12Q86-15 95 2Q102 16 90 33L83 39L83 16Q75 12 66 12Q74 0 64-12Z':'M101-22Q137-21 146 9Q147 30 129 46L122 49L125 17Q112 6 97 9Q109-7 101-22Z','#745c43');
  path(group,male?'M75-5Q87-3 90 7':'M113-13Q134-9 136 5','none','#c09a6b',3);
  const jaw=add(group,'g',{class:'ju2909-dodo-lower-beak'});
  path(jaw,male?'M0 11L38 23Q59 33 83 24Q77 43 56 42L13 24Z':'M5 13L58 31Q92 49 124 34Q112 60 79 54L24 31Z','#ac9568');
  path(jaw,male?'M15 18L41 29Q62 37 76 30':'M26 23L65 37Q94 49 115 39','none','#ead8a9',2.5);
  // Restrained inlaid eye and nostril, then a brass hinge at the jaw pivot.
  circle(group,male?-57:-82,male?-23:-32,male?6.5:8,'#eae0c8');
  circle(group,male?-56:-80,male?-23:-32,male?3.5:4.4,'#34392f','none');
  circle(group,male?-57:-82,male?-24:-34,male?1:1.3,'#fffaf0','none');
  path(group,male?'M33 1L39 2':'M51-1L60 1','none','#675e4a',3);
  circle(group,0,0,male?8:10,'#bc9958');
  path(group,male?'M-3 0H3':'M-4 0H4','none','#665137',2);
  circle(group,male?-84:-118,-1,male?5:6,'#c3b18b');
}
