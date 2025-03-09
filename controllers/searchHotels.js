const Hotels = require('../models/hotels');

// Get the user data
exports.searchHotels = async (req, res) => {
  try {
    console.log('searchHotels', req.body);
    const { namePlace, hotelJourneyDate, hotelReturnDate, adults = 1, children = 0, infants = 0, travelRooms = 1, hotelTypeAll, hotelTypeHotel, hotelTypeAppartment, hotelTypeResort, hotelTypeVilla, hotelPriceLt500, hotelPriceLt1000, hotelPriceLt1500, hotelBreakfast, hotelPayPerNight, hotelCancellation, hotelRating30, hotelRating35, hotelRating40, hotelRating45, hotelRatingStar1, hotelRatingStar2, hotelRatingStar3, hotelRatingStar4, hotelRatingStar5, hotelAmenitiesAll, hotelAmenitiesAirConditioning,  hotelAmenitiesBar, hotelAmenitiesBusinessServices, hotelAmenitiesFreeInternet } = req.body;


    const getHotelsType = () => {
      const getValues = [];
      if (hotelTypeAll) {
        getValues.push('all');
      }
      if (hotelTypeHotel) {
        getValues.push('hotel');
      }
      if (hotelTypeAppartment) {
        getValues.push('appartment');
      }
      if (hotelTypeResort) {
        getValues.push('resort');
      }
      if (hotelTypeVilla) {
        getValues.push('villa');
      }
      return getValues;
    }

    const getPopularType = () => {
      const getValues = [];
      if (hotelBreakfast) {
        getValues.push('breakfast');
      }
      if (hotelPayPerNight) {
        getValues.push('payPerNight');
      }
      if (hotelCancellation) {
        getValues.push('cancellation');
      }
      return getValues;
    }

    const getCustomerRating = () => {
      const getValues = [];
      if (hotelRating30) {
        getValues.push('3+');
      }
      if (hotelRating35) {
        getValues.push('3.5+');
      }
      if (hotelRating40) {
        getValues.push('4+');
      }
      if (hotelRating45) {
        getValues.push('4.5+');
      }
      return getValues;
    }

    const getStarRating = () => {
      const getValues = [];
      if (hotelRatingStar1) {
        getValues.push('1');
      }
      if (hotelRatingStar2) {
        getValues.push('2');
      }
      if (hotelRatingStar3) {
        getValues.push('3');
      }
      if (hotelRatingStar4) {
        getValues.push('4');
      }
      if (hotelRatingStar5) {
        getValues.push('5');
      }
      return getValues;
    }

    const getAmenities = () => {
      const getValues = [];
      if (hotelAmenitiesAll) {
        getValues.push('all');
      }
      if (hotelAmenitiesAirConditioning) {
        getValues.push('airConditioning');
      }
      if (hotelAmenitiesBar) {
        getValues.push('bar');
      }
      if (hotelAmenitiesBusinessServices) {
        getValues.push('businessServices');
      }
      if (hotelAmenitiesFreeInternet) {
        getValues.push('freeInternet');
      }
      return getValues;
    }

    let query = {};
    if (
      hotelTypeAll || hotelTypeHotel || hotelTypeAppartment || hotelTypeResort || hotelTypeVilla || hotelPriceLt500 || hotelPriceLt1000 || hotelPriceLt1500 || hotelBreakfast || hotelPayPerNight || hotelCancellation || hotelRating30 || hotelRating35 || hotelRating40 || hotelRating45 || hotelRatingStar1 || hotelRatingStar2 || hotelRatingStar3 || hotelRatingStar4 || hotelRatingStar5 || hotelAmenitiesAll || hotelAmenitiesAirConditioning ||  hotelAmenitiesBar || hotelAmenitiesBusinessServices || hotelAmenitiesFreeInternet
    ) {
      console.log('isfalse');
      query = { $or: [] };
    }
    
    if (namePlace) {
      query.namePlace = namePlace;
    }
    
    if (hotelJourneyDate) {
      query.journeyDate = hotelJourneyDate;
    }
    
    if (hotelReturnDate) {
      query.returnDate = hotelReturnDate;
    }

    let hotelsTypeArray = getHotelsType();
    if (hotelsTypeArray.length > 0) {
      query.$or.push({ hotelType: { $in: hotelsTypeArray } });
    }

    let popularTypeArray = getPopularType();
    if (popularTypeArray.length > 0) {
      query.$or.push({ popularType: { $in: popularTypeArray } });
    }

    let customerRatingArray = getCustomerRating();
    if (customerRatingArray.length > 0) {
      query.$or.push({ customerRating: { $in: customerRatingArray } });
    }

    let starRatingArray = getStarRating();
    if (starRatingArray.length > 0) {
      query.$or.push({ starRating: { $in: starRatingArray } });
    }

    let amenitiesArray = getAmenities();
    if (amenitiesArray.length > 0) {
      query.$or.push({ amenities: { $in: amenitiesArray } });
    }

    if (hotelPriceLt500) {
      query.$or.push({ pricePerDay: { $lt: 500 } });
    }
    if (hotelPriceLt1000) {
      query.$or.push({ pricePerDay: { $gt: 499, $lt: 1000 } });
    }
    if (hotelPriceLt1500) {
      query.$or.push({ pricePerDay: { $gt: 999, $lt: 1500 } });
    }

    console.log('query', query);

    // query = { departure: 'Mumbai', destination: 'Kaaba', dateRange: '13-9-2024' }
    // query = { departure: 'Mumbai', destination: 'Abu Dhabi', dateRange: '25-10-2024'  }
    // console.log('query', query);
    const hotels = await Hotels.find(query);
    console.log('cabsLength', hotels.length);
    if (!hotels) {
      return res.status(200).send({ message: 'No search for hotels', status: 'success', data: [] });
    }
    await res.status(200).send({
      status: 'success',
      data: hotels || [],
    });
  } catch (error) {
    res.status(500).send({ message: 'Error in search hotels', status: 'error' });
  }
};
