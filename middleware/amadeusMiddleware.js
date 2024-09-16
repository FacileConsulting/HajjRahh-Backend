const axios = require('axios');
const qs = require('qs');

const baseURL = 'https://test.api.amadeus.com';
const amadeusTokenURL = '/v1/security/oauth2/token';
const amadeusFlightsURL = '/v2/shopping/flight-offers?';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

const refreshAmadeusToken = async (failedRequest) => {
  try {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseURL}${amadeusTokenURL}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify({
        'client_id': process.env.AMADEUS_TEST_API_KEY,
        'client_secret': process.env.AMADEUS_TEST_API_SECRET,
        'grant_type': 'client_credentials'
      })
    };
    const response = await axiosInstance.request(config);
    const { status, data } = response;
    if (status === 200 && data?.token_type === 'Bearer' && data?.state === 'approved' && data?.access_token) {
      // Save the new token in storage
      global.amadeus_access_token = data?.access_token;
    }
    return `${data?.token_type} ${data?.access_token}` || '';
  } catch (error) {
    return Promise.reject(error);
  }
};

// Request interceptor to add the Authorization header
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = global.amadeus_access_token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newBearerToken = await refreshAmadeusToken();
        originalRequest.headers['Authorization'] = newBearerToken;
        console.log('!@!!!!!!!!!', global.amadeus_access_token, newBearerToken);
        return axiosInstance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

module.exports = {
  baseURL,
  amadeusFlightsURL,
  axiosInstance
};