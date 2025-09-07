import React from 'react';

const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];

export default function SearchBar({ query, onQuery, region, onRegion }) {
  return (
    <div>
      <label htmlFor="q" className="text-sm opacity-80">Search</label>
      <input
        id="q"
        value={query}
        onChange={e => onQuery(e.target.value)}
        placeholder="Type country or capital…"
        className="mt-1 w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400"
      />

      <div className="mt-4">
        <label htmlFor="region" className="text-sm opacity-80">Region</label>
        <select
          id="region"
          value={region}
          onChange={e => onRegion(e.target.value)}
          className="mt-1 w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400"
        >
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
    </div>
  );
}
