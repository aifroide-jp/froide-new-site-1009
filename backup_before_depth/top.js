(()=>{
 const root=document.documentElement;
 const staticMode=new URLSearchParams(location.search).get('static')==='1';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 if(staticMode)root.classList.add('static');
 if(!staticMode&&!reduced.matches&&'IntersectionObserver'in window){
  root.classList.add('motion');const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');observer.unobserve(e.target)}}),{threshold:.06});document.querySelectorAll('[data-reveal]').forEach(e=>observer.observe(e));
 }
 const burger=document.querySelector('[data-burger]'),drawer=document.querySelector('[data-drawer]'),close=document.querySelector('[data-drawer-close]');
 function toggle(open){drawer.hidden=!open;drawer.style.display=open?'flex':'none';drawer.style.opacity=open?'1':'0';burger.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':'';if(open)close.focus();else burger.focus()}
 burger.addEventListener('click',()=>toggle(true));close.addEventListener('click',()=>toggle(false));drawer.querySelectorAll('a:not([aria-disabled])').forEach(a=>a.addEventListener('click',()=>toggle(false)));
 document.addEventListener('keydown',e=>{if(drawer.hidden)return;if(e.key==='Escape')toggle(false);if(e.key==='Tab'){const links=[...drawer.querySelectorAll('button,a:not([aria-disabled])')],first=links[0],last=links.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
 matchMedia('(min-width:1100px)').addEventListener('change',e=>{if(e.matches&&!drawer.hidden)toggle(false)});
 document.querySelectorAll('a[aria-disabled]').forEach(a=>a.addEventListener('click',e=>e.preventDefault()));
 if(!staticMode){const photos=[...document.querySelectorAll('[data-hero-img],[data-px-img],[data-px]')];let pending=false;
 function update(){pending=false;photos.forEach(el=>{const r=el.parentElement.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;const offset=reduced.matches?0:Math.max(-22,Math.min(22,(innerHeight*.5-r.top-r.height*.5)*.045));el.style.transform=`translateY(${offset}px)`})}
 addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(update)}},{passive:true});addEventListener('resize',update);reduced.addEventListener('change',update);update();
 }
})();
