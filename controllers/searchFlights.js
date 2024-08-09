const { oauth, flightSearch } = require('../third_party/amadeus/index.js');

const handleOauth = async () => {
  let oauthResponse = await oauth();
  console.log('oauthResponse', oauthResponse);
  if (oauthResponse.status === 'success') {
    global.amadeus_access_token = oauthResponse.data;
    await handleFlightSearch();
  } else if (oauthResponse.status === 'error') {
    global.amadeus_access_token = false;
    handleOauth();
  }
}

const handleFlightSearch = async () => {
  flightSearchResponse = await flightSearch();
  if (flightSearchResponse.status === 'success') {
    await res.status(200).send(flightSearchResponse);
  } else if (flightSearchResponse.status === 'error' && flightSearchResponse.data === false) {
    await res.status(500).send(flightSearchResponse);
  } else if (flightSearchResponse.status === 'error' && flightSearchResponse.data === 'invalid-access-token') {
    await handleOauth();   
  }
}

exports.searchFlights = async (req, res) => {
  try {
    let flightSearchResponse;
    const { departure, destination, startDate, endDate, noOfPeople } = req.body;
    // const payload = {
    //   departureCode,
    //   destinationCode,
    //   departureDate,
    //   noOfPeople
    // }
    // console.log('departure, destination, startDate, endDate, noOfPeople', departure, destination, startDate, endDate, noOfPeople);
    // await handleOauth();
    if (global.amadeus_access_token) {
      await handleFlightSearch();
    } else {
      await handleOauth();
    }

  } catch (error) {
    res.status(500).send({ message: 'Something went wrong in /searchFlights', status: 'error' });
  }
};
