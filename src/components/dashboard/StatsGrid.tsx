import React from 'react';
import { Trophy, Users, Target, TrendingUp } from 'lucide-react';

const stats = [
  {
    icon: Trophy,
    label: 'Vitórias',
    value: '127',
    trend: '+12%',
    trendUp: true,
  },
  {
    icon: Users,
    label: 'Comunidades',
    value: '4',
    trend: '+1 novo',
    trendUp: true,
  },
  {
    icon: Target,
    label: 'Taxa de Vitória',
    value: '68%',
    trend: '+5%',
    trendUp: true,
  },
  {
    icon: TrendingUp,
    label: 'Sequência Atual',
    value: '5',
    trend: 'Melhor: 8',
    trendUp: true,
  },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map(({ icon: Icon, label, value, trend, trendUp }) => (
        <div key={label} className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Icon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="mt-4 text-xl md:text-2xl font-semibold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{label}</p>
          <div className={`mt-2 text-sm ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
            {trend}
          </div>
        </div>
      ))}
    </div>
  );
}