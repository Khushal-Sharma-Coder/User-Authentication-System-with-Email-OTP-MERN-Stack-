import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "./config";

function Register({ setPage, setEmail}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
    gender: "",
    state: "",
    pinCode: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const registerUser = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/register`,
        formData
      );

      alert(res.data.message);

      // Save email for OTP page
setEmail(formData.email);

// Open OTP page
setPage("verifyOtp");

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-box register-scroll">

      <h2 className="title">Register</h2>

      <input
        className="input"
        name="fullName"
        placeholder="Full Name"
        onChange={handleChange}
      />

      <input
        className="input"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        className="input"
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <input
        className="input"
        name="mobile"
        placeholder="Mobile Number"
        onChange={handleChange}
      />

      <select
        className="input"
        name="gender"
        onChange={handleChange}
      >
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <input
        className="input"
        name="state"
        placeholder="State"
        onChange={handleChange}
      />

      <input
        className="input"
        name="pinCode"
        placeholder="Pin Code"
        onChange={handleChange}
      />

      <button
        className="btn"
        onClick={registerUser}
      >
        REGISTER
      </button>

      <p className="text">
        Already have an account?{" "}
        <span onClick={() => setPage("login")}>
          Login
        </span>
      </p>

    </div>
  );
}

export default Register;