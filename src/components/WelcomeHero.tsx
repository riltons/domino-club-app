import React from 'react';
import { Plus } from 'lucide-react';

interface WelcomeHeroProps {
  onCreateCommunity: () => void;
}

export function WelcomeHero({ onCreateCommunity }: WelcomeHeroProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white p-8 mb-8">
      <h1 className="text-3xl font-bold mb-4">Bem-vindo ao DominóClub</h1>
      <p className="text-lg text-blue-100 mb-6">
        Crie e gerencie sua comunidade de jogadores de dominó. Organize partidas, 
        acompanhe resultados e mantenha sua comunidade ativa.
      </p>
      <button 
        onClick={onCreateCommunity}
        className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded-lg inline-flex items-center transition-colors"
      >
        <Plus className="h-5 w-5 mr-2" />
        Criar Nova Comunidade
      </button>
    </div>
  );
}