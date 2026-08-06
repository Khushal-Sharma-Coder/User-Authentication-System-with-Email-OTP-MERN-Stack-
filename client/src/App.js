import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import VerifyOtp from "./VerifyOtp";
import Dashboard from "./Dashboard";
import ForgotPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  return (
  <div className="auth-wrapper">

    {page === "login" && (
      <Login
        setPage={setPage}
        setUser={setUser}
        setToken={setToken}
      />
    )}

    {page === "register" && (
      <Register
        setPage={setPage}
        setEmail={setEmail}
      />
    )}

    {page === "verifyOtp" && (
      <VerifyOtp
        email={email}
        setPage={setPage}
        setUser={setUser}
      />
    )}

    {page === "dashboard" && (
      <Dashboard
        user={user}
        token={token}
        setPage={setPage}
      />
    )}

    {page === "forgotPassword" && (
      <ForgotPassword
        setPage={setPage}
        setEmail={setEmail}
      />
    )}

    {page === "resetPassword" && (
      <ResetPassword
        email={email}
        setPage={setPage}
      />
    )}

  </div>
);
}

export default App;