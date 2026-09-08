// ============================================
// CodeDuel — Interactive Cyber Particle Constellation
// 60FPS Ambient Particle Network reacting to Cursor
// ============================================

class ParticleNetwork {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 150 };
    this.accentColor = 'rgba(0, 255, 136, ';
    this.secondaryColor = 'rgba(168, 85, 247, ';
    this.animId = null;

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.setupListeners();
    this.animate();
  }

  setThemeColor(primaryRgb, secondaryRgb) {
    this.accentColor = `rgba(${primaryRgb}, `;
    if (secondaryRgb) {
      this.secondaryColor = `rgba(${secondaryRgb}, `;
    }
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    const particleCount = Math.min(65, Math.floor((this.canvas.width * this.canvas.height) / 22000));
    this.particles = [];

    for (let i = 0; i < particleCount; i++) {
      const isAlt = Math.random() > 0.6;
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        colorBase: isAlt ? this.secondaryColor : this.accentColor,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }
  }

  setupListeners() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  animate() {
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Bounce on edges
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      // Mouse repulsion / interaction
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          p.x -= (dx / dist) * force * 3;
          p.y -= (dy / dist) * force * 3;
        }
      }

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.colorBase + p.alpha + ')';
      this.ctx.fill();

      // Connect with lines to neighbors
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          const lineAlpha = (1 - dist / 130) * 0.18;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = p.colorBase + lineAlpha + ')';
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
    }

    this.animId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
  }
}

let instance = null;

export function initParticles(canvasId = 'ambient-particles-canvas') {
  if (!instance) {
    instance = new ParticleNetwork(canvasId);
  }
  return instance;
}

export function updateParticleTheme(primaryRgb, secondaryRgb) {
  if (instance) {
    instance.setThemeColor(primaryRgb, secondaryRgb);
  }
}
