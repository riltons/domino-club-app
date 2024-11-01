import React, { useState } from 'react';
import { Users, Timer, MapPin, Trophy, Boxes } from 'lucide-react';

export function StartMatch() {
  const [formData, setFormData] = useState({
    players: ['', '', '', ''],
    location: '',
    matchType: 'friendly',
    points: '150',
    timeLimit: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Start Match:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <div className="text-center">
          <div className="flex justify-center">
            <Boxes className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Iniciar Partida</h2>
          <p className="mt-2 text-sm text-gray-600">
            Configure os detalhes da partida
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-6 rounded-lg shadow">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jogadores
              </label>
              {formData.players.map((player, index) => (
                <div key={index} className="mt-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={`Jogador ${index + 1}`}
                      className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={player}
                      onChange={(e) => {
                        const newPlayers = [...formData.players];
                        newPlayers[index] = e.target.value;
                        setFormData({ ...formData, players: newPlayers });
                      }}
                    />
                    <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Local da Partida
              </label>
              <div className="mt-1 relative">
                <input
                  id="location"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Partida
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg flex items-center justify-center ${
                    formData.matchType === 'friendly'
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                      : 'bg-gray-100 text-gray-700 border border-gray-300'
                  }`}
                  onClick={() => setFormData({ ...formData, matchType: 'friendly' })}
                >
                  <Users className="h-5 w-5 mr-2" />
                  Amistoso
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg flex items-center justify-center ${
                    formData.matchType === 'tournament'
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                      : 'bg-gray-100 text-gray-700 border border-gray-300'
                  }`}
                  onClick={() => setFormData({ ...formData, matchType: 'tournament' })}
                >
                  <Trophy className="h-5 w-5 mr-2" />
                  Torneio
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="points" className="block text-sm font-medium text-gray-700">
                Pontos para Vitória
              </label>
              <select
                id="points"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                value={formData.points}
                onChange={(e) => setFormData({ ...formData, points: e.target.value })}
              >
                <option value="150">150 pontos</option>
                <option value="200">200 pontos</option>
                <option value="250">250 pontos</option>
              </select>
            </div>

            <div>
              <label htmlFor="timeLimit" className="block text-sm font-medium text-gray-700">
                Limite de Tempo (opcional)
              </label>
              <div className="mt-1 relative">
                <input
                  id="timeLimit"
                  type="number"
                  placeholder="Minutos"
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.timeLimit}
                  onChange={(e) => setFormData({ ...formData, timeLimit: e.target.value })}
                />
                <Timer className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Iniciar Partida
          </button>
        </form>
      </div>
    </div>
  );
}