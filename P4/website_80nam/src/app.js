/**
 * Main application JavaScript for 80th Anniversary Vietnam National Day website
 * Handles content loading, image gallery, search, theme toggle, and accessibility
 */

class AnniversaryWebsite {
    constructor() {
        this.content = null;
        this.images = null;
        this.currentImagePage = 0;
        this.imagesPerPage = 12;
        this.filteredImages = [];
        this.searchResults = [];
        
        this.init();
    }

    async init() {
        try {
            this.showLoading();
            await this.loadData();
            this.renderContent();
            this.setupEventListeners();
            this.createPatrioticElements();
            this.hideLoading();
        } catch (error) {
            console.error('Error initializing website:', error);
            this.showError('Không thể tải nội dung. Vui lòng tải lại trang.');
        }
    }

    async loadData() {
        try {
            // Load content and images in parallel
            const [contentResponse, imagesResponse] = await Promise.all([
                fetch('data/content.json'),
                fetch('public/assets/images.json')
            ]);

            if (!contentResponse.ok || !imagesResponse.ok) {
                throw new Error('Failed to load data');
            }

            this.content = await contentResponse.json();
            const imagesData = await imagesResponse.json();
            this.images = imagesData.images || [];
            this.filteredImages = [...this.images];
        } catch (error) {
            console.error('Error loading data:', error);
            throw error;
        }
    }

    renderContent() {
        this.renderHero();
        this.renderSections();
        this.renderGallery();
        this.renderAbout();
        this.renderFooter();
    }

    renderHero() {
        const hero = this.content.hero;
        document.getElementById('hero-title').textContent = hero.title;
        document.getElementById('hero-subtitle').textContent = hero.subtitle;
        document.getElementById('hero-lede').textContent = hero.lede;
    }

    renderSections() {
        const sectionsContainer = document.getElementById('content-sections');
        sectionsContainer.innerHTML = '';

        this.content.sections.forEach(section => {
            const sectionElement = this.createSectionElement(section);
            sectionsContainer.appendChild(sectionElement);
        });
    }

    createSectionElement(section) {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'section';
        sectionDiv.id = section.id;

        const heading = document.createElement('h2');
        heading.className = 'section-heading';
        heading.textContent = section.heading;
        sectionDiv.appendChild(heading);

        if (section.paragraphs) {
            const paragraphsDiv = document.createElement('div');
            paragraphsDiv.className = 'section-paragraphs';
            
            section.paragraphs.forEach(paragraph => {
                const p = document.createElement('p');
                p.className = 'section-paragraph';
                p.textContent = paragraph;
                paragraphsDiv.appendChild(p);
            });
            
            sectionDiv.appendChild(paragraphsDiv);
        }

        if (section.bullets) {
            const bulletsList = document.createElement('ul');
            bulletsList.className = 'section-bullets';
            
            section.bullets.forEach(bullet => {
                const li = document.createElement('li');
                li.className = 'section-bullet';
                li.textContent = bullet;
                bulletsList.appendChild(li);
            });
            
            sectionDiv.appendChild(bulletsList);
        }

        return sectionDiv;
    }

    renderGallery() {
        this.renderGalleryImages();
        this.updateLoadMoreButton();
    }

    renderGalleryImages() {
        const galleryGrid = document.getElementById('gallery-grid');
        galleryGrid.innerHTML = '';

        const startIndex = 0;
        const endIndex = Math.min(startIndex + (this.currentImagePage + 1) * this.imagesPerPage, this.filteredImages.length);

        for (let i = startIndex; i < endIndex; i++) {
            const image = this.filteredImages[i];
            const imageElement = this.createImageElement(image);
            galleryGrid.appendChild(imageElement);
        }
    }

    createImageElement(image) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'gallery-item';
        itemDiv.setAttribute('data-domain', image.domain);
        itemDiv.setAttribute('data-category', this.categorizeImage(image));

        const img = document.createElement('img');
        img.className = 'gallery-image';
        img.src = image.url;
        img.alt = image.alt || 'Hình ảnh kỷ niệm 80 năm Quốc khánh';
        img.loading = 'lazy';
        
        // Handle image load errors
        img.onerror = () => {
            img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23f5f5f5"/><text x="150" y="100" text-anchor="middle" fill="%23999" font-family="Arial" font-size="14">Không thể tải ảnh</text></svg>';
        };

        const contentDiv = document.createElement('div');
        contentDiv.className = 'gallery-content';

        const title = document.createElement('h3');
        title.className = 'gallery-title';
        title.textContent = image.title || 'Hình ảnh kỷ niệm';

        const caption = document.createElement('p');
        caption.className = 'gallery-caption';
        caption.textContent = image.alt || '';

        const credit = document.createElement('p');
        credit.className = 'gallery-credit';
        const creditLink = document.createElement('a');
        creditLink.href = image.url;
        creditLink.target = '_blank';
        creditLink.rel = 'noopener';
        creditLink.textContent = `Nguồn: ${image.domain}`;
        credit.appendChild(creditLink);

        contentDiv.appendChild(title);
        contentDiv.appendChild(caption);
        contentDiv.appendChild(credit);

        itemDiv.appendChild(img);
        itemDiv.appendChild(contentDiv);

        return itemDiv;
    }

    categorizeImage(image) {
        const alt = (image.alt || '').toLowerCase();
        const title = (image.title || '').toLowerCase();
        const text = `${alt} ${title}`;

        if (text.includes('diễu binh') || text.includes('parade')) return 'parade';
        if (text.includes('cờ') || text.includes('flag')) return 'flag';
        if (text.includes('lễ') || text.includes('celebration')) return 'celebration';
        if (text.includes('người') || text.includes('people')) return 'people';
        
        return 'celebration'; // default
    }

    renderAbout() {
        document.getElementById('footer-note').textContent = this.content.footer_note;
    }

    renderFooter() {
        document.getElementById('slogan').textContent = this.content.slogan;
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => this.toggleTheme());

        // Search functionality
        const searchToggle = document.getElementById('search-toggle');
        const searchOverlay = document.getElementById('search-overlay');
        const searchClose = document.getElementById('search-close');
        const searchInput = document.getElementById('search-input');

        searchToggle.addEventListener('click', () => this.openSearch());
        searchClose.addEventListener('click', () => this.closeSearch());
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) this.closeSearch();
        });

        searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));

        // Mobile menu
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileNav = document.getElementById('mobile-nav');

        mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
        mobileNav.addEventListener('click', (e) => {
            if (e.target.classList.contains('mobile-nav-link')) {
                this.closeMobileMenu();
            }
        });

        // Gallery filters
        const domainFilter = document.getElementById('domain-filter');
        const categoryFilter = document.getElementById('category-filter');

        domainFilter.addEventListener('change', () => this.filterImages());
        categoryFilter.addEventListener('change', () => this.filterImages());

        // Load more button
        const loadMoreBtn = document.getElementById('load-more');
        loadMoreBtn.addEventListener('click', () => this.loadMoreImages());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Smooth scrolling for anchor links
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        const themeIcon = document.getElementById('theme-toggle');
        themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    }

    openSearch() {
        const searchOverlay = document.getElementById('search-overlay');
        searchOverlay.classList.add('active');
        searchOverlay.setAttribute('aria-hidden', 'false');
        document.getElementById('search-input').focus();
    }

    closeSearch() {
        const searchOverlay = document.getElementById('search-overlay');
        searchOverlay.classList.remove('active');
        searchOverlay.setAttribute('aria-hidden', 'true');
        document.getElementById('search-input').value = '';
        this.clearSearchResults();
    }

    handleSearch(query) {
        if (query.length < 2) {
            this.clearSearchResults();
            return;
        }

        const results = this.searchContent(query);
        this.displaySearchResults(results);
    }

    searchContent(query) {
        const results = [];
        const searchTerm = query.toLowerCase();

        // Search in sections
        this.content.sections.forEach(section => {
            if (section.heading.toLowerCase().includes(searchTerm)) {
                results.push({
                    type: 'section',
                    title: section.heading,
                    content: section.paragraphs ? section.paragraphs.join(' ') : '',
                    id: section.id
                });
            }

            if (section.paragraphs) {
                section.paragraphs.forEach(paragraph => {
                    if (paragraph.toLowerCase().includes(searchTerm)) {
                        results.push({
                            type: 'paragraph',
                            title: section.heading,
                            content: paragraph,
                            id: section.id
                        });
                    }
                });
            }

            if (section.bullets) {
                section.bullets.forEach(bullet => {
                    if (bullet.toLowerCase().includes(searchTerm)) {
                        results.push({
                            type: 'bullet',
                            title: section.heading,
                            content: bullet,
                            id: section.id
                        });
                    }
                });
            }
        });

        return results;
    }

    displaySearchResults(results) {
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = '';

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p>Không tìm thấy kết quả nào.</p>';
            return;
        }

        results.forEach(result => {
            const resultDiv = document.createElement('div');
            resultDiv.className = 'search-result';
            resultDiv.innerHTML = `
                <h4>${result.title}</h4>
                <p>${result.content.substring(0, 200)}...</p>
            `;
            resultDiv.addEventListener('click', () => {
                this.navigateToSection(result.id);
                this.closeSearch();
            });
            resultsContainer.appendChild(resultDiv);
        });
    }

    clearSearchResults() {
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = '';
    }

    navigateToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    toggleMobileMenu() {
        const mobileNav = document.getElementById('mobile-nav');
        mobileNav.classList.toggle('active');
        mobileNav.setAttribute('aria-hidden', mobileNav.classList.contains('active') ? 'false' : 'true');
    }

    closeMobileMenu() {
        const mobileNav = document.getElementById('mobile-nav');
        mobileNav.classList.remove('active');
        mobileNav.setAttribute('aria-hidden', 'true');
    }

    filterImages() {
        const domainFilter = document.getElementById('domain-filter').value;
        const categoryFilter = document.getElementById('category-filter').value;

        this.filteredImages = this.images.filter(image => {
            const domainMatch = !domainFilter || image.domain.includes(domainFilter);
            const categoryMatch = !categoryFilter || this.categorizeImage(image) === categoryFilter;
            return domainMatch && categoryMatch;
        });

        this.currentImagePage = 0;
        this.renderGalleryImages();
        this.updateLoadMoreButton();
    }

    loadMoreImages() {
        this.currentImagePage++;
        this.renderGalleryImages();
        this.updateLoadMoreButton();
    }

    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more');
        const totalDisplayed = Math.min((this.currentImagePage + 1) * this.imagesPerPage, this.filteredImages.length);
        
        if (totalDisplayed >= this.filteredImages.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
            loadMoreBtn.textContent = `Tải thêm ảnh (${this.filteredImages.length - totalDisplayed} ảnh còn lại)`;
        }
    }

    handleKeyboard(e) {
        // Escape key closes modals
        if (e.key === 'Escape') {
            this.closeSearch();
            this.closeMobileMenu();
        }
    }

    showLoading() {
        const loading = document.getElementById('loading');
        loading.classList.add('active');
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        loading.classList.remove('active');
    }

    createPatrioticElements() {
        // Create floating patriotic elements
        this.createFloatingStars();
        this.createPatrioticConfetti();
    }

    createFloatingStars() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        for (let i = 0; i < 20; i++) {
            const star = document.createElement('div');
            star.className = 'floating-star';
            star.innerHTML = '⭐';
            star.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 20 + 10}px;
                color: #ffcd00;
                opacity: ${Math.random() * 0.5 + 0.3};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatStar ${Math.random() * 10 + 15}s linear infinite;
                pointer-events: none;
                z-index: 1;
            `;
            hero.appendChild(star);
        }

        // Add CSS animation
        if (!document.querySelector('#floating-stars-style')) {
            const style = document.createElement('style');
            style.id = 'floating-stars-style';
            style.textContent = `
                @keyframes floatStar {
                    0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    createPatrioticConfetti() {
        // Create confetti effect on scroll
        let confettiTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(confettiTimeout);
            confettiTimeout = setTimeout(() => {
                if (Math.random() < 0.1) { // 10% chance on scroll
                    this.triggerConfetti();
                }
            }, 100);
        });
    }

    triggerConfetti() {
        const colors = ['#da251d', '#ffcd00', '#ffffff'];
        const confetti = [];
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * window.innerWidth}px;
                top: -10px;
                z-index: 9999;
                pointer-events: none;
                animation: confettiFall 3s linear forwards;
            `;
            document.body.appendChild(particle);
            confetti.push(particle);
        }

        // Add confetti animation CSS
        if (!document.querySelector('#confetti-style')) {
            const style = document.createElement('style');
            style.id = 'confetti-style';
            style.textContent = `
                @keyframes confettiFall {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        // Remove confetti after animation
        setTimeout(() => {
            confetti.forEach(particle => particle.remove());
        }, 3000);
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ff4444;
            color: white;
            padding: 20px;
            border-radius: 8px;
            z-index: 9999;
            text-align: center;
        `;
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);

        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeIcon = document.getElementById('theme-toggle');
    if (themeIcon) {
        themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }

    // Initialize the website
    new AnniversaryWebsite();
});

// Service Worker registration for offline functionality (optional)
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
