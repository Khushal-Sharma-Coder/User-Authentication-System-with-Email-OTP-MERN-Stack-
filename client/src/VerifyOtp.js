import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "./config";

function VerifyOtp({ email, setPage, setUser }) {
  const [otp, setOtp] = useState("");

  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/verify-otp`,
        {
          email,
          otp,
        }
      );

      alert(res.data.message);

      // Save user details
      setUser(res.data.user);

      // Open dashboard
      setPage("dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "OTP Verification Failed");
    }
  };

  const resendOtp = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/resend-otp`,
        { email }
      );

      alert(res.data.message);

    } catch (err) {
      alert(err.response?.data?.message || "Unable to resend OTP");
    }
  };

  return (
    <div className="auth-box">

      <h2 className="title">OTP Verification</h2>

      <p className="text">
        Enter the 6-digit OTP sent to your email.
      </p>

      <input
        className="input"
        value={email}
        readOnly
      />

      <input
        className="input"
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button
        className="btn"
        onClick={verifyOtp}
      >
        VERIFY OTP
      </button>

      <p className="text">
        Didn't receive the OTP?{" "}
        <span onClick={resendOtp}>
          Resend OTP
        </span>
      </p>

    </div>
  );
}

export default VerifyOtp;