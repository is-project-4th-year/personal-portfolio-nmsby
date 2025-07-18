// Skills functionality
class Skills {
    constructor() {
        this.skillsSection = document.querySelector('.skills');
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.animated = false;

        this.init();
    }

    init() {
        this.setupScrollObserver();
    }

    setupScrollObserver() {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animateSkills();
                    this.animated = true;
                }
            });
        }, observerOptions);

        if (this.skillsSection) {
            observer.observe(this.skillsSection);
        }
    }

    animateSkills() {
        this.skillsSection.classList.add('animate');

        // Animate each skill bar with a delay
        this.skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const skillLevel = bar.getAttribute('data-skill');
                bar.style.width = this.getSkillPercentage(skillLevel);
            }, index * 100);
        });
    }

    getSkillPercentage(skill) {
        const skillLevels = {
            'javascript': '85%',
            'python': '80%',
            'java': '75%',
            'cpp': '70%',
            'html': '90%',
            'css': '85%',
            'react': '75%',
            'nodejs': '70%',
            'bootstrap': '80%',
            'django': '65%',
            'git': '85%',
            'vscode': '90%',
            'figma': '70%',
            'mysql': '75%'
        };

        return skillLevels[skill] || '50%';
    }
}

// Export for use in main.js
window.Skills = Skills;