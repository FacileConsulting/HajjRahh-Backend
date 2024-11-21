const { constant } = require('../constant');
const { generateRandom10DigitNumber } = require('../utils');
const { 
  getUser,
  getPackages,
  createHolidayBooking,
  saveInDB,
} = require('../mongo');


// Get the user  data and HolidayBooking
exports.checkHolidayBooking = async (req, res) => {
  const { c200, c500, yS, login, holidayBooking } = constant();
  try {
    const { userId, holidayId } = req.body;
    console.log('QQQQQQQQQQQ##   holidayId', userId, holidayId);
    const user = await getUser({ _id: userId });
    console.log('sdfsfdsfdfd', user);
    const holiday = await getPackages({ _id: holidayId });
    console.log('sdfsholidayfdsfdfd', holiday);
    if (!user) {
      return res.status(c200).send({ ...login.notLoggedIn });
    }
    if (!holiday) {
      return res.status(c200).send({ ...holidayBooking.noPackage });
    }

    // Create a booking holiday  
    const holidayBooking = await createHolidayBooking({ ...req.body, status: yS, bookingNumber: generateRandom10DigitNumber() });
    await saveInDB(holidayBooking);
    res.status(c200).send({ data: holidayBooking, status: yS });
  } catch (error) {
    res.status(c500).send({ ...holidayBooking.error });
  }
};
