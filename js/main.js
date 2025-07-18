// Main JavaScript file for portfolio
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded successfully!');

    // Initialize portfolio functionality
    initializePortfolio();
});

function initializePortfolio() {
    // Initialize navigation
    new Navigation();

    // Initialize smooth scrolling
    initializeSmoothScrolling();

    // Initialize loading animations
    initializeLoadingAnimations();

    console.log('Portfolio initialized successfully!');
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