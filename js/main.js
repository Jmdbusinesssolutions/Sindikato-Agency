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
  initFaqAccordion();
  initTestimonialSlider();
  initOfficeClocks();
  initQuickBrief();
  initContactForm();
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
  for (let i = 0; i < 40; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw ambient grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
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

    // Update and draw particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(204, 255, 0, ${p.alpha})`;
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
   9. INTERACTIVE PROJECT SCOPE & ESTIMATOR CALCULATOR
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
    scope: 'web',
    scopePrice: 8500,
    scopeName: 'Full-Stack Web Engineering',
    size: 'growth',
    sizePrice: 4000,
    sizeName: 'Growth / Scale Stage',
    timeline: 'standard',
    timelineMultiplier: 1.0,
    timelineName: '4-6 Weeks Standard'
  };

  function updatePrices() {
    const total = (state.scopePrice + state.sizePrice) * state.timelineMultiplier;
    priceDisplay.textContent = `$${total.toLocaleString()}`;

    if (breakdownList) {
      breakdownList.innerHTML = `
        <li><span>Core Discipline</span><strong>${state.scopeName}</strong></li>
        <li><span>Project Tier</span><strong>${state.sizeName}</strong></li>
        <li><span>Delivery Velocity</span><strong>${state.timelineName}</strong></li>
        <li><span>Code Ownership</span><strong style="color: var(--accent-lime);">100% Full IP Transfer</strong></li>
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
        messageField.value = `[AUTO-CONFIGURED ESTIMATE]\nDiscipline: ${state.scopeName}\nTier: ${state.sizeName}\nTimeline: ${state.timelineName}\nEstimated Budget: ${priceDisplay.textContent}\n\nHi Sindikato Team, let's schedule our project kickoff discussion.`;
      }
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
      showToast(`Estimator brief transferred to contact form!`);
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

function showToast(message, type = 'success') {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <div style="width: 10px; height: 10px; border-radius: 50%; background: ${type === 'error' ? '#ff3366' : 'var(--accent-lime)'};"></div>
    <div style="font-size: 0.9rem; font-weight: 600;">${message}</div>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}
