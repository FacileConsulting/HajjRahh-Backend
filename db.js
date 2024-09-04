const mongoose = require('mongoose');

/**
 * Used the mongodb connection with port and database name
 */
const connectDB = async () => {
  const dbUrl = "mongodb+srv://hajjrahh:OKIKyKtwzMFv6GmC@hajjrahhdev.fn7t3.mongodb.net/hajjrahh_database";
  // const dbUrl = "mongodb+srv://kiranmlvya11:jlmTYgKTpoDi9TJl@hajjrahh.zn3zx.mongodb.net/hajjrahh_dbs";
  // const dbUrl = "mongodb://localhost:27017/hajjrahh_database";
  try {
    mongoose.connect(dbUrl, {
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
