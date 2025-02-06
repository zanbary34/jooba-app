import React from 'react';
import '../styles/Jooba.css';

const LanguageSwitcher = ({ language, setLanguage }) => {
    const toggleLanguage = () => {
        setLanguage((prevLang) => (prevLang === 'en' ? 'he' : 'en')); 
      };

  return (
    <div className="language-switcher">
      <button
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => toggleLanguage()}
      >
          {language === 'he' ? 'אנג' : 'ENG'}
          </button>
      <button
        className={`lang-btn ${language === 'he' ? 'active' : ''}`}
        onClick={() => toggleLanguage()}
      >
            {language === 'he' ? 'עב' : 'HE'}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
