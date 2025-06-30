import json
import os
from dotenv import load_dotenv

# LangChain Imports
from langchain.schema import Document
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

# Load environment variables from .env file
load_dotenv()

# --- PATHS ---
script_dir = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(script_dir, 'data', 'Product.json')
FAISS_INDEX_PATH = os.path.join(script_dir, "faiss_index")

class RAGService:
    def __init__(self):
        self.retriever = None
        self.chain = None
        
        # Check for API Key
        if not os.getenv("GROQ_API_KEY"):
            raise ValueError("GROQ_API_KEY not found in environment variables.")

        # Initialize components
        self._initialize_retriever()
        self._initialize_chain()

    def _initialize_retriever(self):
        """Initializes the FAISS vector store and retriever."""
        embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

        if not os.path.exists(FAISS_INDEX_PATH):
            print("Creating and saving FAISS index...")
            
            with open(DATA_PATH) as f:
                products = json.load(f)["products"]

            product_documents = []
            for product in products:
                combined_text = (
                    f"Product Name: {product.get('name', '')}. "
                    f"Category: {product.get('category', '')}. "
                    f"Description: {product.get('description', '')}"
                )
                product_documents.append(Document(
                    page_content=combined_text,
                    metadata={
                        "id": product.get("id"),
                        "name": product.get("name"),
                        "category": product.get("category"),
                        "price": product.get("price"),
                        "rating": product.get("rating"),
                        # Add image to metadata to easily display on frontend
                        "image": product.get("image"), 
                    }
                ))

            splitter = RecursiveCharacterTextSplitter(chunk_size=300, chunk_overlap=50)
            chunked_documents = splitter.split_documents(product_documents)

            db = FAISS.from_documents(chunked_documents, embeddings)
            db.save_local(FAISS_INDEX_PATH)
            print(f"Vector store created and saved successfully to '{FAISS_INDEX_PATH}'")
        else:
            print(f"FAISS index found at '{FAISS_INDEX_PATH}'. Loading...")
            db = FAISS.load_local(FAISS_INDEX_PATH, embeddings, allow_dangerous_deserialization=True)

        self.retriever = db.as_retriever(search_kwargs={"k": 4})
        print("Retriever initialized successfully.")

    def _initialize_chain(self):
        """Initializes the full RAG chain with an LLM."""
        
        # 1. Set up the Language Model
        llm = ChatGroq(model="llama3-8b-8192", temperature=0.7)

        # 2. Define the Prompt Template
        # This instructs the LLM on how to generate a response using the retrieved context.
        template = """
        You are a friendly and helpful e-commerce assistant named 'ShopBot'.
        Your goal is to help users find the perfect product.

        Answer the user's question based ONLY on the following context of products.
        If the products in the context do not match the question, say you couldn't find a suitable product and suggest they rephrase their search.
        Be conversational and helpful. Mention one or two key products by name in your response.

        CONTEXT:
        {context}

        QUESTION:
        {question}

        ANSWER:
        """
        prompt = PromptTemplate.from_template(template)

        def format_docs(docs):
            """Helper function to format retrieved documents for the prompt."""
            return "\n\n".join(doc.page_content for doc in docs)

        # 3. Build the RAG Chain using LangChain Expression Language (LCEL)
        self.chain = (
            {"context": self.retriever | format_docs, "question": RunnablePassthrough()}
            | prompt
            | llm
            | StrOutputParser()
        )
        print("RAG chain initialized successfully.")

    def query(self, query_text: str):
        """
        Queries the RAG system. Retrieves documents and generates a response.
        """
        if not self.retriever or not self.chain:
            raise RuntimeError("RAG service not initialized properly.")
        
        # Get the source documents first to return to the frontend
        retrieved_docs = self.retriever.invoke(query_text)
        
        # Get the generated response from the LLM
        llm_response = self.chain.invoke(query_text)
        
        # Process the retrieved documents to extract product metadata
        products = []
        processed_ids = set()
        for doc in retrieved_docs:
            product_id = doc.metadata.get('id')
            if product_id and product_id not in processed_ids:
                products.append(doc.metadata)
                processed_ids.add(product_id)

        return {
            "response": llm_response,
            "products": products,
            "sources": [str(p.get('id')) for p in products]
        }