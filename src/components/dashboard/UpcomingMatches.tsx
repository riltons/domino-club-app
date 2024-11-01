import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

const upcomingMatches = [
  {
    id: 1,
    date: '26 Mar 2024',
    time: '19:00',
    community: 'Liga Master de Dominó',
    location: 'Centro Comunitário',
    players: ['Ana Santos', 'Pedro Lima'],
  },
  {
    id: 2,
    date: '28 Mar 2024',
    time: '20:00',
    community: 'Dominó dos Amigos',
    location: 'Clube Social',
    players: ['João Silva', 'Maria Costa'],
  },
  {
    id: 3,
    date: '30 Mar 2024',
    time: '18:30',
    community: 'Liga Master de Dominó',
    location: 'Centro Comunitário',
    players: ['Roberto Santos', 'Clara Lima'],
  },
];

export function UpcomingMatches() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximas Partidas</h3>
      <div className="space-y-4">
        {upcomingMatches.map((match) => (
          <div key={match.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-500">{match.date}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {match.time}
              </div>
            </div>
            <p className="font-medium text-gray-900">{match.community}</p>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{match.location}</span>
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-500">Jogadores: </span>
              <span className="text-sm font-medium text-gray-700">
                {match.players.join(', ')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}