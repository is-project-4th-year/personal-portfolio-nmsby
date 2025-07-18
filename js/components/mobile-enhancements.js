// Mobile Enhancement Class
class MobileEnhancements {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.touchStartY = 0;
        this.touchEndY = 0;
        this.isScrolling = false;

        this.init();
    }

    init() {
        this.setupMobileNavigation();
        this.setupTouchGestures();
        this.setupOrientationChange();
        this.setupViewportHeight();
        this.setupScrollEnhancements();
    }

    setupMobileNavigation() {
        if (!this.isMobile) return;

        // Add mobile overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-nav-overlay';
        document.body.appendChild(overlay);

        // Add close button to mobile menu
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'mobile-nav-close';
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            navMenu.appendChild(closeBtn);

            closeBtn.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }

        // Handle overlay click
        overlay.addEventListener('click', () => {
            this.closeMobileMenu();
        });

        // Update hamburger functionality
        const hamburger = document.querySelector('.hamburger');
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
    }

    setupTouchGestures() {
        if (!this.isMobile) return;

        // Swipe to close mobile menu
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.addEventListener('touchstart', (e) => {
                this.touchStartY = e.touches[0].clientY;
            });

            navMenu.addEventListener('touchend', (e) => {
                this.touchEndY = e.changedTouches[0].clientY;
                this.handleSwipeGesture();
            });
        }

        // Add swipe indicators for project cards
        this.addSwipeIndicators();
    }

    setupOrientationChange() {
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.updateViewportHeight();
                this.closeMobileMenu();
            }, 100);
        });
    }

    setupViewportHeight() {
        this.updateViewportHeight();
        window.addEventListener('resize', () => {
            this.updateViewportHeight();
        });
    }

    setupScrollEnhancements() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleMobileScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        const overlay = document.querySelector('.mobile-nav-overlay');

        if (navMenu && hamburger && overlay) {
            const isActive = navMenu.classList.contains('active');

            if (isActive) {
                this.closeMobileMenu();
            } else {
                this.openMobileMenu();
            }
        }
    }

    openMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        const overlay = document.querySelector('.mobile-nav-overlay');

        navMenu?.classList.add('active');
        hamburger?.classList.add('active');
        overlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        const overlay = document.querySelector('.mobile-nav-overlay');

        navMenu?.classList.remove('active');
        hamburger?.classList.remove('active');
        overlay?.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleSwipeGesture() {
        const swipeThreshold = 50;
        const swipeDistance = this.touchStartY - this.touchEndY;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe up - could add functionality
            } else {
                // Swipe down - could add functionality
            }
        }
    }

    updateViewportHeight() {
        // Fix for mobile viewport height issues
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    handleMobileScroll() {
        // Hide mobile menu on scroll
        if (this.isMobile) {
            this.closeMobileMenu();
        }

        // Add scroll direction detection
        const currentScroll = window.pageYOffset;
        const navbar = document.querySelector('.navbar');

        if (navbar) {
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }

    addSwipeIndicators() {
        const projectsSection = document.querySelector('.projects');
        if (projectsSection) {
            const indicator = document.createElement('div');
            indicator.className = 'swipe-indicator';
            indicator.textContent = 'Swipe to see more projects';
            document.body.appendChild(indicator);

            // Show indicator briefly when projects section is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        indicator.classList.add('show');
                        setTimeout(() => {
                            indicator.classList.remove('show');
                        }, 3000);
                    }
                });
            });

            observer.observe(projectsSection);
        }
    }
}

// Export for use in main.js
window.MobileEnhancements = MobileEnhancements;