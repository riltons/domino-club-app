import React from 'react';
import { Trophy, Plus, Shield } from 'lucide-react';

interface WelcomeCardProps {
  onCreateCommunity: () => void;
  onCreateOrganizer: () => void;
}

export function WelcomeCard({ onCreateCommunity, onCreateOrganizer }: WelcomeCardProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Bem-vindo ao DominóClub!</h2>
          <p className="mt-1 text-blue-100">
            Gerencie suas comunidades e organize partidas
          </p>
        </div>
        <div className="hidden md:flex items-center space-x-3 bg-white/10 rounded-lg px-4 py-2">
          <Trophy className="h-5 w-5" />
          <div>
            <p className="text-sm">Total de Comunidades</p>
            <p className="font-semibold">3 ativas</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <button 
          onClick={onCreateCommunity}
          className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nova Comunidade
        </button>
        
        <button 
          onClick={onCreateOrganizer}
          className="inline-flex items-center px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
        >
          <Shield className="h-5 w-5 mr-2" />
          Adicionar Organizador
        </button>
      </div>
    </div>
  );
}