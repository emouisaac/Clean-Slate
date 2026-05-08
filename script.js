// ============================================
// CLEAN SLATE LAUNDRY - JAVASCRIPT
// ============================================

const controlledSectionSelectors = [
    '#services',
    '#pricing',
    '#tracking',
    '#booking',
    '#testimonials',
    '#about',
    '#faq',
    '.why-choose',
    '.service-areas',
    '.payments',
    '.contact-cta'
];

const homeContentSelectors = [
    '.promo-banner',
    '#home'
];

function setDisplay(selectors, value) {
    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.style.display = value;
        });
    });
}

function hideControlledSections() {
    setDisplay(controlledSectionSelectors, 'none');
}

function showHomeContent() {
    homeContentSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            if (element.dataset.dismissed === 'true') {
                return;
            }

            element.style.display = '';
        });
    });
}

function hideHomeContent() {
    setDisplay(homeContentSelectors, 'none');
}

function setActiveNav(sectionId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
    });
}

function showSection(sectionId) {
    hideControlledSections();

    if (sectionId === 'home') {
        showHomeContent();
        setActiveNav('home');
        return;
    }

    hideHomeContent();

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        setActiveNav(sectionId);
    }
}

function handleSectionLinkClick(link) {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) {
        return;
    }

    const targetId = href.substring(1);
    if (targetId === 'home' || document.getElementById(targetId)) {
        showSection(targetId);
    }
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') {
            return;
        }

        const targetId = href.substring(1);
        if (targetId === 'home' || document.getElementById(targetId)) {
            e.preventDefault();
            handleSectionLinkClick(this);
        }
    });
});

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger?.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile nav when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger?.setAttribute('aria-expanded', 'false');
    });
});

document.addEventListener('click', function (event) {
    if (!navLinks || !hamburger) {
        return;
    }

    if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

// Active nav link is now handled by click events above
// Removed scroll-based active link detection since we're using section-based navigation

// Promo Banner Close
const promo = document.getElementById('promoBanner');
if (promo) {
    promo.addEventListener('click', function () {
        const banner = this.parentElement.parentElement;
        banner.dataset.dismissed = 'true';
        banner.style.display = 'none';
    });
}

// Booking Form Submission
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simulate API call
        console.log('Booking Data:', data);
        
        // Show success message
        alert(`Thank you, ${data.fullName}! Your pickup has been scheduled for ${data.pickupDate} at ${data.pickupTime}. You'll receive an SMS confirmation shortly.`);
        
        // Reset form
        this.reset();
    });
}

// Quote Button
const quoteBtn = document.getElementById('quoteBtn');
if (quoteBtn) {
    quoteBtn.addEventListener('click', function () {
        const form = document.getElementById('bookingForm');
        const phone = form.phone.value;
        const service = form.service.value;
        
        if (phone && service) {
            const whatsappMsg = `Hello Clean Slate! I'd like to get a quote for ${service} service. My number is ${phone}`;
            window.open(`https://wa.me/256787673188?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
        } else {
            alert('Please fill in phone number and service type first');
        }
    });
}

// Order Tracking
const trackButton = document.getElementById('trackButton');
const trackingInput = document.getElementById('trackingInput');
const trackingTimeline = document.getElementById('trackingTimeline');

if (trackButton) {
    trackButton.addEventListener('click', function () {
        const orderNum = trackingInput.value.trim();
        
        if (!orderNum) {
            alert('Please enter an order number');
            return;
        }
        
        // Show tracking timeline
        trackingTimeline.style.display = 'flex';
        
    });
    
    // Allow Enter key to submit
    trackingInput?.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            trackButton.click();
        }
    });
}

// Before/After Image Comparison
const comparisonRanges = document.querySelectorAll('.comparison-range');
comparisonRanges.forEach(range => {
    range.addEventListener('input', function () {
        const afterImg = this.parentElement.querySelector('.after-img');
        const handle = this.parentElement.querySelector('.comparison-handle');
        const percentage = this.value;
        
        afterImg.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
        handle.style.left = `${percentage}%`;
    });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', function () {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Testimonials Carousel
let currentTestimonial = 0;
const testimonialsCarousel = document.getElementById('testimonialsCarousel');
const testimonialCards = testimonialsCarousel?.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonialCards?.length || 0;

function showTestimonials() {
    if (totalTestimonials === 0) return;
    
    const visibleCount = getVisibleTestimonialCount();
    
    testimonialCards.forEach((card, index) => {
        card.style.display = 'none';
    });
    
    for (let i = 0; i < visibleCount && currentTestimonial + i < totalTestimonials; i++) {
        testimonialCards[currentTestimonial + i].style.display = 'block';
    }
}

function getVisibleTestimonialCount() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
}

const nextTestimonialBtn = document.getElementById('nextTestimonial');
const prevTestimonialBtn = document.getElementById('prevTestimonial');

if (nextTestimonialBtn) {
    nextTestimonialBtn.addEventListener('click', function () {
        const visibleCount = getVisibleTestimonialCount();
        currentTestimonial = (currentTestimonial + visibleCount) % totalTestimonials;
        showTestimonials();
    });
}

if (prevTestimonialBtn) {
    prevTestimonialBtn.addEventListener('click', function () {
        const visibleCount = getVisibleTestimonialCount();
        currentTestimonial = (currentTestimonial - visibleCount + totalTestimonials) % totalTestimonials;
        showTestimonials();
    });
}

// Initialize testimonials carousel
window.addEventListener('resize', showTestimonials);
showTestimonials();

// Smooth scroll is now handled by the section navigation system above
// Removed general anchor link smooth scrolling since we have custom navigation

// Validate phone input
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function () {
        // Allow only numbers and common phone characters
        this.value = this.value.replace(/[^0-9+\-() ]/g, '');
    });
}

// Set minimum date to today
const pickupDateInput = document.getElementById('pickupDate');
if (pickupDateInput) {
    const today = new Date().toISOString().split('T')[0];
    pickupDateInput.setAttribute('min', today);
}

// Newsletter subscription
const newsletterInputs = document.querySelectorAll('.newsletter-input');
newsletterInputs.forEach(input => {
    if (input.nextElementSibling) {
        input.nextElementSibling.addEventListener('click', function () {
            const email = input.value.trim();
            if (email && validateEmail(email)) {
                alert(`Thank you for subscribing! Check ${email} for our latest updates.`);
                input.value = '';
            } else if (!email) {
                alert('Please enter a valid email address');
            }
        });
    }
});

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.service-card, .feature, .testimonial-card, .payment-method').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add loading animation to buttons
const buttons = document.querySelectorAll('button[type="submit"]');
buttons.forEach(btn => {
    btn.addEventListener('click', function () {
        const originalText = this.textContent;
        this.textContent = '⏳ Processing...';
        this.disabled = true;
        
        setTimeout(() => {
            this.textContent = originalText;
            this.disabled = false;
        }, 2000);
    });
});

// Initialize - make sure home is visible and active on page load
document.addEventListener('DOMContentLoaded', function() {
    hideControlledSections();
    showHomeContent();
    setActiveNav('home');
});
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('click', function () {
        const service = this.getAttribute('data-service');
        const serviceSelect = document.getElementById('service');
        
        if (serviceSelect) {
            // Find and select the matching option
            const option = Array.from(serviceSelect.options).find(opt => 
                opt.value === service
            );
            
            if (option) {
                serviceSelect.value = service;
                showSection('booking');
            }
        }
    });
});

// Dark mode support (optional)
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // User prefers dark mode - current design is light, could add dark mode toggle here
    console.log('Dark mode detected');
}

// Log page version
console.log('Clean Slate Laundry Website v1.0 - Premium Edition');
console.log('© 2024 Clean Slate Laundry. All rights reserved.');

// Prevent form spam
let formSubmitAttempts = 0;
const maxSubmitAttempts = 3;

if (bookingForm) {
    bookingForm.addEventListener('submit', function () {
        formSubmitAttempts++;
        
        if (formSubmitAttempts > maxSubmitAttempts) {
            alert('Too many submission attempts. Please wait a moment.');
            return false;
        }
        
        setTimeout(() => {
            formSubmitAttempts--;
        }, 60000);
    });
}

// Performance optimization: Lazy load images if implemented
const imageElements = document.querySelectorAll('img[data-src]');
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    imageElements.forEach(img => imageObserver.observe(img));
}

// Responsive behavior for testimonials
window.addEventListener('resize', () => {
    showTestimonials();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    console.log('Page loaded successfully');
    
    // Animate counters if any stats exist
    const statsElements = document.querySelectorAll('[data-count]');
    statsElements.forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        animateCounter(el, target);
    });
});

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 50);
}

// Handle service area interactive features
const areaItems = document.querySelectorAll('.area-item');
areaItems.forEach(item => {
    item.addEventListener('click', function () {
        const area = this.querySelector('h4').textContent;
        alert(`${area} is in our service area! Book your pickup today.`);
    });
});

// WhatsApp number configuration
const whatsappNumber = '256787673188'; // Format: country code + number without +

// Update all WhatsApp links with the business number
document.querySelectorAll('[href*="wa.me"]').forEach(link => {
    if (!link.href.includes(whatsappNumber)) {
        link.href = link.href.replace(/256\d+/, whatsappNumber);
    }
});

// Add scroll-to-top button behavior
const scrollTop = () => {
    const scrollTopBtn = document.querySelector('.scroll-to-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.style.display = 'block';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
};

scrollTop();

// Service package selection
const packageButtons = document.querySelectorAll('.package-card button');
packageButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        const packageName = this.closest('.package-card').querySelector('h4').textContent;
        alert(`You selected: ${packageName}. Contact us for more details.`);
    });
});

// Form validation before submission
function validateBookingForm(formData) {
    const required = ['fullName', 'phone', 'address', 'service', 'pickupDate', 'pickupTime'];
    
    for (let field of required) {
        if (!formData[field] || formData[field].trim() === '') {
            return false;
        }
    }
    
    return true;
}

// Update booking form validation
if (bookingForm) {
    const originalSubmit = bookingForm.onsubmit;
    bookingForm.addEventListener('submit', function (e) {
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        if (!validateBookingForm(data)) {
            e.preventDefault();
            alert('Please fill in all required fields');
        }
    });
}

// Add analytics tracking (optional - configure with actual tracking code)
function trackEvent(eventName, eventData) {
    console.log(`Event: ${eventName}`, eventData);
    
    // Uncomment to add Google Analytics or similar:
    // gtag('event', eventName, eventData);
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function () {
        trackEvent('button_click', {
            button_text: this.textContent,
            button_class: this.className
        });
    });
});

// Track form submissions
if (bookingForm) {
    bookingForm.addEventListener('submit', function () {
        trackEvent('booking_form_submitted', {
            timestamp: new Date().toISOString()
        });
    });
}

console.log('All scripts loaded and initialized successfully ✓');
