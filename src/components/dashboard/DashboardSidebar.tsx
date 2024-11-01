import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Trophy, Calendar, Settings, HelpCircle, UserPlus, List } from 'lucide-react';

interface DashboardSidebarProps {
  onItemClick?: () => void;
}

const menuItems = [
  { icon: Home, label: 'Início', path: '/dashboard' },
  { icon: Users, label: 'Comunidades', path: '/dashboard/communities' },
  { icon: Trophy, label: 'Competições', path: '/dashboard/competitions' },
  { icon: Calendar, label: 'Agenda', path: '/dashboard/schedule' },
  { icon: List, label: 'Resultados', path: '/match/results' },
  { icon: UserPlus, label: 'Cadastrar Jogador', path: '/dashboard/players/new' },
  { icon: Settings, label: 'Configurações', path: '/dashboard/settings' },
  { icon: HelpCircle, label: 'Ajuda', path: '/dashboard/help' },
];

export function DashboardSidebar({ onItemClick }: DashboardSidebarProps) {
  const location = useLocation();

  return (
    <aside className="h-full bg-white shadow-sm p-4 overflow-y-auto">
      <nav className="space-y-1">
        {menuItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            onClick={onItemClick}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === path
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}