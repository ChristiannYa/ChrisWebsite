document.addEventListener('DOMContentLoaded', () => {
    const skillsPage = document.querySelector('.skills-page');
    const cards = document.querySelectorAll('.card');

    // Overall effect
    skillsPage.addEventListener('mouseenter', () => {
        cards.forEach(card => {
            card.classList.add('active');
        });
    });

    skillsPage.addEventListener('mouseleave', () => {
        cards.forEach(card => {
            card.classList.remove('active');
        });
    });

    // Individual card effects
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('extra-active');
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('extra-active');
        });
    });
});

