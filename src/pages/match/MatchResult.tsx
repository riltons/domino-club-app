import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Trophy, Users, Timer, Save, AlertCircle } from 'lucide-react';

interface MatchResultState {
  teams: {
    team1: string[];
    team2: string[];
  };
  duration: number;
  victories: {
    team1: number;
    team2: number;
  };
  currentGame: number;
}

type VictoryType = 'normal' | 'carroca' | 'la-e-lo' | 'cruzada' | 'bloqueio';

interface VictoryTypeInfo {
  label: string;
  points: number;
  description: string;
}

const victoryTypes: Record<VictoryType, VictoryTypeInfo> = {
  normal: {
    label: 'Batida Simples',
    points: 1,
    description: 'Um lado da última pedra'
  },
  carroca: {
    label: 'Carroça',
    points: 2,
    description: 'Última pedra com números iguais'
  },
  'la-e-lo': {
    label: 'Lá-e-lô',
    points: 3,
    description: 'Números diferentes em ambos os lados'
  },
  cruzada: {
    label: 'Cruzada',
    points: 4,
    description: 'Mesmo número dos dois lados'
  },
  bloqueio: {
    label: 'Bloqueio',
    points: 1,
    description: 'Nenhum jogador pode jogar'
  }
};

export function MatchResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState({
    winningTeam: '',
    victoryType: '' as VictoryType,
    remainingTiles: {
      team1: 0,
      team2: 0
    },
    notes: ''
  });

  const matchState = location.state as MatchResultState;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Atualiza o estado da partida
    const newVictories = {
      team1: matchState.victories.team1 + (result.winningTeam === 'team1' ? 1 : 0),
      team2: matchState.victories.team2 + (result.winningTeam === 'team2' ? 1 : 0)
    };

    // Verifica se algum time atingiu 6 vitórias
    if (newVictories.team1 === 6 || newVictories.team2 === 6) {
      navigate('/match/final-result', {
        state: {
          ...matchState,
          victories: newVictories,
          finalResult: result
        }
      });
    } else {
      // Continua para a próxima partida
      navigate('/match/progress', {
        state: {
          ...matchState,
          victories: newVictories,
          currentGame: matchState.currentGame + 1
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <Trophy className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Resultado da Partida</h2>
          <p className="mt-2 text-sm text-gray-600">Partida {matchState.currentGame}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="mb-6">
            <div className="flex items-center justify-center mb-4">
              <Timer className="h-5 w-5 text-gray-600 mr-2" />
              <span className="text-sm text-gray-600">
                Duração: {formatTime(matchState.duration)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-gray-600 mr-2" />
                  <h3 className="text-sm font-medium text-gray-900">Time 1</h3>
                </div>
                <div className="text-center text-sm text-gray-600">
                  {matchState.teams.team1.join(' & ')}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-gray-600 mr-2" />
                  <h3 className="text-sm font-medium text-gray-900">Time 2</h3>
                </div>
                <div className="text-center text-sm text-gray-600">
                  {matchState.teams.team2.join(' & ')}
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Vencedor
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setResult({ ...result, winningTeam: 'team1' })}
                  className={`p-4 rounded-lg border-2 text-center ${
                    result.winningTeam === 'team1'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  Time 1
                </button>
                <button
                  type="button"
                  onClick={() => setResult({ ...result, winningTeam: 'team2' })}
                  className={`p-4 rounded-lg border-2 text-center ${
                    result.winningTeam === 'team2'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  Time 2
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Vitória
              </label>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(victoryTypes).map(([type, info]) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setResult({ ...result, victoryType: type as VictoryType })}
                    className={`p-4 rounded-lg border-2 text-center ${
                      result.victoryType === type
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{info.label}</div>
                    <div className="text-sm text-gray-500">{info.points} ponto{info.points > 1 ? 's' : ''}</div>
                  </button>
                ))}
              </div>
            </div>

            {result.victoryType === 'bloqueio' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="team1Tiles" className="block text-sm font-medium text-gray-700">
                    Soma das pedras - Time 1
                  </label>
                  <input
                    type="number"
                    id="team1Tiles"
                    min="0"
                    className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={result.remainingTiles.team1}
                    onChange={(e) => setResult({
                      ...result,
                      remainingTiles: {
                        ...result.remainingTiles,
                        team1: parseInt(e.target.value) || 0
                      }
                    })}
                  />
                </div>
                <div>
                  <label htmlFor="team2Tiles" className="block text-sm font-medium text-gray-700">
                    Soma das pedras - Time 2
                  </label>
                  <input
                    type="number"
                    id="team2Tiles"
                    min="0"
                    className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={result.remainingTiles.team2}
                    onChange={(e) => setResult({
                      ...result,
                      remainingTiles: {
                        ...result.remainingTiles,
                        team2: parseInt(e.target.value) || 0
                      }
                    })}
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Observações (opcional)
              </label>
              <textarea
                id="notes"
                rows={3}
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={result.notes}
                onChange={(e) => setResult({ ...result, notes: e.target.value })}
              />
            </div>

            {/* Informações sobre pontuação */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">Sistema de Pontuação:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Batida simples: 1 ponto</li>
                    <li>Carroça: 2 pontos</li>
                    <li>Lá-e-lô: 3 pontos</li>
                    <li>Cruzada: 4 pontos</li>
                    <li>Bloqueio: 1 ponto (menor soma de pedras)</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Save className="h-5 w-5 mr-2" />
              Salvar Resultado
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}