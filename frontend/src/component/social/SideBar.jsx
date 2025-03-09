import React from 'react';
import { DollarSign, Users, HelpCircle, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SideBar = ({ user }) => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="w-64 text-white flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <div className="p-4 border-b" style={{ borderColor: 'var(--component-hover)' }}>
        <h1 className="text-2xl font-bold cursor-pointer" onClick={() => handleNavigation('/')}>CashCat</h1>
        <p style={{ color: '#ffcccc' }}>Smart Social Finance</p>
      </div>
      
      {/* Balance Section */}
      <div className="p-4 mb-6">
        <div className="bg-white rounded-lg p-3 text-gray-800">
          <div style={{ color: 'var(--component)' }}>Your Balance</div>
          <div className="text-2xl font-bold">${user.balance.toLocaleString()}</div>
          <div className="mt-2 text-sm text-green-600 flex items-center">
            <TrendingUp size={16} className="mr-1" />
            <span>+{user.growth}% this month</span>
          </div>
        </div>
      </div>
      
      {/* Navigation Section */}
      <nav className="flex-1 flex flex-col space-y-8 px-4">
        <NavItem icon={<DollarSign />} label="Budget" onClick={() => handleNavigation('/')} />
        
        {/* Data Visualization Section */}
        <div 
          className="cursor-pointer flex flex-col items-center justify-center p-4 rounded border border-gray-400 w-full h-40"
          style={{ backgroundColor: 'var(--component)' }}
          onClick={() => handleNavigation('/')}
        >
          <span className="text-xl font-bold">Arbab</span>
          <span className="text-sm">Data Visualization</span>
        </div>
        
        <NavItem icon={<Users />} label="Friends" onClick={() => handleNavigation('/')} />
        <NavItem 
          icon={<HelpCircle />} 
          label="Help Center" 
          onClick={() => handleNavigation('/help')} 
        />
      </nav>
      
      {/* Footer with User Info */}
      <div className="p-4 border-t mt-6" style={{ borderColor: 'var(--component-hover)' }}>
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

const NavItem = ({ icon, label, active = false, onClick }) => {
  return (
    <div 
      className="px-4 py-3 cursor-pointer flex items-center rounded"
      style={{ backgroundColor: active ? 'var(--component)' : 'transparent' }}
      onClick={onClick}
    >
      <div className="mr-3">{icon}</div>
      <span>{label}</span>
    </div>
  );
};

export default SideBar;