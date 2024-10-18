const mongoose = require('mongoose');

const holidayBookingSchema = new mongoose.Schema({ 
  billingDetails: {
    type: Object,
    required: false
  },
  bookingNumber: {
    type: String,
    required: false
  },
  departurePlaceLabel: {
    type: String,
    required: false
  },
  destinationPlaceLabel: {
    type: String,
    required: false
  },
  holidayDetailsEndDate: {
    type: String,
    required: false
  },
  holidayDetailsStartDate: {
    type: String,
    required: false
  },
  holidayId: {
    type: String,
    required: true
  },
  packageDuration: {
    type: String,
    required: false
  },
  packageName: {
    type: String,
    required: false
  },
  paymentDetails: {
    type: Object,
    required: false
  },
  userId: {
    type: String,
    required: true
  },
  passengers: {
    type: Array,
    required: false
  },
});

module.exports = mongoose.model('HolidayBooking', holidayBookingSchema);