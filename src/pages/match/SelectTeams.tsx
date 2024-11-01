import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ArrowRight, Shuffle } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  avatar?: string;
}

export function SelectTeams() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState({
    team1: ['', ''],
    team2: ['', '']
  });

  // Simulated players data - replace with API call
  const availablePlayers: Player[] = [
    { id: '1', name: 'João Silva' },
    { id: '2', name: 'Maria Santos' },
    { id: '3', name: 'Pedro Lima' },
    { id: '4', name: 'Ana Costa' },
    { id: '5', name: 'Carlos Oliveira' },
    { id: '6', name: 'Lucia Ferreira' }
  ];

  const handleRandomize = () => {
    const shuffled = [...availablePlayers].sort(() => Math.random() - 0.5);
    setTeams({
      team1: [shuffled[0].id, shuffled[1].id],
      team2: [shuffled[2].id, shuffled[3].id]
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/match/start', { 
      state: { teams }
    });
  };

  const getPlayerName = (id: string) => {
    return availablePlayers.find(p => p.id === id)?.name || '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <Users className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Formar Duplas</h2>
          <p className="mt-2 text-sm text-gray-600">
            Selecione os jogadores para cada dupla ou use o sorteio automático
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <button
            onClick={handleRandomize}
            className="w-full mb-6 flex items-center justify-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
          >
            <Shuffle className="h-5 w-5 mr-2" />
            Sortear Duplas
          </button>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Time 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time 1
              </label>
              <div className="space-y-3">
                {[0, 1].map((index) => (
                  <select
                    key={`team1-${index}`}
                    value={teams.team1[index]}
                    onChange={(e) => {
                      const newTeams = { ...teams };
                      newTeams.team1[index] = e.target.value;
                      setTeams(newTeams);
                    }}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                    required
                  >
                    <option value="">Selecione um jogador</option>
                    {availablePlayers
                      .filter(p => !teams.team1.includes(p.id) && !teams.team2.includes(p.id))
                      .map(player => (
                        <option key={player.id} value={player.id}>
                          {player.name}
                        </option>
                      ))}
                  </select>
                ))}
              </div>
            </div>

            {/* Time 2 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time 2
              </label>
              <div className="space-y-3">
                {[0, 1].map((index) => (
                  <select
                    key={`team2-${index}`}
                    value={teams.team2[index]}
                    onChange={(e) => {
                      const newTeams = { ...teams };
                      newTeams.team2[index] = e.target.value;
                      setTeams(newTeams);
                    }}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                    required
                  >
                    <option value="">Selecione um jogador</option>
                    {availablePlayers
                      .filter(p => !teams.team1.includes(p.id) && !teams.team2.includes(p.id))
                      .map(player => (
                        <option key={player.id} value={player.id}>
                          {player.name}
                        </option>
                      ))}
                  </select>
                ))}
              </div>
            </div>

            {/* Preview das duplas */}
            {(teams.team1.some(id => id) || teams.team2.some(id => id)) && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-medium text-blue-900 mb-2">Duplas Formadas</h3>
                <div className="space-y-2">
                  <p className="text-sm text-blue-800">
                    Time 1: {teams.team1.map(id => getPlayerName(id)).filter(Boolean).join(' & ')}
                  </p>
                  <p className="text-sm text-blue-800">
                    Time 2: {teams.team2.map(id => getPlayerName(id)).filter(Boolean).join(' & ')}
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Iniciar Partida
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}