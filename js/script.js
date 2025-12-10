/**
 * AL KHAYT Fashion Academy - Main JavaScript
 * Handles navigation, mobile menu, and general interactions
 * Developed by: 1442abhi
 */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // MOBILE NAVIGATION TOGGLE
    // ========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);

            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ========================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Only prevent default for actual anchor links (not just "#")
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ========================================
    // ACTIVE NAVIGATION LINK HIGHLIGHTING
    // ========================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // ========================================
    // PAGE LOAD ANIMATION
    // ========================================
    document.body.classList.add('loaded');

    // ========================================
    // SCROLL TO TOP BUTTON (Optional Enhancement)
    // ========================================
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 3rem;
        right: 3rem;
        background-color: #DCD0FF;
        color: #45260a;
        border: none;
        border-radius: 50%;
        width: 5rem;
        height: 5rem;
        font-size: 2.4rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 999;
        box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollToTopBtn.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px)';
        this.style.backgroundColor = '#c6bbe6';
    });

    scrollToTopBtn.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
        this.style.backgroundColor = '#DCD0FF';
    });
});
