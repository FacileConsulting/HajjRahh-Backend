const Packages = require('../models/packages');

// Get the user data
exports.searchPackages = async (req, res) => {
  try {
    console.log('searchPackages', req.body);
    const { departure, destination, startDate, endDate, noOfPeople, trip3, trip4, trip7, trip11, trip16, star5, star4, star3, transBus, transLandOnly, transFlight, transCruise, transOptional, themeAdventure, themeAffordable, themeArtCulture, themeBeach, themeBestSeller, priceLt1000, priceGt1000, priceGt2000, priceGt4000, priceGt8000 } = req.body;

    const getThemeArray = () => {
      const getValues = [];
      if (themeAdventure) {
        getValues.push('adventure');
      } 
      if (themeAffordable) {
        getValues.push('affordable');
      } 
      if (themeArtCulture) {
        getValues.push('art and culture');
      } 
      if (themeBeach) {
        getValues.push('beach');
      } 
      if (themeBestSeller) {
        getValues.push('best seller');
      } 
      return getValues;
    }

    const getTransportationArray = (arr) => {
      const getValues = [];
      if (transBus) {
        getValues.push('bus');
      } 
      if (transLandOnly) {
        getValues.push('landonly');
      } 
      if (transFlight) {
        getValues.push('flight');
      } 
      if (transCruise) {
        getValues.push('cruise');
      } 
      if (transOptional) {
        getValues.push('optional');
      } 
      return getValues;
    }

    const getStarsArray = () => {
      const getValues = [];
      if (star5) {
        getValues.push(5);
      } 
      if (star4) {
        getValues.push(4);
      } 
      if (star3) {
        getValues.push(3);
      } 
      return getValues;
    }

    let query = {};
    if ( 
      trip3 || trip4 || trip7 || trip11 || trip16 || 
      star5 || star4 || star3 ||
      transBus || transLandOnly || transFlight || transCruise  || transOptional ||
      themeAdventure || themeAffordable || themeArtCulture || themeBeach || themeBestSeller ||
      priceLt1000 || priceGt1000 || priceGt2000 || priceGt4000 || priceGt8000 
    ) {
      query = { $or: [] };
    }

    if (departure) {
      query.departure = departure;
    }
    if (destination) {
      query.destination = destination;
    }
    if (startDate && endDate) {
      query.dateRange = {
        $all: [startDate, endDate]
      };
    }

    if (trip3) {
      query.$or.push({ totalNights: { $lt: 4 } });
    }    
    if (trip4) {      
      query.$or.push({ totalNights: { $gt: 3, $lt: 7 } });
    }   
    if (trip7) {  
      query.$or.push({ totalNights: { $gt: 6, $lt: 11 } });
    }   
    if (trip11) {
      query.$or.push({ totalNights: { $gt: 10, $lt: 16 } });
    }  
    if (trip16) {
      query.$or.push({ totalNights: { $gt: 15 } });
    } 

    let starsArray = getStarsArray();
    if (starsArray.length > 0) {
      query.$or.push({ hotelStar: { $in: starsArray } });
    }

    let transArray = getTransportationArray();
    if (transArray.length > 0) {
      query.$or.push({ transportation: { $in: transArray } });
    } 

    let themeArray = getThemeArray();
    if (themeArray.length > 0) {
      query.$or.push({ theme: { $in: themeArray } });
    }

    if (priceLt1000) {
      query.$or.push({ price: { $lt: 1000 } });
    }    
    if (priceGt1000) {      
      query.$or.push({ price: { $gt: 999, $lt: 2000 } });
    }   
    if (priceGt2000) {  
      query.$or.push({ price: { $gt: 1999, $lt: 4000 } });
    }   
    if (priceGt4000) {
      query.$or.push({ price: { $gt: 3999, $lt: 8000 } });
    }  
    if (priceGt8000) {
      query.$or.push({ price: { $gt: 7999 } });
    } 

    console.log('query', query);
    const packages = await Packages.find(query);
    console.log('departurepackages', packages.length);
    if (!packages) {
      return res.status(200).send({ message: 'No search for holidays', status: 'success', data: [] });
    }
    await res.status(200).send({
      status: 'success',
      data: packages || [],
    });
  } catch (error) {
    res.status(500).send({ message: 'Error in search holidays', status: 'error' });
  }
};
