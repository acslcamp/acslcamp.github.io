document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const finish = (el) => {
        el.classList.remove('reveal', 'active');
        el.classList.add('revealed-done');
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        // Show everything straight away rather than animating it in.
        reveals.forEach(finish);
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                observer.unobserve(el);
                el.classList.add('active');
                setTimeout(() => finish(el), 650);
            });
        }, { rootMargin: '0px 0px -50px 0px' });

        reveals.forEach(reveal => observer.observe(reveal));
    }

    // Mobile Navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        const setNav = (open) => {
            navToggle.setAttribute('aria-expanded', String(open));
            navLinks.classList.toggle('is-open', open);
        };

        navToggle.addEventListener('click', () => {
            setNav(navToggle.getAttribute('aria-expanded') !== 'true');
        });

        // Close on selection, on Escape, and when returning to the desktop layout
        navLinks.addEventListener('click', (e) => {
            if (e.target.closest('a')) setNav(false);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
                setNav(false);
                navToggle.focus();
            }
        });

        window.matchMedia('(min-width: 769px)').addEventListener('change', (e) => {
            if (e.matches) setNav(false);
        });
    }
});
