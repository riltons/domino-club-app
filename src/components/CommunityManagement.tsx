import React from 'react';
import { Users, UserPlus, Settings, Shield } from 'lucide-react';
import { Community, Member } from '../types/community';

interface CommunityManagementProps {
  community: Community;
}

export function CommunityManagement({ community }: CommunityManagementProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestão da Comunidade</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
          <Settings className="h-5 w-5 mr-2" />
          Configurações
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Administrador */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center mb-4">
            <Shield className="h-5 w-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold">Administrador</h3>
          </div>
          <div className="flex items-center space-x-3">
            <img
              src={community.admin.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(community.admin.name)}
              alt={community.admin.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium">{community.admin.name}</p>
              <p className="text-sm text-gray-500">Criador da comunidade</p>
            </div>
          </div>
        </div>

        {/* Organizadores */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Organizadores</h3>
            </div>
            <button className="text-blue-600 hover:text-blue-700 flex items-center">
              <UserPlus className="h-5 w-5 mr-1" />
              Adicionar
            </button>
          </div>
          <div className="space-y-3">
            {community.organizers.map((organizer) => (
              <div key={organizer.id} className="flex items-center space-x-3">
                <img
                  src={organizer.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(organizer.name)}
                  alt={organizer.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{organizer.name}</p>
                  <p className="text-sm text-gray-500">Organizador</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ações de Gestão */}
        <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border rounded-lg hover:bg-gray-50">
            <UserPlus className="h-5 w-5 mr-2" />
            Adicionar Jogador
          </button>
          <button className="flex items-center justify-center p-4 border rounded-lg hover:bg-gray-50">
            <Users className="h-5 w-5 mr-2" />
            Gerenciar Membros
          </button>
          <button className="flex items-center justify-center p-4 border rounded-lg hover:bg-gray-50">
            <Settings className="h-5 w-5 mr-2" />
            Regras do Grupo
          </button>
        </div>
      </div>
    </div>
  );
}