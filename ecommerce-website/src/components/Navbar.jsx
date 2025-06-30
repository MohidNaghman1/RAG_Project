import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={{ 
    padding: "1.5rem 2rem", 
    background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)", 
    color: "#fff", 
    display: "flex", 
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  }}>
    <div>
      <Link to="/" style={{ 
        color: "#fff", 
        textDecoration: "none", 
        fontWeight: "700", 
        fontSize: "1.5rem",
        letterSpacing: "0.5px"
      }}>
        🛍️ E-Commerce Store
      </Link>
    </div>
    <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
      <Link to="/" style={{ 
        color: "#fff", 
        textDecoration: "none", 
        fontSize: "1.1rem",
        fontWeight: "500",
        transition: "color 0.2s"
      }}
      onMouseEnter={(e) => e.target.style.color = "#3498db"}
      onMouseLeave={(e) => e.target.style.color = "#fff"}>
        Home
      </Link>
      <Link to="/cart" style={{ 
        color: "#fff", 
        textDecoration: "none", 
        fontSize: "1.1rem",
        fontWeight: "500",
        padding: "0.75rem 1.5rem",
        background: "#e74c3c",
        borderRadius: "25px",
        transition: "background 0.2s"
      }}
      onMouseEnter={(e) => e.target.style.background = "#c0392b"}
      onMouseLeave={(e) => e.target.style.background = "#e74c3c"}>
        🛒 Cart
      </Link>
    </div>
  </nav>
);

export default Navbar; 