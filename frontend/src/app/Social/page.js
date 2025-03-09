'use client';

import React, { useState, useEffect } from 'react';
import SideBar from '../../component/social/SideBar';
import CreatePost from '../../component/social/CreatePost';
import EnhancedPostList from '../../component/social/EnhancedPostList';
import VisualizationPanel from '../../component/social/VisualizationPanel';
import Header from '@/component/Header';

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState('feed');
  const [user, setUser] = useState({
    name: 'Walter White',
    handle: '@heisenberg',
    avatar: 'WW',
    balance: 3842.65,
    growth: 12.4
  });
  
  // Endpoint and API calls go here later on @team
  useEffect(() => {
    // fetchPosts();
    // fetchUserProfile();
  }, []);

  const handleCreatePost = (newPost) => {
    // This will be handled by the EnhancedPostList component directly
  };

  return (
    <div className='flex-col'>
      <Header></Header>
    <div className="flex h-screen">
      <SideBar user={user} />
      
      <div className="flex-1 flex flex-col">
        {/* <SocialHeader activeTab={activeTab} setActiveTab={setActiveTab} /> */}
        <div className="flex-1 overflow-auto bg-gray-100">
          <div className="flex justify-center">
            <div className="w-full max-w-lg mx-auto px-4 py-8">
              <CreatePost onCreatePost={handleCreatePost} />
              <div className="mt-10">
                <EnhancedPostList />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <VisualizationPanel />
    </div>
    </div>
  );
}
