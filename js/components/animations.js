// Advanced Animations Class
class PortfolioAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupParallaxEffects();
        this.setupTypingEffect();
        this.setupCounterAnimations();
        this.setupMouseFollower();
        this.setupPageTransitions();
    }

    setupScrollAnimations() {
        // Enhanced scroll reveal animations
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.dataset.animation || 'fadeInUp';
                    const delay = element.dataset.delay || 0;

                    setTimeout(() => {
                        element.classList.add('animate', animationType);
                    }, delay);

                    animationObserver.unobserve(element);
                }
            });
        }, this.observerOptions);

        // Observe elements with animation data attributes
        document.querySelectorAll('[data-animation]').forEach(element => {
            animationObserver.observe(element);
        });
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax');

        if (parallaxElements.length === 0) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;

            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    setupTypingEffect() {
        const typingElements = document.querySelectorAll('.typing-effect');

        typingElements.forEach(element => {
            const text = element.textContent;
            const speed = parseInt(element.dataset.speed) || 100;

            element.textContent = '';
            element.style.borderRight = '2px solid #007bff';

            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                } else {
                    // Add blinking cursor effect
                    setInterval(() => {
                        element.style.borderRight =
                            element.style.borderRight === 'none'
                                ? '2px solid #007bff'
                                : 'none';
                    }, 500);
                }
            };

            // Start typing when element is visible
            const typingObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(typeWriter, 500);
                        typingObserver.unobserve(element);
                    }
                });
            });

            typingObserver.observe(element);
        });
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.counter');

        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = parseInt(counter.dataset.duration) || 2000;
            const suffix = counter.dataset.suffix || '';

            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(counter, target, duration, suffix);
                        counterObserver.unobserve(counter);
                    }
                });
            });

            counterObserver.observe(counter);
        });
    }

    animateCounter(element, target, duration, suffix) {
        const startTime = performance.now();
        const startValue = 0;

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);

            element.textContent = currentValue + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };

        requestAnimationFrame(updateCounter);
    }

    setupMouseFollower() {
        if (window.innerWidth <= 768) return; // Skip on mobile

        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-outline"></div>';
        document.body.appendChild(cursor);

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            const delay = 0.1;
            cursorX += (mouseX - cursorX) * delay;
            cursorY += (mouseY - cursorY) * delay;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            requestAnimationFrame(animateCursor);
        };

        animateCursor();

        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card');

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
            });

            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
            });
        });
    }

    setupPageTransitions() {
        // Page load animation
        window.addEventListener('load', () => {
            document.body.classList.add('page-loaded');
        });

        // Section transitions
        const sections = document.querySelectorAll('section');
        let currentSection = 0;

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-active');

                    // Update navigation active state
                    const sectionId = entry.target.id;
                    this.updateActiveNavigation(sectionId);
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    updateActiveNavigation(sectionId) {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // Utility method for creating staggered animations
    staggerAnimation(elements, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate');
            }, index * delay);
        });
    }

    // Method to trigger custom animations
    triggerAnimation(element, animationType, delay = 0) {
        setTimeout(() => {
            element.classList.add('animate', animationType);
        }, delay);
    }
}

// Export for use in main.js
window.PortfolioAnimations = PortfolioAnimations;