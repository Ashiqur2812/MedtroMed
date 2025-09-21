// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-out-back'
});

// =====================
// Menu Toggle
// =====================
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    menu.classList.toggle('active');
});

// =====================
// Header Scroll Effect
// =====================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// =====================
// Stats Counter with GSAP
// =====================
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;

    const statsSection = document.querySelector('.stats');
    const triggerPoint = window.innerHeight / 1.3;

    if (statsSection.getBoundingClientRect().top < triggerPoint) {
        gsap.to('#stat1', {
            innerText: 2500,
            duration: 2,
            snap: { innerText: 1 },
            stagger: 1
        });

        gsap.to('#stat2', {
            innerText: 1200,
            duration: 2,
            snap: { innerText: 1 },
            stagger: 1
        });

        gsap.to('#stat3', {
            innerText: 15,
            duration: 2,
            snap: { innerText: 1 },
            stagger: 1
        });

        gsap.to('#stat4', {
            innerText: 10,
            duration: 2,
            snap: { innerText: 1 },
            stagger: 1
        });

        statsAnimated = true;
    }
}

window.addEventListener('scroll', animateStats);

// =====================
// Testimonial Slider
// =====================
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.testimonial-dot');
let currentIndex = 0;

function showTestimonial(index) {
    testimonials.forEach(t => {
        t.classList.remove('active');
        gsap.to(t, { scale: 0.9, opacity: 0, duration: 0.5 });
    });
    dots.forEach(d => d.classList.remove('active'));

    testimonials[index].classList.add('active');
    dots[index].classList.add('active');

    gsap.to(testimonials[index], { scale: 1, opacity: 1, duration: 0.5 });
    currentIndex = index;
}

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.dataset.index);
        showTestimonial(index);
    });
});

// Auto rotate testimonials
setInterval(() => {
    showTestimonial((currentIndex + 1) % testimonials.length);
}, 5000);

// =====================
// Form Validation
// =====================
const contactForm = document.getElementById('messageForm');
contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && email && message) {
        // Add animation to button on success
        const button = contactForm.querySelector('button');
        button.innerHTML = 'Sent! <i class="fas fa-check"></i>';
        button.style.background = 'linear-gradient(135deg, var(--success), #34d399)';

        setTimeout(() => {
            button.innerHTML = 'Send Message';
            button.style.background = 'linear-gradient(135deg, var(--accent), #d946ef)';
            contactForm.reset();
        }, 2000);
    } else {
        // Shake animation for empty fields
        const emptyFields = contactForm.querySelectorAll('input:invalid, textarea:invalid');
        gsap.to(emptyFields, {
            x: 10,
            duration: 0.1,
            repeat: 5,
            yoyo: true,
            ease: "power1.inOut"
        });
    }
});

// =====================
// Smooth Scroll for Navigation
// =====================
document.querySelectorAll('nav a, .footer-links a').forEach(link => {
    link.addEventListener('click', e => {
        if (link.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: { y: target, offsetY: 80 },
                    ease: "power2.inOut"
                });

                // Close mobile menu if open
                if (menu.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    menu.classList.remove('active');
                }
            }
        }
    });
});

// =====================
// Particle Background
// =====================
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createParticles() {
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Connect particles
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animateParticles);
    }

    createParticles();
    animateParticles();
}

// Initialize particles when page loads
window.addEventListener('load', initParticles);

// =====================
// Enhanced hover effects with GSAP
// =====================
document.querySelectorAll('.service-card, .doctor-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -10, scale: 1.02, duration: 0.3 });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, scale: 1, duration: 0.3 });
    });
});

// =====================
// Text animation for hero
// =====================
gsap.to('.hero h2', {
    y: 0,
    opacity: 1,
    duration: 1,
    delay: 0.5,
    ease: "power2.out"
});

gsap.to('.hero p', {
    y: 0,
    opacity: 1,
    duration: 1,
    delay: 0.8,
    ease: "power2.out"
});

gsap.to('.hero .btn', {
    y: 0,
    opacity: 1,
    duration: 1,
    delay: 1.1,
    ease: "power2.out"
});
