import React, { useState } from 'react';
import { X, Trophy, AlertCircle } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  avatar?: string;
}

interface Game {
  id: number;
  team1: Player[];
  team2: Player[];
  status: 'pending' | 'in_progress' | 'completed';
  score?: {
    team1: number;
    team2: number;
  };
}

interface RegisterScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  game: Game | null;
}

type VictoryType = 'simple' | 'carroca' | 'la_e_lo' | 'cruzada' | 'blocked' | 'draw';

const victoryTypes = {
  simple: { label: 'Batida Simples', points: 1 },
  carroca: { label: 'Batida de Carroça', points: 2 },
  la_e_lo: { label: 'Batida de Lá-e-lô', points: 3 },
  cruzada: { label: 'Batida de Cruzada', points: 4 },
  blocked: { label: 'Jogo Fechado', points: 1 },
  draw: { label: 'Empate', points: 0 }
};

export function RegisterScoreModal({ isOpen, onClose, onSubmit, game }: RegisterScoreModalProps) {
  const [formData, setFormData] = useState({
    winningTeam: '',
    victoryType: '' as VictoryType,
    remainingTiles: {
      team1: 0,
      team2: 0
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen || !game) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Trophy className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Registrar Resultado</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Time Vencedor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Vencedor
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, winningTeam: 'team1' })}
                  className={`p-4 rounded-lg border-2 text-center ${
                    formData.winningTeam === 'team1'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {game.team1.map(p => p.name).join(' & ')}
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, winningTeam: 'team2' })}
                  className={`p-4 rounded-lg border-2 text-center ${
                    formData.winningTeam === 'team2'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {game.team2.map(p => p.name).join(' & ')}
                </button>
              </div>
            </div>

            {/* Tipo de Vitória */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Vitória
              </label>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(victoryTypes).map(([type, info]) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, victoryType: type as VictoryType })}
                    className={`p-4 rounded-lg border-2 text-center ${
                      formData.victoryType === type
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{info.label}</div>
                    <div className="text-sm text-gray-500">{info.points} ponto{info.points !== 1 ? 's' : ''}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Soma das pedras (apenas para jogo fechado) */}
            {formData.victoryType === 'blocked' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Soma das pedras - Time 1
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={formData.remainingTiles.team1}
                    onChange={(e) => setFormData({
                      ...formData,
                      remainingTiles: {
                        ...formData.remainingTiles,
                        team1: parseInt(e.target.value) || 0
                      }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Soma das pedras - Time 2
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={formData.remainingTiles.team2}
                    onChange={(e) => setFormData({
                      ...formData,
                      remainingTiles: {
                        ...formData.remainingTiles,
                        team2: parseInt(e.target.value) || 0
                      }
                    })}
                  />
                </div>
              </div>
            )}

            {/* Informações sobre pontuação */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">Sistema de Pontuação:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Batida simples: 1 ponto</li>
                    <li>Batida de carroça: 2 pontos</li>
                    <li>Batida de lá-e-lô: 3 pontos</li>
                    <li>Batida de cruzada: 4 pontos</li>
                    <li>Jogo fechado: 1 ponto (menor soma)</li>
                    <li>Empate: +1 ponto na próxima</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Registrar Resultado
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}