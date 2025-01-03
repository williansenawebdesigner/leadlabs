import React from 'react';
    import { Eye, UserCheck, Code, Pencil, Trash } from 'lucide-react';
    import { Campaign } from '../../hooks/useCampaigns';
    import { format } from 'date-fns';

    interface CampaignItemProps {
      campaign: Campaign;
      onShowCode: (campaignId: string) => void;
      onEditCampaign: (campaign: Campaign) => void;
      onDeleteCampaign: (campaignId: string) => void;
    }

    export function CampaignItem({ campaign, onShowCode, onEditCampaign, onDeleteCampaign }: CampaignItemProps) {
      return (
        <li className="border-b border-gray-200 last:border-b-0">
          <div className="px-4 py-4 sm:px-6 flex justify-between items-center">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-gray-900 truncate">
                {campaign.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Created on {format(new Date(campaign.created_at), 'MMMM d, yyyy')}
              </p>
            </div>
            <div className="flex space-x-2">
              <div className="flex items-center text-sm text-gray-500">
                <Eye className="h-5 w-5 mr-1" />
                0
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <UserCheck className="h-5 w-5 mr-1" />
                0
              </div>
              <button
                onClick={() => onShowCode(campaign.id)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Code className="h-4 w-4 mr-2" />
                Get Code
              </button>
              <button onClick={() => onEditCampaign(campaign)} className="text-indigo-600 hover:text-indigo-900">
                <Pencil className="h-5 w-5" />
              </button>
              <button onClick={() => onDeleteCampaign(campaign.id)} className="text-red-600 hover:text-red-900">
                <Trash className="h-5 w-5" />
              </button>
            </div>
          </div>
        </li>
      );
    }
