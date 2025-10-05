// Fonction pour formater la date de mise à jour
function formatUpdateTime(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'À l\'instant';
  if (diffMins === 1) return 'Il y a 1 minute';
  if (diffMins < 60) return `Il y a ${diffMins} minutes`;
  
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `Mis à jour à ${hours}:${minutes}`;
}

// Fonction pour afficher les données
function displayWeatherData(data) {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('content').style.display = 'block';
  document.getElementById('error').style.display = 'none';
  
  // Extraire juste le nombre pour l'affichage principal
  const speedMatch = data.windSpeed.match(/(\d+\.?\d*)/);
  const speedNumber = speedMatch ? speedMatch[1] : '--';
  
  // Extraire la direction
  const dirMatch = data.windDirection.match(/\(([^)]+)\)/);
  const direction = dirMatch ? dirMatch[1] : data.windDirection;
  
  document.getElementById('windSpeed').textContent = speedNumber;
  document.getElementById('windDirection').textContent = direction;
  document.getElementById('windGust').textContent = data.windGust;
  document.getElementById('temperature').textContent = data.temperature;
  document.getElementById('waterTemp').textContent = data.waterTemp;
  document.getElementById('pressure').textContent = data.pressure;
  document.getElementById('humidity').textContent = data.humidity;
  document.getElementById('rain').textContent = data.rain;
  
  // Afficher le temps de mise à jour
  if (data.timestamp) {
    document.getElementById('updateTime').textContent = formatUpdateTime(data.timestamp);
  } else if (data.lastUpdate) {
    document.getElementById('updateTime').textContent = data.lastUpdate;
  }
}

// Fonction pour afficher une erreur
function showError(message) {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('content').style.display = 'none';
  const errorEl = document.getElementById('error');
  errorEl.textContent = message;
  errorEl.style.display = 'block';
}

// Charger les données au démarrage
function loadData() {
  chrome.storage.local.get(['weatherData'], (result) => {
    if (result.weatherData) {
      displayWeatherData(result.weatherData);
    } else {
      showError('Aucune donnée disponible. Veuillez patienter...');
      // Demander une actualisation
      chrome.runtime.sendMessage({ action: 'refresh' });
    }
  });
}

// Bouton d'actualisation
document.getElementById('refreshBtn').addEventListener('click', () => {
  document.getElementById('loading').style.display = 'block';
  document.getElementById('content').style.display = 'none';
  
  chrome.runtime.sendMessage({ action: 'refresh' }, (response) => {
    if (response && response.success && response.data) {
      displayWeatherData(response.data);
    } else {
      showError('Erreur lors de l\'actualisation des données.');
    }
  });
});

// Charger les données au démarrage du popup
loadData();