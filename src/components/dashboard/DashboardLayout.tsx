import React, { useState } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { DashboardSidebar } from './DashboardSidebar';
import { X } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
      
      <div className="flex">
        {/* Overlay para mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar mobile */}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white transform lg:relative lg:translate-x-0 transition duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="absolute top-0 right-0 -mr-12 pt-4 lg:hidden">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Fechar menu</span>
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <DashboardSidebar onItemClick={() => setSidebarOpen(false)} />
        </div>

        {/* Conteúdo principal */}
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}