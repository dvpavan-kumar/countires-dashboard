import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CountryDetailsProps {
  country: string;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ country }) => {
    const [countryDetails, setCountryDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchCountryDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://countriesnow.space/api/v0.1/countries/population`, {
                    params: { country },
                });
                setCountryDetails(response.data.data);
                setLoading(false);
      } catch (error) {
          console.error('Error fetching country details:', error);
          setLoading(false);
        }
    };
    
    fetchCountryDetails();
}, [country]);

if (loading) return <div>Loading details...</div>;

if (!countryDetails) return <div>No details available for {country}.</div>;
console.log('country', countryDetails)

  return (
    <div className="mt-6">
      <div className="country-info mb-4">
        <h2 className="text-2xl font-semibold">{countryDetails.country}</h2>
      </div>

      <div className="states-table">
        <table className="min-w-full table-auto mt-4 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">State</th>
              <th className="border border-gray-300 p-2">Population</th>
            </tr>
          </thead>
          <tbody>
            {/* {countryDetails.states.map((state: any) => (
              <tr key={state.name}>
                <td className="border border-gray-300 p-2">{state.year}</td>
                <td className="border border-gray-300 p-2">{state.value}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CountryDetails;
