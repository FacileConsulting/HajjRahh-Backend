const mongoose = require('mongoose');

/**
 * Used the mongodb connection with port and database name
 */
const connectDB = async () => {
  console.log('MongoDB connection with port and database name', process.env.mongoURI);
  try {
    mongoose.connect(process.env.mongoURI || 'mongodb://localhost:27017/hajjrahh_db', {
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
