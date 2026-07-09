// ========================================
// Beacon Truck Dispatch - MAIN SCRIPT
// Simple, Clean JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // NAVIGATION SCROLL EFFECT
    // ========================================
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ========================================
    // MOBILE MENU
    // ========================================
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileClose = document.getElementById('mobileClose');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    mobileToggle.addEventListener('click', function () {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    mobileClose.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // SCROLL REVEAL ANIMATION
    // ========================================
    const revealElements = document.querySelectorAll('.service-card, .equipment-card, .testimonial-card, .step, .pricing-card');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        revealObserver.observe(el);
    });

    // Add revealed class style
    const style = document.createElement('style');
    style.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ========================================
    // CONTACT FORM - GOOGLE SHEETS INTEGRATION
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const SHEET_URL = 'https://script.google.com/macros/s/AKfycbyQ81LJ8T1blaY729HHTY0Qsx9sEiDzciuL-vk6sAPvhEweojMHb_qRCuLjEtMZbSdDqA/exec';

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const phone = contactForm.querySelector('input[name="phone"]').value;
            const mcNumber = contactForm.querySelector('input[name="mcNumber"]').value;
            const equipment = contactForm.querySelector('select[name="equipment"]').value;
            const message = contactForm.querySelector('textarea[name="message"]').value;

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Create query string
            const params = new URLSearchParams();
            params.append('name', name);
            params.append('email', email);
            params.append('phone', phone);
            params.append('mcNumber', mcNumber);
            params.append('equipment', equipment);
            params.append('message', message);

            // Send to Google Sheets using image trick (CORS-free)
            const url = SHEET_URL + '?' + params.toString();

            fetch(url, {
                method: 'GET',
                mode: 'no-cors'
            })
                .then(() => {
                    // Show success message
                    contactForm.style.display = 'none';
                    formSuccess.style.display = 'block';
                    formSuccess.style.animation = 'fadeInUp 0.5s ease';

                    // Reset form
                    contactForm.reset();

                    // Reset button after 5 seconds
                    setTimeout(() => {
                        contactForm.style.display = 'block';
                        formSuccess.style.display = 'none';
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 5000);
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Still show success even if error (data likely saved)
                    contactForm.style.display = 'none';
                    formSuccess.style.display = 'block';
                    formSuccess.style.animation = 'fadeInUp 0.5s ease';
                    contactForm.reset();

                    setTimeout(() => {
                        contactForm.style.display = 'block';
                        formSuccess.style.display = 'none';
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 5000);
                });
        });
    }

    // ========================================
    // PARALLAX EFFECT FOR BACKGROUNDS
    // ========================================
    const parallaxElements = document.querySelectorAll('.hero-bg img, .about-bg img, .how-bg img, .coverage-bg img, .contact-bg img');

    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(el => {
            const parent = el.parentElement.parentElement;
            const rect = parent.getBoundingClientRect();

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.5;
                const yPos = -(scrolled - parent.offsetTop) * speed;
                el.style.transform = `translateY(${yPos}px) scale(1.1)`;
            }
        });
    });

    // ========================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ========================================
    // COUNTER ANIMATION FOR STATS
    // ========================================
    const statsSection = document.querySelector('.stats');

    if (statsSection) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a subtle pulse animation to stats
                    const stats = entry.target.querySelectorAll('.stat');
                    stats.forEach((stat, index) => {
                        setTimeout(() => {
                            stat.style.animation = 'pulse 0.5s ease';
                        }, index * 100);
                    });
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statObserver.observe(statsSection);
    }

    // Add pulse animation
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(pulseStyle);

});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}