import { useEffect, useState } from 'react';
    import { supabase } from '../lib/supabase';

    export interface Campaign {
      id: string;
      name: string;
      capture_url: string;
      thank_you_url: string;
      created_at: string;
      user_id: string;
    }

    export function useCampaigns() {
      const [campaigns, setCampaigns] = useState<Campaign[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        async function fetchCampaigns() {
          try {
            const { data, error } = await supabase
              .from('campaigns')
              .select('*')
              .order('created_at', { ascending: false });

            if (error) throw error;
            setCampaigns(data || []);
          } catch (err: any) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        }

        fetchCampaigns();
      }, []);

      const editCampaign = async (campaign: Campaign) => {
        try {
          const { error } = await supabase
            .from('campaigns')
            .update({ name: campaign.name, capture_url: campaign.capture_url, thank_you_url: campaign.thank_you_url })
            .eq('id', campaign.id);
          if (error) throw error;
          const updatedCampaigns = campaigns.map(c => c.id === campaign.id ? campaign : c);
          setCampaigns(updatedCampaigns);
        } catch (error: any) {
          setError(error.message);
        }
      };

      const deleteCampaign = async (campaignId: string) => {
        try {
          const { error } = await supabase
            .from('campaigns')
            .delete()
            .eq('id', campaignId);
          if (error) throw error;
          const updatedCampaigns = campaigns.filter(c => c.id !== campaignId);
          setCampaigns(updatedCampaigns);
        } catch (error: any) {
          setError(error.message);
        }
      };

      return { campaigns, loading, error, editCampaign, deleteCampaign };
    }
