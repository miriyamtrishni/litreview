import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ background: "#8b5e3c", padding: "10px 20px" }}>
      <h1 style={{ color: "#fff", display: "inline" }}>LitReview</h1>
      <Link to="/" style={{ marginLeft: "20px", color: "#fff", textDecoration: "none" }}>
        Home
      </Link>
    </nav>
  );
};

export default Navbar;
