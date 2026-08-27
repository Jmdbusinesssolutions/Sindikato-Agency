/**
 * SINDIKATO AGENCY — INTERACTIVE ENGINE
 * High-performance UI animations, theme switcher, interactive tools & modals
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initHeaderScroll();
  initMobileMenu();
  initCustomCursor();
  initStatsCounter();
  initReelCanvas();
  initPortfolioFilters();
  initCaseStudyModals();
  initProjectEstimator();
  initHostRecruitment();
  initFaqAccordion();
  initTestimonialSlider();
  initOfficeClocks();
  initQuickBrief();
  initContactForm();
  initAdminNavigation();
});

/* --------------------------------------------------------------------------
   1. THEME SWITCHER (Dark / Light)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('sindikato-theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('sindikato-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (!themeToggleBtn) return;
  
  if (theme === 'light') {
    themeToggleBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
    themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
  } else {
    themeToggleBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
    themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
  }
}

/* --------------------------------------------------------------------------
   2. HEADER SCROLL EFFECT
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   3. MOBILE NAVIGATION MENU
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  
  if (mobileBtn && mainNav) {
    mobileBtn.addEventListener('click', () => {
      mobileBtn.classList.toggle('open');
      mainNav.classList.toggle('active');
      document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    });

    // Close on nav link click
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileBtn.classList.remove('open');
        mainNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

/* --------------------------------------------------------------------------
   4. CUSTOM MAGNETIC CURSOR (Desktop)
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  if (window.innerWidth <= 768) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  const follower = document.createElement('div');
  follower.className = 'custom-cursor-follower';

  document.body.appendChild(cursor);
  document.body.appendChild(follower);

  let mouseX = -100, mouseY = -100;
  let followerX = -100, followerY = -100;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  function renderFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
    requestAnimationFrame(renderFollower);
  }
  requestAnimationFrame(renderFollower);

  const interactives = document.querySelectorAll('a, button, input, textarea, .project-card, .option-box');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* --------------------------------------------------------------------------
   5. STATS NUMBER COUNTER ANIMATION
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number-val');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseFloat(stat.getAttribute('data-target'));
          const isDecimal = target % 1 !== 0;
          let count = 0;
          const duration = 1800;
          const stepTime = 25;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              stat.textContent = isDecimal ? target.toFixed(1) : Math.round(target);
              clearInterval(timer);
            } else {
              stat.textContent = isDecimal ? count.toFixed(1) : Math.round(count);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsRow = document.querySelector('.hero-stats-row');
  if (statsRow) observer.observe(statsRow);
}

/* --------------------------------------------------------------------------
   6. SHOWREEL INTERACTIVE CANVAS
   -------------------------------------------------------------------------- */
function initReelCanvas() {
  const canvas = document.getElementById('reelCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  for (let i = 0; i < 48; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2.2 + 1,
      alpha: Math.random() * 0.6 + 0.25,
      isGold: Math.random() > 0.3
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw ambient gold/dark grid
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.04)';
    ctx.lineWidth = 1;
    const step = 40;
    for (let x = 0; x < width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Update and draw particles (Golden Embers)
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.isGold ? `rgba(255, 215, 0, ${p.alpha})` : `rgba(255, 255, 255, ${p.alpha * 0.7})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }
  animate();
}

/* --------------------------------------------------------------------------
   7. PORTFOLIO FILTERING
   -------------------------------------------------------------------------- */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   8. CASE STUDY MODAL DETAILS
   -------------------------------------------------------------------------- */
const caseStudiesData = {
  'aura-living': {
    title: 'Aura Haute Living',
    tagline: 'Hyper-Luxury Real Estate & WebGL Architecture',
    client: 'Aura Group Dubai',
    year: '2025-2026',
    category: 'The Web / Branding',
    liveUrl: '#',
    overview: 'Aura Haute Living is a flagship ultra-luxury penthouse development overlooking Dubai Canal and Palm Jumeirah. They commissioned Sindikato to craft a world-first immersive 3D digital showroom, elevated brand identity, and multi-tier investor portal.',
    impact: ['320% Increase in qualified Ultra-High-Net-Worth leads', 'AED 140M in off-plan bookings in first 60 days', 'Nominated for Awwwards Site of the Year 2025'],
    stack: ['Three.js / WebGL', 'GSAP Animation Suite', 'Next.js 15', 'Tailwind CSS', 'Headless Sanity CMS']
  },
  'solstice-audio': {
    title: 'Solstice Audio Lab',
    tagline: 'Spatial Audio Brand Identity & E-Commerce Flagship',
    client: 'Solstice Sound Tokyo / London',
    year: '2025',
    category: 'Brand / Web & Tech',
    liveUrl: '#',
    overview: 'Solstice designs acoustic monitors for Grammy-winning audio engineers. Sindikato built their global brand system, custom parametric product visualizer, and high-conversion e-commerce storefront with sub-second page loads.',
    impact: ['4.8x Return on Ad Spend (ROAS)', 'Global sellout of initial 10,000 units within 72 hours', 'Featured in Wallpaper* and Design Milk'],
    stack: ['Shopify Plus Headless', 'Custom 3D Configurator', 'Figma Design System', 'Stripe Global Payments']
  },
  'kroma-fintech': {
    title: 'Kroma Fintech',
    tagline: 'Institutional Digital Asset Ecosystem & Mobile Platform',
    client: 'Kroma Capital Singapore',
    year: '2025',
    category: 'The Web & Tech',
    liveUrl: '#',
    overview: 'Kroma provides compliant treasury management for Web3 institutions. We executed a complete brand refresh, complex UI/UX design architecture, and high-frequency reactive charting interface.',
    impact: ['$1.2B in institutional transaction volume handled', 'Sub-50ms latency charting experience', 'Best Fintech UX Award 2025'],
    stack: ['React', 'TypeScript', 'D3.js / TradingView Lightweight Charts', 'WebSockets', 'Design Token Pipeline']
  },
  'nox-vanguard': {
    title: 'Nox Vanguard Spirits',
    tagline: 'Artisanal Ultra-Premium Botanical Spirits Brand',
    client: 'Vanguard Distilleries',
    year: '2024',
    category: 'The Brand / Media',
    liveUrl: '#',
    overview: 'An avant-garde craft distillery blending ancient botanical distillation with futuristic sensory aesthetics. Sindikato developed the bottle industrial design, bespoke typography, launch cinema film, and viral marketing campaign.',
    impact: ['15M+ Impressions across organic TikTok & IG campaigns', 'Gold Medal for Packaging Excellence (PentaAwards)', 'Distributed in 24 Michelin-star venues globally'],
    stack: ['Custom Typography', 'CGI Bottle 3D Renderings', 'Cinema 4D / Octane', 'Strategic Influencer Rollout']
  },
  'vortex-media': {
    title: 'Vortex Music & Festival',
    tagline: 'Southeast Asia’s Largest Immersive Audiovisual Festival',
    client: 'Vortex Live SEA',
    year: '2025',
    category: 'The Noise & Media',
    liveUrl: '#',
    overview: 'Sindikato handled end-to-end creative direction, stage visual design, artist lineup announcements, social media architecture, and dynamic ticketing web application for 45,000 festival attendees.',
    impact: ['Sold out 45,000 tickets in 18 minutes', 'Over 85M social video views during launch week', '#1 Trending topic across Philippines & Singapore'],
    stack: ['Unreal Engine 5 Stage Visuals', 'Next.js Ticketing App', 'After Effects Motion Graphics', 'Omni-channel Ad Strategy']
  },
  'hyperion-aero': {
    title: 'Hyperion Aerospace',
    tagline: 'Autonomous Cargo Aviation Platform',
    client: 'Hyperion Dynamics',
    year: '2026',
    category: 'The Web & Tech',
    liveUrl: '#',
    overview: 'Hyperion is pioneering unmanned heavy-lift electric air cargo. We engineered their enterprise dashboard, flight route simulator, and investor pitch portal with real-time telemetry visualization.',
    impact: ['$85M Series B funding secured', 'Adopted by 6 major global supply chain consortiums', 'Zero downtime deployment'],
    stack: ['Mapbox GL JS', 'FastAPI Backend Integration', 'Vue 3 Enterprise Architecture', 'WebGL Shaders']
  }
};

function initCaseStudyModals() {
  const modalBackdrop = document.getElementById('caseStudyModal');
  const modalBody = document.getElementById('modalContentBody');
  const closeBtn = document.getElementById('closeModalBtn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!modalBackdrop || !modalBody) return;

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const studyId = card.getAttribute('data-id');
      const data = caseStudiesData[studyId];
      if (!data) return;

      modalBody.innerHTML = `
        <div style="margin-bottom: 24px;">
          <span class="badge">${data.category} • ${data.year}</span>
          <h2 style="font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 800; margin-bottom: 8px;">${data.title}</h2>
          <p class="font-serif" style="font-size: 1.25rem; color: var(--accent-lime);">${data.tagline}</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 32px; padding: 18px; background: rgba(0,0,0,0.2); border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          <div>
            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Client</div>
            <div style="font-weight: 700;">${data.client}</div>
          </div>
          <div>
            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Year</div>
            <div style="font-weight: 700;">${data.year}</div>
          </div>
          <div>
            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Discipline</div>
            <div style="font-weight: 700;">${data.category}</div>
          </div>
        </div>

        <div style="margin-bottom: 32px;">
          <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 12px;">The Project & Challenge</h3>
          <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1rem;">${data.overview}</p>
        </div>

        <div style="margin-bottom: 32px;">
          <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 14px;">Key Results & Impact</h3>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px;">
            ${data.impact.map(item => `
              <li style="display: flex; align-items: center; gap: 10px; color: var(--text-primary); font-weight: 500;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-lime)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>${item}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div style="margin-bottom: 36px;">
          <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 14px;">Technologies & Deliverables</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${data.stack.map(tech => `
              <span style="font-family: var(--font-mono); font-size: 0.8rem; background: rgba(255,255,255,0.06); padding: 6px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">${tech}</span>
            `).join('')}
          </div>
        </div>

        <div style="display: flex; gap: 14px; flex-wrap: wrap;">
          <a href="#contact" class="btn btn-primary" onclick="document.getElementById('caseStudyModal').classList.remove('open')">Inquire Similar Project</a>
          <button class="btn btn-secondary" onclick="document.getElementById('caseStudyModal').classList.remove('open')">Close Preview</button>
        </div>
      `;

      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* --------------------------------------------------------------------------
   9. INTERACTIVE AGENCY EVENTS & ACTIVATIONS CONFIGURATOR
   -------------------------------------------------------------------------- */
function initProjectEstimator() {
  const scopeOptions = document.querySelectorAll('.scope-opt');
  const sizeOptions = document.querySelectorAll('.size-opt');
  const timelineOptions = document.querySelectorAll('.timeline-opt');
  const priceDisplay = document.getElementById('estimatedPrice');
  const breakdownList = document.getElementById('estimateBreakdown');
  const bookEstimateBtn = document.getElementById('bookEstimateBtn');

  if (!priceDisplay) return;

  let state = {
    scope: 'tournament',
    scopePrice: 8500,
    scopeName: 'Creator Tournament & PK',
    size: 'grand',
    sizePrice: 4000,
    sizeName: 'Grand Venue (500–1,500)',
    timeline: 'broadcast',
    timelineMultiplier: 1.0,
    timelineName: 'Multi-Cam Broadcast (Standard)'
  };

  function updatePrices() {
    const total = (state.scopePrice + state.sizePrice) * state.timelineMultiplier;
    priceDisplay.textContent = `$${total.toLocaleString()}`;

    if (breakdownList) {
      breakdownList.innerHTML = `
        <li><span>Event Format</span><strong>${state.scopeName}</strong></li>
        <li><span>Audience Scale</span><strong>${state.sizeName}</strong></li>
        <li><span>Broadcast Tier</span><strong>${state.timelineName}</strong></li>
        <li><span>Management</span><strong style="color: var(--accent-lime);">Full End-to-End Execution</strong></li>
      `;
    }
  }

  scopeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      scopeOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      state.scope = opt.getAttribute('data-val');
      state.scopePrice = parseInt(opt.getAttribute('data-price'), 10);
      state.scopeName = opt.querySelector('.option-box-label').textContent;
      updatePrices();
    });
  });

  sizeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      sizeOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      state.size = opt.getAttribute('data-val');
      state.sizePrice = parseInt(opt.getAttribute('data-price'), 10);
      state.sizeName = opt.querySelector('.option-box-label').textContent;
      updatePrices();
    });
  });

  timelineOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      timelineOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      state.timeline = opt.getAttribute('data-val');
      state.timelineMultiplier = parseFloat(opt.getAttribute('data-mult'));
      state.timelineName = opt.querySelector('.option-box-label').textContent;
      updatePrices();
    });
  });

  if (bookEstimateBtn) {
    bookEstimateBtn.addEventListener('click', () => {
      const messageField = document.getElementById('contactMessage');
      if (messageField) {
        messageField.value = `[EVENT ACTIVATION BRIEF]\nEvent Format: ${state.scopeName}\nAudience Scale: ${state.sizeName}\nBroadcast Tier: ${state.timelineName}\nEstimated Production Investment: ${priceDisplay.textContent}\n\nHi Sindikato Agency, we want to book this live event activation and production package.`;
      }
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
      showToast(`Event activation brief transferred to booking form!`);
    });
  }

  updatePrices();
}

/* --------------------------------------------------------------------------
   10. INTERACTIVE FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      faqItems.forEach(other => other.classList.remove('active'));
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   11. TESTIMONIALS SLIDER
   -------------------------------------------------------------------------- */
const testimonials = [
  {
    quote: "Sindikato transformed our entire digital presence. Our conversion rate tripled in 90 days after launching the new flagship platform. The precision of their engineering and aesthetic boldness is unmatched in the industry.",
    author: "Alexander Mercer",
    role: "Managing Director, Aura Haute Living (Dubai)",
    rating: 5
  },
  {
    quote: "Working with Sindikato feels like having a Silicon Valley engineering powerhouse merged with a world-class Milan design studio. They don't just build websites — they forge market monopolies.",
    author: "Elena Rostova",
    role: "Co-Founder & CEO, Kroma Capital (Singapore)",
    rating: 5
  },
  {
    quote: "From their viral creative direction to the speed of their delivery, Sindikato exceeded every single KPI we set. Our 45,000 festival tickets sold out in 18 minutes flat.",
    author: "Marcus Chen",
    role: "Head of Brand Experience, Vortex Live SEA",
    rating: 5
  }
];

function initTestimonialSlider() {
  let currentIndex = 0;
  const quoteEl = document.getElementById('testimonialQuote');
  const authorEl = document.getElementById('testimonialAuthor');
  const roleEl = document.getElementById('testimonialRole');
  const prevBtn = document.getElementById('prevTestimonialBtn');
  const nextBtn = document.getElementById('nextTestimonialBtn');

  if (!quoteEl || !authorEl || !roleEl) return;

  function renderTestimonial(index) {
    const t = testimonials[index];
    quoteEl.style.opacity = '0';
    quoteEl.style.transform = 'translateY(10px)';

    setTimeout(() => {
      quoteEl.textContent = `“${t.quote}”`;
      authorEl.textContent = t.author;
      roleEl.textContent = t.role;
      quoteEl.style.opacity = '1';
      quoteEl.style.transform = 'translateY(0)';
    }, 200);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      renderTestimonial(currentIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      renderTestimonial(currentIndex);
    });
  }

  // Auto rotate every 8s
  setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    renderTestimonial(currentIndex);
  }, 8000);
}

/* --------------------------------------------------------------------------
   12. MULTI-OFFICE LIVE WORLD CLOCKS
   -------------------------------------------------------------------------- */
function initOfficeClocks() {
  function updateClocks() {
    const offices = [
      { id: 'timeManila', timeZone: 'Asia/Manila' },
      { id: 'timeDubai', timeZone: 'Asia/Dubai' },
      { id: 'timeSingapore', timeZone: 'Asia/Singapore' },
      { id: 'timeLondon', timeZone: 'Europe/London' }
    ];

    const now = new Date();
    offices.forEach(office => {
      const el = document.getElementById(office.id);
      if (el) {
        try {
          const formatter = new Intl.DateTimeFormat('en-GB', {
            timeZone: office.timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          });
          el.textContent = formatter.format(now);
        } catch (e) {
          el.textContent = now.toLocaleTimeString();
        }
      }
    });
  }

  updateClocks();
  setInterval(updateClocks, 1000);
}

/* --------------------------------------------------------------------------
   13. AI QUICK BRIEF ASSISTANT
   -------------------------------------------------------------------------- */
function initQuickBrief() {
  const briefInput = document.getElementById('heroBriefInput');
  const briefBtn = document.getElementById('heroBriefBtn');

  if (!briefInput || !briefBtn) return;

  function triggerBrief() {
    const val = briefInput.value.trim();
    if (!val) {
      briefInput.focus();
      return;
    }

    const messageField = document.getElementById('contactMessage');
    if (messageField) {
      messageField.value = `[AI QUICK BRIEF TRANSMISSION]\nClient Goal: "${val}"\n\nHi Sindikato Creative Team, we would like to initiate an advisory and execution proposal for this project.`;
    }

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    showToast(`Quick brief received! Form pre-filled for you.`);
  }

  briefBtn.addEventListener('click', triggerBrief);
  briefInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      triggerBrief();
    }
  });
}

/* --------------------------------------------------------------------------
   14. CONTACT FORM VALIDATION & TOAST
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('agencyContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
      showToast('Please complete all required fields.', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Transmitting to Sindikato Vault...</span>`;
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();
      showToast(`Thank you, ${name}! Your brief has been dispatched. Our strategy director will respond within 4 hours.`);
    }, 1200);
  });
}

/* --------------------------------------------------------------------------
   15. HOST RECRUITMENT & COMMISSION ENGINE
   -------------------------------------------------------------------------- */
function initHostRecruitment() {
  const hostSlider = document.getElementById('recruitHostCountSlider');
  const diamondSelect = document.getElementById('recruitDiamondSelect');
  const hostCountDisplay = document.getElementById('recruitHostCountDisplay');
  const earningsDisplay = document.getElementById('recruitEarningsDisplay');
  const posterWrap = document.getElementById('commissionPosterWrap');
  const applyBtn = document.getElementById('applyRecruiterBtn');

  const diamondTiers = {
    '500k': 150,
    '1m': 500,
    '2m': 700,
    '3m': 1000,
    '4m': 1300,
    '5m': 1500,
    '10m': 2000,
    '15m': 2500,
    '20m': 5000
  };

  function updateRecruiterEarnings() {
    if (!hostSlider || !diamondSelect || !earningsDisplay) return;
    const count = parseInt(hostSlider.value, 10);
    const tierKey = diamondSelect.value;
    const ratePerHost = diamondTiers[tierKey] || 500;
    const total = count * ratePerHost;

    if (hostCountDisplay) {
      hostCountDisplay.textContent = `${count} ${count === 1 ? 'Active Host' : 'Active Hosts'}`;
    }
    earningsDisplay.textContent = `₱${total.toLocaleString()}`;
  }

  if (hostSlider) {
    hostSlider.addEventListener('input', updateRecruiterEarnings);
  }

  if (diamondSelect) {
    diamondSelect.addEventListener('change', updateRecruiterEarnings);
  }

  updateRecruiterEarnings();

  // Poster Lightbox Zoom Modal
  if (posterWrap) {
    posterWrap.addEventListener('click', () => {
      const modalBackdrop = document.getElementById('caseStudyModal');
      const modalBody = document.getElementById('modalContentBody');
      if (!modalBackdrop || !modalBody) return;

      modalBody.innerHTML = `
        <div style="text-align: center;">
          <span class="badge">OFFICIAL COMMISSION SCHEDULE</span>
          <h2 style="font-size: clamp(1.6rem, 2.5vw, 2.2rem); font-weight: 800; margin-bottom: 20px; background: var(--gold-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Sindikato Host Recruitment Commission</h2>
          <div style="max-width: 600px; margin: 0 auto 24px auto; border-radius: var(--radius-md); overflow: hidden; border: 2px solid var(--accent-gold); box-shadow: 0 10px 40px rgba(0,0,0,0.8);">
            <img src="assets/images/sindikato-commission.jpg" alt="Sindikato Commission Full Poster" style="width: 100%; height: auto; display: block;">
          </div>
          <div class="sindikato-motto-ribbon" style="margin-bottom: 24px;">
            LOYALTY • DISCIPLINE • RESPECT — WE ARE THE SINDIKATO
          </div>
          <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <a href="#contact" class="btn btn-primary" onclick="document.getElementById('caseStudyModal').classList.remove('open')">Apply as Host / Recruiter</a>
            <button class="btn btn-secondary" onclick="document.getElementById('caseStudyModal').classList.remove('open')">Close Image</button>
          </div>
        </div>
      `;

      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const messageField = document.getElementById('contactMessage');
      if (messageField) {
        messageField.value = `[HOST RECRUITMENT APPLICATION]\nI would like to apply as a Host / Recruiter for Sindikato Agency.\n\nMy streaming background / recruitment goals:\n- Target Hosts / Diamond Goals: \n- Prior Agency Experience: \n- Contact Number: `;
      }
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
      showToast('Recruiter application transferred to contact form!');
    });
  }

  // =========================================================================
  // BOX 1: HOST MODAL & DETAILS MANAGEMENT
  // =========================================================================
  const openHostCard = document.getElementById('openHostPortalCard');
  if (openHostCard) {
    openHostCard.addEventListener('click', () => {
      renderHostPortalModal();
    });
  }

  // =========================================================================
  // BOX 2: RECRUITER MODAL & HOST SUBMISSION
  // =========================================================================
  const openRecruiterCard = document.getElementById('openRecruiterPortalCard');
  if (openRecruiterCard) {
    openRecruiterCard.addEventListener('click', () => {
      renderRecruiterPortalModal();
    });
  }

  // =========================================================================
  // BOX 3: APPLY FOR SUB AGENCY MODAL
  // =========================================================================
  const openSubAgencyCard = document.getElementById('openSubAgencyCard');
  if (openSubAgencyCard) {
    openSubAgencyCard.addEventListener('click', () => {
      renderSubAgencyModal();
    });
  }

  // =========================================================================
  // BOX 4: APPLY FOR RECRUITER MODAL
  // =========================================================================
  const openApplyRecruiterCard = document.getElementById('openApplyRecruiterCard');
  if (openApplyRecruiterCard) {
    openApplyRecruiterCard.addEventListener('click', () => {
      renderApplyRecruiterModal();
    });
  }
}

// --------------------------------------------------------------------------
// =========================================================================
// MASTER ADMIN & OFFICIAL SINDIKATO HOST LIST
// =========================================================================
const MASTER_ADMIN_EMAIL = "joemardaguio1027@gmail.com";
const MASTER_ADMIN_PASS = "pogiako123@";

const HOST_LIST = [
  { idNumber: 'SIN-88201', idName: 'QueenMia_Live', validDays: '26 Days', liveTime: '88.5 hrs', giftRevenue: '₱94,500', gameRevenue: '₱42,300', app: 'TikTok LIVE' },
  { idNumber: 'SIN-77319', idName: 'Boss_King99', validDays: '24 Days', liveTime: '72.0 hrs', giftRevenue: '₱145,200', gameRevenue: '₱68,900', app: 'Bigo Live' },
  { idNumber: 'SIN-65482', idName: 'SweetAngel_PH', validDays: '28 Days', liveTime: '115.0 hrs', giftRevenue: '₱210,000', gameRevenue: '₱95,400', app: 'Poppo Live' },
  { idNumber: 'SIN-99120', idName: 'ShadowDJ_Live', validDays: '22 Days', liveTime: '64.5 hrs', giftRevenue: '₱76,800', gameRevenue: '₱31,200', app: 'TikTok LIVE' },
  { idNumber: 'SIN-54211', idName: 'Bella_Vibe', validDays: '25 Days', liveTime: '80.0 hrs', giftRevenue: '₱118,600', gameRevenue: '₱54,000', app: 'Bigo Live' },
  { idNumber: 'SIN-43109', idName: 'PrinceRaven', validDays: '21 Days', liveTime: '58.5 hrs', giftRevenue: '₱62,400', gameRevenue: '₱28,700', app: 'Poppo Live' },
  { idNumber: 'SIN-31980', idName: 'LadyCassandra', validDays: '27 Days', liveTime: '102.0 hrs', giftRevenue: '₱180,500', gameRevenue: '₱84,200', app: 'TikTok LIVE' },
  { idNumber: 'SIN-22451', idName: 'ViperKing_PK', validDays: '23 Days', liveTime: '76.0 hrs', giftRevenue: '₱132,000', gameRevenue: '₱59,800', app: 'Bigo Live' },
  { idNumber: 'SIN-19874', idName: 'PrincessChloe', validDays: '25 Days', liveTime: '91.5 hrs', giftRevenue: '₱155,800', gameRevenue: '₱71,300', app: 'Poppo Live' },
  { idNumber: 'SIN-67230', idName: 'NeonKnight_Live', validDays: '21 Days', liveTime: '60.0 hrs', giftRevenue: '₱70,200', gameRevenue: '₱33,500', app: 'TikTok LIVE' }
];

let activeHostList = [...HOST_LIST];

// --------------------------------------------------------------------------
// ADMIN AUTHENTICATION UTILITIES
// --------------------------------------------------------------------------
function isAdminLoggedIn() {
  try {
    const session = JSON.parse(localStorage.getItem('sindikato_admin_session') || 'null');
    return session && session.loggedIn && session.email.toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase();
  } catch (e) {
    return false;
  }
}

window.logoutAdmin = function() {
  if (confirm('Are you sure you want to log out from Master Admin mode?')) {
    localStorage.removeItem('sindikato_admin_session');
    showToast('Logged out from Master Admin mode.');
    initAdminNavigation();
    const modalBackdrop = document.getElementById('caseStudyModal');
    if (modalBackdrop && modalBackdrop.classList.contains('open')) {
      renderHostPortalModal('list');
    }
  }
};

function initAdminNavigation() {
  const navBtn = document.getElementById('navAdminBtn');
  const loggedIn = isAdminLoggedIn();

  if (navBtn) {
    if (loggedIn) {
      navBtn.innerHTML = `<span>👑 Master Admin</span>`;
      navBtn.style.background = 'rgba(212,175,55,0.25)';
      navBtn.style.borderColor = 'var(--accent-gold)';
      navBtn.href = '#';
      navBtn.onclick = (e) => {
        e.preventDefault();
        renderHostPortalModal('list');
      };
    } else {
      navBtn.innerHTML = `<span>🔐 Admin Login</span>`;
      navBtn.style.background = '';
      navBtn.style.borderColor = '';
      navBtn.href = 'login.html';
      navBtn.onclick = null;
    }
  }
}

// --------------------------------------------------------------------------
// CLOUDFLARE D1 SYNC
// --------------------------------------------------------------------------
async function syncWithD1Database() {
  try {
    const res = await fetch('/api/hosts');
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        activeHostList = json.data.map(item => ({
          idNumber: item.id_number,
          idName: item.id_name,
          validDays: item.valid_days,
          liveTime: item.live_time,
          giftRevenue: item.gift_revenue,
          gameRevenue: item.game_revenue,
          app: item.app || 'Live'
        }));
        const modalBackdrop = document.getElementById('caseStudyModal');
        if (modalBackdrop && modalBackdrop.classList.contains('open')) {
          renderHostPortalModal('list');
        }
      }
    }
  } catch (e) {}
}

async function saveHostToCloud(host) {
  try {
    await fetch('/api/hosts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_number: host.idNumber,
        id_name: host.idName,
        validDays: host.validDays,
        liveTime: host.liveTime,
        giftRevenue: host.giftRevenue,
        gameRevenue: host.gameRevenue,
        app: host.app,
        status: 'Active'
      })
    });
  } catch (e) {}
}

async function deleteHostFromCloud(idNumber) {
  try {
    await fetch('/api/hosts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_number: idNumber })
    });
  } catch (e) {}
}

window.deleteHostItem = function(index) {
  if (!isAdminLoggedIn()) {
    alert('You must log in as Master Admin before removing a host.');
    window.location.href = 'login.html';
    return;
  }
  const host = activeHostList[index];
  if (confirm(`Are you sure you want to remove ${host.idName} (${host.idNumber}) from the Host List?`)) {
    const idToDelete = host.idNumber;
    activeHostList.splice(index, 1);
    deleteHostFromCloud(idToDelete);
    showToast(`Host ${host.idName} has been successfully removed!`);
    renderHostPortalModal('list');
  }
};

window.copyHostList = function() {
  let text = '=== SINDIKATO AGENCY OFFICIAL HOST LIST ===\n\n';
  activeHostList.forEach((h, i) => {
    text += `${i + 1}. ID: ${h.idNumber} | Name: ${h.idName} | Valid Days: ${h.validDays} | Live Time: ${h.liveTime} | Gift Rev: ${h.giftRevenue} | Game Rev: ${h.gameRevenue} (${h.app || 'Live'})\n`;
  });
  navigator.clipboard.writeText(text).then(() => {
    showToast('Host List copied to clipboard!');
  }).catch(() => {
    showToast('Host List data ready!');
  });
};

window.filterHostListTable = function() {
  const input = document.getElementById('hostListSearchInput');
  if (!input) return;
  const query = input.value.toLowerCase();
  const rows = document.querySelectorAll('#hostListTableBody tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query) ? '' : 'none';
  });
};

// --------------------------------------------------------------------------
// RENDER HOST PORTAL MODAL
// --------------------------------------------------------------------------
function renderHostPortalModal(activeTab = 'list') {
  const modalBackdrop = document.getElementById('caseStudyModal');
  const modalBody = document.getElementById('modalContentBody');
  if (!modalBackdrop || !modalBody) return;

  syncWithD1Database();

  const totalHosts = activeHostList.length;
  const adminActive = isAdminLoggedIn();

  modalBody.innerHTML = `
    <div style="margin-bottom: 18px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
        <span class="badge" style="margin-bottom: 0;">👑 OFFICIAL HOST PORTAL</span>
        <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-gold-bright);">SINDIKATO STREAMER VAULT</span>
      </div>
      <h2 style="font-size: clamp(1.6rem, 2.5vw, 2.2rem); font-weight: 900; background: var(--gold-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Host List & Streamer Performance</h2>
      <p style="color: var(--text-secondary); font-size: 0.92rem;">Track real-time streamer records: ID number, ID name, Valid days, Live streaming time, Gift Revenue, and Game Revenue.</p>
    </div>

    <!-- Admin Status Banner -->
    ${adminActive ? `
      <div style="background: rgba(212,175,55,0.12); border: 1.5px solid var(--accent-gold); border-radius: var(--radius-md); padding: 12px 18px; margin-bottom: 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; box-shadow: 0 0 20px rgba(212,175,55,0.15);">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 1.3rem;">👑</span>
          <div>
            <div style="font-weight: 800; color: var(--accent-gold-bright); font-size: 0.88rem; letter-spacing: 0.04em;">MASTER ADMIN MODE ACTIVE</div>
            <div style="font-size: 0.74rem; color: var(--accent-gold-light); font-family: var(--font-mono);">👑 Executive Full Management Access Verified</div>
          </div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button type="button" class="btn btn-primary btn-pill" style="padding: 6px 14px; font-size: 0.76rem;" onclick="renderHostPortalModal('add')">
            <span>➕ Add Host</span>
          </button>
          <button type="button" class="btn btn-secondary btn-pill" style="padding: 6px 12px; font-size: 0.76rem;" onclick="logoutAdmin()">
            <span>Logout</span>
          </button>
        </div>
      </div>
    ` : `
      <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 10px 16px; margin-bottom: 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
        <div style="font-size: 0.8rem; color: var(--text-muted);">
          👁️ Viewing Mode (Read-Only). Sign in as Master Admin to register or remove hosts.
        </div>
        <a href="login.html" class="btn btn-secondary btn-pill" style="padding: 5px 12px; font-size: 0.76rem;">
          <span>🔐 Admin Login</span>
        </a>
      </div>
    `}

    <!-- Portal Navigation Tabs -->
    <div class="portal-tabs-nav">
      <button class="portal-tab-button ${activeTab === 'list' ? 'active' : ''}" onclick="renderHostPortalModal('list')">1. 📋 Official Host List (${totalHosts})</button>
      ${adminActive ? `
        <button class="portal-tab-button ${activeTab === 'add' ? 'active' : ''}" onclick="renderHostPortalModal('add')">2. ➕ Add New Host</button>
        <button class="portal-tab-button ${activeTab === 'rules' ? 'active' : ''}" onclick="renderHostPortalModal('rules')">3. 💎 Guidelines & Milestones</button>
      ` : `
        <button class="portal-tab-button ${activeTab === 'rules' ? 'active' : ''}" onclick="renderHostPortalModal('rules')">2. 💎 Guidelines & Milestones</button>
      `}
    </div>

    <!-- Tab 1: Host List Table -->
    <div id="hostTabList" style="display: ${activeTab === 'list' ? 'block' : 'none'};">
      
      <!-- Top Summary Badges -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 20px;">
        <div class="host-summary-pill">
          <div class="val">${totalHosts} Active</div>
          <div class="lbl">Total Registered Hosts</div>
        </div>
        <div class="host-summary-pill">
          <div class="val">21 Days</div>
          <div class="lbl">Monthly Target Valid Days</div>
        </div>
        <div class="host-summary-pill">
          <div class="val">Cloud Sync</div>
          <div class="lbl">D1 Verified Database</div>
        </div>
      </div>

      <!-- Search and Action Bar -->
      <div style="display: flex; gap: 10px; margin-bottom: 14px; flex-wrap: wrap; align-items: center; justify-content: space-between;">
        <div style="flex: 1; min-width: 240px; position: relative;">
          <input 
            type="text" 
            id="hostListSearchInput" 
            class="form-control" 
            placeholder="🔍 Search by ID number or ID name..." 
            oninput="filterHostListTable()"
            style="padding: 10px 14px; font-size: 0.88rem; background: rgba(0,0,0,0.4);"
          >
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          ${adminActive ? `
            <button type="button" class="btn btn-primary btn-pill" style="padding: 9px 14px; font-size: 0.82rem;" onclick="renderHostPortalModal('add')">
              <span>+ Add Host</span>
            </button>
          ` : ''}
          <button type="button" class="btn btn-secondary btn-pill" style="padding: 9px 16px; font-size: 0.82rem;" onclick="copyHostList()">
            <span>Copy Roster</span>
          </button>
        </div>
      </div>

      <!-- Host List Table -->
      <div class="host-table-wrapper">
        <table class="portal-records-table" id="hostRecordsTable">
          <thead>
            <tr>
              <th>#</th>
              <th>ID Number</th>
              <th>ID Name</th>
              <th>Valid Days</th>
              <th>Live Time</th>
              <th>Gift Revenue</th>
              <th>Game Revenue</th>
              ${adminActive ? `<th style="text-align: center;">Action</th>` : ''}
            </tr>
          </thead>
          <tbody id="hostListTableBody">
            ${activeHostList.length > 0 ? activeHostList.map((host, idx) => `
              <tr>
                <td style="font-family: var(--font-mono); color: var(--text-muted);">${idx + 1}</td>
                <td>
                  <span style="font-family: var(--font-mono); font-weight: 700; color: var(--accent-gold-bright); background: rgba(212,175,55,0.1); padding: 3px 8px; border-radius: 4px; border: 1px solid rgba(212,175,55,0.25);">
                    ${host.idNumber}
                  </span>
                  ${host.app ? `<div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 3px;">${host.app}</div>` : ''}
                </td>
                <td>
                  <div style="font-weight: 800; color: var(--text-primary); font-size: 0.95rem;">
                    ${host.idName}
                  </div>
                </td>
                <td>
                  <span style="display: inline-block; font-weight: 700; color: #5eead4; background: rgba(94,234,212,0.1); padding: 3px 8px; border-radius: 4px; font-family: var(--font-mono); font-size: 0.82rem;">
                    📅 ${host.validDays}
                  </span>
                </td>
                <td>
                  <span style="display: inline-block; font-weight: 700; color: #93c5fd; background: rgba(147,197,253,0.1); padding: 3px 8px; border-radius: 4px; font-family: var(--font-mono); font-size: 0.82rem;">
                    ⏱️ ${host.liveTime}
                  </span>
                </td>
                <td>
                  <div style="font-weight: 800; color: #facc15; font-family: var(--font-mono); font-size: 0.92rem;">
                    🎁 ${host.giftRevenue}
                  </div>
                </td>
                <td>
                  <div style="font-weight: 800; color: #a7f3d0; font-family: var(--font-mono); font-size: 0.92rem;">
                    🎮 ${host.gameRevenue}
                  </div>
                </td>
                ${adminActive ? `
                  <td style="text-align: center;">
                    <button type="button" class="host-row-btn" onclick="deleteHostItem(${idx})" title="Remove Host">
                      ✕
                    </button>
                  </td>
                ` : ''}
              </tr>
            `).join('') : `
              <tr>
                <td colspan="${adminActive ? 8 : 7}" style="text-align: center; padding: 32px; color: var(--text-muted);">
                  No host records found in the database.
                </td>
              </tr>
            `}
          </tbody>
        </table>
      </div>

      <div style="display: flex; justify-content: flex-end; margin-top: 10px;">
        <button type="button" class="btn btn-secondary" onclick="document.getElementById('caseStudyModal').classList.remove('open')">Close Host Portal</button>
      </div>
    </div>

    <!-- Tab 2: Admin Add New Host Form (Only if admin) -->
    ${adminActive ? `
      <div id="hostTabAdd" style="display: ${activeTab === 'add' ? 'block' : 'none'};">
        <form id="adminAddNewHostForm" style="background: rgba(0,0,0,0.25); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--accent-gold-light);">Register New Host (Admin Access)</h3>
            <span class="badge" style="margin-bottom: 0;">👑 MASTER ADMIN</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">Enter host streamer metrics to automatically save to the Cloudflare D1 Database and live Host List.</p>
          
          <div class="form-group-row">
            <div class="form-group">
              <label class="form-label">ID Number *</label>
              <input type="text" id="adminHostIdNumber" class="form-control" placeholder="e.g. SIN-90823 or 8374921" required>
            </div>
            <div class="form-group">
              <label class="form-label">ID Name / Stage Name *</label>
              <input type="text" id="adminHostIdName" class="form-control" placeholder="e.g. QueenMia_Live or StarHost99" required>
            </div>
          </div>

          <div class="form-group-row">
            <div class="form-group">
              <label class="form-label">Valid Days * (Target: 21 Days)</label>
              <input type="text" id="adminHostValidDays" class="form-control" placeholder="e.g. 26 Days or 21 Days" required>
            </div>
            <div class="form-group">
              <label class="form-label">Live Streaming Time *</label>
              <input type="text" id="adminHostLiveTime" class="form-control" placeholder="e.g. 88.5 hrs or 120 hrs" required>
            </div>
          </div>

          <div class="form-group-row">
            <div class="form-group">
              <label class="form-label">Gift Revenue *</label>
              <input type="text" id="adminHostGiftRevenue" class="form-control" placeholder="e.g. ₱94,500 or 1,500,000 Diamonds" required>
            </div>
            <div class="form-group">
              <label class="form-label">Game Revenue *</label>
              <input type="text" id="adminHostGameRevenue" class="form-control" placeholder="e.g. ₱42,300 or 800,000 Coins" required>
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 20px;">
            <label class="form-label">Live Streaming Platform</label>
            <select id="adminHostApp" class="form-control" style="background: rgba(14,17,26,0.9);">
              <option value="TikTok LIVE">TikTok LIVE</option>
              <option value="Bigo Live">Bigo Live</option>
              <option value="Poppo Live">Poppo Live</option>
              <option value="Likee">Likee</option>
              <option value="Twitch">Twitch</option>
              <option value="Other App">Other App</option>
            </select>
          </div>

          <div style="display: flex; gap: 12px;">
            <button type="submit" class="btn btn-primary" style="flex: 1; padding: 14px;">
              <span>Save to Host List & D1 Database</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </button>
            <button type="button" class="btn btn-secondary" onclick="renderHostPortalModal('list')">Back to Host List</button>
          </div>
        </form>
      </div>
    ` : ''}

    <!-- Tab: Guidelines & Milestones -->
    <div id="hostTabRules" style="display: ${activeTab === 'rules' ? 'block' : 'none'};">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="background: rgba(212,175,55,0.06); padding: 20px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          <h4 style="font-weight: 800; color: var(--accent-gold-bright); margin-bottom: 8px;">💎 Revenue Payout Schedule & Validity</h4>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
            All official Gift Revenue and Game Revenue are computed monthly based on your total <strong>Valid Days</strong> and <strong>Live Streaming Time</strong>. Payouts are officially released on the <strong>5th and 20th of every month</strong> directly to your registered GCash, Maya, or Bank account.
          </p>
        </div>

        <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          <h4 style="font-weight: 800; margin-bottom: 8px;">🛡️ Agency Streaming Standards</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.88rem; color: var(--text-secondary);">
            <li>✓ Minimum of 21 Valid Days per month to qualify for full agency tier bonuses.</li>
            <li>✓ Minimum of 60 to 120 Live Streaming Hours for elite syndicate ranking and promotions.</li>
            <li>✓ <strong>LOYALTY • DISCIPLINE • RESPECT</strong> — Maintain highest professional standards during all live broadcasts.</li>
          </ul>
        </div>

        <div class="sindikato-motto-ribbon">
          LOYALTY • DISCIPLINE • RESPECT — WE ARE THE SINDIKATO
        </div>

        <div style="display: flex; justify-content: flex-end; margin-top: 10px;">
          <button type="button" class="btn btn-secondary" onclick="renderHostPortalModal('list')">Back to Host List</button>
        </div>
      </div>
    </div>
  `;

  modalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Attach Admin Add Host Form handler
  const addForm = document.getElementById('adminAddNewHostForm');
  if (addForm) {
    addForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newHost = {
        idNumber: document.getElementById('adminHostIdNumber').value.trim(),
        idName: document.getElementById('adminHostIdName').value.trim(),
        validDays: document.getElementById('adminHostValidDays').value.trim(),
        liveTime: document.getElementById('adminHostLiveTime').value.trim(),
        giftRevenue: document.getElementById('adminHostGiftRevenue').value.trim(),
        gameRevenue: document.getElementById('adminHostGameRevenue').value.trim(),
        app: document.getElementById('adminHostApp').value
      };

      activeHostList.unshift(newHost);
      await saveHostToCloud(newHost);

      showToast(`Host ${newHost.idName} (${newHost.idNumber}) successfully registered to the Host List!`);
      renderHostPortalModal('list');
    });
  }
}

// --------------------------------------------------------------------------
// RENDER RECRUITER PORTAL MODAL
// --------------------------------------------------------------------------
function renderRecruiterPortalModal(activeTab = 'submit') {
  const modalBackdrop = document.getElementById('caseStudyModal');
  const modalBody = document.getElementById('modalContentBody');
  if (!modalBackdrop || !modalBody) return;

  const recruitedRoster = JSON.parse(localStorage.getItem('sindikato_recruited_roster') || '[]');

  const diamondCommissionMap = {
    '500K': 150,
    '1M': 500,
    '2M': 700,
    '3M': 1000,
    '4M': 1300,
    '5M': 1500,
    '6M-10M': 2000,
    '11M-15M': 2500,
    '16M-20M': 5000
  };

  const totalProjected = recruitedRoster.reduce((sum, item) => sum + (diamondCommissionMap[item.diamonds] || 500), 0);

  modalBody.innerHTML = `
    <div style="margin-bottom: 20px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <span class="badge" style="margin-bottom: 0;">💼 OFFICIAL RECRUITER PORTAL</span>
        <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-gold-bright);">RECRUITMENT VAULT</span>
      </div>
      <h2 style="font-size: clamp(1.6rem, 2.5vw, 2.2rem); font-weight: 900; background: var(--gold-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Recruiter Submission & Talent Hub</h2>
      <p style="color: var(--text-secondary); font-size: 0.92rem;">Submit newly recruited streamers and track your direct cash commission rewards.</p>
    </div>

    <!-- Portal Navigation Tabs -->
    <div class="portal-tabs-nav">
      <button class="portal-tab-button ${activeTab === 'submit' ? 'active' : ''}" onclick="renderRecruiterPortalModal('submit')">1. Submit Recruited Host</button>
      <button class="portal-tab-button ${activeTab === 'roster' ? 'active' : ''}" onclick="renderRecruiterPortalModal('roster')">2. Recruiter Talent Roster (${recruitedRoster.length})</button>
      <button class="portal-tab-button ${activeTab === 'schedule' ? 'active' : ''}" onclick="renderRecruiterPortalModal('schedule')">3. Commission Schedule</button>
    </div>

    <!-- Tab 1: Submit Recruited Host -->
    <div id="recruiterTabSubmit" style="display: ${activeTab === 'submit' ? 'block' : 'none'};">
      <form id="submitRecruitedHostForm">
        <div class="form-group-row">
          <div class="form-group">
            <label class="form-label">Recruiter Name / Recruiter ID *</label>
            <input type="text" id="recruiterIdInput" class="form-control" placeholder="e.g. Agent Marco / REC-104" required>
          </div>
          <div class="form-group">
            <label class="form-label">Recruiter GCash / Maya / Payout Account *</label>
            <input type="text" id="recruiterPayoutInput" class="form-control" placeholder="e.g. GCash 0918-987-6543" required>
          </div>
        </div>

        <div class="form-group-row">
          <div class="form-group">
            <label class="form-label">Recruited Host Real Name *</label>
            <input type="text" id="recruitedHostName" class="form-control" placeholder="e.g. Angelica Reyes" required>
          </div>
          <div class="form-group">
            <label class="form-label">Recruited Host Live Streamer Name *</label>
            <input type="text" id="recruitedHostStageName" class="form-control" placeholder="e.g. Angel_VibesLive" required>
          </div>
        </div>

        <div class="form-group-row">
          <div class="form-group">
            <label class="form-label">Streaming Platform *</label>
            <select id="recruitedHostApp" class="form-control" style="background: rgba(14,17,26,0.9);">
              <option value="TikTok LIVE">TikTok LIVE</option>
              <option value="Bigo Live">Bigo Live</option>
              <option value="Poppo Live">Poppo Live</option>
              <option value="Likee">Likee</option>
              <option value="Twitch">Twitch</option>
              <option value="Other App">Other App</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Host App ID / Profile Link *</label>
            <input type="text" id="recruitedHostId" class="form-control" placeholder="e.g. @angelvibes / ID: 884729" required>
          </div>
        </div>

        <div class="form-group-row">
          <div class="form-group">
            <label class="form-label">Expected Monthly Diamonds Target *</label>
            <select id="recruitedHostDiamonds" class="form-control" style="background: rgba(14,17,26,0.9);">
              <option value="500K">💎 500K Diamonds (₱150 Commission)</option>
              <option value="1M">💎 1M Diamonds (₱500 Commission)</option>
              <option value="2M">💎 2M Diamonds (₱700 Commission)</option>
              <option value="3M">💎 3M Diamonds (₱1,000 Commission)</option>
              <option value="4M">💎 4M Diamonds (₱1,300 Commission)</option>
              <option value="5M" selected>💎 5M Diamonds (₱1,500 Commission)</option>
              <option value="6M-10M">💎 6M–10M Diamonds (₱2,000 Commission)</option>
              <option value="11M-15M">💎 11M–15M Diamonds (₱2,500 Commission)</option>
              <option value="16M-20M">💎 16M–20M Diamonds (₱5,000 Commission)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Host Contact / Social Media Link</label>
            <input type="text" id="recruitedHostContact" class="form-control" placeholder="e.g. fb.com/angel.reyes / 0917-000-0000">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Recruitment Notes / Special Requests</label>
          <textarea id="recruitedHostNotes" class="form-control" style="min-height: 80px;" placeholder="Optional notes for agency managers..."></textarea>
        </div>

        <div style="display: flex; gap: 14px; margin-top: 10px;">
          <button type="submit" class="btn btn-primary" style="flex: 1; padding: 16px;">
            <span>Submit Recruited Host to Vault</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </button>
          <button type="button" class="btn btn-secondary" onclick="document.getElementById('caseStudyModal').classList.remove('open')">Close</button>
        </div>
      </form>
    </div>

    <!-- Tab 2: Recruiter Roster Table -->
    <div id="recruiterTabRoster" style="display: ${activeTab === 'roster' ? 'block' : 'none'};">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; background: rgba(212,175,55,0.08); padding: 16px 20px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
        <div>
          <div style="font-size: 0.8rem; font-family: var(--font-mono); color: var(--text-muted); text-transform: uppercase;">Total Active Recruits</div>
          <div style="font-size: 1.4rem; font-weight: 800; color: var(--accent-gold-bright);">${recruitedRoster.length} Hosts</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 0.8rem; font-family: var(--font-mono); color: var(--text-muted); text-transform: uppercase;">Total Projected Commission</div>
          <div style="font-size: 1.6rem; font-weight: 900; background: var(--gold-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">₱${totalProjected.toLocaleString()}</div>
        </div>
      </div>

      ${recruitedRoster.length > 0 ? `
        <div style="overflow-x: auto; margin-bottom: 24px;">
          <table class="portal-records-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Recruited Host</th>
                <th>App & ID</th>
                <th>Diamond Goal</th>
                <th>Commission</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${recruitedRoster.map((item, idx) => `
                <tr>
                  <td style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-muted);">${item.date}</td>
                  <td><strong>${item.stageName}</strong><br><span style="font-size: 0.75rem; color: var(--text-muted);">${item.realName}</span></td>
                  <td><span class="badge" style="margin-bottom: 0; padding: 2px 8px; font-size: 0.7rem;">${item.app}</span><br><span style="font-family: var(--font-mono); font-size: 0.75rem;">${item.hostId}</span></td>
                  <td style="font-family: var(--font-mono); font-weight: 700; color: var(--accent-gold-bright);">💎 ${item.diamonds}</td>
                  <td style="font-family: var(--font-mono); font-weight: 800; color: var(--accent-gold-light);">₱${(diamondCommissionMap[item.diamonds] || 500).toLocaleString()}</td>
                  <td><span style="font-size: 0.75rem; color: #27c93f; background: rgba(39,201,63,0.1); padding: 4px 10px; border-radius: var(--radius-full); border: 1px solid rgba(39,201,63,0.3);">● Verified</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <button class="btn btn-primary" onclick="renderRecruiterPortalModal('submit')">+ Add Another Host</button>
          <button class="btn btn-secondary" onclick="alert('Recruiter Talent Roster copied to clipboard!');">Copy Roster</button>
          <button class="btn btn-secondary" onclick="document.getElementById('caseStudyModal').classList.remove('open')">Close</button>
        </div>
      ` : `
        <div style="text-align: center; padding: 40px 20px; background: rgba(0,0,0,0.2); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <div style="font-size: 3rem; margin-bottom: 12px;">💼</div>
          <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 8px;">No Recruited Hosts Submitted Yet</h3>
          <p style="color: var(--text-secondary); max-width: 460px; margin: 0 auto 20px auto; font-size: 0.9rem;">
            Use Tab 1 to submit new streamer recruits to record them in your commission vault.
          </p>
          <button class="btn btn-primary" onclick="renderRecruiterPortalModal('submit')">Submit First Host</button>
        </div>
      `}
    </div>

    <!-- Tab 3: Commission Schedule -->
    <div id="recruiterTabSchedule" style="display: ${activeTab === 'schedule' ? 'block' : 'none'};">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="background: rgba(212,175,55,0.06); padding: 20px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          <h4 style="font-weight: 800; color: var(--accent-gold-bright); margin-bottom: 8px;">💰 Recruiter Cash Commission Mechanics</h4>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
            As an official recruiter, you earn direct cash commissions on every active host you scout whenever they achieve their monthly diamond target tiers.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
          <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: var(--radius-sm); text-align: center; border: 1px solid var(--border-color);">
            <div style="font-size: 0.8rem;">💎 500K</div>
            <div style="font-family: var(--font-mono); font-weight: 800; color: var(--accent-gold-bright);">₱150</div>
          </div>
          <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: var(--radius-sm); text-align: center; border: 1px solid var(--border-color);">
            <div style="font-size: 0.8rem;">💎 1M</div>
            <div style="font-family: var(--font-mono); font-weight: 800; color: var(--accent-gold-bright);">₱500</div>
          </div>
          <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: var(--radius-sm); text-align: center; border: 1px solid var(--border-color);">
            <div style="font-size: 0.8rem;">💎 2M</div>
            <div style="font-family: var(--font-mono); font-weight: 800; color: var(--accent-gold-bright);">₱700</div>
          </div>
          <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: var(--radius-sm); text-align: center; border: 1px solid var(--border-color);">
            <div style="font-size: 0.8rem;">💎 3M</div>
            <div style="font-family: var(--font-mono); font-weight: 800; color: var(--accent-gold-bright);">₱1,000</div>
          </div>
          <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: var(--radius-sm); text-align: center; border: 1px solid var(--border-color);">
            <div style="font-size: 0.8rem;">💎 5M</div>
            <div style="font-family: var(--font-mono); font-weight: 800; color: var(--accent-gold-bright);">₱1,500</div>
          </div>
          <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: var(--radius-sm); text-align: center; border: 1px solid var(--border-color);">
            <div style="font-size: 0.8rem;">💎 16M–20M</div>
            <div style="font-family: var(--font-mono); font-weight: 800; color: var(--accent-gold-bright);">₱5,000</div>
          </div>
        </div>

        <div class="sindikato-motto-ribbon">
          LOYALTY • DISCIPLINE • RESPECT — WE ARE THE SINDIKATO
        </div>
      </div>
    </div>
  `;

  modalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Attach form submit listener
  const form = document.getElementById('submitRecruitedHostForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const newRecruit = {
        recruiterId: document.getElementById('recruiterIdInput').value.trim(),
        recruiterPayout: document.getElementById('recruiterPayoutInput').value.trim(),
        realName: document.getElementById('recruitedHostName').value.trim(),
        stageName: document.getElementById('recruitedHostStageName').value.trim(),
        app: document.getElementById('recruitedHostApp').value,
        hostId: document.getElementById('recruitedHostId').value.trim(),
        diamonds: document.getElementById('recruitedHostDiamonds').value,
        contact: document.getElementById('recruitedHostContact').value.trim(),
        notes: document.getElementById('recruitedHostNotes').value.trim(),
        date: new Date().toLocaleDateString()
      };

      const roster = JSON.parse(localStorage.getItem('sindikato_recruited_roster') || '[]');
      roster.unshift(newRecruit);
      localStorage.setItem('sindikato_recruited_roster', JSON.stringify(roster));

      showToast(`Successfully submitted ${newRecruit.stageName} to the Recruiter Roster!`);
      renderRecruiterPortalModal('roster');
    });
  }
}

// --------------------------------------------------------------------------
// RENDER SUB-AGENCY PARTNERSHIP MODAL
// --------------------------------------------------------------------------
function renderSubAgencyModal() {
  const modalBackdrop = document.getElementById('caseStudyModal');
  const modalBody = document.getElementById('modalContentBody');
  if (!modalBackdrop || !modalBody) return;

  modalBody.innerHTML = `
    <div style="margin-bottom: 24px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <span class="badge" style="margin-bottom: 0;">🏛️ MASTER SUB-AGENCY PARTNERSHIP</span>
        <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-gold-bright);">ENTERPRISE ALLIANCE</span>
      </div>
      <h2 style="font-size: clamp(1.6rem, 2.5vw, 2.2rem); font-weight: 900; background: var(--gold-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Apply for Sub-Agency Partnership</h2>
      <p style="color: var(--text-secondary); font-size: 0.92rem;">
        Apply as an official Sub-Agency of Sindikato. Lead your own roster of streamers and recruiters with master agency split rates, enterprise analytics, and VIP key account support.
      </p>
    </div>

    <form id="subAgencyApplicationForm">
      <div class="form-group-row">
        <div class="form-group">
          <label class="form-label">Proposed Sub-Agency Name *</label>
          <input type="text" id="subAgencyName" class="form-control" placeholder="e.g. Apex Diamond Media" required>
        </div>
        <div class="form-group">
          <label class="form-label">Agency Head / Master Leader Full Name *</label>
          <input type="text" id="subAgencyLeader" class="form-control" placeholder="e.g. Roberto De Guzman" required>
        </div>
      </div>

      <div class="form-group-row">
        <div class="form-group">
          <label class="form-label">Current / Estimated Host Team Size *</label>
          <select id="subAgencyTeamSize" class="form-control" style="background: rgba(14,17,26,0.9);">
            <option value="1-5 Hosts">1 – 5 Active Hosts</option>
            <option value="6-20 Hosts" selected>6 – 20 Active Hosts</option>
            <option value="21-50 Hosts">21 – 50 Active Hosts</option>
            <option value="50+ Hosts">50+ Elite Host Streamers</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Primary Streaming Platform Focus *</label>
          <select id="subAgencyPlatform" class="form-control" style="background: rgba(14,17,26,0.9);">
            <option value="TikTok LIVE">TikTok LIVE Focus</option>
            <option value="Bigo Live">Bigo Live Focus</option>
            <option value="Poppo Live">Poppo Live Focus</option>
            <option value="Multi-Platform">Multi-Platform (All Apps)</option>
          </select>
        </div>
      </div>

      <div class="form-group-row">
        <div class="form-group">
          <label class="form-label">Target Monthly Diamond Turnover *</label>
          <select id="subAgencyDiamondGoal" class="form-control" style="background: rgba(14,17,26,0.9);">
            <option value="5M - 15M Diamonds">💎 5M – 15M Diamonds / Month</option>
            <option value="16M - 50M Diamonds" selected>💎 16M – 50M Diamonds / Month</option>
            <option value="50M - 100M+ Diamonds">💎 50M – 100M+ Master Crown</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Contact Mobile / WhatsApp *</label>
          <input type="text" id="subAgencyContact" class="form-control" placeholder="e.g. +63 917 888 9999" required>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Sub-Agency Growth Goals & Background *</label>
        <textarea id="subAgencyNotes" class="form-control" style="min-height: 90px;" placeholder="Share your live streaming agency background, recruitment strategy, and growth targets..." required></textarea>
      </div>

      <div style="background: rgba(212,175,55,0.08); padding: 14px 18px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin-bottom: 20px; font-size: 0.82rem; color: var(--accent-gold-light);">
        🔒 VIP Partnership Review: Your sub-agency application will be directly forwarded to the Sindikato Executive Directors for exclusive review and terms alignment.
      </div>

      <div style="display: flex; gap: 14px;">
        <button type="submit" class="btn btn-primary" style="flex: 1; padding: 16px;">
          <span>Submit Sub-Agency Application</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </button>
        <button type="button" class="btn btn-secondary" onclick="document.getElementById('caseStudyModal').classList.remove('open')">Close</button>
      </div>
    </form>
  `;

  modalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';

  const form = document.getElementById('subAgencyApplicationForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const appData = {
        name: document.getElementById('subAgencyName').value.trim(),
        leader: document.getElementById('subAgencyLeader').value.trim(),
        size: document.getElementById('subAgencyTeamSize').value,
        platform: document.getElementById('subAgencyPlatform').value,
        goal: document.getElementById('subAgencyDiamondGoal').value,
        contact: document.getElementById('subAgencyContact').value.trim(),
        notes: document.getElementById('subAgencyNotes').value.trim(),
        date: new Date().toLocaleDateString()
      };

      const apps = JSON.parse(localStorage.getItem('sindikato_subagency_applications') || '[]');
      apps.unshift(appData);
      localStorage.setItem('sindikato_subagency_applications', JSON.stringify(apps));

      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
      showToast(`Application for ${appData.name} submitted successfully! A Master Agency Director will contact you within 4 hours.`);
    });
  }
}

// --------------------------------------------------------------------------
// RENDER APPLY FOR RECRUITER ONBOARDING MODAL
// --------------------------------------------------------------------------
function renderApplyRecruiterModal() {
  const modalBackdrop = document.getElementById('caseStudyModal');
  const modalBody = document.getElementById('modalContentBody');
  if (!modalBackdrop || !modalBody) return;

  modalBody.innerHTML = `
    <div style="margin-bottom: 24px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <span class="badge" style="margin-bottom: 0;">🤝 OFFICIAL RECRUITER ONBOARDING</span>
        <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-gold-bright);">ZERO REGISTRATION FEE</span>
      </div>
      <h2 style="font-size: clamp(1.6rem, 2.5vw, 2.2rem); font-weight: 900; background: var(--gold-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Apply as Official Talent Recruiter</h2>
      <p style="color: var(--text-secondary); font-size: 0.92rem;">
        Join the Sindikato Recruiter Network. Earn direct cash commissions (₱150 to ₱5,000 per host milestone) every month with zero upfront costs or registration fees.
      </p>
    </div>

    <form id="recruiterOnboardingForm">
      <div class="form-group-row">
        <div class="form-group">
          <label class="form-label">Your Full Name *</label>
          <input type="text" id="recruiterApplicantName" class="form-control" placeholder="e.g. Christian Paul Mendoza" required>
        </div>
        <div class="form-group">
          <label class="form-label">Preferred Recruiter Code / Agent Handle *</label>
          <input type="text" id="recruiterApplicantCode" class="form-control" placeholder="e.g. AGENT-CHRIS / CP-RECRUIT" required>
        </div>
      </div>

      <div class="form-group-row">
        <div class="form-group">
          <label class="form-label">Primary Scouting Platform *</label>
          <select id="recruiterApplicantChannel" class="form-control" style="background: rgba(14,17,26,0.9);">
            <option value="TikTok & Social Media">TikTok & Instagram Outreach</option>
            <option value="Bigo & Live Streaming Apps">Bigo Live & Poppo Communities</option>
            <option value="Facebook Groups & Referrals">Facebook Groups & Personal Network</option>
            <option value="Influencer & Creator Network">Direct Influencer & Talent Circles</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Estimated Monthly Recruits Target *</label>
          <select id="recruiterApplicantGoal" class="form-control" style="background: rgba(14,17,26,0.9);">
            <option value="1-3 Hosts (₱1,500 - ₱15,000 / mo)">1 – 3 Hosts / Month</option>
            <option value="4-10 Hosts (₱10,000 - ₱50,000 / mo)" selected>4 – 10 Hosts / Month</option>
            <option value="10+ Hosts (₱50,000+ / mo)">10+ Hosts Master Scout</option>
          </select>
        </div>
      </div>

      <div class="form-group-row">
        <div class="form-group">
          <label class="form-label">GCash / Maya / Bank Payout Account *</label>
          <input type="text" id="recruiterApplicantPayout" class="form-control" placeholder="e.g. GCash 0917-123-4567" required>
        </div>
        <div class="form-group">
          <label class="form-label">Contact Number / Telegram / WhatsApp *</label>
          <input type="text" id="recruiterApplicantContact" class="form-control" placeholder="e.g. 0917-123-4567 / @telegram_handle" required>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Why do you want to recruit with Sindikato Agency? *</label>
        <textarea id="recruiterApplicantReason" class="form-control" style="min-height: 80px;" placeholder="Share your live streaming experience and recruitment strategy..." required></textarea>
      </div>

      <div style="display: flex; gap: 14px;">
        <button type="submit" class="btn btn-primary" style="flex: 1; padding: 16px;">
          <span>Complete Recruiter Onboarding</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </button>
        <button type="button" class="btn btn-secondary" onclick="document.getElementById('caseStudyModal').classList.remove('open')">Close</button>
      </div>
    </form>
  `;

  modalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';

  const form = document.getElementById('recruiterOnboardingForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const recruiterData = {
        name: document.getElementById('recruiterApplicantName').value.trim(),
        code: document.getElementById('recruiterApplicantCode').value.trim(),
        channel: document.getElementById('recruiterApplicantChannel').value,
        goal: document.getElementById('recruiterApplicantGoal').value,
        payout: document.getElementById('recruiterApplicantPayout').value.trim(),
        contact: document.getElementById('recruiterApplicantContact').value.trim(),
        reason: document.getElementById('recruiterApplicantReason').value.trim(),
        onboardedAt: new Date().toLocaleDateString()
      };

      const apps = JSON.parse(localStorage.getItem('sindikato_recruiter_applications') || '[]');
      apps.unshift(recruiterData);
      localStorage.setItem('sindikato_recruiter_applications', JSON.stringify(apps));

      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
      showToast(`Welcome to the Sindikato Recruiter Network, Agent ${recruiterData.code}! Your onboarding packet has been dispatched.`);
    });
  }
}


