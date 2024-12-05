import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Table from "./Table";

interface State {
  name: string;
  state_code: string;
}

const States: React.FC = () => {
  const { countryName } = useParams<{ countryName: string }>();
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(
          `https://countriesnow.space/api/v0.1/countries/states`
        );
        const countryData = response.data.data.find(
          (country: any) =>
            country.name.toLowerCase() === countryName?.toLowerCase()
        );
        setStates(countryData?.states || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch states data");
        setLoading(false);
      }
    };

    if (countryName) {
      fetchStates();
    }
  }, [countryName]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const headers = ["State", "state_code"];
  const bodyContent = states.map((state) => [state.name, state.state_code]);
  return (
    <div className="container mx-auto px-4 py-6">
    <h1 className="text-3xl font-semibold mb-6">{countryName} States</h1>
    <Table headers={headers} bodyContent={bodyContent} />
  </div>
  );
};

export default States;
