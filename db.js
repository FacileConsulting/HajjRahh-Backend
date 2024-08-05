const mongoose = require('mongoose');
const { mongoURI } = require('./config');

/**
 * Used the mongodb connection with port and database name
 */
const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const db = mongoose.connection;

    db.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    db.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    db.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
  } catch (err) {
    console.error('MongoDB connection catch:', err);
    process.exit(1); // Exit the process with failure
  }
}


module.exports = connectDB;
