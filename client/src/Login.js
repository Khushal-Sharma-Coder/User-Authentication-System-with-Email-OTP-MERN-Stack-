import { useState } from "react";
import axios from "axios";

function Login({ setPage, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      );

      alert(res.data.message);

      // Save logged in user
      setUser(res.data.user);

      // Open dashboard
      setPage("dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-box">

      <h2 className="title">Sign In</h2>

      <input
        className="input"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="input"
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="btn"
        onClick={loginUser}
      >
        LOGIN
      </button>

      <p className="text">
        New Customer?{" "}
        <span onClick={() => setPage("register")}>
          Register
        </span>
      </p>

      <p
  className="link"
  onClick={() => setPage("forgotPassword")}
>
  Forgot Password?
</p>

    </div>
  );
}

export default Login;