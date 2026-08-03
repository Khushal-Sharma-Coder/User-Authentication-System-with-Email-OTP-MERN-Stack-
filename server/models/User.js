const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  mobile: String,
  gender: String,
  state: String,
  pinCode: String,
  otp: String,
  otpExpires: Date,
  isVerified: {
    type: Boolean,
    default: false
  }
},
{
  timestamps: true
}
);

module.exports = mongoose.model("User", userSchema);