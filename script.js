document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 50;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                if (!reveal.classList.contains('active') && !reveal.classList.contains('revealed-done')) {
                    reveal.classList.add('active');
                    setTimeout(() => {
                        reveal.classList.remove('reveal', 'active');
                        reveal.classList.add('revealed-done');
                    }, 650);
                }
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load
});
