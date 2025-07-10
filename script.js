// Modern Portfolio JavaScript - Enhanced Functionality

document.addEventListener("DOMContentLoaded", function() {
    console.log("Portfolio loaded successfully! 🚀");
    
    // Initialize all functionality
    initLoader();
    initNavigation();
    initMobileMenu();
    initScrollEffects();
    initFormHandling();
    initAnimations();
    
    // Set active navigation
    setActiveNavigation();
});

// Loader functionality
function initLoader() {
    const loader = document.getElementById('loader');
    
    // Hide loader with smooth transition
    setTimeout(() => {
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }, 1000);
}

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll("nav a");
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Handle smooth scrolling for anchor links
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    closeMobileMenu();
                }
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = this.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.style.transform = nav.classList.contains('active') 
                    ? getHamburgerTransform(index)
                    : 'none';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close menu when pressing escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
    }
}

function closeMobileMenu() {
    const nav = document.querySelector('nav');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (nav && menuToggle) {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
        });
    }
}

function getHamburgerTransform(index) {
    switch(index) {
        case 0: return 'rotate(45deg) translate(5px, 5px)';
        case 1: return 'opacity(0)';
        case 2: return 'rotate(-45deg) translate(7px, -6px)';
        default: return 'none';
    }
}

// Scroll effects
function initScrollEffects() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for header styling
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Optional: Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.project-item, .skill-card, .bio-content, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Form handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual implementation)
            setTimeout(() => {
                // Create mailto link with form data
                const subject = encodeURIComponent(data.subject || 'Contact from Portfolio');
                const body = encodeURIComponent(
                    `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
                );
                
                window.location.href = `mailto:lungelomahaye95@gmail.com?subject=${subject}&body=${body}`;
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showNotification('Message prepared! Your email client should open.', 'success');
            }, 1000);
        });
    }
}

// Animations and interactions
function initAnimations() {
    // Add smooth hover effects for project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add typing effect to hero text
    const heroTitle = document.querySelector('.hero-text h2');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing animation after a delay
        setTimeout(typeWriter, 500);
    }
}

// Set active navigation based on current page
function setActiveNavigation() {
    const navLinks = document.querySelectorAll("nav a");
    const currentPage = window.location.pathname.split("/").pop().toLowerCase() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href").toLowerCase();
        link.classList.remove('active');
        
        if (linkPage === currentPage || 
            (currentPage === "" && linkPage === "index.html") ||
            (currentPage === "index.html" && linkPage === "index.html")) {
            link.classList.add("active");
        }
    });
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-lg);
        color: var(--text-primary);
        backdrop-filter: blur(10px);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Show loader when navigating to a new page
window.addEventListener('beforeunload', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'flex';
        loader.style.opacity = '1';
    }
});

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        console.log('Welcome back! 👋');
    }
});

// Add smooth scrolling for all anchor links
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Performance optimization: Debounce scroll events
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

// Apply debounce to scroll handler
const debouncedScrollHandler = debounce(() => {
    // Additional scroll-based functionality can be added here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Console styling for developers
console.log(
    '%c👨‍💻 Portfolio by Mzwakhe Obrey Mahaye',
    'background: linear-gradient(135deg, #00d9ff, #7c3aed); color: white; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: bold;'
);

console.log(
    '%cLike what you see? Let\'s work together! 🚀\nEmail: lungelomahaye95@gmail.com',
    'color: #00d9ff; font-size: 12px;'
);
