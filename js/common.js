// 리안헤어 평촌역점 - 공통 스크립트

// 모바일 햄버거 메뉴
(function(){
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('mobileNav');
  if(!btn || !nav) return;
  btn.addEventListener('click', function(){
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
    });
  });
})();

// 히어로 배경 영상: 화면에 보일 때만 재생 (모바일 데이터 절약)
(function(){
  var video = document.getElementById('heroVideo');
  if(!video) return;
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          video.play().catch(function(){});
        }else{
          video.pause();
        }
      });
    }, {threshold: 0.15});
    io.observe(video);
  }else{
    video.play().catch(function(){});
  }
})();

// 블로그 메뉴 (한국어 페이지 메뉴줄·모바일 메뉴·푸터에 추가)
(function(){
  if((document.documentElement.lang||'').indexOf('ko')!==0) return;
  var onBlog=/\/blog\//.test(location.pathname);
  document.querySelectorAll('.gnb, .mobile-nav, .footer-nav').forEach(function(nav){
    if(nav.querySelector('a[href$="blog/"]')) return;
    var g=nav.querySelector('a[href$="gallery/"]'); if(!g) return;
    var a=document.createElement('a');
    a.href=g.getAttribute('href').replace(/gallery\/$/,'blog/');
    a.textContent='블로그';
    if(onBlog) a.className='active';
    g.insertAdjacentElement('afterend',a);
  });
})();
