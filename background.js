// Fonction pour extraire le contenu d'un élément par son attribut name
function extractByName(html, name) {
  const regex = new RegExp(`name="${name}"[^>]*>([^<]+)<`, 'i');
  const match = html.match(regex);
  return match ? match[1].trim() : 'N/A';
}

// Fonction pour parser le HTML et extraire les données
function parseWeatherData(html) {
  // Extraire la vitesse du vent
  const windSpeed = extractByName(html, 'current_special_windSpeed');
  
  // Extraire le nombre de nœuds pour le badge
  const windSpeedMatch = windSpeed.match(/(\d+\.?\d*)/);
  const windSpeedNumber = windSpeedMatch ? windSpeedMatch[1] : '';
  
  // Extraire la date de mise à jour
  const updateMatch = html.match(/name="current_special_title"[^>]*>.*?<small>\(([^)]+)\)/i);
  const lastUpdate = updateMatch ? updateMatch[1] : '';
  
  // Extraire d'autres données de la section "Météo actuelle"
  const data = {
    windSpeed: windSpeed,
    windSpeedNumber: windSpeedNumber,
    windDirection: extractByName(html, 'current_special_windDir'),
    windGust: extractByName(html, 'current_windGust'),
    temperature: extractByName(html, 'current_outTemp'),
    waterTemp: extractByName(html, 'current_extraTemp1'),
    pressure: extractByName(html, 'current_barometer'),
    humidity: extractByName(html, 'current_outHumidity'),
    rain: extractByName(html, 'day_sum_rain'),
    lastUpdate: lastUpdate,
    timestamp: new Date().toISOString()
  };
  
  return data;
}

// Fonction pour récupérer les données météo
async function fetchWeatherData() {
  try {
    const response = await fetch('https://meteo.cvestavayer.ch/');
    const html = await response.text();
    const data = parseWeatherData(html);
    
    // Sauvegarder les données
    await chrome.storage.local.set({ weatherData: data });
    
    // Mettre à jour le badge avec la vitesse du vent
    chrome.action.setBadgeText({ text: data.windSpeedNumber });
    chrome.action.setBadgeBackgroundColor({ color: '#0066cc' });
    
    console.log('Données météo mises à jour:', data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    chrome.action.setBadgeText({ text: '!' });
    chrome.action.setBadgeBackgroundColor({ color: '#cc0000' });
  }
}

// Récupérer les données au démarrage
chrome.runtime.onInstalled.addListener(() => {
  fetchWeatherData();
  
  // Créer une alarme pour mettre à jour toutes les 5 minutes
  chrome.alarms.create('updateWeather', { periodInMinutes: 1 });
});

// Récupérer les données au démarrage du service worker
chrome.runtime.onStartup.addListener(() => {
  fetchWeatherData();
});

// Écouter l'alarme pour mettre à jour périodiquement
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'updateWeather') {
    fetchWeatherData();
  }
});

// Permettre au popup de demander une mise à jour manuelle
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'refresh') {
    fetchWeatherData().then(() => {
      chrome.storage.local.get(['weatherData'], (result) => {
        sendResponse({ success: true, data: result.weatherData });
      });
    });
    return true; // Indique qu'on va répondre de manière asynchrone
  }
});