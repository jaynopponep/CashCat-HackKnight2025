import React, { useState } from 'react';
import { Heart, MessageSquare } from 'lucide-react';

const PostCard = ({ post, onLike }) => {
  const [liked, setLiked] = useState(false);
  
  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      onLike(post.id);
    }
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-200" style={{ borderColor: 'var(--border-color)' }}>
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white mr-4"
            style={{ backgroundColor: 'var(--component)' }}
          >
            {post.user.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center mb-1">
              <span className="font-medium text-base">{post.user.name}</span>
              <span className="mx-2 text-gray-500">paid</span>
              <span className="font-medium text-base">{post.category}</span>
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              {post.timestamp} · {post.user.handle}
            </div>
          </div>
        </div>
        
        <div className="py-3 text-gray-800 text-lg leading-relaxed tracking-wide">
          {post.content}
        </div>
      </div>
      
      <div className="flex border-t" style={{ borderColor: 'var(--border-color)' }}>
        <button 
          onClick={handleLike}
          className={`flex-1 py-3 flex items-center justify-center ${liked ? 'text-red-600' : 'text-gray-500'} hover:bg-gray-50 transition-colors duration-150`}
        >
          <Heart size={20} className="mr-2" fill={liked ? "currentColor" : "none"} />
          <span>{post.likes + (liked ? 1 : 0)}</span>
        </button>
        <div className="w-px bg-gray-200"></div>
        <button className="flex-1 py-3 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors duration-150">
          <MessageSquare size={20} className="mr-2" />
          <span>{post.comments}</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;