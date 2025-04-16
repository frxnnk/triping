// Archivo buttons.js - Gestión centralizada de botones
document.addEventListener('DOMContentLoaded', function() {
  console.log('Inicializando botones...');
  
  // ----- Botones de Header -----
  // Botón de historial
  const historialBtn = document.getElementById('historial-btn');
  if (historialBtn) {
    historialBtn.addEventListener('click', function() {
      console.log('Historial clicked');
      // Implementar visualización de historial
      mostrarHistorial();
    });
  }
  
  // Botón de cambio de idioma
  const languageSwitchBtn = document.getElementById('language-switch-btn');
  const languageModal = document.getElementById('language-modal');
  const overlay = document.getElementById('overlay');
  if (languageSwitchBtn && languageModal) {
    languageSwitchBtn.addEventListener('click', function() {
      console.log('Language switch clicked');
      languageModal.classList.add('show');
      overlay.classList.add('show');
    });
  }
  
  // Cerrar modal de idioma
  const languageModalClose = document.getElementById('language-modal-close');
  if (languageModalClose) {
    languageModalClose.addEventListener('click', function() {
      languageModal.classList.remove('show');
      overlay.classList.remove('show');
    });
  }
  
  // Opciones de idioma
  const languageOptions = document.querySelectorAll('.language-option');
  languageOptions.forEach(option => {
    option.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      cambiarIdioma(lang);
      languageModal.classList.remove('show');
      overlay.classList.remove('show');
    });
  });
  
  // Botón de configuración
  const settingsIcon = document.getElementById('settings-icon');
  const settingsPanel = document.getElementById('settings-panel');
  if (settingsIcon && settingsPanel) {
    settingsIcon.addEventListener('click', function() {
      console.log('Settings clicked');
      settingsPanel.classList.add('show');
      overlay.classList.add('show');
    });
  }
  
  // Cerrar panel de configuración
  const settingsClose = document.getElementById('settings-close');
  if (settingsClose) {
    settingsClose.addEventListener('click', function() {
      settingsPanel.classList.remove('show');
      overlay.classList.remove('show');
    });
  }
  
  // Botón de comprar créditos
  const buyCreditsBtn = document.getElementById('buy-credits-btn');
  const creditsModal = document.getElementById('credits-modal');
  if (buyCreditsBtn && creditsModal) {
    buyCreditsBtn.addEventListener('click', function() {
      console.log('Buy credits clicked');
      creditsModal.classList.add('show');
      overlay.classList.add('show');
    });
  }
  
  // Cerrar modal de créditos
  const creditsModalClose = document.getElementById('credits-modal-close');
  if (creditsModalClose) {
    creditsModalClose.addEventListener('click', function() {
      creditsModal.classList.remove('show');
      overlay.classList.remove('show');
    });
  }
  
  // ----- Botones de Acción de Itinerario -----
  // Botón de generar
  const generarBtn = document.getElementById('generar-btn');
  if (generarBtn) {
    generarBtn.addEventListener('click', generarItinerario);
  }
  
  // Botón de regenerar
  const regenerarBtn = document.getElementById('regenerar-btn');
  if (regenerarBtn) {
    regenerarBtn.addEventListener('click', regenerarItinerario);
  }
  
  // Botón de copiar
  const copiarBtn = document.getElementById('copiar-btn');
  if (copiarBtn) {
    copiarBtn.addEventListener('click', copiarItinerario);
  }
  
  // Botón de imprimir
  const imprimirBtn = document.getElementById('imprimir-btn');
  if (imprimirBtn) {
    imprimirBtn.addEventListener('click', imprimirItinerario);
  }
  
  // Botón de PDF
  const pdfBtn = document.getElementById('pdf-btn');
  if (pdfBtn) {
    pdfBtn.addEventListener('click', descargarPDF);
  }
  
  // Botón de configurar API Key
  const useOwnKeyBtn = document.getElementById('use-own-key-btn');
  if (useOwnKeyBtn) {
    useOwnKeyBtn.addEventListener('click', function() {
      settingsPanel.classList.add('show');
      overlay.classList.add('show');
      document.getElementById('saved-api-key').focus();
    });
  }
  
  console.log('Todos los botones inicializados correctamente');
});

// Para que no falten estas funciones en caso de que no estén definidas
function mostrarHistorial() {
  // Implementación para mostrar el historial
  alert('Visualización de historial en desarrollo');
}

function cambiarIdioma(lang) {
  // Si ya está definida en script.js, esta no se usará
  if (typeof switchLanguage === 'function') {
    switchLanguage(lang);
  } else {
    console.log('Cambiando idioma a: ' + lang);
    // Implementación básica
    localStorage.setItem('language', lang);
    location.reload();
  }
} 