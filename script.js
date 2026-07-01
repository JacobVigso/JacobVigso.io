/* ============================================================
   JACOB VIGSØ — PORTFOLIO MOTION SYSTEM
   Vanilla JS + GSAP/ScrollTrigger + Lenis (all via CDN).
   Everything degrades gracefully: no libs / reduced-motion /
   touch devices all still get a fully usable static site.
   ============================================================ */

(function () {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined';
  const hasST = hasGSAP && typeof window.ScrollTrigger !== 'undefined';
  const hasLenis = typeof window.Lenis !== 'undefined';

  if (hasST) gsap.registerPlugin(ScrollTrigger);

  const lerp = (a, b, n) => a + (b - a) * n;

  // ========================
  // SMOOTH SCROLL (LENIS)
  // ========================
  let lenis = null;
  if (hasLenis && !reduceMotion) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 1 });
    window.__lenis = lenis;
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    if (hasST) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.lagSmoothing(0);
    }
  }

  // ========================
  // ANCHOR NAVIGATION
  // ========================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -10, duration: 1.2 });
      else target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });

  // ========================
  // CUSTOM CURSOR
  // ========================
  if (!isTouch) {
    const dot = document.querySelector('.cursor');
    const ring = document.querySelector('.cursor-follower');
    const ringLabel = ring ? ring.querySelector('span') : null;

    if (dot && ring) {
      body.classList.add('cursor-active');
      let mx = window.innerWidth / 2, my = window.innerHeight / 2;
      let rx = mx, ry = my;

      window.addEventListener('mousemove', (e) => {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      });

      const followRing = () => {
        rx = lerp(rx, mx, 0.2);
        ry = lerp(ry, my, 0.2);
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
        requestAnimationFrame(followRing);
      };
      followRing();

      const hoverTargets = document.querySelectorAll('a, button, .project-tab, [data-magnetic], [data-cursor]');
      hoverTargets.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          const label = el.getAttribute('data-cursor');
          if (label && ringLabel) {
            ring.classList.add('is-label');
            ringLabel.textContent = label;
          } else {
            ring.classList.add('is-hover');
          }
        });
        el.addEventListener('mouseleave', () => {
          ring.classList.remove('is-hover', 'is-label');
          if (ringLabel) ringLabel.textContent = '';
        });
      });
    }
  }

  // ========================
  // MAGNETIC ELEMENTS
  // ========================
  if (!isTouch && !reduceMotion) {
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      const strength = el.classList.contains('nav-logo') ? 0.5 : 0.35;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  // ========================
  // KINETIC HERO TEXT (SPLIT)
  // ========================
  document.querySelectorAll('[data-split]').forEach((el) => {
    const text = el.textContent;
    el.textContent = '';
    Array.from(text).forEach((ch) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = ch;
      el.appendChild(span);
    });
  });
  if (hasGSAP && !reduceMotion) {
    gsap.set('.hero-title .char', { yPercent: 120, opacity: 0 });
    gsap.set('.hero-badge, .hero-roles, .hero-description, .hero-cta, .hero-badge-spin', { y: 24, opacity: 0 });
  }

  function revealHero() {
    const chars = document.querySelectorAll('.hero-title .char');
    if (!hasGSAP || reduceMotion) {
      chars.forEach((c) => { c.style.opacity = '1'; c.style.transform = 'none'; });
      return;
    }
    gsap.to('.hero-title .char', { yPercent: 0, opacity: 1, stagger: 0.03, duration: 0.85, ease: 'power4.out' });
    gsap.to('.hero-badge, .hero-roles, .hero-description, .hero-cta, .hero-badge-spin', {
      y: 0, opacity: 1, stagger: 0.08, duration: 0.7, delay: 0.25, ease: 'power3.out'
    });
  }

  // ========================
  // ROLE ROTATOR
  // ========================
  (function roleRotator() {
    const rot = document.getElementById('role-rotator');
    if (!rot) return;
    const items = Array.from(rot.querySelectorAll('span'));
    if (items.length < 2) return;
    let i = 0;
    items.forEach((s, idx) => s.classList.toggle('active', idx === 0));
    setInterval(() => {
      items[i].classList.remove('active');
      i = (i + 1) % items.length;
      items[i].classList.add('active');
    }, 2600);
  })();

  // ========================
  // SCROLL REVEALS
  // ========================
  function initReveals() {
    const els = gsap && gsap.utils ? gsap.utils.toArray('[data-reveal]') : Array.from(document.querySelectorAll('[data-reveal]'));
    if (hasST && !reduceMotion) {
      els.forEach((el) => {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' }
        });
      });
    } else {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }
  }

  // ========================
  // NAV BACKGROUND ON SCROLL
  // ========================
  (function navScroll() {
    const nav = document.querySelector('.main-nav');
    if (!nav) return;
    const onScroll = () => {
      if (window.scrollY > 60) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  // ========================
  // INTRO SEQUENCE
  // ========================
  function runIntro() {
    const intro = document.getElementById('intro');
    const count = document.getElementById('intro-count');
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      if (intro && intro.parentNode) intro.remove();
      body.classList.remove('no-scroll');
      if (lenis) lenis.start();
      revealHero();
      initReveals();
      if (hasST) ScrollTrigger.refresh();
    };

    if (!intro || reduceMotion || !hasGSAP) {
      finish();
      return;
    }

    body.classList.add('no-scroll');
    if (lenis) lenis.stop();

    const counter = { v: 0 };
    gsap.timeline({ onComplete: finish })
      .to(counter, {
        v: 100, duration: 1.4, ease: 'power2.inOut',
        onUpdate: () => { if (count) count.textContent = String(Math.round(counter.v)).padStart(2, '0'); }
      })
      .to('.intro__word span', { yPercent: -115, duration: 0.7, ease: 'power3.inOut' }, '-=0.25')
      .to(intro, { yPercent: -100, duration: 0.8, ease: 'power3.inOut' }, '-=0.35');

    // Safety net: if rAF is throttled (page loaded in a background tab), never trap the page.
    setTimeout(finish, 4500);
  }

  // ========================
  // WEB DESIGN PROJECT SWITCHING
  // ========================
  const projectTabs = document.querySelectorAll('.project-tab');
  const projectDisplay = document.getElementById('project-display');
  const browserUrl = document.getElementById('browser-url');

  const projectUrls = {
    visconti: 'visconti.com',
    vast: 'vastfestival.dk',
    blog: 'wanderlust.blog'
  };

  const projectContent = {
    visconti: `
    <div class="visconti-demo">
      <nav class="visconti-nav">
        <div class="visconti-logo">Visconti</div>
        <div class="visconti-nav-links">
          <a href="#">Collections</a>
          <a href="#">Skincare</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
        <div class="visconti-cart">
          <i class='bx bx-shopping-bag'></i>
          <span class="cart-count">0</span>
        </div>
      </nav>

      <div class="visconti-hero">
        <img src="Images/beauty-background.jpg" alt="Luxury Beauty">
        <div class="visconti-hero-overlay">
          <div class="visconti-hero-content">
            <h1>Timeless Beauty, Elevated</h1>
            <p>Discover our curated collection of premium skincare and beauty essentials, crafted for those who appreciate the finer things.</p>
            <button class="visconti-btn">Explore Collection</button>
          </div>
        </div>
      </div>

      <div class="visconti-section-title">
        <h2>Bestsellers</h2>
        <p>Our most loved products, chosen by you</p>
      </div>

      <div class="visconti-products">
        <div class="visconti-product">
          <img src="Images/Products/product (1).jpg" alt="Radiant Glow Serum">
          <button class="add-to-cart">Add to Bag</button>
          <div class="visconti-product-info">
            <h3>Radiant Glow Serum</h3>
            <span class="price">$89</span>
          </div>
        </div>
        <div class="visconti-product">
          <img src="Images/Products/product (2).jpg" alt="Dreamy Hair Oil">
          <button class="add-to-cart">Add to Bag</button>
          <div class="visconti-product-info">
            <h3>Dreamy Hair Oil</h3>
            <span class="price">$65</span>
          </div>
        </div>
        <div class="visconti-product">
          <img src="Images/Products/product (3).jpg" alt="Fresh Face Cleanser">
          <button class="add-to-cart">Add to Bag</button>
          <div class="visconti-product-info">
            <h3>Fresh Face Cleanser</h3>
            <span class="price">$48</span>
          </div>
        </div>
        <div class="visconti-product">
          <img src="Images/Products/product (4).jpg" alt="Plumping Lip Gloss">
          <button class="add-to-cart">Add to Bag</button>
          <div class="visconti-product-info">
            <h3>Plumping Lip Gloss</h3>
            <span class="price">$32</span>
          </div>
        </div>
      </div>

      <div class="visconti-reviews">
        <h2>What They're Saying</h2>
        <div class="visconti-reviews-grid">
          <div class="visconti-review">
            <img src="Images/users/userAvatar01.svg" alt="Sarah L.">
            <p>"The Radiant Glow Serum has completely transformed my skin. I've never felt more confident."</p>
            <h4>Sarah L.</h4>
          </div>
          <div class="visconti-review">
            <img src="Images/users/userAvatar02.svg" alt="Emily T.">
            <p>"Visconti products are the only ones I trust. Luxurious feel, real results."</p>
            <h4>Emily T.</h4>
          </div>
          <div class="visconti-review">
            <img src="Images/users/userAvatar05.svg" alt="Isabella C.">
            <p>"Finally found a brand that understands what premium skincare should be."</p>
            <h4>Isabella C.</h4>
          </div>
        </div>
      </div>

      <div id="popup-message">Added to your bag</div>
    </div>
  `,

    vast: `
    <div class="vast-demo">
      <div class="vast-hero">
        <div class="vast-hero-content">
          <h1 class="vast-logo">VAST</h1>
          <p class="vast-tagline">Where Sound Meets Soul</p>
          <div class="vast-date">June 21-24, 2024</div>
        </div>
      </div>

      <div class="vast-lineup">
        <h2>Featured Artists</h2>
        <div class="vast-artists">
          <div class="vast-artist">
            <img src="Images/Kendrick.jpg" alt="Kendrick Lamar">
            <div class="vast-artist-overlay">
              <h3>Kendrick Lamar</h3>
              <p>Headliner • Saturday Night</p>
            </div>
          </div>
          <div class="vast-artist">
            <img src="https://www.mordeo.org/files/uploads/2021/08/Billie-Eilish-In-Black-Dress-Vogue-Photoshoot-4K-Ultra-HD-Mobile-Wallpaper.jpg" alt="Billie Eilish">
            <div class="vast-artist-overlay">
              <h3>Billie Eilish</h3>
              <p>Headliner • Friday Night</p>
            </div>
          </div>
          <div class="vast-artist">
            <img src="Images/pexels-wendy-wei-1540406.jpg" alt="Community Camping">
            <div class="vast-artist-overlay">
              <h3>Community Camp</h3>
              <p>Live The Experience</p>
            </div>
          </div>
        </div>
      </div>

      <div class="vast-cta">
        <h3>Ready to experience VAST?</h3>
        <button class="vast-cta-btn">Get Your Pass</button>
      </div>
    </div>
  `,

    blog: `
    <div class="blog-demo">
      <div class="blog-hero">
        <img src="Images/header-Blog.jpg" alt="Travel Adventure">
        <div class="blog-hero-overlay">
          <div class="blog-hero-content">
            <span class="blog-category">Featured Story</span>
            <h1>The Wonders of Exploring Off the Beaten Path</h1>
            <p>Discover the magic that happens when you venture beyond the tourist trails and find your own adventure.</p>
            <a href="#" class="blog-read-btn">Read Story</a>
          </div>
        </div>
      </div>

      <div class="blog-articles">
        <h2>Recent Stories</h2>
        <div class="blog-grid">
          <div class="blog-article">
            <div class="blog-article-img">
              <img src="Images/spotlight02.jpg" alt="Hidden Gems">
            </div>
            <div class="blog-article-content">
              <h3>Discovering Hidden Gems: Off the Beaten Path</h3>
              <p>From remote islands to tiny villages, discover natural wonders and fascinating histories in places you never knew existed.</p>
            </div>
          </div>
          <div class="blog-article">
            <div class="blog-article-img">
              <img src="Images/spotlight03.jpg" alt="Rewards of Travel">
            </div>
            <div class="blog-article-content">
              <h3>The Rewards of Traveling Without a Plan</h3>
              <p>Sometimes the best adventures come when you let go of the itinerary and embrace the unexpected.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="blog-destinations">
        <h2>Dream Destinations</h2>
        <div class="blog-dest-grid">
          <div class="blog-dest">
            <h3>Amalfi Coast</h3>
            <p>Dramatic cliffs, turquoise waters, and charming villages.</p>
          </div>
          <div class="blog-dest">
            <h3>Santorini</h3>
            <p>White-washed buildings and breathtaking sunsets.</p>
          </div>
          <div class="blog-dest">
            <h3>Ubud, Bali</h3>
            <p>Lush forests, rice paddies, and ancient temples.</p>
          </div>
          <div class="blog-dest">
            <h3>Banff</h3>
            <p>Majestic mountains and crystal-clear lakes.</p>
          </div>
        </div>
      </div>
    </div>
  `
  };

  function switchProject(projectId) {
    projectTabs.forEach((tab) => {
      tab.classList.toggle('active', tab.dataset.project === projectId);
    });

    if (!projectDisplay) return;
    projectDisplay.style.opacity = '0';
    projectDisplay.style.transform = 'translateY(20px)';

    setTimeout(() => {
      projectDisplay.innerHTML = projectContent[projectId];
      if (browserUrl && projectUrls[projectId]) browserUrl.textContent = projectUrls[projectId];
      projectDisplay.scrollTop = 0;

      requestAnimationFrame(() => {
        projectDisplay.style.opacity = '1';
        projectDisplay.style.transform = 'translateY(0)';
      });

      if (projectId === 'visconti') initCartCount();
      if (hasST) ScrollTrigger.refresh();
    }, 320);
  }

  projectTabs.forEach((tab) => {
    tab.addEventListener('click', () => switchProject(tab.dataset.project));
  });

  // ========================
  // CART (VISCONTI DEMO)
  // ========================
  function initCartCount() {
    const addToCartButtons = document.getElementsByClassName('add-to-cart');
    const cartCountTag = document.querySelector('.cart-count');
    const popupMessage = document.getElementById('popup-message');
    if (!cartCountTag) return;

    let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    cartCountTag.textContent = cartCount;

    for (let i = 0; i < addToCartButtons.length; i++) {
      addToCartButtons[i].addEventListener('click', () => {
        cartCount++;
        cartCountTag.textContent = cartCount;
        localStorage.setItem('cartCount', cartCount);

        if (popupMessage) {
          popupMessage.classList.add('show');
          setTimeout(() => popupMessage.classList.remove('show'), 2000);
        }

        addToCartButtons[i].classList.add('clicked');
        setTimeout(() => addToCartButtons[i].classList.remove('clicked'), 500);
      });
    }
  }

  // ========================
  // INIT
  // ========================
  window.addEventListener('load', () => {
    if (hasST) ScrollTrigger.refresh();
  });

  document.addEventListener('DOMContentLoaded', initCartCount);

  // Kick off (DOM is already parsed — script.js is at end of <body>)
  runIntro();
})();
