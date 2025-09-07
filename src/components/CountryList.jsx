import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountryCard from './CountryCard';

export default function CountryList({ countries, onSelect }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        layout
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {countries.map((c) => (
          <CountryCard key={c.cca3} country={c} onClick={() => onSelect(c)} />
        ))}
        {countries.length === 0 && (
          <div className="card-glass rounded-xl p-6">No results.</div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
