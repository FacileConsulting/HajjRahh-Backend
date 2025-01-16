const mongoose = require('mongoose');

const driverManagementSchema = new mongoose.Schema({
  cabDriverName: {
    type: String,
    required: true
  },
  cabMobileNumber: {
    type: String,
    required: true
  },
  cabLicense: {
    type: Object,
    required: false
  },
  cabTagCar: {
    type: String,
    required: true
  },
  cabPayment: {
    type: String,
    required: true
  },
  cabRating: {
    type: String,
    required: true
  },
  cabJoinDate: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('driverManagement', driverManagementSchema);
        