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
document.querySelectorAll('.stat-card, .experience-card, .skill-category, .contact-card').forEach(el => {
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
// MOBILE MENU TOGGLE (PLACEHOLDER)
// ============================================
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        // Toggle mobile menu visibility
        // This is a placeholder - you can expand this functionality
        console.log('Mobile menu toggle clicked');
    });
}

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
            link.style.color = '#ffffff';
        }
    });
});

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log('%c👋 Hello, Developer!', 'font-size: 20px; font-weight: bold; color: #00ff88;');
console.log('%cLeonardo Marchesini | Portfolio 2024', 'font-size: 14px; color: #a0a0a0;');
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
// HERO PARTICLE ANIMATION
// ============================================
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

// Resize handling
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Particle Class
class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.color = '#00ff88'; // Your accent color
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Initialize Particles
function initParticles() {
    particles = [];
    const particleCount = Math.min(window.innerWidth / 15, 80);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}
initParticles();
window.addEventListener('resize', initParticles);

// Animation Loop
function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 255, 136, ${1 - distance / 150})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    
    // Update and draw particles
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animate);
}
animate();