import React from 'react';
import { X, Trophy, Users, Clock } from 'lucide-react';

interface MatchDetailsProps {
  match: {
    id: string;
    date: string;
    teams: {
      team1: {
        players: string[];
        victories: number;
        points: number[];
      };
      team2: {
        players: string[];
        victories: number;
        points: number[];
      };
    };
    community: string;
    duration: string;
    winner: 'team1' | 'team2';
    victoryType: 'VITÓRIA SIMPLES' | 'BUCHUDA' | 'BUCHUDA DE RÉ';
  } | null;
  onClose: () => void;
}

const getVictoryTypeLabel = (points: number) => {
  switch (points) {
    case 1: return 'BATIDA SIMPLES';
    case 2: return 'CARROÇA';
    case 3: return 'LÁ-E-LÔ';
    case 4: return 'CRUZADA';
    default: return 'BATIDA SIMPLES';
  }
};

export function MatchDetails({ match, onClose }: MatchDetailsProps) {
  if (!match) return null;

  const totalGames = match.teams.team1.points.length + match.teams.team2.points.length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{match.community}</h2>
              <p className="text-sm text-gray-500 mt-1">{match.date}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">Duração total: {match.duration}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className={`p-4 rounded-lg ${
                match.winner === 'team1' ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50'
              }`}>
                <div className="flex items-center mb-2">
                  <Users className="h-5 w-5 text-gray-600 mr-2" />
                  <h3 className="font-medium">Time 1</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">{match.teams.team1.players.join(' & ')}</p>
                <p className="text-lg font-semibold">{match.teams.team1.victories} vitórias</p>
              </div>

              <div className={`p-4 rounded-lg ${
                match.winner === 'team2' ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50'
              }`}>
                <div className="flex items-center mb-2">
                  <Users className="h-5 w-5 text-gray-600 mr-2" />
                  <h3 className="font-medium">Time 2</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">{match.teams.team2.players.join(' & ')}</p>
                <p className="text-lg font-semibold">{match.teams.team2.victories} vitórias</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Detalhes das Partidas</h3>
              <div className="space-y-3">
                {Array.from({ length: totalGames }).map((_, index) => {
                  const team1Points = match.teams.team1.points[index];
                  const team2Points = match.teams.team2.points[index];
                  const winner = team1Points ? 'team1' : 'team2';
                  const points = team1Points || team2Points;

                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center">
                        <Trophy className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="font-medium">Partida {index + 1}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-sm ${
                          winner === 'team1' ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          Time 1
                        </span>
                        <span className="text-gray-400">vs</span>
                        <span className={`text-sm ${
                          winner === 'team2' ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          Time 2
                        </span>
                        <span className="text-sm font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                          {getVictoryTypeLabel(points)} ({points} pts)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              match.victoryType === 'BUCHUDA' || match.victoryType === 'BUCHUDA DE RÉ'
                ? 'bg-purple-100 text-purple-700'
                : 'bg-blue-100 text-blue-700'
            }`}>
              {match.victoryType}
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}