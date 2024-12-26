import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  trendDirection: 'up' | 'down';
}

export function StatsCard({ title, value, icon: Icon, trend, trendDirection }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6 text-indigo-600" />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
      <div className="mt-4">
        <span className={`text-sm ${
          trendDirection === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend}
        </span>
        <span className="text-sm text-gray-500"> vs last period</span>
      </div>
    </div>
  );
}
