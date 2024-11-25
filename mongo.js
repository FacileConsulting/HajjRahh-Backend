const { ObjectId } = require('mongodb');
const User = require('./models/user');
const HolidayBooking = require('./models/holidayBooking');
const Packages = require('./models/packages');
const PilgrimageBooking = require('./models/pilgrimageBooking');
const PackageManagement = require('./models/packageManagement');

const getUser = async (query) => {
  return await User.findOne(query);
}

const getPackages = async (query) => {
  return await Packages.findOne(query);
}

const getAllPackages = async (query) => {
  return await Packages.find(query);
}

const getAllPilgrimageBooking = async (query, inOut) => {
  return await PilgrimageBooking.find(query, inOut);
}  

const getAllPackageManagement = async (query) => {
  return await PackageManagement.find(query);
} 

const getPilgrimageBooking = async (query) => {
  return await PilgrimageBooking.findOne(query);
} 

const getPackageManagement = async (query) => {
  return await PackageManagement.findOne(query);
} 

const deletePilgrimageBooking = async (query) => {
  return await PilgrimageBooking.deleteOne({ _id: new ObjectId(query) });
}

const deletePackageManagement = async (query) => {
  return await PackageManagement.deleteOne({ _id: new ObjectId(query) });
} 

const updatePilgrimageBooking = async (query, data) => {
  return await PilgrimageBooking.updateOne({ _id: new ObjectId(query) }, { $set: data } );
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
  getPackageManagement,
  getAllPackages,
  getAllPilgrimageBooking,
  getAllPackageManagement,
  deletePilgrimageBooking,
  deletePackageManagement,
  updatePilgrimageBooking,
  updatePackageManagement,
  createHolidayBooking,
  createUser,
  createPilgrimageBooking,
  createPackageManagement,
  saveInDB
};