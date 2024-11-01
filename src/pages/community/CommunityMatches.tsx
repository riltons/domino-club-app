import React, { useState } from 'react';
import { Trophy, Users, Shuffle, Plus } from 'lucide-react';
import { CreateMatchModal } from '../../components/match/CreateMatchModal';
import { MatchList } from '../../components/match/MatchList';
import type { User } from '../../types/user';

interface CommunityMatchesProps {
  communityId: string;
  members: User[];
}

export function CommunityMatches({ communityId, members }: CommunityMatchesProps) {
  const [showCreateMatch, setShowCreateMatch] = useState(false);

  const handleCreateMatch = (data: any) => {
    console.log('Nova partida:', data);
    setShowCreateMatch(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Partidas</h2>
        <button
          onClick={() => setShowCreateMatch(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nova Partida
        </button>
      </div>

      <MatchList communityId={communityId} />

      <CreateMatchModal
        isOpen={showCreateMatch}
        onClose={() => setShowCreateMatch(false)}
        onSubmit={handleCreateMatch}
        members={members}
      />
    </div>
  );
}