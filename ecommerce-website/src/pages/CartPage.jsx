import React, { useContext } from "react";
import Cart from "../components/Cart";
import { CartContext } from "./_CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  return (
    <div style={{ 
      maxWidth: 1000, 
      margin: "0 auto", 
      padding: "2rem 3rem",
      minHeight: "calc(100vh - 100px)"
    }}>
      <Cart cartItems={cartItems} onRemove={removeFromCart} />
    </div>
  );
};

export default CartPage; 