// Loader
window.addEventListener('load', () => {
    document.getElementById('loader').style.opacity = '0';
    setTimeout(() => document.getElementById('loader').style.display = 'none', 1000);
});

// Revelar elementos al scroll
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// BASE DE DATOS DE PEDIDOS (Miguel y Mauro actualizan esto aquí)
const orders = {
    "MOB-101": { cliente: "Juan Pérez", producto: "Mesa Comedor", estado: 3 },
    "MOB-102": { cliente: "Lucía Fernández", producto: "Estantería Pro", estado: 1 },
    "MOB-103": { cliente: "Ricardo Gómez", producto: "Escritorio Studio", estado: 2 }
};

function checkOrder() {
    const id = document.getElementById('order-id').value.toUpperCase();
    const resultDiv = document.getElementById('tracking-result');
    const order = orders[id];

    if (order) {
        resultDiv.innerHTML = `
            <div class="status-card">
                <h3>Pedido: ${id}</h3>
                <p>Cliente: ${order.cliente} | ${order.producto}</p>
                <div class="status-step ${order.estado >= 1 ? 'active' : ''}">🛠️ En Estructura (Soldadura)</div>
                <div class="status-step ${order.estado >= 2 ? 'active' : ''}">🪵 En Carpintería (Lijado y Barnizado)</div>
                <div class="status-step ${order.estado >= 3 ? 'active' : ''}">🚚 Listo para entrega</div>
            </div>
        `;
    } else {
        resultDiv.innerHTML = `<p style="color:red; margin-top:20px;">ID de pedido no encontrado.</p>`;
    }
}

// WhatsApp y PDF
function sendToWhatsApp() {
    const type = document.getElementById('item-type');
    const w = document.getElementById('width').value;
    const h = document.getElementById('height').value;
    const d = document.getElementById('depth').value;
    if(!w || !h || !d) { alert("Completá las medidas."); return; }
    const total = Math.round(((w * h * d) / 100000) * type.options[type.selectedIndex].dataset.price + 35000);
    const msg = `*CONSULTA MOB*%0A*Mueble:* ${type.value}%0A*Medidas:* ${w}x${h}x${d}cm%0A*Estimado:* $${total.toLocaleString()}`;
    window.open(`https://wa.me/5491136139401?text=${msg}`, '_blank');
}

function generatePDF() {
    const w = document.getElementById('width').value;
    const h = document.getElementById('height').value;
    if(!w || !h) { alert("Completá las medidas."); return; }
    const element = document.getElementById('pdf-content');
    const opt = {
        margin: 10,
        filename: `MOB-Presupuesto.pdf`,
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
