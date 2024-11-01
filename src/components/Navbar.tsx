import React from 'react';
import { Menu, Search, Bell, User, UserPlus, Trophy, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            <Menu className="h-6 w-6 text-gray-600" />
            <Link to="/" className="text-xl font-semibold text-gray-800">DominóClub</Link>
            
            <div className="hidden md:flex space-x-4">
              <Link 
                to="/register/player" 
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Registrar Jogador
              </Link>
              <Link 
                to="/match/teams" 
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Nova Partida
              </Link>
              <Link 
                to="/match/progress" 
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                <Clock className="h-4 w-4 mr-2" />
                Acompanhar Partidas
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Buscar jogadores..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="h-6 w-6 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <User className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Menu móvel */}
        <div className="md:hidden border-t border-gray-100 py-2">
          <div className="flex flex-col space-y-2">
            <Link 
              to="/register/player" 
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Registrar Jogador
            </Link>
            <Link 
              to="/match/teams" 
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <Trophy className="h-4 w-4 mr-2" />
              Nova Partida
            </Link>
            <Link 
              to="/match/progress" 
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <Clock className="h-4 w-4 mr-2" />
              Acompanhar Partidas
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}