const {
  amadeusAirportURL,
  axiosInstance,
  refreshAmadeusToken
} = require('../middleware/amadeusMiddleware');
const { constant } = require('../constant');
const { amadeusConfig } = require('../utils');

exports.searchAirport = async (req, res) => {
  const { c200, c500, yS, airport } = constant();
  try {
    const { codes } = req.body;    
    const url = `${process.env.AMADEUS_TEST_URL}${amadeusAirportURL}subType=AIRPORT&keyword=${codes.split('-')[0]}&countryCode=${codes.split('-')[1]}`;
    
    const config = amadeusConfig({ url });

    const callingforSearchAirport = async() => {
      await refreshAmadeusToken();
      const response = await axiosInstance.request(config);
      console.log('##@#response', response?.data?.data[0], Object.keys(response.data));
      const data = response?.data?.data.length > 0 ? response?.data?.data[0].name : '';
      const country = response?.data?.data.length > 0 ? response?.data?.data[0].address.countryName : '';
      res.status(c200).send({ data, status: yS, country });
    }
    callingforSearchAirport();
  } catch (error) {
    // console.error('from error');
    const response = await refreshAmadeusToken();
    // console.error('from error', response);
    if (typeof response === 'string') {
      callingforSearchAirport();
    }
    return res.status(c500).send({ ...airport.error });
  }
};