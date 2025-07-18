// Main JavaScript file for portfolio
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded successfully!');

    // Remove loading screen first
    removeLoadingScreen();

    // Initialize portfolio functionality
    setTimeout(() => {
        initializePortfolio();
    }, 100);
});

function removeLoadingScreen() {
    const loadingElement = document.getElementById('critical-loading');
    if (loadingElement) {
        loadingElement.classList.add('hidden');
        // Remove completely after transition
        setTimeout(() => {
            if (loadingElement.parentNode) {
                loadingElement.parentNode.removeChild(loadingElement);
            }
        }, 500);
    }
}

function initializePortfolio() {
    console.log('Initializing portfolio components...');

    try {
        // Initialize performance optimizer first (with error handling)
        if (typeof PerformanceOptimizer !== 'undefined') {
            new PerformanceOptimizer();
            console.log('Performance optimizer initialized');
        } else {
            console.warn('PerformanceOptimizer not available');
        }

        // Initialize navigation
        if (typeof Navigation !== 'undefined') {
            new Navigation();
            console.log('Navigation initialized');
        }

        // Initialize skills
        if (typeof Skills !== 'undefined') {
            new Skills();
            console.log('Skills initialized');
        }

        // Initialize projects
        if (typeof Projects !== 'undefined') {
            new Projects();
            console.log('Projects initialized');
        }

        // Initialize contact form
        if (typeof ContactForm !== 'undefined') {
            new ContactForm();
            console.log('Contact form initialized');
        }

        // Initialize mobile enhancements
        if (typeof MobileEnhancements !== 'undefined') {
            new MobileEnhancements();
            console.log('Mobile enhancements initialized');
        }

        // Initialize animations
        if (typeof PortfolioAnimations !== 'undefined') {
            new PortfolioAnimations();
            console.log('Animations initialized');
        }

        // Initialize smooth scrolling
        if (typeof SmoothScroll !== 'undefined') {
            const smoothScroll = new SmoothScroll();
            smoothScroll.handleHashOnLoad();
            console.log('Smooth scroll initialized');
        }

        // Legacy functions
        // Initialize smooth scrolling
        initializeSmoothScrolling();
        // Initialize loading animations
        initializeLoadingAnimations();
        // Initialize responsive image handling
        initializeResponsiveImages();
        // Initialize section indicators
        initializeSectionIndicators();

        // Performance monitoring in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            initializePerformanceMonitoring();
        }

        console.log('Portfolio initialized successfully!');

    } catch (error) {
        console.error('Error initializing portfolio:', error);
        // Ensure loading screen is removed even if there's an error
        removeLoadingScreen();
    }
}

function initializePerformanceMonitoring() {
    try {
        // Create performance monitor
        const monitor = document.createElement('div');
        monitor.className = 'perf-monitor';
        monitor.id = 'perf-monitor';
        document.body.appendChild(monitor);

        // Update performance metrics
        setInterval(() => {
            updatePerformanceMetrics(monitor);
        }, 1000);

        // Toggle monitor with Ctrl+P
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                monitor.classList.toggle('show');
            }
        });
    } catch (error) {
        console.error('Performance monitoring setup failed:', error);
    }
}

function updatePerformanceMetrics(monitor) {
    try {
        const memory = performance.memory;
        const timing = performance.timing;
        const now = performance.now();

        let html = '<strong>Performance Monitor</strong><br>';

        if (memory) {
            html += `Memory: ${(memory.usedJSHeapSize / 1048576).toFixed(2)}MB / ${(memory.totalJSHeapSize / 1048576).toFixed(2)}MB<br>`;
        }

        html += `Load Time: ${((timing.loadEventEnd - timing.navigationStart) / 1000).toFixed(2)}s<br>`;
        html += `DOM Ready: ${((timing.domContentLoadedEventEnd - timing.navigationStart) / 1000).toFixed(2)}s<br>`;
        html += `Time Since Load: ${(now / 1000).toFixed(2)}s<br>`;

        // FPS counter
        if (window.fpsCounter) {
            html += `FPS: ${window.fpsCounter}<br>`;
        }

        html += '<small>Press Ctrl+P to toggle</small>';

        monitor.innerHTML = html;
    } catch (error) {
        console.warn('Performance metrics update failed:', error);
    }
}

// FPS Counter
(function() {
    try {
        let lastTime = performance.now();
        let frames = 0;

        function tick() {
            frames++;
            const now = performance.now();
            if (now >= lastTime + 1000) {
                window.fpsCounter = Math.round((frames * 1000) / (now - lastTime));
                frames = 0;
                lastTime = now;
            }
            requestAnimationFrame(tick);
        }

        tick();
    } catch (error) {
        console.warn('FPS counter initialization failed:', error);
    }
})();

function initializeSectionIndicators() {
    try {
        // Create section navigation dots
        const sections = document.querySelectorAll('section[id]');
        if (sections.length === 0) return;

        const indicator = document.createElement('div');
        indicator.className = 'section-indicator';

        sections.forEach((section, index) => {
            const dot = document.createElement('div');
            dot.className = 'section-dot';
            dot.setAttribute('data-tooltip', section.dataset.title || section.id.charAt(0).toUpperCase() + section.id.slice(1));
            dot.addEventListener('click', () => {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });

            indicator.appendChild(dot);
        });

        document.body.appendChild(indicator);

        // Update active dot on scroll
        const updateActiveDot = () => {
            const scrollPosition = window.pageYOffset + 100;
            const dots = indicator.querySelectorAll('.section-dot');

            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    dots.forEach(dot => dot.classList.remove('active'));
                    dots[index]?.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', updateActiveDot);
        updateActiveDot(); // Initialize
    } catch (error) {
        console.warn('Section indicators initialization failed:', error);
    }
}

function initializeResponsiveImages() {
    try {
        // Lazy loading for images
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } catch (error) {
        console.warn('Responsive images initialization failed:', error);
    }
}

function initializeSmoothScrolling() {
    try {
        // Enhanced smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    } catch (error) {
        console.warn('Smooth scrolling initialization failed:', error);
    }
}

function initializeLoadingAnimations() {
    try {
        // Add loading animations to sections
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                }
            });
        }, observerOptions);

        // Observe all sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.classList.add('loading');
            observer.observe(section);
        });
    } catch (error) {
        console.warn('Loading animations initialization failed:', error);
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add error handling for missing elements
function safeQuerySelector(selector) {
    try {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`Element with selector "${selector}" not found`);
        }
        return element;
    } catch (error) {
        console.error(`Error selecting element "${selector}":`, error);
        return null;
    }
}