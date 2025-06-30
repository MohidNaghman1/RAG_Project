import React, { useState } from "react";
import { products, categories } from "../data/data";
import ProductList from "../components/ProductList";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div style={{ 
      maxWidth: 1600, 
      margin: "0 auto", 
      padding: "2rem 3rem",
      minHeight: "calc(100vh - 100px)"
    }}>
      <h1 style={{ 
        fontSize: "3rem", 
        margin: "0 0 1rem 0",
        color: "#2c3e50",
        fontWeight: "700",
        textAlign: "center"
      }}>
        Welcome to Our Store
      </h1>
      <p style={{ 
        fontSize: "1.2rem", 
        color: "#666", 
        textAlign: "center", 
        margin: "0 0 3rem 0",
        maxWidth: "600px",
        marginLeft: "auto",
        marginRight: "auto"
      }}>
        Discover amazing products at great prices
      </p>

      {/* Category Filter */}
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        marginBottom: "3rem",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              background: selectedCategory === category ? "#2c3e50" : "#f8f9fa",
              color: selectedCategory === category ? "#fff" : "#2c3e50",
              border: "2px solid #2c3e50",
              borderRadius: "25px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              if (selectedCategory !== category) {
                e.target.style.background = "#e8f4fd";
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCategory !== category) {
                e.target.style.background = "#f8f9fa";
              }
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Count */}
      <div style={{ 
        textAlign: "center", 
        marginBottom: "2rem",
        padding: "1rem",
        background: "#f8f9fa",
        borderRadius: "12px"
      }}>
        <p style={{ 
          fontSize: "1.1rem", 
          color: "#666", 
          margin: 0 
        }}>
          Showing {filteredProducts.length} products
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
        </p>
      </div>

      <ProductList products={filteredProducts} />
    </div>
  );
};

export default HomePage; 