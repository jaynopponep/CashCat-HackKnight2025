"use client"
import React, { useEffect, useState } from 'react';
import { DollarSign, Users, HelpCircle, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SideBar = ({ user }) => {
  const router = useRouter();
  const phrases = [
      "No $6 latte today.. 😾",
      "Do you really need that subscription.. 😼",
      "Takeout today, but no salmon treats for me? 😿",
      "Maybe those eggs will be down tomorrow... 🥚",
  ]
  const [randomPhrase, setRandomPhrase] = useState('');
  useEffect(() => {
    document.documentElement.style.setProperty('--background', '#f00d09');
    document.documentElement.style.setProperty('--component', '#f00d09');
    document.documentElement.style.setProperty('--component-hover', '#ff7700');
    document.documentElement.style.setProperty('--border-color', '#dddddd');
    document.documentElement.style.setProperty('--text-primary', '#ffffff');
    setRandomPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
  }, []);

  const handleNavigation = (path) => {
    router.push(path);
  };

  // Dummy Savings Trend Data
  const savingsData = {
    labels: ['January', 'February', 'March'],
    datasets: [
      {
        label: 'Savings ($)',
        data: [3000, 2600, 2900],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="w-64 text-white flex flex-col mt-9" style={{ backgroundColor: 'var(--background)' }}>
      {}
      <div className="p-4 border-b" style={{ borderColor: 'var(--component-hover)' }}>
        <h1 className="text-2xl font-bold cursor-pointer" onClick={() => handleNavigation('/')}>CashCat</h1>
        <p style={{ color: '#ffcccc' }}>{randomPhrase}</p>
      </div>

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

      <nav className="flex-1 flex flex-col space-y-8 px-4">
        <NavItem icon={<DollarSign />} label="Budget" onClick={() => handleNavigation('/Budget')} />

        {/* Savings Trend Chart */}
        <div className="p-4 bg-white rounded-lg text-gray-800 w-full">
          <h3 className="text-md font-semibold text-center text-black mb-2">Savings Trend</h3>
          <Bar data={savingsData} />
        </div>
        
        <NavItem icon={<Users />} label="Friends" onClick={() => handleNavigation('/')} />
        <NavItem 
          icon={<HelpCircle />} 
          label="Help Center" 
          onClick={() => handleNavigation('/help')} 
        />
      </nav>

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
