import React, { useState } from "react";
import { useCountryContext } from "../context/CountryContext";
import Table from "../Components/Table"; // Ensure the path is correct

const Countries: React.FC = () => {
  const { countriesData, loading, error } = useCountryContext();
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Function to handle the search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter countries based on search query
  const filteredCountries = countriesData.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const headers = [
    "Flag",
    "Country",
    "Capital",
    "Currency",
    "Unicode Flag",
    "Dial Code",
  ];

  const bodyContent = filteredCountries.map((country) => [
    <img
      src={country.flag}
      alt={`${country.name} flag`}
      className="w-20 h-20 object-contain"
    />,
    <a href={`/${country.name}`}>{country.name}</a>,
    country.capital || "N/A",
    country.currency || "N/A",
    country.unicodeFlag || "N/A",
    country.dial_code || "N/A",
  ]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold mb-6">Countries Information</h1>
      
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search countries..."
          className="w-50 p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <Table headers={headers} bodyContent={bodyContent} />
    </div>
  );
};

export default Countries;
