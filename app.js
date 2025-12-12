// Logica de modales para las tarjetas de roles
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    const body = document.body;

    if (!modal) return;

    if (modal.classList.contains('active')) {
        modal.classList.remove('active');
        body.style.overflow = 'auto';
    } else {
        document.querySelectorAll('.modal').forEach((m) => m.classList.remove('active'));
        modal.classList.add('active');
        body.style.overflow = 'hidden';
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.querySelectorAll('.modal').forEach((m) => m.classList.remove('active'));
        document.body.style.overflow = 'auto';
    }
});

// Carrusel infinito de testimonios (tutores)
function initTutorCarousel() {
    const slides = Array.from(document.querySelectorAll('.tutor-slide'));
    if (!slides.length) return;

    let index = 0;
    const indicator = document.getElementById('tutor-indicator');
    const prev = document.querySelector('.tutor-prev');
    const next = document.querySelector('.tutor-next');

    const show = (i) => {
        slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
        if (indicator) indicator.textContent = `${i + 1} / ${slides.length}`;
    };

    const go = (delta) => {
        index = (index + delta + slides.length) % slides.length;
        show(index);
    };

    show(index);
    prev?.addEventListener('click', () => go(-1));
    next?.addEventListener('click', () => go(1));
}

document.addEventListener('DOMContentLoaded', initTutorCarousel);
