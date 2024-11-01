import React from 'react';
import { X } from 'lucide-react';
import { CreateCommunityForm } from './CreateCommunityForm';
import type { Community } from '../types/community';

interface CreateCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (community: Partial<Community>) => void;
}

export function CreateCommunityModal({ isOpen, onClose, onSubmit }: CreateCommunityModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Criar Nova Comunidade</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <CreateCommunityForm
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}