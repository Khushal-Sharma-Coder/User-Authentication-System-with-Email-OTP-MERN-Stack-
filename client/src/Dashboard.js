function Dashboard({ user, setPage }) {

  const loginTime = new Date().toLocaleString();

  if (!user) {
    return (
      <div className="auth-box">
        <h2 className="title">Loading...</h2>
      </div>
    );
  }

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

        <hr />

        <div className="security-box">

          <h3>Security</h3>

          <p>✔ JWT Authentication</p>
          <p>✔ Email Verified</p>
          <p>✔ Password Encrypted (bcrypt)</p>
          <p>✔ MongoDB Connected</p>

        </div>

        <div className="button-group">

          <button
            className="btn"
            onClick={() => alert("Edit Profile feature coming soon")}
          >
            EDIT PROFILE
          </button>

          <button
            className="btn"
            onClick={() => {
              setPage("login");
            }}
          >
            LOGOUT
          </button>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;