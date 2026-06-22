/* ============================================
   CRILINES ACADEMY — background.js
   Particle network with scroll reaction
   ============================================ */

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

const COLOR = '0, 200, 83';
const PARTICLE_COUNT = 90;
const MAX_DIST = 140;
const SPEED = 0.35;

let width, height, particles = [];
let lastScrollY = 0;

function resize() {
  width  = canvas.width  = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

class Particle {
  constructor() { this.init(true); }

  init(random = false) {
    this.x  = Math.random() * width;
    this.y  = random ? Math.random() * height : height + 10;
    this.vx = (Math.random() - 0.5) * SPEED;
    this.vy = -(Math.random() * SPEED + 0.15);
    this.r  = Math.random() * 1.5 + 0.5;
    this.a  = Math.random() * 0.3 + 0.08;
  }

  update(scrollDelta) {
    this.vy -= scrollDelta * 0.0004;
    this.x  += this.vx;
    this.y  += this.vy;
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < -10) this.init();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${COLOR}, ${this.a})`;
    ctx.fill();
  }
}

function init() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
}

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < MAX_DIST) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(${COLOR}, ${(1 - d / MAX_DIST) * 0.1})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  const scrollDelta = window.scrollY - lastScrollY;
  lastScrollY = window.scrollY;
  particles.forEach(p => { p.update(scrollDelta); p.draw(); });
  drawLines();
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => { resize(); init(); });
resize();
init();
animate();
