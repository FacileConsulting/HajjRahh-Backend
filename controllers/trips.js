const User = require('../models/user');
const Packages = require('../models/packages');

// Get the user data
exports.trips = async (req, res) => {
  try {

    const getPackages = async (query) => {
      const packages = await Packages.find(query);
      return packages || [];
    }

    const getTripStatus = (id) => {
      const status = user.trips.filter(trip => trip.packageId === id);
      if (status.length === 1) {
        return status[0].tripStatus || '';
      } else {
        return '';
      }
    }

    const constructTripsArray = (data) => {
      let trips = [];
      for (let i = 0; i < data.length; i++) {
        trips.push({
          packageName: data[i].packageName,
          image: data[i].image,
          status: getTripStatus(data[i]._id.toString()),
          dateRange: data[i].dateRange,
        });
      }
      return trips;
    }

    const { id } = req.body;
    const user = await User.findOne({ _id: id });    

    if (!user) {
      return res.status(200).send({ message: 'You are not loggedIn.', status: 'success', data: [] });
    } else {
      if (user.trips.length > 0) {
        const getPackgeIds = user.trips.map((trip) => trip.packageId);
        const query = { _id: { $in: getPackgeIds } };
        let packages = await getPackages(query);
        if (!packages || packages.length == 0) {
          return res.status(200).send({ message: 'Something went wrong. Please check with admin', status: 'success', data: [] });
        } else {
          await res.status(200).send({
            status: 'success',
            data: constructTripsArray(packages),
          });
        }
      } else {
        return res.status(200).send({ message: 'No Trips available', status: 'success', data: [] });
      }
    }
  } catch (error) {
    res.status(500).send({ message: 'Error in search holidays', status: 'error' });
  }
};
