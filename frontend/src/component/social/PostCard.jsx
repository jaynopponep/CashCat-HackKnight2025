import React from 'react';
import { Heart, MessageSquare } from 'lucide-react';

const PostCard = ({ post, onLike }) => {
  return (
    <div className="bg-white rounded-lg shadow mb-4 p-4">
      <div className="flex justify-between mb-3">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
            {post.user.avatar}
          </div>
          <div>
            <div className="font-medium">{post.user.name}</div>
            <div className="text-sm text-gray-500">{post.user.handle} · {post.timestamp}</div>
          </div>
        </div>
        <div className="px-2 py-1 text-xs text-white rounded-full" 
          style={{ backgroundColor: 'var(--component)' }}>
          {post.category}
        </div>
      </div>
      
      <div className="mb-4">
        {post.content}
      </div>
      
      <div className="flex items-center text-gray-500 text-sm">
        <button 
          onClick={() => onLike(post.id)}
          className="flex items-center mr-4 hover:text-red-600 transition-colors"
        >
          <Heart size={18} className="mr-1" />
          <span>{post.likes}</span>
        </button>
        <button className="flex items-center hover:text-gray-700 transition-colors">
          <MessageSquare size={18} className="mr-1" />
          <span>{post.comments}</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;