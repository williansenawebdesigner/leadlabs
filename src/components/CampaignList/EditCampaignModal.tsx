import React, { useState } from 'react';
    import { X } from 'lucide-react';
    import { Campaign } from '../../hooks/useCampaigns';
    import { Button } from '../../components/Button';

    interface EditCampaignModalProps {
      campaign: Campaign;
      onClose: () => void;
      onSave: (campaign: Campaign) => Promise<void>;
    }

    export function EditCampaignModal({ campaign, onClose, onSave }: EditCampaignModalProps) {
      const [name, setName] = useState(campaign.name);
      const [captureUrl, setCaptureUrl] = useState(campaign.capture_url);
      const [thankYouUrl, setThankYouUrl] = useState(campaign.thank_you_url);
      const [error, setError] = useState('');

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          await onSave({ ...campaign, name, capture_url: captureUrl, thank_you_url: thankYouUrl });
          onClose();
        } catch (error: any) {
          setError(error.message || 'Failed to save changes');
        }
      };

      return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 h-screen"> {/* Added h-screen and bg-opacity-75 */}
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Edit Campaign</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Campaign Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="captureUrl" className="block text-sm font-medium text-gray-700">
                  Capture Page URL
                </label>
                <input
                  type="url"
                  id="captureUrl"
                  value={captureUrl}
                  onChange={(e) => setCaptureUrl(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="thankYouUrl" className="block text-sm font-medium text-gray-700">
                  Thank You Page URL
                </label>
                <input
                  type="url"
                  id="thankYouUrl"
                  value={thankYouUrl}
                  onChange={(e) => setThankYouUrl(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      );
    }
