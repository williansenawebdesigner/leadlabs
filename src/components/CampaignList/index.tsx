import React, { useState } from 'react';
    import { CampaignItem } from './CampaignItem';
    import { useCampaigns } from '../../hooks/useCampaigns';
    import { TrackingCodeModal } from '../../pages/NewCampaign/TrackingCodeModal';
    import { EditCampaignModal } from './EditCampaignModal';

    export function CampaignList() {
      const { campaigns, loading, error, editCampaign, deleteCampaign } = useCampaigns();
      const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
      const [editModalOpen, setEditModalOpen] = useState(false);
      const [campaignToEdit, setCampaignToEdit] = useState<Campaign | null>(null);

      if (loading) {
        return (
          <div className="bg-white shadow overflow-hidden sm:rounded-md p-4">
            <p className="text-gray-500">Loading campaigns...</p>
          </div>
        );
      }

      if (error) {
        return (
          <div className="bg-white shadow overflow-hidden sm:rounded-md p-4">
            <p className="text-red-500">Error: {error}</p>
          </div>
        );
      }

      if (campaigns.length === 0) {
        return (
          <div className="bg-white shadow overflow-hidden sm:rounded-md p-4">
            <p className="text-gray-500">No campaigns found. Create your first campaign!</p>
          </div>
        );
      }

      return (
        <>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <CampaignItem
                  key={campaign.id}
                  campaign={campaign}
                  onShowCode={(id) => setSelectedCampaignId(id)}
                  onEditCampaign={(campaign) => {
                    setCampaignToEdit(campaign);
                    setEditModalOpen(true);
                  }}
                  onDeleteCampaign={deleteCampaign}
                />
              ))}
            </ul>
          </div>

          {selectedCampaignId && (
            <TrackingCodeModal
              campaignId={selectedCampaignId}
              onClose={() => setSelectedCampaignId(null)}
            />
          )}
          {editModalOpen && campaignToEdit && (
            <EditCampaignModal
              campaign={campaignToEdit}
              onClose={() => setEditModalOpen(false)}
              onSave={editCampaign}
            />
          )}
        </>
      );
    }
