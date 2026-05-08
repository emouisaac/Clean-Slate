# Clean Slate Laundry - Implementation & Customization Guide

## 🔧 Advanced Implementation Guide

This document provides detailed instructions for customizing and integrating the Clean Slate Laundry website with backend services.

---

## 1. WHATSAPP BUSINESS INTEGRATION

### A. Set Up WhatsApp Business Account

1. **Create Business Account**
   - Download WhatsApp Business app
   - Verify with your business phone number
   - Complete business profile

2. **WhatsApp Cloud API Setup**
   - Register at developers.facebook.com
   - Create app and get credentials
   - Set up webhook for messages

### B. Update WhatsApp Links

Replace all instances of the phone number in the code:

```javascript
// In script.js - Update WhatsApp number
const whatsappNumber = '256700000000'; // Your actual number
```

Also update in HTML links:
```html
<!-- All WhatsApp links -->
<a href="https://wa.me/256700000000?text=...">
```

### C. Auto-Reply Messages

```javascript
// WhatsApp pre-filled messages
const prefilledMessages = {
    booking: "Hello Clean Slate! I'd like to book a pickup for laundry services.",
    quote: "I'd like to get a quote for your services.",
    inquiry: "Can you tell me more about your services?",
};
```

---

## 2. PAYMENT GATEWAY INTEGRATION

### A. MTN Mobile Money Integration

```javascript
// Example MTN API integration (requires backend)
async function processMTNPayment(amount, phone) {
    try {
        const response = await fetch('/api/mtn-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: amount,
                phoneNumber: phone,
                currency: 'UGX'
            })
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('MTN Payment Error:', error);
    }
}
```

### B. Add Payment Button to Form

```html
<!-- Add to booking form -->
<div class="form-group">
    <label for="paymentMethod">Payment Method</label>
    <select id="paymentMethod" name="paymentMethod" required>
        <option value="mtn">MTN Mobile Money</option>
        <option value="airtel">Airtel Money</option>
        <option value="bank">Bank Transfer</option>
        <option value="cash">Cash on Pickup</option>
    </select>
</div>
```

---

## 3. DATABASE & BOOKING SYSTEM

### A. Booking Data Structure

```javascript
// Example booking object
const bookingData = {
    id: "CS-2024-001",
    customerName: "John Doe",
    phone: "+256700000000",
    email: "john@example.com",
    address: "123 Main Street, Kampala",
    service: "wash-fold",
    pickupDate: "2024-05-10",
    pickupTime: "10:00",
    specialInstructions: "Delicate fabrics",
    status: "scheduled",
    createdAt: "2024-05-08T14:30:00Z",
    estimatedDelivery: "2024-05-10T18:00:00Z",
    totalCost: 75000,
    paymentStatus: "pending"
};
```

### B. Basic Node.js/Express Setup

```javascript
// backend/app.js - Example backend structure
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Booking endpoint
app.post('/api/bookings', async (req, res) => {
    const bookingData = req.body;
    
    // Save to database
    // Send confirmation SMS/email
    // Return booking confirmation
    
    res.json({
        success: true,
        bookingId: 'CS-2024-001',
        message: 'Booking confirmed'
    });
});

// Order tracking endpoint
app.get('/api/orders/:orderId', async (req, res) => {
    const orderId = req.params.orderId;
    // Fetch order from database
    // Return order status
    res.json({
        orderId: orderId,
        status: 'ready',
        timeline: [...]
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

---

## 4. SMS NOTIFICATION INTEGRATION

### A. Using Africastalking API

```javascript
// sms-service.js
async function sendBookingConfirmation(phone, bookingData) {
    const message = `
        Hello ${bookingData.customerName}!
        Your pickup is scheduled for ${bookingData.pickupDate} at ${bookingData.pickupTime}.
        Order: ${bookingData.bookingId}
        Track: https://yoursite.com/track/${bookingData.bookingId}
    `;
    
    try {
        const response = await fetch('https://api.africastalking.com/version1/messaging', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer YOUR_API_KEY`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username: 'YOUR_USERNAME',
                to: phone,
                message: message
            })
        });
        
        return await response.json();
    } catch (error) {
        console.error('SMS Error:', error);
    }
}
```

### B. SMS Status Updates

```javascript
// Update customer with status
const statusMessages = {
    'picked-up': 'Your laundry has been collected. We will keep you updated.',
    'washing': 'Your clothes are being washed with care.',
    'drying': 'Your clothes are being dried.',
    'ready': 'Your laundry is ready! We will deliver it today.',
    'delivered': 'Your laundry has been delivered. Thank you!',
};
```

---

## 5. EMAIL INTEGRATION

### A. Using SendGrid

```javascript
// email-service.js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendBookingConfirmationEmail(customerEmail, bookingData) {
    const msg = {
        to: customerEmail,
        from: 'noreply@cleanslate.ug',
        subject: `Booking Confirmation - Order #${bookingData.bookingId}`,
        html: `
            <h1>Welcome to Clean Slate Laundry!</h1>
            <p>Your booking has been confirmed:</p>
            <ul>
                <li>Order ID: ${bookingData.bookingId}</li>
                <li>Pickup Date: ${bookingData.pickupDate}</li>
                <li>Pickup Time: ${bookingData.pickupTime}</li>
                <li>Service: ${bookingData.service}</li>
                <li>Total Cost: ${bookingData.totalCost} UGX</li>
            </ul>
            <p><a href="https://yoursite.com/track/${bookingData.bookingId}">Track Your Order</a></p>
        `,
    };
    
    return sgMail.send(msg);
}
```

---

## 6. GOOGLE MAPS INTEGRATION

### A. Add Service Area Map

```html
<!-- In your HTML, replace service areas section -->
<section class="service-areas">
    <div class="container">
        <h2>Service Areas</h2>
        <div id="serviceMap" style="width: 100%; height: 400px;"></div>
    </div>
</section>
```

### B. Initialize Map with JavaScript

```javascript
// maps-service.js
function initServiceMap() {
    const map = new google.maps.Map(document.getElementById('serviceMap'), {
        zoom: 12,
        center: { lat: 0.3476, lng: 32.5825 }, // Kampala coordinates
        styles: [
            {
                elementType: 'geometry',
                stylers: [{ color: '#f5f5f5' }]
            }
        ]
    });
    
    // Add service area markers
    const serviceAreas = [
        { name: 'Kampala Central', lat: 0.3476, lng: 32.5825 },
        { name: 'Ntinda', lat: 0.3587, lng: 32.6085 },
        // ... more areas
    ];
    
    serviceAreas.forEach(area => {
        new google.maps.Marker({
            position: { lat: area.lat, lng: area.lng },
            map: map,
            title: area.name
        });
    });
}

// Add to script initialization
document.addEventListener('DOMContentLoaded', initServiceMap);
```

### C. Get API Key

1. Go to Google Cloud Console
2. Create new project
3. Enable Maps JavaScript API
4. Get API key
5. Add to HTML:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
```

---

## 7. ANALYTICS & TRACKING

### A. Google Analytics Setup

```html
<!-- Add to <head> section -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_ID');
</script>
```

### B. Track Key Events

```javascript
// Track booking form submission
document.getElementById('bookingForm').addEventListener('submit', function() {
    gtag('event', 'booking_submitted', {
        'service': document.getElementById('service').value,
        'pickup_date': document.getElementById('pickupDate').value,
    });
});

// Track WhatsApp clicks
document.querySelectorAll('.whatsapp-button').forEach(btn => {
    btn.addEventListener('click', function() {
        gtag('event', 'whatsapp_click', {
            'location': this.closest('section').id
        });
    });
});
```

---

## 8. CUSTOMER DASHBOARD (ADVANCED)

### A. HTML Structure

```html
<section class="customer-dashboard" id="dashboard">
    <div class="container">
        <h2>My Orders</h2>
        <div class="dashboard-content">
            <div class="sidebar">
                <div class="user-profile">
                    <h4 id="userName">Customer Name</h4>
                    <p id="userEmail">customer@email.com</p>
                    <button class="logout-btn">Logout</button>
                </div>
            </div>
            <div class="main-content">
                <div class="orders-list" id="ordersList">
                    <!-- Orders loaded dynamically -->
                </div>
            </div>
        </div>
    </div>
</section>
```

### B. JavaScript Implementation

```javascript
// Load customer orders
async function loadCustomerOrders(customerId) {
    try {
        const response = await fetch(`/api/customers/${customerId}/orders`);
        const orders = await response.json();
        
        const ordersList = document.getElementById('ordersList');
        ordersList.innerHTML = orders.map(order => `
            <div class="order-card">
                <h3>Order #${order.id}</h3>
                <p>Status: ${order.status}</p>
                <p>Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
                <button onclick="trackOrder('${order.id}')">Track</button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading orders:', error);
    }
}
```

---

## 9. LOYALTY REWARDS SYSTEM

### A. Points Structure

```javascript
const loyaltyRules = {
    booking: 10,           // 10 points per booking
    referral: 50,          // 50 points for referral
    review: 25,            // 25 points for review
    milestone: {
        10: 100,           // Bonus at 10 bookings
        25: 250,           // Bonus at 25 bookings
        50: 500,           // Bonus at 50 bookings
    }
};

const redemptionRates = {
    100: 5000,             // 100 points = 5,000 UGX
    200: 10000,            // 200 points = 10,000 UGX
    500: 25000,            // 500 points = 25,000 UGX
};
```

### B. Display Points in Dashboard

```html
<div class="loyalty-section">
    <h3>Your Loyalty Points</h3>
    <div class="points-display">
        <div class="points-value" id="userPoints">0</div>
        <p>points available</p>
    </div>
    <button class="redeem-btn">Redeem Rewards</button>
</div>
```

---

## 10. SEO OPTIMIZATION

### A. Meta Tags

```html
<!-- Update in <head> -->
<meta name="description" content="Professional laundry and dry-cleaning services in Kampala with same-day delivery and eco-friendly products.">
<meta name="keywords" content="laundry service Kampala, dry cleaning, pickup delivery, laundry in Uganda">
<meta property="og:title" content="Clean Slate Laundry - Fresh, Fast & Reliable">
<meta property="og:description" content="Professional laundry services in Kampala with same-day delivery">
<meta property="og:image" content="https://yoursite.com/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
```

### B. Structured Data (Schema.org)

```html
<!-- Add to <body> -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Clean Slate Laundry",
    "description": "Professional laundry and dry-cleaning services",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Your Address",
        "addressLocality": "Kampala",
        "addressCountry": "UG"
    },
    "telephone": "+256700000000",
    "url": "https://cleanslate.ug",
    "priceRange": "$$"
}
</script>
```

---

## 11. PERFORMANCE OPTIMIZATION

### A. Image Optimization

```javascript
// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}
```

### B. Cache Strategy

```javascript
// Service worker for offline support
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(reg => {
        console.log('Service Worker registered');
    });
}
```

---

## 12. SECURITY BEST PRACTICES

### A. Form Validation

```javascript
// Server-side validation (important!)
const validatePhoneNumber = (phone) => {
    const ugPhoneRegex = /^(\+256|0)[0-9]{9}$/;
    return ugPhoneRegex.test(phone);
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
```

### B. CSRF Protection

```javascript
// Include CSRF token in forms
const getCsrfToken = () => {
    return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
};

// Add to form submissions
fetch('/api/bookings', {
    method: 'POST',
    headers: {
        'X-CSRF-Token': getCsrfToken(),
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
});
```

### C. Rate Limiting

```javascript
// Prevent booking spam
const bookingAttempts = new Map();

function checkBookingAttempts(ip) {
    const now = Date.now();
    const attempts = bookingAttempts.get(ip) || [];
    
    const recentAttempts = attempts.filter(time => now - time < 60000);
    
    if (recentAttempts.length > 3) {
        return false; // Too many attempts
    }
    
    recentAttempts.push(now);
    bookingAttempts.set(ip, recentAttempts);
    return true;
}
```

---

## 13. MOBILE APP INTEGRATION

### A. Add to Homescreen Support

```html
<!-- Manifest file: manifest.json -->
{
    "name": "Clean Slate Laundry",
    "short_name": "Clean Slate",
    "description": "Professional laundry services in Kampala",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#0066CC",
    "icons": [
        {
            "src": "/icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/icon-512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ]
}
```

### B. Link Manifest in HTML

```html
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#0066CC">
```

---

## 14. TROUBLESHOOTING GUIDE

### A. Form Not Submitting

**Problem**: Booking form doesn't submit
**Solutions**:
1. Check browser console for errors (F12)
2. Verify all required fields are filled
3. Check JavaScript for console errors
4. Ensure form ID matches in JavaScript

```javascript
// Debug form submission
document.getElementById('bookingForm').addEventListener('submit', (e) => {
    console.log('Form submitted');
    console.log('Form data:', new FormData(e.target));
});
```

### B. WhatsApp Link Not Working

**Problem**: WhatsApp button doesn't open chat
**Solutions**:
1. Verify phone number format (256XXXXXXXXX)
2. Check WhatsApp is installed
3. Verify URL encoding
4. Test on mobile vs desktop

### C. Styling Not Applied

**Problem**: CSS not loading or styles look wrong
**Solutions**:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Verify CSS file path in HTML
3. Check for CSS conflicts
4. Test in different browser

### D. JavaScript Errors

**Problem**: Features not working (tracking, forms, etc.)
**Solutions**:
1. Open Developer Console (F12)
2. Check for JavaScript errors
3. Verify script.js is loaded
4. Check for missing dependencies

---

## 15. DEPLOYMENT CHECKLIST

- [ ] Update all contact information
- [ ] Replace placeholder images
- [ ] Test all forms
- [ ] Verify WhatsApp integration
- [ ] Set up analytics
- [ ] Configure domain
- [ ] Enable HTTPS/SSL
- [ ] Optimize images
- [ ] Test mobile responsiveness
- [ ] Check performance
- [ ] Verify SEO settings
- [ ] Set up backups
- [ ] Create security policy

---

## 📞 Support Resources

- HTML/CSS/JavaScript: MDN Web Docs (developer.mozilla.org)
- APIs: Official documentation
- Hosting: Netlify, Vercel, Firebase
- Email: SendGrid, Mailgun
- SMS: Africastalking, Twilio
- Payments: Stripe, PayPal, Local providers

---

**Version 1.0 | May 2024**
