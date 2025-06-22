/**
 * Main JavaScript functionality for AJ's Portfolio
 * Handles navigation, mobile menu, form validation, FAQ, and project filtering
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initContactForm();
    initFAQ();
    initProjectFiltering();
    initScrollEffects();
    
    console.log('🚀 AJ\'s Portfolio loaded successfully!');
});

/**
 * Navigation and Mobile Menu Functionality
 */
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu?.querySelectorAll('a');
    mobileLinks?.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.querySelector('#mobile-menu-btn i');
    
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
        
        // Animate menu icon
        if (menuIcon) {
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.className = 'fas fa-bars text-xl';
            } else {
                menuIcon.className = 'fas fa-times text-xl';
            }
        }
    }
}

/**
 * Contact Form Validation and Submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const formMessage = document.getElementById('form-message');
    
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

function validateField(field) {
    const fieldName = field.name;
    const value = field.value.trim();
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${getFieldLabel(fieldName)} is required.`;
    }
    
    // Email validation
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }
    
    // Name validation (no numbers or special characters)
    if ((fieldName === 'firstName' || fieldName === 'lastName') && value) {
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(value)) {
            isValid = false;
            errorMessage = 'Name should only contain letters and spaces.';
        }
    }
    
    // Message length validation
    if (fieldName === 'message' && value && value.length < 10) {
        isValid = false;
        errorMessage = 'Message should be at least 10 characters long.';
    }
    
    // Display error
    if (errorElement) {
        if (isValid) {
            errorElement.classList.remove('show');
            field.style.borderColor = '';
        } else {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
            field.style.borderColor = '#ef4444';
        }
    }
    
    return isValid;
}

function clearFieldError(field) {
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
        errorElement.classList.remove('show');
        field.style.borderColor = '';
    }
}

function getFieldLabel(fieldName) {
    const labels = {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message'
    };
    return labels[fieldName] || fieldName;
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

async function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const formMessage = document.getElementById('form-message');
    
    // Validate form
    if (!validateForm(form)) {
        showFormMessage('Please fix the errors above and try again.', 'error');
        return;
    }
    
    // Show loading state
    if (submitBtn && submitText) {
        submitBtn.disabled = true;
        submitText.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
    }
    
    try {
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Simulate form submission (replace with actual endpoint)
        await simulateFormSubmission(data);
        
        // Show success message
        showFormMessage(
            'Thank you for your message! I\'ll get back to you within 24 hours.',
            'success'
        );
        
        // Reset form
        form.reset();
        
    } catch (error) {
        console.error('Form submission error:', error);
        showFormMessage(
            'Sorry, there was an error sending your message. Please try again or contact me directly.',
            'error'
        );
    } finally {
        // Reset button state
        if (submitBtn && submitText) {
            submitBtn.disabled = false;
            submitText.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Send Message';
        }
    }
}

function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // Simulate success (90% of the time)
            if (Math.random() > 0.1) {
                console.log('Form submitted:', data);
                resolve(data);
            } else {
                reject(new Error('Network error'));
            }
        }, 2000);
    });
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    if (!formMessage) return;
    
    formMessage.className = `mt-6 p-4 rounded-lg ${type === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`;
    
    formMessage.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} mr-2"></i>
            ${message}
        </div>
    `;
    
    formMessage.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
}

/**
 * FAQ Accordion Functionality
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question?.querySelector('i');
        
        if (question && answer) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherIcon = otherItem.querySelector('.faq-question i');
                        if (otherAnswer) otherAnswer.classList.add('hidden');
                        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    answer.classList.add('hidden');
                    if (icon) icon.style.transform = 'rotate(0deg)';
                } else {
                    item.classList.add('active');
                    answer.classList.remove('hidden');
                    if (icon) icon.style.transform = 'rotate(180deg)';
                }
            });
        }
    });
}

/**
 * Project Filtering Functionality
 */
function initProjectFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(otherBtn => otherBtn.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            filterProjects(filter, projectCards);
        });
    });
}

function filterProjects(filter, projectCards) {
    projectCards.forEach((card, index) => {
        const category = card.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
            card.style.display = 'block';
            // Animate in with delay
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

/**
 * Smooth Scroll Effects
 */
function initScrollEffects() {
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav link based on scroll position
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.scrollY + 150;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Utility Functions
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Page-specific functionality
 */
// Add page-specific event listeners based on current page
function initPageSpecific() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'contact.html':
            // Additional contact page functionality
            initContactPageFeatures();
            break;
        case 'projects.html':
            // Additional projects page functionality
            initProjectsPageFeatures();
            break;
        case 'about.html':
            // Additional about page functionality
            initAboutPageFeatures();
            break;
    }
}

function initContactPageFeatures() {
    // Auto-focus first form field
    const firstInput = document.querySelector('#contact-form input');
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 500);
    }
}

function initProjectsPageFeatures() {
    // Initialize project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initAboutPageFeatures() {
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Initialize page-specific features when DOM is loaded
document.addEventListener('DOMContentLoaded', initPageSpecific);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateField,
        filterProjects,
        throttle,
        debounce
    };
}
