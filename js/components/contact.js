// Contact form functionality
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.inputs = this.form?.querySelectorAll('.form-input, .form-textarea');
        this.submitBtn = this.form?.querySelector('.form-button');
        this.successMessage = this.form?.querySelector('.success-message');

        this.init();
    }

    init() {
        if (!this.form) return;

        this.setupFormValidation();
        this.setupFormSubmission();
    }

    setupFormValidation() {
        this.inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    setupFormSubmission() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearFieldError(field);

        // Required field validation
        if (!value) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(fieldName)} is required`;
        } else {
            // Specific field validations
            switch (fieldName) {
                case 'email':
                    if (!this.isValidEmail(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid email address';
                    }
                    break;
                case 'name':
                    if (value.length < 2) {
                        isValid = false;
                        errorMessage = 'Name must be at least 2 characters long';
                    }
                    break;
                case 'message':
                    if (value.length < 10) {
                        isValid = false;
                        errorMessage = 'Message must be at least 10 characters long';
                    }
                    break;
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    validateForm() {
        let isFormValid = true;

        this.inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    handleFormSubmit() {
        if (!this.validateForm()) {
            return;
        }

        // Disable submit button
        this.submitBtn.disabled = true;
        this.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Simulate form submission (replace with actual form submission logic)
        setTimeout(() => {
            this.showSuccessMessage();
            this.resetForm();

            // Re-enable submit button
            this.submitBtn.disabled = false;
            this.submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }, 2000);
    }

    showFieldError(field, message) {
        field.classList.add('error');

        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add new error message
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    showSuccessMessage() {
        if (this.successMessage) {
            this.successMessage.classList.add('show');

            setTimeout(() => {
                this.successMessage.classList.remove('show');
            }, 5000);
        }
    }

    resetForm() {
        this.form.reset();
        this.inputs.forEach(input => {
            this.clearFieldError(input);
        });
    }

    getFieldLabel(fieldName) {
        const labels = {
            'name': 'Name',
            'email': 'Email',
            'subject': 'Subject',
            'message': 'Message'
        };

        return labels[fieldName] || fieldName;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Export for use in main.js
window.ContactForm = ContactForm;