'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header  from '@/component/Header'
import { Send, Cat, ChevronDown } from 'lucide-react';
import SideBar from '../../component/social/SideBar';

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
   
    <div className="border-b last:border-0">
        
      <div 
        className="flex justify-between items-center cursor-pointer py-3"
        onClick={() => setOpen(!open)}
      >
        <h3 className="font-medium text-gray-800">{question}</h3>
        <ChevronDown 
          size={20} 
          className={`transform transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </div>
      {open && (
        <p className="text-gray-600 mt-1 pb-3">{answer}</p>
      )}
    </div>
    
  );
};

export default function HelpPage() {
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const router = useRouter();
  
  // Sample user data (this should match your app's state management)
  const user = {
    name: 'James Doe',
    handle: '@jamesdoesfinance',
    avatar: 'JD',
    balance: 3842.65,
    growth: 12.4
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would typically send the message to your backend
      // For now, we'll just show the success message
      setIsSent(true);
      setMessage('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSent(false);
      }, 3000);
    }
  };

  const faqs = [
    {
      question: "How do I track my spending?",
      answer: "Use the Budget section to log your daily expenses and track your spending habits."
    },
    {
      question: "Can I connect my bank account?",
      answer: "Yes! Go to Settings and select 'Link Account' to securely connect your bank."
    },
    {
      question: "How to use the social features?",
      answer: "Share your financial milestones and connect with friends by using the Friends tab."
    }
  ];

  return (
    <div className="flex h-screen"><></>
      <SideBar user={user} />
      
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto bg-gray-100">
          <div className="flex justify-center">
            <div className="w-full max-w-2xl mx-auto px-4 py-8 space-y-8">
              
              {/* Help Center Card */}
              <div className="bg-white rounded-lg border shadow-sm p-6" style={{ borderColor: 'var(--border-color)' }}>
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Help Center</h1>
                
                {isSent ? (
                  <div className="flex flex-col items-center justify-center p-10">
                    <Cat size={60} style={{ color: 'var(--component)' }} />
                    <p className="mt-4 text-xl font-medium">Sent!</p>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-600 mb-6">
                      Need help with your CashCat account? Send us a message and our team will get back to you as soon as possible.
                    </p>
                    
                    <div className="mb-4">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        rows={6}
                        className="w-full border rounded-lg p-4 focus:outline-none focus:ring-2 text-base leading-relaxed text-black"
                        style={{ borderColor: 'var(--border-color)' }}
                        placeholder="Type your question here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        onClick={handleSendMessage}
                        className="flex items-center text-white px-5 py-2 rounded-lg font-medium"
                        style={{ backgroundColor: 'var(--component)' }}
                      >
                        <Send size={18} className="mr-2" />
                        Send Message
                      </button>
                    </div>
                  </>
                )}
              </div>
              
              {/* FAQ Section */}
              <div className="bg-white rounded-lg border shadow-sm p-6" style={{ borderColor: 'var(--border-color)' }}>
                <h2 className="text-xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <FAQItem 
                      key={index}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}


