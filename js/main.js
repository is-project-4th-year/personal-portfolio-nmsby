// Main JavaScript file for portfolio
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded successfully!');

    // Initialize portfolio functionality
    initializePortfolio();
});

function initializePortfolio() {
    // Initialize navigation
    new Navigation();

    // Initialize skills
    new Skills();

    // Initialize projects
    new Projects();

    // Initialize contact form
    new ContactForm();

    // Initialize mobile enhancements
    new MobileEnhancements();

    // Initialize animations
    new PortfolioAnimations();

    // Initialize smooth scrolling
    const smoothScroll = new SmoothScroll();
    smoothScroll.handleHashOnLoad();

    // Initialize smooth scrolling (legacy)
    initializeSmoothScrolling();

    // Initialize loading animations
    initializeLoadingAnimations();

    // Initialize responsive image handling
    initializeResponsiveImages();

    // Initialize section indicators
    initializeSectionIndicators();

    console.log('Portfolio initialized successfully!');
}

function initializeSectionIndicators() {
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
}

function initializeResponsiveImages() {
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
}

function initializeSmoothScrolling() {
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
}

function initializeLoadingAnimations() {
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
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element with selector "${selector}" not found`);
    }
    return element;
}