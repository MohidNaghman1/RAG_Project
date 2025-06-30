import React from "react";

const ProductDetail = ({ product, onAddToCart }) => {
  if (!product) return <div>Product not found.</div>;
  return (
    <div style={{ 
      display: "grid", 
      gridTemplateColumns: "1fr 1fr", 
      gap: "3rem", 
      margin: "2rem 0",
      alignItems: "start"
    }}>
      <div>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ 
            width: "100%", 
            height: "auto", 
            maxHeight: "500px",
            objectFit: "cover", 
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
          }} 
        />
      </div>
      <div style={{ padding: "1rem 0" }}>
        <h1 style={{ 
          fontSize: "2.5rem", 
          margin: "0 0 1rem 0",
          fontWeight: "700",
          color: "#2c3e50"
        }}>
          {product.name}
        </h1>
        <p style={{ 
          color: "#666", 
          fontSize: "1.1rem",
          margin: "0 0 1.5rem 0",
          padding: "0.5rem 1rem",
          background: "#f8f9fa",
          borderRadius: "20px",
          display: "inline-block"
        }}>
          {product.category}
        </p>
        <p style={{ 
          fontWeight: "bold", 
          fontSize: "2.5rem",
          color: "#e74c3c",
          margin: "0 0 2rem 0"
        }}>
          ${product.price}
        </p>
        <div style={{ 
          background: "#f8f9fa", 
          padding: "1.5rem", 
          borderRadius: 12,
          margin: "0 0 2rem 0"
        }}>
          <p style={{ 
            fontSize: "1.1rem", 
            lineHeight: "1.6",
            color: "#555",
            margin: 0
          }}>
            {product.description}
          </p>
        </div>
        <button 
          onClick={onAddToCart} 
          style={{ 
            padding: "1rem 2rem", 
            fontSize: "1.1rem", 
            background: "#2c3e50", 
            color: "#fff", 
            border: "none", 
            borderRadius: 8, 
            cursor: "pointer",
            fontWeight: "600",
            transition: "background 0.2s",
            minWidth: "200px"
          }}
          onMouseEnter={(e) => e.target.style.background = "#34495e"}
          onMouseLeave={(e) => e.target.style.background = "#2c3e50"}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail; 