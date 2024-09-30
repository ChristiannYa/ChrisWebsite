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
                            }, 1000); // Adjust timing 
                        }, 300);
                    });
                }
            } else if (window.innerWidth <= 750) {
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

    const cards = document.querySelectorAll('.card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressElement = entry.target.querySelector('.circular-progress');
                const valueElement = entry.target.querySelector('.progress-value');
                const percentValue = parseInt(valueElement.textContent);

                let progressValue = 0;
                let progressEndValue = percentValue;
                let speed = 20;

                let progress = setInterval(() => {
                    progressValue++;
                    valueElement.textContent = `${progressValue}%`;
                    progressElement.style.setProperty('--progress-angle', `${progressValue * 3.6}deg`);
                    if (progressValue == progressEndValue) {
                        clearInterval(progress);
                    }
                }, speed);

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    cards.forEach(card => {
        observer.observe(card);
    });
});