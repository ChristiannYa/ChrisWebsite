document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------- //
    // Cards progress percent animation //
    // -------------------------------- //

    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressElement = entry.target.querySelector('.circular-progress');
                const valueElement = entry.target.querySelector('.progress-value');
                const percentValue = parseInt(valueElement.textContent);
                let progressValue = 0;
                let progressEndValue = percentValue;
                let speed = 25;

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

    cards.forEach(card => observer.observe(card));

    // ------------------------- //
    // Image download protection //
    // ------------------------- //

    document.addEventListener('contextmenu', function (e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });

    // ------------------------------- //
    // Navigation toggle functionality //
    // ------------------------------- //
    const navWrap = document.getElementById('nav-as-wrap');

    document.addEventListener('click', e => {
        if (navWrap.contains(e.target)) {
            navWrap.classList.toggle('active');
            navWrap.parentElement.classList.toggle('active');
            e.stopPropagation();
        } else if (navWrap.classList.contains('active')) {
            navWrap.classList.remove('active');
            navWrap.parentElement.classList.remove('active');
        }
    });
});