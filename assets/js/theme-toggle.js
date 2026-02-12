// ==================== THEME TOGGLE FUNCTIONALITY ====================

class ThemeToggle {
    constructor() {
        this.html = document.documentElement;
        this.toggleBtn = document.getElementById('themeToggle');
        this.storageKey = 'portfolio-theme';
        
        if (this.toggleBtn) {
            this.init();
        }
    }

    init() {
        // Load saved theme or detect system preference
        const savedTheme = localStorage.getItem(this.storageKey);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        
        this.setTheme(theme);
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.toggleBtn.addEventListener('click', () => this.toggle());
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(this.storageKey)) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    toggle() {
        const currentTheme = this.html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        localStorage.setItem(this.storageKey, newTheme);
    }

    setTheme(theme) {
        this.html.setAttribute('data-theme', theme);
        this.updateIcon(theme);
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    }

    updateIcon(theme) {
        if (this.toggleBtn) {
            this.toggleBtn.textContent = theme === 'light' ? '🌙' : '☀️';
            this.toggleBtn.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
        }
    }
}

// Initialize theme toggle on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new ThemeToggle();
});

console.log('Theme toggle loaded successfully!');
