/* ============================================
   CRILINES ACADEMY — background.js
   Animated candlestick chart background
   ============================================ */

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

const GREEN = 'rgba(0, 200, 83, 0.5)';
const RED   = 'rgba(255, 80, 80, 0.45)';
const BODY_W = 8;
const CANDLE_GAP = 28;

let candles = [];
let width, height, cols;

function resize() {
  width  = canvas.width  = window.innerWidth;
  height = canvas.height = window.innerHeight;
  cols   = Math.floor(width / CANDLE_GAP) + 2;
  initCandles();
}

function randomCandle(x) {
  const isBull = Math.random() > 0.45;
  const midY   = Math.random() * height * 0.7 + height * 0.1;
  const bodyH  = Math.random() * 60 + 10;
  const open   = midY - bodyH / 2;
  const close  = midY + bodyH / 2;
  const wickT  = open  - Math.random() * 30;
  const wickB  = close + Math.random() * 30;
  const speed  = Math.random() * 0.3 + 0.1;
  const alpha  = Math.random() * 0.5 + 0.15;

  return { x, open, close, wickT, wickB, isBull, speed, alpha, offset: Math.random() * Math.PI * 2 };
}

function initCandles() {
  candles = [];
  for (let i = 0; i < cols; i++) {
    candles.push(randomCandle(i * CANDLE_GAP));
  }
}

function drawCandle(c, t) {
  const drift = Math.sin(t * c.speed + c.offset) * 18;
  const open  = c.open  + drift;
  const close = c.close + drift;
  const wickT = c.wickT + drift;
  const wickB = c.wickB + drift;
  const color = c.isBull ? GREEN : RED;

  ctx.globalAlpha = c.alpha;
  ctx.strokeStyle = color;
  ctx.fillStyle   = color;
  ctx.lineWidth   = 1;

  // Wick
  ctx.beginPath();
  ctx.moveTo(c.x, wickT);
  ctx.lineTo(c.x, wickB);
  ctx.stroke();

  // Body
  ctx.fillRect(c.x - BODY_W / 2, open, BODY_W, close - open);
}

let t = 0;
function animate() {
  ctx.clearRect(0, 0, width, height);
  t += 0.008;
  candles.forEach(c => drawCandle(c, t));
  requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
resize();
animate();
