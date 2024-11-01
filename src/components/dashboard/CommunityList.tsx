import React from 'react';
import { Users, MapPin, Calendar } from 'lucide-react';

export function CommunityList() {
  const communities = [
    {
      id: 1,
      name: 'Liga Master de Dominó',
      members: 24,
      location: 'Centro Comunitário',
      nextGame: '26 Mar 2024',
    },
    {
      id: 2,
      name: 'Dominó dos Amigos',
      members: 16,
      location: 'Clube Social',
      nextGame: '28 Mar 2024',
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Minhas Comunidades</h3>
      <div className="space-y-4">
        {communities.map((community) => (
          <div key={community.id} className="border rounded-lg p-4 hover:border-blue-500 transition-colors">
            <h4 className="font-medium text-gray-900">{community.name}</h4>
            <div className="mt-2 space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <Users className="h-4 w-4 mr-2" />
                {community.members} membros
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-2" />
                {community.location}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                Próximo jogo: {community.nextGame}
              </div>
            </div>
            <div className="mt-4">
              <button className="w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors">
                Gerenciar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}