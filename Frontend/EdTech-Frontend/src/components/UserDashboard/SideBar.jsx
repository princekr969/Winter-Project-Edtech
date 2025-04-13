import React, {useEffect} from 'react';
import { Layout, User, BookOpen, PlusCircle } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

export default function Sidebar({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Layout },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'purchased', label: 'Purchased Courses', icon: BookOpen },
    { id: 'created', label: 'My Courses', icon: PlusCircle },
  ];

  return (
    <div className="w-64 max-sm:w-full max-sm:h-full h-auto bg-white  border-r border-gray-200 p-4">
      <nav>
          {tabs.map(tab => (
            <NavLink to={`/user/${tab.id}`}
              className={({isActive}) => `${(isActive)?"bg-indigo-50 text-indigo-600  ": "text-gray-600 hover:bg-gray-50"} w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2` }>
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </NavLink>
          ))}
      </nav>
    </div>
  );
}
