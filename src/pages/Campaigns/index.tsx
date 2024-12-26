import React from 'react';
    import { Link } from 'react-router-dom';
    import Layout from '../../components/Layout';
    import { CampaignList } from '../../components/CampaignList';
    import { PlusCircle } from 'lucide-react';
    import { Button } from '../../components/Button';

    export default function Campaigns() {
      return (
        <Layout>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Campaigns</h1>
              <Link to="/campaigns/new">
                <Button>
                  <PlusCircle className="h-5 w-5 mr-2" />
                  New Campaign
                </Button>
              </Link>
            </div>
            <CampaignList />
          </div>
        </Layout>
      );
    }
