const { ObjectId } = require('mongodb');
const User = require('./models/user');
const CabsVendor = require('./models/cabsVendor');
const CabBooking = require('./models/cabBooking');
const HolidayBooking = require('./models/holidayBooking');
const FleetManagement = require('./models/fleetManagement');
const DriverManagement = require('./models/driverManagement');
const PilgrimageBooking = require('./models/pilgrimageBooking');
const HotelBooking = require('./models/hotelBooking');
const PackageManagement = require('./models/packageManagement');
const RestaurantMenu = require('./models/restaurantMenu');

const getUser = async (query) => {
  return await User.findOne(query);
}

const getPackages = async (query) => {
  return await PackageManagement.findOne(query);
}

const getAllPackages = async (query) => {
  return await PackageManagement.find(query);
}

const getAllPilgrimageBooking = async (query, inOut) => {
  return await PilgrimageBooking.find(query, inOut);
}  

const getAllHotelBooking = async (query, inOut) => {
  return await HotelBooking.find(query, inOut);
}

const getAllCabPromotion = async (query) => {
  return await CabsVendor.find(query);
}

const getAllRestaurantMenu = async (query) => {
  return await RestaurantMenu.find(query);
}

const getAllFleetManagement = async (query) => {
  return await FleetManagement.find(query);
}

const getAllDriverManagement = async (query) => {
  return await DriverManagement.find(query);
}

const getAllCabBooking = async (query) => {
  return await CabBooking.find(query);
}

const getAllPackageManagement = async (query) => {
  return await PackageManagement.find(query);
} 

const getPilgrimageBooking = async (query) => {
  return await PilgrimageBooking.findOne(query);
}  

const getHotelBooking = async (query) => {
  return await HotelBooking.findOne(query);
}  

const getCabPromotion = async (query) => {
  return await CabsVendor.findOne(query);
} 

const getRestaurantMenu = async (query) => {
  return await RestaurantMenu.findOne(query);
}  

const getFleetManagement = async (query) => {
  return await FleetManagement.findOne(query);
}

const getDriverManagement = async (query) => {
  return await DriverManagement.findOne(query);
}

const getPackageManagement = async (query) => {
  return await PackageManagement.findOne(query);
} 

const deletePilgrimageBooking = async (query) => {
  return await PilgrimageBooking.deleteOne({ _id: new ObjectId(query) });
}

const deleteHotelBooking = async (query) => {
  return await HotelBooking.deleteOne({ _id: new ObjectId(query) });
}

const deleteCabPromotion = async (query) => {
  return await CabsVendor.deleteOne({ _id: new ObjectId(query) });
} 

const deleteRestaurantMenu = async (query) => {
  return await RestaurantMenu.deleteOne({ _id: new ObjectId(query) });
} 

const deleteFleetManagement = async (query) => {
  return await FleetManagement.deleteOne({ _id: new ObjectId(query) });
} 

const deleteDriverManagement = async (query) => {
  return await DriverManagement.deleteOne({ _id: new ObjectId(query) });
}

const deletePackageManagement = async (query) => {
  return await PackageManagement.deleteOne({ _id: new ObjectId(query) });
} 

const updatePilgrimageBooking = async (query, data) => {
  return await PilgrimageBooking.updateOne({ _id: new ObjectId(query) }, { $set: data } );
} 

const updateHotelBooking = async (query, data) => {
  return await HotelBooking.updateOne({ _id: new ObjectId(query) }, { $set: data } );
} 

const updateCabPromotion = async (query, data) => {
  return await CabsVendor.updateOne({ _id: new ObjectId(query) }, { $set: data } );
}

const updateRestaurantMenu = async (query, data) => {
  return await RestaurantMenu.updateOne({ _id: new ObjectId(query) }, { $set: data } );
}

const updateFleetManagement = async (query, data) => {
  return await FleetManagement.updateOne({ _id: new ObjectId(query) }, { $set: data } );
}

const updateDriverManagement = async (query, data) => {
  return await DriverManagement.updateOne({ _id: new ObjectId(query) }, { $set: data } );
}

const updateCabBookingReview = async (query, data) => {
  return await CabBooking.updateOne({ _id: new ObjectId(query) }, { $set: data } );
}

const updatePackageManagement = async (query, data) => {
  return await PackageManagement.updateOne({ _id: new ObjectId(query) }, { $set: data } );
}

const createHolidayBooking = (query) => {
  return new HolidayBooking(query);
}

const createUser = (query) => {
  return new User(query);
}

const createPilgrimageBooking = (query) => {
  return new PilgrimageBooking(query);
} 

const createHotelBooking = (query) => {
  return new HotelBooking(query);
} 

const createCabPromotion = (query) => {
  return new CabsVendor(query);
}

const createRestaurantMenu = (query) => {
  return new RestaurantMenu(query);
}

const createFleetManagement = (query) => {
  return new FleetManagement(query);
}

const createDriverManagement = (query) => {
  return new DriverManagement(query);
}

const createCabBooking = (query) => {
  return new CabBooking(query);
}

const createPackageManagement = (query) => {
  return new PackageManagement(query);
}

const saveInDB = async (data) => {
  await data.save();
}

module.exports = {
  getUser,
  getPackages,
  getPilgrimageBooking,
  getHotelBooking,
  getCabPromotion,
  getFleetManagement,
  getDriverManagement,
  getPackageManagement,
  getAllPackages,
  getAllPilgrimageBooking,
  getAllHotelBooking,
  getAllCabPromotion,
  getAllPackageManagement,
  getAllFleetManagement,
  getAllDriverManagement,
  getAllCabBooking,
  deletePilgrimageBooking,
  deleteHotelBooking,
  deleteCabPromotion,
  deleteFleetManagement,
  deleteDriverManagement,
  deletePackageManagement,
  updatePilgrimageBooking,
  updateHotelBooking,
  updateCabPromotion,
  updateFleetManagement,
  updateDriverManagement,
  updateCabBookingReview,
  updatePackageManagement,
  createHolidayBooking,
  createUser,
  createPilgrimageBooking,
  createHotelBooking,
  createCabPromotion,
  createFleetManagement,
  createDriverManagement,
  createCabBooking,
  createPackageManagement,
  createRestaurantMenu,
  deleteRestaurantMenu,
  updateRestaurantMenu,
  getAllRestaurantMenu,
  getRestaurantMenu,
  saveInDB
};