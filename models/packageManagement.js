const mongoose = require('mongoose');

const PackageManagementSchema = new mongoose.Schema({ 
  packMangPackageName: {
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
    type: String,
    required: true
  },
  packMangTransportation: {
    type: String,
    required: true
  },
  packMangHajjDates: {
    type: String,
    required: true
  },
  packMangUmrahDates: {
    type: String,
    required: true
  },
  packMangItineraryList: {
    type: Array,
    required: true
  },
  packMangInclusion: {
    type: String,
    required: true
  },
  packMangExclusion: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('PackageManagement', PackageManagementSchema);