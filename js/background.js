/* ============================================
   CRILINES ACADEMY — background.js
   Particle network with scroll reaction
   ============================================ */

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

const CONFIG = {
  particleCount: 80,
  maxDistance:   150,
  particleSpeed: 0.4,
  dotRadius:     1.5,
  lineOpacity:   0.12,
  dotOpacity:    0.25,
  color:         '0, 200, 83',   // green
  scrollMult:    0.08,           // how much scroll affects particles
};

let width, height, particles = [];
let scrollY = 0, targetScrollY = 0;

function resize() {
  width  = canvas.width  = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

class Particle {
  constructor() { this.reset(true); }

  reset(initial = false) {
    this.x  = Math.random() * width;
    this.y  = initial ? Math.random() * height : height + 10;
    this.vx = (Math.random() - 0.5) * CONFIG.particleSpeed;
    this.vy = -(Math.random() * CONFIG.particleSpeed + 0.2); // drift upward
    this.radius = Math.random() * CONFIG.dotRadius + 0.5;
    this.alpha  = Math.random() * CONFIG.dotOpacity + 0.08;
  }

  update(scrollDelta) {
    this.x += this.vx;
    this.vy -= scrollDelta * CONFIG.scrollMult * 0.001; // scroll pushes up
    this.y  += this.vy;

    // Wrap horizontally
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;

    // Reset when off top
    if (this.y < -10) this.reset();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${CONFIG.color}, ${this.alpha})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < CONFIG.particleCount; i++) {
    particles.push(new Particle());
  }
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i];
      const b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CONFIG.maxDistance) {
        const opacity = (1 - dist / CONFIG.maxDistance) * CONFIG.lineOpacity;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(${CONFIG.color}, ${opacity})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }
}

let lastScrollY = 0;

function animate() {
  ctx.clearRect(0, 0, width, height);

  // Smooth scroll delta
  targetScrollY = window.scrollY;
  const scrollDelta = targetScrollY - lastScrollY;
  lastScrollY = targetScrollY;

  particles.forEach(p => p.update(scrollDelta));
  drawConnections();
  particles.forEach(p => p.draw());

  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => { resize(); initParticles(); });
resize();
initParticles();
animate();
