import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "./config";

function Dashboard({ user, setUser, token, onLogout }) {

  const loginTime = new Date().toLocaleString();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    mobile: user?.mobile || "",
    gender: user?.gender || "",
    state: user?.state || "",
    pinCode: user?.pinCode || ""
  });

  if (!user) {
    return (
      <div className="auth-box">
        <h2 className="title">Loading...</h2>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const startEditing = () => {
    setFormData({
      fullName: user.fullName,
      mobile: user.mobile,
      gender: user.gender,
      state: user.state,
      pinCode: user.pinCode
    });
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      const res = await axios.put(
        `${BASE_URL}/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(res.data.message);
      setUser(res.data.user);
      setEditing(false);

    } catch (err) {
      alert(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="dashboard-wrapper">

      <div className="dashboard-card">

        <div className="avatar">
          {user.fullName.charAt(0).toUpperCase()}
        </div>

        <h1 className="dashboard-title">
          WELCOME
        </h1>

        <h2 className="dashboard-name">
          {user.fullName}
        </h2>

        <p className="verified">
          ✔ Account Verified
        </p>

        <hr />

        {!editing && (
          <div className="info">

            <div className="info-row">
              <span>Email</span>
              <strong>{user.email}</strong>
            </div>

            <div className="info-row">
              <span>Mobile</span>
              <strong>{user.mobile}</strong>
            </div>

            <div className="info-row">
              <span>Gender</span>
              <strong>{user.gender}</strong>
            </div>

            <div className="info-row">
              <span>State</span>
              <strong>{user.state}</strong>
            </div>

            <div className="info-row">
              <span>Pin Code</span>
              <strong>{user.pinCode}</strong>
            </div>

            <div className="info-row">
              <span>Registered On</span>
              <strong>
                {new Date(user.createdAt).toLocaleDateString()}
              </strong>
            </div>

            <div className="info-row">
              <span>Login Time</span>
              <strong>{loginTime}</strong>
            </div>

          </div>
        )}

        {editing && (
          <div className="info edit-profile-form">

            <input
              className="input"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />

            <input
              className="input"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
            />

            <select
              className="input"
              name="gender"
              value={formData.gender}
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
              value={formData.state}
              onChange={handleChange}
            />

            <input
              className="input"
              name="pinCode"
              placeholder="Pin Code"
              value={formData.pinCode}
              onChange={handleChange}
            />

          </div>
        )}

        <hr />

        <div className="security-box">

          <h3>Security</h3>

          <p>✔ JWT Authentication</p>
          <p>✔ Email Verified</p>
          <p>✔ Password Encrypted (bcrypt)</p>
          <p>✔ MongoDB Connected</p>

        </div>

        <div className="button-group">

          {!editing && (
            <>
              <button
                className="btn"
                onClick={startEditing}
              >
                EDIT PROFILE
              </button>

              <button
                className="btn"
                onClick={onLogout}
              >
                LOGOUT
              </button>
            </>
          )}

          {editing && (
            <>
              <button
                className="btn"
                onClick={saveProfile}
                disabled={saving}
              >
                {saving ? "SAVING..." : "SAVE"}
              </button>

              <button
                className="btn"
                onClick={cancelEditing}
                disabled={saving}
              >
                CANCEL
              </button>
            </>
          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;