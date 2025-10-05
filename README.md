# Météo Estavayer Chrome Extension

Chrome extension displaying real-time wind speed and weather data from the Estavayer-le-Lac port weather station in Switzerland.

## Description

This extension shows the current wind speed in the browser toolbar badge and provides detailed weather information in a popup interface. Data is sourced from the official weather station operated by SOCOOP (Société Coopérative du Port d'Estavayer) and CVE (Cercle de la Voile d'Estavayer).

## Features

- **Badge Display**: Current wind speed shown directly in the extension icon
- **Detailed Weather Data**: 
  - Wind speed and direction
  - Wind gusts
  - Air and water temperature
  - Atmospheric pressure
  - Humidity
  - Daily rainfall
- **Auto-refresh**: Data updates every 5 minutes
- **Manual Refresh**: Force update with a single click
- **Direct Link**: Quick access to the full weather station website

## Installation

### Method 1: Download ZIP

1. Click the green "Code" button at the top of this page
2. Select "Download ZIP"
3. Extract the ZIP file to a folder on your computer
4. Open Chrome and navigate to `chrome://extensions/`
5. Enable "Developer mode" (toggle in the top right)
6. Click "Load unpacked"
7. Select the extracted `meteo-estavayer` folder

### Method 2: Clone with Git

1. Clone this repository:
   ```bash
   git clone git@github.com:dmrrlc/meteo-estavayer.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" (toggle in the top right)

4. Click "Load unpacked"

5. Select the `meteo-estavayer` folder

## Data Source

Weather data is provided by:
- **Website**: https://meteo.cvestavayer.ch/
- **Location**: Port of Estavayer-le-Lac, Switzerland (46° 51.02' N / 006° 50.33' E)
- **Operators**: 
  - [Société Coopérative du Port (SOCOOP)](http://www.socoop.org/)
  - [Cercle de la Voile d'Estavayer (CVE)](http://www.cvestavayer.ch/)

## Technical Details

- **Manifest Version**: 3
- **Update Interval**: 5 minutes
- **Permissions**: Storage, Alarms
- **Host Permissions**: https://meteo.cvestavayer.ch/*

## File Structure

```
meteo-estavayer/
├── manifest.json       # Extension configuration
├── background.js       # Service worker for data fetching
├── popup.html          # Popup interface
├── popup.js            # Popup logic
├── icon16.png          # 16x16 icon
├── icon48.png          # 48x48 icon
└── icon128.png         # 128x128 icon
```

## Legal Notice

**This is an unofficial extension.** 

This extension scrapes data from the Estavayer weather station website. Before any public distribution or commercial use, permission should be obtained from SOCOOP and CVE.

Contact: meteocve@wirthweb.com

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT License - See LICENSE file for details

## Disclaimer

This extension is provided "as is" without warranty. The author is not affiliated with SOCOOP, CVE, or the operators of meteo.cvestavayer.ch.

Weather data accuracy depends on the source website. Always verify critical weather information from official sources before making safety-related decisions.