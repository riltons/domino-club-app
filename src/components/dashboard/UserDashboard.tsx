import React, { useState } from 'react';
import { WelcomeCard } from './WelcomeCard';
import { StatsGrid } from './StatsGrid';
import { CommunityList } from './CommunityList';
import { PlayerManagement } from './PlayerManagement';
import { CreateCommunityModal } from '../CreateCommunityModal';
import { CreateOrganizerModal } from './CreateOrganizerModal';

export function UserDashboard() {
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [showOrganizerModal, setShowOrganizerModal] = useState(false);

  const handleCreateCommunity = (data: any) => {
    console.log('Criar comunidade:', data);
    setShowCommunityModal(false);
  };

  const handleCreateOrganizer = (data: any) => {
    console.log('Criar organizador:', data);
    setShowOrganizerModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <WelcomeCard 
        onCreateCommunity={() => setShowCommunityModal(true)}
        onCreateOrganizer={() => setShowOrganizerModal(true)}
      />
      <StatsGrid />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CommunityList />
        <PlayerManagement />
      </div>

      <CreateCommunityModal 
        isOpen={showCommunityModal}
        onClose={() => setShowCommunityModal(false)}
        onSubmit={handleCreateCommunity}
      />

      <CreateOrganizerModal
        isOpen={showOrganizerModal}
        onClose={() => setShowOrganizerModal(false)}
        onSubmit={handleCreateOrganizer}
      />
    </div>
  );
}