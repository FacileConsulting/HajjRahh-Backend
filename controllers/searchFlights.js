
const {
  baseURL,
  amadeusFlightsURL,
  axiosInstance
} = require('../middleware/amadeusMiddleware');

exports.searchFlights = async (req, res) => {
  try {
    const {
      departureCode,
      destinationCode,
      departureDate,
      adults
    } = req.body;

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${baseURL}${amadeusFlightsURL}originLocationCode=${departureCode}&destinationLocationCode=${destinationCode}&departureDate=${departureDate}&adults=${adults}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${global.amadeus_access_token}`
      }
    };

    console.log('##@#', config)

    const response = await axiosInstance.request(config);
    console.log('##@#response', response)
    const { data } = response.data;
    return res.status(200).send({ data, status: 'success' });    
  } catch (error) {
    // console.error(error);
    return res.status(500).send({ message: 'Error in searchFlights API', status: 'error' });
  }
};