from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# from langchain_google_genai import ChatGoogleGenerativeAI
# from langchain_community.vectorstores import Chroma
# from langchain.prompts import ChatPromptTemplate, PromptTemplate
from pydantic import BaseModel
# from langchain.retrievers.multi_query import MultiQueryRetriever
# from langchain_google_genai import GoogleGenerativeAIEmbeddings
# from langchain_core.runnables import RunnablePassthrough
# from langchain_core.output_parsers import StrOutputParser
# # Jupyter-specific imports
# from IPython.display import display, Markdown
from rag_utils import chat_wiht_pdf



# import os
# os.environ["PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION"] = "python"
# embedding_function = GoogleGenerativeAIEmbeddings(model="models/embedding-001")


# llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash")




# vector_db = Chroma(
#     collection_name="local-rag",
#     embedding_function=embedding_function,
#     persist_directory="./chroma_db"
# )

# QUERY_PROMPT = PromptTemplate(
#     input_variables=["question"],
#     template="""You are an AI language model assistant. Your task is to generate 2
#     different versions of the given user question to retrieve relevant documents from
#     a vector database. By generating multiple perspectives on the user question, your
#     goal is to help the user overcome some of the limitations of the distance-based
#     similarity search. Provide these alternative questions separated by newlines.
#     Original question: {question}""",
# )

# # Set up retriever
# retriever = MultiQueryRetriever.from_llm(
#     vector_db.as_retriever(), 
#     llm,
#     prompt=QUERY_PROMPT
# )

# # RAG prompt template
# template = """Answer the question based ONLY on the following context:
# {context}
# Question: {question}
# """

# prompt = ChatPromptTemplate.from_template(template)

# chain = (
#     {"context": retriever, "question": RunnablePassthrough()}
#     | prompt
#     | llm
#     | StrOutputParser()
# )

# def chat_with_pdf(question):
#     """
#     Chat with the PDF using the RAG chain.
#     """
#     return chain.invoke(question)



class Query(BaseModel):
    question: str

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/query")
def send_ans(item : Query):
    message = chat_wiht_pdf(item)
    print(message)
    
    return message

