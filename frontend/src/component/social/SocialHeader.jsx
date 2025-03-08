import React from 'react';
import { Search } from 'lucide-react';

const SocialHeader = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'feed', label: 'Feed' },
    { id: 'trending', label: 'Trending' },
    { id: 'my-posts', label: 'My Posts' }
  ];

  return (
    <div className="bg-white p-4 shadow flex items-center justify-between">
      <div className="flex space-x-4">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className="px-4 py-2 rounded-full text-white"
            style={{ 
              backgroundColor: activeTab === tab.id ? 'var(--component)' : 'var(--background)',
              opacity: activeTab === tab.id ? 1 : 0.8
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search posts..." 
          className="px-4 py-2 pl-10 border rounded-full w-64 focus:outline-none focus:ring-2"
          style={{ borderColor: 'var(--border-color)' }}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>
    </div>
  );
};

export default SocialHeader;