document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.click').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const linkDuration = parseInt(getComputedStyle(document.documentElement)
                .getPropertyValue('--link-duration'));

            this.classList.add('scale');

            // First wait for the scale down
            setTimeout(() => {
                // Remove scale to trigger grow back
                this.classList.remove('scale');

                // Wait for grow back to complete, then navigate
                setTimeout(() => {
                    window.location.href = href;
                }, linkDuration);

            }, linkDuration);
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

    cards.forEach(card => {
        observer.observe(card);
    });
});