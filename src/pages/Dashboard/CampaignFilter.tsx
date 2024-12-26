import React from 'react';

export function CampaignFilter() {
  return (
    <select className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
      <option value="">All Campaigns</option>
      {/* Campaign options will be populated from Supabase */}
    </select>
  );
}
