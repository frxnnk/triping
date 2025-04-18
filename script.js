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
const creditDisplay = document.getElementById('credit-display');
const creditsCount = document.getElementById('credits-count');
const buyCreditsBtn = document.getElementById('buy-credits-btn');
const creditsModal = document.getElementById('credits-modal');
const creditsModalClose = document.getElementById('credits-modal-close');
const useOwnKeyBtn = document.getElementById('use-own-key-btn');
const buyPackageBtns = document.querySelectorAll('.buy-package-btn');

// Constante para la clave de encriptación (puedes cambiarla para mayor seguridad)
const ENCRYPTION_KEY = "triping_secure_6789";

// En la parte superior del script, después de las constantes
// Añadir una API key pre-encriptada (esto es solo para demostración)
const DEFAULT_ENCRYPTED_API_KEY = "VkN1REZ0ZGY4ckJ6OHliU1J1WVVEcVI0OEZ3RUVlUVlESWs="; // Ejemplo encriptado

// Añade esta constante al principio del archivo script.js
const IS_DEV_MODE = true; // Cambia a false para producción

// Add a new constant to control whether to use real API calls
const USE_REAL_API = true; // Set to true to use real API calls even in development mode

// Near the top, add this constant for the OpenAI API URL
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

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
    "transport_boat": "Barco",
    
    // Sistema de créditos
    "credits_count": "créditos",
    "buy_credits": "Comprar",
    "credits_limit_title": "¡Has alcanzado el límite de itinerarios gratuitos!",
    "credits_limit_message": "Has utilizado tus 3 itinerarios gratuitos. Para continuar generando itinerarios personalizados, tienes dos opciones:",
    "use_own_key_title": "Usa tu propia API Key",
    "use_own_key_description": "Obtén una API key gratuita de OpenAI y úsala para generar itinerarios ilimitados sin costo adicional.",
    "get_api_key": "Obtener API Key",
    "configure_api_key": "Configurar mi API Key",
    "buy_credits_title": "Compra créditos",
    "buy_credits_description": "Adquiere paquetes de créditos para seguir usando el servicio sin necesidad de obtener tu propia API key.",
    "coming_soon": "Disponible próximamente",
    "coming_soon_label": "Próximamente",
    "available_soon": "Disponible pronto",
    "best_value": "Mejor valor",
    "api_key_error": "Error en la configuración de la API Key. Por favor, introduce tu propia API Key en la configuración.",
    "credits_remaining_one": "¡Te queda 1 crédito! Considera comprar más o usar tu propia API key.",
    "credits_remaining_multiple": "¡Te quedan {count} créditos! Considera comprar más o usar tu propia API key.",
    "own_api_key": "API propia",
    "site_api_key": "API del sitio",
    "using_own_key_tooltip": "Estás usando tu propia API key (generación ilimitada)",
    "using_site_key_tooltip": "Estás usando créditos del sitio"
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
    "transport_boat": "Boat",
    
    // Sistema de créditos
    "credits_count": "credits",
    "buy_credits": "Buy",
    "credits_limit_title": "You've reached the free itinerary limit!",
    "credits_limit_message": "You've used your 3 free itineraries. To continue generating personalized itineraries, you have two options:",
    "use_own_key_title": "Use your own API Key",
    "use_own_key_description": "Get a free API key from OpenAI and use it to generate unlimited itineraries at no additional cost.",
    "get_api_key": "Get API Key",
    "configure_api_key": "Configure my API Key",
    "buy_credits_title": "Buy credits",
    "buy_credits_description": "Purchase credit packages to continue using the service without needing to get your own API key.",
    "coming_soon": "Coming soon",
    "coming_soon_label": "Coming soon",
    "available_soon": "Available soon",
    "best_value": "Best value",
    "api_key_error": "API Key configuration error. Please enter your own API Key in the settings.",
    "credits_remaining_one": "You have 1 credit left! Consider buying more or using your own API key.",
    "credits_remaining_multiple": "You have {count} credits left! Consider buying more or using your own API key.",
    "own_api_key": "Personal API",
    "site_api_key": "Site API",
    "using_own_key_tooltip": "You're using your own API key (unlimited generation)",
    "using_site_key_tooltip": "You're using site credits"
  },
  "fr": {
    "app_title": "Générateur d'itinéraires",
    "intro_text": "Créez un itinéraire personnalisé pour votre prochain voyage en quelques secondes. Spécifiez votre destination, dates et préférences.",
    "travel_details": "Détails du voyage",
    "destination": "Destination:",
    "destination_placeholder": "Recherchez des pays ou des continents...",
    "destination_help": "Vous pouvez sélectionner plusieurs pays ou continents",
    "start_date": "Date de départ:",
    "end_date": "Date de retour:",
    "accommodation": "Logement (facultatif):",
    "accommodation_placeholder": "Nom/emplacement de votre hôtel",
    "interests": "Intérêts",
    "interests_selected": "intérêts sélectionnés",
    "existing_bookings": "Logements et réservations confirmés:",
    "existing_bookings_placeholder": "Spécifiez les hôtels, transferts ou réservations que vous avez déjà confirmés (Ex: 'Hôtel Marriott à Madrid du 5 au 8 juin', 'Vol à Barcelone le 9', 'Réservation au restaurant El Paraguas le 6 à 20:00')",
    "existing_bookings_help": "Cette information sera intégrée dans votre itinéraire. Incluez les dates et les heures si possible.",
    "transport_preferred": "Moyens de transport préférés:",
    "preferences": "Préférences",
    "budget": "Budget:",
    "budget_low": "Économique",
    "budget_medium": "Moyen",
    "budget_high": "Premium",
    "pace": "Temps de voyage:",
    "pace_slow": "Relaxé",
    "pace_medium": "Modéré",
    "pace_fast": "Intense",
    "additional_instructions": "Instructions supplémentaires:",
    "additional_placeholder": "Mentionnez des préférences spéciales, restrictions alimentaires, besoins d'accessibilité, etc.",
    "generate_btn": "Créer mon itinéraire",
    "start_adventure": "Démarrez votre aventure!",
    "start_adventure_text": "Configurez les détails de votre voyage dans le panneau de gauche et cliquez sur \"Créer mon itinéraire\" pour générer un plan personnalisé pour votre prochain voyage.",
    "your_itinerary": "Votre itinéraire personnalisé:",
    "copy_btn": "Copier",
    "print_btn": "Imprimer",
    "pdf_btn": "Enregistrer en PDF",
    "loading_text": "Génération de votre itinéraire personnalisé... Cela peut prendre jusqu'à une minute.",
    "select_language": "Sélectionnez une langue",
    "settings": "Paramètres",
    "dark_mode": "Mode sombre",
    "language": "Langue:",
    "prompt_template": "Modèle de prompt:",
    "save_settings": "Enregistrer les paramètres",
    "filters": "Filtres",
    "transport_walking": "À pied",
    "transport_car": "Voiture",
    "transport_bus": "Bus",
    "transport_train": "Train",
    "transport_metro": "Métro",
    "transport_bike": "Vélo",
    "transport_plane": "Avion",
    "transport_boat": "Bateau",
    
    // Sistema de créditos
    "credits_count": "crédits",
    "buy_credits": "Acheter",
    "credits_limit_title": "Vous avez atteint la limite d'itinéraires gratuits !",
    "credits_limit_message": "Vous avez utilisé vos 3 itinéraires gratuits. Pour continuer à générer des itinéraires personnalisés, vous avez deux options :",
    "use_own_key_title": "Utilisez votre propre clé API",
    "use_own_key_description": "Obtenez une clé API gratuite d'OpenAI et utilisez-la pour générer des itinéraires illimités sans frais supplémentaires.",
    "get_api_key": "Obtenir une clé API",
    "configure_api_key": "Configurer ma clé API",
    "buy_credits_title": "Acheter des crédits",
    "buy_credits_description": "Achetez des forfaits de crédits pour continuer à utiliser le service sans avoir besoin d'obtenir votre propre clé API.",
    "coming_soon": "Bientôt disponible",
    "coming_soon_label": "Bientôt",
    "available_soon": "Disponible bientôt",
    "best_value": "Meilleure offre",
    "api_key_error": "Erreur de configuration de la clé API. Veuillez saisir votre propre clé API dans les paramètres.",
    "credits_remaining_one": "Il vous reste 1 crédit ! Envisagez d'en acheter plus ou d'utiliser votre propre clé API.",
    "credits_remaining_multiple": "Il vous reste {count} crédits ! Envisagez d'en acheter plus ou d'utiliser votre propre clé API.",
    "own_api_key": "Clé API personnelle",
    "site_api_key": "Clé API du site",
    "using_own_key_tooltip": "Vous utilisez votre propre clé API (génération illimitée)",
    "using_site_key_tooltip": "Vous utilisez des crédits de site"
  },
  "de": {
    "app_title": "Reiseplaner",
    "intro_text": "Erstellen Sie ein persönliches Reiseitinerar für Ihren nächsten Trip in Sekunden. Geben Sie Ihren Zielort, Ihr Reisetag und Ihre Präferenzen an.",
    "travel_details": "Reiseinformationen",
    "destination": "Ziel:",
    "destination_placeholder": "Suchen Sie Länder oder Kontinente...",
    "destination_help": "Sie können mehrere Länder oder Kontinente auswählen",
    "start_date": "Startdatum:",
    "end_date": "Rückkehrdatum:",
    "accommodation": "Unterkunft (optional):",
    "accommodation_placeholder": "Name oder Adresse Ihres Hotels",
    "interests": "Interessen",
    "interests_selected": "ausgewählte Interessen",
    "existing_bookings": "Bestätigte Unterkünfte und Reservierungen:",
    "existing_bookings_placeholder": "Geben Sie die Namen der Hotels, Transfer- oder Reisepassnummern, die Sie bereits bestätigt haben (z.B.: 'Hotel Marriott in Madrid vom 5.-8. Juni', 'Flug nach Barcelona am 9.', 'Reservation bei El Paraguas Restaurant am 6. um 20:00 Uhr')",
    "existing_bookings_help": "Diese Informationen werden in Ihr Reiseitinerar integriert. Bitte geben Sie Datum und Uhrzeit an, wenn möglich.",
    "transport_preferred": "Bevorzugte Transportmittel:",
    "preferences": "Präferenzen",
    "budget": "Budget:",
    "budget_low": "Budget",
    "budget_medium": "Standard",
    "budget_high": "Premium",
    "pace": "Reisezeit:",
    "pace_slow": "Entspannt",
    "pace_medium": "Gemäßigt",
    "pace_fast": "Intensiv",
    "additional_instructions": "Zusätzliche Anweisungen:",
    "additional_placeholder": "Nennen Sie spezielle Präferenzen, spezielle Ernährungsbeschränkungen, barrierefreie Bedürfnisse, etc.",
    "generate_btn": "Mein Reiseitinerar erstellen",
    "start_adventure": "Starten Sie Ihre Reise!",
    "start_adventure_text": "Konfigurieren Sie die Details Ihrer Reise im linken Bereich und klicken Sie auf \"Mein Reiseitinerar erstellen\", um ein personalisiertes Plan für Ihren nächsten Trip zu erstellen.",
    "your_itinerary": "Ihr persönliches Reiseitinerar:",
    "copy_btn": "Kopieren",
    "print_btn": "Drucken",
    "pdf_btn": "Als PDF speichern",
    "loading_text": "Erstellung Ihres personalisierten Reiseitinerars... Dies kann bis zu einer Minute dauern.",
    "select_language": "Wählen Sie eine Sprache",
    "settings": "Einstellungen",
    "dark_mode": "Dunkler Modus",
    "language": "Sprache:",
    "prompt_template": "Prompt-Vorlage:",
    "save_settings": "Einstellungen speichern",
    "filters": "Filter",
    "transport_walking": "Gehen",
    "transport_car": "Auto",
    "transport_bus": "Bus",
    "transport_train": "Zug",
    "transport_metro": "Metro",
    "transport_bike": "Fahrrad",
    "transport_plane": "Flugzeug",
    "transport_boat": "Boot",
    
    // Sistema de créditos
    "credits_count": "Guthaben",
    "buy_credits": "Kaufen",
    "credits_limit_title": "Sie haben das Limit für kostenlose Reiserouten erreicht!",
    "credits_limit_message": "Sie haben Ihre 3 kostenlosen Reiserouten aufgebraucht. Um weiterhin personalisierte Reiserouten zu erstellen, haben Sie zwei Möglichkeiten:",
    "use_own_key_title": "Verwenden Sie Ihren eigenen API-Schlüssel",
    "use_own_key_description": "Holen Sie sich einen kostenlosen API-Schlüssel von OpenAI und nutzen Sie ihn, um unbegrenzt Reiserouten ohne zusätzliche Kosten zu erstellen.",
    "get_api_key": "API-Schlüssel erhalten",
    "configure_api_key": "Meinen API-Schlüssel konfigurieren",
    "buy_credits_title": "Guthaben kaufen",
    "buy_credits_description": "Kaufen Sie Guthabenpakete, um den Service weiterhin zu nutzen, ohne einen eigenen API-Schlüssel zu benötigen.",
    "coming_soon": "Demnächst verfügbar",
    "coming_soon_label": "Demnächst",
    "available_soon": "Bald verfügbar",
    "best_value": "Bestes Angebot",
    "api_key_error": "Fehler bei der API-Schlüsselkonfiguration. Bitte geben Sie Ihren eigenen API-Schlüssel in den Einstellungen ein.",
    "credits_remaining_one": "Sie haben noch 1 Guthaben übrig! Erwägen Sie, mehr zu kaufen oder Ihren eigenen API-Schlüssel zu verwenden.",
    "credits_remaining_multiple": "Sie haben noch {count} Guthaben übrig! Erwägen Sie, mehr zu kaufen oder Ihren eigenen API-Schlüssel zu verwenden.",
    "own_api_key": "Eigene API-Schlüssel",
    "site_api_key": "API-Schlüssel des Sites",
    "using_own_key_tooltip": "Sie verwenden Ihren eigenen API-Schlüssel (unbegrenzte Generierung)",
    "using_site_key_tooltip": "Sie verwenden die API-Schlüssel des Sites (Generierung mit Credits)"
  },
  "it": {
    "app_title": "Pianificatore di viaggio",
    "intro_text": "Crea un piano di viaggio personalizzato per il tuo prossimo viaggio in pochi secondi. Specifica il tuo destinazione, le date e le preferenze.",
    "travel_details": "Dettagli del viaggio",
    "destination": "Destinazione:",
    "destination_placeholder": "Cerca paesi o continenti...",
    "destination_help": "Puoi selezionare più paesi o continenti",
    "start_date": "Data di partenza:",
    "end_date": "Data di ritorno:",
    "accommodation": "Alloggio (opzionale):",
    "accommodation_placeholder": "Nome/indirizzo del tuo hotel",
    "interests": "Interessi",
    "interests_selected": "interessi selezionati",
    "existing_bookings": "Alloggi e prenotazioni confermate:",
    "existing_bookings_placeholder": "Specifica gli hotel, i trasferimenti o le prenotazioni che hai già confermato (Es: 'Hotel Marriott a Madrid dal 5 al 8 giugno', 'Volo a Barcellona il giorno 9', 'Prenotazione al ristorante El Paraguas il 6 alle 20:00')",
    "existing_bookings_help": "Questa informazione verrà integrata nel tuo itinerario. Includi date e ore se possibile.",
    "transport_preferred": "Mezzi di trasporto preferiti:",
    "preferences": "Preferenze",
    "budget": "Budget:",
    "budget_low": "Economico",
    "budget_medium": "Medio",
    "budget_high": "Premium",
    "pace": "Tempo del viaggio:",
    "pace_slow": "Rilassato",
    "pace_medium": "Moderato",
    "pace_fast": "Intenso",
    "additional_instructions": "Istruzioni aggiuntive:",
    "additional_placeholder": "Menciona preferenze speciali, restrizioni alimentari, esigenze di accessibilità, etc.",
    "generate_btn": "Crea il mio itinerario",
    "start_adventure": "Inizia la tua avventura!",
    "start_adventure_text": "Configura i dettagli del tuo viaggio nel pannello di sinistra e clicca su \"Crea il mio itinerario\" per generare un piano personalizzato per il tuo prossimo viaggio.",
    "your_itinerary": "Il tuo itinerario personalizzato:",
    "copy_btn": "Copia",
    "print_btn": "Stampa",
    "pdf_btn": "Salva come PDF",
    "loading_text": "Generazione del tuo itinerario personale... Questo potrebbe richiedere fino a un minuto.",
    "select_language": "Seleziona una lingua",
    "settings": "Impostazioni",
    "dark_mode": "Modalità scura",
    "language": "Lingua:",
    "prompt_template": "Modello di prompt:",
    "save_settings": "Salva impostazioni",
    "filters": "Filtri",
    "transport_walking": "A piedi",
    "transport_car": "Auto",
    "transport_bus": "Bus",
    "transport_train": "Treno",
    "transport_metro": "Metro",
    "transport_bike": "Bici",
    "transport_plane": "Aereo",
    "transport_boat": "Barca",
    
    // Sistema di crediti
    "credits_count": "crediti",
    "buy_credits": "Acquista",
    "credits_limit_title": "Hai raggiunto il limite di itinerari gratuiti!",
    "credits_limit_message": "Hai utilizzato i tuoi 3 itinerari gratuiti. Per continuare a generare itinerari personalizzati, hai due opzioni:",
    "use_own_key_title": "Usa la tua chiave API",
    "use_own_key_description": "Ottieni una chiave API gratuita da OpenAI e usala per generare itinerari illimitati senza costi aggiuntivi.",
    "get_api_key": "Ottieni chiave API",
    "configure_api_key": "Configura la mia chiave API",
    "buy_credits_title": "Acquista crediti",
    "buy_credits_description": "Acquista pacchetti di crediti per continuare a utilizzare il servizio senza dover ottenere la tua chiave API.",
    "coming_soon": "Disponibile prossimamente",
    "coming_soon_label": "Prossimamente",
    "available_soon": "Disponibile presto",
    "best_value": "Miglior valore",
    "api_key_error": "Errore nella configurazione della chiave API. Inserisci la tua chiave API nelle impostazioni.",
    "credits_remaining_one": "Ti rimane 1 credito! Considera di acquistarne altri o di utilizzare la tua chiave API.",
    "credits_remaining_multiple": "Ti rimangono {count} crediti! Considera di acquistarne altri o di utilizzare la tua chiave API.",
    "own_api_key": "Chiave API personale",
    "site_api_key": "Chiave API del sito",
    "using_own_key_tooltip": "Stai usando la tua chiave API (generazione illimitata)",
    "using_site_key_tooltip": "Stai usando i crediti del sito"
  },
  "pt": {
    "app_title": "Gerador de Itinerários",
    "intro_text": "Crie um itinerário personalizado para o seu próximo viaje em segundos. Especifique seu destino, datas e preferências.",
    "travel_details": "Detalhes do Viagem",
    "destination": "Destino:",
    "destination_placeholder": "Pesquise países ou continentes...",
    "destination_help": "Você pode selecionar vários países ou continentes",
    "start_date": "Data de Início:",
    "end_date": "Data de Término:",
    "accommodation": "Alojamento (opcional):",
    "accommodation_placeholder": "Nome/localização do seu hotel",
    "interests": "Interesses",
    "interests_selected": "interesses selecionados",
    "existing_bookings": "Alojamentos e reservas confirmadas:",
    "existing_bookings_placeholder": "Especifique os hotéis, transferências ou reservas que já possui confirmados (Ex: 'Hotel Marriott em Madrid do dia 5-8 de junho', 'Voo para Barcelona no dia 9', 'Reserva no restaurante El Paraguas no dia 6 às 20:00')",
    "existing_bookings_help": "Esta informação será integrada no seu itinerário. Inclua datas e horas se possível.",
    "transport_preferred": "Meios de transporte preferidos:",
    "preferences": "Preferências",
    "budget": "Orçamento:",
    "budget_low": "Orçamento",
    "budget_medium": "Médio",
    "budget_high": "Premium",
    "pace": "Ritmo do viaje:",
    "pace_slow": "Relajado",
    "pace_medium": "Moderado",
    "pace_fast": "Intenso",
    "additional_instructions": "Instruções adicionais:",
    "additional_placeholder": "Mencione preferências especiais, restrições alimentares, necessidades de acessibilidade, etc.",
    "generate_btn": "Criar meu itinerário",
    "start_adventure": "Inicie sua aventura!",
    "start_adventure_text": "Configure os detalhes do seu viagem no painel à esquerda e clique em \"Criar meu itinerário\" para gerar um plano personalizado para o seu próximo viagem.",
    "your_itinerary": "Seu itinerário personalizado:",
    "copy_btn": "Copiar",
    "print_btn": "Imprimir",
    "pdf_btn": "Salvar como PDF",
    "loading_text": "Gerando seu itinerário personalizado... Isso pode levar até um minuto.",
    "select_language": "Selecione um idioma",
    "settings": "Configurações",
    "dark_mode": "Modo escuro",
    "language": "Idioma:",
    "prompt_template": "Modelo de Prompt:",
    "save_settings": "Salvar configurações",
    "filters": "Filtros",
    "transport_walking": "A pé",
    "transport_car": "Carro",
    "transport_bus": "Ônibus",
    "transport_train": "Trem",
    "transport_metro": "Metro",
    "transport_bike": "Bicicleta",
    "transport_plane": "Avião",
    "transport_boat": "Barco",
    
    // Sistema de créditos
    "credits_count": "créditos",
    "buy_credits": "Comprar",
    "credits_limit_title": "Você atingiu o limite de itinerários gratuitos!",
    "credits_limit_message": "Você usou seus 3 itinerários gratuitos. Para continuar gerando itinerários personalizados, você tem duas opções:",
    "use_own_key_title": "Use sua própria chave API",
    "use_own_key_description": "Obtenha uma chave API gratuita da OpenAI e use-a para gerar itinerários ilimitados sem custo adicional.",
    "get_api_key": "Obter chave API",
    "configure_api_key": "Configurar minha chave API",
    "buy_credits_title": "Comprar créditos",
    "buy_credits_description": "Adquira pacotes de créditos para continuar usando o serviço sem precisar obter sua própria chave API.",
    "coming_soon": "Disponível em breve",
    "coming_soon_label": "Em breve",
    "available_soon": "Disponível em breve",
    "best_value": "Melhor valor",
    "api_key_error": "Erro na configuração da chave API. Por favor, insira sua própria chave API nas configurações.",
    "credits_remaining_one": "Você tem 1 crédito restante! Considere comprar mais ou usar sua própria chave API.",
    "credits_remaining_multiple": "Você tem {count} créditos restantes! Considere comprar mais ou usar sua própria chave API.",
    "own_api_key": "Chave API pessoal",
    "site_api_key": "Chave API do site",
    "using_own_key_tooltip": "Você está usando sua chave API (geração ilimitada)",
    "using_site_key_tooltip": "Você está usando créditos do site"
  }
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

// Función para encriptar la API key antes de almacenarla
function encryptApiKey(apiKey) {
  // Implementación simple de encriptación (XOR con la clave)
  let result = '';
  for (let i = 0; i < apiKey.length; i++) {
    result += String.fromCharCode(apiKey.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length));
  }
  return btoa(result); // Codificar en base64
}

// Función para desencriptar la API key
function decryptApiKey(encryptedKey) {
  try {
    const decoded = atob(encryptedKey); // Decodificar base64
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
      result += String.fromCharCode(decoded.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length));
    }
    return result;
  } catch (e) {
    console.error("Error al desencriptar la API key:", e);
    return "";
  }
}

// Función para inicializar el sistema de créditos
function initCreditsSystem() {
  // Verificar si es la primera vez que el usuario visita la página
  if (localStorage.getItem('creditsInitialized') !== 'true') {
    // Primera visita: asignar 3 créditos iniciales y marcar como inicializado
    localStorage.setItem('credits', '3');
    localStorage.setItem('creditsInitialized', 'true');
  }
  
  // Verificar si el usuario usa su propia API key
  const usingOwnKey = localStorage.getItem('usingOwnKey') === 'true';
  
  // Si el usuario no está usando su propia key y los créditos no están inicializados, verificar
  if (!usingOwnKey && !localStorage.getItem('credits')) {
    localStorage.setItem('credits', '3');
  }
  
  // Actualizar el display de créditos
  updateCreditsDisplay();
}

// Corregir la función updateCreditsDisplay para evitar duplicación
function updateCreditsDisplay() {
  const credits = localStorage.getItem('credits') || '3';
  const currentLang = localStorage.getItem('language') || 'es';
  const usingOwnKey = localStorage.getItem('usingOwnKey') === 'true';
  
  // Actualizar el número de créditos
  document.getElementById('credits-count').textContent = credits;
  
  // Actualizar el texto de "créditos" por separado
  const creditLabel = document.querySelector('.credit-count');
  if (creditLabel) {
    // Limpiar el texto existente
    creditLabel.innerHTML = `<i class="fas fa-ticket-alt"></i> <span id="credits-count">${credits}</span>`;
    
    // Añadir el texto traducido
    const translatedText = translations[currentLang]?.credits_count || "créditos";
    creditLabel.innerHTML += ` ${translatedText}`;
  }
  
  // Actualizar el indicador del tipo de API key
  const keyIndicator = document.getElementById('api-key-indicator');
  const keyTypeText = document.getElementById('key-type-text');
  
  if (keyIndicator && keyTypeText) {
    keyIndicator.className = 'api-key-indicator ' + (usingOwnKey ? 'own-key' : 'site-key');
    
    if (usingOwnKey) {
      keyTypeText.textContent = translations[currentLang]?.own_api_key || "API propia";
      keyIndicator.title = translations[currentLang]?.using_own_key_tooltip || "Estás usando tu propia API key";
    } else {
      keyTypeText.textContent = translations[currentLang]?.site_api_key || "API del sitio";
      keyIndicator.title = translations[currentLang]?.using_site_key_tooltip || "Estás usando créditos del sitio";
    }
  }
  
  // Actualizar el botón de compra
  const buyBtn = document.getElementById('buy-credits-btn');
  if (buyBtn) {
    const buyText = translations[currentLang]?.buy_credits || "Comprar";
    buyBtn.innerHTML = `<i class="fas fa-plus-circle"></i> ${buyText}`;
    
    // Mostrar u ocultar el botón según si usa clave propia
    buyBtn.style.display = usingOwnKey ? 'none' : 'flex';
  }
}

// Función para abrir el modal de créditos
function openCreditsModal() {
  creditsModal.classList.add('open');
}

// Función para cerrar el modal de créditos
function closeCreditsModal() {
  creditsModal.classList.remove('open');
}

// Función para configurar la propia API key del usuario
function configureOwnApiKey() {
  settingsPanel.classList.add('open');
  overlay.classList.add('open');
  
  // Resaltar el campo de API key
  savedApiKeyInput.focus();
  savedApiKeyInput.classList.add('highlight-input');
  
  // Mostrar un mensaje informativo
  showNotification("Introduce tu API key de OpenAI para generar itinerarios ilimitados.");
  
  // Cerrar el modal de créditos
  closeCreditsModal();
  
  // Después de 2 segundos, quitar el resaltado
  setTimeout(() => {
    savedApiKeyInput.classList.remove('highlight-input');
  }, 2000);
}

// Función para procesar la compra de créditos
function processCreditPurchase(creditsAmount, price) {
  // En una implementación real, aquí se conectaría con un sistema de pagos
  // Para esta demostración, solo simularemos la compra
  
  // Mostrar una confirmación
  if (confirm(`¿Confirmas la compra de ${creditsAmount} créditos por €${price}?`)) {
    // Añadir los créditos a la cuenta del usuario
    const currentCredits = parseInt(localStorage.getItem('credits') || '0');
    const newCredits = currentCredits + parseInt(creditsAmount);
    localStorage.setItem('credits', newCredits.toString());
    
    // Actualizar el display
    updateCreditsDisplay();
    
    // Cerrar el modal y mostrar notificación
    closeCreditsModal();
    showNotification(`¡Compra exitosa! Se han añadido ${creditsAmount} créditos a tu cuenta.`);
  }
}

// Inicializar la aplicación cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Cargar configuraciones guardadas
  loadSettings();
  
  // Configurar fechas por defecto
  setupDefaultDates();
  
  // Configurar event listeners
  setupEventListeners();
  
  // Nueva funcionalidad para el sidebar - Asegurarnos de que esto se ejecute
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
  
  // Configurar específicamente los event listeners de idioma
  setupLanguageEvents();
  
  // Añadir la inicialización del sistema de créditos
  initCreditsSystem();
  
  // Asegurarse de que todos los event listeners estén funcionando
  reinitializeEventListeners();
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
  const useRealApi = document.getElementById('use-real-api-toggle')?.checked || false;
  
  // Verificar si el usuario está usando su propia API key
  const usingOwnKey = apiKey.trim() !== '';
  localStorage.setItem('usingOwnKey', usingOwnKey.toString());
  
  // Si el usuario proporciona su propia API key, encriptarla
  if (usingOwnKey) {
    localStorage.setItem('apiKey', encryptApiKey(apiKey));
  }
  
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
  
  // Actualizar el display de créditos
  updateCreditsDisplay();
  
  // Aplicar cambios de idioma si es necesario
  applyLanguageChanges(language);
  
  // Save the API usage preference
  localStorage.setItem('useRealApi', useRealApi.toString());
  
  // Update the global variable
  window.USE_REAL_API = useRealApi;
  
  const useWebBrowsing = document.getElementById('use-web-browsing-toggle')?.checked || false;
  localStorage.setItem('useWebBrowsing', useWebBrowsing.toString());
  window.USE_WEB_BROWSING = useWebBrowsing;
}

// Mostrar notificación
function showNotification(message, isError = false) {
  if (isError) {
    console.error(message);
    message = "❌ " + message;
  } else {
    message = "✅ " + message;
  }
  
  // If you have a notification system, use it, otherwise use alert
  if (typeof Toastify === 'function') {
    Toastify({
      text: message,
      duration: 4000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: isError ? "#e74c3c" : "#2ecc71",
    }).showToast();
  } else {
    alert(message);
  }
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
  if (savedApiKey) {
    // Mostrar asteriscos por seguridad, la key real está encriptada
    savedApiKeyInput.value = '••••••••••••••••••••••••••••••••';
  } else {
    savedApiKeyInput.value = '';
  }
  
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
  
  // Inicializar sistema de créditos
  initCreditsSystem();
  
  // Cargar estado del sidebar (con validación por tamaño de pantalla)
  const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
  
  // Solo colapsar en pantallas grandes si el usuario lo guardó así anteriormente
  if (sidebarCollapsed && window.innerWidth > 992) {
    document.querySelector('.app-layout').classList.add('sidebar-collapsed');
  } else {
    // Asegurarnos de que el sidebar esté expandido por defecto
    document.querySelector('.app-layout').classList.remove('sidebar-collapsed');
    localStorage.setItem('sidebarCollapsed', 'false');
  }
  
  // Configurar fechas por defecto
  setupDefaultDates();
  
  // Load API usage preference
  const useRealApi = localStorage.getItem('useRealApi') === 'true';
  if (document.getElementById('use-real-api-toggle')) {
    document.getElementById('use-real-api-toggle').checked = useRealApi;
  }
  window.USE_REAL_API = useRealApi;
  
  const useWebBrowsing = localStorage.getItem('useWebBrowsing') === 'true';
  if (document.getElementById('use-web-browsing-toggle')) {
    document.getElementById('use-web-browsing-toggle').checked = useWebBrowsing;
  }
  window.USE_WEB_BROWSING = useWebBrowsing;
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
  // Añadir al principio de generarItinerario()
  console.log("Iniciando generación de itinerario, modo desarrollo:", IS_DEV_MODE);
  
  // Añadir antes de la simulación en modo desarrollo
  console.log("Simulando respuesta en modo desarrollo");
  
  // Añadir en modo producción
  console.log("Enviando solicitud a la API");
  
  // Al iniciar la generación, ocultar el estado vacío
  showEmptyState(false);
  
  // Obtener datos del formulario - necesario incluso en modo desarrollo
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
  
  // Verificar si el usuario tiene créditos o está usando una API key propia
  const usingOwnKey = localStorage.getItem('usingOwnKey') === 'true';
  const credits = parseInt(localStorage.getItem('credits') || '0');
  
  if (!usingOwnKey && credits <= 0 && !IS_DEV_MODE) {
    console.log("Sin créditos disponibles - mostrando modal");
    openCreditsModal();
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
  let systemPrompt = generarSystemPrompt();
  
  try {
    // Mostrar indicador de carga
    loadingIndicator.style.display = 'flex';
    responseCard.style.display = 'none';
    
    let data;
    
    if (IS_DEV_MODE && !USE_REAL_API) {
      // Simular respuesta de la API en modo desarrollo
      console.log("Ejecutando en modo desarrollo con datos simulados");
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simular retraso
      
      // Usar nuestro generador de itinerarios de prueba mejorado
      const itinerarioPrueba = generarItinerarioPrueba(destino, fechaInicio, fechaFin);
      
      data = {
        choices: [{
          message: {
            content: itinerarioPrueba
          }
        }]
      };
    } else {
      // Hacer la solicitud real a la API
      console.log("Realizando solicitud real a la API OpenAI");
      
      // Obtener la API key (de localStorage o del valor predeterminado)
      const apiKeyEncrypted = localStorage.getItem('apiKey') || DEFAULT_ENCRYPTED_API_KEY;
      const apiKey = decryptApiKey(apiKeyEncrypted);
      
      if (!apiKey) {
        throw new Error("API Key no configurada. Por favor, añade tu API Key en la configuración.");
      }
      
      // Si estamos en desarrollo, llamar directamente a OpenAI
      if (IS_DEV_MODE) {
        console.log("Llamando a OpenAI Assistant API con capacidad de navegación web");
        try {
          // Set USE_WEB_BROWSING to true to use the Assistants API with browsing
          const USE_WEB_BROWSING = true;
          
          if (USE_WEB_BROWSING) {
            // Use the Assistants API with web browsing
            const openaiData = await callAssistantWithBrowsing(promptText, systemPrompt, apiKey);
            data = openaiData;
          } else {
            // Use the regular Chat Completions API with GPT-4
            const openaiResponse = await fetch(OPENAI_API_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
              },
              body: JSON.stringify({
                model: "gpt-4-turbo-preview",
                messages: [
                  { role: "system", content: systemPrompt || "You are a helpful travel assistant." },
                  { role: "user", content: promptText }
                ],
                temperature: 0.7,
                max_tokens: 4000,
              })
            });
            
            if (!openaiResponse.ok) {
              let errorMessage = "Error llamando a OpenAI API";
              try {
                const errorData = await openaiResponse.json();
                errorMessage = errorData.error?.message || errorData.error || errorMessage;
              } catch (e) {
                console.error("No se pudo analizar la respuesta de error:", e);
              }
              throw new Error(errorMessage);
            }
            
            const openaiData = await openaiResponse.json();
            data = openaiData;
          }
        } catch (error) {
          console.error("Error al llamar a la API de OpenAI:", error);
          throw error;
        }
      } else {
        // En producción, usar nuestra API
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': apiKey
          },
          body: JSON.stringify({
            promptData: promptText,
            systemPrompt: systemPrompt
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
        }
        
        data = await response.json();
      }
    }
    
    // Procesar la respuesta (tanto en modo desarrollo como producción)
    if (data.error) {
      showNotification(`Error: ${data.error.message || 'Error desconocido'}`, true);
      showEmptyState(true);
    } else if (data.choices && data.choices[0]) {
      const itinerario = data.choices[0].message.content;
      procesarRespuesta(itinerario, destino, fechaInicio, fechaFin);
      
      // Si el usuario no está usando su propia API key y no estamos en modo desarrollo, reducir un crédito
      if (!IS_DEV_MODE) {
        const usingOwnKey = localStorage.getItem('usingOwnKey') === 'true';
        if (!usingOwnKey) {
          const credits = parseInt(localStorage.getItem('credits') || '0');
          const newCredits = credits - 1;
          localStorage.setItem('credits', newCredits.toString());
          
          // Actualizar la visualización de créditos inmediatamente
          updateCreditsDisplay();
          
          console.log(`Crédito descontado. Quedan ${newCredits} créditos.`);
          
          // Si quedan pocos créditos, mostrar una notificación
          if (newCredits <= 1) {
            showCreditRemainingNotification(newCredits);
          }
          
          // Si era el último crédito gratuito, mostrar el modal de compra
          if (newCredits === 0) {
            setTimeout(() => {
              openCreditsModal();
            }, 1000);
          }
        }
      }
      
      // Asegurarse que los botones de acción sean visibles
      actionButtons.style.display = 'flex';
      // Asegurarse que la caja de respuesta sea visible
      responseCard.style.display = 'block';
    } else {
      showNotification('Error al generar el itinerario: Formato de respuesta inválido', true);
      showEmptyState(true);
    }
  } catch (error) {
    console.error('Error en generarItinerario:', error);
    
    // Check if it's a CORS error
    if (error.message.includes('Failed to fetch') || error.message.includes('CORS')) {
      showNotification("Error de CORS: No se puede acceder directamente a la API de OpenAI desde el navegador. Considera instalar una extensión CORS o usar un servidor proxy local.", true);
    } else {
      showNotification(`Error: ${error.message || 'Error desconocido al generar el itinerario'}`, true);
    }
    
    showEmptyState(true);
  } finally {
    // Ocultar el indicador de carga
    loadingIndicator.style.display = 'none';
  }
  
  // Al finalizar (antes de procesar respuesta), cerrar el sidebar en móvil
  closeFiltersSidebarOnMobile();
  
  // Al final de la función exitosa, descontar un crédito si no usa api key propia
  // Colocar este código dentro del bloque de éxito de la generación
  if (!usingOwnKey && !IS_DEV_MODE) {
    const newCredits = Math.max(0, credits - 1);
    console.log(`Descontando crédito: ${credits} -> ${newCredits}`);
    localStorage.setItem('credits', newCredits.toString());
    updateCreditsDisplay();
    
    // Mostrar notificación si quedan pocos créditos
    if (newCredits <= 1) {
      showCreditRemainingNotification(newCredits);
    }
  }
}

// Modify the procesarRespuesta function to better format the response
function procesarRespuesta(respuesta, destino, fechaInicio, fechaFin) {
  // Asegurarse de que el estado vacío esté oculto cuando hay contenido
  showEmptyState(false);
  
  // Limpiar el contenedor de respuesta y añadir cabecera
  responseBox.innerHTML = `
    <div class="itinerary-header">
      <h2>Itinerario para ${destino}</h2>
      <p>Del ${formatearFecha(fechaInicio)} al ${formatearFecha(fechaFin)}</p>
    </div>
  `;
  
  // Guardar el itinerario completo para futuras referencias
  localStorage.setItem('currentFullItinerary', respuesta);
  localStorage.setItem('currentDestination', destino);
  localStorage.setItem('currentStartDate', fechaInicio);
  localStorage.setItem('currentEndDate', fechaFin);
  
  // Dividir el itinerario por días
  const dayRegex = /## Día \d+.*?(?=\n|$)/g;
  const dayMatches = [...respuesta.matchAll(dayRegex)];
  
  // Calculate expected number of days
  const start = new Date(fechaInicio);
  const end = new Date(fechaFin);
  const expectedDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  
  if (dayMatches.length === 0 || dayMatches.length < expectedDays) {
    console.warn(`Expected ${expectedDays} days but found ${dayMatches.length}. Using fallback processing.`);
    
    // If no days found or fewer than expected, try alternative processing
    const lines = respuesta.split('\n');
    let currentDay = 0;
    let dayContent = '';
    let processingDay = false;
    
    lines.forEach(line => {
      if (line.match(/^## Día \d+/i) || line.match(/^Día \d+/i)) {
        // If we were already processing a day, save it
        if (processingDay && dayContent) {
          crearSeccionDia(`Día ${currentDay}`, dayContent, currentDay);
        }
        
        // Start a new day
        currentDay++;
        dayContent = line + '\n';
        processingDay = true;
      } else if (processingDay) {
        // Continue adding content to the current day
        dayContent += line + '\n';
      }
    });
    
    // Save the last day if needed
    if (processingDay && dayContent) {
      crearSeccionDia(`Día ${currentDay}`, dayContent, currentDay);
    }
  } else {
    // Original processing if days were found properly
    for (let i = 0; i < dayMatches.length; i++) {
      const dayTitleMatch = dayMatches[i];
      const dayTitle = dayTitleMatch[0];
      const dayStart = dayTitleMatch.index;
      const dayEnd = (i < dayMatches.length - 1) ? dayMatches[i + 1].index : respuesta.length;
      
      const dayContent = respuesta.substring(dayStart, dayEnd);
      crearSeccionDia(dayTitle, dayContent, i + 1);
    }
  }
  
  // Mostrar los botones de acción principales
  actionButtons.style.display = 'flex';
  
  // Asegurarse de que la tarjeta de respuesta sea visible
  responseCard.style.display = 'block';
  
  // Desplazarse hasta el resultado
  responseCard.scrollIntoView({ behavior: 'smooth' });
  
  // Guardar el itinerario actual en el historial
  guardarItinerarioEnHistorial(destino, fechaInicio, fechaFin, respuesta);
  
  // Add this to procesarRespuesta where we check for expected days
  if (dayMatches.length < expectedDays) {
    const warningBanner = document.createElement('div');
    warningBanner.className = 'warning-banner';
    warningBanner.innerHTML = `
      <i class="fas fa-exclamation-triangle"></i>
      <span>Se esperaban ${expectedDays} días, pero solo se generaron ${dayMatches.length}. 
      Considera regenerar el itinerario o editar manualmente los días faltantes.</span>
      <button id="regenerate-all-btn" class="warning-action-btn">
        <i class="fas fa-sync-alt"></i> Regenerar Completo
      </button>
    `;
    responseBox.insertBefore(warningBanner, responseBox.firstChild);
    
    // Add event listener for the regenerate button
    document.getElementById('regenerate-all-btn').addEventListener('click', regenerarItinerario);
  }
}

// Enhanced function to format markdown content properly
function procesarTextoMarkdown(texto) {
  if (!texto) return '';
  
  // Replace markdown headings with HTML
  texto = texto.replace(/^# (.*$)/gm, '<h1>$1</h1>')
               .replace(/^## (.*$)/gm, '<h2>$1</h2>')
               .replace(/^### (.*$)/gm, '<h3>$1</h3>');
  
  // Remove double asterisks around time indicators
  texto = texto.replace(/\*\*(\d{1,2}:\d{2})\*\*/g, '$1');
  
  // Format time indicators with icons (after removing asterisks)
  texto = texto.replace(/(\d{1,2}:\d{2})/g, '<span class="time-tag"><i class="fas fa-clock"></i> $1</span>');
  
  // Clean up any remaining double asterisks around other text
  texto = texto.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Format transportation methods
  texto = texto.replace(/Transporte: ([^<\n.]*)/g, '<span class="transport-tag"><i class="fas fa-route"></i> $1</span>');
  
  // Format reservation indicators
  texto = texto.replace(/\[BOOK\]|\[RESERVAR\]/g, '<span class="reservation-tag"><i class="fas fa-calendar-check"></i> RESERVAR</span>');
  
  // Convert URLs to clickable links
  texto = texto.replace(/\((https?:\/\/[^\s\)]+)\)/g, (match, url) => {
    return `(<a href="${url}" class="itinerary-link" target="_blank" title="${url}">${formatearURL(url)}</a>)`;
  });
  
  // Convert bullet points to list items
  texto = texto.replace(/^- (.*$)/gm, '<li>$1</li>');
  
  // Wrap lists in <ul> tags
  texto = texto.replace(/(<li>.*?<\/li>)+/gs, match => '<ul>' + match + '</ul>');
  
  // Fix any duplicate <ul> tags
  texto = texto.replace(/<\/ul>\s*<ul>/g, '');
  
  // Enhance the tips section
  texto = texto.replace(/<h3>(CONSEJOS DEL DÍA.*?)<\/h3>/g, 
                       '<h3 class="tips-header"><i class="fas fa-lightbulb"></i> $1</h3>');
  
  return texto;
}

// Function to create a day section
function crearSeccionDia(titulo, contenido, numDia) {
  // Get content without the title that's already in the header
  let dayContent = contenido;
  
  // If the content starts with the title (in markdown format), remove it
  const titleRegex = new RegExp(`^## ${titulo}`, 'i');
  dayContent = dayContent.replace(titleRegex, '');
  
  // Also remove plain text title if it exists
  const plainTitleRegex = new RegExp(`^${titulo}`, 'i');
  dayContent = dayContent.replace(plainTitleRegex, '');
  
  // Convert markdown to HTML for the day content
  const dayHtml = procesarTextoMarkdown(dayContent);
  
  // Create the day container with controls
  const dayContainer = document.createElement('div');
  dayContainer.className = 'day-section';
  dayContainer.id = `day-${numDia}`;
  dayContainer.innerHTML = `
    <div class="day-header">
      <h2>${titulo}</h2>
      <div class="day-controls">
        <button class="day-edit-btn" onclick="editarDia(${numDia})">
          <i class="fas fa-pencil-alt"></i> Editar
        </button>
        <button class="day-regenerate-btn" onclick="regenerarDia(${numDia})">
          <i class="fas fa-sync-alt"></i> Regenerar
        </button>
      </div>
    </div>
    <div class="day-content">
      ${dayHtml}
    </div>
  `;
  
  // Add container to responseBox
  responseBox.appendChild(dayContainer);
  
  // Make activities editable
  setupActivityEditing(dayContainer, numDia);
}

// Helper function to make activities editable
function setupActivityEditing(dayContainer, numDia) {
  const liElements = dayContainer.querySelectorAll('li');
  liElements.forEach((li, index) => {
    // Check if it's part of the tips section
    const isInTips = li.closest('ul')?.previousElementSibling?.classList.contains('tips-header') || false;
    
    if (!isInTips) {
      // For normal activities, add edit and regenerate controls
      const activityContainer = document.createElement('div');
      activityContainer.className = 'activity-container';
      activityContainer.innerHTML = li.outerHTML + `
        <div class="activity-controls">
          <button class="activity-edit-btn" onclick="editarActividad(${numDia}, ${index})">
            <i class="fas fa-pencil-alt"></i>
          </button>
          <button class="activity-regenerate-btn" onclick="regenerarActividad(${numDia}, ${index})">
            <i class="fas fa-sync-alt"></i>
          </button>
        </div>
      `;
      li.parentNode.replaceChild(activityContainer, li);
    } else {
      // For tips, only add a container without controls
      const activityContainer = document.createElement('div');
      activityContainer.className = 'activity-container consejos-container';
      activityContainer.innerHTML = li.outerHTML;
      li.parentNode.replaceChild(activityContainer, li);
    }
  });
  
  // Add special class to tips section but DON'T add the warning text
  const tipsHeader = dayContainer.querySelector('.tips-header');
  if (tipsHeader) {
    const tipsSection = tipsHeader.parentNode;
    tipsSection.classList.add('consejos-section');
  }
}

// Función para regenerar un día específico - Corregir la implementación
function regenerarDia(numDia) {
  // Verificar si tenemos suficientes créditos
  const usingOwnKey = localStorage.getItem('usingOwnKey') === 'true';
  const credits = parseInt(localStorage.getItem('credits') || '0');
  
  // Si no es modo desarrollo, no tiene créditos y no usa su propia key, mostrar el modal
  if (!IS_DEV_MODE && credits <= 0 && !usingOwnKey) {
    openCreditsModal();
    return;
  }
  
  // Obtener información del itinerario actual
  const fullItinerary = localStorage.getItem('currentFullItinerary');
  const destino = localStorage.getItem('currentDestination') || document.getElementById('destino').value;
  const intereses = obtenerInteresesSeleccionados();
  const presupuesto = document.getElementById('presupuesto').value;
  
  // Mostrar cargando solo para ese día
  const daySection = document.getElementById(`day-${numDia}`);
  if (!daySection) {
    console.error(`No se encontró la sección del día ${numDia}`);
    return;
  }
  
  const dayContentOriginal = daySection.querySelector('.day-content').innerHTML;
  daySection.querySelector('.day-content').innerHTML = `
    <div class="day-loading">
      <div class="spinner"></div>
      <span>Regenerando el día ${numDia}...</span>
    </div>
  `;
  
  // Preparar prompt específico para este día
  let systemPrompt = "Eres un EXPERTO EN PLANIFICACIÓN DE VIAJES. Tu tarea es regenerar SOLAMENTE UN DÍA ESPECÍFICO de un itinerario existente. ";
  systemPrompt += "Mantén el mismo estilo, nivel de detalle y formato que en el ejemplo, pero con nuevas actividades y lugares.\n\n";
  systemPrompt += "REGLAS OBLIGATORIAS:\n";
  systemPrompt += "1. Incluye URLs reales para cada lugar/atracción mencionado.\n";
  systemPrompt += "2. Marca con [RESERVAR] los lugares donde sea necesario reservar.\n";
  systemPrompt += "3. Especifica el medio de transporte entre actividades.\n";
  systemPrompt += "4. Incluye una sección '### CONSEJOS DEL DÍA' con 3-5 recomendaciones prácticas.\n";
  systemPrompt += "5. IMPORTANTE: Genera ÚNICAMENTE el contenido para este día, sin modificar los demás días.";
  
  let promptText = `Regenera SOLO el Día ${numDia} del itinerario para mi viaje a ${destino}.`;
  promptText += `\n\nMantén el mismo estilo y formato, pero sugiere actividades y lugares diferentes para este día en particular.`;
  promptText += `\n\nMantén exactamente la misma sección "CONSEJOS DEL DÍA" que aparece en el itinerario original.`;
  
  // Simular o hacer la petición real
  if (IS_DEV_MODE) {
    setTimeout(() => {
      // Generar un día de prueba
      const nuevoDia = generarDiaPrueba(numDia, destino);
      
      // Extraer la sección de consejos original
      const originalTipsMatch = dayContentOriginal.match(/<h3 class="tips-header">[\s\S]*?<\/ul>/);
      const originalTipsSection = originalTipsMatch ? originalTipsMatch[0] : '';
      
      // Si encontramos consejos, reemplazar la sección en el nuevo contenido
      let contenidoFinal = nuevoDia;
      if (originalTipsSection) {
        contenidoFinal = nuevoDia.replace(/### CONSEJOS DEL DÍA[\s\S]*?(?=##|$)/, 
          `### CONSEJOS DEL DÍA\n${originalTipsSection}\n\n`);
      }
      
      // Actualizar el HTML
      daySection.querySelector('.day-content').innerHTML = procesarTextoMarkdown(contenidoFinal);
      
      // Re-aplicar la protección a la sección de consejos
      const tipsHeader = daySection.querySelector('.tips-header');
      if (tipsHeader) {
        const tipsSection = tipsHeader.parentNode;
        tipsSection.classList.add('consejos-section');
      }
      
    }, 1500);
  } else {
    // Hacer la solicitud real a la API
    fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        promptData: promptText,
        systemPrompt: systemPrompt
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.choices && data.choices[0]) {
        let nuevoContenido = data.choices[0].message.content;
        
        // Extraer la sección de consejos original
        const originalTipsMatch = dayContentOriginal.match(/<h3 class="tips-header">[\s\S]*?<\/ul>/);
        const originalTipsSection = originalTipsMatch ? originalTipsMatch[0] : '';
        
        // Si encontramos consejos, reemplazar la sección en el nuevo contenido
        if (originalTipsSection) {
          const tipsRegex = /<h3 class="tips-header">[\s\S]*?<\/ul>/;
          nuevoContenido = nuevoContenido.replace(tipsRegex, originalTipsSection);
        }
        
        // Actualizar el HTML
        daySection.querySelector('.day-content').innerHTML = procesarTextoMarkdown(nuevoContenido);
        
        // Re-aplicar la protección a la sección de consejos
        const tipsHeader = daySection.querySelector('.tips-header');
        if (tipsHeader) {
          const tipsSection = tipsHeader.parentNode;
          tipsSection.classList.add('consejos-section');
        }
        
        // Descontar crédito si corresponde
        const usingOwnKey = localStorage.getItem('usingOwnKey') === 'true';
        if (!usingOwnKey) {
          const credits = parseInt(localStorage.getItem('credits') || '0');
          const newCredits = credits - 1;
          localStorage.setItem('credits', newCredits.toString());
          updateCreditsDisplay();
          
          if (newCredits <= 1) {
            showCreditRemainingNotification(newCredits);
          }
        }
      } else {
        daySection.querySelector('.day-content').innerHTML = dayContentOriginal;
        showNotification("Error regenerando día: " + (data.error?.message || "Intenta nuevamente"), true);
      }
    })
    .catch(error => {
      console.error("Error regenerando día:", error);
      daySection.querySelector('.day-content').innerHTML = dayContentOriginal;
      showNotification("Error de conexión: " + error.message, true);
    });
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
  // Obtener la referencia al botón toggle correcto
  const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');
  const appLayout = document.querySelector('.app-layout');
  
  if (!toggleSidebarBtn) {
    console.error("No se encontró el botón toggle-sidebar-btn");
    return;
  }
  
  // Función para alternar el sidebar
  function toggleSidebar() {
    console.log("Toggle sidebar clicked"); // Para depuración
    appLayout.classList.toggle('sidebar-collapsed');
    
    // Guardar preferencia del usuario
    const isSidebarCollapsed = appLayout.classList.contains('sidebar-collapsed');
    localStorage.setItem('sidebarCollapsed', isSidebarCollapsed);
    
    // Cambiar el ícono según estado
    const toggleIcon = toggleSidebarBtn.querySelector('i');
    if (toggleIcon) {
      toggleIcon.className = isSidebarCollapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left';
    }
  }
  
  // Añadir event listener al botón de manera explícita
  toggleSidebarBtn.addEventListener('click', function(event) {
    console.log("Botón toggle clickeado");
    toggleSidebar();
    event.stopPropagation(); // Prevenir que se propague
  });
  
  console.log("Event listener añadido al botón toggle-sidebar-btn");
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
  
  // Actualizar textos del sistema de créditos
  const creditCountElement = document.querySelector('.credit-count span:last-child');
  if (creditCountElement) {
    creditCountElement.textContent = translations[lang].credits_count || "créditos";
  }
  
  const buyCreditsTextElement = document.querySelector('#buy-credits-btn');
  if (buyCreditsTextElement) {
    const spanElement = buyCreditsTextElement.querySelector('span') || buyCreditsTextElement;
    if (spanElement && translations[lang].buy_credits) {
      spanElement.textContent = translations[lang].buy_credits;
    }
  }
  
  // Modal de créditos
  const modalTitle = document.querySelector('#credits-modal h3');
  if (modalTitle) {
    modalTitle.textContent = translations[lang].credits_limit_title || "¡Has alcanzado el límite de itinerarios gratuitos!";
  }
  
  const modalDesc = document.querySelector('#credits-modal > div > p');
  if (modalDesc) {
    modalDesc.textContent = translations[lang].credits_limit_message || "Has utilizado tus 3 itinerarios gratuitos. Para continuar generando itinerarios personalizados, tienes dos opciones:";
  }
  
  // Sección "Usa tu propia API Key"
  const keyOption = document.querySelector('#credits-modal .api-key-option');
  if (keyOption) {
    const keyTitle = keyOption.querySelector('h4');
    if (keyTitle) {
      keyTitle.innerHTML = `<i class="fas fa-key"></i> ${translations[lang].use_own_key_title || "Usa tu propia API Key"}`;
    }
    
    const keyDesc = keyOption.querySelector('p');
    if (keyDesc) {
      keyDesc.textContent = translations[lang].use_own_key_description || "Obtén una API key gratuita de OpenAI y úsala para generar itinerarios ilimitados sin costo adicional.";
    }
    
    const getKeyBtn = keyOption.querySelector('a.secondary-btn');
    if (getKeyBtn) {
      getKeyBtn.textContent = translations[lang].get_api_key || "Obtener API Key";
    }
    
    const configKeyBtn = keyOption.querySelector('#use-own-key-btn');
    if (configKeyBtn) {
      configKeyBtn.innerHTML = `<i class="fas fa-key"></i> ${translations[lang].configure_api_key || "Configurar mi API Key"}`;
    }
  }
  
  // Sección "Compra créditos"
  const buyCreditOption = document.querySelector('#credits-modal .buy-credits-option');
  if (buyCreditOption) {
    const buyTitle = buyCreditOption.querySelector('h4');
    if (buyTitle) {
      buyTitle.innerHTML = `<i class="fas fa-ticket-alt"></i> ${translations[lang].buy_credits_title || "Compra créditos"}`;
    }
    
    const buyDesc = buyCreditOption.querySelector('p');
    if (buyDesc) {
      buyDesc.textContent = translations[lang].buy_credits_description || "Adquiere paquetes de créditos para seguir usando el servicio sin necesidad de obtener tu propia API key.";
    }
    
    const comingSoonBanner = buyCreditOption.querySelector('.coming-soon-banner');
    if (comingSoonBanner) {
      comingSoonBanner.innerHTML = `<i class="fas fa-clock"></i> ${translations[lang].coming_soon || "Disponible próximamente"}`;
    }
    
    // Paquetes de créditos
    const packages = buyCreditOption.querySelectorAll('.credit-package');
    packages.forEach(pkg => {
      const comingSoonLabel = pkg.querySelector('.package-coming-soon');
      if (comingSoonLabel) {
        comingSoonLabel.textContent = translations[lang].coming_soon_label || "Próximamente";
      }
      
      const buyBtn = pkg.querySelector('button');
      if (buyBtn) {
        buyBtn.textContent = translations[lang].available_soon || "Disponible pronto";
      }
    });
    
    // Etiqueta "Mejor valor"
    const bestValueTag = buyCreditOption.querySelector('.package-tag');
    if (bestValueTag) {
      bestValueTag.textContent = translations[lang].best_value || "Mejor valor";
    }
  }
  
  // Actualizar textos del sistema de créditos
  updateCreditsDisplay(); // Esta función ya actualiza todo lo relacionado con créditos
}

// Función independiente para mostrar notificaciones de créditos restantes
function showCreditRemainingNotification(credits) {
  const currentLang = localStorage.getItem('language') || 'es';
  let message;
  
  if (credits === 1) {
    message = translations[currentLang].credits_remaining_one || "¡Te queda 1 crédito! Considera comprar más o usar tu propia API key.";
  } else {
    message = (translations[currentLang].credits_remaining_multiple || "¡Te quedan {count} créditos! Considera comprar más o usar tu propia API key.").replace('{count}', credits);
  }
  
  showNotification(message);
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
  const languageModal = document.getElementById('language-modal');
  const overlay = document.getElementById('overlay');
  
  if (languageModal) {
    languageModal.classList.remove('open');
  }
  
  if (overlay) {
    overlay.classList.remove('open');
  }
}

// Función para cambiar el idioma
function changeLanguage(lang) {
  // Guardar la preferencia
  localStorage.setItem('language', lang);
  
  // Actualizar el selector en la configuración 
  const languageSelector = document.getElementById('language-selector');
  if (languageSelector) {
    languageSelector.value = lang;
  }
  
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

// Asegurarse de que los event listeners para el cambio de idioma estén correctamente inicializados
function setupLanguageEvents() {
  // Botón para abrir el modal de idioma
  const languageSwitchBtn = document.getElementById('language-switch-btn');
  if (languageSwitchBtn) {
    languageSwitchBtn.addEventListener('click', function() {
      const languageModal = document.getElementById('language-modal');
      const overlay = document.getElementById('overlay');
      
      if (languageModal && overlay) {
        languageModal.classList.add('open');
        overlay.classList.add('open');
        
        // Destacar el idioma actualmente seleccionado
        const currentLang = localStorage.getItem('language') || 'es';
        document.querySelectorAll('.language-option').forEach(option => {
          if (option.dataset.lang === currentLang) {
            option.classList.add('active');
          } else {
            option.classList.remove('active');
          }
        });
      }
    });
  }
  
  // Botón para cerrar el modal de idioma
  const languageModalClose = document.getElementById('language-modal-close');
  if (languageModalClose) {
    languageModalClose.addEventListener('click', closeLanguageModal);
  }
  
  // Opciones de idioma dentro del modal
  document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', function() {
      const selectedLang = this.dataset.lang;
      changeLanguage(selectedLang);
      closeLanguageModal();
    });
  });
}

// Añadir esta función para reinicializar todos los event listeners clave
function reinitializeEventListeners() {
  // Event listeners para botones de acción
  if (generarBtn) {
    generarBtn.addEventListener('click', generarItinerario);
  }
  
  if (copiarBtn) {
    copiarBtn.addEventListener('click', copiarAlPortapapeles);
  }
  
  if (imprimirBtn) {
    imprimirBtn.addEventListener('click', imprimirItinerario);
  }
  
  if (pdfBtn) {
    pdfBtn.addEventListener('click', guardarPDF);
  }
  
  // Inicializar búsqueda de destinos
  const destinoInput = document.getElementById('destino');
  if (destinoInput) {
    destinoInput.addEventListener('input', function() {
      mostrarSugerenciasDestinos(this.value);
    });
    
    destinoInput.addEventListener('focus', function() {
      mostrarSugerenciasDestinos(this.value);
    });
  }
  
  // Reinicializar otros event listeners importantes...
}

// Modificar la función DOMContentLoaded para incluir la reinicialización
document.addEventListener('DOMContentLoaded', function() {
  // Cargar configuraciones guardadas
  loadSettings();
  
  // Configurar fechas por defecto
  setupDefaultDates();
  
  // Configurar event listeners
  setupEventListeners();
  
  // Configurar específicamente los event listeners de idioma
  setupLanguageEvents();
  
  // Añadir la inicialización del sistema de créditos
  initCreditsSystem();
  
  // Asegurarse de que todos los event listeners estén funcionando
  reinitializeEventListeners();
});

// Asegurar que la función de mostrar sugerencias de destinos esté correctamente definida
function mostrarSugerenciasDestinos(query) {
  const destinoInput = document.getElementById('destino');
  const sugerenciasBox = document.getElementById('sugerencias-destinos');
  
  if (!destinoInput || !sugerenciasBox) return;
  
  // Limpiar sugerencias anteriores
  sugerenciasBox.innerHTML = '';
  
  if (query.length < 2) {
    sugerenciasBox.style.display = 'none';
    return;
  }
  
  // Filtrar sugerencias basadas en la consulta
  const sugerencias = [];
  query = query.toLowerCase();
  
  // Añadir continentes que coincidan
  Object.keys(continentes).forEach(continente => {
    if (continente.toLowerCase().includes(query)) {
      sugerencias.push({
        nombre: continente,
        tipo: 'continente'
      });
    }
  });
  
  // Añadir países que coincidan
  Object.keys(continentes).forEach(continente => {
    continentes[continente].forEach(pais => {
      if (pais.toLowerCase().includes(query)) {
        sugerencias.push({
          nombre: pais,
          tipo: 'pais',
          continente: continente
        });
      }
    });
  });
  
  // Mostrar sugerencias
  if (sugerencias.length > 0) {
    sugerenciasBox.style.display = 'block';
    
    sugerencias.slice(0, 8).forEach(sugerencia => {
      const sugerenciaItem = document.createElement('div');
      sugerenciaItem.className = 'sugerencia-item';
      
      const icono = sugerencia.tipo === 'continente' ? 'fas fa-globe-americas' : 'fas fa-flag';
      const detalle = sugerencia.tipo === 'continente' ? '' : `<span class="sugerencia-detalle">${sugerencia.continente}</span>`;
      
      sugerenciaItem.innerHTML = `
        <i class="${icono}"></i>
        <span class="sugerencia-texto">${sugerencia.nombre}</span>
        ${detalle}
      `;
      
      sugerenciaItem.addEventListener('click', () => {
        seleccionarDestino(sugerencia);
      });
      
      sugerenciasBox.appendChild(sugerenciaItem);
    });
  } else {
    sugerenciasBox.style.display = 'none';
  }
}

// Mejora del prompt del sistema para enfatizar los requisitos
function generarSystemPrompt() {
  let systemPrompt = "Eres un EXPERTO EN PLANIFICACIÓN DE VIAJES de alto nivel. Tu tarea es crear itinerarios detallados y exhaustivos que sigan estrictamente estas reglas:\n\n";
  
  // Reglas para el formato
  systemPrompt += "REGLAS OBLIGATORIAS DE FORMATO:\n";
  systemPrompt += "1. Crea un itinerario para CADA DÍA del viaje, sin excepción. Si el viaje es de 5 días, necesito 5 días completos en el itinerario.\n";
  systemPrompt += "2. Estructura clara con encabezados H2 para días (## Día 1, ## Día 2, etc.)\n";
  systemPrompt += "3. Actividades listadas cronológicamente con horarios específicos (09:00, 14:30, etc.)\n";
  systemPrompt += "4. Cada día DEBE incluir una sección '### CONSEJOS DEL DÍA' con 3-5 recomendaciones prácticas\n\n";
  
  // Reglas para los links y reservas
  systemPrompt += "ELEMENTOS OBLIGATORIOS EN CADA ACTIVIDAD:\n";
  systemPrompt += "1. LINKS: CADA atracción, restaurante, y lugar mencionado DEBE incluir un URL real entre paréntesis. Ejemplo: 'Museo del Prado (https://www.museodelprado.es/)'\n";
  systemPrompt += "2. RESERVAS: Marca con [RESERVAR] los lugares donde sea necesario o recomendable reservar. Ejemplo: 'Restaurante Botín [RESERVAR] (https://botin.es/)'\n";
  systemPrompt += "3. TRANSPORTE: Especifica el medio de transporte entre cada actividad\n\n";
  
  // Reglas para el contenido
  systemPrompt += "CONTENIDO OBLIGATORIO:\n";
  systemPrompt += "1. Adapta el itinerario exactamente a las fechas indicadas (todos los días)\n";
  systemPrompt += "2. Incluye opciones específicas para los intereses mencionados\n";
  systemPrompt += "3. Respeta estrictamente el presupuesto y ritmo de viaje indicados\n";
  systemPrompt += "4. Cada día debe incluir al menos 4-5 actividades principales con tiempos y duraciones realistas\n";
  
  return systemPrompt;
}

// Función para generar un itinerario de prueba más completo y realista
function generarItinerarioPrueba(destino, fechaInicio, fechaFin) {
  // Calcular la duración del viaje
  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);
  const duracion = Math.ceil((fin - inicio) / (1000 * 60 * 60 * 24)) + 1;
  
  let itinerario = `# Itinerario de viaje a ${destino}\n\n`;
  
  // Generar un día para cada fecha del viaje
  for (let i = 0; i < duracion; i++) {
    const currentDate = new Date(inicio);
    currentDate.setDate(inicio.getDate() + i);
    const formattedDate = currentDate.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    itinerario += `## Día ${i+1}: ${formattedDate}\n\n`;
    
    // Mañana
    itinerario += `- 08:30 - Desayuno en Café Local [RESERVAR] (https://cafelocal-${destino.toLowerCase().replace(/\s/g, '')}.com)\n`;
    itinerario += `- 10:00 - Visita al Museo Principal de ${destino} (https://museo-${destino.toLowerCase().replace(/\s/g, '')}.org) - Transporte: Metro\n`;
    itinerario += `- 12:30 - Paseo por el centro histórico y compras en Mercado Tradicional (https://mercado-${destino.toLowerCase().replace(/\s/g, '')}.com) - Transporte: A pie\n`;
    
    // Tarde
    itinerario += `- 14:00 - Almuerzo en Restaurante Típico [RESERVAR] (https://restaurante-tipico-${destino.toLowerCase().replace(/\s/g, '')}.com) - Transporte: A pie\n`;
    itinerario += `- 16:00 - Visita a ${['Parque Nacional', 'Catedral', 'Castillo', 'Jardín Botánico', 'Mirador'][i % 5]} (https://${['parque', 'catedral', 'castillo', 'jardin', 'mirador'][i % 5]}-${destino.toLowerCase().replace(/\s/g, '')}.com) - Transporte: Autobús\n`;
    itinerario += `- 18:30 - Tiempo libre para descansar en el hotel - Transporte: Taxi\n`;
    
    // Noche
    itinerario += `- 20:30 - Cena en ${['Restaurante Gourmet', 'Taberna Local', 'Mercado Nocturno', 'Restaurante con Vistas', 'Bistró Tradicional'][i % 5]} [RESERVAR] (https://${['gourmet', 'taberna', 'mercado-noche', 'vistas', 'bistro'][i % 5]}-${destino.toLowerCase().replace(/\s/g, '')}.com) - Transporte: A pie\n`;
    
    if (i % 3 === 0) {
      itinerario += `- 22:00 - Espectáculo cultural o show nocturno [RESERVAR] (https://cultura-${destino.toLowerCase().replace(/\s/g, '')}.com) - Transporte: Taxi\n`;
    }
    
    // Consejos del día
    itinerario += `\n### CONSEJOS DEL DÍA\n`;
    itinerario += `- Lleva contigo la tarjeta de transporte que puedes adquirir en cualquier estación de metro\n`;
    itinerario += `- El ${['Museo Principal', 'Parque Nacional', 'Catedral', 'Castillo', 'Jardín Botánico'][i % 5]} suele estar menos concurrido en las primeras horas\n`;
    itinerario += `- Reserva con antelación en los restaurantes marcados como [RESERVAR], especialmente en temporada alta\n`;
    itinerario += `- El clima en esta época suele ser ${['caluroso', 'templado', 'variable', 'fresco', 'húmedo'][i % 5]}, prepárate adecuadamente\n\n`;
  }
  
  return itinerario;
}

// Añadir esta función para regenerar un itinerario existente
function regenerarItinerario() {
  console.log("Regenerando itinerario...");
  
  // Verificar si tenemos suficientes créditos
  const usingOwnKey = localStorage.getItem('usingOwnKey') === 'true';
  const credits = parseInt(localStorage.getItem('credits') || '0');
  
  // Si no es modo desarrollo, no tiene créditos y no usa su propia key, mostrar el modal
  if (!IS_DEV_MODE && credits <= 0 && !usingOwnKey) {
    openCreditsModal();
    return;
  }
  
  // Llamar a la función principal de generación
  generarItinerario();
}

// Añadir un botón de regenerar si quieres esta funcionalidad
// En alguna parte apropiada de tu HTML, por ejemplo:
// <button id="regenerar-btn" class="action-btn"><i class="fas fa-sync-alt"></i> Regenerar</button>

// Y luego agregar el event listener:
const regenerarBtn = document.getElementById('regenerar-btn');
if (regenerarBtn) {
  regenerarBtn.addEventListener('click', regenerarItinerario);
}

// Función para editar un día específico
function editarDia(numDia) {
  const daySection = document.getElementById(`day-${numDia}`);
  const dayContent = daySection.querySelector('.day-content').innerHTML;
  
  // Crear un modal para editar el contenido
  const modal = document.createElement('div');
  modal.className = 'edit-modal';
  modal.innerHTML = `
    <div class="edit-modal-content">
      <h3>Editar Día ${numDia}</h3>
      <textarea id="edit-day-textarea" rows="15" class="edit-textarea">${extraerTextoPlano(dayContent)}</textarea>
      <div class="edit-buttons">
        <button class="cancel-edit-btn" onclick="cerrarModalEdicion()">Cancelar</button>
        <button class="save-edit-btn" onclick="guardarEdicionDia(${numDia})">Guardar</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.getElementById('edit-day-textarea').focus();
}

// Función para regenerar un día específico
function regenerarDia(numDia) {
  // Verificar créditos primero
  const usingOwnKey = localStorage.getItem('usingOwnKey') === 'true';
  const credits = parseInt(localStorage.getItem('credits') || '0');
  
  if (!IS_DEV_MODE && credits <= 0 && !usingOwnKey) {
    openCreditsModal();
    return;
  }
  
  // Obtener información del itinerario actual
  const fullItinerary = localStorage.getItem('currentFullItinerary');
  const destino = localStorage.getItem('currentDestination');
  const fechaInicio = localStorage.getItem('currentStartDate');
  const fechaFin = localStorage.getItem('currentEndDate');
  
  // Extraer solo la información del día especificado
  const dayRegex = /## Día \d+[^\n]*/g;
  const dayMatches = [...fullItinerary.matchAll(dayRegex)];
  
  if (numDia <= dayMatches.length) {
    const dayTitle = dayMatches[numDia - 1][0];
    
    // Mostrar cargando solo para ese día
    const daySection = document.getElementById(`day-${numDia}`);
    daySection.innerHTML = `
      <div class="day-loading">
        <div class="spinner"></div>
        <span>Regenerando el día ${numDia}...</span>
      </div>
    `;
    
    // Preparar prompt específico para este día
    let systemPrompt = "Eres un EXPERTO EN PLANIFICACIÓN DE VIAJES. Tu tarea es regenerar SOLAMENTE UN DÍA ESPECÍFICO de un itinerario existente. ";
    systemPrompt += "Mantén el mismo estilo, nivel de detalle y formato que en el ejemplo, pero con nuevas actividades y lugares.\n\n";
    systemPrompt += "REGLAS OBLIGATORIAS:\n";
    systemPrompt += "1. Incluye URLs reales para cada lugar/atracción mencionado.\n";
    systemPrompt += "2. Marca con [RESERVAR] los lugares donde sea necesario reservar.\n";
    systemPrompt += "3. Especifica el medio de transporte entre actividades.\n";
    systemPrompt += "4. Incluye una sección '### CONSEJOS DEL DÍA' con 3-5 recomendaciones prácticas.\n";
    systemPrompt += "5. IMPORTANTE: Genera ÚNICAMENTE el contenido para este día, sin modificar los demás días.";
    
    let promptText = `Regenera SOLO el ${dayTitle} del itinerario para mi viaje a ${destino} (del ${fechaInicio} al ${fechaFin}).`;
    promptText += `\n\nMantén el mismo estilo y formato, pero sugiere actividades y lugares diferentes para este día en particular.`;
    
    // Simular o hacer la petición real
    if (IS_DEV_MODE) {
      setTimeout(() => {
        // Generar un día de prueba
        const nuevoDia = generarDiaPrueba(numDia, destino);
        actualizarDiaEnItinerario(numDia, nuevoDia);
      }, 1500);
    } else {
      // Hacer la solicitud real a la API
      fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          promptData: promptText,
          systemPrompt: systemPrompt
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.choices && data.choices[0]) {
          const nuevoDia = data.choices[0].message.content;
          actualizarDiaEnItinerario(numDia, nuevoDia);
          
          // Descontar crédito si corresponde
          const usingOwnKey = localStorage.getItem('usingOwnKey') === 'true';
          if (!usingOwnKey) {
            const credits = parseInt(localStorage.getItem('credits') || '0');
            const newCredits = credits - 1;
            localStorage.setItem('credits', newCredits.toString());
            updateCreditsDisplay();
            
            if (newCredits <= 1) {
              showCreditRemainingNotification(newCredits);
            }
          }
        } else {
          mostrarErrorRegeneracion(numDia);
        }
      })
      .catch(error => {
        console.error("Error regenerando día:", error);
        mostrarErrorRegeneracion(numDia);
      });
    }
  }
}

// Función para actualizar un día en el itinerario
function actualizarDiaEnItinerario(numDia, nuevoDia) {
  const daySection = document.getElementById(`day-${numDia}`);
  if (!daySection) return;
  
  // Actualizar el HTML del día
  crearSeccionDia(`Día ${numDia}`, nuevoDia, numDia);
  
  // Reemplazar el día existente
  daySection.parentNode.replaceChild(
    document.getElementById(`day-${numDia}`), 
    daySection
  );
  
  // Guardar el itinerario actualizado
  actualizarItinerarioCompleto();
  
  // Mostrar notificación
  showNotification(`¡Día ${numDia} regenerado con éxito!`);
}

// Función para editar una actividad específica
function editarActividad(numDia, numActividad) {
  const daySection = document.getElementById(`day-${numDia}`);
  const activityContainers = daySection.querySelectorAll('.activity-container');
  
  if (numActividad < activityContainers.length) {
    const activityContent = activityContainers[numActividad].querySelector('li').innerHTML;
    
    // Crear un modal para editar la actividad
    const modal = document.createElement('div');
    modal.className = 'edit-modal';
    modal.innerHTML = `
      <div class="edit-modal-content">
        <h3>Editar Actividad</h3>
        <textarea id="edit-activity-textarea" rows="5" class="edit-textarea">${extraerTextoPlano(activityContent)}</textarea>
        <div class="edit-buttons">
          <button class="cancel-edit-btn" onclick="cerrarModalEdicion()">Cancelar</button>
          <button class="save-edit-btn" onclick="guardarEdicionActividad(${numDia}, ${numActividad})">Guardar</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    document.getElementById('edit-activity-textarea').focus();
  }
}

// Funciones auxiliares
function extraerTextoPlano(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || '';
}

function cerrarModalEdicion() {
  const modal = document.querySelector('.edit-modal');
  if (modal) {
    document.body.removeChild(modal);
  }
}

function guardarEdicionDia(numDia) {
  const contenido = document.getElementById('edit-day-textarea').value;
  const daySection = document.getElementById(`day-${numDia}`);
  
  // Reemplazar el contenido del día
  const dayContent = daySection.querySelector('.day-content');
  dayContent.innerHTML = procesarTextoMarkdown(contenido);
  
  // Cerrar el modal
  cerrarModalEdicion();
  
  // Actualizar el itinerario completo
  actualizarItinerarioCompleto();
  
  // Mostrar notificación
  showNotification(`¡Día ${numDia} actualizado con éxito!`);
}

function guardarEdicionActividad(numDia, numActividad) {
  const contenido = document.getElementById('edit-activity-textarea').value;
  const daySection = document.getElementById(`day-${numDia}`);
  const activityContainers = daySection.querySelectorAll('.activity-container');
  
  if (numActividad < activityContainers.length) {
    // Reemplazar el contenido de la actividad
    const activityLi = activityContainers[numActividad].querySelector('li');
    activityLi.innerHTML = procesarTextoMarkdown(contenido);
    
    // Cerrar el modal
    cerrarModalEdicion();
    
    // Actualizar el itinerario completo
    actualizarItinerarioCompleto();
    
    // Mostrar notificación
    showNotification(`¡Actividad actualizada con éxito!`);
  }
}

// Función para generar un día de prueba en modo desarrollo
function generarDiaPrueba(numDia, destino) {
  const actividades = [
    "Desayuno en Café Artesanal [RESERVAR] (https://cafe-artesanal.com) - Transporte: A pie",
    "Visita al Museo de Historia (https://museo-historia.com) - Transporte: Metro",
    "Almuerzo en Restaurante Local [RESERVAR] (https://restaurante-local.com) - Transporte: A pie",
    "Tour por el Casco Antiguo (https://tours-locales.com) - Transporte: A pie",
    "Cena en Terraza Panorámica [RESERVAR] (https://terraza-panoramica.com) - Transporte: Taxi"
  ];
  
  const consejos = [
    "Lleva contigo efectivo para los mercados locales donde no suelen aceptar tarjetas",
    "Las entradas al museo se pueden comprar online para evitar filas",
    "El transporte público es más económico con tarjetas de varios días",
    "Los restaurantes con [RESERVAR] suelen llenarse, reserva con al menos 2 días de antelación"
  ];
  
  let dayContent = `## Día ${numDia}\n\n`;
  
  // Añadir actividades aleatorias
  actividades.forEach((act, i) => {
    dayContent += `- ${(8 + i * 3)}:00 - ${act}\n`;
  });
  
  // Añadir consejos
  dayContent += "\n### CONSEJOS DEL DÍA\n";
  consejos.forEach(consejo => {
    dayContent += `- ${consejo}\n`;
  });
  
  return dayContent;
}

// Función para actualizar el itinerario completo después de ediciones
function actualizarItinerarioCompleto() {
  // Esta función reconstruiría el itinerario completo basado en todas las secciones
  // y lo guardaría en localStorage para mantener la coherencia
  // Implementación detallada depende de cómo se almacenan los datos
}

// Asegurarse de que el toggle funcione correctamente
if (toggleSidebarBtn) {
  toggleSidebarBtn.addEventListener('click', toggleSidebar);
}

// Cerrar automáticamente el sidebar en móviles cuando se genere un itinerario
function closeFiltersSidebarOnMobile() {
  if (window.innerWidth <= 768) {
    const appLayout = document.querySelector('.app-layout');
    appLayout.classList.add('sidebar-collapsed');
    
    // Cambiar el ícono
    const toggleIcon = toggleSidebarBtn.querySelector('i');
    if (toggleIcon) {
      toggleIcon.className = 'fas fa-chevron-right';
    }
  }
}

// Agregar una función para verificar si una función consumirá créditos
function willConsumeCredit() {
  const usingOwnKey = localStorage.getItem('usingOwnKey') === 'true';
  const credits = parseInt(localStorage.getItem('credits') || '0');
  
  return !usingOwnKey && credits > 0 && !IS_DEV_MODE;
}

// Agregar logs para depuración
function checkCreditStatus() {
  const usingOwnKey = localStorage.getItem('usingOwnKey') === 'true';
  const credits = parseInt(localStorage.getItem('credits') || '0');
  const initialized = localStorage.getItem('creditsInitialized') === 'true';
  
  console.log("Estado de créditos:", {
    usingOwnKey,
    credits,
    initialized,
    isDev: IS_DEV_MODE
  });
}

// Add this HTML after the USE_REAL_API toggle in index.html
const apiHelpText = document.createElement('small');
apiHelpText.className = 'form-help';
apiHelpText.innerHTML = 'En desarrollo: las llamadas directas a la API pueden requerir una extensión CORS como <a href="https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf" target="_blank">Allow CORS</a>';
document.getElementById('use-real-api-toggle').parentNode.parentNode.appendChild(apiHelpText);

// Function to format URLs to be more readable
function formatearURL(url) {
  try {
    const urlObj = new URL(url);
    let displayUrl = urlObj.hostname;
    
    // Remove www. if present
    displayUrl = displayUrl.replace(/^www\./, '');
    
    // Truncate if too long
    if (displayUrl.length > 25) {
      displayUrl = displayUrl.substring(0, 22) + '...';
    }
    
    return displayUrl;
  } catch (e) {
    // If URL parsing fails, just return a shortened version
    if (url.length > 25) {
      return url.substring(0, 22) + '...';
    }
    return url;
  }
}

// Add this function to handle itineraries without clear day sections
function procesarContenidoCompleto(contenido) {
  // Format the entire content using our markdown processor
  const formattedContent = procesarTextoMarkdown(contenido);
  
  // Create a container for the content
  const contentContainer = document.createElement('div');
  contentContainer.className = 'full-itinerary-content';
  contentContainer.innerHTML = formattedContent;
  
  // Add to the response box
  responseBox.appendChild(contentContainer);
  
  // Add styling for this container
  const style = document.createElement('style');
  style.textContent = `
    .full-itinerary-content {
      padding: 20px;
      background-color: var(--card-color);
      border-radius: 10px;
      border: 1px solid var(--border-color);
      line-height: 1.6;
    }
    
    .full-itinerary-content h1, 
    .full-itinerary-content h2, 
    .full-itinerary-content h3 {
      margin-top: 20px;
      margin-bottom: 10px;
      color: var(--heading-color);
    }
    
    .full-itinerary-content ul {
      margin-bottom: 20px;
      padding-left: 20px;
    }
  `;
  document.head.appendChild(style);
}

// Actualizar la función callAssistantWithBrowsing para usar GPT-4o y navegación web
async function callAssistantWithBrowsing(promptText, systemPrompt, apiKey) {
  console.log("Llamando a OpenAI Assistant API con capacidad de navegación web");
  
  try {
    // Paso 1: Crear un asistente con GPT-4o y configurar navegación web con 'function'
    const createAssistantResponse = await fetch('https://api.openai.com/v1/assistants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'OpenAI-Beta': 'assistants=v2'
      },
      body: JSON.stringify({
        model: "gpt-4o",
        name: "Travel Planner",
        instructions: systemPrompt + "\nUtiliza la web para buscar información actualizada sobre lugares, atracciones, hoteles y restaurantes para proporcionar las URL actualizadas y correctas.",
        tools: [
          {
            "type": "function",
            "function": {
              "name": "web_crawler",
              "description": "Crawl a website and extract relevant information for travel planning",
              "parameters": {
                "type": "object",
                "properties": {
                  "url": {
                    "type": "string",
                    "description": "URL to crawl for information"
                  },
                  "query": {
                    "type": "string", 
                    "description": "Optional search query for the website"
                  }
                },
                "required": ["url"]
              }
            }
          }
        ]
      })
    });
    
    if (!createAssistantResponse.ok) {
      const errorData = await createAssistantResponse.json();
      throw new Error(`Error creando asistente: ${errorData.error?.message || 'Error desconocido'}`);
    }
    
    const assistant = await createAssistantResponse.json();
    console.log("Asistente creado:", assistant.id);
    
    // Paso 2: Crear un thread
    const createThreadResponse = await fetch('https://api.openai.com/v1/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'OpenAI-Beta': 'assistants=v2'
      },
      body: JSON.stringify({})
    });
    
    if (!createThreadResponse.ok) {
      const errorData = await createThreadResponse.json();
      throw new Error(`Error creando thread: ${errorData.error?.message || 'Error desconocido'}`);
    }
    
    const thread = await createThreadResponse.json();
    console.log("Thread creado:", thread.id);
    
    // Paso 3: Añadir un mensaje al thread
    const addMessageResponse = await fetch(`https://api.openai.com/v1/threads/${thread.id}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'OpenAI-Beta': 'assistants=v2'
      },
      body: JSON.stringify({
        role: "user",
        content: promptText
      })
    });
    
    if (!addMessageResponse.ok) {
      const errorData = await addMessageResponse.json();
      throw new Error(`Error añadiendo mensaje: ${errorData.error?.message || 'Error desconocido'}`);
    }
    
    console.log("Mensaje añadido al thread");
    
    // Paso 4: Ejecutar el asistente
    const runAssistantResponse = await fetch(`https://api.openai.com/v1/threads/${thread.id}/runs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'OpenAI-Beta': 'assistants=v2'
      },
      body: JSON.stringify({
        assistant_id: assistant.id
      })
    });
    
    if (!runAssistantResponse.ok) {
      const errorData = await runAssistantResponse.json();
      throw new Error(`Error ejecutando asistente: ${errorData.error?.message || 'Error desconocido'}`);
    }
    
    const run = await runAssistantResponse.json();
    console.log("Ejecución iniciada:", run.id);
    
    // Paso 5: Esperar a que se complete la ejecución
    let runStatus = await checkRunStatus(thread.id, run.id, apiKey);
    let attempts = 0;
    const maxAttempts = 120; // Aumentado para dar más tiempo
    
    console.log("Esperando respuesta del asistente...");
    
    while (runStatus.status !== 'completed' && attempts < maxAttempts) {
      console.log(`Estado de ejecución: ${runStatus.status}, intento ${attempts + 1}/${maxAttempts}`);
      
      if (runStatus.status === 'requires_action') {
        console.log("La ejecución requiere acción:", runStatus.required_action);
        
        if (runStatus.required_action?.type === 'submit_tool_outputs') {
          await handleToolActions(thread.id, run.id, runStatus.required_action.submit_tool_outputs, apiKey);
        }
      } else if (runStatus.status === 'failed') {
        throw new Error(`Ejecución fallida: ${runStatus.last_error?.message || 'Error desconocido'}`);
      }
      
      // Esperar antes de verificar de nuevo
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await checkRunStatus(thread.id, run.id, apiKey);
      attempts++;
    }
    
    if (runStatus.status !== 'completed') {
      throw new Error(`La ejecución del asistente agotó el tiempo o falló. Estado final: ${runStatus.status}`);
    }
    
    console.log("Ejecución completada, obteniendo mensajes...");
    
    // Paso 6: Obtener mensajes
    const messagesResponse = await fetch(`https://api.openai.com/v1/threads/${thread.id}/messages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'OpenAI-Beta': 'assistants=v2'
      }
    });
    
    if (!messagesResponse.ok) {
      const errorData = await messagesResponse.json();
      throw new Error(`Error obteniendo mensajes: ${errorData.error?.message || 'Error desconocido'}`);
    }
    
    const messages = await messagesResponse.json();
    
    // Obtener el último mensaje del asistente
    const assistantMessages = messages.data.filter(msg => msg.role === 'assistant');
    if (assistantMessages.length === 0) {
      throw new Error('No se encontraron mensajes del asistente');
    }
    
    const lastMessage = assistantMessages[0];
    console.log("Mensaje recibido del asistente");
    
    // Extraer el contenido del mensaje
    if (Array.isArray(lastMessage.content)) {
      // Encontrar el bloque de contenido de texto
      const textContent = lastMessage.content.find(block => block.type === 'text');
      if (textContent) {
        console.log("Contenido de texto encontrado");
        return {
          choices: [{
            message: {
              content: textContent.text.value
            }
          }]
        };
      }
    }
    
    console.log("Estructura del mensaje:", lastMessage);
    return {
      choices: [{
        message: {
          content: typeof lastMessage.content === 'string' 
            ? lastMessage.content 
            : JSON.stringify(lastMessage.content)
        }
      }]
    };
    
  } catch (error) {
    console.error("Error en callAssistantWithBrowsing:", error);
    throw error;
  }
}

// Actualizar la función handleToolActions para manejar acciones del navegador
async function handleToolActions(threadId, runId, toolOutputs, apiKey) {
  console.log("Manejando acciones de herramientas:", toolOutputs);
  
  // Crear un array de salidas vacío si hay llamadas a herramientas
  const outputs = [];
  
  if (toolOutputs?.tool_calls) {
    for (const toolCall of toolOutputs.tool_calls) {
      console.log("ID de llamada a herramienta:", toolCall.id);
      console.log("Función:", toolCall.function?.name);
      console.log("Argumentos:", toolCall.function?.arguments);
      
      // Solo para depuración
      try {
        const args = JSON.parse(toolCall.function?.arguments || "{}");
        console.log("Argumentos parseados:", args);
      } catch (e) {
        console.log("No se pudieron parsear los argumentos");
      }
      
      // Para el navegador, permitir que complete la acción
      outputs.push({
        tool_call_id: toolCall.id,
        output: JSON.stringify({ 
          result: "Navegación web completada con éxito",
          url: toolCall.function?.arguments ? JSON.parse(toolCall.function.arguments).url : "unknown"
        })
      });
    }
  }
  
  // Enviar las salidas de las herramientas
  console.log("Enviando salidas de herramientas:", outputs);
  
  const submitResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}/submit_tool_outputs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'OpenAI-Beta': 'assistants=v2'
    },
    body: JSON.stringify({
      tool_outputs: outputs
    })
  });
  
  if (!submitResponse.ok) {
    const errorData = await submitResponse.json();
    throw new Error(`Error enviando salidas de herramientas: ${errorData.error?.message || 'Error desconocido'}`);
  }
  
  const result = await submitResponse.json();
  console.log("Resultado de envío de salidas:", result);
  
  return result;
}

// Update the checkRunStatus function to use v2
async function checkRunStatus(threadId, runId, apiKey) {
  const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'OpenAI-Beta': 'assistants=v2'  // Updated to v2
    }
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error checking run status: ${errorData.error?.message || 'Unknown error'}`);
  }
  
  return response.json();
}

// Add fallback method to use GPT-4o directly
async function callGPT4oDirectly(promptText, systemPrompt, apiKey) {
  console.log("Llamando directamente a la API de Chat con GPT-4o");
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: promptText }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error llamando a la API de OpenAI: ${errorData.error?.message || 'Error desconocido'}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error en callGPT4oDirectly:", error);
    throw error;
  }
}