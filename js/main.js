// === LOADER (waits for critical resources) ===
    (function(){
      const loader=document.getElementById('loader');
      const bar=document.getElementById('loaderBar');
      let progress=0;
      function updateBar(){if(bar)bar.style.width=Math.min(progress,100)+'%'}
      // Simulate incremental progress
      const tick=setInterval(()=>{progress+=Math.random()*15;updateBar();if(progress>=90)clearInterval(tick)},200);
      function dismiss(){
        clearInterval(tick);progress=100;updateBar();
        setTimeout(()=>{if(loader)loader.classList.add('done')},400);
      }
      // Wait for fonts + DOM ready, or timeout at 3.5s
      if(document.fonts&&document.fonts.ready){
        document.fonts.ready.then(()=>setTimeout(dismiss,300));
      }
      setTimeout(dismiss,3500);
    })();

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
      // Footer starts fixed behind content, revealed as content scrolls up
      if(footer){
        footer.style.position = 'fixed';
        footer.style.bottom = '0';
        footer.style.left = '0';
        footer.style.right = '0';
      }
      function smoothRaf(){
        targetScroll = window.scrollY;
        currentScroll += (targetScroll - currentScroll) * ease;
        content.style.transform = 'translateY('+ (-currentScroll) +'px)';
        if(footer){
          const contentH = content.scrollHeight;
          const viewH = window.innerHeight;
          const remaining = contentH - currentScroll - viewH;
          // Keep footer hidden until content is nearly scrolled through
          footer.style.transform = remaining > 0 ? 'translateY('+ remaining +'px)' : 'translateY(0)';
          // Fade footer in smoothly as it approaches
          footer.style.opacity = remaining < fH ? Math.min(1, 1 - remaining / fH) : '0';
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
    document.querySelectorAll('a,button,.btn-primary,.formacion-card,.precio-item,.gallery-item,.whatsapp-float').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('hover'));el.addEventListener('mouseleave',()=>cursor.classList.remove('hover'))});
    document.addEventListener('mousedown',()=>cursor.classList.add('click'));
    document.addEventListener('mouseup',()=>cursor.classList.remove('click'));

    // === NAV ===
    const nav=document.getElementById('navbar');
    window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>60));
    const toggle=document.getElementById('navToggle'),mm=document.getElementById('mobileMenu');
    toggle.addEventListener('click',()=>{toggle.classList.toggle('active');mm.classList.toggle('active');document.body.style.overflow=mm.classList.contains('active')?'hidden':''});
    function closeMenu(){toggle.classList.remove('active');mm.classList.remove('active');document.body.style.overflow=''}
    mm.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));

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
    staggerObs('.reveal',0);staggerObs('.divider-animated',0);staggerObs('.table-row-reveal',150);staggerObs('.precio-item',120);staggerObs('.formacion-topics li',100);staggerObs('.founder-cred',150);staggerObs('.contacto-item',150);staggerObs('.class-type-card',120);
    // Namaste observers
    document.querySelectorAll('.namaste-img-wrap,.namaste-text,.namaste-sub').forEach(el=>{const nO=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('visible');nO.unobserve(x.target)}})},{threshold:.15});nO.observe(el)});
    const book=document.querySelector('.founder-book');
    if(book){const bO=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('visible');bO.unobserve(x.target)}})},obsOpts);bO.observe(book)}

    // === COUNTERS ===
    document.querySelectorAll('.count-num').forEach(el=>{
      const cO=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){const t=parseInt(el.dataset.target),d=2000,s=performance.now();function u(n){const p=Math.min((n-s)/d,1);el.textContent=Math.round(t*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(u)}requestAnimationFrame(u);cO.unobserve(el)}})},{threshold:.5});
      cO.observe(el);
    });

    // === GALLERY — Centered Carousel ===
    const galleryTrack=document.getElementById('galleryTrack');
    const galleryItems=Array.from(document.querySelectorAll('.gallery-item'));
    const galleryLeft=document.getElementById('galleryLeft');
    const galleryRight=document.getElementById('galleryRight');
    const galleryDotsWrap=document.getElementById('galleryDots');
    const lightbox=document.getElementById('galleryLightbox');
    const lightboxVideo=document.getElementById('lightboxVideo');
    const lightboxClose=document.getElementById('lightboxClose');
    let activeIndex=Math.floor(galleryItems.length/2);

    // Position items centered around active using CSS classes
    function updateCarousel(){
      if(!galleryTrack||!galleryItems.length)return;
      const total=galleryItems.length;
      galleryItems.forEach((item,i)=>{
        item.classList.remove('is-active','is-prev','is-next','is-far-prev','is-far-next');
        const diff=((i-activeIndex)%total+total)%total;
        const offset=diff>total/2?diff-total:diff;
        if(offset===0)item.classList.add('is-active');
        else if(offset===-1)item.classList.add('is-prev');
        else if(offset===1)item.classList.add('is-next');
        else if(offset===-2)item.classList.add('is-far-prev');
        else if(offset===2)item.classList.add('is-far-next');
      });
      // Update dots & counter
      dots.forEach((d,i)=>d.classList.toggle('active',i===activeIndex));
      const counter=document.getElementById('galleryCounter');
      if(counter)counter.textContent=(activeIndex+1)+' / '+total;
      // Lazy load + auto-play active and adjacent videos
      galleryItems.forEach((item,i)=>{
        const vid=item.querySelector('video');
        if(!vid)return;
        const isNear=Math.abs(((i-activeIndex)%total+total)%total)<=1||Math.abs(((i-activeIndex)%total+total)%total)>=total-1;
        if(isNear&&vid.preload==='none')vid.preload='metadata';
        if(i===activeIndex){vid.currentTime=0;vid.play().catch(()=>{})}
        else{vid.pause();vid.currentTime=0}
      });
    }

    function goTo(idx){
      if(idx<0)idx=galleryItems.length-1;
      if(idx>=galleryItems.length)idx=0;
      activeIndex=idx;
      updateCarousel();
    }

    // Build dots
    galleryItems.forEach((_,i)=>{
      const dot=document.createElement('button');
      dot.className='gallery-dot'+(i===0?' active':'');
      dot.setAttribute('aria-label','Video '+(i+1));
      dot.addEventListener('click',()=>goTo(i));
      galleryDotsWrap.appendChild(dot);
    });
    const dots=Array.from(galleryDotsWrap.querySelectorAll('.gallery-dot'));

    // Arrow nav
    if(galleryLeft)galleryLeft.addEventListener('click',()=>goTo(activeIndex-1));
    if(galleryRight)galleryRight.addEventListener('click',()=>goTo(activeIndex+1));

    // Swipe support
    if(galleryTrack){
      let touchStartX=0;
      galleryTrack.addEventListener('touchstart',e=>{touchStartX=e.touches[0].clientX},{passive:true});
      galleryTrack.addEventListener('touchend',e=>{
        const dx=e.changedTouches[0].clientX-touchStartX;
        if(Math.abs(dx)>40){goTo(activeIndex+(dx<0?1:-1))}
      });
    }

    // Auto-rotate gallery every 5s, pause on hover/touch
    let autoRotate=null;
    function pauseAutoRotate(){clearInterval(autoRotate);autoRotate=null}
    function resumeAutoRotate(){clearInterval(autoRotate);autoRotate=setInterval(()=>goTo(activeIndex+1),5000)}
    if(galleryTrack){
      galleryTrack.addEventListener('mouseenter',pauseAutoRotate);
      galleryTrack.addEventListener('mouseleave',resumeAutoRotate);
      galleryTrack.addEventListener('touchstart',pauseAutoRotate,{passive:true});
      galleryTrack.addEventListener('touchend',()=>setTimeout(resumeAutoRotate,3000));
    }

    // Keyboard nav only when gallery is in view
    let galleryInView=false;
    if(galleryTrack){
      const kObs=new IntersectionObserver(entries=>{entries.forEach(e=>{
        galleryInView=e.isIntersecting;
        if(e.isIntersecting)resumeAutoRotate();else pauseAutoRotate();
      })},{threshold:.1});
      kObs.observe(galleryTrack);
    }
    document.addEventListener('keydown',e=>{
      if(lightbox&&lightbox.classList.contains('active')){
        if(e.key==='Escape')closeLightbox();
        return;
      }
      if(!galleryInView)return;
      if(e.key==='ArrowRight')goTo(activeIndex+1);
      if(e.key==='ArrowLeft')goTo(activeIndex-1);
    });

    // Click on active item opens lightbox
    galleryItems.forEach((item,i)=>{
      item.addEventListener('click',()=>{
        if(!item.classList.contains('is-active')){goTo(i);return}
        const src=item.dataset.video;
        if(src&&lightbox&&lightboxVideo){
          lightboxVideo.src=src;
          lightboxVideo.load();
          lightbox.classList.add('active');
          document.body.style.overflow='hidden';
          lightboxVideo.addEventListener('loadeddata',function onLoaded(){
            lightboxVideo.removeEventListener('loadeddata',onLoaded);
            lightboxVideo.play().catch(()=>{});
          });
          // Fallback: try playing after short delay if loadeddata doesn't fire
          setTimeout(()=>{lightboxVideo.play().catch(()=>{})},300);
          pauseAutoRotate();
        }
      });
    });
    function closeLightbox(){
      if(lightbox&&lightboxVideo){
        lightbox.classList.remove('active');
        lightboxVideo.pause();
        lightboxVideo.removeAttribute('src');
        lightboxVideo.load();
        document.body.style.overflow='';
        resumeAutoRotate();
      }
    }
    if(lightboxClose)lightboxClose.addEventListener('click',closeLightbox);
    if(lightbox)lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});

    // Init gallery on reveal
    if(galleryTrack){
      const gObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){
        updateCarousel();
        gObs.unobserve(e.target);
      }})},{threshold:.1});
      gObs.observe(galleryTrack);
    }

    // === PARALLAX + SCROLL PROGRESS + WHATSAPP ===
    const pImg=document.getElementById('parallaxImg'),fSec=document.getElementById('founder'),orbs=document.querySelectorAll('.hero-orb');
    const scrollBar=document.getElementById('scrollProgress');
    const waFloat=document.getElementById('whatsappFloat');
    let tick=false;
    window.addEventListener('scroll',()=>{if(!tick){requestAnimationFrame(()=>{
      const sY=smoothEnabled?currentScroll:window.scrollY;
      // Parallax
      if(fSec&&pImg){const r=fSec.getBoundingClientRect();const wH=window.innerHeight;if(r.top<wH&&r.bottom>0){const p=(wH-r.top)/(wH+r.height);pImg.style.transform='translateY('+((p-.5)*80)+'px)'}}
      orbs.forEach((o,i)=>{o.style.transform='translateY('+(sY*(i+1)*.025)+'px)'});
      // Scroll progress
      const docH=document.documentElement.scrollHeight-window.innerHeight;
      if(scrollBar&&docH>0)scrollBar.style.width=(window.scrollY/docH*100)+'%';
      // WhatsApp float show after 400px
      if(waFloat)waFloat.classList.toggle('visible',window.scrollY>400);
      tick=false});tick=true}});

    // === WAVE ANIMATIONS ===
    document.querySelectorAll('.section-wave').forEach(w=>{
      const wO=new IntersectionObserver(e=>{e.forEach(x=>{
        if(x.isIntersecting)x.target.classList.add('wave-visible');
        else x.target.classList.remove('wave-visible');
      })},{threshold:0});
      wO.observe(w);
    });
