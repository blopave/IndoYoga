// === LOADER ===
    window.addEventListener('load',()=>{setTimeout(()=>document.getElementById('loader').classList.add('done'),2400)});

    // === SMOOTH SCROLL (Lenis-style) ===
    const isMobile = window.innerWidth <= 900;
    let smoothEnabled = !isMobile;
    let currentScroll = 0, targetScroll = 0, ease = 0.08;
    const wrapper = document.getElementById('smooth-wrapper');
    const content = document.getElementById('smooth-content');

    if(smoothEnabled){
      const footer = document.getElementById('siteFooter');
      const fH = footer ? footer.offsetHeight : 0;
      document.body.style.height = (content.scrollHeight + fH) + 'px';
      window.addEventListener('resize',()=>{document.body.style.height = (content.scrollHeight + (footer?footer.offsetHeight:0)) + 'px'});
      function smoothRaf(){
        targetScroll = window.scrollY;
        currentScroll += (targetScroll - currentScroll) * ease;
        content.style.transform = 'translateY('+ (-currentScroll) +'px)';
        if(footer){
          const contentH = content.scrollHeight;
          const viewH = window.innerHeight;
          if(currentScroll + viewH >= contentH){
            footer.style.position = 'fixed';
            footer.style.bottom = '0';
            footer.style.left = '0';
            footer.style.right = '0';
          } else {
            footer.style.position = 'fixed';
            footer.style.bottom = '0';
            footer.style.left = '0';
            footer.style.right = '0';
            footer.style.transform = 'translateY('+ Math.max(0, (contentH - currentScroll - viewH)) +'px)';
          }
        }
        requestAnimationFrame(smoothRaf);
      }
      smoothRaf();
    }

    // === HERO TITLE ===
    // Build hero title with two word groups
    const titleEl=document.getElementById('heroTitle');
    const words=[{text:'Indo',cls:'hero-word-indo'},{text:'Yoga',cls:'hero-word-yoga'}];
    let letterIdx=0;
    words.forEach((w,wi)=>{
      const wordSpan=document.createElement('span');
      wordSpan.className=w.cls;
      w.text.split('').forEach(c=>{
        const s=document.createElement('span');
        s.className='hero-letter';
        s.textContent=c;
        s.style.animationDelay=(2.6+letterIdx*.1)+'s';
        letterIdx++;
        wordSpan.appendChild(s);
      });
      titleEl.appendChild(wordSpan);
      // Add gap between words
      if(wi<words.length-1){
        const gap=document.createElement('span');
        gap.className='hero-word-gap';
        titleEl.appendChild(gap);
      }
    });
    // After all letters have animated, mark title as revealed
    setTimeout(()=>{titleEl.classList.add('revealed')},2600+letterIdx*100+900);

    // === CURSOR ===
    const cursor=document.getElementById('cursor'),dot=document.getElementById('cursorDot');
    let cx=0,cy=0,dx=0,dy=0;
    document.addEventListener('mousemove',e=>{dx=e.clientX;dy=e.clientY;dot.style.left=dx+'px';dot.style.top=dy+'px'});
    function animCursor(){cx+=(dx-cx)*.12;cy+=(dy-cy)*.12;cursor.style.left=cx+'px';cursor.style.top=cy+'px';requestAnimationFrame(animCursor)}
    animCursor();
    document.querySelectorAll('a,button,.btn-primary,.formacion-card,.precio-item').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('hover'));el.addEventListener('mouseleave',()=>cursor.classList.remove('hover'))});
    document.addEventListener('mousedown',()=>cursor.classList.add('click'));
    document.addEventListener('mouseup',()=>cursor.classList.remove('click'));

    // === NAV ===
    const nav=document.getElementById('navbar');
    window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>60));
    const toggle=document.getElementById('navToggle'),mm=document.getElementById('mobileMenu');
    toggle.addEventListener('click',()=>{toggle.classList.toggle('active');mm.classList.toggle('active');document.body.style.overflow=mm.classList.contains('active')?'hidden':''});
    function closeMenu(){toggle.classList.remove('active');mm.classList.remove('active');document.body.style.overflow=''}

    // Nav smooth scroll override for smooth-scroll wrapper
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click',e=>{
        e.preventDefault();
        const id=a.getAttribute('href');
        const target=document.querySelector(id);
        if(target){
          const y=target.getBoundingClientRect().top+(smoothEnabled?currentScroll:window.scrollY);
          window.scrollTo({top:y,behavior:'smooth'});
        }
      });
    });

    // === OBSERVERS ===
    const obsOpts={threshold:.12,rootMargin:'0px 0px -30px 0px'};
    function staggerObs(sel,delay=150){
      const els=document.querySelectorAll(sel);
      const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const idx=Array.from(els).indexOf(e.target);setTimeout(()=>e.target.classList.add('visible'),idx*delay);obs.unobserve(e.target)}})},obsOpts);
      els.forEach(el=>obs.observe(el));
    }
    staggerObs('.reveal',0);staggerObs('.divider-animated',0);staggerObs('.table-row-reveal',150);staggerObs('.precio-item',120);staggerObs('.formacion-topics li',100);staggerObs('.founder-cred',150);staggerObs('.contacto-item',150);
    const book=document.querySelector('.founder-book');
    if(book){const bO=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('visible');bO.unobserve(x.target)}})},obsOpts);bO.observe(book)}

    // === COUNTERS ===
    document.querySelectorAll('.count-num').forEach(el=>{
      const cO=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){const t=parseInt(el.dataset.target),d=2000,s=performance.now();function u(n){const p=Math.min((n-s)/d,1);el.textContent=Math.round(t*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(u)}requestAnimationFrame(u);cO.unobserve(el)}})},{threshold:.5});
      cO.observe(el);
    });

    // === PARALLAX ===
    const pImg=document.getElementById('parallaxImg'),fSec=document.getElementById('founder'),orbs=document.querySelectorAll('.hero-orb');
    let tick=false;
    window.addEventListener('scroll',()=>{if(!tick){requestAnimationFrame(()=>{
      const sY=smoothEnabled?currentScroll:window.scrollY;
      if(fSec&&pImg){const r=fSec.getBoundingClientRect();const wH=window.innerHeight;if(r.top<wH&&r.bottom>0){const p=(wH-r.top)/(wH+r.height);pImg.style.transform='translateY('+((p-.5)*80)+'px)'}}
      orbs.forEach((o,i)=>{o.style.transform='translateY('+(sY*(i+1)*.025)+'px)'});
      tick=false});tick=true}});