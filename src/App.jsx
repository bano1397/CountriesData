// src/App.jsx
import React, { useEffect, useState } from "react";
import { getAllCountries } from "./api/countries";
import CountryList from "./components/CountryList";
import CountryDetail from "./components/CountryDetail";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllCountries();
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(data);
      } catch (e) {
        console.error("Failed to fetch countries", e);
      }
    })();
  }, []);

  return (
    <div className="p-6">
      {!selected ? (
        <>
          <h1 className="text-3xl font-bold mb-6 text-center">
            🌍 Countries Explorer
          </h1>
          <CountryList countries={countries} onSelect={setSelected} />
        </>
      ) : (
        <CountryDetail code={selected} onBack={() => setSelected(null)} />
      )}
    </div>
  );
}
