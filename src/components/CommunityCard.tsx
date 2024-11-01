import React from 'react';
import { Users, Trophy, Calendar, MapPin, Lock } from 'lucide-react';
import type { Community } from '../types/community';

interface CommunityCardProps {
  community: Community;
  onManage: (communityId: string) => void;
}

export function CommunityCard({ community, onManage }: CommunityCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800">{community.name}</h3>
        {community.private && (
          <Lock className="h-5 w-5 text-gray-400" />
        )}
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <Users className="h-5 w-5 mr-2" />
          <span>{community.memberCount} membros</span>
        </div>
        {community.lastGame && (
          <>
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-2" />
              <span>Último jogo: {new Date(community.lastGame.date).toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Trophy className="h-5 w-5 mr-2" />
              <span>Último vencedor: {community.lastGame.winner.name}</span>
            </div>
          </>
        )}
        {community.location && (
          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{community.location}</span>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-2">
        <button 
          onClick={() => onManage(community.id)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Gerenciar Comunidade
        </button>
        {community.private && (
          <p className="text-xs text-center text-gray-500">
            Esta é uma comunidade privada. Contate um organizador para participar.
          </p>
        )}
      </div>
    </div>
  );
}