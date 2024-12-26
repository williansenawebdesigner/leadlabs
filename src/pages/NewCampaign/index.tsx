import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { TrackingCodeModal } from './TrackingCodeModal';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export default function NewCampaign() {
  const [name, setName] = useState('');
  const [captureUrl, setCaptureUrl] = useState('');
  const [thankYouUrl, setThankYouUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [campaignId, setCampaignId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { session } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!session?.user?.id) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('campaigns')
        .insert([
          {
            name,
            capture_url: captureUrl,
            thank_you_url: thankYouUrl,
            user_id: session.user.id
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setCampaignId(data.id);
      setShowModal(true);
    } catch (error: any) {
      console.error('Error creating campaign:', error);
      setError(error.message || 'Failed to create campaign');
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Create New Campaign</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow rounded-lg p-6">
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Campaign Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="captureUrl" className="block text-sm font-medium text-gray-700">
              Capture Page URL
            </label>
            <input
              type="url"
              id="captureUrl"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={captureUrl}
              onChange={(e) => setCaptureUrl(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="thankYouUrl" className="block text-sm font-medium text-gray-700">
              Thank You Page URL
            </label>
            <input
              type="url"
              id="thankYouUrl"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={thankYouUrl}
              onChange={(e) => setThankYouUrl(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Campaign
            </button>
          </div>
        </form>

        {showModal && (
          <TrackingCodeModal
            campaignId={campaignId}
            onClose={() => {
              setShowModal(false);
              navigate('/campaigns');
            }}
          />
        )}
      </div>
    </Layout>
  );
}