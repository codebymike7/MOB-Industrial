// 1. Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 800);
});

// 2. EFECTO PARALLAX OPTIMIZADO
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxLayers = document.querySelectorAll('.parallax-bg');
    
    parallaxLayers.forEach(layer => {
        // Calculamos la velocidad (0.5 es un movimiento sutil)
        let speed = 0.4;
        let yPos = -(scrolled * speed);
        layer.style.transform = `translateY(${yPos}px)`;
    });
});

// 3. Scroll Reveal (Aparición suave)
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealOnScroll.observe(el));

// 4. Navbar dinámico
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 100) {
        nav.style.padding = "15px 5%";
        nav.style.background = "rgba(10, 10, 11, 0.98)";
    } else {
        nav.style.padding = "25px 5%";
        nav.style.background = "rgba(10, 10, 11, 0.75)";
    }
});

// 5. Lightbox
function openLightbox(imgSrc) {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    lb.style.display = 'flex';
    lbImg.src = imgSrc;
    document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 6. WhatsApp
function sendToWhatsApp() {
    const type = document.getElementById('item-type').value;
    const w = document.getElementById('width').value;
    const h = document.getElementById('height').value;
    if(!w || !h) { alert("Ingresá las medidas."); return; }
    const msg = `*CONSULTA MOB*%0A*Tipo:* ${type}%0A*Medidas:* ${w}x${h} cm`;
    window.open(`https://wa.me/5491136139401?text=${msg}`, '_blank');
}
