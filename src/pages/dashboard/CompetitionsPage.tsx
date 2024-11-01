import React from 'react';
import { Trophy, Calendar, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const competitions = [
  {
    id: 1,
    name: 'Torneio de Verão 2024',
    status: 'in_progress',
    startDate: '15 Mar 2024',
    endDate: '30 Mar 2024',
    participants: 16,
    prize: 'Troféu + Medalhas',
  },
  {
    id: 2,
    name: 'Copa Regional de Dominó',
    status: 'upcoming',
    startDate: '05 Abr 2024',
    endDate: '20 Abr 2024',
    participants: 24,
    prize: 'Troféu + Prêmio em dinheiro',
  }
];

export function CompetitionsPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Competições</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <Trophy className="h-5 w-5 mr-2" />
          Nova Competição
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {competitions.map((competition) => (
          <div key={competition.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{competition.name}</h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  competition.status === 'in_progress'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {competition.status === 'in_progress' ? 'Em andamento' : 'Em breve'}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{competition.startDate} - {competition.endDate}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-5 w-5 mr-2" />
                <span>{competition.participants} participantes</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Trophy className="h-5 w-5 mr-2" />
                <span>{competition.prize}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate(`/dashboard/competitions/${competition.id}`)}
              className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100"
            >
              Gerenciar Competição
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}