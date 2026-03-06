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

    // Spotlight animation first
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
        .to(".stage-container", { display: "none", duration: 0.1 })
        .from(".hero-img", { scale: 1.2, duration: 2, ease: "power3.out" }, "open+=0.5")
        .to(".hero-subtitle", { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=1.5")
        .to(".hero-title .word", { y: "0%", duration: 1.2, stagger: 0.3, ease: "power4.out" }, "-=1")
        .to(".hero-desc", { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.8")
        .to(".hero-buttons", { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.6")
        .to(".scroll-indicator", { opacity: 1, duration: 1, ease: "power2.out" }, "-=0.4");

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

});
