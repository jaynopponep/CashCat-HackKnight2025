from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_community.vectorstores import FAISS
from langchain.chains import create_history_aware_retriever
from langchain.chains import create_retrieval_chain
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from dotenv import load_dotenv
import os
CHROMA = "chroma"
load_dotenv()
OPENAI_KEY = os.getenv('OPENAI_KEY')

def build_rag_chain(api_key):
    embed = OpenAIEmbeddings(
        api_key=api_key,
        model="text-embedding-3-large"
    )
    db = Chroma(
        collection_name="cashcat",
        embedding_function=embed,
        persist_directory=CHROMA
    )
    retriever = db.as_retriever(
        search_type="similarity_score_threshold",
        search_kwargs={"k": 5, "score_threshold": 0.3},
    )
    model = ChatOpenAI(api_key=api_key, model="gpt-4o")
    context = (
        "Given chat history and the latest user prompt/question "
        "which might reference previous chat history context "
        "formulate a standalone question which can be understood "
        "without the chat history. Do NOT answer the question, just "
        "reformulate it if needed and otherwise return it as is."
    )
    context_with_history = ChatPromptTemplate(
        [
            ("system", context),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ]
    )
    history_aware_retriever = create_history_aware_retriever(
        model, retriever, context_with_history
    )
    main_query = (
        "You are an assistant for question-answering tasks. Use"
        "the following pieces of retrieved context to answer the "
        "question. If you don't know the answer, just say "
        "you don't know. Use 5 sentences maximum and keep the answer concise "
        "At the end, you must state that this is not financial advice, although "
        "just simply for discussion."
        "\n\n"
        "{context}"
    )
    prompt = ChatPromptTemplate(
        [
            ("system", main_query),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ]
    )
    qna_chain = create_stuff_documents_chain(model, prompt)
    rag_chain = create_retrieval_chain(history_aware_retriever, qna_chain)
    return rag_chain

def test():
    history = []
    while True:
        query = input("You: ")
        if query.lower() == "exit":
            break
        rag_chain = build_rag_chain(OPENAI_KEY)
        result = rag_chain.invoke({"input": query, "chat_history": history})
        print(f"AI: {result['answer']}")
        history.append(HumanMessage(content=query))
        history.append(SystemMessage(content=result["answer"]))

if __name__ == "__main__":
    test()
