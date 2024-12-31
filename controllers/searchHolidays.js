const Packages = require('../models/packages');
const PackageManagement = require('../models/packageManagement');

// Get the user data
exports.searchPackages = async (req, res) => {
  try {
    console.log('searchPackages', req.body);

    const departureArray = [
      {
        value: 'BLR',
        label: 'Bengaluru'
      },
      {
        value: 'BOM',
        label: 'Mumbai'
      },
      {
        value: 'CCU',
        label: 'Kolkata'
      },
      {
        value: 'MAA',
        label: 'Chennai'
      },
      {
        value: 'DEL',
        label: 'Delhi'
      }
    ];
    
    const destinationArray = [
      {
        value: 'AUH',
        label: 'Abu Dhabi'
      },
      {
        value: 'DXB',
        label: 'Dubai'
      },
      {
        value: 'SYD',
        label: 'Sydney'
      },
      {
        value: 'LGA',
        label: 'New York'
      },
      {
        value: 'LON',
        label: 'London'
      }
    ];

    if (req.body.fromHoliday) {
      console.log('greater', req.body.fromHoliday)
      var { flyingFrom: departure, flyingTo: destination, flightDepartureDateNotReversed: startDate, trip3, trip4, trip7, trip11, trip16, star5, star4, star3, transBus, transLandOnly, transFlight, transCruise, transOptional, themeAdventure, themeAffordable, themeArtCulture, themeBeach, themeBestSeller, priceLt1000, priceGt1000, priceGt2000, priceGt4000, priceGt8000, tourFocus1, tourFocus2, tourFocus3, tourFocus4, tourFocus5, languageHindi, languageEnglish, languageArabic, meals1, meals2, meals3, meals4, meals5, vehicleTypeHatchback, vehicleTypeSedan, vehicleTypeSUV, vehicleTypeMUV, vehicleTypeCompactSUV, sp1, sp2, sp3, sp4, sp5 } = req.body;
    } else {
      var { departure, destination, startDate, endDate, trip3, trip4, trip7, trip11, trip16, star5, star4, star3, transBus, transLandOnly, transFlight, transCruise, transOptional, themeAdventure, themeAffordable, themeArtCulture, themeBeach, themeBestSeller, priceLt1000, priceGt1000, priceGt2000, priceGt4000, priceGt8000, tourFocus1, tourFocus2, tourFocus3, tourFocus4, tourFocus5, languageHindi, languageEnglish, languageArabic, meals1, meals2, meals3, meals4, meals5, vehicleTypeHatchback, vehicleTypeSedan, vehicleTypeSUV, vehicleTypeMUV, vehicleTypeCompactSUV, sp1, sp2, sp3, sp4, sp5 } = req.body;
    }

    const getSpecialAmenitiesArray = () => {
      const getValues = [];
      if (sp1) {
        getValues.push('sp1');
      } 
      if (sp1) {
        getValues.push('sp1');
      } 
      if (sp3) {
        getValues.push('sp3');
      }
      if (sp4) {
        getValues.push('sp4');
      }
      if (sp5) {
        getValues.push('sp5');
      }
      return getValues;
    }

    const getVehicleTypeArray = () => {
      const getValues = [];
      if (vehicleTypeHatchback) {
        getValues.push('Hatchback');
      } 
      if (vehicleTypeSedan) {
        getValues.push('Sedan');
      } 
      if (vehicleTypeSUV) {
        getValues.push('SUV');
      }
      if (vehicleTypeMUV) {
        getValues.push('MUV');
      }
      if (vehicleTypeCompactSUV) {
        getValues.push('Compact SUV');
      }
      return getValues;
    }

    const getMealsArray = () => {
      const getValues = [];
      if (meals1) {
        getValues.push('meals1');
      } 
      if (meals2) {
        getValues.push('meals2');
      } 
      if (meals3) {
        getValues.push('meals3');
      }
      if (meals4) {
        getValues.push('meals4');
      }
      if (meals5) {
        getValues.push('meals5');
      }
      return getValues;
    }
    
    const getLanguageArray = () => {
      const getValues = [];
      if (languageHindi) {
        getValues.push('hindi');
      } 
      if (languageEnglish) {
        getValues.push('english');
      } 
      if (languageArabic) {
        getValues.push('arabic');
      }
      return getValues;
    }    

    const getTourFocusArray = () => {
      const getValues = [];
      if (tourFocus1) {
        getValues.push('tourFocus1');
      } 
      if (tourFocus2) {
        getValues.push('tourFocus2');
      } 
      if (tourFocus3) {
        getValues.push('tourFocus3');
      } 
      if (tourFocus4) {
        getValues.push('tourFocus4');
      } 
      if (tourFocus5) {
        getValues.push('tourFocus5');
      } 
      return getValues;
    }    

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
      priceLt1000 || priceGt1000 || priceGt2000 || priceGt4000 || priceGt8000 ||
      tourFocus1 || tourFocus2 || tourFocus3 || tourFocus4 || tourFocus5 ||
      languageHindi || languageEnglish || languageArabic ||
      meals1 || meals2 || meals3 || meals4 || meals5 ||
      vehicleTypeHatchback || vehicleTypeSedan || vehicleTypeSUV || vehicleTypeMUV || vehicleTypeCompactSUV || 
      sp1 || sp2 || sp3 || sp4 || sp5
    ) {
      console.log('isfalse');
      query = { $or: [] };
    }    

    if (req.body.fromHoliday) {
      if (departure) {
        const ob = departureArray.find( obj => obj.value === departure);
        query.departure = ob.label;
      }
      if (destination) {
        const ob = destinationArray.find( obj => obj.value === destination);
        query.destination = ob.label;
      }
      if (startDate) {
        query.dateRange = startDate;
      }
    } else {
      if (departure) {
        const ob = departureArray.find( obj => obj.value === departure);
        query.departure = ob.label;
      }
      if (destination) {
        const ob = destinationArray.find( obj => obj.value === destination);
        query.destination = ob.label;
        // query.destination = destination;
      }
      if (startDate && endDate) {
        query.dateRange = {
          $all: [startDate, endDate]
        };
      }
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

    let tourFocusArray = getTourFocusArray();
    if (tourFocusArray.length > 0) {
      query.$or.push({ tourFocus: { $in: tourFocusArray } });
    }

    let languageArray = getLanguageArray();
    if (languageArray.length > 0) {
      query.$or.push({ language: { $in: languageArray } });
    }

    let mealsArray = getMealsArray();
    if (mealsArray.length > 0) {
      query.$or.push({ meals: { $in: mealsArray } });
    }

    let vehiclesArray = getVehicleTypeArray();
    if (vehiclesArray.length > 0) {
      query.$or.push({ vehicles: { $in: vehiclesArray } });
    }

    let specialAmenitiesArray = getSpecialAmenitiesArray ();
    if (specialAmenitiesArray.length > 0) {
      query.$or.push({ specialAmenities: { $in: specialAmenitiesArray } });
    }

    console.log('query', query);

    // query = { departure: 'Mumbai', destination: 'Kaaba', dateRange: '13-9-2024' }
    // query = { departure: 'Mumbai', destination: 'Abu Dhabi', dateRange: '25-10-2024'  }
    // console.log('query', query);
    const packages = await PackageManagement.find(query);
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
