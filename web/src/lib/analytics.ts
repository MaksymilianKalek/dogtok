const GOOGLE_ANALYTICS_ID = 'G-3FXXYKETMV';
const GOOGLE_ANALYTICS_SCRIPT_ID = 'google-analytics-script';

type ConsentValue = 'denied' | 'granted';

type ConsentSettings = {
  ad_storage: ConsentValue;
  ad_user_data: ConsentValue;
  ad_personalization: ConsentValue;
  analytics_storage: ConsentValue;
};

type GtagCommand =
  | ['consent', 'default' | 'update', ConsentSettings]
  | ['js', Date]
  | ['config', string];

declare global {
  interface Window {
    dataLayer?: GtagCommand[];
    gtag?: (...command: GtagCommand) => void;
  }
}

function initializeDataLayer() {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...command: GtagCommand) => {
    window.dataLayer?.push(command);
  };
}

export function denyGoogleAnalyticsConsent() {
  initializeDataLayer();

  window.gtag?.('consent', 'update', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  });
}

export function startGoogleAnalytics() {
  initializeDataLayer();

  window.gtag?.('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  });

  window.gtag?.('consent', 'update', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted',
  });

  if (document.getElementById(GOOGLE_ANALYTICS_SCRIPT_ID)) {
    return;
  }

  const script = document.createElement('script');
  script.id = GOOGLE_ANALYTICS_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
  script.onerror = () => {
    console.error('Failed to load Google Analytics script.');
  };

  document.head.appendChild(script);
  window.gtag?.('js', new Date());
  window.gtag?.('config', GOOGLE_ANALYTICS_ID);
}
