// src/components/CountryDetail.jsx
import React, { useEffect, useState } from "react";
import { getCountryDetails } from "../api/countries";

export default function CountryDetail({ code, onBack }) {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getCountryDetails(code);
      console.log("Fetched country detail:", data); // 👀 Debug
      setCountry(data);
    })();
  }, [code]);

  if (!country) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        ⬅ Back
      </button>
      <div className="flex gap-6">
        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="w-40 h-28 object-cover rounded"
        />
        <div>
          <h2 className="text-2xl font-bold">{country.name.common}</h2>
          <p><strong>Capital:</strong> {country.capital?.[0]}</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Subregion:</strong> {country.subregion}</p>
          <p>
            <strong>Languages:</strong>{" "}
            {country.languages ? Object.values(country.languages).join(", ") : "N/A"}
          </p>
          <p>
            <strong>Currencies:</strong>{" "}
            {country.currencies
              ? Object.values(country.currencies)
                  .map((c) => `${c.name} (${c.symbol})`)
                  .join(", ")
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
