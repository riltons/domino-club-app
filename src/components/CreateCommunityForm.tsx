import React, { useState } from 'react';
import { Calendar, MapPin, Shield, Book } from 'lucide-react';
import type { Community } from '../types/community';

interface CreateCommunityFormProps {
  onSubmit: (community: Partial<Community>) => void;
  onCancel: () => void;
}

export function CreateCommunityForm({ onSubmit, onCancel }: CreateCommunityFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    meetingDays: [] as string[],
    rules: ['Respeitar todos os participantes', 'Cumprir os horários estabelecidos'],
    private: false
  });

  const daysOfWeek = [
    'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleDayToggle = (day: string) => {
    setFormData(prev => ({
      ...prev,
      meetingDays: prev.meetingDays.includes(day)
        ? prev.meetingDays.filter(d => d !== day)
        : [...prev.meetingDays, day]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nome da Comunidade
          </label>
          <input
            type="text"
            id="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descrição
          </label>
          <textarea
            id="description"
            rows={3}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Local dos Jogos
            </div>
          </label>
          <input
            type="text"
            id="location"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Dias de Jogo
            </div>
          </label>
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map(day => (
              <button
                key={day}
                type="button"
                onClick={() => handleDayToggle(day)}
                className={`px-3 py-1 rounded-full text-sm ${
                  formData.meetingDays.includes(day)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={formData.private}
              onChange={(e) => setFormData(prev => ({ ...prev, private: e.target.checked }))}
            />
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium text-gray-700">Comunidade Privada</span>
            </div>
          </label>
          <p className="mt-1 text-sm text-gray-500 ml-6">
            Apenas membros convidados podem participar
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              Regras da Comunidade
            </div>
          </label>
          <div className="space-y-2">
            {formData.rules.map((rule, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={rule}
                  onChange={(e) => {
                    const newRules = [...formData.rules];
                    newRules[index] = e.target.value;
                    setFormData(prev => ({ ...prev, rules: newRules }));
                  }}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      rules: prev.rules.filter((_, i) => i !== index)
                    }));
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  Remover
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  rules: [...prev.rules, '']
                }));
              }}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              + Adicionar Regra
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Criar Comunidade
        </button>
      </div>
    </form>
  );
}