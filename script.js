// 1. Quitar Loader al cargar
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 800);
});

// 2. Animación de Scroll (Reveal)
const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 3. Navbar dinámico
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 100) {
        nav.style.padding = "15px 5%";
        nav.style.background = "rgba(10, 10, 11, 0.95)";
    } else {
        nav.style.padding = "25px 5%";
        nav.style.background = "rgba(10, 10, 11, 0.7)";
    }
});
