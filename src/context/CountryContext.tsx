import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create context for country data
interface Country {
  name: string;
  capital: string;
  flag: string;
  currency: string;
  dial_code: string;
  unicodeFlag: string;
}

interface CountryContextType {
  countriesData: Country[];
  loading: boolean;
  error: string | null;
  fetchCountriesData: () => void;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [countriesData, setCountriesData] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCountriesData = async () => {
    try {
      setLoading(true);
      const [capitals, flags, currencies, codes, unicodeFlags] = await Promise.all([
        axios.get("https://countriesnow.space/api/v0.1/countries/capital"),
        axios.get("https://countriesnow.space/api/v0.1/countries/flag/images"),
        axios.get("https://countriesnow.space/api/v0.1/countries/currency"),
        axios.get("https://countriesnow.space/api/v0.1/countries/codes"),
        axios.get("https://countriesnow.space/api/v0.1/countries/flag/unicode"),
      ]);

      const mergedData = capitals.data.data.map((country: any) => {
        const countryNameNormalized = country.name.trim().toLowerCase();
        const flagData = flags.data.data.find((f: any) => f.name.trim().toLowerCase() === countryNameNormalized);
        const currencyData = currencies.data.data.find((c: any) => c.name.trim().toLowerCase() === countryNameNormalized);
        const codeData = codes.data.data.find((d: any) => d.name.trim().toLowerCase() === countryNameNormalized);
        const unicodeFlagData = unicodeFlags.data.data.find((u: any) => u.name.trim().toLowerCase() === countryNameNormalized);

        return {
          name: country.name,
          capital: country.capital || "N/A",
          flag: flagData?.flag || "https://via.placeholder.com/150",
          currency: currencyData?.currency || "N/A",
          dial_code: codeData?.dial_code || "N/A",
          unicodeFlag: unicodeFlagData?.unicodeFlag || "N/A",
        };
      });

      setCountriesData(mergedData);
      setLoading(false);
    } catch (err: any) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountriesData();
  }, []);

  return (
    <CountryContext.Provider value={{ countriesData, loading, error, fetchCountriesData }}>
      {children}
    </CountryContext.Provider>
  );
};

// Create a custom hook to use the context
export const useCountryContext = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountryContext must be used within a CountryProvider");
  }
  return context;
};
