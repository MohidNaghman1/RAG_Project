import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ChatWindow = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Hello! I'm your AI shopping assistant. How can I help you find the perfect products today?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputText.trim() && !isLoading) {
      const newMessage = {
        id: messages.length + 1,
        type: "user",
        text: inputText,
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setInputText("");
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:8000/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: inputText }),
        });

        if (!response.ok) {
          throw new Error("Failed to get response from the RAG API.");
        }

        const data = await response.json();
        
        const botResponse = {
          id: messages.length + 2,
          type: "bot",
          text: data.response,
          products: data.products || [],
          sources: data.sources || [],
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);

      } catch (error) {
        console.error("API Error:", error);
        const errorResponse = {
          id: messages.length + 2,
          type: "bot",
          text: "I'm sorry, I'm having trouble connecting to my brain right now. Please try again in a moment.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorResponse]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 1000 }}>
      {/* Chat Window */}
      {isOpen && (
        <div style={{
          width: "400px",
          height: "600px",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          marginBottom: "1rem",
          border: "1px solid #e1e8ed"
        }}>
          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            padding: "1rem 1.5rem",
            borderRadius: "16px 16px 0 0",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem"
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              background: "#fff",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem"
            }}>
              🤖
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600" }}>
                AI Shopping Assistant
              </h3>
              <p style={{ margin: 0, fontSize: "0.8rem", opacity: 0.9 }}>
                Online • Powered by RAG
              </p>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: "1rem",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: "flex",
                  justifyContent: message.type === "user" ? "flex-end" : "flex-start",
                  flexDirection: "column",
                  alignItems: message.type === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div style={{
                  maxWidth: "80%",
                  padding: "0.75rem 1rem",
                  borderRadius: message.type === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: message.type === "user" ? "#667eea" : "#f1f3f4",
                  color: message.type === "user" ? "#fff" : "#333",
                  fontSize: "0.9rem",
                  lineHeight: "1.4"
                }}>
                  {message.text}
                </div>
                {message.products && message.products.length > 0 && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    marginTop: '0.75rem',
                    width: '100%'
                  }}>
                    {message.products.map(product => (
                      <div 
                        key={product.id} 
                        onClick={() => {
                          navigate(`/product/${product.id}`);
                          setIsOpen(false);
                        }}
                        style={{
                          padding: '0.75rem',
                          border: '1px solid #e1e8ed',
                          borderRadius: '12px',
                          background: '#f9fafb',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f2f5'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                      >
                        <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#333' }}>{product.name}</h4>
                        <p style={{ margin: '0.25rem 0', color: '#555' }}>
                          <strong>Price:</strong> ${product.price}
                        </p>
                        <p style={{ margin: '0.25rem 0 0', color: '#555' }}>
                          <strong>Rating:</strong> {product.rating} ★
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{
                  maxWidth: "20%",
                  padding: "0.75rem 1rem",
                  borderRadius: "18px 18px 18px 4px",
                  background: "#f1f3f4",
                  color: "#333",
                }}>
                  ...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: "1rem",
            borderTop: "1px solid #e1e8ed",
            display: "flex",
            gap: "0.5rem"
          }}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about our products..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: "0.75rem 1rem",
                border: "1px solid #e1e8ed",
                borderRadius: "25px",
                fontSize: "0.9rem",
                outline: "none",
                background: isLoading ? "#f9f9f9" : "#fff"
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              style={{
                background: isLoading ? "#ccc" : "#667eea",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                cursor: isLoading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "60px",
          height: "60px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(102, 126, 234, 0.4)",
          fontSize: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s, box-shadow 0.2s"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(102, 126, 234, 0.4)";
        }}
      >
        {isOpen ? "×" : "💬"}
      </button>
    </div>
  );
};

export default ChatWindow; 