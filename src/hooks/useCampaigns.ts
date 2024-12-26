import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface Campaign {
  id: string;
  name: string;
  capture_url: string;
  thank_you_url: string;
  created_at: string;
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

  return { campaigns, loading, error };
}
