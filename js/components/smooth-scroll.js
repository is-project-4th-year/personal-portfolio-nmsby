// Enhanced Smooth Scrolling Class
class SmoothScroll {
    constructor() {
        this.isScrolling = false;
        this.scrollSpeed = 1.2;
        this.targetScroll = 0;
        this.currentScroll = 0;

        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupScrollToTop();
        this.setupScrollProgress();
        this.setupSectionNavigation();
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    this.scrollToElement(targetSection);
                }
            });
        });
    }

    setupScrollToTop() {
        // Create scroll to top button
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'scroll-to-top';
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollTopBtn);

        // Show/hide scroll to top button
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top functionality
        scrollTopBtn.addEventListener('click', () => {
            this.scrollToTop();
        });
    }

    setupScrollProgress() {
        // Create scroll progress indicator
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        // Update progress on scroll
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / documentHeight) * 100;

            progressBar.style.width = scrollPercent + '%';
        });
    }

    setupSectionNavigation() {
        // Keyboard navigation for sections
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' && e.ctrlKey) {
                e.preventDefault();
                this.scrollToNextSection();
            } else if (e.key === 'ArrowUp' && e.ctrlKey) {
                e.preventDefault();
                this.scrollToPreviousSection();
            }
        });
    }

    scrollToElement(element, offset = 80) {
        const elementTop = element.offsetTop - offset;

        this.animateScroll(elementTop);

        // Update URL without triggering scroll
        const targetId = element.id;
        if (targetId) {
            history.pushState(null, null, `#${targetId}`);
        }
    }

    scrollToTop() {
        this.animateScroll(0);
    }

    scrollToNextSection() {
        const sections = document.querySelectorAll('section');
        const currentSection = this.getCurrentSection();
        const currentIndex = Array.from(sections).indexOf(currentSection);

        if (currentIndex < sections.length - 1) {
            this.scrollToElement(sections[currentIndex + 1]);
        }
    }

    scrollToPreviousSection() {
        const sections = document.querySelectorAll('section');
        const currentSection = this.getCurrentSection();
        const currentIndex = Array.from(sections).indexOf(currentSection);

        if (currentIndex > 0) {
            this.scrollToElement(sections[currentIndex - 1]);
        }
    }

    getCurrentSection() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.pageYOffset + 100;

        for (let i = sections.length - 1; i >= 0; i--) {
            if (sections[i].offsetTop <= scrollPosition) {
                return sections[i];
            }
        }

        return sections[0];
    }

    animateScroll(targetPosition) {
        if (this.isScrolling) return;

        this.isScrolling = true;
        this.targetScroll = targetPosition;
        this.currentScroll = window.pageYOffset;

        const startTime = performance.now();
        const duration = 800; // ms

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out-cubic)
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);

            const currentPosition = this.currentScroll +
                (this.targetScroll - this.currentScroll) * easeOutCubic;

            window.scrollTo(0, currentPosition);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.isScrolling = false;
            }
        };

        requestAnimationFrame(animate);
    }

    // Method to handle hash links on page load
    handleHashOnLoad() {
        if (window.location.hash) {
            const targetId = window.location.hash.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                setTimeout(() => {
                    this.scrollToElement(targetElement);
                }, 100);
            }
        }
    }
}

// Export for use in main.js
window.SmoothScroll = SmoothScroll;