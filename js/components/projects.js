// Projects functionality
class Projects {
    constructor() {
        this.projectsGrid = document.querySelector('.projects-grid');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.loadMoreBtn = document.querySelector('.load-more-btn');

        this.currentFilter = 'all';
        this.visibleProjects = 6; // Show 6 projects initially
        this.allProjects = Array.from(this.projectCards);

        this.init();
    }

    init() {
        this.setupFilterButtons();
        this.setupLoadMore();
        this.showInitialProjects();
    }

    setupFilterButtons() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.handleFilterClick(btn);
            });
        });
    }

    setupLoadMore() {
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', () => {
                this.loadMoreProjects();
            });
        }
    }

    handleFilterClick(clickedBtn) {
        // Update active button
        this.filterBtns.forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');

        // Get filter value
        const filterValue = clickedBtn.getAttribute('data-filter');
        this.currentFilter = filterValue;

        // Reset visible projects count
        this.visibleProjects = 6;

        // Filter projects
        this.filterProjects(filterValue);
    }

    filterProjects(filter) {
        this.projectCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            const shouldShow = filter === 'all' || category === filter;

            if (shouldShow) {
                card.classList.remove('hidden');
                card.style.display = 'block';
            } else {
                card.classList.add('hidden');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });

        // Update load more button visibility
        this.updateLoadMoreButton();
    }

    showInitialProjects() {
        this.projectCards.forEach((card, index) => {
            if (index >= this.visibleProjects) {
                card.style.display = 'none';
            }
        });

        this.updateLoadMoreButton();
    }

    loadMoreProjects() {
        const filteredProjects = this.getFilteredProjects();
        const currentlyVisible = filteredProjects.filter(
            card => card.style.display !== 'none'
        ).length;

        // Show 3 more projects
        for (let i = currentlyVisible; i < currentlyVisible + 3; i++) {
            if (filteredProjects[i]) {
                filteredProjects[i].style.display = 'block';
                filteredProjects[i].classList.remove('hidden');
            }
        }

        this.updateLoadMoreButton();
    }

    getFilteredProjects() {
        return this.allProjects.filter(card => {
            const category = card.getAttribute('data-category');
            return this.currentFilter === 'all' || category === this.currentFilter;
        });
    }

    updateLoadMoreButton() {
        if (!this.loadMoreBtn) return;

        const filteredProjects = this.getFilteredProjects();
        const visibleProjects = filteredProjects.filter(
            card => card.style.display !== 'none'
        ).length;

        if (visibleProjects >= filteredProjects.length) {
            this.loadMoreBtn.style.display = 'none';
        } else {
            this.loadMoreBtn.style.display = 'block';
        }
    }
}

// Export for use in main.js
window.Projects = Projects;