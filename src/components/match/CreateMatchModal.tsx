import React, { useState } from 'react';
import { X, Users, MapPin, Trophy, Timer } from 'lucide-react';
import type { User } from '../../types/user';

interface CreateMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  members: User[];
}

export function CreateMatchModal({ isOpen, onClose, onSubmit, members }: CreateMatchModalProps) {
  const [formData, setFormData] = useState({
    team1: ['', ''],
    team2: ['', ''],
    location: '',
    matchType: 'friendly',
    timeLimit: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Trophy className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Nova Partida</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              O jogo será vencido pela dupla que ganhar 6 partidas primeiro. As partidas não precisam ser consecutivas.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Times */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Time 1 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time 1
                </label>
                <div className="space-y-3">
                  {formData.team1.map((player, index) => (
                    <div key={`team1-${index}`} className="relative">
                      <select
                        value={player}
                        onChange={(e) => {
                          const newTeam1 = [...formData.team1];
                          newTeam1[index] = e.target.value;
                          setFormData({ ...formData, team1: newTeam1 });
                        }}
                        className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Selecionar jogador</option>
                        {members
                          .filter(m => !formData.team1.includes(m.id) && !formData.team2.includes(m.id))
                          .map(member => (
                            <option key={member.id} value={member.id}>
                              {member.name}
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
                  {formData.team2.map((player, index) => (
                    <div key={`team2-${index}`} className="relative">
                      <select
                        value={player}
                        onChange={(e) => {
                          const newTeam2 = [...formData.team2];
                          newTeam2[index] = e.target.value;
                          setFormData({ ...formData, team2: newTeam2 });
                        }}
                        className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Selecionar jogador</option>
                        {members
                          .filter(m => !formData.team1.includes(m.id) && !formData.team2.includes(m.id))
                          .map(member => (
                            <option key={member.id} value={member.id}>
                              {member.name}
                            </option>
                          ))}
                      </select>
                      <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Local */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Local da Partida
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  id="location"
                  required
                  className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Tipo de Partida */}
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

            {/* Tempo Limite (Opcional) */}
            <div>
              <label htmlFor="timeLimit" className="block text-sm font-medium text-gray-700">
                Limite de Tempo por Partida (opcional)
              </label>
              <div className="mt-1 relative">
                <input
                  type="number"
                  id="timeLimit"
                  placeholder="Minutos"
                  className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={formData.timeLimit}
                  onChange={(e) => setFormData({ ...formData, timeLimit: e.target.value })}
                />
                <Timer className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
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
                Iniciar Partida
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}