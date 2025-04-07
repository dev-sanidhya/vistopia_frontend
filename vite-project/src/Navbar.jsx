import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        <img
          src="/logo.png"
          alt="Vistopia Logo"
          className="navbar-logo"
          width={150}
        />
      </Link>

      <div className="nav-links nav-links-row">
        <Link to="/destinations">Destinations</Link>
        <Link to="/flights">Flights</Link>
        <Link to="/hotels">Hotels</Link>
        <Link to="/activities">Activities</Link>
        <Link to="/deals">Deals</Link>
        <Link to="/community"> Community </Link>
      </div>

      <div className="auth-buttons auth-buttons-row">
        {!loggedIn ? (
          <>
            <Link to="/login">
              <button className="login-btn">Log in</button>
            </Link>
            <Link to="/signup">
              <button className="signup-btn">Sign up</button>
            </Link>
          </>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>
            Sign out
          </button>
        )}
      </div>
    </nav>
  );
}
