// ============================================
// PRELOADER
// ============================================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.pointerEvents = 'none';
            
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 800);
    }
});

// ============================================
// TYPING EFFECT
// ============================================
const typewriter = document.getElementById('typewriter');
const roles = ['Data Scientist', 'Web Developer', 'AI Engineer', 'Full-Stack Developer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    if (!typewriter) return;
    
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typewriter.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typewriter.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 1500;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
setTimeout(typeEffect, 1200);

// ============================================
// NAVIGATION
// ============================================
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.currentYear = document.getElementById('currentYear');
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateCurrentYear();
        this.handleScroll();
    }
    
    setupEventListeners() {
        // Mobile menu toggle
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Active link highlighting
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e, link));
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        
        // Window resize
        window.addEventListener('resize', () => this.handleResize());
        
        // Scroll events
        window.addEventListener('scroll', () => {
            this.handleScroll();
            this.updateActiveSection();
        });
    }
    
    toggleMobileMenu() {
        const isActive = this.menuToggle.classList.contains('active');
        
        if (!isActive) {
            this.menuToggle.classList.add('active');
            this.navMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            this.menuToggle.classList.remove('active');
            this.navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    handleNavClick(e, clickedLink) {
        e.preventDefault();
        
        const targetId = clickedLink.getAttribute('href');
        if (!targetId || targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Update active link
            this.navLinks.forEach(link => link.classList.remove('active'));
            clickedLink.classList.add('active');
            
            // Scroll to section
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu
            if (window.innerWidth <= 768) {
                this.toggleMobileMenu();
            }
        }
    }
    
    handleOutsideClick(e) {
        if (!this.menuToggle || !this.navMenu) return;
        
        const isClickInsideMenu = this.navMenu.contains(e.target);
        const isClickOnToggle = this.menuToggle.contains(e.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && this.navMenu.classList.contains('active')) {
            this.toggleMobileMenu();
        }
    }
    
    handleResize() {
        if (window.innerWidth > 768 && this.navMenu.classList.contains('active')) {
            this.toggleMobileMenu();
        }
    }
    
    handleScroll() {
        // Navbar background on scroll
        if (this.navbar) {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        }
    }
    
    updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    updateCurrentYear() {
        if (this.currentYear) {
            this.currentYear.textContent = new Date().getFullYear();
        }
    }
}

// ============================================
// SKILL BARS ANIMATION
// ============================================
class SkillAnimator {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.skillSection = document.querySelector('.skills');
        this.animated = false;
        
        if (this.skillSection) {
            this.init();
        }
    }
    
    init() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.animated) {
                        this.animateSkillBars();
                        this.animated = true;
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3, rootMargin: '0px 0px -100px 0px' }
        );
        
        observer.observe(this.skillSection);
    }
    
    animateSkillBars() {
        this.skillBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width') || '0%';
            
            setTimeout(() => {
                bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                bar.style.width = width;
            }, index * 200);
        });
    }
}

// ============================================
// STATS COUNTER
// ============================================
class StatsCounter {
    constructor() {
        this.statNumbers = document.querySelectorAll('.stat-number[data-count]');
        
        if (this.statNumbers.length > 0) {
            this.init();
        }
    }
    
    init() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.startCounting(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );
        
        this.statNumbers.forEach(stat => observer.observe(stat));
    }
    
    startCounting(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
}

// ============================================
// PROJECT CARD INTERACTIONS
// ============================================
class ProjectCards {
    constructor() {
        this.projectCards = document.querySelectorAll('.project-card');
        
        if (this.projectCards.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '';
            });
            
            // Touch devices
            card.addEventListener('touchstart', () => {
                card.classList.add('hover');
            });
            
            card.addEventListener('touchend', () => {
                setTimeout(() => {
                    card.classList.remove('hover');
                }, 300);
            });
        });
    }
}

// ============================================
// CONTACT FORM
// ============================================
class ContactForm {
    constructor() {
        this.contactForm = document.getElementById('contactForm');
        this.formMessage = document.getElementById('formMessage');
        this.submitBtn = this.contactForm?.querySelector('.btn-submit');
        
        if (this.contactForm) {
            this.init();
        }
    }
    
    init() {
        this.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Form input validation
        const inputs = this.contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.validateInput(input));
            input.addEventListener('blur', () => this.validateInput(input));
        });
    }
    
    validateInput(input) {
        const value = input.value.trim();
        
        if (!value) {
            input.classList.remove('valid', 'invalid');
            return;
        }
        
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(value)) {
                input.classList.add('valid');
                input.classList.remove('invalid');
            } else {
                input.classList.add('invalid');
                input.classList.remove('valid');
            }
        } else {
            input.classList.add('valid');
            input.classList.remove('invalid');
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.submitBtn) return;
        
        const formData = new FormData(this.contactForm);
        const originalText = this.submitBtn.innerHTML;
        
        // Show loading state
        this.submitBtn.classList.add('loading');
        this.submitBtn.disabled = true;
        
        try {
            const response = await fetch(this.contactForm.action, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                this.showMessage('Message sent successfully!', 'success');
                this.contactForm.reset();
                
                // Remove validation classes
                const inputs = this.contactForm.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.classList.remove('valid', 'invalid');
                });
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            this.showMessage('Failed to send message. Please try again.', 'error');
            console.error('Error:', error);
        } finally {
            // Reset button
            setTimeout(() => {
                this.submitBtn.classList.remove('loading');
                this.submitBtn.disabled = false;
            }, 2000);
        }
    }
    
    showMessage(message, type) {
        if (!this.formMessage) return;
        
        this.formMessage.textContent = message;
        this.formMessage.className = 'form-message show';
        this.formMessage.classList.add(type);
        
        // Hide message after 5 seconds
        setTimeout(() => {
            this.formMessage.classList.remove('show');
        }, 5000);
    }
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
class BackToTop {
    constructor() {
        this.backToTopBtn = document.querySelector('.back-to-top');
        
        if (this.backToTopBtn) {
            this.init();
        }
    }
    
    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                this.backToTopBtn.classList.add('visible');
            } else {
                this.backToTopBtn.classList.remove('visible');
            }
        });
        
        this.backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ============================================
// FLOATING TECH ICONS
// ============================================
class FloatingIcons {
    constructor() {
        this.techIcons = document.querySelectorAll('.tech-icon');
        
        if (this.techIcons.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.techIcons.forEach(icon => {
            // Add random rotation
            const rotation = Math.random() * 20 - 10; // -10 to 10 degrees
            icon.style.transform = `rotate(${rotation}deg)`;
        });
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#' || href === '#!') return;
                
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ============================================
// PREMIUM CURSOR EFFECT
// ============================================
class PremiumCursor {
    constructor() {
        this.cursor = null;
        this.cursorRing = null;
        this.hoverElements = [];
        
        this.init();
    }
    
    init() {
        // Create cursor elements
        this.createCursor();
        
        // Mouse move listener
        document.addEventListener('mousemove', (e) => this.moveCursor(e));
        
        // Hover effects
        this.setupHoverEffects();
        
        // Hide cursor on touch devices
        this.handleTouchDevices();
    }
    
    createCursor() {
        // Remove any existing custom cursor
        const existingCursor = document.querySelector('.custom-cursor, .cursor-ring');
        if (existingCursor) existingCursor.remove();
        
        // Create cursor dot
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursor.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: var(--accent-primary, #2AF598);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: width 0.2s, height 0.2s, background 0.2s;
            mix-blend-mode: difference;
        `;
        
        // Create cursor ring
        this.cursorRing = document.createElement('div');
        this.cursorRing.className = 'cursor-ring';
        this.cursorRing.style.cssText = `
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid var(--accent-primary, #2AF598);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s, border-color 0.3s, opacity 0.3s;
            mix-blend-mode: difference;
            opacity: 0.5;
        `;
        
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorRing);
    }
    
    moveCursor(e) {
        if (!this.cursor || !this.cursorRing) return;
        
        const cursorX = e.clientX;
        const cursorY = e.clientY;
        
        // Update cursor position immediately
        this.cursor.style.left = `${cursorX}px`;
        this.cursor.style.top = `${cursorY}px`;
        
        // Update ring position with delay for smooth follow
        requestAnimationFrame(() => {
            this.cursorRing.style.left = `${cursorX}px`;
            this.cursorRing.style.top = `${cursorY}px`;
        });
    }
    
    setupHoverEffects() {
        // Elements that trigger hover effects
        this.hoverElements = [
            ...document.querySelectorAll('a, button, .btn, .nav-link, .project-card, .social-link, .tech-item'),
            ...document.querySelectorAll('input, textarea, select')
        ];
        
        this.hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => this.handleHoverEnter(element));
            element.addEventListener('mouseleave', () => this.handleHoverLeave());
        });
    }
    
    handleHoverEnter(element) {
        if (!this.cursor || !this.cursorRing) return;
        
        // Expand ring
        this.cursorRing.style.width = '60px';
        this.cursorRing.style.height = '60px';
        this.cursorRing.style.opacity = '0.8';
        
        // Change color based on element type
        if (element.tagName === 'BUTTON' || element.classList.contains('btn')) {
            this.cursorRing.style.borderColor = 'var(--accent-secondary, #4AD6C8)';
            this.cursorRing.style.borderWidth = '3px';
        } else if (element.tagName === 'A' || element.classList.contains('nav-link')) {
            this.cursorRing.style.borderColor = 'var(--text-primary, #FFFFFF)';
        } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            this.cursorRing.style.borderColor = 'var(--accent-primary, #2AF598)';
            this.cursorRing.style.borderRadius = '8px';
            this.cursorRing.style.width = '100px';
            this.cursorRing.style.height = '40px';
        } else {
            this.cursorRing.style.borderColor = 'var(--accent-primary, #2AF598)';
        }
    }
    
    handleHoverLeave() {
        if (!this.cursor || !this.cursorRing) return;
        
        // Reset to default
        this.cursorRing.style.width = '40px';
        this.cursorRing.style.height = '40px';
        this.cursorRing.style.opacity = '0.5';
        this.cursorRing.style.borderColor = 'var(--accent-primary, #2AF598)';
        this.cursorRing.style.borderWidth = '2px';
        this.cursorRing.style.borderRadius = '50%';
    }
    
    handleTouchDevices() {
        if ('ontouchstart' in window || navigator.maxTouchPoints) {
            this.cursor.style.display = 'none';
            this.cursorRing.style.display = 'none';
        }
    }
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Debounce function for scroll/resize events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for scroll events
function throttle(func, limit = 100) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Service worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
            console.log('ServiceWorker registration failed:', error);
        });
    });
}

// ============================================
// INITIALIZE ALL COMPONENTS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    new Navigation();
    new SkillAnimator();
    new StatsCounter();
    new ProjectCards();
    new ContactForm();
    new BackToTop();
    new FloatingIcons();
    new SmoothScroll();
    new PremiumCursor();
    
    // Add loading animation to elements
    const fadeElements = document.querySelectorAll('.section, .hero-content, .project-card');
    fadeElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Close menu on Escape
        if (e.key === 'Escape') {
            const menuToggle = document.querySelector('.menu-toggle');
            if (menuToggle?.classList.contains('active')) {
                menuToggle.click();
            }
        }
    });
});

