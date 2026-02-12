// Pantalla de inicio
function startExperience() {
    document.getElementById('intro-screen').style.display = 'none';
    document.getElementById('desktop-screen').style.display = 'block';
}

// Abrir ventanas
function openWindow(windowId) {
    document.querySelectorAll('.retro-window:not(.full-screen-window)').forEach(w => w.style.display = 'none');
    document.getElementById('window-' + windowId).style.display = 'flex';
    // Si abre la carta, aseguramos que el popup esté cerrado
    if (windowId === 'carta') {
        document.getElementById('valentine-popup').style.display = 'none';
    }
}

// Cerrar ventanas
function closeWindow(windowId) {
    document.getElementById('window-' + windowId).style.display = 'none';
    if (windowId === 'carta') {
        const iframe = document.querySelector('#window-carta iframe');
        if (iframe) { const tempSrc = iframe.src; iframe.src = ''; iframe.src = tempSrc; }
    }
}

// === LÓGICA DEL POPUP ===

function mostrarPopupValentine() {
    const popup = document.getElementById('valentine-popup');
    popup.style.display = 'flex';

    // RESETEAR: Mostrar pregunta, ocultar celebración
    document.getElementById('step-pregunta').style.display = 'block';
    document.getElementById('step-respuesta').style.display = 'none';

    // RESETEAR POSICIÓN DEL BOTÓN NO
    const btnNo = document.getElementById('btn-no');
    btnNo.style.position = 'static'; 
    btnNo.style.left = 'auto';
    btnNo.style.top = 'auto';
}

function cerrarPopup() {
    document.getElementById('valentine-popup').style.display = 'none';
}

function aceptarValentine() {
    document.getElementById('step-pregunta').style.display = 'none';
    document.getElementById('step-respuesta').style.display = 'block';
}

// === BOTÓN ESCURRIDIZO (Con detección de área segura) ===
function moverBoton() {
    const btnNo = document.getElementById('btn-no');
    const container = document.querySelector('.modal-buttons');
    const rect = container.getBoundingClientRect();
    const buffer = 40; // Espacio de seguridad para no tapar el botón SÍ

    const width = window.innerWidth;
    const height = window.innerHeight;
    const btnW = btnNo.offsetWidth;
    const btnH = btnNo.offsetHeight;

    let newX, newY;
    let esSeguro = false;
    let intentos = 0;

    // Intentamos encontrar un lugar seguro
    while (!esSeguro && intentos < 15) {
        newX = Math.random() * (width - btnW - 20);
        newY = Math.random() * (height - btnH - 20);

        // Si la nueva posición NO choca con la zona original de los botones
        if (
            newX + btnW < rect.left - buffer || 
            newX > rect.right + buffer ||       
            newY + btnH < rect.top - buffer ||  
            newY > rect.bottom + buffer         
        ) {
            esSeguro = true;
        }
        intentos++;
    }

    // Mover el botón
    btnNo.style.position = 'fixed';
    btnNo.style.left = newX + 'px';
    btnNo.style.top = newY + 'px';
    btnNo.style.zIndex = "100000"; 
}
