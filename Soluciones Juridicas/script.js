/* ═══════════════════════════════════════════
   SOLUCIONES JURÍDICAS — Interactive Engine
   ═══════════════════════════════════════════ */

'use strict';

// ── Loader ──────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    initHero();
    initAnimations();
  }, 1900);
});

// ── Navbar scroll ────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Mobile nav toggle ────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Hero Canvas (particle network) ──────────
function initHero() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles, raf;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const COUNT = Math.min(80, Math.floor((W * H) / 14000));
  const GOLD  = 'rgba(197,160,89,';
  const BLUE  = 'rgba(42,127,255,';
  const DIST  = 140;

  particles = Array.from({ length: COUNT }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.5 + 0.5,
    color: Math.random() > 0.6 ? GOLD : BLUE,
  }));

  let mx = W / 2, my = H / 2;
  canvas.addEventListener('mousemove', e => { mx = e.offsetX; my = e.offsetY; }, { passive: true });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.7)';
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < DIST) {
          const alpha = (1 - d / DIST) * 0.35;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = GOLD + alpha + ')';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
      const dm = Math.hypot(particles[i].x - mx, particles[i].y - my);
      if (dm < DIST * 1.4) {
        const alpha = (1 - dm / (DIST * 1.4)) * 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mx, my);
        ctx.strokeStyle = GOLD + alpha + ')';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
    raf = requestAnimationFrame(draw);
  }
  draw();
}

// ── Scroll animations ────────────────────────
function initAnimations() {
  const elems = document.querySelectorAll('[data-anim]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const delay = parseFloat(e.target.dataset.delay || 0);
      setTimeout(() => e.target.classList.add('anim-visible'), delay * 1000);
      observer.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  elems.forEach(el => observer.observe(el));

  initCounters();
  initMirrorCards();
  initCalculator();
  initTestimonials();
  initMagnetic();
}

// ── Animated counters ────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1800;
      const step = 16;
      const increment = target / (duration / step);
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) { el.textContent = target; clearInterval(timer); return; }
        el.textContent = Math.floor(current);
      }, step);
      observer.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => observer.observe(c));
}

// ── Mirror Identity ──────────────────────────
const mirrorData = {
  fotomulta: {
    title: 'Defensa contra Fotomultas e Infracciones',
    intro: 'Una fotomulta puede tener irregularidades en su notificación, calibración del equipo o identificación del infractor. Usted tiene derecho a impugnarla.',
    steps: [
      'Revisamos la resolución sancionatoria y la cadena de notificación',
      'Identificamos vicios procedimentales o probatorios',
      'Interponemos recurso de reposición y en subsidio apelación',
      'Representación completa hasta la resolución favorable',
    ],
  },
  datacredito: {
    title: 'Eliminación de Reportes en Centrales de Riesgo',
    intro: 'La Ley 1266 establece tiempos máximos de permanencia y procedimientos estrictos. Si su reporte supera esos límites o es incorrecto, podemos eliminarlo.',
    steps: [
      'Verificamos el origen y fecha del reporte negativo',
      'Enviamos derecho de petición a la entidad reportante',
      'Interponemos acción de habeas data si hay incumplimiento',
      'Confirmamos la supresión del reporte en el historial',
    ],
  },
  peticion: {
    title: 'Defensa del Derecho de Petición y Tutela',
    intro: 'El silencio administrativo vulnera sus derechos fundamentales. Tenemos mecanismos constitucionales para obligar a las entidades a responder.',
    steps: [
      'Redactamos y radicamos el derecho de petición formal',
      'Hacemos seguimiento en los 15 días hábiles de respuesta',
      'Interponemos acción de tutela por violación de derechos',
      'Obtenemos respuesta oficial documentada para su caso',
    ],
  },
  insolvencia: {
    title: 'Proceso de Insolvencia de Persona Natural',
    intro: 'La Ley 1564 permite a personas naturales no comerciantes negociar sus deudas con protección legal. Es una salida digna y ordenada de la crisis financiera.',
    steps: [
      'Analizamos su pasivo total y activos protegibles',
      'Diseñamos el acuerdo de pago con sus acreedores',
      'Tramitamos el proceso ante el centro de conciliación',
      'Ejecutamos el acuerdo con seguimiento mensual',
    ],
  },
};

function initMirrorCards() {
  const cards    = document.querySelectorAll('.mirror-card');
  const solution = document.getElementById('mirror-solution');
  const content  = document.getElementById('solution-content');
  const closeBtn = document.getElementById('solution-close');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const key  = card.dataset.problem;
      const data = mirrorData[key];
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      content.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.intro}</p>
        <ul>
          ${data.steps.map(s => `<li><i class="fa-solid fa-check"></i>${s}</li>`).join('')}
        </ul>
      `;
      solution.classList.remove('hidden');
      solution.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  closeBtn.addEventListener('click', () => {
    solution.classList.add('hidden');
    cards.forEach(c => c.classList.remove('active'));
  });
}

// ── Legal Viability Calculator ───────────────
const calcAnswers = {};
const viabilityMap = {
  fotomulta:   { base: 82, label: 'Alta Viabilidad' },
  datacredito: { base: 90, label: 'Muy Alta Viabilidad' },
  peticion:    { base: 88, label: 'Alta Viabilidad' },
  insolvencia: { base: 75, label: 'Viable con Asesoría' },
};
const timeBonus  = { reciente: 10, medio: 5,  largo: -5  };
const gestBonus  = { ninguna:   0, informal: 5, formal: 10 };

function calcScore() {
  const tipo = calcAnswers[1] || 'peticion';
  const time = calcAnswers[2] || 'medio';
  const gest = calcAnswers[3] || 'ninguna';
  const base = viabilityMap[tipo]?.base || 80;
  return Math.min(99, base + (timeBonus[time] || 0) + (gestBonus[gest] || 0));
}

function calcResultText(score) {
  if (score >= 88) return 'Su caso presenta <strong>alta viabilidad jurídica</strong>. Los elementos que describe coinciden con situaciones que hemos resuelto favorablemente en reiteradas ocasiones. El tiempo de actuación es clave — cuanto antes actuemos, mejores serán los resultados.';
  if (score >= 75) return 'Su caso tiene <strong>viabilidad moderada-alta</strong>. Existen argumentos jurídicos sólidos que podemos desarrollar. Necesitamos revisar la documentación completa para diseñar la estrategia más efectiva.';
  return 'Su caso requiere <strong>análisis detallado</strong>. Aunque la situación es compleja, existen mecanismos legales aplicables. Un diagnóstico completo es fundamental antes de determinar la ruta de acción.';
}

function initCalculator() {
  document.querySelectorAll('.calc-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      const step = parseInt(btn.dataset.step, 10);
      const val  = btn.dataset.value;
      calcAnswers[step] = val;

      btn.closest('.calc-options').querySelectorAll('.calc-opt').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      setTimeout(() => goToStep(step + 1), 380);
    });
  });

  document.getElementById('calc-submit').addEventListener('click', submitCalc);
}

function goToStep(next) {
  const current = document.querySelector('.calc-step.active');
  const target  = document.getElementById('calc-step-' + (next === 4 ? 'result' : next));
  if (!target) return;

  current.classList.remove('active');
  target.classList.add('active');

  const pct   = next <= 3 ? (next / 3) * 100 : 100;
  const label = next <= 3 ? `Paso ${next} de 3` : 'Resultado';
  document.getElementById('calc-progress').style.width = pct + '%';
  document.getElementById('calc-progress-label').textContent = label;

  if (next > 3) animateGauge();
}

function animateGauge() {
  const score   = calcScore();
  const arc     = document.getElementById('gauge-arc');
  const scoreEl = document.getElementById('gauge-score');
  const labelEl = document.getElementById('gauge-label');
  const total   = 157;
  const offset  = total - (score / 100) * total;

  document.getElementById('calc-result-body').innerHTML = calcResultText(score);
  labelEl.textContent = viabilityMap[calcAnswers[1]]?.label || 'Viable';

  let current = 0;
  const step  = 16;
  const timer = setInterval(() => {
    current += score / (900 / step);
    if (current >= score) { current = score; clearInterval(timer); }
    const o = total - (current / 100) * total;
    arc.style.strokeDashoffset = o;
    scoreEl.textContent = Math.floor(current) + '%';
  }, step);

  const tipo = calcAnswers[1];
  if (tipo === 'datacredito') arc.style.stroke = '#4ade80';
  else if (tipo === 'insolvencia') arc.style.stroke = '#60a5fa';
  else arc.style.stroke = '#C5A059';
}

function submitCalc() {
  const name  = document.getElementById('calc-name').value.trim();
  const phone = document.getElementById('calc-phone').value.trim();
  const email = document.getElementById('calc-email').value.trim();

  if (!name || !phone) {
    shakeInput(!name ? 'calc-name' : 'calc-phone');
    return;
  }

  const btn = document.getElementById('calc-submit');
  btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>¡Enviado! Le contactaremos pronto</span>';
  btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
  btn.disabled = true;

  const waMsg = encodeURIComponent(
    `Hola, soy ${name}. Completé el calculador de viabilidad legal en su sitio web.\n` +
    `Tipo de problema: ${calcAnswers[1] || '-'}\n` +
    `Teléfono: ${phone}\n` +
    `Correo: ${email || '-'}\n` +
    `Viabilidad calculada: ${calcScore()}%`
  );
  setTimeout(() => { window.open(`https://wa.me/573027540803?text=${waMsg}`, '_blank'); }, 800);
}

function shakeInput(id) {
  const el = document.getElementById(id);
  el.style.borderColor = '#f87171';
  el.style.animation = 'shake 0.4s ease';
  setTimeout(() => { el.style.animation = ''; el.style.borderColor = ''; }, 500);
}

// ── Testimonials slider ──────────────────────
function initTestimonials() {
  const track = document.getElementById('testimonials-track');
  if (!track) return;
  const items = track.querySelectorAll('.testimonial');
  const total = items.length;
  let idx = 0;

  function go(n) {
    idx = (n + total) % total;
    const pct = idx * (100 / total);
    track.style.transform = `translateX(-${pct}%)`;
  }

  document.getElementById('test-prev').addEventListener('click', () => go(idx - 1));
  document.getElementById('test-next').addEventListener('click', () => go(idx + 1));

  let autoplay = setInterval(() => go(idx + 1), 5000);
  track.addEventListener('mouseenter', () => clearInterval(autoplay));
  track.addEventListener('mouseleave', () => { autoplay = setInterval(() => go(idx + 1), 5000); });
}

// ── Magnetic buttons ─────────────────────────
function initMagnetic() {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r  = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width  / 2);
      const dy = e.clientY - (r.top  + r.height / 2);
      btn.style.transform = `translate(${dx * 0.22}px, ${dy * 0.22}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ── Keyframe injection for shake ─────────────
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%,100%{transform:translateX(0)}
    20%{transform:translateX(-6px)}
    40%{transform:translateX(6px)}
    60%{transform:translateX(-4px)}
    80%{transform:translateX(4px)}
  }
`;
document.head.appendChild(shakeStyle);
