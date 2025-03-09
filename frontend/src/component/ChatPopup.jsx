"use client"

import React, { useState } from 'react';
import { Cat, ArrowLeft } from 'lucide-react';

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi I'm Ozzy, ask me anything about finances! My advice isn't solid so I'm not liable for anything!", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, sender: 'user' }]);
      setInputText('');
      
      //connect the rag here @jay @arbab
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "I'm connecting to your financial database. Please note that my advice is for informational purposes only.", 
          sender: 'bot' 
        }]);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button 
          onClick={toggleChat}
          style={{ backgroundColor: 'var(--component)' }}
          className="hover:bg-[var(--component-hover)] text-white rounded-full p-5 shadow-lg flex items-center justify-center transition-all duration-300"
        >
          <Cat size={64} />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl flex flex-col w-80 md:w-96 h-[50vh] border border-[var(--border-color)] transition-all duration-300">
          <div 
            style={{ backgroundColor: 'var(--component)' }} 
            className="text-white p-3 rounded-t-lg flex justify-between items-center"
          >
            <div className="flex items-center">
              <Cat size={24} className="mr-2" />
              <span className="font-medium">Financial Assistant</span>
            </div>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <ArrowLeft size={20} />
            </button>
          </div>
          
          <div className="flex-1 p-3 overflow-y-auto bg-[var(--background-light)] flex flex-col items-center">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`px-4 py-3 rounded-lg max-w-[80%] mb-4 ${
                  msg.sender === 'user'
                    ? 'self-end bg-gray-200 text-black'
                    : 'self-start bg-white text-[var(--text-primary)] border border-[var(--border-color)]'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSubmit} className="border-t border-[var(--border-color)] p-4">
            <div className="flex">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border border-[var(--border-color)] rounded-l-lg px-4 py-3 focus:outline-none"
              />
              <button 
                type="submit" 
                style={{ backgroundColor: 'var(--component)' }}
                className="text-white px-4 py-3 rounded-r-lg hover:bg-[var(--component-hover)]"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatPopup;