import React from 'react';

interface CountrySelectorProps {
  countries: any[];
  onSelect: (country: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ countries, onSelect }) => {

  return (
    <div className="mb-4">
      <label htmlFor="country" className="block text-xl font-semibold">Select Country:</label>
      <select
        id="country"
        onChange={(e) => onSelect(e.target.value)}
        className="p-2 w-50 border rounded"
      >
        
        <option value="">-- Select a Country --</option>
        {countries.map((country) => (
          <option key={country.iso2} value={country.country}>
            {country.country}
          </option> 
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;
