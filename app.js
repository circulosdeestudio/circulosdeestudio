function initTutorCarousel() {
    const slides = Array.from(document.querySelectorAll('.tutor-slide'));
    if (!slides.length) return;

    let index = 0;
    const indicator = document.getElementById('tutor-indicator');
    const prev = document.querySelector('.tutor-prev');
    const next = document.querySelector('.tutor-next');

    const show = (i) => {
        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle('active', slideIndex === i);
        });

        if (indicator) {
            indicator.textContent = `${i + 1} / ${slides.length}`;
        }
    };

    const go = (delta) => {
        index = (index + delta + slides.length) % slides.length;
        show(index);
    };

    show(index);
    prev?.addEventListener('click', () => go(-1));
    next?.addEventListener('click', () => go(1));
}

function initFloatingCta() {
    const floatingCta = document.querySelector('[data-floating-cta]');
    const heroMedia = document.querySelector('.home-hero-media');
    const finalCta = document.getElementById('cta-final');
    const siteHeader = document.querySelector('[data-site-header]');

    if (!floatingCta || !heroMedia || !finalCta) return;

    let hasPassedHeroMedia = false;
    let finalCtaVisible = false;

    const update = () => {
        const shouldShow = hasPassedHeroMedia && !finalCtaVisible;
        floatingCta.classList.toggle('is-visible', shouldShow);
        floatingCta.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
        siteHeader?.classList.toggle('is-hidden', shouldShow);
    };

    const updateHeroPosition = () => {
        hasPassedHeroMedia = heroMedia.getBoundingClientRect().bottom < 0;
        update();
    };

    const finalObserver = new IntersectionObserver((entries) => {
        finalCtaVisible = entries.some((entry) => entry.isIntersecting);
        update();
    }, {
        threshold: 0.05,
    });

    finalObserver.observe(finalCta);
    updateHeroPosition();
    requestAnimationFrame(updateHeroPosition);
    window.addEventListener('load', updateHeroPosition);
    window.addEventListener('hashchange', updateHeroPosition);
    window.addEventListener('scroll', updateHeroPosition, { passive: true });
    window.addEventListener('resize', updateHeroPosition);
    window.setTimeout(updateHeroPosition, 250);
}

document.addEventListener('DOMContentLoaded', () => {
    initTutorCarousel();
    initFloatingCta();
});
