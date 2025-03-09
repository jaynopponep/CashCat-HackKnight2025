import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';

const BASEURL = "https://cashcat.onrender.com"; // Update with actual backend URL

const EnhancedPostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASEURL}/get_posts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (!response.ok) {
          console.error("Error fetching posts:", data);
          return;
        }

        const formattedPosts = data.map((post, index) => ({
          id: index,
          user: {
            name: post.username || "AAA",
            handle: "@" + post.username,
            avatar: post.username ? post.username.charAt(0).toUpperCase() + post.username.charAt(1).toUpperCase() : "AA",
          },
          content: post.content || "AAA",
          category: post.category || "AAA",
          likes: 0,
          comments: 0,
          timestamp: "3/9/25"
        }));

        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error retrieving posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = (postId) => {
    // Do nothing for now - handled inside PostCard
  };

  const renderGap = () => (
      <div className="my-8 flex items-center justify-center">
        <div className="w-1/3 h-px bg-gray-200"></div>
        <div className="mx-4 text-gray-400 text-sm">∙∙∙</div>
        <div className="w-1/3 h-px bg-gray-200"></div>
      </div>
  );

  return (
      <div className="px-4 pb-16 pt-4 flex justify-center">
        <div className="w-full max-w-lg">
          {posts.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No transactions yet.
              </div>
          ) : (
              <>
                {posts.map((post, index) => (
                    <React.Fragment key={post.id}>
                      <PostCard
                          post={post}
                          onLike={handleLike}
                      />
                      {index < posts.length - 1 && renderGap()}
                    </React.Fragment>
                ))}
              </>
          )}
        </div>
      </div>
  );
};

export default EnhancedPostList;
