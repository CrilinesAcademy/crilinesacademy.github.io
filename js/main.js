/* ============================================
   CRILINES ACADEMY — main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV SCROLL STATE ── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ── HAMBURGER MOBILE MENU ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('nav-mobile');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
      });

      // Open clicked if it was closed
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  /* ── STAGGER CHILDREN ── */
  document.querySelectorAll('.stagger').forEach(parent => {
    Array.from(parent.children).forEach((child, i) => {
      child.classList.add('reveal');
      child.style.transitionDelay = `${i * 80}ms`;
    });
  });

  // Re-observe new reveal elements from stagger
  document.querySelectorAll('.reveal:not([data-observed])').forEach(el => {
    el.dataset.observed = '1';
    revealObserver.observe(el);
  });

  /* ── COUNTER ANIMATION ── */
  function animateCounter(el, target, suffix) {
    const duration = 1600;
    const start = performance.now();
    const isFloat = target % 1 !== 0;

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = isFloat
        ? (eased * target).toFixed(1)
        : Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  /* ── SMOOTH SCROLL (fallback for older browsers) ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 70; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── ACTIVE NAV HIGHLIGHT ── */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

});

/* ── AUTO SCROLL (Testimonials) ── */
window.addEventListener('load', () => {
  const slider = document.querySelector('.testimonial-grid');
  if (!slider) return;

  // Duplicate cards for seamless loop
  const cards = Array.from(slider.children);
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    slider.appendChild(clone);
  });

  let isPaused = false;
  const halfWidth = slider.scrollWidth / 2;

  setInterval(() => {
    if (isPaused) return;
    slider.scrollLeft += 1;
    if (slider.scrollLeft >= halfWidth) {
      slider.scrollLeft = 0;
    }
  }, 16);

  slider.addEventListener('mouseenter', () => isPaused = true);
  slider.addEventListener('mouseleave', () => isPaused = false);
  slider.addEventListener('touchstart', () => isPaused = true);
  slider.addEventListener('touchend', () => isPaused = false);
});

/* ── DISCORD CHANNEL SWITCHER ── */
const channels = {
  'market-analysis': [
    { av: 'T1', color: '#00C853', bg: 'rgba(0,200,83,0.15)', name: 'Mentor', time: 'Today 7:12 AM', text: 'Gold looking for a retest of 2,310. Watch for rejection at that level. <span class="chat-tag tag-buy">BUY SETUP</span>' },
    { av: 'T2', color: '#9090ff', bg: 'rgba(100,100,255,0.12)', name: 'Trader 2', time: 'Today 7:15 AM', text: 'Nice confluence with the weekly FVG too 🎯 alert set' },
    { av: 'T3', color: '#FFB800', bg: 'rgba(255,180,0,0.12)', name: 'Trader 3', time: 'Today 9:43 AM', text: 'Just took it — solid R:R on this one 🙌' },
    { av: 'T4', color: '#00C853', bg: 'rgba(0,200,83,0.15)', name: 'Mentor', time: 'Today 10:01 AM', text: 'NAS100 also forming <span class="chat-tag tag-sell">SELL SETUP</span> on 1H — check key level.' },
  ],
  'trade-setups': [
    { av: 'T1', color: '#00C853', bg: 'rgba(0,200,83,0.15)', name: 'Mentor', time: 'Today 6:50 AM', text: 'BTC rejection at 67,400 resistance. Watching for lower TF confirmation. <span class="chat-tag tag-sell">SELL SETUP</span>' },
    { av: 'T5', color: '#ff8050', bg: 'rgba(255,100,50,0.12)', name: 'Trader 5', time: 'Today 7:03 AM', text: 'Silver also setting up at 28.50 — clean OB there' },
    { av: 'T2', color: '#9090ff', bg: 'rgba(100,100,255,0.12)', name: 'Trader 2', time: 'Today 8:22 AM', text: 'ETH looks like it\'s sweeping lows before reversal 👀' },
    { av: 'T1', color: '#00C853', bg: 'rgba(0,200,83,0.15)', name: 'Mentor', time: 'Today 9:00 AM', text: 'Good read. Wait for the sweep then look for <span class="chat-tag tag-buy">BUY SETUP</span> on M15.' },
  ],
  'trade-reviews': [
    { av: 'T3', color: '#FFB800', bg: 'rgba(255,180,0,0.12)', name: 'Trader 3', time: 'Yesterday 4:12 PM', text: 'Posted my Gold trade — entered at 2,305, TP at 2,340. Held through the pullback.' },
    { av: 'T1', color: '#00C853', bg: 'rgba(0,200,83,0.15)', name: 'Mentor', time: 'Yesterday 4:45 PM', text: 'Good patience on the hold. Entry was clean, only feedback — move SL to BE earlier after 1:1 hit.' },
    { av: 'T3', color: '#FFB800', bg: 'rgba(255,180,0,0.12)', name: 'Trader 3', time: 'Yesterday 4:47 PM', text: 'Noted! Will apply that next time. Thanks boss 🙏' },
    { av: 'T6', color: '#40c8ff', bg: 'rgba(0,180,255,0.12)', name: 'Trader 6', time: 'Yesterday 5:01 PM', text: 'Can you review mine too? BTC short from 67,400 — attached screenshot' },
  ],
  'study-resources': [
    { av: 'T1', color: '#00C853', bg: 'rgba(0,200,83,0.15)', name: 'Mentor', time: 'Monday 9:00 AM', text: '📚 New module uploaded — AMT + FRVP applied to Gold. Watch before the next live session.' },
    { av: 'T4', color: '#b07fff', bg: 'rgba(130,80,255,0.12)', name: 'Trader 4', time: 'Monday 10:30 AM', text: 'Just finished the FVG module. Everything makes sense now 🔥' },
    { av: 'T2', color: '#9090ff', bg: 'rgba(100,100,255,0.12)', name: 'Trader 2', time: 'Monday 11:00 AM', text: 'Same — the part on imbalance context finally clicked for me' },
    { av: 'T1', color: '#00C853', bg: 'rgba(0,200,83,0.15)', name: 'Mentor', time: 'Monday 11:15 AM', text: 'That\'s the goal. Context is everything — indicators just confirm what price already shows.' },
  ],
  'wins-and-losses': [
    { av: 'T5', color: '#ff8050', bg: 'rgba(255,100,50,0.12)', name: 'Trader 5', time: 'Today 2:00 PM', text: '🏆 First funded account passed! FTMO Phase 1 done. Roadmap + reviews made the difference.' },
    { av: 'T3', color: '#FFB800', bg: 'rgba(255,180,0,0.12)', name: 'Trader 3', time: 'Today 2:05 PM', text: 'Let\'s go!! Congrats 🎉 you deserve it' },
    { av: 'T6', color: '#40c8ff', bg: 'rgba(0,180,255,0.12)', name: 'Trader 6', time: 'Today 2:08 PM', text: 'Took an L on BTC today — overtraded during news. Lesson learned, staying disciplined next week.' },
    { av: 'T1', color: '#00C853', bg: 'rgba(0,200,83,0.15)', name: 'Mentor', time: 'Today 2:15 PM', text: 'Both are wins — one is profit, one is growth. Post the review in #trade-reviews so everyone can learn from it.' },
  ],
  'general': [
    { av: 'T2', color: '#9090ff', bg: 'rgba(100,100,255,0.12)', name: 'Trader 2', time: 'Today 12:00 PM', text: 'Gm everyone 🌅 market looking choppy today, staying patient' },
    { av: 'T4', color: '#b07fff', bg: 'rgba(130,80,255,0.12)', name: 'Trader 4', time: 'Today 12:05 PM', text: 'Gm! Yeah same — waiting for London close before touching anything' },
    { av: 'T3', color: '#FFB800', bg: 'rgba(255,180,0,0.12)', name: 'Trader 3', time: 'Today 12:10 PM', text: 'Best trade is sometimes no trade 💯' },
    { av: 'T1', color: '#00C853', bg: 'rgba(0,200,83,0.15)', name: 'Mentor', time: 'Today 12:14 PM', text: 'Exactly. Patience is a position. See everyone at the live session tonight 🎙️' },
  ],
};

function switchChannel(name) {
  // Update active state in sidebar
  document.querySelectorAll('.sidebar-ch').forEach(el => {
    el.classList.toggle('active', el.textContent.trim().replace('# ', '') === name);
  });

  const msgs = channels[name];
  const container = document.getElementById('discord-messages');
  if (!container || !msgs) return;

  container.innerHTML = `<div class="ch-title"># ${name}</div>` + msgs.map(m => `
    <div class="chat-msg">
      <div class="chat-av" style="background:${m.bg};color:${m.color};">${m.av}</div>
      <div class="chat-right">
        <div class="chat-meta">
          <span class="chat-name" style="color:${m.color};">${m.name}</span>
          <span class="chat-time">${m.time}</span>
        </div>
        <div class="chat-text">${m.text}</div>
      </div>
    </div>
  `).join('');
}

// Load default channel on page load
document.addEventListener('DOMContentLoaded', () => switchChannel('market-analysis'));
