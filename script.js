// ==========================================
// 1. DATOS DE GESTIÓN (Taller MOB)
// ==========================================
const preciosMOB = {
    "Mesa Industrial": 65000,
    "Estanteria Pro": 45000,
    "Escritorio Studio": 55000,
    "Rack TV": 48000
};

const pedidosMOB = {
    "MOB-101": { cliente: "Marcos G.", estado: 2 }, // 2 = Carpintería
    "MOB-102": { cliente: "Elena R.", estado: 1 }, // 1 = Soldadura
    "MOB-103": { cliente: "Juan P.", estado: 3 }  // 3 = Listo
};

// ==========================================
// 2. LÓGICA DE INICIO
// ==========================================
window.onload = () => {
    actualizarMenuPrecios();
    const loader = document.getElementById('loader');
    setTimeout(() => {
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 1000);
        }
    }, 600);
};

// Animación al hacer Scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ==========================================
// 3. FUNCIONES DEL SISTEMA
// ==========================================

function actualizarMenuPrecios() {
    const select = document.getElementById('item-type');
    if (!select) return;
    select.innerHTML = '';
    for (let p in preciosMOB) {
        let opt = document.createElement('option');
        opt.value = p;
        opt.textContent = p;
        opt.dataset.price = preciosMOB[p];
        select.appendChild(opt);
    }
}

function checkOrder() {
    const id = document.getElementById('order-id').value.toUpperCase().trim();
    const res = document.getElementById('tracking-result');
    const pedido = pedidosMOB[id];

    if (pedido) {
        const e = pedido.estado;
        res.innerHTML = `
            <div style="background:#000; padding:20px; border-radius:10px; margin-top:20px; border:1px solid #d4a373; text-align:left;">
                <h4 style="color:#d4a373">Orden: ${id}</h4>
                <p style="font-size:0.7rem; color:#888">Cliente: ${pedido.cliente}</p>
                <div style="margin-top:15px; font-size:0.9rem;">
                    <p style="color: ${e >= 1 ? '#d4a373' : '#444'}">🛠️ Estructura: ${e >= 1 ? 'COMPLETO' : 'PENDIENTE'}</p>
                    <p style="color: ${e >= 2 ? '#d4a373' : '#444'}">🪵 Carpintería: ${e >= 2 ? 'EN PROCESO' : 'PENDIENTE'}</p>
                    <p style="color: ${e >= 3 ? '#d4a373' : '#444'}">🚚 Entrega: ${e >= 3 ? 'LISTO' : 'PENDIENTE'}</p>
                </div>
            </div>`;
    } else {
        res.innerHTML = `<p style="color:#ff6b6b; margin-top:20px;">Código no encontrado.</p>`;
    }
}

function sendToWhatsApp() {
    const type = document.getElementById('item-type');
    const w = document.getElementById('width').value;
    const h = document.getElementById('height').value;
    const d = document.getElementById('depth').value;

    if(!w || !h || !d) { alert("Ingresá las medidas."); return; }

    const precioUnit = type.options[type.selectedIndex].dataset.price;
    const total = Math.round(((w * h * d) / 100000) * precioUnit + 35000);

    const texto = `*CONSULTA TÉCNICA MOB*%0A*Mueble:* ${type.value}%0A*Medidas:* ${w}x${h}x${d}cm%0A*Total Estimado:* $${total.toLocaleString()}`;
    window.open(`https://wa.me/5491136139401?text=${texto}`, '_blank');
}

function generatePDF() {
    const element = document.getElementById('pdf-content');
    const opt = {
        margin: 10,
        filename: 'MOB-Presupuesto.pdf',
        html2canvas: { scale: 2, backgroundColor: '#141415' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
}

function scrollToContact(product) {
    document.getElementById('contacto').scrollIntoView({behavior: "smooth"});
    document.getElementById('item-type').value = product;
}
