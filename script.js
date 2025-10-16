// Main JavaScript for Wafle's Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initTheme();
    initNavigation();
    initTypewriter();
    initSkillBars();
    initProjects();
    initContactForm();
    initScrollEffects();
    initLoadingScreen();
    initAnimations();
});

// Theme Management
function initTheme() {
    const themeSwitch = document.getElementById('theme-switch');
    const themeToggleSmall = document.querySelector('.theme-toggle-small');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeSwitch.checked = currentTheme === 'dark';
    
    // Update toggle text
    updateToggleText(currentTheme);
    
    // Theme switch event
    themeSwitch.addEventListener('change', function() {
        const newTheme = this.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleText(newTheme);
        animateThemeTransition();
    });
    
    // Small theme toggle
    if (themeToggleSmall) {
        themeToggleSmall.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeSwitch.checked = newTheme === 'dark';
            updateToggleText(newTheme);
            animateThemeTransition();
        });
    }
}

function updateToggleText(theme) {
    const toggleText = document.querySelector('.toggle-text');
    if (toggleText) {
        toggleText.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
    }
    
    const themeIcon = document.querySelector('.theme-toggle-small i');
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

function animateThemeTransition() {
    document.body.style.transition = 'none';
    document.body.style.opacity = '0.8';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 50);
}

// Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.querySelector('.nav-indicator');
    const sections = document.querySelectorAll('section');
    
    // Set initial active link
    setActiveLink();
    
    // Update active link on scroll
    window.addEventListener('scroll', setActiveLink);
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Update nav indicator
                updateNavIndicator(this);
            }
        });
    });
    
    function setActiveLink() {
        let current = '';
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                updateNavIndicator(link);
            }
        });
    }
    
    function updateNavIndicator(activeLink) {
        if (!navIndicator) return;
        
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = activeLink.closest('.nav').getBoundingClientRect();
        
        navIndicator.style.width = `${linkRect.width}px`;
        navIndicator.style.left = `${linkRect.left - navRect.left}px`;
    }
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Show/hide back to top button
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        });
    }
}

// Typewriter Effect
function initTypewriter() {
    const typedText = document.querySelector('.typed-text');
    const cursor = document.querySelector('.cursor');
    const texts = [
        'digital experiences',
        'web applications',
        'creative solutions',
        'efficient code',
        'user interfaces',
        'backend systems',
        'automation tools',
        'machine learning models'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function type() {
        if (isPaused) return;
        
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Deleting text
            typedText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Typing text
            typedText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Determine typing speed
        let typeSpeed = isDeleting ? 50 : 100;
        
        // Add random variation to make it more natural
        typeSpeed += Math.random() * 50;
        
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end of text
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
                type();
            }, 2000);
            return;
        } else if (isDeleting && charIndex === 0) {
            // Move to next text
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start typewriter effect
    setTimeout(type, 1000);
    
    // Cursor blink animation
    setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }, 500);
}

// Skill Bars Animation
function initSkillBars() {
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const level = skillBar.getAttribute('data-level');
                
                setTimeout(() => {
                    skillBar.style.width = level + '%';
                }, 200);
                
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });
    
    skillProgressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Projects Filter and Display
function initProjects() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectsGrid = document.querySelector('.projects-grid');
    
    // Sample projects data
    const projects = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB',
            category: 'web',
            tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            stars: 342,
            forks: 89,
            progress: 100
        },
        {
            id: 2,
            title: 'Mobile Task Manager',
            description: 'Cross-platform task management app with React Native',
            category: 'mobile',
            tech: ['React Native', 'Firebase', 'Redux'],
            stars: 187,
            forks: 42,
            progress: 90
        },
        {
            id: 3,
            title: 'Sentiment Analysis API',
            description: 'REST API for sentiment analysis using machine learning',
            category: 'ai',
            tech: ['Python', 'TensorFlow', 'FastAPI', 'Docker'],
            stars: 256,
            forks: 67,
            progress: 85
        },
        {
            id: 4,
            title: 'DevOps Dashboard',
            description: 'Monitoring dashboard for DevOps pipelines and infrastructure',
            category: 'tools',
            tech: ['Vue.js', 'Go', 'Prometheus', 'Grafana'],
            stars: 123,
            forks: 31,
            progress: 75
        },
        {
            id: 5,
            title: 'Social Media Analytics',
            description: 'Analytics platform for social media performance tracking',
            category: 'web',
            tech: ['Angular', 'Python', 'PostgreSQL', 'D3.js'],
            stars: 198,
            forks: 54,
            progress: 95
        },
        {
            id: 6,
            title: 'AI Code Reviewer',
            description: 'Machine learning tool for automated code review and suggestions',
            category: 'ai',
            tech: ['Python', 'OpenAI', 'Flask', 'Docker'],
            stars: 312,
            forks: 78,
            progress: 70
        }
    ];
    
    // Render projects
    function renderProjects(filter = 'all') {
        const filteredProjects = filter === 'all' 
            ? projects 
            : projects.filter(project => project.category === filter);
        
        projectsGrid.innerHTML = filteredProjects.map(project => `
            <div class="featured-card" data-category="${project.category}">
                <div class="card-badge">${project.category.toUpperCase()}</div>
                <div class="card-header">
                    <div class="card-icon">
                        <i class="fas fa-${getProjectIcon(project.category)}"></i>
                    </div>
                    <div class="card-actions">
                        <button class="card-action-btn" onclick="viewProject(${project.id})">
                            <i class="fas fa-external-link-alt"></i>
                        </button>
                        <button class="card-action-btn" onclick="viewCode(${project.id})">
                            <i class="fas fa-code"></i>
                        </button>
                    </div>
                </div>
                <h3 class="card-title">${project.title}</h3>
                <p class="card-description">${project.description}</p>
                <div class="card-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="card-footer">
                    <div class="card-stats">
                        <div class="card-stat">
                            <i class="fas fa-star"></i>
                            <span>${project.stars}</span>
                        </div>
                        <div class="card-stat">
                            <i class="fas fa-code-branch"></i>
                            <span>${project.forks}</span>
                        </div>
                    </div>
                    <div class="card-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${project.progress}%"></div>
                        </div>
                        <span>${project.progress}% complete</span>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Animate project cards
        animateOnScroll('.featured-card', 'fade-up');
    }
    
    // Filter projects
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Render filtered projects
            renderProjects(filter);
        });
    });
    
    // Initial render
    renderProjects();
}

function getProjectIcon(category) {
    const icons = {
        web: 'globe',
        mobile: 'mobile-alt',
        ai: 'robot',
        tools: 'tools'
    };
    return icons[category] || 'code';
}

// Placeholder functions for project actions
function viewProject(id) {
    alert(`Viewing project ${id} details - This would open a project modal or page in a real implementation`);
}

function viewCode(id) {
    alert(`Viewing code for project ${id} - This would link to GitHub repository in a real implementation`);
}

// Contact Form
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Simulate successful submission
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--surface);
        border: 1px solid var(--border);
        border-left: 4px solid var(--${type});
        border-radius: 8px;
        padding: 16px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        transform: translateX(400px);
        opacity: 0;
        transition: all 0.3s ease;
        max-width: 400px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(notification);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function closeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    notification.style.opacity = '0';
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Scroll Effects
function initScrollEffects() {
    // Parallax effect for background shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.bg-shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Animate elements on scroll
    animateOnScroll('.featured-card', 'fade-up');
    animateOnScroll('.skill-category', 'fade-left');
    animateOnScroll('.section-title', 'fade-down');
}

function animateOnScroll(selector, animation, threshold = 0.1) {
    const elements = document.querySelectorAll(selector);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(`animate-${animation}`);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold });
    
    elements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    if (loadingScreen) {
        // Simulate loading
        setTimeout(() => {
            loadingScreen.classList.add('loaded');
            
            // Remove from DOM after animation
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 2000);
    }
}

// Additional Animations
function initAnimations() {
    // Add CSS classes for animations
    const style = document.createElement('style');
    style.textContent = `
        .scroll-animate {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .animate-fade-up {
            opacity: 1;
            transform: translateY(0);
        }
        
        .animate-fade-down {
            opacity: 1;
            transform: translateY(0);
        }
        
        .animate-fade-left {
            opacity: 1;
            transform: translateX(0);
        }
        
        .scroll-animate.animate-fade-left {
            transform: translateX(-30px);
        }
    `;
    document.head.appendChild(style);
    
    // Initialize all scroll animations
    animateOnScroll('.hero-content', 'fade-up');
    animateOnScroll('.profile-container', 'fade-up');
    animateOnScroll('.featured-card', 'fade-up', 0.1);
    animateOnScroll('.skill-category', 'fade-left', 0.1);
    animateOnScroll('.contact-info', 'fade-right', 0.1);
    animateOnScroll('.contact-form', 'fade-left', 0.1);
}

// Search Functionality
function initSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchResults = document.querySelector('.search-results');
    
    if (searchInput && searchResults) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }
            
            // Simulate search results
            const results = [
                { type: 'project', title: 'Neural Dashboard', link: '#', category: 'Featured' },
                { type: 'skill', title: 'JavaScript', link: '#skills', category: 'Skills' },
                { type: 'project', title: 'Automation OS', link: '#', category: 'Featured' },
                { type: 'blog', title: 'Building with React', link: '#', category: 'Blog' }
            ].filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.category.toLowerCase().includes(query)
            );
            
            if (results.length > 0) {
                searchResults.innerHTML = results.map(result => `
                    <a href="${result.link}" class="search-result">
                        <div class="result-type">${result.type}</div>
                        <div class="result-content">
                            <div class="result-title">${result.title}</div>
                            <div class="result-category">${result.category}</div>
                        </div>
                    </a>
                `).join('');
            } else {
                searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
            }
        });
        
        // Close search when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-bar')) {
                searchResults.style.opacity = '0';
                searchResults.style.visibility = 'hidden';
            }
        });
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', initSearch);

// Utility function for debouncing
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

// Export functions for global access (if needed)
window.viewProject = viewProject;
window.viewCode = viewCode;
