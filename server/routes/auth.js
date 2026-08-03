const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      mobile,
      gender,
      state,
      pinCode
    } = req.body;

    if (!fullName || !email || !password || !mobile) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const userExists = await User.findOne({ email });

    if (userExists && userExists.isVerified) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (userExists && !userExists.isVerified) {
      await User.deleteOne({ _id: userExists._id });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await User.create({
      fullName,
      email,
      password: hashedPassword,
      mobile,
      gender,
      state,
      pinCode,
      otp,
      otpExpires: Date.now() + 5 * 60 * 1000,
      isVerified: false
    });

    await sendEmail(email, "Your OTP Code", `Your OTP is ${otp}`);

    res.status(201).json({
      message: "User registered. OTP sent to email"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your account first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
        gender: user.gender,
        state: user.state,
        pinCode: user.pinCode,
        createdAt: user.createdAt
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= PROFILE =================
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User profile fetched successfully",
      user
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= TEST EMAIL =================
router.post("/test-email", async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const email = req.body.email;

    await sendEmail(email, "Test Email", "If you got this, Nodemailer is working");

    res.json({ message: "Email sent successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= VERIFY OTP =================
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;

    await user.save();

    res.json({
      message: "Account verified successfully",
      user: {
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
        gender: user.gender,
        state: user.state,
        pinCode: user.pinCode,
        createdAt: user.createdAt
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= FORGOT PASSWORD =================
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;

    await user.save();

    await sendEmail(email, "Password Reset OTP", `Your OTP is ${otp}`);

    res.json({ message: "OTP sent to email" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= RESET PASSWORD =================
router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.otp = null;
    user.otpExpires = null;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= RESEND OTP =================
router.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;

    await user.save();

    await sendEmail(email, "Resend OTP", `Your new OTP is ${otp}`);

    res.json({ message: "OTP resent successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= EXPORT =================
module.exports = router;