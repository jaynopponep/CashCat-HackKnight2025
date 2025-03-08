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
    <div className="bg-white m-4 p-4 rounded-lg shadow">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white mr-3" style={{ backgroundColor: 'var(--component)' }}>
            JD
          </div>
          <div className="text-sm text-gray-600">What's your financial win today?</div>
        </div>
        
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2" 
          placeholder="Share your financial journey..."
          style={{ borderColor: 'var(--border-color)' }}
          rows={3}
          required
        />
        
        <div className="flex justify-between mt-3">
          <div className="flex space-x-2">
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded border px-3 py-1 text-sm text-gray-700"
              required
            >
              <option value="">Select Category</option>
              <option value="Budgeting">Budgeting</option>
              <option value="Investing">Investing</option>
              <option value="Debt">Debt</option>
              <option value="Savings">Savings</option>
              <option value="Income">Income</option>
            </select>
            <button type="button" className="rounded border px-3 py-1 text-sm text-gray-700">Add Chart</button>
          </div>
          <button 
            type="submit"
            className="text-white px-4 py-2 rounded-lg" 
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