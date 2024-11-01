import React, { useState } from 'react';
import { X, Users, Shuffle } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  avatar?: string;
}

interface CreateGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  availablePlayers: Player[];
}

export function CreateGameModal({ isOpen, onClose, onSubmit, availablePlayers }: CreateGameModalProps) {
  const [teams, setTeams] = useState({
    team1: ['', ''],
    team2: ['', '']
  });

  const handleRandomize = () => {
    const shuffled = [...availablePlayers]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    
    setTeams({
      team1: [shuffled[0].id, shuffled[1].id],
      team2: [shuffled[2].id, shuffled[3].id]
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(teams);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Criar Novo Jogo</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <button
              type="button"
              onClick={handleRandomize}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <Shuffle className="h-5 w-5 mr-2" />
              Sortear Duplas
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Time 1 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time 1
                </label>
                <div className="space-y-3">
                  {teams.team1.map((playerId, index) => (
                    <div key={`team1-${index}`} className="relative">
                      <select
                        value={playerId}
                        onChange={(e) => {
                          const newTeam1 = [...teams.team1];
                          newTeam1[index] = e.target.value;
                          setTeams({ ...teams, team1: newTeam1 });
                        }}
                        className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Selecionar jogador</option>
                        {availablePlayers
                          .filter(p => !teams.team1.includes(p.id) && !teams.team2.includes(p.id))
                          .map(player => (
                            <option key={player.id} value={player.id}>
                              {player.name}
                            </option>
                          ))}
                      </select>
                      <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Time 2 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time 2
                </label>
                <div className="space-y-3">
                  {teams.team2.map((playerId, index) => (
                    <div key={`team2-${index}`} className="relative">
                      <select
                        value={playerId}
                        onChange={(e) => {
                          const newTeam2 = [...teams.team2];
                          newTeam2[index] = e.target.value;
                          setTeams({ ...teams, team2: newTeam2 });
                        }}
                        className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Selecionar jogador</option>
                        {availablePlayers
                          .filter(p => !teams.team1.includes(p.id) && !teams.team2.includes(p.id))
                          .map(player => (
                            <option key={player.id} value={player.id}>
                              {player.name}
                            </option>
                          ))}
                      </select>
                      <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  ))}
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
                Criar Jogo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}