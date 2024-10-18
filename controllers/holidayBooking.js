const HolidayBooking = require('../models/holidayBooking');
const Packages = require('../models/packages');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Get the user  data and HolidayBooking
exports.checkHolidayBooking = async (req, res) => {
  try {
    const { userId, holidayId } = req.body;
    console.log('QQQQQQQQQQQ##   holidayId', userId, holidayId);
    const user = await User.findOne({ _id: userId });
    console.log('sdfsfdsfdfd', user);
    const holiday = await Packages.findOne({ _id: holidayId });
    console.log('sdfsholidayfdsfdfd', holiday);
    if (!user) {
      return res.status(200).send({ message: 'User not logged In', status: 'success', userNotLoggedIn: true });
    }
    if (!holiday) {
      return res.status(200).send({ message: 'Holiday Package did not exist', status: 'success', invalidPackage: true });
    }

    const generateRandom10DigitNumber = () => {
      // Generate a random number between 1000000000 and 9999999999
      return Math.floor(1000000000 + Math.random() * 9000000000);
    }

    // Create a booking holiday    
    const holidayBooking = new HolidayBooking({ ...req.body, status: 'success', bookingNumber: generateRandom10DigitNumber() });
    await holidayBooking.save();
    res.status(200).send({ data: holidayBooking, status: 'success' });
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', status: 'error' });
  }
};
