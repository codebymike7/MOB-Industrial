// ==========================================
// 1. PRECIOS DE PRODUCTOS (Miguel: Cambiá los números de acá)
// ==========================================
const preciosMOB = {
    "Mesa Industrial": 65000,
    "Estanteria Pro": 45000,
    "Escritorio Studio": 55000
};

// ==========================================
// 2. ESTADO DE PEDIDOS (Mauro: Agregá o cambiá acá)
// 1 = Soldadura | 2 = Carpintería | 3 = Listo
// ==========================================
const pedidosMOB = {
    "MOB-101": { cliente: "Juan Pérez", estado: 2 },
    "MOB-102": { cliente: "Lucía F.", estado: 1 },
    "MOB-103": { cliente: "Marcos", estado: 3 }
};

// ==========================================
// LÓGICA DEL SISTEMA (No tocar nada abajo)
// ==========================================

window.onload = () => {
    actualizarSelectorPrecios();
    const loader = document.getElementById('loader');
    if(loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 1000);
        }, 500);
    }
};

function actualizarSelectorPrecios() {
    const select = document.getElementById('item-type');
    if (!select) return;
    select.innerHTML = ''; 
    for (let prod in preciosMOB) {
        let opt = document.createElement('option');
        opt.value = prod;
        opt.text = prod;
        opt.dataset.price = preciosMOB[prod];
        select.appendChild(opt);
    }
}

function checkOrder() {
    const id = document.getElementById('order-id').value.toUpperCase().trim();
    const resultDiv = document.getElementById('tracking-result');
    const pedido = pedidosMOB[id];

    if (pedido) {
        const est = pedido.estado;
        resultDiv.innerHTML = `
            <div class="status-card" style="border: 2px solid #d4a373; padding: 20px; border-radius: 10px; background: #000; margin-top: 20px; text-align: left;">
                <h3 style="color:#d4a373; margin-bottom: 10px;">Orden: ${id}</h3>
                <p style="font-size: 0.8rem; margin-bottom: 15px;">Cliente: ${pedido.cliente}</p>
                <div style="margin: 10px 0; color: ${est >= 1 ? '#d4a373' : '#444'}">${est >= 1 ? '●' : '○'} 🛠️ Soldadura</div>
                <div style="margin: 10px 0; color: ${est >= 2 ? '#d4a373' : '#444'}">${est >= 2 ? '●' : '○'} 🪵 Carpintería</div>
                <div style="margin: 10px 0; color: ${est >= 3 ? '#d4a373' : '#444'}">${est >= 3 ? '●' : '○'} 🚚 Listo para entrega</div>
            </div>`;
    } else {
        resultDiv.innerHTML = `<p style="color:#ff6b6b; margin-top:15px;">Código no encontrado.</p>`;
    }
}

function sendToWhatsApp() {
    const type = document.getElementById('item-type');
    const w = document.getElementById('width').value;
    const h = document.getElementById('height').value;
    const d = document.getElementById('depth').value;
    if(!w || !h || !d) { alert("Faltan medidas."); return; }
    const precioUnitario = type.options[type.selectedIndex].dataset.price;
    const total = Math.round(((w * h * d) / 100000) * precioUnitario + 35000);
    const msg = `*CONSULTA MOB*%0A*Producto:* ${type.value}%0A*Medidas:* ${w}x${h}x${d}cm%0A*Presupuesto:* $${total.toLocaleString()}`;
    window.open(`https://wa.me/5491136139401?text=${msg}`, '_blank');
}

function generatePDF() {
    const element = document.getElementById('pdf-content');
    html2pdf().from(element).save(`Presupuesto-MOB.pdf`);
}

function scrollToContact(product) {
    document.getElementById('contacto').scrollIntoView({behavior: "smooth"});
    document.getElementById('item-type').value = product;
}
