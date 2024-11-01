import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Timer, Flag, Users, Trophy, AlertCircle } from 'lucide-react';

interface MatchState {
  teams: {
    team1: string[];
    team2: string[];
  };
  startTime?: Date;
  victories: {
    team1: number;
    team2: number;
  };
  currentGame: number;
}

export function MatchInProgress() {
  const location = useLocation();
  const navigate = useNavigate();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [matchState, setMatchState] = useState<MatchState>({
    teams: {
      team1: [],
      team2: []
    },
    startTime: new Date(),
    victories: {
      team1: 0,
      team2: 0
    },
    currentGame: 1
  });

  useEffect(() => {
    if (location.state?.teams) {
      setMatchState({
        ...matchState,
        teams: location.state.teams,
      });
    }
  }, [location]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (matchState.startTime) {
        const elapsed = Math.floor((new Date().getTime() - matchState.startTime.getTime()) / 1000);
        setElapsedTime(elapsed);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [matchState.startTime]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleFinishMatch = () => {
    navigate('/match/result', {
      state: {
        ...matchState,
        duration: elapsedTime
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <Trophy className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Partida em Andamento</h2>
          <p className="mt-2 text-sm text-gray-600">Partida {matchState.currentGame} de 6 (máximo)</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          {/* Timer */}
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-50">
              <Timer className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-xl font-mono font-medium text-blue-600">
                {formatTime(elapsedTime)}
              </span>
            </div>
          </div>

          {/* Placar */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Placar Geral</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900">{matchState.victories.team1}</p>
                <p className="text-sm text-gray-600">Time 1</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900">{matchState.victories.team2}</p>
                <p className="text-sm text-gray-600">Time 2</p>
              </div>
            </div>
          </div>

          {/* Times */}
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

          {/* Regras Rápidas */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-1">Lembretes:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>6 pedras por jogador</li>
                  <li>4 pedras no dorme</li>
                  <li>Vitória após 6 partidas ganhas</li>
                  <li>Pontuação: 1-4 pontos por partida</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleFinishMatch}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Flag className="h-5 w-5 mr-2" />
              Finalizar Partida
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}