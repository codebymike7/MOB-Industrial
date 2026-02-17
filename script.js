// 1. Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 1000);
});

// 2. Parallax
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.parallax-bg').forEach(layer => {
        let speed = 0.4;
        let yPos = (scrolled * speed) - (layer.parentElement.offsetTop * speed);
        layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
});

// 3. Reveal Observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

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

// 5. Galería Filtros
function filterGallery(category, event) {
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const items = document.querySelectorAll('.product-card');
    items.forEach(item => {
        if (category === 'todos' || item.classList.contains(category)) {
            item.style.display = 'block';
            setTimeout(() => item.style.opacity = '1', 10);
        } else {
            item.style.opacity = '0';
            setTimeout(() => item.style.display = 'none', 500);
        }
    });
}

// 6. Lightbox
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

// 7. WhatsApp con Ancho, Alto y Largo
function sendToWhatsApp() {
    const typeSelect = document.getElementById('item-type');
    const w = document.getElementById('width').value;
    const h = document.getElementById('height').value;
    const d = document.getElementById('depth').value;
    
    if(!w || !h || !d) { 
        alert("Por favor, ingresá Ancho, Alto y Largo para cotizar."); 
        return; 
    }

    // Lógica de presupuesto: Precio base x m3 (simplificado para ejemplo)
    const priceBase = typeSelect.options[typeSelect.selectedIndex].dataset.price;
    const total = Math.round(((w * h * d) / 100000) * priceBase + 35000);

    const msg = `*CONSULTA TÉCNICA MOB*%0A%0A*Producto:* ${typeSelect.value}%0A*Medidas:* ${w} (Ancho) x ${h} (Alto) x ${d} (Largo) cm%0A*Presupuesto Estimado:* $${total.toLocaleString()}%0A%0A_Solicito revisión de diseño._`;
    
    window.open(`https://wa.me/5491136139401?text=${msg}`, '_blank');
}

function scrollToContact(product) {
    document.getElementById('contacto').scrollIntoView();
    document.getElementById('item-type').value = product;
}
