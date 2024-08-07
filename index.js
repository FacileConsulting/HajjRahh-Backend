const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require('./db');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const searchHolidaysRoute = require('./routes/searchHolidays');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

/**
 * Used to switch between prod and dev origin url
 * You can update the methods as per needs
 */
app.use(cors({
  // origin: ["https://hajjrahh.com", "https://www.hajjrahh.com"],
  origin: "*",
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
app.use("/api/login", loginRoute);
app.use("/api/register", registerRoute);
app.use("/api/searchHolidays", searchHolidaysRoute);

console.log('kiran', process.env.PORT);
const port = process.env.PORT || 8888;

app.listen(port, () => {
  console.log(`Backend server is running! on ${port}`);
});
