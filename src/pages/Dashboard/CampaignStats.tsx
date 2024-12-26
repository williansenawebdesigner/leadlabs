import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StatsCard } from './StatsCard';
import { Users, Eye, UserCheck } from 'lucide-react';

export function CampaignStats() {
  // Example data - replace with real data from Supabase
  const data = [
    { name: 'Jan 1', views: 400, conversions: 240 },
    { name: 'Jan 2', views: 300, conversions: 139 },
    { name: 'Jan 3', views: 200, conversions: 980 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Views"
          value="1,234"
          icon={Eye}
          trend="+12.3%"
          trendDirection="up"
        />
        <StatsCard
          title="Unique Visitors"
          value="856"
          icon={Users}
          trend="+5.4%"
          trendDirection="up"
        />
        <StatsCard
          title="Conversions"
          value="432"
          icon={UserCheck}
          trend="+8.7%"
          trendDirection="up"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Conversion Overview</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="#6366f1" name="Views" />
              <Bar dataKey="conversions" fill="#34d399" name="Conversions" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}