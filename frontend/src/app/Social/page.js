'use client';

import React, { useState, useEffect } from 'react';
import SideBar from '../../component/social/SideBar';
import SocialHeader from '../../component/social/SocialHeader';
import CreatePost from '../../component/social/CreatePost';
import PostList from '../../component/social/PostList';
import VisualizationPanel from '../../component/social/VisualizationPanel';

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState('feed');
  const [user, setUser] = useState({
    name: 'James Doe',
    handle: '@jamesdoesfinance',
    avatar: 'JD',
    balance: 3842.65,
    growth: 12.4
  });
  
  //fetch from mongo in the long run 
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        handle: '@sarahsaves',
        avatar: 'SJ'
      },
      content: 'Just paid off my student loans! 🎉 #debtfree',
      category: 'Debt',
      likes: 24,
      comments: 8,
      timestamp: '2h ago'
    },
    {
      id: 2,
      user: {
        name: 'Mike Chen',
        handle: '@investmike',
        avatar: 'MC'
      },
      content: 'My ETF portfolio is up 12% this month. Diversification really works! Who else is seeing positive returns?',
      category: 'Investing',
      likes: 42,
      comments: 15,
      timestamp: '5h ago'
    },
    {
      id: 3,
      user: {
        name: 'Jamie Williams',
        handle: '@budgetboss',
        avatar: 'JW'
      },
      content: 'Cut my monthly expenses by $400 using the envelope budgeting method. Happy to share tips!',
      category: 'Budgeting',
      likes: 36,
      comments: 22,
      timestamp: '1d ago'
    }
  ]);

  const handleCreatePost = (newPost) => {
    //this would be an API call once we get that set up 
    const post = {
      id: posts.length + 1,
      user: {
        name: user.name,
        handle: user.handle,
        avatar: user.avatar
      },
      content: newPost.content,
      category: newPost.category,
      likes: 0,
      comments: 0,
      timestamp: 'Just now'
    };
    setPosts([post, ...posts]);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  //endpoint and api calls go here later on @team
  useEffect(() => {
    // fetchPosts();
    // fetchUserProfile();
  }, []);

  return (
    <div className="flex h-screen">
      <SideBar user={user} />
      
      <div className="flex-1 flex flex-col">
        <SocialHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 overflow-auto">
          <CreatePost onCreatePost={handleCreatePost} />
          <PostList posts={posts} onLike={handleLike} />
        </div>
      </div>
      
      <VisualizationPanel />
    </div>
  );
}