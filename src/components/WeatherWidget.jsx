import React, { useEffect, useState } from 'react';
import { getCurrentWeather } from '../api/weather';

export default function WeatherWidget({ country }) {
  const capital = country.capital?.[0];
  const [state, setState] = useState({ loading: true, error: null, data: null });

  useEffect(() => {
    let ignore = false;
    (async () => {
      setState({ loading: true, error: null, data: null });
      try {
        // Prefer capitalInfo.latlng, fallback to country.latlng
        const [lat, lon] = country.capitalInfo?.latlng?.length === 2
          ? country.capitalInfo.latlng
          : country.latlng || [];
        if (lat == null || lon == null) {
          throw new Error('No coordinates available for this capital.');
        }
        const data = await getCurrentWeather(lat, lon, country.cca2);
        if (!ignore) setState({ loading: false, error: null, data });
      } catch (e) {
        if (!ignore) setState({ loading: false, error: e.message, data: null });
      }
    })();
    return () => { ignore = true; };
  }, [country]);

  if (!capital) return <Note>Capital missing — cannot fetch weather.</Note>;
  if (state.loading) return <Note>Loading weather for <b>{capital}</b>…</Note>;
  if (state.error) return <Note>Weather unavailable: {state.error}</Note>;

  const { temperature, apparent, humidity, wind, precip, code, description, icon } = state.data;
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="card-glass rounded-xl p-4 flex items-center gap-3">
        <span className="text-3xl">{icon}</span>
        <div>
          <div className="text-lg font-semibold">{temperature}°C <span className="opacity-70 text-sm">feels {apparent}°C</span></div>
          <div className="opacity-80 text-sm">{description}</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Metric label="Humidity" value={`${humidity}%`}/>
        <Metric label="Wind" value={`${wind} km/h`}/>
        <Metric label="Precip" value={`${precip} mm`}/>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="card-glass rounded-xl p-3">
      <div className="text-[10px] uppercase opacity-60">{label}</div>
      <div className="mt-1 text-lg">{value}</div>
    </div>
  );
}

function Note({ children }) {
  return (
    <div className="card-glass rounded-xl p-4 text-sm opacity-90">{children}</div>
  );
}
