const jwt = require('jsonwebtoken');
const qs = require('qs');

const generateRandom10DigitNumber = () => {
  // Generate a random number between 1000000000 and 9999999999
  return Math.floor(1000000000 + Math.random() * 9000000000);
}

const getToken = (query) => {
  return jwt.sign(query, process.env.JWT_SECRET, { expiresIn: '1h' });
}

const hotelConfig = (obj) => {
  return {
    method: 'get',
    maxBodyLength: Infinity,
    url:  `${process.env.AMADEUS_TEST_URL}${obj.url}keyword=${obj.hotelSearch}&subType=${obj.hotelTypeKey}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${global.amadeus_access_token}`
    }
  };
}

const hotelDetailsConfig = (obj) => {
  return {
    method: 'get',
    maxBodyLength: Infinity,
    url:  `${process.env.AMADEUS_TEST_URL}${obj.url}hotelIds=${obj.hotelBookingId}&adults=1`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${global.amadeus_access_token}`
    }
  };
}

const hotelRatingConfig = (obj) => {
  return {
    method: 'get',
    maxBodyLength: Infinity,
    url:  `${process.env.AMADEUS_TEST_URL}${obj.url}hotelIds=${obj.hotelBookingId}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${global.amadeus_access_token}`
    }
  };
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
    userid: 'manishbill',
    password: 'Facile@123',
    mobile: obj.mobile,
    senderid: 'FACILE',
    sendMethod: 'generate',
    msgType: 'text',
    msg: 'OTP Verification Code for Login is : $otp$. Regards, Facile Consulting Pvt.Ltd.',
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
    userid: 'manishbill',
    password: 'Facile@123',
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
  hotelConfig,
  hotelDetailsConfig,
  hotelRatingConfig,
  generateRandom10DigitNumber
};