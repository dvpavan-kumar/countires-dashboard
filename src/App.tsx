import React, { useState } from 'react';
import CountrySelector from './Components/CountrySelector';
import CountryDetails from './Components/CountryDetails';
import { useFetchData } from './hooks/useFetchData';

const Home = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const { data: countries, loading } = useFetchData('https://countriesnow.space/api/v0.1/countries');

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
  };

  if (loading) return <div className="text-center text-xl">Loading countries...</div>;
console.log('selectedCountry', selectedCountry)
  return (
    <div className="max-w-7xl mx-auto p-4">
      <CountrySelector countries={countries} onSelect={handleCountrySelect} />
      {selectedCountry && <CountryDetails country={selectedCountry} />}
    </div>
  );
};

export default Home;