// ==================== ANIMATION UTILITIES ====================

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observe and trigger animations when elements come into view
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Trigger counter animation for stats
            if (element.dataset.target && !element.dataset.animated) {
                animateCounter(element, parseInt(element.dataset.target));
                element.dataset.animated = 'true';
            }
            
            // Add animation classes
            if (!element.classList.contains('animated')) {
                if (element.dataset.animation) {
                    element.classList.add(element.dataset.animation);
                }
                element.classList.add('animated');
            }
        }
    });
}, {
    threshold: 0.5
});

// Start observing animated elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-animation], [data-target]').forEach(element => {
        animationObserver.observe(element);
    });
});

// ==================== PARALLAX SCROLLING ====================
document.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        const yOffset = window.pageYOffset * speed;
        element.style.transform = `translateY(${yOffset}px)`;
    });
});

// ==================== HOVER ANIMATIONS ====================
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .card, .project-card, .testimonial-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// ==================== TYPING ANIMATION ====================
function typeText(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    
    const typeInterval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
        } else {
            clearInterval(typeInterval);
        }
    }, speed);
}

// ==================== FADE IN ANIMATION ====================
function fadeIn(element, duration = 500) {
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease-in`;
    
    setTimeout(() => {
        element.style.opacity = '1';
    }, 10);
}

// ==================== SLIDE IN ANIMATION ====================
function slideIn(element, direction = 'left', duration = 500) {
    const distance = 50;
    const start = direction === 'left' ? -distance : distance;
    
    element.style.opacity = '0';
    element.style.transform = `translateX(${start}px)`;
    element.style.transition = `all ${duration}ms ease-out`;
    
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
    }, 10);
}

// ==================== PULSE ANIMATION ====================
function pulse(element, duration = 1000) {
    const keyframes = `
        @keyframes pulse-${Math.random().toString(36).substr(2, 9)} {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);
    
    element.style.animation = `pulse-${Math.random().toString(36).substr(2, 9)} ${duration}ms infinite`;
}

// ==================== SCROLL TO TOP BUTTON ====================
document.addEventListener('DOMContentLoaded', () => {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--accent);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        display: none;
        z-index: 999;
        transition: all 0.3s;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'flex';
            scrollTopBtn.style.alignItems = 'center';
            scrollTopBtn.style.justifyContent = 'center';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ==================== STAGGER ANIMATIONS ====================
function staggerElements(parent, className, delay = 100) {
    const elements = parent.querySelectorAll(className);
    
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * delay}ms`;
        element.classList.add('stagger-animate');
    });
}

console.log('Animation utilities loaded successfully!');
