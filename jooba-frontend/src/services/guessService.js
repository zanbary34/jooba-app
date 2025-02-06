

const API_URL = `${process.env.REACT_APP_API_URL}/guess`;
const WINS_API_URL = `${process.env.REACT_APP_API_URL}/wins`;

const GuessService = {
  submitGuess: async (username, country, hour, minute) => {
    const token = localStorage.getItem('token'); // Retrieve JWT token from local storage

    const guessData = {
      user: username,
      country,
      time: `${hour}:${minute}`,
      timestamp: new Date().toLocaleTimeString()
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include JWT token in request
        },
        body: JSON.stringify(guessData),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Error submitting guess:', error);
      return { error: 'Network error' };
    }
  },

  getUserWins: async (username) => {
    const token = localStorage.getItem('token'); // Retrieve JWT token from local storage
    
    try {
      const response = await fetch(`${WINS_API_URL}?username=${username}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch wins');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user wins:', error);
      return { error: 'Network error' };
    }
  },
};

export default GuessService;