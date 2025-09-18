// Clancy Brothers Pest Control - Professional Business Presentation JavaScript

class ClancyPresentationController {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 12;
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentSlideElement = document.getElementById('currentSlide');
        this.totalSlidesElement = document.getElementById('totalSlides');
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
        } else {
            this.setupEventListeners();
        }
        
        // Initialize display
        this.updateDisplay();
        this.updateButtonStates();
        
        // Set total slides counter
        if (this.totalSlidesElement) {
            this.totalSlidesElement.textContent = this.totalSlides;
        }
    }
    
    setupEventListeners() {
        // Re-query elements to ensure they exist
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicators = document.querySelectorAll('.indicator');
        
        // Set up navigation button event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.previousSlide();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.nextSlide();
            });
        }
        
        // Set up indicator clicks
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.goToSlide(index + 1);
            });
        });
        
        // Set up keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        console.log('Clancy Brothers presentation event listeners set up successfully');
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.currentSlide++;
            this.updateDisplay();
            this.updateButtonStates();
            this.animateSlideTransition('next');
            this.trackSlideView(this.currentSlide);
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 1) {
            this.currentSlide--;
            this.updateDisplay();
            this.updateButtonStates();
            this.animateSlideTransition('prev');
            this.trackSlideView(this.currentSlide);
        }
    }
    
    goToSlide(slideNumber) {
        if (slideNumber >= 1 && slideNumber <= this.totalSlides && slideNumber !== this.currentSlide) {
            const direction = slideNumber > this.currentSlide ? 'next' : 'prev';
            this.currentSlide = slideNumber;
            this.updateDisplay();
            this.updateButtonStates();
            this.animateSlideTransition(direction);
            this.trackSlideView(this.currentSlide);
        }
    }
    
    updateDisplay() {
        // Hide all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show current slide
        const currentSlideElement = document.querySelector(`[data-slide="${this.currentSlide}"]`);
        if (currentSlideElement) {
            currentSlideElement.classList.add('active');
        }
        
        // Update indicators
        this.indicators = document.querySelectorAll('.indicator'); // Re-query in case DOM changed
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index + 1 === this.currentSlide);
        });
        
        // Update slide counter
        if (this.currentSlideElement) {
            this.currentSlideElement.textContent = this.currentSlide;
        }
        
        // Update page title based on current slide
        this.updatePageTitle();
    }
    
    updateButtonStates() {
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentSlide === 1;
            this.prevBtn.textContent = this.currentSlide === 1 ? 'First Slide' : '← Previous';
        }
        
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentSlide === this.totalSlides;
            this.nextBtn.textContent = this.currentSlide === this.totalSlides ? 'Final Slide' : 'Next →';
        }
    }
    
    updatePageTitle() {
        const slideTitles = [
            'Company Title & Overview',
            'Executive Summary',
            '2025 Performance Overview',
            'Monthly Revenue Trends',
            'Top Service Categories',
            'Major Contract Analysis',
            'Seasonal Business Patterns',
            'MailChimp Integration Strategy',
            'Automated Email Campaigns',
            'Implementation Roadmap',
            'Expected ROI and Benefits',
            'Next Steps & Action Items'
        ];
        
        const baseTitle = 'Clancy Brothers Pest Control - 2025 Performance & MailChimp Strategy';
        const currentTitle = slideTitles[this.currentSlide - 1];
        document.title = `${currentTitle} | ${baseTitle}`;
    }
    
    handleKeyPress(event) {
        // Handle keyboard navigation
        switch(event.key) {
            case 'ArrowRight':
            case ' ': // Spacebar
                event.preventDefault();
                this.nextSlide();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                this.previousSlide();
                break;
            case 'Home':
                event.preventDefault();
                this.goToSlide(1);
                break;
            case 'End':
                event.preventDefault();
                this.goToSlide(this.totalSlides);
                break;
            case 'Escape':
                event.preventDefault();
                this.toggleFullscreen();
                break;
        }
        
        // Handle number keys for direct slide navigation
        if (event.key >= '1' && event.key <= '9') {
            const slideNumber = parseInt(event.key);
            if (slideNumber <= this.totalSlides) {
                event.preventDefault();
                this.goToSlide(slideNumber);
            }
        }
        
        // Handle special keys for slides 10, 11, 12
        if (event.key === '0' && this.totalSlides >= 10) {
            event.preventDefault();
            this.goToSlide(10);
        }
        
        // Handle Ctrl+1 for slide 11, Ctrl+2 for slide 12
        if (event.ctrlKey) {
            if (event.key === '1' && this.totalSlides >= 11) {
                event.preventDefault();
                this.goToSlide(11);
            } else if (event.key === '2' && this.totalSlides >= 12) {
                event.preventDefault();
                this.goToSlide(12);
            }
        }
    }
    
    animateSlideTransition(direction) {
        // Add subtle animation effects for professional look
        const currentSlideElement = document.querySelector('.slide.active');
        if (currentSlideElement) {
            currentSlideElement.style.opacity = '0';
            currentSlideElement.style.transform = direction === 'next' ? 'translateX(-15px)' : 'translateX(15px)';
            
            setTimeout(() => {
                currentSlideElement.style.opacity = '1';
                currentSlideElement.style.transform = 'translateX(0)';
            }, 50);
        }
    }
    
    toggleFullscreen() {
        // Simple fullscreen toggle functionality
        if (!document.fullscreenElement) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }
    
    // Method to get presentation progress
    getProgress() {
        return {
            currentSlide: this.currentSlide,
            totalSlides: this.totalSlides,
            percentage: Math.round((this.currentSlide / this.totalSlides) * 100),
            slideTitle: this.getCurrentSlideTitle()
        };
    }
    
    getCurrentSlideTitle() {
        const activeSlide = document.querySelector('.slide.active');
        if (activeSlide) {
            const titleElement = activeSlide.querySelector('.slide-title') || 
                               activeSlide.querySelector('.main-title');
            return titleElement ? titleElement.textContent : `Slide ${this.currentSlide}`;
        }
        return `Slide ${this.currentSlide}`;
    }
    
    // Method to track slide views for business analytics
    trackSlideView(slideNumber) {
        // Log slide view for business analysis
        const slideData = {
            slide: slideNumber,
            timestamp: new Date().toISOString(),
            slideTitle: this.getCurrentSlideTitle(),
            sessionId: this.getSessionId()
        };
        
        console.log(`Clancy Brothers Presentation - Slide ${slideNumber} viewed:`, slideData);
        
        // Store viewing data if possible (but handle environments where storage isn't available)
        try {
            const viewHistory = JSON.parse(sessionStorage.getItem('clancyPresentationViews') || '[]');
            viewHistory.push(slideData);
            
            // Keep only last 50 views to avoid storage issues
            if (viewHistory.length > 50) {
                viewHistory.splice(0, viewHistory.length - 50);
            }
            
            sessionStorage.setItem('clancyPresentationViews', JSON.stringify(viewHistory));
        } catch (e) {
            // Fallback for environments without sessionStorage
            console.log('Storage not available, tracking views in memory only');
        }
    }
    
    getSessionId() {
        try {
            let sessionId = sessionStorage.getItem('clancySessionId');
            if (!sessionId) {
                sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                sessionStorage.setItem('clancySessionId', sessionId);
            }
            return sessionId;
        } catch (e) {
            return 'session_' + Date.now();
        }
    }
}

// Enhanced features for business presentation
class ClancyPresentationEnhancements {
    constructor(controller) {
        this.controller = controller;
        this.init();
    }
    
    init() {
        // Add progress indicator
        this.addProgressBar();
        
        // Add business-specific features
        this.addBusinessFeatures();
        
        // Add accessibility improvements
        this.enhanceAccessibility();
        
        // Add presentation utilities
        this.addPresentationUtilities();
    }
    
    addProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'clancy-progress';
        progressBar.innerHTML = '<div class="progress-fill"></div>';
        
        const progressStyles = `
            .clancy-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: rgba(var(--color-brown-600-rgb, 94, 82, 64), 0.15);
                z-index: 1000;
                pointer-events: none;
            }
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, var(--color-primary), var(--color-success));
                transition: width 0.3s ease;
                width: ${(this.controller.currentSlide / this.controller.totalSlides) * 100}%;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = progressStyles;
        document.head.appendChild(styleSheet);
        document.body.appendChild(progressBar);
        
        // Update progress bar when slides change
        const updateProgress = () => {
            const fill = progressBar.querySelector('.progress-fill');
            const percentage = (this.controller.currentSlide / this.controller.totalSlides) * 100;
            if (fill) {
                fill.style.width = `${percentage}%`;
            }
        };
        
        // Store original methods and wrap them
        const originalGoToSlide = this.controller.goToSlide.bind(this.controller);
        const originalNextSlide = this.controller.nextSlide.bind(this.controller);
        const originalPreviousSlide = this.controller.previousSlide.bind(this.controller);
        
        this.controller.goToSlide = (slideNumber) => {
            originalGoToSlide(slideNumber);
            updateProgress();
        };
        
        this.controller.nextSlide = () => {
            originalNextSlide();
            updateProgress();
        };
        
        this.controller.previousSlide = () => {
            originalPreviousSlide();
            updateProgress();
        };
        
        // Initial update
        updateProgress();
    }
    
    enhanceAccessibility() {
        // Add ARIA labels and roles
        const main = document.querySelector('.presentation-main');
        const header = document.querySelector('.presentation-header');
        const footer = document.querySelector('.presentation-footer');
        
        if (main) main.setAttribute('role', 'main');
        if (header) header.setAttribute('role', 'banner');
        if (footer) footer.setAttribute('role', 'navigation');
        
        // Add slide announcements for screen readers
        const announceSlide = () => {
            const slideTitle = this.controller.getCurrentSlideTitle();
            
            if (slideTitle) {
                // Create temporary announcement element
                const announcement = document.createElement('div');
                announcement.setAttribute('aria-live', 'polite');
                announcement.setAttribute('aria-atomic', 'true');
                announcement.className = 'sr-only';
                announcement.textContent = `Now showing slide ${this.controller.currentSlide} of ${this.controller.totalSlides}: ${slideTitle}`;
                
                document.body.appendChild(announcement);
                setTimeout(() => {
                    if (document.body.contains(announcement)) {
                        document.body.removeChild(announcement);
                    }
                }, 1500);
            }
        };
        
        // Override navigation methods to announce slides
        const originalGoToSlide = this.controller.goToSlide.bind(this.controller);
        this.controller.goToSlide = (slideNumber) => {
            originalGoToSlide(slideNumber);
            setTimeout(announceSlide, 100);
        };
    }
    
    addBusinessFeatures() {
        // Add export functionality for business use
        window.exportClancyPresentationData = () => {
            try {
                const data = {
                    companyName: 'Clancy Brothers Pest Control LLC',
                    presentationTitle: '2025 Performance Analysis & MailChimp Integration Strategy',
                    totalSlides: this.controller.totalSlides,
                    currentSlide: this.controller.currentSlide,
                    viewHistory: JSON.parse(sessionStorage.getItem('clancyPresentationViews') || '[]'),
                    businessMetrics: {
                        ytdRevenue: 3224410.55,
                        avgMonthlyRevenue: 358267.84,
                        peakMonth: 'August',
                        peakRevenue: 619086.98,
                        majorContractsPercentage: 27.5
                    },
                    exportDate: new Date().toISOString(),
                    sessionId: this.controller.getSessionId()
                };
                
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'clancy-brothers-presentation-data.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                console.log('Clancy Brothers presentation data exported successfully');
            } catch (e) {
                console.log('Export functionality not available in this environment:', e);
            }
        };
        
        // Add presentation print functionality
        window.printClancyPresentation = () => {
            window.print();
        };
        
        // Add presentation utilities
        window.toggleFullscreen = this.controller.toggleFullscreen.bind(this.controller);
        window.goToSlide = this.controller.goToSlide.bind(this.controller);
        window.getClancyPresentationProgress = this.controller.getProgress.bind(this.controller);
    }
    
    addPresentationUtilities() {
        // Add keyboard shortcut help
        window.showKeyboardShortcuts = () => {
            const shortcuts = `
Clancy Brothers Presentation - Keyboard Shortcuts:
• Arrow keys: Navigate slides
• Space: Next slide  
• Home: First slide
• End: Last slide
• Numbers 1-9: Jump to slides 1-9
• 0: Jump to slide 10
• Ctrl+1: Jump to slide 11
• Ctrl+2: Jump to slide 12
• Escape: Toggle fullscreen
• Ctrl+P: Print presentation
            `;
            console.log(shortcuts);
            alert(shortcuts);
        };
        
        // Add help shortcut
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F1' || (e.key === '?' && e.shiftKey)) {
                e.preventDefault();
                window.showKeyboardShortcuts();
            }
        });
    }
}

// Interactive elements enhancement for business presentation
class ClancyInteractiveElements {
    constructor() {
        this.init();
    }
    
    init() {
        // Add hover effects to interactive elements
        this.enhanceCards();
        this.enableActionItems();
        this.addBusinessMetrics();
    }
    
    enhanceCards() {
        // Add professional hover animations to cards
        const cards = document.querySelectorAll('.opp-card, .highlight-card, .insight-item, .reason-card, .contract-card, .season-card, .campaign-card, .phase, .projection-card, .benefit-item, .tracking-category');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-3px)';
                card.style.boxShadow = 'var(--shadow-md)';
                card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '';
            });
        });
    }
    
    enableActionItems() {
        // Make checkboxes interactive in the action items
        const checkboxes = document.querySelectorAll('.action-checkbox');
        checkboxes.forEach((checkbox, index) => {
            checkbox.style.cursor = 'pointer';
            checkbox.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                if (checkbox.textContent === '□') {
                    checkbox.textContent = '✓';
                    checkbox.style.color = 'var(--color-success)';
                    
                    // Store completion state if possible
                    try {
                        sessionStorage.setItem(`clancy-action-${index}`, 'completed');
                    } catch (e) {
                        // Fallback for environments without sessionStorage
                        checkbox.dataset.completed = 'true';
                    }
                    
                    // Show completion message
                    this.showCompletionMessage(checkbox);
                } else {
                    checkbox.textContent = '□';
                    checkbox.style.color = 'var(--color-primary)';
                    
                    try {
                        sessionStorage.removeItem(`clancy-action-${index}`);
                    } catch (e) {
                        delete checkbox.dataset.completed;
                    }
                }
            });
            
            // Restore completion state
            try {
                if (sessionStorage.getItem(`clancy-action-${index}`) === 'completed') {
                    checkbox.textContent = '✓';
                    checkbox.style.color = 'var(--color-success)';
                }
            } catch (e) {
                // Check fallback data attribute
                if (checkbox.dataset.completed === 'true') {
                    checkbox.textContent = '✓';
                    checkbox.style.color = 'var(--color-success)';
                }
            }
        });
    }
    
    showCompletionMessage(checkbox) {
        // Create a subtle completion indicator
        const indicator = document.createElement('span');
        indicator.textContent = ' ✓ Completed!';
        indicator.style.color = 'var(--color-success)';
        indicator.style.fontSize = 'var(--font-size-xs)';
        indicator.style.fontWeight = 'var(--font-weight-medium)';
        indicator.style.opacity = '0';
        indicator.style.transition = 'opacity 0.3s ease';
        
        const actionItem = checkbox.closest('.action-item');
        if (actionItem) {
            actionItem.appendChild(indicator);
            
            // Fade in
            setTimeout(() => {
                indicator.style.opacity = '1';
            }, 50);
            
            // Remove after 2 seconds
            setTimeout(() => {
                indicator.style.opacity = '0';
                setTimeout(() => {
                    if (actionItem.contains(indicator)) {
                        actionItem.removeChild(indicator);
                    }
                }, 300);
            }, 2000);
        }
    }
    
    addBusinessMetrics() {
        // Add dynamic metric highlighting on hover
        const metricValues = document.querySelectorAll('.metric-value, .highlight-value, .opp-number, .contract-value, .perf-metric .metric-number, .roi-number, .payback-number');
        
        metricValues.forEach(metric => {
            metric.addEventListener('mouseenter', () => {
                metric.style.transform = 'scale(1.05)';
                metric.style.transition = 'transform 0.2s ease';
                metric.style.color = 'var(--color-primary)';
            });
            
            metric.addEventListener('mouseleave', () => {
                metric.style.transform = 'scale(1)';
                metric.style.color = '';
            });
        });
    }
}

// Initialize the Clancy Brothers presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main presentation controller
    const clancyPresentation = new ClancyPresentationController();
    
    // Add enhanced features
    const clancyEnhancements = new ClancyPresentationEnhancements(clancyPresentation);
    
    // Add interactive elements
    const clancyInteractive = new ClancyInteractiveElements();
    
    // Track initial slide view
    clancyPresentation.trackSlideView(1);
    
    // Add global presentation utilities
    window.clancyPresentationController = clancyPresentation;
    
    // Add welcome message for business users
    console.log('🏢 Clancy Brothers Pest Control LLC - 2025 Performance & MailChimp Integration Strategy');
    console.log('📊 Presentation loaded successfully!');
    console.log('🎮 Navigation: Use Previous/Next buttons, slide indicators, or keyboard shortcuts');
    console.log('⌨️  Keyboard shortcuts:');
    console.log('   • Arrow keys / Space: Navigate slides');
    console.log('   • Number keys (1-9, 0): Jump to slides 1-10');
    console.log('   • Ctrl+1/2: Jump to slides 11-12');
    console.log('   • Home/End: First/Last slide');
    console.log('   • Escape: Toggle fullscreen');
    console.log('   • F1 or Shift+?: Show keyboard shortcuts');
    console.log('🔧 Business utilities:');
    console.log('   • exportClancyPresentationData(): Export presentation analytics');
    console.log('   • getClancyPresentationProgress(): Get current progress');
    console.log('   • printClancyPresentation(): Print presentation');
    
    // Show initial slide information
    console.log(`📍 Currently viewing: Slide ${clancyPresentation.currentSlide} - ${clancyPresentation.getCurrentSlideTitle()}`);
});

// Fallback initialization if DOMContentLoaded has already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => {
        if (!window.clancyPresentationController) {
            console.log('Fallback initialization triggered for Clancy Brothers presentation');
            const clancyPresentation = new ClancyPresentationController();
            const clancyEnhancements = new ClancyPresentationEnhancements(clancyPresentation);
            const clancyInteractive = new ClancyInteractiveElements();
            clancyPresentation.trackSlideView(1);
            window.clancyPresentationController = clancyPresentation;
        }
    }, 100);
}

// Add window resize handler for responsive behavior
window.addEventListener('resize', () => {
    // Refresh indicators and ensure proper display on resize
    if (window.clancyPresentationController) {
        window.clancyPresentationController.updateDisplay();
    }
});

// Add visibility change handler to pause/resume if needed
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Clancy Brothers presentation hidden');
    } else {
        console.log('Clancy Brothers presentation visible');
        // Refresh display when returning to tab
        if (window.clancyPresentationController) {
            window.clancyPresentationController.updateDisplay();
        }
    }
});