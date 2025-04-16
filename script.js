// Referencias a elementos del DOM
const settingsIcon = document.getElementById('settings-icon');
const settingsPanel = document.getElementById('settings-panel');
const settingsClose = document.getElementById('settings-close');
const overlay = document.getElementById('overlay');
const saveSettingsBtn = document.getElementById('save-settings');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const savedApiKeyInput = document.getElementById('saved-api-key');
const generarBtn = document.getElementById('generar-btn');
const copiarBtn = document.getElementById('copiar-btn');
const imprimirBtn = document.getElementById('imprimir-btn');
const pdfBtn = document.getElementById('pdf-btn');
const responseBox = document.getElementById('response');
const actionButtons = document.getElementById('action-buttons');
const loadingIndicator = document.getElementById('loading');
const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');
const appLayout = document.querySelector('.app-layout');
const emptyState = document.getElementById('empty-state');
const responseCard = document.querySelector('.response-box');
const languageSelector = document.getElementById('language-selector');
const promptTemplate = document.getElementById('prompt-template');
const languageSwitchBtn = document.getElementById('language-switch-btn');
const languageModal = document.getElementById('language-modal');
const languageModalClose = document.getElementById('language-modal-close');
const languageOptions = document.querySelectorAll('.language-option');

// Datos de continentes y países
const continentes = {
  "Europa": ["España", "Francia", "Italia", "Alemania", "Reino Unido", "Portugal", "Grecia", "Suiza", "Austria", "Países Bajos", "Bélgica", "Suecia", "Noruega", "Dinamarca", "Finlandia", "Irlanda", "Polonia", "República Checa", "Hungría", "Croacia"],
  "América del Norte": ["Estados Unidos", "Canadá", "México", "Cuba", "Costa Rica", "Panamá", "Jamaica", "República Dominicana", "Puerto Rico"],
  "América del Sur": ["Brasil", "Argentina", "Colombia", "Perú", "Chile", "Ecuador", "Venezuela", "Uruguay", "Bolivia", "Paraguay"],
  "Asia": ["Japón", "China", "Tailandia", "Vietnam", "India", "Corea del Sur", "Indonesia", "Malasia", "Singapur", "Filipinas", "Emiratos Árabes Unidos", "Turquía", "Israel", "Jordania"],
  "África": ["Egipto", "Marruecos", "Sudáfrica", "Kenia", "Tanzania", "Túnez", "Etiopía", "Senegal", "Ghana", "Namibia"],
  "Oceanía": ["Australia", "Nueva Zelanda", "Fiji", "Polinesia Francesa", "Samoa"]
};

// Destinos seleccionados
let destinosSeleccionados = [];

// Plantilla de prompt predeterminada en inglés
const DEFAULT_PROMPT = 
`Create a detailed itinerary for a trip to {destino} from {fechaInicio} to {fechaFin}.
Main interests: {intereses}
Budget: {presupuesto}
Travel pace: {ritmo}
Pre-booked accommodations/reservations: {reservasExistentes}

Include:
- Day-by-day plan with approximate times
- Main attractions based on interests
- Transportation recommendations between points
- Food and rest recommendations
- Useful local tips
- If there are multiple destinations, optimize the route and consider travel time between places

IMPORTANT:
1. Include URLs (in parentheses) for all attractions, restaurants, and important places mentioned
2. Mark with [BOOK] those places where prior reservation is necessary or recommended
3. For each day, include a "DAY TIPS" section with practical recommendations
4. Clearly specify the recommended means of transportation between activities
5. Plan around any pre-existing bookings or accommodations mentioned above

Structure the itinerary clearly by days (Day 1, Day 2, etc.)`;

// Traducciones de la interfaz
const translations = {
  "es": {
    "app_title": "Generador de Itinerarios",
    "intro_text": "Crea un itinerario personalizado para tu próximo viaje en segundos. Especifica tu destino, fechas y preferencias.",
    "travel_details": "Detalles del Viaje",
    "destination": "Destino:",
    "destination_placeholder": "Busca países o continentes...",
    "destination_help": "Puedes seleccionar múltiples países o continentes",
    "start_date": "Fecha de inicio:",
    "end_date": "Fecha de fin:",
    "accommodation": "Alojamiento (opcional):",
    "accommodation_placeholder": "Nombre/ubicación de tu hotel",
    "interests": "Intereses",
    "interests_selected": "intereses seleccionados",
    "existing_bookings": "Alojamientos y reservas confirmadas:",
    "existing_bookings_placeholder": "Especifica los hoteles, traslados o reservas que ya tengas confirmados (Ej: 'Hotel Marriott en Madrid del 5-8 junio', 'Vuelo a Barcelona el día 9', 'Reserva en restaurante El Paraguas el 6 a las 20:00')",
    "existing_bookings_help": "Esta información se integrará en tu itinerario. Incluye fechas y horas si es posible.",
    "transport_preferred": "Medios de transporte preferidos:",
    "preferences": "Preferencias",
    "budget": "Presupuesto:",
    "budget_low": "Económico",
    "budget_medium": "Medio",
    "budget_high": "Premium",
    "pace": "Ritmo del viaje:",
    "pace_slow": "Relajado",
    "pace_medium": "Moderado",
    "pace_fast": "Intenso",
    "additional_instructions": "Instrucciones adicionales:",
    "additional_placeholder": "Menciona preferencias especiales, restricciones alimentarias, accesibilidad, etc.",
    "generate_btn": "Crear mi itinerario",
    "start_adventure": "¡Comienza tu aventura!",
    "start_adventure_text": "Configura los detalles de tu viaje en el panel de la izquierda y haz clic en \"Crear mi itinerario\" para generar un plan personalizado para tu próxima aventura.",
    "your_itinerary": "Tu itinerario personalizado:",
    "copy_btn": "Copiar",
    "print_btn": "Imprimir",
    "pdf_btn": "Guardar PDF",
    "loading_text": "Generando tu itinerario personalizado... Esto puede tomar hasta un minuto.",
    "select_language": "Selecciona un idioma",
    "settings": "Configuración",
    "dark_mode": "Modo oscuro",
    "language": "Idioma:",
    "prompt_template": "Plantilla de Prompt:",
    "save_settings": "Guardar configuración",
    "filters": "Filtros",
    "transport_walking": "A pie",
    "transport_car": "Auto",
    "transport_bus": "Bus",
    "transport_train": "Tren",
    "transport_metro": "Metro",
    "transport_bike": "Bici",
    "transport_plane": "Avión",
    "transport_boat": "Barco"
  },
  "en": {
    "app_title": "Itinerary Generator",
    "intro_text": "Create a personalized itinerary for your next trip in seconds. Specify your destination, dates, and preferences.",
    "travel_details": "Trip Details",
    "destination": "Destination:",
    "destination_placeholder": "Search countries or continents...",
    "destination_help": "You can select multiple countries or continents",
    "start_date": "Start date:",
    "end_date": "End date:",
    "accommodation": "Accommodation (optional):",
    "accommodation_placeholder": "Name/location of your hotel",
    "interests": "Interests",
    "interests_selected": "interests selected",
    "existing_bookings": "Confirmed accommodations and reservations:",
    "existing_bookings_placeholder": "Specify hotels, transfers or bookings you already have confirmed (Ex: 'Marriott Hotel in Madrid from June 5-8', 'Flight to Barcelona on day 9', 'Reservation at El Paraguas restaurant on the 6th at 8:00 PM')",
    "existing_bookings_help": "This information will be integrated into your itinerary. Include dates and times if possible.",
    "transport_preferred": "Preferred transportation methods:",
    "preferences": "Preferences",
    "budget": "Budget:",
    "budget_low": "Budget",
    "budget_medium": "Standard",
    "budget_high": "Premium",
    "pace": "Travel pace:",
    "pace_slow": "Relaxed",
    "pace_medium": "Moderate",
    "pace_fast": "Intense",
    "additional_instructions": "Additional instructions:",
    "additional_placeholder": "Mention special preferences, dietary restrictions, accessibility needs, etc.",
    "generate_btn": "Create my itinerary",
    "start_adventure": "Start your adventure!",
    "start_adventure_text": "Configure your trip details in the left panel and click \"Create my itinerary\" to generate a personalized plan for your next adventure.",
    "your_itinerary": "Your personalized itinerary:",
    "copy_btn": "Copy",
    "print_btn": "Print",
    "pdf_btn": "Save as PDF",
    "loading_text": "Generating your personalized itinerary... This may take up to a minute.",
    "select_language": "Select a language",
    "settings": "Settings",
    "dark_mode": "Dark mode",
    "language": "Language:",
    "prompt_template": "Prompt Template:",
    "save_settings": "Save settings",
    "filters": "Filters",
    "transport_walking": "Walking",
    "transport_car": "Car",
    "transport_bus": "Bus",
    "transport_train": "Train",
    "transport_metro": "Metro",
    "transport_bike": "Bike",
    "transport_plane": "Plane",
    "transport_boat": "Boat"
  },
  // Puedes agregar más idiomas aquí: fr, de, it, pt
};

// También podemos incluir traducciones para cada interés
const interestTranslations = {
  "es": {
    "arte": "Arte",
    "gastronomia": "Gastronomía",
    "arquitectura": "Arquitectura",
    "naturaleza": "Naturaleza",
    "compras": "Compras",
    "historia": "Historia",
    "playa": "Playas",
    "aventura": "Aventura",
    "vida nocturna": "Nocturna",
    "cultura local": "Cultura",
    "relax": "Relax",
    "fotografía": "Fotografía"
  },
  "en": {
    "arte": "Art",
    "gastronomia": "Food",
    "arquitectura": "Architecture",
    "naturaleza": "Nature",
    "compras": "Shopping",
    "historia": "History",
    "playa": "Beaches",
    "aventura": "Adventure",
    "vida nocturna": "Nightlife",
    "cultura local": "Culture",
    "relax": "Relax",
    "fotografía": "Photography"
  }
  // Puedes agregar más idiomas aquí
};

// Inicializar la aplicación cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Cargar configuraciones guardadas
  loadSettings();
  
  // Configurar fechas por defecto
  setupDefaultDates();
  
  // Configurar event listeners
  setupEventListeners();
  
  // Nueva funcionalidad para el sidebar
  setupSidebarToggle();
  
  // Inicialmente, ocultar el área de respuesta y mostrar estado vacío
  showEmptyState(true);
  
  // Configurar el selector de destinos múltiples
  setupDestino();
  
  // Agregar el event listener para los checkboxes de intereses
  const interestCheckboxes = document.querySelectorAll('.interest-checkbox input[type="checkbox"]');
  interestCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateInterestCounter);
  });
  
  // Inicializar el contador
  updateInterestCounter();
  
  // Añadir tooltips a los intereses basados en el texto existente
  document.querySelectorAll('.interest-checkbox label').forEach(label => {
    // Si no tiene data-tooltip, agregarlo basado en el texto del span
    if (!label.hasAttribute('data-tooltip')) {
      const spanText = label.querySelector('span')?.textContent.trim() || '';
      if (spanText) {
        label.setAttribute('data-tooltip', spanText);
      }
    }
  });
});

// Configuración del panel de ajustes
function setupEventListeners() {
  // Toggle del panel de configuración
  settingsIcon.addEventListener('click', function() {
    settingsPanel.classList.add('open');
    overlay.classList.add('open');
  });
  
  settingsClose.addEventListener('click', closeSettings);
  overlay.addEventListener('click', closeSettings);
  
  // Guardar configuraciones
  saveSettingsBtn.addEventListener('click', saveSettings);
  
  // Toggle de modo oscuro
  darkModeToggle.addEventListener('change', toggleDarkMode);
  
  // Botones de acción
  generarBtn.addEventListener('click', generarItinerario);
  copiarBtn.addEventListener('click', copiarItinerario);
  imprimirBtn.addEventListener('click', imprimirItinerario);
  pdfBtn.addEventListener('click', guardarPDF);
  
  languageSwitchBtn.addEventListener('click', function() {
    languageModal.classList.add('open');
    overlay.classList.add('open');
    
    // Destacar el idioma actualmente seleccionado
    const currentLang = localStorage.getItem('language') || 'es';
    languageOptions.forEach(option => {
      if (option.dataset.lang === currentLang) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
  });
  
  languageModalClose.addEventListener('click', closeLanguageModal);
  
  languageOptions.forEach(option => {
    option.addEventListener('click', function() {
      const selectedLang = this.dataset.lang;
      changeLanguage(selectedLang);
      closeLanguageModal();
    });
  });
}

// Cerrar panel de configuración
function closeSettings() {
  settingsPanel.classList.remove('open');
  overlay.classList.remove('open');
}

// Guardar configuraciones
function saveSettings() {
  const apiKey = savedApiKeyInput.value;
  const isDarkMode = darkModeToggle.checked;
  const language = languageSelector.value;
  const customPrompt = promptTemplate.value || DEFAULT_PROMPT;
  
  localStorage.setItem('apiKey', apiKey);
  localStorage.setItem('darkMode', isDarkMode);
  localStorage.setItem('language', language);
  localStorage.setItem('customPrompt', customPrompt);
  
  // Aplicar modo oscuro si está activado
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
  
  closeSettings();
  showNotification('Configuración guardada correctamente');
  
  // Aplicar cambios de idioma si es necesario
  applyLanguageChanges(language);
}

// Mostrar notificación
function showNotification(message, isError = false) {
  // Si hay un sistema de notificaciones implementado, úsalo
  alert(message);
}

// Toggle de modo oscuro
function toggleDarkMode() {
  const isDarkMode = darkModeToggle.checked;
  
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
  
  localStorage.setItem('darkMode', isDarkMode);
}

// Aplicar modo oscuro
function applyDarkMode(enable) {
  if (enable) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

// Cargar configuraciones guardadas
function loadSettings() {
  // Cargar API key
  const savedApiKey = localStorage.getItem('apiKey') || '';
  savedApiKeyInput.value = savedApiKey;
  
  // Cargar modo oscuro
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  darkModeToggle.checked = isDarkMode;
  applyDarkMode(isDarkMode);
  
  // Cargar idioma y aplicarlo
  const savedLanguage = localStorage.getItem('language') || 'es';
  languageSelector.value = savedLanguage;
  applyLanguageChanges(savedLanguage);
  
  // Cargar plantilla de prompt
  const savedPrompt = localStorage.getItem('customPrompt') || DEFAULT_PROMPT;
  promptTemplate.value = savedPrompt;
  
  // Cargar estado del sidebar (con validación por tamaño de pantalla)
  const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
  if (sidebarCollapsed && window.innerWidth > 992) {
    document.querySelector('.app-layout').classList.add('sidebar-collapsed');
  }
  
  // Configurar fechas por defecto
  setupDefaultDates();
}

// Configurar fechas por defecto
function setupDefaultDates() {
  const hoy = new Date();
  const dentroDe30Dias = new Date();
  dentroDe30Dias.setDate(hoy.getDate() + 30);
  const dentroDe35Dias = new Date();
  dentroDe35Dias.setDate(hoy.getDate() + 35);
  
  document.getElementById('fechaInicio').valueAsDate = dentroDe30Dias;
  document.getElementById('fechaFin').valueAsDate = dentroDe35Dias;
}

// Función para obtener los medios de transporte seleccionados
function obtenerTransportesSeleccionados() {
  const transportes = [];
  document.querySelectorAll('.transport-checkbox input[type="checkbox"]:checked').forEach(checkbox => {
    transportes.push(checkbox.value);
  });
  return transportes;
}

// Generar itinerario
async function generarItinerario() {
  // Al iniciar la generación, ocultar el estado vacío
  showEmptyState(false);
  
  // Obtener datos del formulario
  const destino = document.getElementById('destino').value;
  const fechaInicio = document.getElementById('fechaInicio').value;
  const fechaFin = document.getElementById('fechaFin').value;
  const alojamiento = document.getElementById('alojamiento').value || 'No especificado';
  const intereses = obtenerInteresesSeleccionados().join(', ');
  const presupuesto = document.getElementById('presupuesto').value;
  const ritmo = document.getElementById('ritmo').value;
  const instrucciones = document.getElementById('instrucciones').value || '';
  const transportes = obtenerTransportesSeleccionados().join(', ');
  const reservasExistentes = document.getElementById('reservas-existentes').value;
  
  // Validaciones básicas
  if (!destino) {
    showNotification('Por favor, selecciona al menos un destino', true);
    return;
  }
  
  if (!fechaInicio || !fechaFin) {
    showNotification('Por favor, selecciona las fechas de tu viaje', true);
    return;
  }
  
  // Cargar API key desde localStorage
  const apiKey = localStorage.getItem('apiKey');
  
  // Verificar que existe una API key
  if (!apiKey) {
    showNotification('Por favor, configura tu API Key de OpenAI en la configuración', true);
    settingsPanel.classList.add('open');
    overlay.classList.add('open');
    return;
  }
  
  // Cargar el prompt personalizado
  let promptText = localStorage.getItem('customPrompt') || DEFAULT_PROMPT;
  
  // Reemplazar variables en el prompt
  promptText = promptText
    .replace('{destino}', destino)
    .replace('{fechaInicio}', fechaInicio)
    .replace('{fechaFin}', fechaFin)
    .replace('{intereses}', intereses || 'No especificados')
    .replace('{presupuesto}', presupuesto)
    .replace('{ritmo}', ritmo)
    .replace('{reservasExistentes}', reservasExistentes || 'None');
  
  // Si hay múltiples destinos, añadir una nota especial
  if (destino.includes(',')) {
    promptText += `\n\nITINERARIO MULTI-DESTINO: Este viaje incluye múltiples destinos (${destino}). Por favor, organiza el itinerario para cubrir estos lugares de manera eficiente, considerando distancias y tiempos de viaje entre ellos.`;
  }
  
  // Añadir preferencias de transporte
  if (transportes) {
    promptText += `\n\nMEDIOS DE TRANSPORTE PREFERIDOS: ${transportes}. Prioriza estos medios de transporte al planificar desplazamientos.`;
  }
  
  if (instrucciones) {
    promptText += `\n\nInstrucciones adicionales: ${instrucciones}`;
  }
  
  if (alojamiento !== 'No especificado') {
    promptText += `\n\nAlojamiento: ${alojamiento}`;
  }
  
  // Agregar instrucciones específicas sobre URLs y reservas
  let systemPrompt = "Eres un experto en planificación de viajes. Crea itinerarios detallados y bien organizados. ";
  systemPrompt += "IMPORTANTE: Incluye URLs (entre paréntesis) para cada atracción, restaurante y sitio importante mencionado. ";
  systemPrompt += "Marca con [RESERVAR] los lugares donde se necesite o recomiende reservar con anticipación. ";
  systemPrompt += "Para cada día, incluye una sección 'CONSEJOS DEL DÍA' con recomendaciones prácticas.";
  
  try {
    // Mostrar indicador de carga (ahora actualizado)
    loadingIndicator.style.display = 'flex';
    
    // Ocultar el estado vacío mientras se carga
    showEmptyState(false);
    
    // Ocultar la tarjeta de respuesta mientras se carga
    responseCard.style.display = 'none';
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: promptText
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    });
    
    const data = await response.json();
    
    if (data.error) {
      showNotification(`Error: ${data.error.message}`, true);
      showEmptyState(true);
    } else if (data.choices && data.choices[0]) {
      const itinerario = data.choices[0].message.content;
      procesarRespuesta(itinerario, destino, fechaInicio, fechaFin);
      // Asegurarse que los botones de acción sean visibles
      actionButtons.style.display = 'flex';
      // Asegurarse que la caja de respuesta sea visible
      responseCard.style.display = 'block';
    } else {
      showNotification('Error al generar el itinerario', true);
      showEmptyState(true);
    }
  } catch (error) {
    showNotification(`Error al conectar con la API: ${error.message}`, true);
    showEmptyState(true);
  } finally {
    // Ocultar el indicador de carga
    loadingIndicator.style.display = 'none';
  }
}

// Modificar la función procesarRespuesta para restaurar el diseño de tarjetas
function procesarRespuesta(respuesta, destino, fechaInicio, fechaFin) {
  // Asegurarse de que el estado vacío esté oculto cuando hay contenido
  showEmptyState(false);
  
  // Limpiar el contenedor de respuesta
  responseBox.innerHTML = "";
  
  // Crear el encabezado del itinerario
  const header = document.createElement('div');
  header.className = 'itinerary-header';
  header.innerHTML = `
    <h2>Itinerario para ${destino}</h2>
    <p>Del ${formatearFecha(fechaInicio)} al ${formatearFecha(fechaFin)}</p>
  `;
  responseBox.appendChild(header);
  
  // Dividir la respuesta en días
  // Buscamos patrones como "Día 1", "Día 2", etc.
  const diasPattern = /D[ií]a\s*\d+/gi;
  const textosDias = respuesta.split(diasPattern);
  const titulosDias = respuesta.match(diasPattern) || [];
  
  // Si no se pudo dividir correctamente, mostramos todo el contenido
  if (titulosDias.length <= 1) {
    const contenidoProcesado = procesarTextoConEnlaces(respuesta);
    const diaContainer = crearTarjetaDia('Itinerario completo', contenidoProcesado);
    responseBox.appendChild(diaContainer);
  } else {
    // Crear contenedor para las tarjetas de días
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'day-cards-container';
    responseBox.appendChild(cardsContainer);
    
    // Crear una tarjeta para cada día encontrado
    for (let i = 0; i < titulosDias.length; i++) {
      // El primer split suele devolver contenido vacío o la introducción
      const contenidoDia = i === 0 ? textosDias[i+1] : textosDias[i];
      if (!contenidoDia) continue;
      
      const contenidoProcesado = procesarTextoConEnlaces(contenidoDia);
      const diaContainer = crearTarjetaDia(titulosDias[i], contenidoProcesado);
      cardsContainer.appendChild(diaContainer);
    }
  }
  
  // Mostrar los botones de acción
  actionButtons.style.display = 'flex';
  
  // Asegurarse de que la tarjeta de respuesta sea visible
  responseCard.style.display = 'block';
  
  // Desplazarse hasta el resultado
  responseCard.scrollIntoView({ behavior: 'smooth' });
  
  // Guardar el itinerario actual en el historial
  guardarItinerarioEnHistorial(destino, fechaInicio, fechaFin, respuesta);
}

// Mejorar la función de procesamiento de texto para destacar URLs y reservas
function procesarTextoConEnlaces(texto) {
  if (!texto) return '';
  
  // Reemplazar enlaces entre paréntesis con versiones acortadas y bien formateadas
  texto = texto.replace(/\(https?:\/\/[^\s\)]+\)/g, url => {
    const cleanUrl = url.substring(1, url.length - 1);
    const displayUrl = acortarUrl(cleanUrl);
    return `(<a href="${cleanUrl}" target="_blank" class="place-link">${displayUrl} <i class="fas fa-external-link-alt"></i></a>)`;
  });
  
  // Destacar más prominentemente los lugares que requieren reserva
  texto = texto.replace(/\[RESERVAR\]/gi, '<span class="reservation-required"><i class="fas fa-calendar-check"></i> Reserva requerida</span>');
  
  // Destacar las secciones de consejos
  texto = texto.replace(/(CONSEJOS DEL DÍA|TIPS DEL DÍA):/gi, '<h4 class="tips-header"><i class="fas fa-lightbulb"></i> $1:</h4>');
  
  // Reemplazar saltos de línea por <br>
  texto = texto.replace(/\n/g, '<br>');
  
  return texto;
}

// Función para acortar URLs para visualización
function acortarUrl(url) {
  try {
    const urlObj = new URL(url);
    // Mostrar solo el hostname y la primera parte del path
    let displayUrl = urlObj.hostname;
    if (urlObj.pathname && urlObj.pathname !== '/') {
      // Tomar solo el primer nivel del path y añadir "..."
      const pathParts = urlObj.pathname.split('/').filter(part => part);
      if (pathParts.length > 0) {
        displayUrl += '/' + pathParts[0];
        if (pathParts.length > 1) {
          displayUrl += '/...';
        }
      }
    }
    return displayUrl;
  } catch (e) {
    // Si hay un error al parsear la URL, devolver la original
    return url;
  }
}

// Función para crear una tarjeta de día
function crearTarjetaDia(titulo, contenido) {
  const diaCard = document.createElement('div');
  diaCard.className = 'day-card';
  
  // Crear contenido de la tarjeta
  diaCard.innerHTML = `
    <div class="day-card-header">
      <h3>${titulo}</h3>
      <div class="day-card-actions">
        <button class="day-action-btn regenerate-btn" title="Regenerar este día">
          <i class="fas fa-sync-alt"></i>
        </button>
        <button class="day-action-btn delete-btn" title="Eliminar este día">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
    <div class="day-card-content">${contenido}</div>
  `;
  
  // Añadir event listeners para los botones
  const regenerateBtn = diaCard.querySelector('.regenerate-btn');
  const deleteBtn = diaCard.querySelector('.delete-btn');
  
  regenerateBtn.addEventListener('click', () => regenerarDia(diaCard));
  deleteBtn.addEventListener('click', () => eliminarDia(diaCard));
  
  return diaCard;
}

// Función para regenerar un día específico
async function regenerarDia(diaCard) {
  const apiKey = localStorage.getItem('apiKey');
  if (!apiKey) {
    showNotification("Necesitas configurar tu API Key para regenerar días.", true);
    return;
  }
  
  const destino = document.getElementById("destino").value;
  const numDia = titulo.match(/\d+/)[0];
  const intereses = obtenerInteresesSeleccionados();
  const presupuesto = document.getElementById("presupuesto").value;
  
  // Mostrar indicador de carga en la tarjeta
  const contenidoDiv = diaCard.querySelector('.day-card-content');
  const contenidoOriginal = contenidoDiv.innerHTML;
  contenidoDiv.innerHTML = '<div class="card-loading"><div class="spinner"></div><span>Regenerando día...</span></div>';
  
  // Deshabilitar botones durante la regeneración
  const botones = diaCard.querySelectorAll('.day-action-btn');
  botones.forEach(btn => btn.disabled = true);
  
  // Prompt mejorado para regenerar un día
  const promptDia = `Regenera el Día ${numDia} para el itinerario de viaje a ${destino}.

Requisitos específicos:
1. Incluye actividades para mañana, tarde y noche con horarios específicos.
2. Para cada lugar recomendado, incluye el sitio web oficial entre paréntesis así: "Museo del Prado (https://www.museodelprado.es)"
3. Verifica y menciona los horarios de apertura actuales para cada atracción.
4. Indica claramente cuando un lugar requiere reserva previa con el texto "[RESERVAR]" antes del nombre.
5. Incluye al final una sección llamada "CONSEJOS DEL DÍA" con 2-3 recomendaciones prácticas.
6. Usa formato enriquecido: negritas para nombres de lugares, cursiva para descripciones breves.
7. Considera estos intereses: ${intereses.join(', ')}.
8. Presupuesto: ${presupuesto}.

Para cada actividad, proporciona una breve descripción, horario aproximado y ubicación.`;
  
  try {
    const result = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { 
            role: "system", 
            content: "Eres un planificador de viajes experto. Genera itinerarios detallados y realistas." 
          },
          { role: "user", content: promptDia }
        ],
        temperature: 0.7
      })
    });
    
    const data = await result.json();
    
    if (data?.choices && data.choices[0]?.message?.content) {
      // Actualizar el contenido de la tarjeta con enlaces procesados
      const nuevoContenido = data.choices[0].message.content.replace(/\n/g, "<br>");
      
      // Procesar enlaces y otros formatos
      const contenidoProcesado = procesarTextoConEnlaces(nuevoContenido);
      contenidoDiv.innerHTML = contenidoProcesado;
    } else {
      // Restaurar contenido original en caso de error
      contenidoDiv.innerHTML = contenidoOriginal;
      showNotification("Error al regenerar el día: " + (data.error?.message || "Intenta de nuevo"), true);
    }
  } catch (error) {
    contenidoDiv.innerHTML = contenidoOriginal;
    showNotification("Error de conexión: " + error.message, true);
  } finally {
    // Reactivar botones
    botones.forEach(btn => btn.disabled = false);
  }
}

// Función para eliminar un día
function eliminarDia(diaCard) {
  if (confirm("¿Estás seguro de que deseas eliminar este día del itinerario?")) {
    diaCard.classList.add('removing');
    setTimeout(() => {
      diaCard.parentNode.removeChild(diaCard);
    }, 300);
  }
}

// Función auxiliar para formatear fechas
function formatearFecha(fechaStr) {
  const fecha = new Date(fechaStr);
  return fecha.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

// Copiar itinerario
function copiarItinerario() {
  const contenido = document.getElementById("response").innerText;
  
  try {
    navigator.clipboard.writeText(contenido)
      .then(() => showNotification("¡Itinerario copiado al portapapeles!"))
      .catch(err => showNotification("Error al copiar: " + err, true));
  } catch (error) {
    // Fallback para navegadores que no soportan clipboard API
    const textArea = document.createElement("textarea");
    textArea.value = contenido;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    showNotification("¡Itinerario copiado al portapapeles!");
  }
}

// Imprimir itinerario
function imprimirItinerario() {
  try {
    // Obtener datos necesarios
    const destino = document.getElementById("destino").value;
    const fechaInicio = document.getElementById("fechaInicio").value;
    const fechaFin = document.getElementById("fechaFin").value;
    const contenidoItinerario = document.getElementById("response").innerHTML;
    
    // Crear ventana para imprimir
    const printWindow = window.open("", "_blank");
    
    if (!printWindow) {
      showNotification("El navegador bloqueó la apertura de la ventana. Por favor, permite las ventanas emergentes para este sitio.", true);
      return;
    }
    
    // Construir el HTML
    let htmlContent = "<!DOCTYPE html><html><head><title>Itinerario: " + destino + "</title>";
    htmlContent += "<style>";
    htmlContent += "body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }";
    htmlContent += "h1 { color: #2d63ed; }";
    htmlContent += "h2 { margin-top: 20px; color: #333; }";
    htmlContent += ".header { border-bottom: 2px solid #2d63ed; margin-bottom: 20px; padding-bottom: 10px; }";
    htmlContent += "@media print { @page { margin: 1.5cm; } body { font-size: 12pt; } }";
    htmlContent += "</style></head><body>";
    htmlContent += "<div class='header'>";
    htmlContent += "<h1>Itinerario de viaje: " + destino + "</h1>";
    htmlContent += "<p>Fecha: " + fechaInicio + " al " + fechaFin + "</p>";
    htmlContent += "</div>";
    htmlContent += contenidoItinerario;
    htmlContent += "</body></html>";
    
    // Escribir en la ventana y preparar para imprimir
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Dar tiempo para que se cargue el contenido
    setTimeout(function() {
      printWindow.focus();
      printWindow.print();
    }, 500);
  } catch (error) {
    showNotification("Error al preparar la impresión: " + error.message, true);
  }
}

// Guardar PDF
function guardarPDF() {
  try {
    showNotification("Para guardar como PDF, utiliza la función de imprimir y selecciona 'Guardar como PDF' en las opciones de impresora.");
    setTimeout(imprimirItinerario, 100);
  } catch (error) {
    showNotification("Error al preparar el PDF: " + error.message, true);
  }
}

// Función auxiliar para obtener intereses seleccionados
function obtenerInteresesSeleccionados() {
  const checkboxes = document.querySelectorAll('.interest-checkbox input[type="checkbox"]:checked');
  return Array.from(checkboxes).map(cb => cb.value);
}

// Función para configurar la funcionalidad del sidebar
function setupSidebarToggle() {
  const sidebarToggleBtn = document.getElementById('sidebar-toggle');
  const closeSidebarBtn = document.getElementById('close-sidebar');
  const sidebar = document.getElementById('filters-sidebar');
  const toggleSidebarHeaderBtn = document.getElementById('toggle-sidebar-btn');
  const appLayout = document.querySelector('.app-layout');
  
  // Función para alternar el sidebar
  function toggleSidebar() {
    appLayout.classList.toggle('sidebar-collapsed');
    
    // Actualizar icono según estado
    if (toggleSidebarHeaderBtn) {
      const icon = toggleSidebarHeaderBtn.querySelector('i');
      if (appLayout.classList.contains('sidebar-collapsed')) {
        icon.className = 'fas fa-bars';
      } else {
        icon.className = 'fas fa-times';
      }
    }
    
    // Guardar preferencia
    localStorage.setItem('sidebarCollapsed', appLayout.classList.contains('sidebar-collapsed'));
  }
  
  // Gestión del botón flotante (móvil)
  if (sidebarToggleBtn) {
    sidebarToggleBtn.addEventListener('click', function(event) {
      sidebar.classList.add('open');
      event.stopPropagation();
    });
  }
  
  // Gestión del botón en el header (escritorio)
  if (toggleSidebarHeaderBtn) {
    toggleSidebarHeaderBtn.addEventListener('click', function(event) {
      if (window.innerWidth <= 992) {
        sidebar.classList.add('open');
      } else {
        toggleSidebar();
      }
      event.stopPropagation();
    });
  }
  
  // Cerrar sidebar con el botón de cerrar
  if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener('click', function() {
      sidebar.classList.remove('open');
    });
  }
  
  // Mejorar la gestión de clics fuera del sidebar
  document.addEventListener('click', function(event) {
    if (window.innerWidth <= 992) {
      const isClickInside = sidebar.contains(event.target) || 
                         (sidebarToggleBtn && sidebarToggleBtn.contains(event.target)) ||
                         (toggleSidebarHeaderBtn && toggleSidebarHeaderBtn.contains(event.target));
      
      if (sidebar.classList.contains('open') && !isClickInside) {
        sidebar.classList.remove('open');
      }
    }
  });
  
  // Ajustar al cambiar tamaño de ventana
  window.addEventListener('resize', function() {
    // Actualizar el icono del botón según tamaño de pantalla y estado
    if (toggleSidebarHeaderBtn) {
      const icon = toggleSidebarHeaderBtn.querySelector('i');
      if (window.innerWidth > 992) {
        if (appLayout.classList.contains('sidebar-collapsed')) {
          icon.className = 'fas fa-bars';
        } else {
          icon.className = 'fas fa-times';
        }
      } else {
        icon.className = 'fas fa-bars';
        sidebar.classList.remove('open'); // Cerrar en cambios a móvil
      }
    }
  });
  
  // Inicializar icono según estado inicial
  if (toggleSidebarHeaderBtn) {
    const icon = toggleSidebarHeaderBtn.querySelector('i');
    if (appLayout.classList.contains('sidebar-collapsed')) {
      icon.className = 'fas fa-bars';
    } else {
      icon.className = 'fas fa-times';
    }
  }
}

// Mejorar la función para mostrar/ocultar el estado vacío
function showEmptyState(show) {
  if (show) {
    emptyState.style.display = 'flex';
    responseCard.style.display = 'none';
  } else {
    emptyState.style.display = 'none';
    responseCard.style.display = 'block';
  }
  
  // En caso de mostrar estado vacío, limpiar respuesta y ocultar botones
  if (show) {
    responseBox.innerHTML = '';
    actionButtons.style.display = 'none';
  }
}

// Función para aplicar los cambios de idioma
function applyLanguageChanges(lang) {
  // Si el idioma no existe en nuestras traducciones, usar español por defecto
  if (!translations[lang]) {
    lang = "es";
  }
  
  // Cambiar el título de la página
  document.title = "WAI - Plan your trip";
  
  // Cambiar textos en el sidebar
  document.querySelector('.sidebar-header h2').textContent = translations[lang].app_title;
  document.querySelector('.intro-card p').textContent = translations[lang].intro_text;
  
  // Sección de detalles del viaje
  const detailsTitle = document.querySelector('.card .section-title h3');
  if (detailsTitle && detailsTitle.textContent.includes("Detalles") || detailsTitle.textContent.includes("Details")) {
    detailsTitle.textContent = translations[lang].travel_details;
  }
  
  // Formulario de destino
  const destinoLabel = document.querySelector('label[for="destino-search"]');
  if (destinoLabel) destinoLabel.textContent = translations[lang].destination;
  
  const destinoSearch = document.getElementById('destino-search');
  if (destinoSearch) destinoSearch.placeholder = translations[lang].destination_placeholder;
  
  const destinoHelp = document.querySelector('#destino-search + small');
  if (destinoHelp) destinoHelp.textContent = translations[lang].destination_help;
  
  // Fechas
  const fechaInicioLabel = document.querySelector('label[for="fechaInicio"]');
  if (fechaInicioLabel) fechaInicioLabel.textContent = translations[lang].start_date;
  
  const fechaFinLabel = document.querySelector('label[for="fechaFin"]');
  if (fechaFinLabel) fechaFinLabel.textContent = translations[lang].end_date;
  
  // Alojamiento
  const alojamientoLabel = document.querySelector('label[for="alojamiento"]');
  if (alojamientoLabel) alojamientoLabel.textContent = translations[lang].accommodation;
  
  const alojamiento = document.getElementById('alojamiento');
  if (alojamiento) alojamiento.placeholder = translations[lang].accommodation_placeholder;
  
  // Intereses
  const interesesTitle = document.querySelector('.card .section-title h3');
  if (interesesTitle && interesesTitle.textContent.includes("Intereses") || interesesTitle.textContent.includes("Interests")) {
    interesesTitle.textContent = translations[lang].interests;
  }
  
  // Contador de intereses
  const interesCounter = document.querySelector('.selected-counter');
  if (interesCounter) {
    const counterNumber = interesCounter.querySelector('span');
    const counterText = translations[lang].interests_selected;
    interesCounter.childNodes[1].nodeValue = " " + counterText;
  }
  
  // Traducir los tooltips de intereses
  document.querySelectorAll('.interest-checkbox label').forEach(label => {
    const interesId = label.getAttribute('for');
    const checkbox = document.getElementById(interesId);
    if (checkbox && interestTranslations[lang] && interestTranslations[lang][checkbox.value]) {
      label.setAttribute('data-tooltip', interestTranslations[lang][checkbox.value]);
    }
  });
  
  // Reservas existentes
  const reservasLabel = document.querySelector('label[for="reservas-existentes"]');
  if (reservasLabel) reservasLabel.textContent = translations[lang].existing_bookings;
  
  const reservasTextarea = document.getElementById('reservas-existentes');
  if (reservasTextarea) reservasTextarea.placeholder = translations[lang].existing_bookings_placeholder;
  
  const reservasHelp = document.querySelector('#reservas-existentes + small');
  if (reservasHelp) reservasHelp.textContent = translations[lang].existing_bookings_help;
  
  // Transportes
  const transporteLabel = document.querySelector('.transport-options > label');
  if (transporteLabel) transporteLabel.textContent = translations[lang].transport_preferred;
  
  // Traducir etiquetas de transportes
  const transportMappings = {
    "transporte-caminando": "transport_walking",
    "transporte-auto": "transport_car",
    "transporte-bus": "transport_bus",
    "transporte-tren": "transport_train",
    "transporte-metro": "transport_metro",
    "transporte-bici": "transport_bike",
    "transporte-avion": "transport_plane",
    "transporte-barco": "transport_boat"
  };
  
  Object.entries(transportMappings).forEach(([id, key]) => {
    const label = document.querySelector(`label[for="${id}"]`);
    if (label) {
      const span = label.querySelector('span');
      if (span) span.textContent = translations[lang][key];
    }
  });
  
  // Preferencias
  const prefTitle = document.querySelector('.card .section-title h3');
  if (prefTitle && prefTitle.textContent.includes("Preferencias") || prefTitle.textContent.includes("Preferences")) {
    prefTitle.textContent = translations[lang].preferences;
  }
  
  // Presupuesto
  const presupuestoLabel = document.querySelector('label[for="presupuesto"]');
  if (presupuestoLabel) presupuestoLabel.textContent = translations[lang].budget;
  
  const presupuestoSelect = document.getElementById('presupuesto');
  if (presupuestoSelect) {
    Array.from(presupuestoSelect.options).forEach(option => {
      if (option.value === 'bajo') option.textContent = translations[lang].budget_low;
      if (option.value === 'medio') option.textContent = translations[lang].budget_medium;
      if (option.value === 'alto') option.textContent = translations[lang].budget_high;
    });
  }
  
  // Ritmo
  const ritmoLabel = document.querySelector('label[for="ritmo"]');
  if (ritmoLabel) ritmoLabel.textContent = translations[lang].pace;
  
  const ritmoSelect = document.getElementById('ritmo');
  if (ritmoSelect) {
    Array.from(ritmoSelect.options).forEach(option => {
      if (option.value === 'relajado') option.textContent = translations[lang].pace_slow;
      if (option.value === 'moderado') option.textContent = translations[lang].pace_medium;
      if (option.value === 'intenso') option.textContent = translations[lang].pace_fast;
    });
  }
  
  // Instrucciones adicionales
  const instruccionesLabel = document.querySelector('label[for="instrucciones"]');
  if (instruccionesLabel) instruccionesLabel.textContent = translations[lang].additional_instructions;
  
  const instrucciones = document.getElementById('instrucciones');
  if (instrucciones) instrucciones.placeholder = translations[lang].additional_placeholder;
  
  // Botón de generar
  const generarBtn = document.getElementById('generar-btn');
  if (generarBtn) {
    generarBtn.innerHTML = `<i class="fas fa-magic"></i> ${translations[lang].generate_btn}`;
  }
  
  // Estado vacío
  const emptyStateTitle = document.querySelector('.empty-state h3');
  if (emptyStateTitle) emptyStateTitle.textContent = translations[lang].start_adventure;
  
  const emptyStateText = document.querySelector('.empty-state p');
  if (emptyStateText) emptyStateText.textContent = translations[lang].start_adventure_text;
  
  // Área de respuesta
  const responseTitle = document.querySelector('.response-box .section-title h3');
  if (responseTitle) responseTitle.textContent = translations[lang].your_itinerary;
  
  // Botones de acción
  const copyBtn = document.getElementById('copiar-btn');
  if (copyBtn) copyBtn.innerHTML = `<i class="fas fa-copy"></i> ${translations[lang].copy_btn}`;
  
  const printBtn = document.getElementById('imprimir-btn');
  if (printBtn) printBtn.innerHTML = `<i class="fas fa-print"></i> ${translations[lang].print_btn}`;
  
  const pdfBtn = document.getElementById('pdf-btn');
  if (pdfBtn) pdfBtn.innerHTML = `<i class="fas fa-file-pdf"></i> ${translations[lang].pdf_btn}`;
  
  // Modal de idioma
  const languageModalTitle = document.querySelector('.language-modal h3');
  if (languageModalTitle) languageModalTitle.textContent = translations[lang].select_language;
  
  // Panel de ajustes
  const settingsTitle = document.querySelector('.settings-panel h2');
  if (settingsTitle) settingsTitle.textContent = translations[lang].settings;
  
  const darkModeText = document.querySelector('.setting-item span');
  if (darkModeText && darkModeText.textContent.includes("oscuro") || darkModeText.textContent.includes("Dark")) {
    darkModeText.textContent = translations[lang].dark_mode;
  }
  
  const languageSelectorLabel = document.querySelector('label[for="language-selector"]');
  if (languageSelectorLabel) languageSelectorLabel.textContent = translations[lang].language;
  
  const promptTemplateLabel = document.querySelector('label[for="prompt-template"]');
  if (promptTemplateLabel) promptTemplateLabel.textContent = translations[lang].prompt_template;
  
  const saveSettingsBtn = document.getElementById('save-settings');
  if (saveSettingsBtn) saveSettingsBtn.textContent = translations[lang].save_settings;
  
  // Texto de carga
  const loadingText = document.querySelector('#loading span');
  if (loadingText) loadingText.textContent = translations[lang].loading_text;
  
  // Botón de filtros (móvil)
  const filtersBtn = document.getElementById('sidebar-toggle');
  if (filtersBtn) filtersBtn.innerHTML = `<i class="fas fa-sliders-h"></i> ${translations[lang].filters}`;
}

// Función para guardar el itinerario actual en el historial
function guardarItinerarioEnHistorial(destino, fechaInicio, fechaFin, contenido) {
  // Obtener historial existente o crear uno nuevo
  const historial = JSON.parse(localStorage.getItem('itinerariosHistorial') || '[]');
  
  // Crear nuevo elemento de historial
  const nuevoItinerario = {
    id: Date.now(), // Usar timestamp como ID único
    destino,
    fechaInicio,
    fechaFin,
    contenido,
    fechaCreacion: new Date().toISOString()
  };
  
  // Añadir al inicio del historial (los más recientes primero)
  historial.unshift(nuevoItinerario);
  
  // Limitar a 10 itinerarios guardados para no ocupar demasiado espacio
  if (historial.length > 10) {
    historial.pop();
  }
  
  // Guardar en localStorage
  localStorage.setItem('itinerariosHistorial', JSON.stringify(historial));
  
  // Actualizar la interfaz del historial si está visible
  actualizarInterfazHistorial();
}

// Función para cargar y mostrar el historial de itinerarios
function mostrarHistorialItinerarios() {
  const historial = JSON.parse(localStorage.getItem('itinerariosHistorial') || '[]');
  
  // Crear o mostrar el panel de historial
  let historialPanel = document.getElementById('historial-panel');
  
  if (!historialPanel) {
    // Crear panel si no existe
    historialPanel = document.createElement('div');
    historialPanel.id = 'historial-panel';
    historialPanel.className = 'historial-panel';
    
    const panelHeader = document.createElement('div');
    panelHeader.className = 'historial-header';
    panelHeader.innerHTML = `
      <h2>Itinerarios guardados</h2>
      <button id="cerrar-historial" class="close-btn">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    const panelContent = document.createElement('div');
    panelContent.id = 'historial-content';
    panelContent.className = 'historial-content';
    
    historialPanel.appendChild(panelHeader);
    historialPanel.appendChild(panelContent);
    document.body.appendChild(historialPanel);
    
    // Añadir evento para cerrar panel
    document.getElementById('cerrar-historial').addEventListener('click', () => {
      historialPanel.classList.remove('active');
    });
  }
  
  // Actualizar contenido del panel
  const panelContent = document.getElementById('historial-content');
  panelContent.innerHTML = '';
  
  if (historial.length === 0) {
    panelContent.innerHTML = '<p class="no-data">No hay itinerarios guardados</p>';
  } else {
    historial.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'historial-item';
      itemElement.innerHTML = `
        <div class="historial-item-info">
          <h4>${item.destino}</h4>
          <p>Del ${formatearFecha(item.fechaInicio)} al ${formatearFecha(item.fechaFin)}</p>
          <span class="historial-fecha-creacion">Creado el ${formatearFechaCompleta(item.fechaCreacion)}</span>
        </div>
        <div class="historial-item-actions">
          <button class="cargar-itinerario-btn" data-id="${item.id}">
            <i class="fas fa-eye"></i> Ver
          </button>
          <button class="eliminar-itinerario-btn" data-id="${item.id}">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `;
      
      panelContent.appendChild(itemElement);
    });
    
    // Añadir eventos a los botones
    document.querySelectorAll('.cargar-itinerario-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        cargarItinerarioDesdeHistorial(id);
        historialPanel.classList.remove('active');
      });
    });
    
    document.querySelectorAll('.eliminar-itinerario-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        eliminarItinerarioDelHistorial(id);
      });
    });
  }
  
  // Mostrar panel
  historialPanel.classList.add('active');
}

// Función para cargar un itinerario desde el historial
function cargarItinerarioDesdeHistorial(id) {
  const historial = JSON.parse(localStorage.getItem('itinerariosHistorial') || '[]');
  const itinerario = historial.find(item => item.id === id);
  
  if (itinerario) {
    // Establecer los valores del formulario
    document.getElementById('destino').value = itinerario.destino;
    document.getElementById('fechaInicio').value = itinerario.fechaInicio;
    document.getElementById('fechaFin').value = itinerario.fechaFin;
    
    // Procesar y mostrar el itinerario
    procesarRespuesta(itinerario.contenido, itinerario.destino, itinerario.fechaInicio, itinerario.fechaFin);
  }
}

// Función para eliminar un itinerario del historial
function eliminarItinerarioDelHistorial(id) {
  if (confirm('¿Estás seguro de que deseas eliminar este itinerario?')) {
    let historial = JSON.parse(localStorage.getItem('itinerariosHistorial') || '[]');
    historial = historial.filter(item => item.id !== id);
    localStorage.setItem('itinerariosHistorial', JSON.stringify(historial));
    
    // Actualizar la interfaz
    actualizarInterfazHistorial();
  }
}

// Función para actualizar la interfaz del historial si está visible
function actualizarInterfazHistorial() {
  const historialPanel = document.getElementById('historial-panel');
  if (historialPanel && historialPanel.classList.contains('active')) {
    mostrarHistorialItinerarios();
  }
}

// Función auxiliar para formatear fechas completas
function formatearFechaCompleta(fechaStr) {
  const fecha = new Date(fechaStr);
  return fecha.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Añadir event listener para el botón de historial
document.addEventListener('DOMContentLoaded', function() {
  // Añadir a los event listeners existentes
  const historialBtn = document.getElementById('historial-btn');
  if (historialBtn) {
    historialBtn.addEventListener('click', mostrarHistorialItinerarios);
  }
});

// Configurar el selector de destinos múltiples
function setupDestino() {
  const destinoSearch = document.getElementById('destino-search');
  const destinoDropdown = document.getElementById('destino-dropdown');
  const destinoTags = document.getElementById('destino-tags');
  const destinoInput = document.getElementById('destino');
  
  // Populate dropdown with continents and countries
  function populateDropdown(filter = '') {
    destinoDropdown.innerHTML = '';
    const filterLower = filter.toLowerCase();
    
    // Crear grupos para continentes y países
    const continenteGroup = document.createElement('div');
    continenteGroup.className = 'destino-group';
    continenteGroup.innerHTML = '<div class="destino-group-title">Continentes</div>';
    
    const paisGroup = document.createElement('div');
    paisGroup.className = 'destino-group';
    paisGroup.innerHTML = '<div class="destino-group-title">Países</div>';
    
    let hasContinentes = false;
    let hasPaises = false;
    
    // Añadir continentes
    Object.keys(continentes).forEach(continente => {
      if (!filter || continente.toLowerCase().includes(filterLower)) {
        const option = document.createElement('div');
        option.className = 'destino-option continente';
        option.textContent = continente;
        option.dataset.tipo = 'continente';
        option.dataset.valor = continente;
        
        option.addEventListener('click', () => {
          añadirDestino(continente, 'continente');
          destinoSearch.value = '';
          destinoDropdown.classList.remove('active');
        });
        
        continenteGroup.appendChild(option);
        hasContinentes = true;
      }
    });
    
    // Añadir países
    Object.keys(continentes).forEach(continente => {
      continentes[continente].forEach(pais => {
        if (!filter || pais.toLowerCase().includes(filterLower)) {
          const option = document.createElement('div');
          option.className = 'destino-option';
          option.textContent = pais;
          option.dataset.tipo = 'pais';
          option.dataset.valor = pais;
          option.dataset.continente = continente;
          
          option.addEventListener('click', () => {
            añadirDestino(pais, 'pais', continente);
            destinoSearch.value = '';
            destinoDropdown.classList.remove('active');
          });
          
          paisGroup.appendChild(option);
          hasPaises = true;
        }
      });
    });
    
    if (hasContinentes) {
      destinoDropdown.appendChild(continenteGroup);
    }
    
    if (hasPaises) {
      destinoDropdown.appendChild(paisGroup);
    }
    
    if (!hasContinentes && !hasPaises) {
      destinoDropdown.innerHTML = '<div class="destino-option no-results">No se encontraron resultados</div>';
    }
  }
  
  // Añadir un destino a la selección
  function añadirDestino(valor, tipo, continente = null) {
    // Verificar si ya está seleccionado
    if (destinosSeleccionados.some(d => d.valor === valor && d.tipo === tipo)) {
      return;
    }
    
    // Si es un continente, verificar si ya hay países de ese continente
    if (tipo === 'continente') {
      const paisesDelContinente = destinosSeleccionados.filter(d => d.continente === valor);
      if (paisesDelContinente.length > 0) {
        // Preguntar si reemplazar los países por el continente
        if (confirm(`Ya tienes ${paisesDelContinente.length} países de ${valor} seleccionados. ¿Quieres seleccionar todo el continente en su lugar?`)) {
          // Eliminar los países individuales
          paisesDelContinente.forEach(p => eliminarDestino(p.valor));
        } else {
          return;
        }
      }
    }
    
    // Si es un país, verificar si ya está seleccionado su continente
    if (tipo === 'pais' && destinosSeleccionados.some(d => d.tipo === 'continente' && d.valor === continente)) {
      alert(`Ya tienes seleccionado el continente ${continente}, que incluye ${valor}.`);
      return;
    }
    
    const nuevoDestino = { valor, tipo, continente };
    destinosSeleccionados.push(nuevoDestino);
    
    const tag = document.createElement('div');
    tag.className = `destino-tag ${tipo === 'continente' ? 'continente' : ''}`;
    tag.innerHTML = `
      ${valor}
      <span class="remove-tag" data-valor="${valor}" data-tipo="${tipo}">
        <i class="fas fa-times"></i>
      </span>
    `;
    
    tag.querySelector('.remove-tag').addEventListener('click', function() {
      eliminarDestino(this.dataset.valor);
    });
    
    destinoTags.appendChild(tag);
    actualizarDestinoInput();
  }
  
  // Eliminar un destino de la selección
  function eliminarDestino(valor) {
    const index = destinosSeleccionados.findIndex(d => d.valor === valor);
    if (index !== -1) {
      destinosSeleccionados.splice(index, 1);
      actualizarDestinoTags();
      actualizarDestinoInput();
    }
  }
  
  // Actualizar el campo oculto con los destinos seleccionados
  function actualizarDestinoInput() {
    // Formatear los destinos para el campo oculto
    const destinosTexto = destinosSeleccionados.map(d => d.valor).join(', ');
    destinoInput.value = destinosTexto;
  }
  
  // Actualizar las etiquetas visuales de los destinos
  function actualizarDestinoTags() {
    destinoTags.innerHTML = '';
    destinosSeleccionados.forEach(destino => {
      const tag = document.createElement('div');
      tag.className = `destino-tag ${destino.tipo === 'continente' ? 'continente' : ''}`;
      tag.innerHTML = `
        ${destino.valor}
        <span class="remove-tag" data-valor="${destino.valor}" data-tipo="${destino.tipo}">
          <i class="fas fa-times"></i>
        </span>
      `;
      
      tag.querySelector('.remove-tag').addEventListener('click', function() {
        eliminarDestino(this.dataset.valor);
      });
      
      destinoTags.appendChild(tag);
    });
  }
  
  // Event listeners
  destinoSearch.addEventListener('focus', () => {
    populateDropdown();
    destinoDropdown.classList.add('active');
  });
  
  destinoSearch.addEventListener('input', () => {
    populateDropdown(destinoSearch.value);
    destinoDropdown.classList.add('active');
  });
  
  document.addEventListener('click', (e) => {
    const isClickInside = destinoSearch.contains(e.target) || 
                       destinoDropdown.contains(e.target) ||
                       destinoTags.contains(e.target);
    
    if (!isClickInside) {
      destinoDropdown.classList.remove('active');
    }
  });
  
  // Inicializar
  populateDropdown();
}

// Añadir función para actualizar el contador de intereses
function updateInterestCounter() {
  const counter = document.getElementById('interest-counter');
  if (counter) {
    const selectedCount = document.querySelectorAll('.interest-checkbox input[type="checkbox"]:checked').length;
    counter.textContent = selectedCount;
  }
}

// Actualizar la función de guardar itinerario
function guardarItinerario(itinerario, nombre) {
  // Obtener datos actuales
  const destino = document.getElementById('destino').value;
  const fechaInicio = document.getElementById('fechaInicio').value;
  const fechaFin = document.getElementById('fechaFin').value;
  // Añadir el nuevo campo
  const reservasExistentes = document.getElementById('reservas-existentes').value;
  
  // Crear objeto de itinerario
  const itinerarioObj = {
    id: Date.now(),
    nombre: nombre,
    destino: destino,
    fechaInicio: fechaInicio,
    fechaFin: fechaFin,
    contenido: itinerario,
    fechaCreacion: new Date().toISOString(),
    reservasExistentes: reservasExistentes
  };
  
  // Obtener itinerarios guardados
  let itinerariosGuardados = JSON.parse(localStorage.getItem('itinerarios') || '[]');
  itinerariosGuardados.push(itinerarioObj);
  localStorage.setItem('itinerarios', JSON.stringify(itinerariosGuardados));
  
  // Mostrar notificación
  showNotification('Itinerario guardado correctamente');
}

// Función para cerrar el modal de idioma
function closeLanguageModal() {
  languageModal.classList.remove('open');
  overlay.classList.remove('open');
}

// Función para cambiar el idioma
function changeLanguage(lang) {
  // Guardar la preferencia
  localStorage.setItem('language', lang);
  
  // Actualizar el selector en la configuración 
  languageSelector.value = lang;
  
  // Aplicar cambios
  applyLanguageChanges(lang);
  
  // Mostrar notificación
  const messages = {
    'es': 'Idioma cambiado a Español',
    'en': 'Language changed to English',
    'fr': 'Langue changée en Français',
    'de': 'Sprache zu Deutsch geändert',
    'it': 'Lingua cambiata in Italiano',
    'pt': 'Idioma alterado para Português'
  };
  
  showNotification(messages[lang] || 'Idioma cambiado correctamente');
} 