import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { formatPopulation, formatCurrencies } from '../utils/formatters';
import WeatherWidget from './WeatherWidget';

export default function CountryDetail({ country, onClose }) {
  const [showWeather, setShowWeather] = useState(true);

  useEffect(() => {
    // reset toggle when country changes
    setShowWeather(true);
  }, [country]);

  if (!country) return null;

  const { name, flags, capital, population, region, subregion, languages, currencies } = country;

  const langs = useMemo(() => languages ? Object.values(languages).join(', ') : '—', [languages]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        className="fixed inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-[860px] z-50"
      >
        <div className="card-glass rounded-t-2xl md:rounded-2xl overflow-hidden">
          <div className="relative h-44 md:h-60">
            <img src={flags?.svg || flags?.png} alt={`${name.common} flag`} className="w-full h-full object-cover" />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 rounded-full bg-black/40 hover:bg-black/60 p-2"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="p-5 md:p-7">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <h2 className="text-2xl md:text-3xl font-bold">{name.common}</h2>
              <span className="text-sm opacity-75">Region: {region}{subregion ? ` • ${subregion}` : ''}</span>
            </div>

            <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
              <Info label="Official name" value={name.official}/>
              <Info label="Capital" value={capital?.join(', ') || '—'}/>
              <Info label="Population" value={formatPopulation(population)}/>
              <Info label="Languages" value={langs}/>
              <Info label="Currency" value={formatCurrencies(currencies)}/>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm opacity-75">Optional: Weather of capital</div>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showWeather}
                  onChange={() => setShowWeather(v => !v)}
                />
                <span className="text-sm">Show Weather</span>
              </label>
            </div>

            {showWeather && (
              <div className="mt-4">
                <WeatherWidget country={country}/>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function Info({ label, value }) {
  return (
    <div className="card-glass rounded-xl p-4">
      <p className="uppercase tracking-wide text-[10px] opacity-60">{label}</p>
      <p className="mt-1">{value}</p>
    </div>
  );
}
