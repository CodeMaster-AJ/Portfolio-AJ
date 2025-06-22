/**
 * Animation Controller for AJ's Portfolio
 * Handles scroll-based animations, reveal effects, and interactive animations
 */

// Animation state
const animationState = {
    scrollRevealElements: [],
    isScrolling: false,
    lastScrollTop: 0,
    animationFrameId: null
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollReveal();
    initParallaxEffects();
    initInteractiveAnimations();
    initTextAnimations();
    initLoadingAnimations();
    
    console.log('🎨 Animations initialized successfully!');
});

/**
 * Scroll Reveal Animation System
 */
function initScrollReveal() {
    // Find all elements with scroll-reveal class
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    if (scrollElements.length === 0) return;
    
    // Set up intersection observer for performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                revealElement(entry.target);
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all scroll reveal elements
    scrollElements.forEach((element, index) => {
        // Add initial hidden state
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = `all 0.8s ease-out ${index * 0.1}s`;
        
        scrollObserver.observe(element);
    });
    
    // Store for manual triggering if needed
    animationState.scrollRevealElements = Array.from(scrollElements);
}

function revealElement(element) {
    // Add revealed class for CSS animations
    element.classList.add('revealed');
    
    // Apply reveal styles
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
    
    // Add some special effects based on element type
    if (element.classList.contains('glass-card')) {
        element.style.transform = 'translateY(0) scale(1)';
        element.style.boxShadow = '0 12px 40px 0 rgba(31, 38, 135, 0.3)';
    }
    
    // Trigger any custom animations
    triggerCustomAnimation(element);
}

function triggerCustomAnimation(element) {
    // Project cards get special hover effect
    if (element.classList.contains('project-card')) {
        setTimeout(() => {
            element.style.transition = 'all 0.3s ease';
        }, 800);
    }
    
    // Skill bars get animated progress
    if (element.querySelector('.skill-progress')) {
        animateSkillBars(element);
    }
    
    // Timeline items get special reveal
    if (element.classList.contains('timeline-item')) {
        animateTimelineItem(element);
    }
}

/**
 * Skill Bar Animations
 */
function animateSkillBars(container) {
    const skillBars = container.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const targetWidth = bar.style.width || bar.getAttribute('data-width') || '0%';
        
        // Reset width
        bar.style.width = '0%';
        
        // Animate to target width
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-out';
            bar.style.width = targetWidth;
            
            // Add shimmer effect
            setTimeout(() => {
                bar.style.position = 'relative';
                bar.style.overflow = 'hidden';
            }, 1500);
        }, index * 200);
    });
}

/**
 * Timeline Animation
 */
function animateTimelineItem(element) {
    const marker = element.querySelector('.timeline-marker');
    const content = element.querySelector('.timeline-content');
    
    if (marker) {
        marker.style.transform = 'scale(0)';
        marker.style.transition = 'transform 0.5s ease-out';
        
        setTimeout(() => {
            marker.style.transform = 'scale(1)';
        }, 200);
    }
    
    if (content) {
        content.style.transform = 'translateX(-20px)';
        content.style.transition = 'transform 0.6s ease-out';
        
        setTimeout(() => {
            content.style.transform = 'translateX(0)';
        }, 400);
    }
}

/**
 * Parallax Effects
 */
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.floating-shapes, .shape');
    
    if (parallaxElements.length === 0) return;
    
    // Throttled scroll handler for performance
    let ticking = false;
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        const scrollPercent = scrollTop / (document.documentElement.scrollHeight - window.innerHeight);
        
        parallaxElements.forEach((element, index) => {
            if (element.classList.contains('floating-shapes')) {
                // Move entire container slightly
                const translateY = scrollTop * 0.1;
                element.style.transform = `translateY(${translateY}px)`;
            } else if (element.classList.contains('shape')) {
                // Individual shape movement
                const speed = 0.2 + (index * 0.1);
                const translateY = scrollTop * speed;
                const rotate = scrollPercent * 360;
                element.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`;
            }
        });
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
}

/**
 * Interactive Animations
 */
function initInteractiveAnimations() {
    // Magnetic effect for buttons
    initMagneticButtons();
    
    // Hover effects for cards
    initCardHoverEffects();
    
    // Glitch effect for special elements
    initGlitchEffects();
    
    // Typing effect for dynamic text
    initTypingEffects();
}

function initMagneticButtons() {
    const buttons = document.querySelectorAll('.glass-button, .glass-button-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = Math.max(rect.width, rect.height);
            
            if (distance < maxDistance * 0.8) {
                const strength = (maxDistance * 0.8 - distance) / (maxDistance * 0.8);
                const moveX = x * strength * 0.3;
                const moveY = y * strength * 0.3;
                
                button.style.transform = `translate(${moveX}px, ${moveY}px) translateY(-2px)`;
            }
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
}

function initCardHoverEffects() {
    const cards = document.querySelectorAll('.glass-card, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add glow effect
            card.style.boxShadow = '0 20px 50px rgba(0, 255, 255, 0.2)';
            
            // Slight rotation for depth
            card.style.transform = 'translateY(-10px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
            card.style.transform = '';
        });
        
        // Mouse movement effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * 10;
            const rotateY = (centerX - x) / centerX * 10;
            
            card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
}

function initGlitchEffects() {
    const glitchElements = document.querySelectorAll('.glow-text');
    
    glitchElements.forEach(element => {
        // Random glitch effect
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance
                element.style.textShadow = `
                    2px 0 #ff0000,
                    -2px 0 #00ffff,
                    0 0 10px currentColor
                `;
                
                setTimeout(() => {
                    element.style.textShadow = `
                        0 0 5px currentColor,
                        0 0 10px currentColor,
                        0 0 15px currentColor,
                        0 0 20px currentColor
                    `;
                }, 100);
            }
        }, 3000);
    });
}

/**
 * Text Animations
 */
function initTextAnimations() {
    // Existing typing animation class
    const typingElements = document.querySelectorAll('.typing-animation');
    
    typingElements.forEach(element => {
        if (!element.dataset.animated) {
            startTypingAnimation(element);
            element.dataset.animated = 'true';
        }
    });
}

function startTypingAnimation(element) {
    const text = element.textContent;
    const speed = 100; // milliseconds per character
    
    element.textContent = '';
    element.style.borderRight = '3px solid var(--neon-cyan)';
    
    let index = 0;
    const typeInterval = setInterval(() => {
        element.textContent += text[index];
        index++;
        
        if (index >= text.length) {
            clearInterval(typeInterval);
            // Keep cursor blinking
            setTimeout(() => {
                element.style.borderRight = '3px solid transparent';
            }, 1000);
        }
    }, speed);
}

function initTypingEffects() {
    // Add typewriter effect to specific elements
    const typewriterElements = document.querySelectorAll('[data-typewriter]');
    
    typewriterElements.forEach(element => {
        const text = element.getAttribute('data-typewriter');
        const speed = parseInt(element.getAttribute('data-speed')) || 100;
        
        if (text) {
            typewriterEffect(element, text, speed);
        }
    });
}

function typewriterEffect(element, text, speed) {
    element.textContent = '';
    let index = 0;
    
    const interval = setInterval(() => {
        element.textContent += text[index];
        index++;
        
        if (index >= text.length) {
            clearInterval(interval);
        }
    }, speed);
}

/**
 * Loading Animations
 */
function initLoadingAnimations() {
    // Page load animations
    const body = document.body;
    body.style.opacity = '0';
    
    window.addEventListener('load', () => {
        body.style.transition = 'opacity 0.5s ease';
        body.style.opacity = '1';
        
        // Trigger hero animations
        triggerHeroAnimations();
    });
}

function triggerHeroAnimations() {
    // Animate hero elements
    const heroTitle = document.querySelector('h1');
    const heroSubtitle = document.querySelector('.slide-up-animation');
    const heroButtons = document.querySelector('.slide-up-animation-delayed');
    
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroTitle.style.transition = 'all 1s ease-out';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 500);
    }
    
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroSubtitle.style.transition = 'all 1s ease-out';
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 1000);
    }
    
    if (heroButtons) {
        heroButtons.style.opacity = '0';
        heroButtons.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroButtons.style.transition = 'all 1s ease-out';
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
        }, 1500);
    }
}

/**
 * Utility Functions
 */
function animateNumber(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeOutQuart)
        const easedProgress = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (range * easedProgress));
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

function createParticleEffect(element, particleCount = 20) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--neon-cyan);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
        `;
        
        document.body.appendChild(particle);
        
        // Animate particle
        const angle = (i / particleCount) * Math.PI * 2;
        const velocity = 100 + Math.random() * 100;
        const lifetime = 1000 + Math.random() * 1000;
        
        particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: lifetime,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).addEventListener('finish', () => {
            particle.remove();
        });
    }
}

// Performance monitoring
function monitorAnimationPerformance() {
    let frameCount = 0;
    let lastTime = performance.now();
    
    function measureFPS() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
            const fps = frameCount;
            frameCount = 0;
            lastTime = currentTime;
            
            // Log performance if FPS is low
            if (fps < 30) {
                console.warn(`Low FPS detected: ${fps}fps`);
            }
        }
        
        requestAnimationFrame(measureFPS);
    }
    
    requestAnimationFrame(measureFPS);
}

// Initialize performance monitoring in development
if (window.location.hostname === 'localhost') {
    monitorAnimationPerformance();
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        revealElement,
        animateSkillBars,
        typewriterEffect,
        animateNumber,
        createParticleEffect
    };
}

// Reduced motion support
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}
