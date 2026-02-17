// 1. Loader Inteligente
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 1000);
});

// 2. Motor de Parallax (GPU Optimized)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxLayers = document.querySelectorAll('.parallax-bg');
    
    parallaxLayers.forEach(layer => {
        let speed = 0.4;
        // Calculamos la posición relativa a la sección
        let yPos = (scrolled * speed) - (layer.parentElement.offsetTop * speed);
        layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
});

// 3. Reveal al hacer Scroll
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// 4. Navbar Dinámica
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 80) {
        nav.style.padding = "15px 5%";
        nav.style.background = "rgba(10, 10, 11, 0.98)";
    } else {
        nav.style.padding = "25px 5%";
        nav.style.background = "rgba(10, 10, 11, 0.75)";
    }
});

// 5. Lightbox para fotos de Juli
function openLightbox(src) {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    lb.style.display = 'flex';
    lbImg.src = src;
    document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 6. Calculador y Envío a WhatsApp
function sendToWhatsApp() {
    const typeSelect = document.getElementById('item-type');
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;
    
    if(!width || !height) {
        alert("Por favor, ingresá las medidas aproximadas.");
        return;
    }

    // Lógica de presupuesto estimado base
    const priceBase = typeSelect.options[typeSelect.selectedIndex].dataset.price;
    const metrosCuadrados = (width * height) / 10000;
    const totalEstimado = Math.round(metrosCuadrados * priceBase);

    const message = `*CONSULTA MOB INDUSTRIAL*%0A%0A*Producto:* ${typeSelect.value}%0A*Medidas:* ${width}x${height} cm%0A*Estimado Base:* $${totalEstimado.toLocaleString()}%0A%0A_Quisiera recibir una cotización formal._`;
    
    window.open(`https://wa.me/5491136139401?text=${message}`, '_blank');
}

function scrollToContact(product) {
    document.getElementById('contacto').scrollIntoView();
    document.getElementById('item-type').value = product;
}
