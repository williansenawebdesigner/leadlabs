import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { CampaignList } from '../../components/CampaignList';
import { PlusCircle } from 'lucide-react';

export default function Campaigns() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Campaigns</h1>
          <Link
            to="/campaigns/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            New Campaign
          </Link>
        </div>
        <CampaignList />
      </div>
    </Layout>
  );
}
