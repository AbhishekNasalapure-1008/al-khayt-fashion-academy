/**
 * AL KHAYT Fashion Academy - GSAP Animations
 * Developed by: 1442abhi
 */

// Wait for GSAP and DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // ========================================
    // PAGE LOAD ANIMATION
    // ========================================
    gsap.from("body", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
    });

    // ========================================
    // NAVBAR ANIMATION
    // ========================================
    gsap.from(".navbar", {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });

    // ========================================
    // HERO SECTION ANIMATIONS
    // ========================================
    const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    heroTimeline
        .from(".hero-content", {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.3
        })
        .from(".hero-title", {
            y: 30,
            opacity: 0,
            duration: 0.8
        }, "-=0.6")
        .from(".hero-tagline", {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, "-=0.5")
        .from(".hero-description", {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, "-=0.5")
        .from(".hero-buttons .btn", {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2
        }, "-=0.4")
        .from(".hero-image", {
            x: 50,
            opacity: 0,
            duration: 1
        }, "-=1");

    // ========================================
    // SECTION HEADERS ANIMATION
    // ========================================
    gsap.utils.toArray(".section-header").forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // ========================================
    // FEATURE CARDS ANIMATION
    // ========================================
    gsap.utils.toArray(".feature-card").forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out"
        });
    });

    // ========================================
    // COURSE PREVIEW CARDS ANIMATION
    // ========================================
    gsap.utils.toArray(".course-preview-card").forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power2.out"
        });
    });

    // ========================================
    // DETAILED COURSE CARDS ANIMATION
    // ========================================
    gsap.utils.toArray(".course-card").forEach((card, index) => {
        const images = card.querySelector(".course-images");
        const content = card.querySelector(".course-content");

        gsap.from(images, {
            scrollTrigger: {
                trigger: card,
                start: "top 75%",
                toggleActions: "play none none none"
            },
            x: card.classList.contains("reverse") ? 50 : -50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });

        gsap.from(content, {
            scrollTrigger: {
                trigger: card,
                start: "top 75%",
                toggleActions: "play none none none"
            },
            x: card.classList.contains("reverse") ? -50 : 50,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: "power2.out"
        });
    });

    // ========================================
    // ABOUT TEXT ANIMATION
    // ========================================
    const aboutText = document.querySelector(".about-text");
    if (aboutText) {
        gsap.from(aboutText.querySelectorAll("p"), {
            scrollTrigger: {
                trigger: aboutText,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        });
    }

    // ========================================
    // CTA SECTION ANIMATION
    // ========================================
    const ctaContent = document.querySelector(".cta-content");
    if (ctaContent) {
        gsap.from(ctaContent, {
            scrollTrigger: {
                trigger: ctaContent,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    }

    // ========================================
    // RULES ITEMS ANIMATION
    // ========================================
    gsap.utils.toArray(".rule-item").forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            x: -50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out"
        });
    });

    // ========================================
    // FORM ANIMATION
    // ========================================
    const formContainer = document.querySelector(".form-container");
    if (formContainer) {
        gsap.from(formContainer, {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: "power2.out"
        });

        gsap.utils.toArray(".form-section").forEach((section, index) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: "power2.out"
            });
        });
    }

    // ========================================
    // FOOTER ANIMATION
    // ========================================
    const footer = document.querySelector(".footer");
    if (footer) {
        gsap.from(".footer-content > div", {
            scrollTrigger: {
                trigger: footer,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        });
    }

    // ========================================
    // PAGE HEADER ANIMATION
    // ========================================
    const pageHeader = document.querySelector(".page-header");
    if (pageHeader) {
        gsap.from(".page-header h1", {
            y: 40,
            opacity: 0,
            duration: 0.8,
            delay: 0.3,
            ease: "power2.out"
        });

        gsap.from(".page-header p", {
            y: 20,
            opacity: 0,
            duration: 0.8,
            delay: 0.5,
            ease: "power2.out"
        });
    }
});
