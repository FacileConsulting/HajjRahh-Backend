const mongoose = require('mongoose');

const fleetManagementSchema = new mongoose.Schema({
  userMobile: {
    type: String,
    required: true  
  },
  cabVehicleName: {
    type: String,
    required: true
  },
  cabAssignDriver: {
    type: String,
    required: true
  },
  cabVehicleType: {
    type: String,
    required: true
  },
  cabVehicleNumber: {
    type: String,
    required: true
  },
  cabVehicleSeating: {
    type: String,
    required: true
  },
  cabVehicleFeatures: {
    type: String,
    required: true
  },
  cabAirportPricing: {
    type: String,
    required: true
  },
  cabCityTourPricing: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('fleetManagement', fleetManagementSchema);
        