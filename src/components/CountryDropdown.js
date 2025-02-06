import React from 'react';
import '../styles/CountryDropdown.css'; 

const countryList = [
  { code: "FR", name: { en: "France", he: "צרפת" } },
  { code: "IL", name: { en: "Israel", he: "ישראל" } },
  { code: "CY", name: { en: "Cyprus", he: "קפריסין" } },
  { code: "IT", name: { en: "Italy", he: "איטליה" } }
];

const CountryDropdown = ({ selectedCountry, setSelectedCountry, language }) => {
  return (
    <div className="country-dropdown-container">
      <select 
        className="country-dropdown" 
        value={selectedCountry} 
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="" disabled>
          {language === 'he' ? 'חפש' : 'Search'}
        </option>
        {countryList.map(({ code, name }) => (
          <option key={code} value={code}>
            {name[language]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryDropdown;
