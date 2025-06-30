from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json
from rag_service import RAGService

app = FastAPI(title="E-Commerce RAG API", version="1.0.0")

# Add CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Data models
class Product(BaseModel):
    id: int
    name: str
    category: str
    price: float
    rating: float

class ChatRequest(BaseModel):
    message: str
    user_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    sources: List[str] = []
    products: List[Product] = []

# Initialize RAG service
# This will automatically load/create the FAISS index on startup.
try:
    rag_service = RAGService()
    rag_initialized = True
    print("RAG service initialized successfully.")
except Exception as e:
    rag_service = None
    rag_initialized = False
    print(f"Error initializing RAG service: {e}")


@app.get("/")
def read_root():
    return {
        "message": "E-Commerce RAG API is running!",
        "rag_status": "initialized" if rag_initialized else "failed",
        "endpoints": {
            "chat": "/chat",
            "health": "/health",
        }
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy", 
        "service": "RAG API",
        "rag_initialized": rag_initialized
    }

@app.post("/chat", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest):
    """
    Chat endpoint with RAG functionality
    """
    user_message = request.message
    
    if not rag_initialized or not rag_service:
        raise HTTPException(
            status_code=503,
            detail="RAG service is not available."
        )
    
    try:
        # Use RAG service to generate response
        rag_result = rag_service.query(user_message)
        
        return ChatResponse(
            response=rag_result["response"],
            products=rag_result.get("products", []),
            sources=rag_result.get("sources", [])
        )
        
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        raise HTTPException(
            status_code=500, 
            detail="Error processing your request."
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000) 