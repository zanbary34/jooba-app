import React, { useEffect, useState, useCallback } from 'react';
import GuessService from '../services/guessService';
import '../styles/UserWins.css'; 

const countryList = [
  { code: "FR", name: { en: "France", he: "צרפת" } },
  { code: "IL", name: { en: "Israel", he: "ישראל" } },
  { code: "CY", name: { en: "Cyprus", he: "קפריסין" } },
  { code: "IT", name: { en: "Italy", he: "איטליה" } }
];

const UserWins = ({ username, refreshWins, language }) => {
  const [wins, setWins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const resultsPerPage = 3;

  // Function to find the translated country name
  const getTranslatedCountry = (countryCode) => {
    const country = countryList.find(c => c.code === countryCode);
    return country ? country.name[language] : countryCode;
  };

  const fetchWins = useCallback(async () => {
    try {
      const result = await GuessService.getUserWins(username);
      const sortedWins = result.guesses.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      setWins(sortedWins);
      setCurrentIndex(Math.max(0, sortedWins.length - resultsPerPage)); // Ensure last results are at the right
    } catch (error) {
      setError(language === 'he' ? 'שגיאה בהבאת הנתונים' : 'Failed to fetch wins');
    } finally {
      setLoading(false);
    }
  }, [username, language, refreshWins]);

  useEffect(() => {
    if (!username) return;
    fetchWins();
  }, [username, fetchWins, refreshWins, language]); // 🆕 Listen to language change

  const handleNext = () => {
    if (currentIndex + 1 < wins.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) return <p className="loading-text">{language === 'he' ? 'טוען תוצאות...' : 'Loading wins...'}</p>;
  if (error) return <p className="error">{error}</p>;
  if (!wins.length) return <p className="no-wins">{language === 'he' ? `אין תוצאות ל ${username}` : `No wins found for ${username}.`}</p>;

  const paginatedWins = wins.slice(currentIndex, currentIndex + resultsPerPage);

  return (
    <section className="jooba-wins">
      <h2 className="wins-title">{language === 'he' ? 'ניצחונות' : 'Wins'}</h2>
      <div className="wins-wrapper">
        <button className="nav-btn left" onClick={handlePrev} disabled={currentIndex === 0}>{'<'}</button>
        <div className="jooba-wins-container">
          {paginatedWins.map((win, index) => (
            <div className="win-card" key={index}>
              <p className="win-time"><strong>{language === 'he' ? 'זמן' : 'Time'}: {win.guessed_time}</strong></p>
              <p className="win-country">{language === 'he' ? 'מדינה' : 'Country'}: {getTranslatedCountry(win.country)}</p>
            </div>
          ))}
        </div>
        <button className="nav-btn right" onClick={handleNext} disabled={currentIndex + resultsPerPage >= wins.length}>{'>'}</button>
      </div>
    </section>
  );
};

export default UserWins;
