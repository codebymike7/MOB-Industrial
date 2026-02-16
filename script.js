// 1. Loader de alta performance
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 800);
});

// 2. Intersection Observer para animaciones suaves
const revealElements = document.querySelectorAll('.reveal');
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    });
}, revealOptions);

revealElements.forEach(el => revealOnScroll.observe(el));

// 3. Navbar dinámico con efecto de scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.style.padding = "15px 5%";
        nav.style.background = "rgba(10, 10, 11, 0.98)";
        nav.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
    } else {
        nav.style.padding = "25px 5%";
        nav.style.background = "rgba(10, 10, 11, 0.75)";
        nav.style.boxShadow = "none";
    }
    lastScroll = currentScroll;
});

// 4. Lógica de Envío de WhatsApp
function sendToWhatsApp() {
    const type = document.getElementById('item-type').value;
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;
    
    if(!width || !height) {
        // Feedback háptico visual
        document.querySelectorAll('input').forEach(i => i.style.borderColor = "red");
        setTimeout(() => document.querySelectorAll('input').forEach(i => i.style.borderColor = "#333"), 2000);
        return;
    }

    const message = `*SOLICITUD DE COTIZACIÓN - MOB INDUSTRIAL*%0A%0A*Producto:* ${type}%0A*Dimensiones:* ${width}x${height} cm%0A%0A_Enviado desde el portal oficial._`;
    
    window.open(`https://wa.me/5491136139401?text=${message}`, '_blank');
}
