const User = require('./models/user');
const HolidayBooking = require('./models/holidayBooking');
const Packages = require('./models/packages');

const getUser = async (query) => {
  return await User.findOne(query);
}

const getPackages = async (query) => {
  return await Packages.findOne(query);
}

const getAllPackages = async (query) => {
  return await Packages.find(query);
}

const createHolidayBooking = (query) => {
  return new HolidayBooking(query);
}

const createUser = (query) => {
  return new User(query);
}

const saveInDB = async (data) => {
  await data.save();
}

module.exports = {
  getUser,
  getPackages,
  getAllPackages,
  createHolidayBooking,
  createUser,
  saveInDB
};