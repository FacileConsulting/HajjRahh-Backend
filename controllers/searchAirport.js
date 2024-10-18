const {
  baseURL,
  amadeusAirportURL,
  axiosInstance,
  refreshAmadeusToken
} = require('../middleware/amadeusMiddleware');

exports.searchAirport = async (req, res) => {
  try {

    const { codes } = req.body;
    
    const url = `${baseURL}${amadeusAirportURL}subType=AIRPORT&keyword=${codes.split('-')[0]}&countryCode=${codes.split('-')[1]}`;
    
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${global.amadeus_access_token}`
      }
    };

    // console.log('##@#', config); 

    const callingforSearchAirport = async() => {
      const response = await axiosInstance.request(config);
      console.log('##@#response', response?.data?.data[0], Object.keys(response.data));
      const data = response?.data?.data.length > 0 ? response?.data?.data[0].name : '';
      const country = response?.data?.data.length > 0 ? response?.data?.data[0].address.countryName : '';
      return res.status(200).send({ data, status: 'success', country });
    }
    callingforSearchAirport();
  } catch (error) {
    // console.error('from error');
    const response = await refreshAmadeusToken();
    // console.error('from error', response);
    if (typeof response === 'string') {
      callingforSearchAirport();
    }
    return res.status(500).send({ message: 'Error in searchAirport API', status: 'error' });
  }
};