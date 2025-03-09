import React, { useState, useEffect } from 'react';
import '../components.css';

const BASEURL = "http://127.0.0.1:5000";

const CreatePost = ({ onCreatePost }) => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found, user not authenticated.");
        return;
      }

      try {
        const response = await fetch(`${BASEURL}/get_username`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (!response.ok) {
          console.error("Error fetching username:", data);
          return;
        }

        setUsername(data.username);
      } catch (error) {
        console.error("Error retrieving username:", error);
      }
    };

    fetchUsername();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() || !category || !username) {
      console.error("Content, category, or username missing!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, cannot submit post.");
      return;
    }

    const postData = {
      username,
      content,
      category
    };

    try {
      const response = await fetch(`${BASEURL}/add_post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const result = await response.json();
      if (!response.ok) {
        console.error("Error submitting post:", result);
        return;
      }

      console.log("Post submitted successfully:", result);
      onCreatePost(postData);
      setContent('');
      setCategory('');
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
      <div className="bg-white p-5 rounded-lg shadow-sm w-full">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white mr-4" style={{ backgroundColor: 'var(--component)' }}>
              {username ? username.charAt(0).toUpperCase() : "WW"}
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
