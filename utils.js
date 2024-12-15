const jwt = require('jsonwebtoken');
const qs = require('qs');

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

const otpConfig = (obj) => {
  const data = qs.stringify({
    userid: 'solankiz',
    password: 'Kanv@4589',
    mobile: obj.mobile,
    senderid: 'SMSGAT',
    sendMethod: 'generate',
    msgType: 'text',
    msg: 'Your SMSGatewayCenter OTP code is $otp$. Please use the code within 2 minutes. - Demo Message.',
    codeExpiry: '300',
    codeLength: '6',
    codeType: 'num',
    format: 'json',
    medium: 'sms' 
  });

  return {
    method: 'post',
    maxBodyLength: Infinity,
    url: obj.url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'SERVERID': 'webC2'
    },
    data
  };
}

const otpVerifyConfig = (obj) => {
  const data = qs.stringify({
    userid: 'solankiz',
    password: 'Kanv@4589',
    mobile: obj.mobile,
    otp: obj.otp,
    sendMethod: 'verify',
    format: 'json'
  });

  return {
    method: 'post',
    maxBodyLength: Infinity,
    url: obj.url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'SERVERID': 'webC2',
      'Cookie': 'SERVERID=webC2'
    },
    data
  };
}

module.exports = {
  getToken,
  amadeusConfig,
  otpConfig,
  otpVerifyConfig,
  generateRandom10DigitNumber
};