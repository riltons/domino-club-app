import React, { useState } from 'react';
import { Calendar, Users, Trophy, Filter, Search, ArrowRight } from 'lucide-react';
import { MatchDetails } from './MatchDetails';

interface Player {
  id: string;
  name: string;
}

interface Game {
  id: number;
  team1: Player[];
  team2: Player[];
  matches: Match[];
  winner?: 'team1' | 'team2';
  specialVictory?: 'buchuda' | 'buchuda_de_re';
  team1Points: number;
  team2Points: number;
}

interface Match {
  id: number;
  team1Score: number;
  team2Score: number;
  victoryType?: 'simple' | 'carroca' | 'la_e_lo' | 'cruzada' | 'blocked';
  status: 'completed' | 'in_progress';
  winner?: 'team1' | 'team2';
  extraPoint: boolean;
}

// Mock data
const competitions = [
  {
    id: '1',
    name: 'Torneio de Verão 2024',
    startDate: '15 Mar 2024',
    endDate: '30 Mar 2024',
    games: [
      {
        id: 1,
        team1: [
          { id: '1', name: 'João Silva' },
          { id: '2', name: 'Maria Santos' }
        ],
        team2: [
          { id: '3', name: 'Pedro Lima' },
          { id: '4', name: 'Ana Costa' }
        ],
        matches: [
          {
            id: 1,
            team1Score: 3,
            team2Score: 0,
            victoryType: 'la_e_lo',
            status: 'completed',
            winner: 'team1',
            extraPoint: false
          },
          {
            id: 2,
            team1Score: 2,
            team2Score: 0,
            victoryType: 'carroca',
            status: 'completed',
            winner: 'team1',
            extraPoint: false
          }
        ],
        team1Points: 5,
        team2Points: 0
      }
    ]
  }
];

export function MatchResultsList() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMatch, setSelectedMatch] = useState<any>(null);

  const handleSelectMatch = (match: any) => {
    const formattedMatch = {
      id: match.id.toString(),
      date: new Date().toLocaleDateString(),
      teams: {
        team1: {
          players: match.team1.map((p: Player) => p.name),
          victories: match.team1Points,
          points: match.matches
            .filter((m: Match) => m.winner === 'team1')
            .map((m: Match) => m.team1Score)
        },
        team2: {
          players: match.team2.map((p: Player) => p.name),
          victories: match.team2Points,
          points: match.matches
            .filter((m: Match) => m.winner === 'team2')
            .map((m: Match) => m.team2Score)
        }
      },
      community: 'Liga Master de Dominó',
      duration: '1h 30min',
      winner: match.winner || 'team1',
      victoryType: match.specialVictory ? match.specialVictory.toUpperCase() : 'VITÓRIA SIMPLES'
    };
    setSelectedMatch(formattedMatch);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Resultados das Competições</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Buscar por jogador ou competição..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Todas as competições</option>
              <option value="active">Em andamento</option>
              <option value="completed">Concluídas</option>
            </select>
          </div>
        </div>

        {competitions.map(competition => (
          <div key={competition.id} className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{competition.name}</h2>
                <p className="text-sm text-gray-500">
                  {competition.startDate} - {competition.endDate}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {competition.games.map(game => (
                <div key={game.id} className="border rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {game.team1.map(p => p.name).join(' & ')} vs {game.team2.map(p => p.name).join(' & ')}
                        </p>
                      </div>
                    </div>
                    <div className="text-lg font-semibold">
                      {game.team1Points} - {game.team2Points}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {game.matches.map((match, index) => (
                      <div key={match.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="text-sm font-medium text-gray-900">
                            Partida {index + 1}
                          </span>
                          {match.status === 'completed' && match.victoryType && (
                            <div className="mt-1 text-sm text-gray-600">
                              {match.victoryType === 'simple' && 'Batida Simples'}
                              {match.victoryType === 'carroca' && 'Batida de Carroça'}
                              {match.victoryType === 'la_e_lo' && 'Batida de Lá-e-lô'}
                              {match.victoryType === 'cruzada' && 'Batida de Cruzada'}
                              {match.victoryType === 'blocked' && 'Jogo Fechado'}
                              {match.extraPoint && ' (+1 ponto)'}
                            </div>
                          )}
                        </div>
                        <div className="text-sm font-medium">
                          {match.team1Score} - {match.team2Score}
                        </div>
                      </div>
                    ))}
                  </div>

                  {game.specialVictory && (
                    <div className="mt-4 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg inline-block text-sm font-medium">
                      {game.specialVictory === 'buchuda' ? 'Buchuda!' : 'Buchuda de Ré!'}
                    </div>
                  )}

                  <button
                    onClick={() => handleSelectMatch(game)}
                    className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Ver detalhes
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedMatch && (
        <MatchDetails
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </div>
  );
}