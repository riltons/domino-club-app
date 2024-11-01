import React, { useState } from 'react';
import { User, Phone, Users } from 'lucide-react';

export function NewPlayerPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    community: '',
    indicatedBy: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Novo jogador:', formData);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Cadastrar Novo Jogador</h1>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome completo
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                required
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Telefone
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                id="phone"
                required
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="community" className="block text-sm font-medium text-gray-700">
              Comunidade
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Users className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="community"
                required
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                value={formData.community}
                onChange={(e) => setFormData({ ...formData, community: e.target.value })}
              >
                <option value="">Selecione uma comunidade</option>
                <option value="1">Liga Master de Dominó</option>
                <option value="2">Dominó dos Amigos</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="indicatedBy" className="block text-sm font-medium text-gray-700">
              Indicado por (opcional)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="indicatedBy"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                value={formData.indicatedBy}
                onChange={(e) => setFormData({ ...formData, indicatedBy: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Cadastrar Jogador
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}