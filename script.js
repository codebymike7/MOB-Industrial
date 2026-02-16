// 1. Loader & Reveal
window.addEventListener('load', () => {
    document.getElementById('loader').style.opacity = '0';
    setTimeout(() => document.getElementById('loader').style.display = 'none', 1000);
});

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealOnScroll.observe(el));

// 2. Parallax Engine
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.parallax-bg').forEach(layer => {
        let speed = 0.4;
        let yPos = (scrolled * speed) - (layer.parentElement.offsetTop * speed);
        layer.style.transform = `translateY(${yPos}px)`;
    });
});

// 3. Lightbox Logic
function openLightbox(src) {
    const lb = document.getElementById('lightbox');
    document.getElementById('lightbox-img').src = src;
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 4. Calculador Inteligente WhatsApp
function sendToWhatsApp() {
    const type = document.getElementById('item-type');
    const w = document.getElementById('width').value;
    const h = document.getElementById('height').value;
    
    if(!w || !h) { alert("Ingresá las medidas para cotizar."); return; }
    
    // Lógica de cálculo base (Opcional)
    const priceBase = type.options[type.selectedIndex].dataset.price;
    const totalEst = Math.round((w * h / 10000) * priceBase);

    const message = `*SOLICITUD MOB INDUSTRIAL*%0A%0A*Producto:* ${type.value}%0A*Medidas:* ${w}x${h}cm%0A*Presupuesto Estimado:* $${totalEst.toLocaleString()}%0A%0A_Cotización sujeta a revisión técnica._`;
    window.open(`https://wa.me/5491136139401?text=${message}`, '_blank');
}
