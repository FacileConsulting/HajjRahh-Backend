const mongoose = require('mongoose');

const restaurantMenuSchema = new mongoose.Schema({
  userMobile: {
    type: String,
    required: true
  },
  restaurantItemName: {
    type: String,
    required: true
  },
  restaurantMenuType: {
    type: String,
    required: true
  },
  restaurantMenuPhoto: {
    type: Object,
    required: false
  },
  restaurantMenuHalalCertification: {
    type: Object,
    required: false
  },
  restaurantMenuDescription: {
    type: String,
    required: true
  },
  restaurantMenuAvailability: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('RestaurantMenu', restaurantMenuSchema);