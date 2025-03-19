const { constant } = require('../constant');
const { generateRandom10DigitNumber } = require('../utils');
const { 
  getUser,
  getHotels,
  createHotelBookingMain,
  saveInDB,
} = require('../mongo');


// Get the user  data and HolidayBooking
exports.checkHotelBooking = async (req, res) => {
  const { c200, c500, yS, login, hotelBookingMain } = constant();
  try {
    const { userId, hotelId } = req.body;
    console.log('QQQQQQQQQQQ##   hotelId', userId, hotelId);
    const user = await getUser({ _id: userId });
    console.log('sdfsfdsfdfd', user);
    const hotel = await getHotels({ _id: hotelId });
    console.log('sdfsholidayfdsfdfd', hotel);
    if (!user) {
      return res.status(c200).send({ ...login.notLoggedIn });
    }
    if (!hotel) {
      return res.status(c200).send({ ...hotelBookingMain.noHotel });
    }

    // Create a booking hotel  
    
    const hotelBooking = await createHotelBookingMain({ ...req.body, status: yS, bookingNumber: generateRandom10DigitNumber() });
    await saveInDB(hotelBooking);
    res.status(c200).send({ data: hotelBooking, status: yS });
  } catch (error) {
    console.log('errrrrrr', error);
    res.status(c500).send({ ...hotelBookingMain.error });
  }
};
