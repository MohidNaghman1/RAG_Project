# build.py
# This script will be run by Render during the build process.

from rag_service import RAGService

print("Starting build process: Initializing RAGService to create FAISS index...")

# Creating an instance of RAGService will automatically trigger
# the index creation and saving logic if it doesn't exist.
try:
    RAGService()
    print("Build process completed successfully. FAISS index should be ready.")
except Exception as e:
    print(f"An error occurred during the build process: {e}")
    # Exit with a non-zero status code to indicate failure
    exit(1)