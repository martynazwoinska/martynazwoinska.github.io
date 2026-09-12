(() => {
  'use strict';
  // Approved drawer map is available on the normal Cabinet URL.
  const places = window.CABINET_MAP_PLACES;
  const scene = document.getElementById('scene-space');
  if (!places?.length || !scene) return;
  const drawer = document.createElement('button');
  drawer.type = 'button'; drawer.className = 'map-drawer'; drawer.id = 'map-drawer';
  drawer.setAttribute('aria-label', 'Open the chocolate map of Uppsala');
  drawer.setAttribute('aria-haspopup', 'dialog'); drawer.setAttribute('aria-controls', 'chocolate-map-dialog');
  drawer.setAttribute('aria-expanded', 'false');
  drawer.innerHTML = '<img class="map-drawer-paper" src="assets/uppsala-map-corner-v110.svg" width="180" height="100" alt="" aria-hidden="true">';
  scene.append(drawer);
  const movingDrawer=document.createElement('div');
  movingDrawer.className='map-drawer-motion';movingDrawer.setAttribute('aria-hidden','true');
  movingDrawer.innerHTML='<div class="map-drawer-cavity"></div><div class="map-drawer-front"></div>';
  scene.append(movingDrawer);
  const dialog = document.createElement('dialog');
  dialog.id = 'chocolate-map-dialog'; dialog.className = 'chocolate-map-dialog';
  dialog.setAttribute('aria-labelledby', 'chocolate-map-title');
  dialog.innerHTML = `
    <div class="map-heading"><h2 id="chocolate-map-title">Uppsala, in chocolate</h2><button type="button" class="map-close" autofocus>Close</button></div>
    <p class="map-disclaimer map-introduction">A personal guide to chocolate in Uppsala and online, with a focus on bean-to-bar and tree-to-bar producers. Bean-to-bar makers turn cocoa beans into chocolate. Tree-to-bar producers also grow the cacao. Other chocolatiers work with couverture, chocolate already made by another producer, which they temper, mould or combine with other ingredients.</p>
    <p class="map-disclaimer map-introduction">I also include brands such as Ocelot, which uses high-quality couverture from Original Beans but not those using standard industrial couverture. Some brands use different approaches across their range: Malmö Chokladfabrik, for example, makes some products bean-to-bar (their craft range) and others with chocolate made by other producers.</p>
    <div class="map-groups" role="group" aria-label="Shop categories"><button type="button" data-group="uppsala" aria-pressed="true">In Uppsala</button><button type="button" data-group="online" aria-pressed="false">Online shops</button><button type="button" data-group="makers" aria-pressed="false">Swedish makers</button></div>
    <div class="map-groups map-regions" role="group" aria-label="Online shop regions" hidden><button type="button" data-region="sweden" aria-pressed="true">Sweden</button><button type="button" data-region="nordics" aria-pressed="false">Other Nordics</button><button type="button" data-region="europe" aria-pressed="false">Rest of Europe</button></div>
    <div class="map-picker"><label for="map-select">Choose a shop</label><select id="map-select" class="map-select"></select></div>
    <p class="map-makers-scope" hidden>This section focuses on Swedish bean-to-bar and tree-to-bar chocolate. These makers start with cocoa beans rather than remelting ready-made chocolate. For makers with mixed ranges, look for their bean-to-bar bars.</p>
    <p class="map-disclaimer map-makers-credit" hidden>With thanks to <a href="https://www.chokladakademien.org/hantverkschoklad2/" target="_blank" rel="noopener noreferrer">Chokladakademien</a> for the maker directory.</p>
    <div class="map-layout"><div class="map-canvas"><div class="map-frame"></div><p class="map-attribution">Map and coordinates © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a> <a href="https://opendatacommons.org/licenses/odbl/1-0/" target="_blank" rel="noopener noreferrer">ODbL</a></p><p class="map-disclaimer">Select a numbered pin or choose a shop. Brands and availability can vary by branch.</p></div>
    <section class="map-details" aria-label="Selected shop"><h3 class="map-place-name"></h3><p class="map-address"></p><p class="map-selection"></p><p class="map-caution" hidden></p><div class="map-links"></div></section></div>`;
  document.querySelector('main').append(dialog);
  const $ = s => dialog.querySelector(s);
  const select = $('.map-select');
  const physical = places.filter(p=>p.group==='uppsala');
  const shopMap=window.createCabinetShopMap($('.map-frame'),physical,id=>{select.value=id;showPlace();});
  let current = places[0]; let group = 'uppsala'; let region = 'sweden';
  const remembered = {};
  const selectionKey = () => group === 'online' ? 'online:'+region : group;
  function link(label, url) {
    const a = document.createElement('a'); a.textContent = label; a.href = url;
    a.target = '_blank'; a.rel = 'noopener noreferrer'; $('.map-links').append(a);
  }
  function showPlace() {
    current = places.find(p => p.id === select.value);
    remembered[selectionKey()] = current.id;
    $('.map-place-name').textContent = group === 'online' ? (current.onlineName || current.name) : current.name;
    $('.map-address').textContent = group === 'uppsala' ? current.address : (group === 'online' ? (current.country || 'Sweden') : current.makerType);
    $('.map-selection').textContent = current.brands?.length ? 'Brands sold: '+current.brands.join(', ')+'.' : (current.selection || '');
    $('.map-selection').hidden = !$('.map-selection').textContent;
    $('.map-caution').hidden = !current.publicNote; $('.map-caution').textContent = current.publicNote || '';
    $('.map-links').replaceChildren(); link('Website', current.url);
    if (current.shop) link('Shop online', current.shop);
    if (current.catalogue && current.catalogue !== current.shop) link('Product details', current.catalogue);
    if (current.process) link('How it is made', current.process);
    if (current.terms) link('Delivery information', current.terms);
    if (current.addressSource) link('Address source', current.addressSource);
    if (group === 'uppsala' && current.node) {
      link('Open location', `https://www.openstreetmap.org/node/${current.node}`);
      shopMap.select(current.id);
    }
  }
  function setGroup(next) {
    group = next;
    dialog.querySelectorAll('[data-group]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.group === group)));
    $('.map-canvas').hidden = group !== 'uppsala'; $('.map-layout').classList.toggle('is-online', group !== 'uppsala');
    $('.map-makers-scope').hidden = group !== 'makers';
    $('.map-makers-credit').hidden = group !== 'makers';
    $('.map-regions').hidden = group !== 'online';
    dialog.querySelectorAll('[data-region]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.region === region)));
    const choices = places.filter(p => group === 'online' ? (p.group === 'online' || (p.onlineName && p.shop)) && (p.region || 'sweden') === region : p.group === group);
    const choiceName = p => group === 'online' ? (p.onlineName || p.name) : p.name;
    if (group === 'makers' || group === 'online') choices.sort((a, b) => choiceName(a).localeCompare(choiceName(b), 'sv'));
    select.replaceChildren(...choices.map(p => new Option(group === 'uppsala' ? (physical.indexOf(p)+1)+' '+p.name : (group === 'online' ? (p.onlineName || p.name) : p.name),p.id)));
    if (remembered[selectionKey()]) select.value = remembered[selectionKey()];
    showPlace();
    if (dialog.open && group === 'uppsala') shopMap.show(); else shopMap.hide();
  }
  let opening=false, timer=0, stopSound=()=>{};
  let mapTrigger = drawer;
  function resetDrawer() {
    clearTimeout(timer);opening=false;stopSound();stopSound=()=>{};
    scene.classList.remove('map-drawer-opening');drawer.removeAttribute('aria-busy');
    drawer.setAttribute('aria-expanded','false');
  }
  function reveal() {
    opening=false;drawer.removeAttribute('aria-busy');setGroup(group);dialog.showModal();
    drawer.setAttribute('aria-expanded','true');$('.map-close').focus();
    if(group==='uppsala')shopMap.show();
  }
  function creak() {
    // Quiet, original friction sound. Created only inside the initiating click.
    const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return ()=>{};
    let context;
    try {
      context=new Audio();let cancelled=false;
      const start=()=>{
        if(cancelled||!opening){context.close().catch(()=>{});return;}
        const time=context.currentTime, length=.76, buffer=context.createBuffer(1,context.sampleRate*length,context.sampleRate), values=buffer.getChannelData(0);
        let smooth=0;
        for(let i=0;i<values.length;i++){smooth=.8*smooth+.2*(Math.random()*2-1);values[i]=smooth;}
        const source=context.createBufferSource();source.buffer=buffer;
        const filter=context.createBiquadFilter();filter.type='bandpass';filter.Q.value=6;
        filter.frequency.setValueAtTime(420,time);filter.frequency.exponentialRampToValueAtTime(190,time+.55);filter.frequency.linearRampToValueAtTime(280,time+.7);
        const gain=context.createGain();gain.gain.setValueAtTime(0,time);
        for(const [t,v] of [[.04,.13],[.13,.025],[.23,.12],[.36,.035],[.47,.1],[.64,.02],[.76,0]])gain.gain.linearRampToValueAtTime(v,time+t);
        source.connect(filter).connect(gain).connect(context.destination);source.start(time);source.stop(time+length);
        source.onended=()=>context.close().catch(()=>{});
      };
      if(context.state==='running')start();else context.resume().then(start).catch(()=>{});
      return ()=>{cancelled=true;if(context.state!=='closed')context.close().catch(()=>{});};
    } catch(_){if(context&&context.state!=='closed')context.close().catch(()=>{});return ()=>{};}
  }
  drawer.addEventListener('click', () => {
    if(opening||dialog.open)return;
    mapTrigger = drawer;
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){reveal();return;}
    opening=true;drawer.setAttribute('aria-busy','true');scene.classList.add('map-drawer-opening');
    stopSound=creak();timer=setTimeout(reveal,940);
  });
  drawer.addEventListener('pointerdown',e=>e.stopPropagation());
  document.querySelectorAll('[data-open-chocolate-map]').forEach(button => {
    button.addEventListener('click', () => {
      if (dialog.open) return;
      resetDrawer();
      mapTrigger = button;
      group = 'uppsala';
      reveal();
    });
  });
  $('.map-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{shopMap.hide();resetDrawer();mapTrigger.focus({preventScroll:true});});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&opening){e.preventDefault();resetDrawer();drawer.focus({preventScroll:true});}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&opening)resetDrawer();});
  window.addEventListener('pagehide',resetDrawer);
  document.getElementById('scene-reset')?.addEventListener('click',()=>{if(opening)resetDrawer();});
  dialog.querySelectorAll('[data-group]').forEach(b=>b.addEventListener('click',()=>setGroup(b.dataset.group)));
  dialog.querySelectorAll('[data-region]').forEach(b=>b.addEventListener('click',()=>{region=b.dataset.region;setGroup('online');}));
  select.addEventListener('change',showPlace);
})();
