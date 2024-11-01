import React, { useState } from 'react';
import { Users, MapPin, Calendar, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { CreateCommunityModal } from '../../components/CreateCommunityModal';
import { CreateEventModal } from '../../components/community/CreateEventModal';
import type { Community } from '../../types/community';

// Dados simulados - substituir por chamada à API
const communities = [
  {
    id: 1,
    name: 'Liga Master de Dominó',
    members: 24,
    location: 'Centro Comunitário',
    nextGame: '26 Mar 2024',
    isPrivate: true,
  },
  {
    id: 2,
    name: 'Dominó dos Amigos',
    members: 16,
    location: 'Clube Social',
    nextGame: '28 Mar 2024',
    isPrivate: false,
  }
];

export function CommunitiesPage() {
  const [showCreateCommunity, setShowCreateCommunity] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<number | null>(null);

  const handleCreateCommunity = (data: Partial<Community>) => {
    console.log('Nova comunidade:', data);
    setShowCreateCommunity(false);
  };

  const handleCreateEvent = (data: any) => {
    console.log('Novo evento:', data);
    setShowCreateEvent(false);
  };

  const handleStartEvent = (communityId: number) => {
    setSelectedCommunity(communityId);
    setShowCreateEvent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Minhas Comunidades</h1>
        <button 
          onClick={() => setShowCreateCommunity(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nova Comunidade
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((community) => (
          <div key={community.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{community.name}</h3>
              {community.isPrivate && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  Privada
                </span>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-5 w-5 mr-2" />
                <span>{community.members} membros</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{community.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Próximo jogo: {community.nextGame}</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <button 
                onClick={() => handleStartEvent(community.id)}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
              >
                <CalendarIcon className="h-5 w-5 mr-2" />
                Criar Evento
              </button>
              <button className="w-full px-4 py-2 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors">
                Gerenciar Comunidade
              </button>
            </div>
          </div>
        ))}
      </div>

      <CreateCommunityModal
        isOpen={showCreateCommunity}
        onClose={() => setShowCreateCommunity(false)}
        onSubmit={handleCreateCommunity}
      />

      <CreateEventModal
        isOpen={showCreateEvent}
        onClose={() => setShowCreateEvent(false)}
        onSubmit={handleCreateEvent}
        communityId={selectedCommunity}
      />
    </div>
  );
}