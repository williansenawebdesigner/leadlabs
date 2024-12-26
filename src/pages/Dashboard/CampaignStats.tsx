import React from 'react';
    import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
    import { StatsCard } from './StatsCard';
    import { Users, Eye, UserCheck, Clock } from 'lucide-react';

    export function CampaignStats() {
      // Example data - replace with real data from Supabase
      const data = [
        { name: 'Jan', views: 400, conversions: 240 },
        { name: 'Feb', views: 300, conversions: 139 },
        { name: 'Mar', views: 200, conversions: 980 },
        { name: 'Apr', views: 700, conversions: 390 },
        { name: 'May', views: 600, conversions: 480 },
        { name: 'Jun', views: 800, conversions: 600 },
      ];

      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatsCard
              title="Total Views"
              value="1,234"
              icon={Eye}
              trend="+12.3%"
              trendDirection="up"
            />
            <StatsCard
              title="Conversion Rate"
              value="67%"
              icon={UserCheck}
              trend="+5.4%"
              trendDirection="up"
            />
            <StatsCard
              title="Active Campaigns"
              value="8"
              icon={Users}
              trend="+8.7%"
              trendDirection="up"
            />
             <StatsCard
              title="Average Time"
              value="4.5 min"
              icon={Clock}
              trend="-2%"
              trendDirection="down"
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Responses Over Time</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="#6366f1" name="Views" fill="#6366f1" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );
    }
