const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const User = require("./models/User");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is connected" });
});


// REGISTER
app.post("/api/register", async (req, res) => {
  try {
    const { fullName, email, password, mobile, gender, state, pinCode } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = new User({
      fullName,
      email,
      password,
      mobile,
      gender,
      state,
      pinCode
    });

    await user.save();

    res.json({ message: "User registered successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});


// LOGIN
app.post("/api/login", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({ message: "Login successful", user });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});