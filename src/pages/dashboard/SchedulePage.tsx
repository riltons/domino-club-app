import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const scheduleItems = [
  {
    id: 1,
    type: 'match',
    title: 'Partida Amistosa',
    date: '26 Mar 2024',
    time: '19:00',
    location: 'Centro Comunitário',
    participants: ['João Silva', 'Maria Santos', 'Pedro Lima', 'Ana Costa'],
  },
  {
    id: 2,
    type: 'tournament',
    title: 'Início do Torneio de Verão',
    date: '28 Mar 2024',
    time: '14:00',
    location: 'Clube Social',
    participants: ['16 jogadores confirmados'],
  }
];

export function SchedulePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Agenda</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <Calendar className="h-5 w-5 mr-2" />
          Agendar Evento
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm divide-y">
        {scheduleItems.map((item) => (
          <div key={item.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{item.date}</span>
                  <Clock className="h-4 w-4 ml-3 mr-1" />
                  <span>{item.time}</span>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.type === 'match'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {item.type === 'match' ? 'Partida' : 'Torneio'}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-5 w-5 mr-2" />
                <div className="flex flex-wrap gap-2">
                  {item.participants.map((participant, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {participant}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}