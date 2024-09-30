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

// Remove card effects
function checkScreenSize() {
    if (window.innerWidth >= 1024) {
        enableHoverEffects();
    } else {
        // Remove event listeners and classes when screen size is less than 1024px
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
            const href = link.getAttribute('href');

            // Check if it's an internal link (starts with '#')
            if (href.startsWith('#') && window.innerWidth <= 750) {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Add animation classes
                    requestAnimationFrame(() => {
                        link.classList.add('scale');

                        setTimeout(() => {
                            link.classList.remove('scale');

                            targetElement.scrollIntoView({
                                behavior: 'smooth'
                            });

                            // Update URL after scrolling
                            setTimeout(() => {
                                history.pushState(null, '', href);
                            }, 1000); // Adjust timing as needed
                        }, 300);
                    });
                }
            } else if (window.innerWidth <= 510) {
                // Add animation for external links
                e.preventDefault();
                requestAnimationFrame(() => {
                    link.classList.add('scale');

                    setTimeout(() => {
                        link.classList.remove('scale');
                        window.location.href = href;
                    }, 300);
                });
            }
        });
    });

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
});