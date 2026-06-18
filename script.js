(function(){
  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Nav scroll state + progress bar
  var nav = document.getElementById('nav');
  var progressBar = document.getElementById('progressBar');
  var backTop = document.getElementById('backTop');
  function onScroll(){
    var y = window.scrollY || document.documentElement.scrollTop;
    nav.classList.toggle('scrolled', y > 40);
    backTop.classList.toggle('show', y > 600);
    var docH = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docH > 0 ? (y / docH) * 100 : 0;
    progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  backTop.addEventListener('click', function(){
    window.scrollTo({top:0, behavior:'smooth'});
  });

  // Mobile menu
  var hamburger = document.getElementById('hamburgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  function closeMenu(){
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded','false');
  }
  hamburger.addEventListener('click', function(){
    var isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  mobileMenu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeMenu();
  });

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.15});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in-view'); });
  }

  // Reservation form
  var dateInput = document.getElementById('r-date');
  if(dateInput){
    var today = new Date();
    var iso = today.toISOString().split('T')[0];
    dateInput.min = iso;
  }
  var reserveForm = document.getElementById('reserveForm');
  var reserveSuccess = document.getElementById('reserveSuccess');
  reserveForm.addEventListener('submit', function(e){
    e.preventDefault();
    if(!reserveForm.checkValidity()){
      reserveForm.reportValidity();
      return;
    }
    var btn = reserveForm.querySelector('button[type="submit"]');
    var originalText = btn.textContent;
    btn.textContent = 'Confirming...';
    btn.disabled = true;
    setTimeout(function(){
      reserveForm.style.display = 'none';
      reserveSuccess.style.display = 'block';
    }, 800);
  });
})();