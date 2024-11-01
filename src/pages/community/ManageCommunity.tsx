import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Users, Trophy, Calendar, Settings, Edit, 
  TrendingUp, Star, Shield, MapPin 
} from 'lucide-react';

export function ManageCommunity() {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  // Mock data - replace with API calls
  const community = {
    id: '1',
    name: 'Liga Master de Dominó',
    description: 'A melhor liga de dominó da região',
    location: 'Centro Comunitário',
    createdAt: '2024-01-01',
    admin: {
      id: '1',
      name: 'Carlos Silva',
      role: 'ADMIN'
    },
    organizers: [
      { id: '2', name: 'João Santos', role: 'ORGANIZER' },
      { id: '3', name: 'Maria Lima', role: 'ORGANIZER' }
    ],
    members: [
      { id: '4', name: 'Pedro Costa', role: 'PLAYER', wins: 15, losses: 5 },
      { id: '5', name: 'Ana Santos', role: 'PLAYER', wins: 12, losses: 8 },
      { id: '6', name: 'Roberto Lima', role: 'PLAYER', wins: 10, losses: 10 }
    ],
    competitions: [
      {
        id: '1',
        name: 'Torneio de Verão 2024',
        startDate: '2024-03-15',
        endDate: '2024-03-30',
        status: 'in_progress',
        participants: 16
      }
    ],
    recentMatches: [
      {
        id: '1',
        date: '2024-03-24',
        team1: ['Pedro Costa', 'Ana Santos'],
        team2: ['Roberto Lima', 'João Santos'],
        result: '6-2',
        winner: 'team1'
      }
    ],
    stats: {
      totalMatches: 45,
      totalPlayers: 12,
      avgMatchesPerWeek: 3,
      topPlayer: 'Pedro Costa'
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{community.name}</h1>
            <p className="mt-1 text-gray-500">{community.description}</p>
            <div className="mt-2 flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              {community.location}
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Edit className="h-4 w-4 mr-2" />
            Editar Comunidade
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <Trophy className="h-8 w-8 text-yellow-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total de Partidas</p>
              <p className="text-2xl font-semibold">{community.stats.totalMatches}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Jogadores</p>
              <p className="text-2xl font-semibold">{community.stats.totalPlayers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-green-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Média Semanal</p>
              <p className="text-2xl font-semibold">{community.stats.avgMatchesPerWeek}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <Star className="h-8 w-8 text-purple-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Melhor Jogador</p>
              <p className="text-2xl font-semibold">{community.stats.topPlayer}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Members and Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Members */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Membros</h2>
            <button className="text-blue-600 hover:text-blue-700">
              + Adicionar Membro
            </button>
          </div>
          <div className="space-y-4">
            {/* Admin */}
            <div className="border-b pb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Shield className="h-4 w-4 text-purple-500 mr-1" />
                Administrador
              </h3>
              <div className="flex items-center">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(community.admin.name)}`}
                  alt={community.admin.name}
                  className="h-8 w-8 rounded-full"
                />
                <span className="ml-2 text-sm text-gray-900">{community.admin.name}</span>
              </div>
            </div>

            {/* Organizers */}
            <div className="border-b pb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                Organizadores
              </h3>
              <div className="space-y-2">
                {community.organizers.map(organizer => (
                  <div key={organizer.id} className="flex items-center">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(organizer.name)}`}
                      alt={organizer.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="ml-2 text-sm text-gray-900">{organizer.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Players */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Users className="h-4 w-4 text-blue-500 mr-1" />
                Jogadores
              </h3>
              <div className="space-y-2">
                {community.members.map(member => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}`}
                        alt={member.name}
                        className="h-8 w-8 rounded-full"
                      />
                      <span className="ml-2 text-sm text-gray-900">{member.name}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {member.wins}V / {member.losses}D
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Rankings and Stats */}
        <div className="space-y-6">
          {/* Recent Competitions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Competições Recentes</h2>
            <div className="space-y-4">
              {community.competitions.map(competition => (
                <div key={competition.id} className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{competition.name}</h3>
                    <p className="text-sm text-gray-500">
                      {competition.startDate} - {competition.endDate}
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    {competition.status === 'in_progress' ? 'Em andamento' : 'Concluído'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Matches */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Partidas Recentes</h2>
            <div className="space-y-4">
              {community.recentMatches.map(match => (
                <div key={match.id} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {match.team1.join(' & ')} vs {match.team2.join(' & ')}
                    </div>
                    <p className="text-sm text-gray-500">{match.date}</p>
                  </div>
                  <span className="text-sm font-medium">{match.result}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Taxa de Vitória Média</span>
                <span className="text-sm font-medium">67%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Maior Sequência de Vitórias</span>
                <span className="text-sm font-medium">8 partidas</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Buchadas</span>
                <span className="text-sm font-medium">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}