const jwt = require('jsonwebtoken');

const generateRandom10DigitNumber = () => {
  // Generate a random number between 1000000000 and 9999999999
  return Math.floor(1000000000 + Math.random() * 9000000000);
}

const getToken = (query) => {
  return jwt.sign(query, process.env.JWT_SECRET, { expiresIn: '1h' });
}

const amadeusConfig = (obj) => {
  return {
    method: 'get',
    maxBodyLength: Infinity,
    url: obj.url,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${global.amadeus_access_token}`
    }
  };
}

module.exports = {
  getToken,
  amadeusConfig,
  generateRandom10DigitNumber
};