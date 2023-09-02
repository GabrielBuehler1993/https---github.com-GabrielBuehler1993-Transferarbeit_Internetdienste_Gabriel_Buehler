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

// Insert test data inside an async function
async function insertTestData() {
  // Insert a test user
  
  // Insert a test buy form
  const testBuyForm = new BuyForm({
    id: 1,
    Email: "test@example.com",
    Address: "456 Elm St",
    City: "Los Angeles",
    State: "CA",
    Zip: "12345",
    Country: "USA",
    Selection: "Test selection",
  });
  await testBuyForm.save();
}

// Insert test data when the application starts
insertTestData().then(() => {
  // Start the Express app and listen on the specified port
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`D20 system is running on port ${port}`);
  });
});
