import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "./config";

function Login({ setPage, setUser, setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const loginUser = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      alert("Please enter both email and password");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        email: trimmedEmail,
        password: trimmedPassword
      });

      setUser(res.data.user);
      setToken(res.data.token);
      setPage("dashboard");

      alert(res.data.message);

    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-box">

      <h2 className="title">Sign In</h2>

      <input
        className="input"
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={handleEmailChange}
        onInput={handleEmailChange}
        autoComplete="email"
      />

      <input
        className="input"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={handlePasswordChange}
        onInput={handlePasswordChange}
        autoComplete="current-password"
      />

      <button
        className="btn"
        onClick={loginUser}
        disabled={loading}
      >
        {loading ? "Logging in..." : "LOGIN"}
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