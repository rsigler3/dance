// Prevent browser's default scroll restoration behavior
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

document.addEventListener("DOMContentLoaded", () => {
    // Lock scrolling while loading animation happens
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    // Force scroll top instantly
    setTimeout(() => window.scrollTo(0, 0), 10);

    // Current Year Update
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // Navbar Scrolled State
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- GSAP Animations ---
    gsap.registerPlugin(ScrollTrigger);

    // Initial Loading Sequence
    const tl = gsap.timeline();
    const isNavigating = sessionStorage.getItem('pageTransition');
    sessionStorage.removeItem('pageTransition');

    if (isNavigating) {
        // Fast transition between pages without logo
        gsap.set(".spotlight, .loading-logo", { display: "none" });
        tl.to(".curtain-left", { scaleX: 0, duration: 0.8, ease: "power3.inOut" }, "open")
            .to(".curtain-right", {
                scaleX: 0, duration: 0.8, ease: "power3.inOut", onComplete: () => {
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                }
            }, "open")
            .to(".stage-container", { display: "none", duration: 0.1 });

        // Hero animation early if on homepage
        if (document.querySelector('.hero-img')) {
            tl.from(".hero-img", { scale: 1.1, duration: 1.5, ease: "power3.out" }, "open+=0.2")
                .to(".hero-subtitle", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "open+=0.4")
                .to(".hero-title .word", { y: "0%", duration: 1, stagger: 0.2, ease: "power4.out" }, "open+=0.5")
                .to(".hero-desc", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "open+=0.6")
                .to(".hero-buttons", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "open+=0.7")
                .to(".scroll-indicator", { opacity: 1, duration: 0.8, ease: "power2.out" }, "open+=0.8");
        }
    } else {
        // Full Intro with Spotlight animation first
        tl.to(".spotlight", { opacity: 1, duration: 0.5 })
            .fromTo(".spot-1", { x: "-20vw", y: "120vh" }, { x: "40vw", y: "30vh", duration: 1.5, ease: "power1.inOut" }, "spots")
            .fromTo(".spot-2", { x: "120vw", y: "120vh" }, { x: "60vw", y: "70vh", duration: 1.5, ease: "power1.inOut" }, "spots")
            .to(".spot-1", { x: "20vw", y: "60vh", duration: 1.5, ease: "power1.inOut" }, "spots2")
            .to(".spot-2", { x: "80vw", y: "40vh", duration: 1.5, ease: "power1.inOut" }, "spots2")
            .to(".spot-1", { x: "50vw", y: "50vh", duration: 1.5, ease: "power2.inOut" }, "spots3")
            .to(".spot-2", { x: "50vw", y: "50vh", duration: 1.5, ease: "power2.inOut" }, "spots3")
            // Fade in logo slowly and increase its size as spotlights center
            .fromTo(".loading-logo", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1.15, duration: 2.5, ease: "power2.out" }, "spots3")
            // Fade out spotlights and logo
            .to(".spotlight", { opacity: 0, duration: 0.8, delay: 0.8 }, "fade")
            .to(".loading-logo", { opacity: 0, scale: 1.2, duration: 0.8, ease: "power2.in", delay: 0.8 }, "fade")
            // Open curtains
            .to(".curtain-left", { scaleX: 0, duration: 1.5, ease: "power3.inOut" }, "open")
            .to(".curtain-right", {
                scaleX: 0, duration: 1.5, ease: "power3.inOut", onComplete: () => {
                    // Restore scrolling after curtains are out of the way
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                }
            }, "open")
            .to(".stage-container", { display: "none", duration: 0.1 });

        // Hero animation full phase
        if (document.querySelector('.hero-img')) {
            tl.from(".hero-img", { scale: 1.2, duration: 2, ease: "power3.out" }, "open+=0.5")
                .to(".hero-subtitle", { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=1.5")
                .to(".hero-title .word", { y: "0%", duration: 1.2, stagger: 0.3, ease: "power4.out" }, "-=1")
                .to(".hero-desc", { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.8")
                .to(".hero-buttons", { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.6")
                .to(".scroll-indicator", { opacity: 1, duration: 1, ease: "power2.out" }, "-=0.4");
        }
    }

    // Scroll Animations

    // About Section
    gsap.from(".about-text > *", {
        scrollTrigger: {
            trigger: ".about-text",
            start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    gsap.from(".image-reveal img", {
        scrollTrigger: {
            trigger: ".image-reveal",
            start: "top 80%",
        },
        scale: 1.5,
        duration: 1.5,
        ease: "power3.out"
    });

    // School Section Header
    gsap.from(".school .section-header > *", {
        scrollTrigger: {
            trigger: ".school",
            start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
    });

    // Program Cards Stagger
    gsap.from(".program-card", {
        scrollTrigger: {
            trigger: ".programs-grid",
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Quote Section
    gsap.from(".large-quote", {
        scrollTrigger: {
            trigger: ".quote-section",
            start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // Page Transition Interceptor
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href && link.host === window.location.host) {
            // Check if changing page completely (not just an anchor hash)
            if (link.pathname !== window.location.pathname) {
                e.preventDefault();
                sessionStorage.setItem('pageTransition', 'true');

                // Freeze scroll instantly
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';

                // Bring stage container back and prepare for closing
                gsap.set(".stage-container", { display: "flex" });
                gsap.set(".spotlight, .loading-logo", { display: "none" });

                // Close curtains, then redirect
                const closeTl = gsap.timeline({
                    onComplete: () => {
                        window.location.href = link.href;
                    }
                });
                closeTl.to(".curtain-left, .curtain-right", { scaleX: 1, duration: 0.8, ease: "power3.inOut" });
            }
        }
    });
    // Lightbox Logic
    const galleryImages = Array.from(document.querySelectorAll('.photo-grid img'));
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    let currentImageIndex = 0;

    if (lightbox && lightboxImg) {
        galleryImages.forEach((img, index) => {
            img.addEventListener('click', () => {
                currentImageIndex = index;
                lightbox.style.display = 'flex';
                // Small timeout to allow display:flex to apply before transition kicks in
                setTimeout(() => lightbox.classList.add('active'), 10);
                lightboxImg.src = img.src;
            });
        });

        const updateLightboxImage = () => {
            lightboxImg.src = galleryImages[currentImageIndex].src;
        };

        const nextImage = () => {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            updateLightboxImage();
        };

        const prevImage = () => {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            updateLightboxImage();
        };

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            setTimeout(() => lightbox.style.display = 'none', 300);
        };

        lightboxClose.addEventListener('click', closeLightbox);

        if (lightboxPrev && lightboxNext) {
            lightboxPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                prevImage();
            });

            lightboxNext.addEventListener('click', (e) => {
                e.stopPropagation();
                nextImage();
            });
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg && e.target !== lightboxPrev && e.target !== lightboxNext) {
                closeLightbox();
            }
        });
    }
});
