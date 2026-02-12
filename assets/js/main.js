// ==================== NAVBAR COMPONENT ====================
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const footer = document.getElementById('footer');

    // Fetch and insert navbar
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(data => {
            navbar.innerHTML = data;
            setupNavbar();
            setupThemeToggle();
        });

    // Fetch and insert footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            footer.innerHTML = data;
        });
});

// ==================== NAVBAR FUNCTIONALITY ====================
function setupNavbar() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Update active link on navigation
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// ==================== THEME TOGGLE ====================
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeToggleIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeToggleIcon(newTheme);
    });
}

function updateThemeToggleIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

// ==================== SCROLL ANIMATIONS ====================
class ScrollAnimationManager {
    constructor() {
        this.observer = new IntersectionObserver(
            entries => this.handleIntersection(entries),
            {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            }
        );
        this.init();
    }

    init() {
        const elements = document.querySelectorAll('[class*="scroll-in"], .card, .skill-category, .project-card, .testimonial-card, .section-title, .section-subtitle');
        elements.forEach(element => {
            this.observer.observe(element);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add animation class based on element type
                if (element.classList.contains('scroll-in')) {
                    element.classList.add('visible');
                } else if (element.classList.contains('card')) {
                    element.classList.add('in-view');
                } else if (element.classList.contains('skill-category')) {
                    element.classList.add('in-view');
                } else if (element.classList.contains('project-card')) {
                    element.classList.add('in-view');
                } else if (element.classList.contains('testimonial-card')) {
                    element.classList.add('in-view');
                } else if (element.classList.contains('section-title')) {
                    element.classList.add('animate-fade-in-down');
                } else if (element.classList.contains('section-subtitle')) {
                    element.classList.add('animate-fade-in');
                }

                // Unobserve after animation
                this.observer.unobserve(element);
            }
        });
    }
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimationManager();
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==================== HEADER SCROLL EFFECT ====================
const header = document.querySelector('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        if (header) {
            header.style.boxShadow = 'var(--shadow)';
        }
    } else {
        if (header) {
            header.style.boxShadow = 'none';
        }
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==================== UTILITY FUNCTIONS ====================
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Handle window resize events
window.addEventListener('resize', debounce(() => {
    // Re-initialize animations on resize
    const scrollAnimationManager = new ScrollAnimationManager();
}, 300));

// ==================== FORM HANDLING ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // In a real application, send to backend
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I\'ll get back to you soon.');
        contactForm.reset();
    });
}

// ==================== PERFORMANCE OPTIMIZATION ====================
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

console.log('Portfolio initialized successfully!');
// Load Navbar Component
fetch("components/navbar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
    })
    .catch(error => console.log("Navbar loading error:", error));
