const Package = require('../models/package');
const jwt = require('jsonwebtoken');

// Get the user data
exports.searchPackages = async (req, res) => {
  try {
    const { departure, destination, startDate, endDate, noOfPeople } = req.body;
    // console.log('departure, destination, startDate, endDate, noOfPeople', departure, destination, startDate, endDate, noOfPeople);
    const packages = await Package.find({});
    // console.log('departurepackages',packages);
    if (!packages) {
      return res.status(400).send({ message: 'No search for holidays', error: false, data: [] });
    }
    await res.status(200).send({
      error: false,
      data: packages || [],
    });
  } catch (error) {
    res.status(500).send({ message: 'Error in search holidays', error: true });
  }
};
