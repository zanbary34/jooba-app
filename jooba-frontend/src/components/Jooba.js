import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import '../styles/Jooba.css';
import image from '../images/image.png';
import CountryDropdown from './CountryDropdown';
import GuessService from '../services/guessService';
import UserWins from './UserWins';
import LanguageSwitcher from './LanguageSwitcher';

const Jooba = () => {
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [username, setUsername] = useState('');
  const [language, setLanguage] = useState('en');
  const [refreshWins, setRefreshWins] = useState(false); 

  const navigate = useNavigate();


  useEffect(() => {
    document.documentElement.setAttribute('dir', language === 'he' ? 'rtl' : 'ltr');
  }, [language]);

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.sub && decodedToken.sub.username) {
          setUsername(decodedToken.sub.username);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        handleLogout(); // Logout if token is invalid
      }
    } else {
      handleLogout();
    }
  }, []);

  const handleCancel = () => {
    setHour('');
    setMinute('');
    setSelectedCountry('');
  };

  const handleSubmit = async () => {
    const result = await GuessService.submitGuess(username, selectedCountry, hour, minute);
    console.log('Guess result:', result);

    if (result) {
      setRefreshWins((prev) => !prev);
    }  
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="jooba-container">
      <header className="jooba-header">
    <h1 className="jooba-logo">JOOBA</h1>
    <div className="header-right">
      <span className="welcome-text">{language === 'he' ? `שלום, ${username}` : `Hello, ${username}`}</span>
      <button className="logout-btn" onClick={handleLogout}>
        {language === 'he' ? 'התנתק' : 'Logout'}
      </button>
      <LanguageSwitcher language={language} setLanguage={setLanguage} />
    </div>
  </header>
  
      <section className="jooba-message">
        <span className="jooba-highlight">{language === 'he' ? 'השעון מתקתק' : 'THE CLOCK IS TICKING'}</span>
        <p>{language === 'he' ? 'האם אתה מוכן לנחש?' : 'Are you ready to guess?'}</p>
      </section>

      <section className="jooba-content">
        <div className="jooba-timer">
          <label className="timer-label">{language === 'he' ? 'תווית' : 'Label'}</label>

          <CountryDropdown selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} language={language} />

          <div className="time-picker">
            {language === 'he' ? (
              <>
                <input
                  type="text"
                  value={minute}
                  onChange={(e) =>
                    setMinute(e.target.value.replace(/\D/g, '').slice(0, 2))
                  }
                  className="time-input"
                  placeholder="MM"
                  maxLength="2"
                />
                <span className="time-separator">:</span>
                <input
                  type="text"
                  value={hour}
                  onChange={(e) =>
                    setHour(e.target.value.replace(/\D/g, '').slice(0, 2))
                  }
                  className="time-input"
                  placeholder="HH"
                  maxLength="2"
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={hour}
                  onChange={(e) =>
                    setHour(e.target.value.replace(/\D/g, '').slice(0, 2))
                  }
                  className="time-input"
                  placeholder="HH"
                  maxLength="2"
                />
                <span className="time-separator">:</span>
                <input
                  type="text"
                  value={minute}
                  onChange={(e) =>
                    setMinute(e.target.value.replace(/\D/g, '').slice(0, 2))
                  }
                  className="time-input"
                  placeholder="MM"
                  maxLength="2"
                />
              </>
            )}
          </div>

          <div className="jooba-actions">
            <button className="cancel-btn" onClick={handleCancel}>
              {language === 'he' ? 'ביטול' : 'Cancel'}
            </button>
            <button className="ok-btn" onClick={handleSubmit}>
              {language === 'he' ? 'אישור' : 'OK'}
            </button>
          </div>
        </div>

        <div className="jooba-image">
          <img src={image} alt="Jooba Preview" />
        </div>
      </section>

      <UserWins username={username} refreshWins={refreshWins} language={language} />
    </div>
  );
};

export default Jooba;
