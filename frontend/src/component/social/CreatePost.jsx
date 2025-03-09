import React, { useState } from 'react';

const CreatePost = ({ onCreatePost }) => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!content.trim() || !category) {
      return;
    }
    
    onCreatePost({
      content,
      category
    });
    
    setContent('');
    setCategory('');
  };
  
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white mr-4" style={{ backgroundColor: 'var(--component)' }}>
            JD
          </div>
          <div className="text-base text-gray-600">What's your financial win today?</div>
        </div>
        
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded-lg p-4 focus:outline-none focus:ring-2 text-base leading-relaxed text-black" 
          placeholder="Share your financial journey..."
          style={{ borderColor: 'var(--border-color)' }}
          rows={3}
          required
        />
        
        <div className="flex justify-between mt-4">
          <div className="flex space-x-3">
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded border px-4 py-2 text-sm text-gray-700"
              required
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Bills">Bills</option>
              <option value="Budgeting">Budgeting</option>
              <option value="Investing">Investing</option>
              <option value="Debt">Debt</option>
              <option value="Savings">Savings</option>
              <option value="Income">Income</option>
              <option value="Expenses">Expenses</option>
              <option value="Business">Business</option>
            </select>
            <button type="button" className="rounded border px-4 py-2 text-sm text-gray-700">Add Chart</button>
          </div>
          <button 
            type="submit"
            className="text-white px-5 py-2 rounded-lg font-medium" 
            style={{ backgroundColor: 'var(--component)' }}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;