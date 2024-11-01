import React from 'react';
import { Bell, Search, Settings, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={onMenuClick}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 ml-2 lg:ml-0">DominóClub</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Bell className="h-6 w-6 text-gray-600" />
            </button>
            
            <div className="hidden sm:flex items-center space-x-3">
              <Link 
                to="/dashboard/settings"
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <Settings className="h-6 w-6 text-gray-600" />
              </Link>
              <Link 
                to="/dashboard/settings"
                className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg p-2"
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User avatar"
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">Carlos Silva</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}