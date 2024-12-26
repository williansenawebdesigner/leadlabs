function initializeTracking(campaignId) {
  const visitorId = localStorage.getItem('visitorId') || 
    Math.random().toString(36).substring(2) + Date.now().toString(36);
  
  localStorage.setItem('visitorId', visitorId);

  const currentUrl = window.location.href;
  const urlParams = new URLSearchParams(window.location.search);
  const isThankYouPage = currentUrl.includes('/obrigado') || currentUrl.includes('/thank-you');
  const isConversion = isThankYouPage && urlParams.get('lead') === 'true';

  const pageType = isThankYouPage ? 'thank_you' : 'capture';

  fetch('YOUR_API_URL/track', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      campaignId,
      visitorId,
      pageType,
      isConversion,
    }),
  }).catch(console.error);
}
