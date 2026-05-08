# Clean Slate Laundry - Quick Start & Customization Checklist

## ✨ 5-MINUTE QUICK START

### 1. Open the Website
```
Double-click → index.html → Opens in browser
```

### 2. Customize Your Info (3 files to edit)

#### File 1: `index.html` - Update Business Details

Find and replace these 5 items:

**1.1 - Phone Number** (appears ~10 times)
```
FIND:     256700000000
REPLACE:  YOUR_PHONE_NUMBER
```

**1.2 - Email Address**
```
FIND:     info@cleanslate.ug
REPLACE:  your@email.com
```

**1.3 - Business Name** (optional)
```
FIND:     Clean Slate
REPLACE:  Your Business Name
```

**1.4 - Opening Hours**
```
FIND:     Monday - Friday: 7:00 AM - 7:00 PM
REPLACE:  Your Hours
```

**1.5 - Service Areas** (8 locations)
```
FIND:     <div class="area-item served">
REPLACE:  Your service areas
```

#### File 2: `styles.css` - Change Colors

Find and modify color variables:
```css
:root {
    --primary-color: #0066CC;      /* Main blue - change this */
    --secondary-color: #00A3E0;    /* Cyan accent - change this */
}
```

#### File 3: `script.js` - Update Phone Number
```javascript
const whatsappNumber = '256700000000'; // Change this
```

---

## 🎯 MOST COMMON EDITS

### Add Your Images

**Replace SVG Laundry Machine** (line ~190 in index.html)
```html
<!-- FIND: -->
<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <!-- ... SVG code ... -->
</svg>

<!-- REPLACE WITH: -->
<img src="path/to/your/laundry-machine.jpg" alt="Laundry Machine" style="width:100%; border-radius: 16px;">
```

**Replace Team Photo** (line ~1100 in index.html - About section)
```html
<img src="path/to/your/team-photo.jpg" alt="Our Team" style="width:100%; border-radius: 16px;">
```

### Update Pricing

**Per Item Prices** (lines ~750 in index.html)
```html
<span class="price-value">2,500</span>   <!-- Change shirt price -->
<span class="price-value">3,000</span>   <!-- Change trousers price -->
```

**Package Prices** (lines ~800 in index.html)
```html
<span class="price-amount">75,000</span>   <!-- Weekly Plan -->
<span class="price-amount">180,000</span>  <!-- Family Plan -->
```

### Update Testimonials

**Customer Reviews** (lines ~1150 in index.html)
```html
<p class="testimonial-text">"Add your customer review here..."</p>
<h4>Customer Name</h4>
<p>Job/Title</p>
```

### Change Service List

**Service Cards** (lines ~400 in index.html)
```html
<div class="service-card">
    <div class="service-icon">👔</div>
    <h3>Your Service Name</h3>
    <p>Your service description</p>
</div>
```

---

## 📱 MOBILE PREVIEW

Test on different devices:
```
Desktop:  1920x1080 (full screen)
Tablet:   768x1024  (iPad size)
Mobile:   375x667   (iPhone size)
```

Press `F12` in browser → Click device toggle → Select device

---

## 🚀 DEPLOY IN 3 MINUTES

### Option A: **Netlify (Recommended - Free)**
1. Go to **netlify.com**
2. Click "Drop files here to deploy"
3. Drag all 3 files (HTML, CSS, JS)
4. Done! ✓ You have a live website

### Option B: **Vercel (Free)**
1. Go to **vercel.com**
2. Import GitHub repo or upload files
3. Click Deploy
4. Done! ✓ Automatic updates

### Option C: **Your Own Host**
1. FTP/Upload files to server
2. Visit your domain
3. Done! ✓ Website is live

---

## ✅ LAUNCH CHECKLIST

- [ ] Phone number updated
- [ ] Email updated
- [ ] Business hours correct
- [ ] Pricing verified
- [ ] Images added
- [ ] Testimonials updated
- [ ] WhatsApp number correct
- [ ] Colors customized (optional)
- [ ] Mobile tested
- [ ] Deployed online

---

## 🔥 QUICK CUSTOMIZATION GUIDE

### Change Main Color (Blue to Red)

**In `styles.css`:**
```css
:root {
    --primary-color: #FF0000;      /* Change from #0066CC to #FF0000 */
    --primary-dark: #CC0000;       /* Darker red */
    --primary-light: #FFE0E0;      /* Light red background */
}
```

### Add More Testimonials

**In `index.html`, duplicate this:**
```html
<div class="testimonial-card">
    <div class="stars">★★★★★</div>
    <p class="testimonial-text">"Amazing service! Highly recommended."</p>
    <div class="testimonial-author">
        <div class="author-avatar">JD</div>
        <div class="author-info">
            <h4>John Doe</h4>
            <p>Customer</p>
        </div>
    </div>
</div>
```

### Add New Service

**In `index.html` services section, duplicate:**
```html
<div class="service-card">
    <div class="service-icon">🔧</div>
    <h3>Your Service</h3>
    <p>Your service description</p>
    <a href="#booking" class="learn-more">Learn More →</a>
</div>
```

### Change Hero Text

**In `index.html`, find and change:**
```html
<h1 class="hero-title">Your Headline Here</h1>
<p class="hero-subtitle">Your subheadline here</p>
```

---

## 📋 FILE REFERENCE

### What Each File Does

| File | Purpose | Edit For |
|------|---------|----------|
| `index.html` | Website content | Text, images, links |
| `styles.css` | Styling & layout | Colors, fonts, animations |
| `script.js` | Interactivity | Forms, tracking, features |
| `README.md` | Documentation | Understanding the code |

---

## 🐛 TROUBLESHOOTING QUICK FIX

| Problem | Solution |
|---------|----------|
| Website looks broken | Clear browser cache: Ctrl+Shift+Delete |
| Form doesn't work | Check phone input has + symbol |
| WhatsApp won't open | Verify phone format: 256XXXXXXXXX |
| Styling looks wrong | Refresh page: Ctrl+Shift+R |
| Images not showing | Check image file path exists |
| Mobile looks cut off | Test in device view (F12) |

---

## 🎨 COLOR CODES

Common colors to use (change in `styles.css`):

```css
Blue:     #0066CC
Green:    #4CAF50
Orange:   #FF9800
Red:      #F44336
Purple:   #9C27B0
Gray:     #757575
White:    #FFFFFF
Black:    #333333
```

---

## 📱 RESPONSIVE BREAKPOINTS

Test your changes at these widths:

```
Mobile:     360px - 480px
Tablet:     768px - 1024px
Desktop:    1200px+
```

---

## 🎯 BOOKING FORM FIELDS

Current form has:
- Full Name ✓
- Phone Number ✓
- Email ✓
- Pickup Address ✓
- Service Selection ✓
- Pickup Date ✓
- Pickup Time ✓
- Special Instructions ✓

To add more fields: Edit HTML form, add validation in JavaScript

---

## 🌐 DOMAIN SETUP

After deploying:

1. **Buy Domain** from:
   - GoDaddy
   - Namecheap
   - Local providers (Uganda)

2. **Point Domain to Website**:
   - Get nameserver from host
   - Update domain settings
   - Wait 24-48 hours

3. **Enable HTTPS** (SSL):
   - Most hosts provide free SSL
   - Enable in host settings
   - Automatic on Netlify/Vercel

---

## 📊 ANALYTICS QUICK ADD

Add Google Analytics in 2 minutes:

1. Go to **analytics.google.com**
2. Create new property
3. Get Measurement ID
4. Add to `index.html` `<head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 💬 WHATSAPP BUSINESS SETUP

1. **Download** WhatsApp Business app
2. **Verify** phone number
3. **Set up** business profile
4. **Update** number in code (mentioned above)
5. **Share** link with customers

---

## 📧 EMAIL NEWSLETTER

Enable newsletter in 2 steps:

1. Add this to footer section:
```html
<input type="email" placeholder="Your email" class="newsletter-input">
<button class="btn btn-primary btn-sm">Subscribe</button>
```

2. Use service like:
   - Mailchimp (free)
   - Brevo (free)
   - ConvertKit

---

## 🏪 PAYMENT INTEGRATION

To add payments:

1. **MTN Mobile Money**
   - Register at MTN API portal
   - Get credentials
   - Add to backend

2. **Bank Transfer**
   - Add account details
   - Display in booking form

3. **Stripe/PayPal**
   - Create account
   - Get API keys
   - Add payment form

---

## 📞 SUPPORT CONTACTS

**For Web Hosting Issues:**
- Netlify Support: support@netlify.com
- Vercel Support: support@vercel.com

**For Domain Issues:**
- GoDaddy Support
- Namecheap Support

**For Email/SMS:**
- SendGrid
- Africastalking
- Twilio

---

## 🎓 LEARNING RESOURCES

Get better at customizing:

- **HTML**: w3schools.com/html
- **CSS**: w3schools.com/css
- **JavaScript**: w3schools.com/js
- **Dev Tools**: developer.mozilla.org

---

## 💡 QUICK TIPS

✓ **Always backup** before major changes  
✓ **Test on mobile** before launch  
✓ **Update regularly** with new content  
✓ **Monitor analytics** to see what works  
✓ **Respond quickly** to WhatsApp messages  
✓ **Keep testimonials fresh** for trust  
✓ **Update prices** when they change  
✓ **Test forms** after any changes  

---

## 🚀 NEXT STEPS

1. **Immediately**: Update contact info (5 min)
2. **Today**: Add images (15 min)
3. **This week**: Deploy online (5 min)
4. **Next week**: Set up WhatsApp Business
5. **Later**: Add backend/payments

---

## ❓ FREQUENTLY ASKED

**Q: Can I change the design?**
A: Yes! Edit `styles.css` for colors, fonts, etc.

**Q: How do I add more testimonials?**
A: Copy-paste a testimonial card and edit the content.

**Q: Can I add a custom domain?**
A: Yes! Register domain, point it to your host.

**Q: Is this mobile-friendly?**
A: Yes! Automatically responsive on all devices.

**Q: Can I integrate with my business system?**
A: Yes! See IMPLEMENTATION_GUIDE.md for backend integration.

**Q: How do I get bookings from the website?**
A: Customers book through the form or WhatsApp button.

---

## 🎉 YOU'RE READY!

Your professional Clean Slate Laundry website is ready to go live.

**Quick checklist:**
1. ✓ Update phone & email
2. ✓ Add images
3. ✓ Deploy to Netlify
4. ✓ Share link with customers
5. ✓ Start getting bookings!

---

**Need detailed help?**  
See `README.md` for full documentation  
See `IMPLEMENTATION_GUIDE.md` for advanced setup  

**Version 1.0 | May 2024**
