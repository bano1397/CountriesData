// src/components/CountryList.jsx
import React from "react";

export default function CountryList({ countries, onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {countries.map((country) => (
        <div
          key={country.cca3}
          className="cursor-pointer border rounded-lg p-2 hover:shadow-lg transition"
          onClick={() => onSelect(country.cca3)}
        >
          <img
            src={country.flags.svg}
            alt={country.name.common}
            className="w-full h-20 object-cover rounded"
          />
          <p className="mt-2 text-center font-medium">{country.name.common}</p>
        </div>
      ))}
    </div>
  );
}
