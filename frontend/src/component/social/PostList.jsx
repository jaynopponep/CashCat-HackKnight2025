import React from 'react';
import PostCard from './PostCard';

const PostList = ({ posts, onLike }) => {
  return (
    <div className="px-4 pb-4">
      {posts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No posts yet. Be the first to share!
        </div>
      ) : (
        posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            onLike={onLike}
          />
        ))
      )}
    </div>
  );
};

export default PostList;