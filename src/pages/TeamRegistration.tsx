import React, { useState } from 'react';
import { Users, MapPin, Trophy, Boxes } from 'lucide-react';

export function TeamRegistration() {
  const [formData, setFormData] = useState({
    communityName: '',
    location: '',
    description: '',
    members: ['', ''],
    achievements: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Community Registration:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <div className="text-center">
          <div className="flex justify-center">
            <Boxes className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Cadastro de Comunidade</h2>
          <p className="mt-2 text-sm text-gray-600">
            Registre sua comunidade para organizar partidas e competições
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-6 rounded-lg shadow">
          <div className="space-y-4">
            <div>
              <label htmlFor="communityName" className="block text-sm font-medium text-gray-700">
                Nome da Comunidade
              </label>
              <div className="mt-1 relative">
                <input
                  id="communityName"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.communityName}
                  onChange={(e) => setFormData({ ...formData, communityName: e.target.value })}
                />
                <Users className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Localização
              </label>
              <div className="mt-1 relative">
                <input
                  id="location"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
                <MapPin className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Descrição da Comunidade
              </label>
              <textarea
                id="description"
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Membros Iniciais
              </label>
              {formData.members.map((member, index) => (
                <div key={index} className="mt-2">
                  <input
                    type="text"
                    placeholder={`Membro ${index + 1}`}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={member}
                    onChange={(e) => {
                      const newMembers = [...formData.members];
                      newMembers[index] = e.target.value;
                      setFormData({ ...formData, members: newMembers });
                    }}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, members: [...formData.members, ''] })}
                className="mt-2 text-sm text-blue-600 hover:text-blue-700"
              >
                + Adicionar Membro
              </button>
            </div>

            <div>
              <label htmlFor="achievements" className="block text-sm font-medium text-gray-700">
                Conquistas da Comunidade
              </label>
              <div className="mt-1 relative">
                <textarea
                  id="achievements"
                  rows={3}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.achievements}
                  onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                  placeholder="Liste as conquistas anteriores da comunidade (opcional)"
                />
                <Trophy className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cadastrar Comunidade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}