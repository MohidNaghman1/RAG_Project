import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/data";
import ProductDetail from "../components/ProductDetail";
import { CartContext } from "./_CartContext";

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { addToCart } = useContext(CartContext);
  return (
    <div style={{ 
      maxWidth: 1200, 
      margin: "0 auto", 
      padding: "2rem 3rem",
      minHeight: "calc(100vh - 100px)"
    }}>
      <ProductDetail product={product} onAddToCart={() => addToCart(product)} />
    </div>
  );
};

export default ProductPage; 