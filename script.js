window.addEventListener('load', () => {
    document.getElementById('loader').style.opacity = '0';
    setTimeout(() => document.getElementById('loader').style.display = 'none', 1000);
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Herramienta de Madera
function changeWood(name, imgSrc) {
    document.getElementById('main-preview-img').src = imgSrc;
    document.getElementById('wood-name').innerText = "Madera: " + name;
}

// WhatsApp
function sendToWhatsApp() {
    const type = document.getElementById('item-type');
    const w = document.getElementById('width').value;
    const h = document.getElementById('height').value;
    const d = document.getElementById('depth').value;
    
    if(!w || !h || !d) { alert("Completá Ancho, Alto y Largo."); return; }

    const priceBase = type.options[type.selectedIndex].dataset.price;
    const total = Math.round(((w * h * d) / 100000) * priceBase + 35000);

    const msg = `*CONSULTA MOB*%0A*Producto:* ${type.value}%0A*Medidas:* ${w}x${h}x${d}cm%0A*Presupuesto:* $${total.toLocaleString()}`;
    window.open(`https://wa.me/5491136139401?text=${msg}`, '_blank');
}

function scrollToContact(product) {
    document.getElementById('contacto').scrollIntoView();
    document.getElementById('item-type').value = product;
}
