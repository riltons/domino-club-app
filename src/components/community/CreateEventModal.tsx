import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Users, Trophy } from 'lucide-react';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  communityId: number | null;
}

export function CreateEventModal({ isOpen, onClose, onSubmit, communityId }: CreateEventModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    type: 'match', // match ou tournament
    maxParticipants: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, communityId });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Calendar className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Criar Novo Evento</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Título do Evento
              </label>
              <input
                type="text"
                id="title"
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Data
                </label>
                <div className="mt-1 relative">
                  <input
                    type="date"
                    id="date"
                    required
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                  Horário
                </label>
                <div className="mt-1 relative">
                  <input
                    type="time"
                    id="time"
                    required
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Local
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  id="location"
                  required
                  className="block w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Evento
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'match' })}
                  className={`px-4 py-2 rounded-lg flex items-center justify-center ${
                    formData.type === 'match'
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                      : 'bg-gray-100 text-gray-700 border border-gray-300'
                  }`}
                >
                  <Users className="h-5 w-5 mr-2" />
                  Partida
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'tournament' })}
                  className={`px-4 py-2 rounded-lg flex items-center justify-center ${
                    formData.type === 'tournament'
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                      : 'bg-gray-100 text-gray-700 border border-gray-300'
                  }`}
                >
                  <Trophy className="h-5 w-5 mr-2" />
                  Torneio
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700">
                Número Máximo de Participantes
              </label>
              <div className="mt-1 relative">
                <input
                  type="number"
                  id="maxParticipants"
                  min="4"
                  step="2"
                  required
                  className="block w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.maxParticipants}
                  onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                />
                <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <p className="mt-1 text-sm text-gray-500">Deve ser um número par (mínimo 4)</p>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Descrição (opcional)
              </label>
              <textarea
                id="description"
                rows={3}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
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
                Criar Evento
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}