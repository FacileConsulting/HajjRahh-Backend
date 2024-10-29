const Cabs = require('../models/cabs');

// Get the user data
exports.searchCabs = async (req, res) => {
  try {
    console.log('searchCabs', req.body);

    const { cabTripType, cabPickUpPlace, cabDropPlace, cabDate, cabTime, cabPassengers3, cabPassengers4, cabPassengers5, cabPassengers6, cabPriceLt40, cabPriceLt60, cabPriceLt80, cabPriceLt100, cabVehicleHatchback, cabVehicleSedan, cabVehicleSUV, cabVehicleMUV, cabVehicleCompactSUV, cabModelWagonR, cabModelIndica, cabModelDzire, cabModelEtios, cabModelXcent } = req.body;


    const getPassengersCount = () => {
      const getValues = [];
      if (cabPassengers3) {
        getValues.push(3);
      }
      if (cabPassengers4) {
        getValues.push(4);
      }
      if (cabPassengers5) {
        getValues.push(5);
      }
      if (cabPassengers6) {
        getValues.push(6);
      }
      return getValues;
    }  

    const getCarVehicleTypeArray = () => {
      const getValues = [];
      if (cabVehicleHatchback) {
        getValues.push('hatchback');
      }
      if (cabVehicleSedan) {
        getValues.push('sedan');
      }
      if (cabVehicleCompactSUV) {
        getValues.push('compactsuv');
      }
      if (cabVehicleSUV) {
        getValues.push('suv');
      }
      if (cabVehicleMUV) {
        getValues.push('muv');
      }
      return getValues;
    }  

    const getCarModelArray = () => {
      const getValues = [];
      if (cabModelWagonR) {
        getValues.push('wagonr');
      }
      if (cabModelDzire) {
        getValues.push('dzire');
      }
      if (cabModelEtios) {
        getValues.push('etios');
      }
      if (cabModelIndica) {
        getValues.push('indica');
      }
      if (cabModelXcent) {
        getValues.push('xcent');
      }
      return getValues;
    }

    let query = {};
    if (
      cabPassengers3 || cabPassengers4 || cabPassengers5 || cabPassengers6 || cabPriceLt40 || cabPriceLt60 || cabPriceLt80 || cabPriceLt100 || cabVehicleHatchback || cabVehicleSedan || cabVehicleSUV || cabVehicleMUV || cabVehicleCompactSUV || cabModelWagonR || cabModelIndica || cabModelDzire || cabModelEtios || cabModelXcent
    ) {
      console.log('isfalse');
      query = { $or: [] };
    }

    if (cabTripType) {
      query.cabTripType = cabTripType === 'oneWay' ? 'oneway' : 'roundway';
    }
    
    if (cabPickUpPlace) {
      query.cabPickUpPlace = cabPickUpPlace;
    }
    
    if (cabDropPlace) {
      query.cabDropPlace = cabDropPlace;
    }
    
    if (cabDate) {
      query.cabDate = cabDate;
    }
    
    if (cabTime) {
      query.cabTime = cabTime;
    }

    let passengersArray = getPassengersCount();
    if (passengersArray.length > 0) {
      query.$or.push({ cabPassengersCount: { $in: passengersArray } });
    }

    if (cabPriceLt40) {
      query.$or.push({ cabPrice: { $lt: 40 } });
    }
    if (cabPriceLt60) {
      query.$or.push({ cabPrice: { $gt: 39, $lt: 60 } });
    }
    if (cabPriceLt80) {
      query.$or.push({ cabPrice: { $gt: 59, $lt: 80 } });
    }
    if (cabPriceLt100) {
      query.$or.push({ cabPrice: { $gt: 79, $lt: 100 } });
    }

    let carVehicleTypeArray = getCarVehicleTypeArray();
    if (carVehicleTypeArray.length > 0) {
      query.$or.push({ cabVehicleType: { $in: carVehicleTypeArray } });
    }

    let carModelArray = getCarModelArray();
    if (carModelArray.length > 0) {
      query.$or.push({ cabCarModel: { $in: carModelArray } });
    }

    console.log('query', query);

    // query = { departure: 'Mumbai', destination: 'Kaaba', dateRange: '13-9-2024' }
    // query = { departure: 'Mumbai', destination: 'Abu Dhabi', dateRange: '25-10-2024'  }
    // console.log('query', query);
    const cabs = await Cabs.find(query);
    console.log('cabsLength', cabs.length);
    if (!cabs) {
      return res.status(200).send({ message: 'No search for cabs', status: 'success', data: [] });
    }
    await res.status(200).send({
      status: 'success',
      data: cabs || [],
    });
  } catch (error) {
    res.status(500).send({ message: 'Error in search cabs', status: 'error' });
  }
};
