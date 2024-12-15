const mongoose = require('mongoose');
const user = require('./user');

const PackageManagementSchema = new mongoose.Schema({ 
  userMobile: {
    type: String,
    required: true
  },
  packMangPackageName: {
    type: String,
    required: true
  },
  packMangPrice: {
    type: Array,
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
    type: Array,
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