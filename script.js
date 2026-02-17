// Loader
window.addEventListener('load', () => {
    document.getElementById('loader').style.opacity = '0';
    setTimeout(() => document.getElementById('loader').style.display = 'none', 1000);
});

// Animaciones de Scroll
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Selector de Madera
function changeWood(name, imgSrc) {
    document.getElementById('main-preview-img').src = imgSrc;
    document.getElementById('wood-name').innerText = "Madera: " + name;
}

// Cálculo y WhatsApp
function sendToWhatsApp() {
    const type = document.getElementById('item-type');
    const w = document.getElementById('width').value;
    const h = document.getElementById('height').value;
    const d = document.getElementById('depth').value;
    
    if(!w || !h || !d) { alert("Ingresá Ancho, Alto y Largo."); return; }

    const priceBase = type.options[type.selectedIndex].dataset.price;
    const total = Math.round(((w * h * d) / 100000) * priceBase + 35000);

    const msg = `*CONSULTA MOB*%0A*Mueble:* ${type.value}%0A*Medidas:* ${w}x${h}x${d}cm%0A*Estimado:* $${total.toLocaleString()}`;
    window.open(`https://wa.me/5491136139401?text=${msg}`, '_blank');
}

// Generador de PDF
function generatePDF() {
    const w = document.getElementById('width').value;
    const h = document.getElementById('height').value;
    const d = document.getElementById('depth').value;
    
    if(!w || !h || !d) { alert("Completá las medidas primero."); return; }

    const element = document.getElementById('pdf-content');
    const date = new Date().toLocaleDateString();
    
    // Configuración de exportación
    const opt = {
        margin: 10,
        filename: `MOB-Presupuesto-${w}x${h}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, backgroundColor: '#0a0a0b' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}

function scrollToContact(product) {
    document.getElementById('contacto').scrollIntoView();
    document.getElementById('item-type').value = product;
}
