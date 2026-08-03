import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "./config";

function ResetPassword({ setPage, email }) {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/reset-password`,
        {
          email,
          otp,
          newPassword,
        }
      );

      alert(res.data.message);
      setPage("login");

    } catch (err) {
      alert(err.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">

        <h2 className="title">Reset Password</h2>

        <input
          className="input"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="btn" onClick={resetPassword}>
          RESET PASSWORD
        </button>

      </div>
    </div>
  );
}

export default ResetPassword;