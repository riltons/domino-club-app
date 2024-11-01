import React, { useState, useEffect } from 'react';
import { useGameLogic } from '../../hooks/useGameLogic';
import type { VictoryType } from '../../types/game';
import { Timer, Trophy, AlertCircle, Flag, Shield } from 'lucide-react';

interface GameBoardProps {
  communityId: string;
  team1Players: string[];
  team2Players: string[];
  location: string;
  onGameEnd: () => void;
}

export function GameBoard({
  communityId,
  team1Players,
  team2Players,
  location,
  onGameEnd
}: GameBoardProps) {
  const { match, startNewMatch, finishMatch, registerDraw, applyPenalty } = useGameLogic();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [remainingTiles, setRemainingTiles] = useState({ team1: 0, team2: 0 });

  useEffect(() => {
    // Inicia o jogo quando o componente montar
    startNewMatch(communityId, team1Players, team2Players, location);
  }, [communityId, team1Players, team2Players, location, startNewMatch]);

  useEffect(() => {
    // Timer para controlar o tempo de jogo
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleFinishMatch = (
    winningTeam: 'team1' | 'team2',
    victoryType: VictoryType,
    tiles?: { team1: number; team2: number }
  ) => {
    finishMatch(winningTeam, victoryType, tiles);
    
    if (match?.team1.victories === 6 || match?.team2.victories === 6) {
      onGameEnd();
    }
  };

  const handleBlockFinish = () => {
    if (remainingTiles.team1 === 0 || remainingTiles.team2 === 0) return;
    
    handleFinishMatch(
      remainingTiles.team1 < remainingTiles.team2 ? 'team1' : 'team2',
      'BLOQUEIO',
      remainingTiles
    );
    setShowBlockModal(false);
  };

  if (!match) return null;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Timer */}
      <div className="text-center">
        <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-lg">
          <Timer className="h-5 w-5 text-blue-600 mr-2" />
          <span className="text-xl font-mono font-medium text-blue-600">
            {formatTime(elapsedTime)}
          </span>
        </div>
      </div>

      {/* Placar */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-2">Time 1</h3>
          <p className="text-3xl font-bold text-gray-900">{match.team1.victories}</p>
          <p className="text-sm text-gray-500">vitórias</p>
          <p className="mt-2 text-sm font-medium text-blue-600">
            {match.team1.points} pontos
          </p>
          {match.team1.currentStreak > 1 && (
            <p className="mt-1 text-sm text-green-600">
              Sequência: {match.team1.currentStreak}
            </p>
          )}
        </div>

        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-2">Time 2</h3>
          <p className="text-3xl font-bold text-gray-900">{match.team2.victories}</p>
          <p className="text-sm text-gray-500">vitórias</p>
          <p className="mt-2 text-sm font-medium text-blue-600">
            {match.team2.points} pontos
          </p>
          {match.team2.currentStreak > 1 && (
            <p className="mt-1 text-sm text-green-600">
              Sequência: {match.team2.currentStreak}
            </p>
          )}
        </div>
      </div>

      {/* Ações */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <button
            onClick={() => handleFinishMatch('team1', 'NORMAL')}
            className="w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
          >
            Time 1 Venceu (Normal)
          </button>
          <button
            onClick={() => handleFinishMatch('team1', 'CARROCA')}
            className="w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
          >
            Time 1 Venceu (Carroça)
          </button>
          <button
            onClick={() => handleFinishMatch('team1', 'LA_E_LO')}
            className="w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
          >
            Time 1 Venceu (Lá-e-lô)
          </button>
          <button
            onClick={() => handleFinishMatch('team1', 'CRUZADA')}
            className="w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
          >
            Time 1 Venceu (Cruzada)
          </button>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => handleFinishMatch('team2', 'NORMAL')}
            className="w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
          >
            Time 2 Venceu (Normal)
          </button>
          <button
            onClick={() => handleFinishMatch('team2', 'CARROCA')}
            className="w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
          >
            Time 2 Venceu (Carroça)
          </button>
          <button
            onClick={() => handleFinishMatch('team2', 'LA_E_LO')}
            className="w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
          >
            Time 2 Venceu (Lá-e-lô)
          </button>
          <button
            onClick={() => handleFinishMatch('team2', 'CRUZADA')}
            className="w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
          >
            Time 2 Venceu (Cruzada)
          </button>
        </div>
      </div>

      {/* Ações Especiais */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => registerDraw()}
          className="py-2 px-4 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100"
        >
          Registrar Empate
        </button>
        <button
          onClick={() => setShowBlockModal(true)}
          className="py-2 px-4 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100"
        >
          Finalizar por Bloqueio
        </button>
      </div>

      {/* Penalidades */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700 flex items-center">
          <Shield className="h-4 w-4 mr-1" />
          Penalidades
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => applyPenalty('team1', 'Mostrou pedra errada')}
            className="py-2 px-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
          >
            Time 1: Mostrou Pedra
          </button>
          <button
            onClick={() => applyPenalty('team2', 'Mostrou pedra errada')}
            className="py-2 px-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
          >
            Time 2: Mostrou Pedra
          </button>
        </div>
      </div>

      {/* Modal de Bloqueio */}
      {showBlockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Soma das Pedras</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Time 1
                </label>
                <input
                  type="number"
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300"
                  value={remainingTiles.team1}
                  onChange={(e) => setRemainingTiles(prev => ({
                    ...prev,
                    team1: parseInt(e.target.value) || 0
                  }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Time 2
                </label>
                <input
                  type="number"
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300"
                  value={remainingTiles.team2}
                  onChange={(e) => setRemainingTiles(prev => ({
                    ...prev,
                    team2: parseInt(e.target.value) || 0
                  }))}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowBlockModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-700"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleBlockFinish}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regras Rápidas */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Pontuação:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Batida simples: 1 ponto</li>
              <li>Carroça: 2 pontos</li>
              <li>Lá-e-lô: 3 pontos</li>
              <li>Cruzada: 4 pontos</li>
              <li>Bloqueio: 1 ponto + bônus</li>
              <li>Empate anterior: +1 ponto</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Penalidades Ativas */}
      {(match.penalties.team1.length > 0 || match.penalties.team2.length > 0) && (
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-red-700 mb-2">Penalidades Aplicadas:</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h5 className="text-sm font-medium text-red-600">Time 1</h5>
              <ul className="text-sm text-red-600">
                {match.penalties.team1.map((penalty, index) => (
                  <li key={index}>{penalty}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-medium text-red-600">Time 2</h5>
              <ul className="text-sm text-red-600">
                {match.penalties.team2.map((penalty, index) => (
                  <li key={index}>{penalty}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}