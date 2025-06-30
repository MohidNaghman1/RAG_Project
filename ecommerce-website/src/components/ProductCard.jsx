import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => (
  <div style={{ 
    border: "1px solid #eee", 
    borderRadius: 12, 
    padding: "1.5rem", 
    background: "#fff", 
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
    minHeight: "500px",
    display: "flex",
    flexDirection: "column"
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-4px)";
    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
  }}>
    <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit", flex: 1, display: "flex", flexDirection: "column" }}>
      <img 
        src={product.image} 
        alt={product.name} 
        style={{ 
          width: "100%", 
          height: 250, 
          objectFit: "cover", 
          borderRadius: 8,
          marginBottom: "1rem"
        }} 
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ 
          margin: "0 0 0.5rem 0", 
          fontSize: "1.2rem",
          fontWeight: "600",
          lineHeight: "1.4",
          color: "#2c3e50"
        }}>
          {product.name}
        </h3>
        
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          marginBottom: "0.5rem",
          gap: "0.5rem"
        }}>
          <span style={{ 
            color: "#666", 
            fontSize: "0.9rem",
            padding: "0.25rem 0.75rem",
            background: "#f8f9fa",
            borderRadius: "12px",
            fontWeight: "500"
          }}>
            {product.category}
          </span>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "0.25rem"
          }}>
            <span style={{ color: "#f39c12", fontSize: "1rem" }}>★</span>
            <span style={{ fontSize: "0.9rem", fontWeight: "600" }}>{product.rating}</span>
            <span style={{ fontSize: "0.8rem", color: "#666" }}>({product.reviews})</span>
          </div>
        </div>

        <p style={{ 
          fontSize: "0.9rem", 
          color: "#666", 
          lineHeight: "1.4",
          margin: "0 0 1rem 0",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden"
        }}>
          {product.description}
        </p>

        {product.features && product.features.length > 0 && (
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ 
              display: "flex", 
              flexWrap: "wrap", 
              gap: "0.5rem"
            }}>
              {product.features.slice(0, 2).map((feature, index) => (
                <span key={index} style={{ 
                  fontSize: "0.75rem",
                  padding: "0.25rem 0.5rem",
                  background: "#e8f4fd",
                  color: "#2980b9",
                  borderRadius: "8px",
                  fontWeight: "500"
                }}>
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginTop: "auto"
        }}>
          <p style={{ 
            fontWeight: "bold", 
            fontSize: "1.4rem",
            color: "#e74c3c",
            margin: 0
          }}>
            ${product.price}
          </p>
          <span style={{ 
            fontSize: "0.8rem", 
            color: product.inStock ? "#27ae60" : "#e74c3c",
            fontWeight: "600"
          }}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>
    </Link>
  </div>
);

export default ProductCard; 