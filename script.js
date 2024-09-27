function enableHoverEffects() {
    const skillsPage = document.querySelector('.skills-page');
    const cards = document.querySelectorAll('.card');

    // Overall hover effect
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
}

function checkScreenSize() {
    if (window.innerWidth >= 1024) {
        enableHoverEffects();
    } else {
        // Remove event listeners and classes when screen size is less than 426px
        const skillsPage = document.querySelector('.skills-page');
        const cards = document.querySelectorAll('.card');

        skillsPage.removeEventListener('mouseenter', () => { });
        skillsPage.removeEventListener('mouseleave', () => { });

        cards.forEach(card => {
            card.removeEventListener('mouseenter', () => { });
            card.removeEventListener('mouseleave', () => { });
            card.classList.remove('active', 'extra-active');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.click');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 710) {
                e.preventDefault(); // Prevent default link behavior

                requestAnimationFrame(() => {
                    link.classList.add('grow', 'underline');

                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            link.classList.remove('grow', 'underline');
                        }, 300);
                    });
                });
            }
        });
    });

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
});