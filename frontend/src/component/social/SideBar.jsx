import React from 'react';
import { BarChart2, DollarSign, Users, Search, Bell, Settings, HelpCircle, TrendingUp } from 'lucide-react';

const SideBar = ({ user }) => {
  return (
    <div className="w-64 text-white flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
      <div className="p-4 border-b" style={{ borderColor: 'var(--component-hover)' }}>
        <h1 className="text-2xl font-bold">CashCat</h1>
        <p style={{ color: '#ffcccc' }}>Smart Social Finance</p>
      </div>
      
      <div className="p-4 mb-4">
        <div className="bg-white rounded-lg p-3 text-gray-800">
          <div style={{ color: 'var(--component)' }}>Your Balance</div>
          <div className="text-2xl font-bold">${user.balance.toLocaleString()}</div>
          <div className="mt-2 text-sm text-green-600 flex items-center">
            <TrendingUp size={16} className="mr-1" />
            <span>+{user.growth}% this month</span>
          </div>
        </div>
      </div>
      
      <nav className="flex-1">
        <NavItem icon={<BarChart2 />} label="Data Visualization" active />
        <NavItem icon={<DollarSign />} label="Transactions" />
        <NavItem icon={<Users />} label="Friends" />
        <NavItem icon={<Search />} label="Explore" />
        <NavItem icon={<Bell />} label="Notifications" />
        <NavItem icon={<Settings />} label="Settings" />
        <NavItem icon={<HelpCircle />} label="Help Center" />
      </nav>
      
      <div className="p-4 border-t" style={{ borderColor: 'var(--component-hover)' }}>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3" style={{ color: 'var(--component)' }}>
            {user.avatar}
          </div>
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm" style={{ color: '#ffcccc' }}>{user.handle}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }) => {
  return (
    <div 
      className="px-4 py-2 cursor-pointer flex items-center"
      style={{ 
        backgroundColor: active ? 'var(--component)' : 'transparent',
      }}
    >
      <div className="mr-3">{icon}</div>
      <span>{label}</span>
    </div>
  );
};

export default SideBar;