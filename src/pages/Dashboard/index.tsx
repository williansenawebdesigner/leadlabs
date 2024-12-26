import React from 'react';
import Layout from '../../components/Layout';
import { CampaignStats } from './CampaignStats';
import { DateRangeFilter } from './DateRangeFilter';
import { CampaignFilter } from './CampaignFilter';

export default function Dashboard() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <CampaignFilter />
            <DateRangeFilter />
          </div>
        </div>
        <CampaignStats />
      </div>
    </Layout>
  );
}