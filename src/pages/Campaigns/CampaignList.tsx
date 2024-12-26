import React from 'react';
import { Eye, UserCheck, Code } from 'lucide-react';

export function CampaignList() {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {/* Example campaign - replace with data from Supabase */}
        <li>
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  Black Friday Campaign
                </h3>
                <p className="mt-1 text-sm text-gray-500">Created on March 1, 2024</p>
              </div>
              <div className="flex space-x-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Eye className="h-5 w-5 mr-1" />
                  1,234
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <UserCheck className="h-5 w-5 mr-1" />
                  567
                </div>
                <button
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {/* Show tracking code modal */}}
                >
                  <Code className="h-4 w-4 mr-2" />
                  Get Code
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
