import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Trophy, Users, Timer, Home } from 'lucide-react';

interface FinalResultState {
  teams: {
    team1: string[];
    team2: string[];
  };
  victories: {
    team1: number;
    team2: number;
  };
  duration: number;
  finalResult: {
    winningTeam: string;
    victoryType: string;
  };
}

export function FinalResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const matchState = location.state as FinalResultState;

  const winningTeam = matchState.victories.team1 === 6 ? 'team1' : 'team2';
  const isShutout = winningTeam === 'team1' 
    ? matchState.victories.team2 === 0 
    : matchState.victories.team1 === 0;
  const isComeback = (winningTeam === 'team1' && matchState.victories.team2 >= 5) ||
                    (winningTeam === 'team2' && matchState.victories.team1 >= 5);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <Trophy className="mx-auto h-16 w-16 text-yellow-500" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Fim de Jogo!</h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          {/* Placar Final */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-4 text-center">Placar Final</h3>
            <div className="grid grid-cols-2 gap-8">
              <div className={`text-center ${winningTeam === 'team1' ? 'text-blue-700' : 'text-gray-600'}`}>
                <p className="text-3xl font-bold mb-2">{matchState.victories.team1}</p>
                <div className="space-y-1">
                  {matchState.teams.team1.map((player, index) => (
                    <p key={index} className="text-sm">{player}</p>
                  ))}
                </div>
              </div>
              <div className={`text-center ${winningTeam === 'team2' ? 'text-blue-700' : 'text-gray-600'}`}>
                <p className="text-3xl font-bold mb-2">{matchState.victories.team2}</p>
                <div className="space-y-1">
                  {matchState.teams.team2.map((player, index) => (
                    <p key={index} className="text-sm">{player}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Conquistas */}
          {(isShutout || isComeback) && (
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 mb-2">Conquistas Especiais</h4>
              {isShutout && (
                <p className="text-sm text-yellow-700">
                  🏆 Buchada! Vitória sem perder nenhuma partida!
                </p>
              )}
              {isComeback && (
                <p className="text-sm text-yellow-700">
                  🔄 Virada épica! Vitória após estar perdendo por 5 partidas!
                </p>
              )}
            </div>
          )}

          {/* Detalhes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Duração total:</span>
              <span>{formatTime(matchState.duration)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Última vitória:</span>
              <span>{matchState.finalResult.victoryType}</span>
            </div>
          </div>

          {/* Ações */}
          <div className="pt-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Home className="h-5 w-5 mr-2" />
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}