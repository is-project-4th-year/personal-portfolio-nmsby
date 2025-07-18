// Performance Optimization Class
class PerformanceOptimizer {
    constructor() {
        this.lazyImages = [];
        this.preloadedImages = new Set();
        this.criticalResources = [];

        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.setupImageOptimization();
        this.setupCriticalResourcePreloading();
        this.setupServiceWorker();
        this.optimizeAnimations();
        this.setupMemoryManagement();
        this.monitorPerformance();
    }

    setupLazyLoading() {
        // Enhanced lazy loading for images
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        // Observe all images with data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
            this.lazyImages.push(img);
        });

        // Lazy load background images
        const bgImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const bgImage = element.dataset.bgSrc;
                    if (bgImage) {
                        element.style.backgroundImage = `url(${bgImage})`;
                        element.removeAttribute('data-bg-src');
                    }
                    bgImageObserver.unobserve(element);
                }
            });
        });

        document.querySelectorAll('[data-bg-src]').forEach(element => {
            bgImageObserver.observe(element);
        });
    }

    loadImage(img) {
        return new Promise((resolve, reject) => {
            const tempImg = new Image();

            tempImg.onload = () => {
                img.src = tempImg.src;
                img.classList.add('loaded');
                this.preloadedImages.add(img.src);
                resolve(img);
            };

            tempImg.onerror = () => {
                img.classList.add('error');
                reject(new Error(`Failed to load image: ${img.dataset.src}`));
            };

            tempImg.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    setupImageOptimization() {
        // Preload critical images
        const criticalImages = [
            'assets/images/profile-photo.jpg',
            'assets/images/projects/project1.jpg'
        ];

        criticalImages.forEach(src => {
            this.preloadImage(src);
        });

        // Add WebP support detection
        this.checkWebPSupport().then(supportsWebP => {
            if (supportsWebP) {
                document.documentElement.classList.add('webp-support');
            }
        });
    }

    preloadImage(src) {
        if (this.preloadedImages.has(src)) return;

        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);

        this.preloadedImages.add(src);
    }

    checkWebPSupport() {
        return new Promise((resolve) => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }

    setupCriticalResourcePreloading() {
        // Preload critical CSS and JS
        const criticalResources = [
            { href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap', as: 'style' },
            { href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css', as: 'style' }
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            if (resource.as === 'style') {
                link.onload = () => {
                    link.rel = 'stylesheet';
                };
            }
            document.head.appendChild(link);
        });
    }

    setupServiceWorker() {
        // Register service worker for caching
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }

    optimizeAnimations() {
        // Use requestAnimationFrame for smooth animations
        let animationFrame;

        const optimizedScroll = () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }

            animationFrame = requestAnimationFrame(() => {
                // Batch DOM reads and writes
                this.handleScrollOptimizations();
            });
        };

        window.addEventListener('scroll', optimizedScroll, { passive: true });

        // Reduce animation complexity on low-end devices
        if (this.isLowEndDevice()) {
            document.documentElement.classList.add('reduce-animations');
        }
    }

    handleScrollOptimizations() {
        // Batch scroll-related operations
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;

        // Update elements only when necessary
        this.updateVisibleElements(scrollY, windowHeight);
    }

    updateVisibleElements(scrollY, windowHeight) {
        // Only update elements that are visible or about to be visible
        const buffer = windowHeight * 0.5;
        const visibleTop = scrollY - buffer;
        const visibleBottom = scrollY + windowHeight + buffer;

        document.querySelectorAll('.parallax').forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const elementBottom = elementTop + rect.height;

            if (elementTop < visibleBottom && elementBottom > visibleTop) {
                // Element is visible, apply parallax
                const speed = parseFloat(element.dataset.speed) || 0.5;
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
    }

    setupMemoryManagement() {
        // Clean up unused resources
        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });

        // Monitor memory usage
        if ('memory' in performance) {
            setInterval(() => {
                const memInfo = performance.memory;
                if (memInfo.usedJSHeapSize / memInfo.totalJSHeapSize > 0.9) {
                    this.performGarbageCollection();
                }
            }, 30000); // Check every 30 seconds
        }
    }

    performGarbageCollection() {
        // Remove unused event listeners
        this.cleanupEventListeners();

        // Clear unused image references
        this.lazyImages = this.lazyImages.filter(img => document.contains(img));

        // Force garbage collection if available
        if (window.gc) {
            window.gc();
        }
    }

    cleanupEventListeners() {
        // Remove temporary event listeners
        const tempListeners = document.querySelectorAll('[data-temp-listener]');
        tempListeners.forEach(element => {
            element.removeEventListener('click', element._tempHandler);
            element.removeAttribute('data-temp-listener');
        });
    }

    monitorPerformance() {
        // Monitor Core Web Vitals
        this.measureCLS();
        this.measureFID();
        this.measureLCP();

        // Monitor custom metrics
        this.measureCustomMetrics();
    }

    measureCLS() {
        // Cumulative Layout Shift
        if ('LayoutShiftAttribution' in window) {
            new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        console.log('CLS:', entry.value);
                    }
                }
            }).observe({ type: 'layout-shift', buffered: true });
        }
    }

    measureFID() {
        // First Input Delay
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('FID:', entry.processingStart - entry.startTime);
            }
        }).observe({ type: 'first-input', buffered: true });
    }

    measureLCP() {
        // Largest Contentful Paint
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        }).observe({ type: 'largest-contentful-paint', buffered: true });
    }

    measureCustomMetrics() {
        // Time to Interactive
        performance.mark('portfolio-start');

        window.addEventListener('load', () => {
            performance.mark('portfolio-loaded');
            performance.measure('portfolio-load-time', 'portfolio-start', 'portfolio-loaded');

            const measure = performance.getEntriesByName('portfolio-load-time')[0];
            console.log('Portfolio Load Time:', measure.duration);
        });
    }

    isLowEndDevice() {
        // Detect low-end devices
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const hardwareConcurrency = navigator.hardwareConcurrency || 1;
        const memory = navigator.deviceMemory || 1;

        // Consider it low-end if:
        // - Less than 2 CPU cores
        // - Less than 2GB RAM
        // - Slow connection
        return (
            hardwareConcurrency < 2 ||
            memory < 2 ||
            (connection && connection.effectiveType === 'slow-2g') ||
            (connection && connection.effectiveType === '2g')
        );
    }

    cleanup() {
        // Clean up resources before page unload
        this.lazyImages = [];
        this.preloadedImages.clear();
        this.criticalResources = [];

        // Cancel any pending animation frames
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }

    // Public methods for manual optimization
    optimizeImages() {
        this.lazyImages.forEach(img => {
            if (img.dataset.src && !this.preloadedImages.has(img.dataset.src)) {
                this.loadImage(img);
            }
        });
    }

    prefetchNextSection() {
        // Prefetch resources for the next section
        const currentSection = this.getCurrentSection();
        const nextSection = currentSection.nextElementSibling;

        if (nextSection) {
            const images = nextSection.querySelectorAll('img[data-src]');
            images.forEach(img => this.preloadImage(img.dataset.src));
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
}

// Export for use in main.js
window.PerformanceOptimizer = PerformanceOptimizer;