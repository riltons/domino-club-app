import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
}

export function StatsCard({ title, value, trend, trendUp }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-3xl font-semibold text-gray-900">{value}</p>
        <div className={`ml-2 flex items-baseline text-sm ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {trendUp ? (
            <TrendingUp className="h-4 w-4 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 mr-1" />
          )}
          <span>{trend}</span>
        </div>
      </div>
    </div>
  );
}