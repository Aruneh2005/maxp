// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('nav');

if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        nav.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
        }
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Hero slider functionality
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
let currentSlide = 0;
const totalSlides = 3;

function updateIndicators(index) {
    indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === index);
    });
}

function goToSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    updateIndicators(currentSlide);
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });
}

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        goToSlide(index);
    });
});

// Auto-advance slider
setInterval(() => {
    goToSlide(currentSlide + 1);
}, 5000);

// Contact form handling (WhatsApp)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const name = document.getElementById('waName').value;
        const email = document.getElementById('waEmail').value;
        const message = document.getElementById('waMessage').value;

        // Build WhatsApp message
        const waNumber = '916305836395'; // without the '+'
        const waText = `*New Website Inquiry*\n\n*Name:* ${name}\n*Email:* ${email}\n\n*Message:*\n${message}`;
        const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;

        // Open WhatsApp in a new tab
        window.open(waUrl, '_blank');

        // Show success visual feedback on button
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Redirecting to WhatsApp...';
        submitBtn.style.background = '#25D366'; // WhatsApp green

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            contactForm.reset();
        }, 3000);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Service cards animation on scroll
const serviceCards = document.querySelectorAll('.service-card');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    cardObserver.observe(card);
});

// Stats counter animation
const stats = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };

    updateCounter();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => {
    statsObserver.observe(stat);
});

// Gallery Slider Functionality
const galleryTrack = document.getElementById('galleryTrack');
const galleryPrev = document.getElementById('galleryPrev');
const galleryNext = document.getElementById('galleryNext');
const galleryDotsContainer = document.getElementById('galleryDots');

if (galleryTrack && galleryPrev && galleryNext) {
    const galleryItems = galleryTrack.querySelectorAll('.gallery-item');
    let currentGalleryIndex = 0;
    let itemsPerView = 3;

    // Calculate items per view based on screen size
    function getItemsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    // Create dots
    function createDots() {
        if (!galleryDotsContainer) return;
        galleryDotsContainer.innerHTML = '';
        itemsPerView = getItemsPerView();
        const totalDots = Math.ceil(galleryItems.length / itemsPerView);

        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('span');
            dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToGallerySlide(i));
            galleryDotsContainer.appendChild(dot);
        }
    }

    // Update dots
    function updateGalleryDots() {
        if (!galleryDotsContainer) return;
        const dots = galleryDotsContainer.querySelectorAll('.gallery-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentGalleryIndex);
        });
    }

    // Calculate slide position
    function getSlidePosition() {
        itemsPerView = getItemsPerView();
        const itemWidth = galleryItems[0].offsetWidth + 24; // 24 is the gap
        return -(currentGalleryIndex * itemsPerView * itemWidth);
    }

    // Go to specific slide
    function goToGallerySlide(index) {
        itemsPerView = getItemsPerView();
        const maxIndex = Math.ceil(galleryItems.length / itemsPerView) - 1;
        currentGalleryIndex = Math.max(0, Math.min(index, maxIndex));
        galleryTrack.style.transform = `translateX(${getSlidePosition()}px)`;
        updateGalleryDots();
    }

    // Previous slide
    galleryPrev.addEventListener('click', () => {
        goToGallerySlide(currentGalleryIndex - 1);
    });

    // Next slide
    galleryNext.addEventListener('click', () => {
        goToGallerySlide(currentGalleryIndex + 1);
    });

    // Initialize
    createDots();

    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            createDots();
            goToGallerySlide(0);
        }, 250);
    });

    // Auto-advance gallery
    setInterval(() => {
        itemsPerView = getItemsPerView();
        const maxIndex = Math.ceil(galleryItems.length / itemsPerView) - 1;
        if (currentGalleryIndex >= maxIndex) {
            goToGallerySlide(0);
        } else {
            goToGallerySlide(currentGalleryIndex + 1);
        }
    }, 3000);
}
