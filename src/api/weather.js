import axios from 'axios';

const WMO = {
  0: { d: 'Clear sky', i: '☀️' },
  1: { d: 'Mainly clear', i: '🌤️' },
  2: { d: 'Partly cloudy', i: '⛅' },
  3: { d: 'Overcast', i: '☁️' },
  45: { d: 'Fog', i: '🌫️' },
  48: { d: 'Depositing rime fog', i: '🌫️' },
  51: { d: 'Light drizzle', i: '🌦️' },
  53: { d: 'Moderate drizzle', i: '🌦️' },
  55: { d: 'Dense drizzle', i: '🌧️' },
  56: { d: 'Light freezing drizzle', i: '🌧️' },
  57: { d: 'Dense freezing drizzle', i: '🌧️' },
  61: { d: 'Slight rain', i: '🌧️' },
  63: { d: 'Moderate rain', i: '🌧️' },
  65: { d: 'Heavy rain', i: '🌧️' },
  66: { d: 'Light freezing rain', i: '🌧️' },
  67: { d: 'Heavy freezing rain', i: '🌧️' },
  71: { d: 'Slight snow', i: '🌨️' },
  73: { d: 'Moderate snow', i: '🌨️' },
  75: { d: 'Heavy snow', i: '❄️' },
  77: { d: 'Snow grains', i: '❄️' },
  80: { d: 'Rain showers', i: '🌧️' },
  81: { d: 'Heavy rain showers', i: '⛈️' },
  82: { d: 'Violent rain showers', i: '⛈️' },
  85: { d: 'Snow showers', i: '🌨️' },
  86: { d: 'Heavy snow showers', i: '🌨️' },
  95: { d: 'Thunderstorm', i: '⛈️' },
  96: { d: 'Thunderstorm with hail', i: '⛈️' },
  99: { d: 'Thunderstorm with heavy hail', i: '⛈️' },
};

// Pick a nearby grid and return current weather.
// countryCode is unused for now but kept if you want country-based tweaks.
export async function getCurrentWeather(lat, lon, countryCode) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: [
      'temperature_2m',
      'apparent_temperature',
      'relative_humidity_2m',
      'precipitation',
      'weather_code',
      'wind_speed_10m'
    ].join(','),
    // returns metric by default
    timezone: 'auto',
  });
  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  const { data } = await axios.get(url, { timeout: 15000 });
  const c = data.current || {};
  const meta = WMO[c.weather_code] || { d: 'N/A', i: '🌡️' };
  return {
    temperature: round(c.temperature_2m),
    apparent: round(c.apparent_temperature),
    humidity: toInt(c.relative_humidity_2m),
    wind: round(c.wind_speed_10m),
    precip: round(c.precipitation),
    code: c.weather_code,
    description: meta.d,
    icon: meta.i,
    time: c.time,
  };
}

const round = (v) => (v == null ? null : Math.round(v));
const toInt = (v) => (v == null ? null : Math.round(v));
