const {
  baseURL,
  amadeusFlightsURL,
  axiosInstance,
  refreshAmadeusToken
} = require('../middleware/amadeusMiddleware');

exports.searchFlights = async (req, res) => {
  try {
    const {
      flyingFrom,
      flyingTo,
      flightDepartureDate,
      flightReturnDate,
      adults,
      children,
      infants,
      travelClass
    } = req.body;


    let urlTemp = `${baseURL}${amadeusFlightsURL}originLocationCode=${flyingFrom}&destinationLocationCode=${flyingTo}&departureDate=${flightDepartureDate}&adults=${adults}&children=${children}&infants=${infants}&travelClass=${travelClass}&currencyCode=USD`;
    if (flightReturnDate) {
      urlTemp = `${urlTemp}&returnDate=${flightReturnDate}`;
    }

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: urlTemp,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${global.amadeus_access_token}`
      }
    };

    console.log('##@#', config)

    const callingforSearchFlight = async() => {
      const response = await axiosInstance.request(config);
      console.log('##@#response', Object.keys(response.data));
      const datum = response.data;
      return res.status(200).send({ data: datum, status: 'success' });
    }
    callingforSearchFlight();
  } catch (error) {
    // console.error('from error');
    const response = await refreshAmadeusToken();
    // console.error('from error', response);
    if (typeof response === 'string') {
      callingforSearchFlight();
    }
    return res.status(500).send({ message: 'Error in searchFlights API', status: 'error' });
  }
};