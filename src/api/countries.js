// src/api/countries.js
import axios from "axios";

const BASE_URL = "https://restcountries.com/v3.1";

// ✅ Get all countries (grid)
export async function getAllCountries() {
  const { data } = await axios.get(
    `${BASE_URL}/all?fields=name,cca3,flags`
  );
  return data;
}

// ✅ Get details by code (cca3)
export async function getCountryDetails(code) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/alpha/${code}?fields=name,cca3,flags,capital,population,region,subregion,languages,currencies`
    );

    // Some responses return a single object, some an array
    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    console.error("Error fetching country details:", error);
    return null;
  }
}
