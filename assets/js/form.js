// ==================== CONTACT FORM HANDLING ====================

class ContactFormHandler {
    constructor(formSelector = '#contactForm') {
        this.form = document.querySelector(formSelector);
        this.init();
    }

    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.setupValidation();
    }

    setupValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.validateField(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let error = '';

        if (!value) {
            isValid = false;
            error = 'This field is required';
        } else if (type === 'email' && !this.isValidEmail(value)) {
            isValid = false;
            error = 'Please enter a valid email';
        } else if (type === 'tel' && !this.isValidPhone(value)) {
            isValid = false;
            error = 'Please enter a valid phone number';
        }

        this.displayFieldError(field, isValid, error);
        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }

    displayFieldError(field, isValid, error) {
        let errorElement = field.parentElement.querySelector('.error-message');
        
        if (!isValid) {
            if (!errorElement) {
                errorElement = document.createElement('span');
                errorElement.className = 'error-message';
                errorElement.style.cssText = 'color: #ff6b6b; font-size: 0.8rem; margin-top: 0.25rem; display: block;';
                field.parentElement.appendChild(errorElement);
            }
            errorElement.textContent = error;
            field.style.borderColor = '#ff6b6b';
        } else {
            if (errorElement) {
                errorElement.remove();
            }
            field.style.borderColor = '';
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const inputs = this.form.querySelectorAll('input, textarea');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) return;

        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        try {
            // Show loading state
            const submitBtn = this.form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate sending (in production, send to backend)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            this.showSuccessMessage();
            this.form.reset();

            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        } catch (error) {
            console.error('Form submission error:', error);
            this.showErrorMessage('An error occurred. Please try again.');
        }
    }

    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'form-success';
        message.textContent = '✓ Thank you! I\'ll get back to you within 24 hours.';
        message.style.cssText = `
            padding: 1rem;
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
            border-radius: 4px;
            margin-bottom: 1rem;
            animation: slideInDown 0.5s ease-out;
        `;
        this.form.parentElement.insertBefore(message, this.form);

        setTimeout(() => {
            message.remove();
        }, 5000);
    }

    showErrorMessage(errorText) {
        const message = document.createElement('div');
        message.className = 'form-error';
        message.textContent = '✕ ' + errorText;
        message.style.cssText = `
            padding: 1rem;
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
            border-radius: 4px;
            margin-bottom: 1rem;
            animation: slideInDown 0.5s ease-out;
        `;
        this.form.parentElement.insertBefore(message, this.form);

        setTimeout(() => {
            message.remove();
        }, 5000);
    }
}

// Initialize form handler when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ContactFormHandler();
});

console.log('Form handler loaded successfully!');
