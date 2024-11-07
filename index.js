const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authMiddleware = require('./middleware/authMiddleware');
const connectDB = require('./db');
const holidayBookingRoute = require('./routes/holidayBooking');
const loginRoute = require('./routes/login');
const healthRoute = require('./routes/health');
const refreshTokenRoute = require('./routes/refreshToken');
const registerRoute = require('./routes/register');
const myAccountRoute = require('./routes/myAccount');
const searchHolidaysRoute = require('./routes/searchHolidays');
const searchCabsRoute = require('./routes/searchCabs');
const tripsRoute = require('./routes/trips');
const searchFlightsRoute = require('./routes/searchFlights'); 
const searchAirportRoute = require('./routes/searchAirport');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cookieParser());

/**
 * Used to switch between prod and dev origin url
 * You can update the methods as per needs
 */
// const apiUrl = "https://hajjrahh-backend-feg9fhcuhzbxd4a0.eastus-01.azurewebsites.net";
// const apiUrl = "http://localhost:8000";
app.use(cors({
  // origin: "http://localhost:8000",
  origin: "*",
  methods: "GET,POST"
}));

dotenv.config();

/**
 * Connect to the database method call
 */
connectDB();

app.use("/api/health", healthRoute);
app.use("/api/refreshToken", refreshTokenRoute); 
app.use("/api/login", loginRoute);
app.use("/api/register", registerRoute);
app.use("/api/searchCabs", searchCabsRoute);
app.use("/api/searchFlights", searchFlightsRoute);
app.use("/api/searchAirport", searchAirportRoute);

app.use("/api/holidayBooking", authMiddleware, holidayBookingRoute);
app.use("/api/myAccount", authMiddleware, myAccountRoute);
app.use("/api/searchHolidays", authMiddleware, searchHolidaysRoute);
app.use("/api/trips", authMiddleware, tripsRoute);

console.log('PORT : ', process.env.PORT);
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Backend server is running! on ${port}`);
});
