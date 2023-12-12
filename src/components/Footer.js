import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const emailAddress = "r.hramtsov@gmail.com"; // Set the desired email address here
  const emailSubject = encodeURIComponent("The Secret Book Store");

  return (
    <div
      style={{
        backgroundColor: "#d2b7ac",
      }}
    >
      <footer
        style={{
          width: "100%",
          height: "225px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 text-muted">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link px-2 text-muted">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link px-2 text-muted">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <a href={`mailto:${emailAddress}?subject=${emailSubject}`} className="nav-link px-2 text-muted">
              Contact Us
            </a>
          </li>
        </ul>
        <p className="text-center text-muted">© 2023 Company RM, Inc</p>
      </footer>
    </div>
  );
}

export default Footer;
