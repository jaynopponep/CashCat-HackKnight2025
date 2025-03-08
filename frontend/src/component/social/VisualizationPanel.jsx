import React from 'react';
import { BarChart2 } from 'lucide-react';

const VisualizationPanel = () => {
  const tags = [
    { name: '#debtfree', color: 'var(--component)' },
    { name: '#investing', color: 'var(--background)' },
    { name: '#budgeting', color: 'var(--component)' },
    { name: '#fire', color: 'var(--background)' },
    { name: '#sidehustle', color: 'var(--component)' }
  ];
  
  return (
    <div className="w-72 border-l p-4 bg-white hidden lg:block" style={{ borderColor: 'var(--border-color)' }}>
      <h2 className="font-bold text-lg mb-4">Trending Insights</h2>
      
      <div className="mb-6">
        <h3 className="text-sm text-gray-600 mb-2">Community Savings Rate</h3>
        <div className="h-40 bg-gray-100 rounded flex items-center justify-center">
          <BarChart2 size={60} style={{ color: 'var(--component)' }} />
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm text-gray-600 mb-2">Popular Investment Categories</h3>
        <div className="h-40 bg-gray-100 rounded flex items-center justify-center">
          <BarChart2 size={60} style={{ color: 'var(--component)' }} />
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Top Financial Hashtags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 text-white rounded-full text-xs" 
              style={{ backgroundColor: tag.color }}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisualizationPanel;