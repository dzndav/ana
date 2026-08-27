const bg = document.getElementById('hearts-bg');
const heartSymbols = ['💗', '💕', '💖', '❤️', '💘', '💓'];
const heartCount = 26;

for (let i = 0; i < heartCount; i++) {
    const h = document.createElement('div');
    h.className = 'heart';
    h.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    h.style.left = Math.random() * 100 + 'vw';
    h.style.fontSize = (0.9 + Math.random() * 1.6) + 'rem';
    const duration = 6 + Math.random() * 7;
    h.style.animationDuration = duration + 's';
    h.style.animationDelay = (Math.random() * duration) + 's';
    bg.appendChild(h);
}

// Typewriter for qualities
const qualities = [
    "doce.",
    "forte.",
    "inteligente.",
    "engraçada.",
    "generosa.",
    "iluminada.",
    "inesquecível.",
    "amada.",
    "meu amor",
    "minha vida",
    "meu tudo"
];

const el = document.getElementById('typed');
let qIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
    const current = qualities[qIndex];

    if (!deleting) {
        charIndex++;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
            deleting = true;
            setTimeout(typeLoop, 1400);
            return;
        }
    } else {
        charIndex--;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
            deleting = false;
            qIndex = (qIndex + 1) % qualities.length;
        }
    }
    setTimeout(typeLoop, deleting ? 40 : 80);
}

setTimeout(typeLoop, 2400);

// Scroll-triggered reveal
const revealEls = document.querySelectorAll('.reveal, .divider');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => observer.observe(el));

// 3D carousel — posicionamento e rotação 100% via JavaScript
const ring = document.getElementById('carousel-ring');
const images = ring.querySelectorAll('img');
const radius = 280;
const anglePerImage = 360 / images.length;

// posiciona cada imagem ao redor do círculo
images.forEach((img, i) => {
    const angle = anglePerImage * i;
    img.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
});

// rotação contínua e infinita do anel
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let ringAngle = 0;
const degreesPerSecond = 360 / 22; // uma volta completa a cada 22s
let lastTime = null;

function animateRing(timestamp) {
    if (lastTime === null) lastTime = timestamp;
    const deltaSeconds = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    if (!prefersReducedMotion) {
        ringAngle -= degreesPerSecond * deltaSeconds;
        ring.style.transform = `rotateY(${ringAngle}deg)`;
    }

    requestAnimationFrame(animateRing);
}

requestAnimationFrame(animateRing);