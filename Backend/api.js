// Import required libraries and modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express(); // Create the express app instance
app.use(cors()); 

// Define the database connections
const contactDBConnection =
  process.env.FIRST_DB_CONNECTION ||
  "mongodb://root:example@localhost:27017/";
mongoose.connect(contactDBConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const buyDBConnection =
  process.env.SECOND_DB_CONNECTION ||
  "mongodb://root:example@localhost:27018/";
mongoose.createConnection(buyDBConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for user data
const UserSchema = new mongoose.Schema({
  id: Number,
  fullName: String,
  Email: String,
  Address: String,
  City: String,
  State: String,
  Message: String,
});

// Define a schema for buy form data
const buyFormSchema = new mongoose.Schema({
  id: Number,
  Email: String,
  Address: String,
  City: String,
  State: String,
  Zip: String,
  Country: String,
  Selection: String,
});
const User = mongoose.model("User", UserSchema, 'userCollection');
const BuyForm = mongoose.model("BuyForm", buyFormSchema, 'buyFormCollection');

// Enable JSON parsing middleware for incoming requests
app.use(express.json());

// Enable CORS (Cross-Origin Resource Sharing) for all routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Define API routes for user data

// Get all users
app.get("/users", async (req, res) => {
  const allUsers = await User.find();
  return res.json(allUsers);
});

// ... other routes ...

// Define a route to handle contact form submissions
app.post("/contactForm_data", async (req, res) => {
  try {
    // Handle the form data here and save it to your database
    const formData = req.body; // This will contain the form data
    // You can process and save the form data to your database here

    // Send a response back to the frontend (for example, a success message)
    res.status(200).json({ message: "Form data received and processed successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while processing the form data" });
  }
});

// Start the Express app and listen on the specified port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`D20 system is running on port ${port}`);
});