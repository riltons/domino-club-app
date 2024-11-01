import React, { useState } from 'react';
import { User, UserPlus, Phone, Mail } from 'lucide-react';

export function PlayerManagement() {
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    phone: '',
    indicatedBy: ''
  });

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Novo jogador:', newPlayer);
    setNewPlayer({ name: '', phone: '', indicatedBy: '' });
    setShowAddPlayer(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Gerenciar Jogadores</h3>
        <button
          onClick={() => setShowAddPlayer(true)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Adicionar Jogador
        </button>
      </div>

      {showAddPlayer ? (
        <form onSubmit={handleAddPlayer} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome do Jogador
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
                value={newPlayer.name}
                onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
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
                value={newPlayer.phone}
                onChange={(e) => setNewPlayer({ ...newPlayer, phone: e.target.value })}
              />
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
                value={newPlayer.indicatedBy}
                onChange={(e) => setNewPlayer({ ...newPlayer, indicatedBy: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowAddPlayer(false)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Adicionar
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <User className="h-10 w-10 text-gray-400" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">João Silva</p>
              <p className="text-sm text-gray-500">(11) 98765-4321</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <User className="h-10 w-10 text-gray-400" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">Maria Santos</p>
              <p className="text-sm text-gray-500">(11) 91234-5678</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}