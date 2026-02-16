// 1. Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 800);
});

// 2. Video Optimizer (Ahorro de batería y CPU)
const heroVideo = document.getElementById('mainVideo');
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            heroVideo.pause();
        } else {
            heroVideo.play();
        }
    });
}, { threshold: 0.1 });

if (heroVideo) videoObserver.observe(heroVideo);

// 3. Motor de Parallax para la sección intermedia
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxLayers = document.querySelectorAll('.parallax-bg');
    
    parallaxLayers.forEach(layer => {
        let speed = 0.3;
        let yPos = (scrolled * speed) - (layer.parentElement.offsetTop * speed);
        layer.style.transform = `translateY(${yPos}px)`;
    });
});

// 4. Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealOnScroll.observe(el));

// 5. Navbar dinámico
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

// 6. Lightbox
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

// 7. WhatsApp
function sendToWhatsApp() {
    const type = document.getElementById('item-type').value;
    const w = document.getElementById('width').value;
    const h = document.getElementById('height').value;
    if(!w || !h) { alert("Ingresá las medidas."); return; }
    const msg = `*CONSULTA MOB*%0A*Tipo:* ${type}%0A*Medidas:* ${w}x${h} cm`;
    window.open(`https://wa.me/5491136139401?text=${msg}`, '_blank');
}
