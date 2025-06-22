/**
 * Special Effects and Easter Eggs for AJ's Portfolio
 * Cursor trails, particles, code rain, konami code, and more
 */

// Special effects state
const specialEffects = {
    cursorTrailEnabled: true,
    particlesEnabled: true,
    codeRainEnabled: false,
    musicVisualizerEnabled: true,
    konamiSequence: [],
    konamiCode: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']
};

// Initialize special effects
document.addEventListener('DOMContentLoaded', function() {
    initCursorTrail();
    initParticleSystem();
    initMusicVisualizer();
    initKonamiCode();
    initCodeRain();
    
    console.log('🎨 Special effects loaded successfully!');
});

/**
 * Cursor Trail Effect
 */
function initCursorTrail() {
    if (!specialEffects.cursorTrailEnabled) return;
    
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.7) { // Only create trail 30% of the time for performance
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            
            document.body.appendChild(trail);
            
            // Remove trail after animation
            setTimeout(() => {
                if (trail.parentNode) {
                    trail.parentNode.removeChild(trail);
                }
            }, 800);
        }
    });
}

/**
 * Dynamic Particle System
 */
function initParticleSystem() {
    if (!specialEffects.particlesEnabled) return;
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size and color
        const size = Math.random() * 4 + 2;
        const colors = ['#00ffff', '#6366f1', '#8b5cf6', '#ec4899'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = color;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 20000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 2000);
}

/**
 * Music Visualizer Widget
 */
function initMusicVisualizer() {
    if (!specialEffects.musicVisualizerEnabled) return;
    
    const visualizer = document.createElement('div');
    visualizer.className = 'music-visualizer';
    visualizer.innerHTML = `
        <div class="sound-wave">
            <div class="wave-bar"></div>
            <div class="wave-bar"></div>
            <div class="wave-bar"></div>
            <div class="wave-bar"></div>
            <div class="wave-bar"></div>
        </div>
    `;
    
    visualizer.addEventListener('click', () => {
        const isPlaying = visualizer.classList.toggle('playing');
        const waves = visualizer.querySelectorAll('.wave-bar');
        
        waves.forEach(wave => {
            if (isPlaying) {
                wave.style.animationPlayState = 'running';
            } else {
                wave.style.animationPlayState = 'paused';
            }
        });
        
        // Show tooltip
        const tooltip = document.createElement('div');
        tooltip.textContent = isPlaying ? 'Coding vibes ON' : 'Music paused';
        tooltip.style.cssText = `
            position: fixed;
            bottom: 90px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: #00ffff;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            z-index: 1001;
            pointer-events: none;
        `;
        
        document.body.appendChild(tooltip);
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 2000);
    });
    
    document.body.appendChild(visualizer);
}

/**
 * Konami Code Easter Egg
 */
function initKonamiCode() {
    document.addEventListener('keydown', (e) => {
        specialEffects.konamiSequence.push(e.code);
        
        // Keep only the last 10 keys
        if (specialEffects.konamiSequence.length > 10) {
            specialEffects.konamiSequence.shift();
        }
        
        // Check if sequence matches Konami code
        if (arraysEqual(specialEffects.konamiSequence, specialEffects.konamiCode)) {
            triggerKonamiEffect();
            specialEffects.konamiSequence = []; // Reset
        }
    });
}

function triggerKonamiEffect() {
    // Add celebration effect to the whole page
    document.body.classList.add('konami-activated');
    
    // Toggle code rain
    specialEffects.codeRainEnabled = !specialEffects.codeRainEnabled;
    
    if (specialEffects.codeRainEnabled) {
        startCodeRain();
    } else {
        stopCodeRain();
    }
    
    // Show special message
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #00ffff, #8b5cf6);
            color: black;
            padding: 20px 40px;
            border-radius: 12px;
            font-size: 18px;
            font-weight: bold;
            z-index: 9999;
            text-align: center;
            box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
        ">
            🎉 AJ SUPREME MODE ACTIVATED! 🎉<br>
            <small style="font-size: 14px; opacity: 0.8;">
                ${specialEffects.codeRainEnabled ? 'Matrix activated!' : 'Back to reality!'}
            </small>
        </div>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        document.body.classList.remove('konami-activated');
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 3000);
}

/**
 * Code Rain Effect (Matrix-style)
 */
function initCodeRain() {
    // Code rain is toggled by Konami code
}

function startCodeRain() {
    const container = document.createElement('div');
    container.className = 'code-rain';
    container.id = 'code-rain-container';
    
    document.body.appendChild(container);
    
    const codeChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz{}[]()<>=/\\|';
    const columnWidth = 20;
    const columns = Math.floor(window.innerWidth / columnWidth);
    
    for (let i = 0; i < columns; i++) {
        setTimeout(() => {
            createCodeColumn(i * columnWidth, codeChars);
        }, Math.random() * 2000);
    }
}

function createCodeColumn(x, chars) {
    const column = document.createElement('div');
    column.className = 'code-column';
    column.style.left = x + 'px';
    column.style.animationDuration = (Math.random() * 3 + 2) + 's';
    
    // Generate random code text
    let text = '';
    for (let i = 0; i < 50; i++) {
        text += chars[Math.floor(Math.random() * chars.length)] + '<br>';
    }
    column.innerHTML = text;
    
    const container = document.getElementById('code-rain-container');
    if (container) {
        container.appendChild(column);
        
        // Remove column after animation
        setTimeout(() => {
            if (column.parentNode) {
                column.parentNode.removeChild(column);
            }
        }, 5000);
    }
}

function stopCodeRain() {
    const container = document.getElementById('code-rain-container');
    if (container) {
        container.remove();
    }
}

/**
 * Utility Functions
 */
function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

/**
 * Performance-aware scroll effects
 */
function initAdvancedScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrollY = window.scrollY;
        const scrollPercent = scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        
        // Update floating shapes with scroll
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            const translateY = scrollY * speed;
            const rotate = scrollPercent * 180;
            shape.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`;
        });
        
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
}

// Initialize advanced scroll effects
document.addEventListener('DOMContentLoaded', initAdvancedScrollEffects);

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        specialEffects,
        triggerKonamiEffect,
        createCodeColumn
    };
}