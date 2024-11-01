import React from 'react';
import { Calendar, Users } from 'lucide-react';

const recentGames = [
  {
    id: 1,
    date: '24 Mar 2024',
    community: 'Liga Master de Dominó',
    result: 'Vitória',
    score: '150 pts',
    opponents: ['Ana Santos', 'Pedro Lima'],
  },
  {
    id: 2,
    date: '22 Mar 2024',
    community: 'Dominó dos Amigos',
    result: 'Derrota',
    score: '98 pts',
    opponents: ['João Silva', 'Maria Costa'],
  },
  {
    id: 3,
    date: '20 Mar 2024',
    community: 'Liga Master de Dominó',
    result: 'Vitória',
    score: '145 pts',
    opponents: ['Roberto Santos', 'Clara Lima'],
  },
];

export function RecentGames() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Partidas Recentes</h3>
      <div className="space-y-4">
        {recentGames.map((game) => (
          <div key={game.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-500">{game.date}</span>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  game.result === 'Vitória'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {game.result}
              </span>
            </div>
            <p className="font-medium text-gray-900">{game.community}</p>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              <span>vs {game.opponents.join(', ')}</span>
            </div>
            <p className="mt-1 text-sm font-medium text-gray-600">{game.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}