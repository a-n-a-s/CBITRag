from langchain_community.document_loaders import UnstructuredPDFLoader
from langchain_community.document_loaders import UnstructuredMarkdownLoader
from langchain_community.document_loaders import UnstructuredHTMLLoader
from langchain_community.document_loaders import UnstructuredFileLoader
from langchain_ollama import OllamaEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain.prompts import ChatPromptTemplate, PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_ollama.chat_models import ChatOllama
from langchain_core.runnables import RunnablePassthrough
from langchain.retrievers.multi_query import MultiQueryRetriever
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI

import warnings
warnings.filterwarnings('ignore')

import os
os.environ["PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION"] = "python"
os.environ['GOOGLE_API_KEY'] = "AIzaSyC7HtoFLbuXENidxBBbrcsWiOd_SCPcf8g"

# def load_document(file_path):
#     """Load document based on file type"""
#     if file_path.endswith('.pdf'):
#         loader = UnstructuredPDFLoader(file_path=file_path)
#     elif file_path.endswith('.md'):
#         loader = UnstructuredMarkdownLoader(file_path=file_path)
#     elif file_path.endswith('.html'):
#         loader = UnstructuredHTMLLoader(file_path=file_path)
#     else:
#         loader = UnstructuredFileLoader(file_path=file_path)
    
#     data = loader.load()
#     print(f"Document loaded successfully: {file_path}")
#     return data

# def split_text(data):
#     """Split text into chunks"""
#     text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
#     chunks = text_splitter.split_documents(data)
#     print(f"Text split into {len(chunks)} chunks")
#     return chunks

# def create_vector_db(chunks, persist_dir="./chroma_db"):
#     """Create and persist vector database"""
#     embedding_function = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    
#     vector_db = Chroma.from_documents(
#         documents=chunks,
#         embedding=embedding_function,
#         collection_name="local-rag",
#         persist_directory=persist_dir
#     )
#     print("Vector database created successfully")
#     return vector_db

def setup_retriever(llm):
    
    embedding_function = GoogleGenerativeAIEmbeddings(model="models/embedding-001")


    # llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash")
    
        
    vector_db = Chroma(
        collection_name="local-rag",
        embedding_function=embedding_function,
        persist_directory="./chroma_db"
    )   
    
    """Set up the multi-query retriever"""
    QUERY_PROMPT = PromptTemplate(
        input_variables=["question"],
        template="""You are an AI language model assistant. Your task is to generate 2
        different versions of the given user question to retrieve relevant documents from
        a vector database. By generating multiple perspectives on the user question, your
        goal is to help the user overcome some of the limitations of the distance-based
        similarity search. Provide these alternative questions separated by newlines.
        Original question: {question}""",
    )

    retriever = MultiQueryRetriever.from_llm(
        vector_db.as_retriever(), 
        llm,
        prompt=QUERY_PROMPT
    )
    return retriever

def create_rag_chain(retriever, llm):
    """Create the RAG chain"""
    template = """Answer the question based ONLY on the following context:
    {context}
    Question: {question}
    """
    prompt = ChatPromptTemplate.from_template(template)
    
    chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )
    return chain

def chat_wiht_pdf(question):
    # Load document
    # local_path = "./data/cutoff.md"
    # data = load_document(local_path)
    
    # Split text
    # chunks = split_text(data)
    
    # Create vector database
    # vector_db = create_vector_db(chunks)
    
    # Set up LLM
    llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash")
    
    # Load persisted vector DB (alternative to creating new)
    # vector_db = Chroma(
    #     collection_name="local-rag",
    #     embedding_function=GoogleGenerativeAIEmbeddings(model="models/embedding-001"),
    #     persist_directory="./chroma_db"
    # )
    
    # Set up retriever
    retriever = setup_retriever( llm)
    
    # Create RAG chain
    chain = create_rag_chain(retriever, llm)
    
    # Example query
    # question = "What all the data you have?"
    answer = chain.invoke(question)

    return answer
    
    # Clean up (optional)
    # vector_db.delete_collection()
    # print("Vector database deleted successfully")

if __name__ == "__main__":
    chat_wiht_pdf(question)