import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => (
  <div style={{ 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", 
    gap: "2.5rem", 
    margin: "2rem 0",
    maxWidth: "100%"
  }}>
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);

export default ProductList; 