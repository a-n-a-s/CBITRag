# CBITRag - RAG-based Document Chat Application

A Retrieval-Augmented Generation (RAG) application that allows users to chat with their documents using AI. The application processes PDF, Markdown, HTML, and other document formats, then enables natural language querying to extract insights from the content.

## 🚀 Features

- **Multi-format Document Support**: Handle PDF, Markdown, HTML, and other document formats
- **AI-Powered Q&A**: Ask questions about your documents and get accurate answers
- **Modern UI**: Clean, responsive chat interface built with React and Tailwind CSS
- **Vector Search**: Semantic search using ChromaDB vector database
- **Multi-Query Retrieval**: Enhanced accuracy through alternative query generation
- **Real-time Interaction**: Instant responses with typing indicators

## 🛠️ Tech Stack

### Frontend
- **React**: Modern JavaScript library for building user interfaces
- **TypeScript**: Type-safe JavaScript development
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI / shadcn/ui**: Accessible UI components
- **TanStack Query**: Server state management
- **Axios**: HTTP client for API requests

### Backend
- **FastAPI**: Modern, fast web framework for Python
- **Langchain**: Framework for developing LLM applications
- **Google Generative AI**: Gemini models for text generation
- **ChromaDB**: Vector database for document embeddings
- **Ollama**: Alternative LLM support

## 📁 Project Structure

```
CBITRag/
├── rag_pipeline.ipynb          # Jupyter notebook for RAG pipeline development
├── requirements.txt             # Root Python dependencies
├── backend/
│   ├── requirements.txt         # Backend-specific dependencies
│   └── app/
│       ├── main.py              # FastAPI backend server
│       └── rag_utils.py         # RAG processing utilities
└── src/                         # React frontend
    ├── App.tsx
    ├── main.tsx
    ├── index.css, App.css
    ├── vite-env.d.ts
    ├── components/              # React components
    ├── hooks/                   # Custom React hooks
    ├── lib/                     # Utility functions
    └── pages/                   # Page components
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- Google API Key (for Google Generative AI)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CBITRag
   ```

2. **Set up the backend**

   Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

   Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   pip install -r backend/requirements.txt
   ```

3. **Set up the frontend**

   Navigate to the project root and install Node.js dependencies:
   ```bash
   # If you have package.json for the frontend
   npm install
   ```

4. **Set up your Google API Key**

   Create a `.env` file in the backend directory:
   ```bash
   # backend/.env
   GOOGLE_API_KEY=your_google_api_key_here
   ```

5. **Prepare your documents**

   Place your documents in a `data/` directory in the project root:
   ```
   CBITRag/
   └── data/
       ├── document1.pdf
       ├── document2.md
       └── ...
   ```

6. **Run the RAG pipeline**

   Execute the Jupyter notebook to process your documents:
   ```bash
   jupyter notebook rag_pipeline.ipynb
   ```
   
   Or run it directly with Python if converted:
   ```bash
   python rag_pipeline.py
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   uvicorn app.main:app --reload --port 8000
   ```

2. **Start the frontend server**
   ```bash
   cd src
   npm run dev  # or the appropriate command for your frontend setup
   ```

3. **Access the application**
   - Frontend: `http://localhost:3000` (or your configured port)
   - Backend API: `http://localhost:8000`
   - Backend docs: `http://localhost:8000/docs`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in your backend directory with the following:

```bash
GOOGLE_API_KEY=your_google_api_key_here
PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION=python
```

### Customization

- **Models**: Change the LLM by modifying the model name in `rag_utils.py` (default: `gemini-1.5-flash`)
- **Embeddings**: Switch to Ollama embeddings by uncommenting the relevant lines in `rag_utils.py`
- **Chunk size**: Adjust text splitting parameters in `rag_utils.py` (default: 1000 characters with 200 overlap)

## 🤖 How It Works

1. **Document Processing**: Documents are loaded, chunked, and converted to vector embeddings
2. **Vector Storage**: Embeddings are stored in ChromaDB for efficient similarity search
3. **Query Enhancement**: User questions are transformed into multiple queries for better results
4. **Context Retrieval**: Relevant document chunks are fetched using vector similarity
5. **Response Generation**: Gemini model generates answers based on retrieved context


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🙏 Acknowledgments

- Google Generative AI for the language models
- Langchain for the RAG framework
- ChromaDB for the vector database solution
- The open-source community for various components used
