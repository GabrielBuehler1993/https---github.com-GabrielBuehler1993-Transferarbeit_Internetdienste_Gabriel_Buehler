require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const contactDBConnection =
  process.env.FIRST_DB_CONNECTION ||
  "mongodb://root:example@localhost:27017/firstdb?authMechanism=DEFAULT";
mongoose.connect(contactDBConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const buyDBConnection =
  process.env.SECOND_DB_CONNECTION ||
  "mongodb://root:example@localhost:27018/seconddb?authMechanism=DEFAULT";
mongoose.createConnection(buyDBConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  id: Number,
  fullName: String,
  Email: String,
  Address: String,
  City: String,
  State: String,
  Message: String,
});

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

const User = mongoose.model("User", UserSchema);

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/users", async (req, res) => {
  const allUsers = await User.find();
  return res.json(allUsers);
});

app.get("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const foundUser = await User.findOne({ id });
  if (!foundUser) {
    return res.status(404).send();
  }
  return res.json(foundUser);
});

app.post("/users", async (req, res) => {
  const newUser = new User({ ...req.body });
  await newUser.save();
  return res.status(201).send();
});

app.put("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await User.updateOne({ id }, req.body);
  return res.status(200).send();
});

app.delete("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await User.findOne({ id }).deleteOne();
  return res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));