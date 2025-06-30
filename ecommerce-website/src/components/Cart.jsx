import React from "react";

const Cart = ({ cartItems, onRemove }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div style={{ margin: "2rem 0" }}>
      <h1 style={{ 
        fontSize: "2.5rem", 
        margin: "0 0 2rem 0",
        color: "#2c3e50",
        fontWeight: "700"
      }}>
        Your Cart
      </h1>
      {cartItems.length === 0 ? (
        <div style={{ 
          textAlign: "center", 
          padding: "3rem",
          background: "#f8f9fa",
          borderRadius: 12
        }}>
          <p style={{ fontSize: "1.2rem", color: "#666" }}>Your cart is empty.</p>
        </div>
      ) : (
        <div>
          <div style={{ 
            background: "#fff", 
            borderRadius: 12, 
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            overflow: "hidden"
          }}>
            {cartItems.map(item => (
              <div key={item.id} style={{ 
                display: "grid", 
                gridTemplateColumns: "auto 1fr auto auto", 
                alignItems: "center",
                padding: "1.5rem",
                borderBottom: "1px solid #eee",
                gap: "1.5rem"
              }}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{ 
                    width: 80, 
                    height: 80, 
                    objectFit: "cover", 
                    borderRadius: 8 
                  }} 
                />
                <div>
                  <h3 style={{ 
                    margin: "0 0 0.5rem 0", 
                    fontSize: "1.2rem",
                    fontWeight: "600"
                  }}>
                    {item.name}
                  </h3>
                  <p style={{ 
                    margin: 0, 
                    color: "#666",
                    fontSize: "0.9rem"
                  }}>
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ 
                    margin: 0, 
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "#2c3e50"
                  }}>
                    ${item.price} each
                  </p>
                  <p style={{ 
                    margin: "0.5rem 0 0 0", 
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "#e74c3c"
                  }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button 
                  onClick={() => onRemove(item.id)} 
                  style={{ 
                    background: "#e74c3c", 
                    color: "#fff", 
                    border: "none", 
                    borderRadius: 6, 
                    padding: "0.75rem 1.5rem", 
                    cursor: "pointer",
                    fontWeight: "600",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.background = "#c0392b"}
                  onMouseLeave={(e) => e.target.style.background = "#e74c3c"}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div style={{ 
            background: "#2c3e50", 
            color: "#fff", 
            padding: "2rem", 
            borderRadius: 12,
            marginTop: "2rem",
            textAlign: "right"
          }}>
            <h2 style={{ 
              margin: 0, 
              fontSize: "2rem",
              fontWeight: "700"
            }}>
              Total: ${total.toFixed(2)}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart; 