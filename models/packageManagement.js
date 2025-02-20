const mongoose = require('mongoose');

const PackageManagementSchema = new mongoose.Schema({ 
  userMobile: {
    type: String,
    required: true
  },
  packageName: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  departure: {
    type: Array,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  packMangGroupSize: {
    type: String,
    required: true
  },
  dateRange: {
    type: Array,
    required: true
  },
  days: {
    type: String,
    required: true
  },
  totalNights: {
    type: String,
    required: true
  },
  packageDuration: {
    type: String,
    required: true    
  },
  transportation: {
    type: Array,
    required: false
  },  
  facilities: {
    type: Array,
    required: false
  }, 
  theme: {
    type: Array,
    required: false
  }, 
  packageDetails: {
    type: Object,
    required: false
  },
  packMangDocumentsRequired: {
    type: String,
    required: true
  },
  packageDuration: {
    type: Array,
    required: true
  },
  packMangHajjDates: {
    type: Array,
    required: true
  },
  packMangUmrahDates: {
    type: Array,
    required: true
  },  
  packMangUploadImages: {
    type: Object,
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
  hotelStar: {
    type: Number,
    required: false
  },
  food: {
    type: String,
    required: false
  },
  sacred: {
    type: String,
    required: false
  },
  tourFocus: {
    type: Array,
    required: false
  },
  language: {
    type: Array,
    required: false
  },
  meals: {
    type: Array,
    required: false
  },
  vehicles: {
    type: Array,
    required: false
  },
  specialAmenities: {
    type: Array,
    required: false
  },
  tripImage: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('PackageManagement', PackageManagementSchema);