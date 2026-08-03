import { useState } from "react";
import axios from "axios";

function ForgotPassword({ setPage, setEmail }) {
  const [email, setUserEmail] = useState("");

  const sendOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      alert(res.data.message);

      setEmail(email); // Save email for reset page

      setPage("resetPassword");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">

        <h2 className="title">Forgot Password</h2>

        <input
          className="input"
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setUserEmail(e.target.value)}
        />

        <button className="btn" onClick={sendOtp}>
          SEND OTP
        </button>

        <p className="text">
          Remember Password?{" "}
          <span onClick={() => setPage("login")}>
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default ForgotPassword;