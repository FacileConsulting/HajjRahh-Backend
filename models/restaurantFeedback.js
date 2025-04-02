const mongoose = require('mongoose');

const restaurantFeedbackSchema = new mongoose.Schema({
  userMobile: {
    type: String,
    required: true
  },
  restaurantFeedbackCustomer: {
    type: String,
    required: true
  },
  restaurantFeedbackMobile: {
    type: String,
    required: true
  },
  restaurantFeedbackRating: {
    type: String,
    required: true
  },
  restaurantFeedbackReview: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('RestaurantFeedback', restaurantFeedbackSchema);
        