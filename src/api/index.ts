import axios from 'axios';

export const fetchCountries = async () => {
  try {
    const response = await axios.get('https://countriesnow.space/api/v0.1/countries');
    return response.data.data; 
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};
