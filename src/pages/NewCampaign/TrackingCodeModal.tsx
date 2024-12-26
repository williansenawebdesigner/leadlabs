import React from 'react';
import { X } from 'lucide-react';

interface TrackingCodeModalProps {
  campaignId: string;
  onClose: () => void;
}

export function TrackingCodeModal({ campaignId, onClose }: TrackingCodeModalProps) {
  const trackingCode = `
<!-- Lead Tracking Code -->
<script src="/tracking.js"></script>
<script>
  initializeTracking("${campaignId}");
</script>
  `.trim();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingCode);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">Tracking Code</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-4">
          <p className="mb-4 text-sm text-gray-600">
            Add this code to your pages between the <code>&lt;head&gt;</code> tags:
          </p>
          
          <div className="bg-gray-50 rounded-md p-4">
            <pre className="text-sm overflow-x-auto">
              {trackingCode}
            </pre>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Copy to Clipboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}