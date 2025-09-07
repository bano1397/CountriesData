// src/api/countries.js
import axios from "axios";

const FIELDS = [
  "name",
  "cca2",
  "cca3",
  "flags",
  "capital",
  "population",
  "region",
  "subregion",
  "languages",
  "currencies"
  // removed "capitalInfo" and "latlng"
].join(",");

export async function getAllCountries() {
  const { data } = await axios.get(
    `https://restcountries.com/v3.1/all?fields=${FIELDS}`,
    { timeout: 20000 }
  );
  return data;
}
