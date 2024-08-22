const Packages = require('../models/packages');

// Get the user data
exports.searchPackages = async (req, res) => {
  try {
    console.log('searchPackages', req.body);
    const { departure, destination, startDate, endDate, noOfPeople } = req.body;

    let query = {};

    if (departure) {
      query.departure = departure;
    }
    if (destination) {
      query.destination = destination;
    }
    if (startDate && endDate) {
      query.dateRange = {
        $all: [startDate, endDate]
      };
    }

    console.log('querye', query);
    const packages = await Packages.find(query);
    console.log('departurepackages', packages.length);
    if (!packages) {
      return res.status(200).send({ message: 'No search for holidays', status: 'success', data: [] });
    }
    await res.status(200).send({
      status: 'success',
      data: packages || [],
    });
  } catch (error) {
    res.status(500).send({ message: 'Error in search holidays', status: 'error' });
  }
};
