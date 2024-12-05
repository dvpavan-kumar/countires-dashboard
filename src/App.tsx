import React from "react";
import { CountryProvider } from "./context/CountryContext";
import Countries from "./Components/CountriesTable";


const App: React.FC = () => {
  return (
    <CountryProvider>
<Countries/>
    </CountryProvider>
  );
};

export default App;
