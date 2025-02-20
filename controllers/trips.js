const { constant } = require('../constant');
const { 
  getUser,
  getAllPackages
} = require('../mongo');


exports.trips = async (req, res) => {
  const { c200, c500, yS, trips } = constant();
  try {
    const getPackages = async (query) => {
      const packages = await getAllPackages(query);
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
          tripImage: data[i].tripImage,
          status: getTripStatus(data[i]._id.toString()),
          dateRange: data[i].dateRange,
        });
      }
      return trips;
    }

    const { email } = req.body;
    const user = await getUser({ email });   

    if (!user) {
      res.status(c200).send({ ...trips.notLoggedIn });
    } else {
      if (user.trips.length > 0) {
        const getPackgeIds = user.trips.map((trip) => trip.packageId);
        const query = { _id: { $in: getPackgeIds } };
        let packages = await getPackages(query);
        console.log('user.trips', packages);
        if (!packages || packages.length == 0) { 
          res.status(c200).send({ ...trips.failed });
        } else {
          await res.status(c200).send({
            status: yS,
            data: constructTripsArray(packages),
          });
        }
      } else {
        res.status(c200).send({ ...trips.noTrips });
      }
    }
  } catch (error) {
    res.status(c500).send({ ...trips.error });
  }
};
