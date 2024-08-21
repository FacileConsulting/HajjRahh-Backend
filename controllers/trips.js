const Trips = require('../models/trips');

// Get the user data
exports.trips = async (req, res) => {
  try {
    // const { departure, destination, startDate, endDate, noOfPeople } = req.body;
    // console.log('departure, destination, startDate, endDate, noOfPeople', departure, destination, startDate, endDate, noOfPeople);
    const trips = await Trips.find({});
    // console.log('departurepackages',packages);
    if (!trips) {
      return res.status(200).send({ message: 'No Trips available', status: 'success', data: [] });
    }
    await res.status(200).send({
      status: 'success',
      data: trips || [],
    });
  } catch (error) {
    res.status(500).send({ message: 'Error in search holidays', status: 'error' });
  }
};
