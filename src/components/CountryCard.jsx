import React from 'react';
import { motion } from 'framer-motion';
import { formatPopulation } from '../utils/formatters';

export default function CountryCard({ country, onClick }) {
  const { name, flags, region, population, capital } = country;
  return (
    <motion.button
      layout
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="card-glass rounded-xl overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-cyan-400"
    >
      <div className="h-36 bg-black/20">
        <img
          src={flags?.svg || flags?.png}
          alt={`${name.common} flag`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{name.common}</h3>
        <div className="mt-1 text-sm opacity-80">
          <p><span className="opacity-70">Region:</span> {region}</p>
          <p><span className="opacity-70">Capital:</span> {capital?.[0] || '—'}</p>
          <p><span className="opacity-70">Population:</span> {formatPopulation(population)}</p>
        </div>
      </div>
    </motion.button>
  );
}
