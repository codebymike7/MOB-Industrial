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

// 3. Navbar dinámico (Cambio de estilo al scrollear)
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

// 4. Lógica del Presupuestador de WhatsApp
function sendToWhatsApp() {
    // Obtenemos los valores del formulario
    const type = document.getElementById('item-type').value;
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;
    
    // Validamos que se hayan ingresado datos
    if(!width || !height) {
        alert("Por favor, ingresá las medidas para una cotización precisa.");
        return;
    }

    // Construimos el mensaje con formato profesional
    const message = `Hola MOB Industrial! 👋%0AQuisiera cotizar un proyecto personalizado:%0A%0A- *Tipo:* ${type}%0A- *Medidas:* ${width} x ${height} cm%0A%0AVengo desde la sección de presupuestos de la web oficial.`;
    
    // Abrimos WhatsApp con el mensaje pre-cargado
    window.open(`https://wa.me/5491136139401?text=${message}`, '_blank');
}
