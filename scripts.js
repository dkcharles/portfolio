// Mobile menu functionality
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuButton && navLinks) {
    mobileMenuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuButton.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuButton.textContent = '☰';
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerElement = document.querySelector('.header');
            const headerHeight = headerElement ? headerElement.offsetHeight : 70;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation highlighting on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    const headerElement = document.querySelector('.header');
    const headerHeight = headerElement ? headerElement.offsetHeight : 70;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionBottom) {
            navItems.forEach(nav => {
                nav.classList.remove('active');
                if (nav.getAttribute('href') === `#${sectionId}`) {
                    nav.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Apply animation to cards and sections
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in class to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Add fade-in class to sections
    sections.forEach(section => {
        if (!section.classList.contains('hero')) {
            section.classList.add('fade-in');
            observer.observe(section);
        }
    });

    // Update active nav on page load
    updateActiveNav();
});

// Header background on scroll
const headerElement = document.querySelector('.header');
if (headerElement) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            headerElement.style.background = 'rgba(255, 255, 255, 0.98)';
            headerElement.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            headerElement.style.background = 'rgba(255, 255, 255, 0.95)';
            headerElement.style.boxShadow = 'none';
        }
    });
}

// Preload critical fonts
const fontLink = document.createElement('link');
fontLink.rel = 'preload';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
fontLink.as = 'style';
document.head.appendChild(fontLink); 