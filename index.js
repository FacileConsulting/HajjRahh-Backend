const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require('./db');
const loginRoute = require('./routes/login');
const healthRoute = require('./routes/health');
const registerRoute = require('./routes/register');
const myAccountRoute = require('./routes/myAccount');
const searchHolidaysRoute = require('./routes/searchHolidays');
const tripsRoute = require('./routes/trips');
const searchFlightsRoute = require('./routes/searchFlights');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

/**
 * Used to switch between prod and dev origin url
 * You can update the methods as per needs
 */
const apiUrl = process.env.REACT_APP_API_URL || "https://hajjrahh-backend-feg9fhcuhzbxd4a0.eastus-01.azurewebsites.net";
app.use(cors({
  origin: [apiUrl],
  // origin: "*",
  methods: "GET,POST"
}));


/**
 * Used to handle the json request and response
 */
// app.use(express.json());

/**
 * Use the dotenv for .env specially for prod
 */
dotenv.config();

/**
 * Connect to the database method call
 */
connectDB();

/**
 * To handle routes for API creations
 * /api/ is used for prefix slug
 */

app.use("/api/health", healthRoute);
app.use("/api/login", loginRoute);
app.use("/api/register", registerRoute);
app.use("/api/myAccount", myAccountRoute);
app.use("/api/searchHolidays", searchHolidaysRoute);
app.use("/api/trips", tripsRoute);
app.use("/api/searchFlights", searchFlightsRoute);

console.log('kiran', process.env.PORT);
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Backend server is running! on ${port}`);
});
