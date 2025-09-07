import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { getAllCountries } from './api/countries';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';
import SearchBar from './components/SearchBar';

export default function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('All');
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | loading | error
  const [error, setError] = useState(null);

useEffect(() => {
  (async () => {
    setStatus('loading');
    try {
      const data = await getAllCountries();
      console.log('Fetched data count:', data.length, data[0]);
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      setCountries(data);
      setStatus('idle');
    } catch (e) {
      console.error('Fetch failed:', e);
      setError('Failed to fetch countries. Please refresh.');
      setStatus('error');
    }
  })();
}, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return countries.filter(c => {
      const inRegion = region === 'All' || c.region === region;
      const matches =
        !q ||
        c.name.common.toLowerCase().includes(q) ||
        (c.capital?.[0] || '').toLowerCase().includes(q);
      return inRegion && matches;
    });
  }, [countries, query, region]);

  return (
    <div className="min-h-screen px-4 md:px-10 lg:px-16 pb-16">
      <header className="pt-10 pb-6">
        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 12 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight"
        >
          🌍 Countries Explorer
        </motion.h1>
        <p className="opacity-80 mt-2">Click a country to see details — currency, capital, population, flag, and optional weather for the capital.</p>
      </header>

      <div className="grid gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-4">
        <div className="md:col-span-2 lg:col-span-3 order-2 md:order-1">
          {status === 'loading' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card-glass rounded-xl p-6"
            >
              <Loader />
            </motion.div>
          )}

          {status === 'error' && (
            <div className="card-glass rounded-xl p-6 text-red-200">
              {error}
            </div>
          )}

          {status === 'idle' && (
            <CountryList countries={filtered} onSelect={setSelected}/>
          )}
        </div>

        <aside className="order-1 md:order-2">
          <div className="card-glass rounded-xl p-4 md:p-6 sticky top-4">
            <SearchBar
              query={query}
              onQuery={setQuery}
              region={region}
              onRegion={setRegion}
            />
            <p className="text-xs opacity-70 mt-3">
              Data from REST Countries • Weather by Open-Meteo
            </p>
          </div>
        </aside>
      </div>

      <CountryDetail country={selected} onClose={() => setSelected(null)}/>
    </div>
  );
}

function Loader() {
  return (
    <div className="flex items-center gap-3">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
      </span>
      <span className="opacity-80">Loading countries…</span>
    </div>
  );
}
