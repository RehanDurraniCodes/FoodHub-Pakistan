// FoodHub Pakistan - Form Validation

class FormValidator {
    constructor() {
        this.errors = {};
    }

    // Validate contact form
    validateContactForm(formData) {
        this.errors = {};

        // Validate name
        if (!formData.name || formData.name.trim().length === 0) {
            this.errors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            this.errors.name = 'Name must be at least 2 characters';
        }

        // Validate email
        if (!formData.email || formData.email.trim().length === 0) {
            this.errors.email = 'Email is required';
        } else if (!this.isValidEmail(formData.email)) {
            this.errors.email = 'Please enter a valid email address';
        }

        // Validate subject
        if (!formData.subject || formData.subject.trim().length === 0) {
            this.errors.subject = 'Subject is required';
        } else if (formData.subject.trim().length < 3) {
            this.errors.subject = 'Subject must be at least 3 characters';
        }

        // Validate message
        if (!formData.message || formData.message.trim().length === 0) {
            this.errors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            this.errors.message = 'Message must be at least 10 characters';
        } else if (formData.message.trim().length > 1000) {
            this.errors.message = 'Message cannot exceed 1000 characters';
        }

        return Object.keys(this.errors).length === 0;
    }

    // Validate email format
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Get error message
    getErrorMessage(field) {
        return this.errors[field] || '';
    }

    // Get all errors
    getAllErrors() {
        return this.errors;
    }
}

// Initialize validator
const validator = new FormValidator();

// Handle contact form submission
function handleContactFormSubmit(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value
    };

    // Clear previous error messages
    clearErrorMessages();

    // Validate form
    if (validator.validateContactForm(formData)) {
        // Show success message
        const successMessage = document.getElementById('contactSuccessMessage');
        if (successMessage) {
            successMessage.style.display = 'block';
            successMessage.textContent = 'Thank you! Your message has been sent successfully. We will contact you soon.';
        }

        // Reset form
        document.getElementById('contactForm').reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
            if (successMessage) {
                successMessage.style.display = 'none';
            }
        }, 5000);
    } else {
        // Show error messages
        displayErrorMessages();
    }
}

// Display error messages
function displayErrorMessages() {
    const errors = validator.getAllErrors();

    Object.keys(errors).forEach(field => {
        const errorElement = document.getElementById(`${field}Error`);
        if (errorElement) {
            errorElement.textContent = errors[field];
            errorElement.style.display = 'block';
        }

        // Highlight input field
        const inputElement = document.getElementById(`contact${field.charAt(0).toUpperCase() + field.slice(1)}`);
        if (inputElement) {
            inputElement.classList.add('error-input');
        }
    });
}

// Clear error messages
function clearErrorMessages() {
    const errorElements = document.querySelectorAll('[id*="Error"]');
    errorElements.forEach(el => {
        el.style.display = 'none';
        el.textContent = '';
    });

    const inputElements = document.querySelectorAll('.error-input');
    inputElements.forEach(el => {
        el.classList.remove('error-input');
    });
}

// Real-time validation
function validateField(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId.replace('contact', '').toLowerCase()}Error`);

    if (!field || !errorElement) return;

    const fieldName = fieldId.replace('contact', '').toLowerCase();
    const value = field.value;

    let errorMessage = '';

    switch (fieldName) {
        case 'name':
            if (value.trim().length === 0) {
                errorMessage = 'Name is required';
            } else if (value.trim().length < 2) {
                errorMessage = 'Name must be at least 2 characters';
            }
            break;

        case 'email':
            if (value.trim().length === 0) {
                errorMessage = 'Email is required';
            } else if (!validator.isValidEmail(value)) {
                errorMessage = 'Please enter a valid email address';
            }
            break;

        case 'subject':
            if (value.trim().length === 0) {
                errorMessage = 'Subject is required';
            } else if (value.trim().length < 3) {
                errorMessage = 'Subject must be at least 3 characters';
            }
            break;

        case 'message':
            if (value.trim().length === 0) {
                errorMessage = 'Message is required';
            } else if (value.trim().length < 10) {
                errorMessage = 'Message must be at least 10 characters';
            } else if (value.trim().length > 1000) {
                errorMessage = 'Message cannot exceed 1000 characters';
            }
            break;
    }

    if (errorMessage) {
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
        field.classList.add('error-input');
    } else {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        field.classList.remove('error-input');
    }
}
