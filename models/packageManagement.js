const mongoose = require('mongoose');

const PackageManagementSchema = new mongoose.Schema({ 
  packMangPackageName: {
    type: String,
    required: true
  },
  packMangItinerary: {
    type: String,
    required: true
  },
  packMangPrice: {
    type: String,
    required: true
  },
  packMangGroupSize: {
    type: String,
    required: true
  },
  packMangDocumentsRequired: {
    type: String,
    required: true
  },
  packMangAccomodation: {
    type: Number,
    required: true
  },
  packMangTransportation: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('PackageManagement', PackageManagementSchema);