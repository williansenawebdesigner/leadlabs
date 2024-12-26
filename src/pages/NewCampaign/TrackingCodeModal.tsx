import React from 'react';
    import { X } from 'lucide-react';

    interface TrackingCodeModalProps {
      campaignId: string;
      onClose: () => void;
    }

    export function TrackingCodeModal({ campaignId, onClose }: TrackingCodeModalProps) {
      const baseUrl = import.meta.env.VITE_BASE_URL; // Use baseUrl here
      const trackingCode = `
<!-- Lead Tracking Code -->
<script src="${baseUrl}/tracking.js"></script>
<script>
  initializeTracking("${campaignId}");
</script>
      `.trim();

      const copyToClipboard = () => {
        navigator.clipboard.writeText(trackingCode);
      };

      // ... rest of the component remains the same
    }
