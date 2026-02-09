// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in to cards with initial hidden state
document.querySelectorAll('.stat-card, .experience-card, .skill-category, .contact-card, .education-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// HIDE SCROLL INDICATOR AFTER SCROLL
// ============================================
window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        if (window.pageYOffset > 200) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    }
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });
});

// ============================================
// ACTIVE SECTION HIGHLIGHTING IN NAV
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.style.color = '#00ff88';
        }
    });
});

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log('%c👋 Hello, Developer!', 'font-size: 20px; font-weight: bold; color: #00ff88;');
console.log('%cLeonardo Marchesini | Portfolio 2026', 'font-size: 14px; color: #a0a0a0;');
console.log('%c📧 marchesinileonardo04@gmail.com', 'font-size: 12px; color: #666666;');

// ============================================
// PERFORMANCE: LAZY LOAD ANIMATIONS
// ============================================
// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// ============================================
// KEYBOARD ACCESSIBILITY
// ============================================
document.addEventListener('keydown', (e) => {
    // Skip to main content with 'S' key
    if (e.key === 's' || e.key === 'S') {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
            aboutSection.focus();
        }
    }
});

// ============================================
// PAGE LOAD OPTIMIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for any load-specific animations
    document.body.classList.add('loaded');
    
    // Preload images if needed
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
});

// ============================================
// HERO FLOWING WAVE ANIMATION
// ============================================
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let time = 0;

// Resize handling
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Wave configuration
class Wave {
    constructor(amplitude, frequency, speed, offset, color) {
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.speed = speed;
        this.offset = offset;
        this.color = color;
    }
    
    draw(time) {
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        
        for (let x = 0; x < width; x++) {
            const y = height / 2 + 
                     Math.sin((x * this.frequency + time * this.speed) / 100) * this.amplitude +
                     Math.sin((x * this.frequency * 0.5 + time * this.speed * 0.7) / 150) * (this.amplitude * 0.5) +
                     this.offset;
            
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

// Create multiple waves with different properties
const waves = [
    new Wave(80, 0.005, 2, -100, 'rgba(0, 255, 136, 0.05)'),
    new Wave(60, 0.007, -1.5, 0, 'rgba(0, 255, 136, 0.08)'),
    new Wave(100, 0.004, 2.5, 50, 'rgba(0, 255, 136, 0.03)'),
    new Wave(70, 0.006, -2, -50, 'rgba(0, 255, 136, 0.06)'),
];

// Grid lines for tech aesthetic
function drawGrid() {
    const gridSize = 50;
    ctx.strokeStyle = 'rgba(0, 255, 136, 0.02)';
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
}

// Floating particles
class Particle {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        
        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
            this.reset();
            this.y = height + 10;
        }
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 136, ${this.opacity})`;
        ctx.fill();
    }
}

// Create particles
const particles = [];
const particleCount = Math.min(Math.floor(width / 20), 50);
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw grid background
    drawGrid();
    
    // Draw waves
    waves.forEach(wave => wave.draw(time));
    
    // Draw and update particles
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    // Add some glow circles
    const glowX1 = width * 0.2 + Math.sin(time * 0.001) * 100;
    const glowY1 = height * 0.3 + Math.cos(time * 0.001) * 50;
    const gradient1 = ctx.createRadialGradient(glowX1, glowY1, 0, glowX1, glowY1, 200);
    gradient1.addColorStop(0, 'rgba(0, 255, 136, 0.1)');
    gradient1.addColorStop(1, 'rgba(0, 255, 136, 0)');
    ctx.fillStyle = gradient1;
    ctx.fillRect(0, 0, width, height);
    
    const glowX2 = width * 0.8 + Math.sin(time * 0.0015 + Math.PI) * 100;
    const glowY2 = height * 0.7 + Math.cos(time * 0.0015 + Math.PI) * 50;
    const gradient2 = ctx.createRadialGradient(glowX2, glowY2, 0, glowX2, glowY2, 250);
    gradient2.addColorStop(0, 'rgba(0, 255, 136, 0.08)');
    gradient2.addColorStop(1, 'rgba(0, 255, 136, 0)');
    ctx.fillStyle = gradient2;
    ctx.fillRect(0, 0, width, height);
    
    time++;
    requestAnimationFrame(animate);
}

animate();

// ============================================
// CONTACT CARD INTERACTION
// ============================================
const contactCards = document.querySelectorAll('.contact-card-clickable');

contactCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});
