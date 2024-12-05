import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CountryProvider } from "./context/CountryContext";
import Countries from "./Components/CountriesTable";
import States from "./Components/StatesTable";

const App: React.FC = () => {
  return (
    <CountryProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Countries />} />
          <Route path="/:countryName" element={<States />} />
        </Routes>
      </Router>
    </CountryProvider>
  );
};

export default App;
