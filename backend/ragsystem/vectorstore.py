from langchain_community.document_loaders import PyPDFLoader, PyPDFDirectoryLoader
from langchain_chroma import Chroma
from langchain.schema import Document
from langchain_openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from dotenv import load_dotenv
import os
import shutil

load_dotenv()
OPENAI_KEY = os.getenv('OPENAI_KEY')

CHROMA = "chroma"
DATA = "data"
TEST = "test_data"

embed = OpenAIEmbeddings(
    api_key=OPENAI_KEY,
    model="text-embedding-3-large"
)

def load_documents():
    loader = PyPDFDirectoryLoader(DATA)
    docs = loader.load()
    return docs

def split_text(documents: list[Document]):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=2000,
        chunk_overlap=200,
        length_function=len,
    )
    chunks = text_splitter.split_documents(documents)
    #documents = chunks[10]
    return chunks

def save_to_chroma(chunks: list[Document]):
    if os.path.exists(CHROMA):
        shutil.rmtree(CHROMA)

    db = Chroma(
        collection_name="cashcat",
        embedding_function=embed,
        persist_directory=CHROMA
    )
    texts = [chunk.page_content for chunk in chunks]
    metadatas = [chunk.metadata for chunk in chunks]
    db.add_texts(texts=texts, metadatas=metadatas)
    print(f"Successfully saved {len(chunks)} to {CHROMA}.")

def generate_data_store():
    documents = load_documents()
    chunks = split_text(documents)
    save_to_chroma(chunks)

if __name__ == "__main__":
    generate_data_store()
