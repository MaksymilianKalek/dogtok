import { useCallback, useEffect, useState } from 'react';
import { denyGoogleAnalyticsConsent, startGoogleAnalytics } from '../lib/analytics';

const COOKIE_CONSENT_STORAGE_KEY = 'dogtok-cookie-consent';

type CookieConsent = 'accepted' | 'pending' | 'rejected';

function readStoredConsent(): CookieConsent {
  try {
    const storedConsent = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);

    if (storedConsent === 'accepted' || storedConsent === 'rejected') {
      return storedConsent;
    }
  } catch (error) {
    console.error('Failed to read cookie consent preference.', error);
  }

  return 'pending';
}

function storeConsent(consent: Exclude<CookieConsent, 'pending'>) {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, consent);
  } catch (error) {
    console.error('Failed to store cookie consent preference.', error);
  }
}

function clearStoredConsent() {
  try {
    window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear cookie consent preference.', error);
  }
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent>(() => readStoredConsent());

  useEffect(() => {
    if (consent === 'accepted') {
      startGoogleAnalytics();
      return;
    }

    if (consent === 'rejected') {
      denyGoogleAnalyticsConsent();
    }
  }, [consent]);

  const acceptConsent = useCallback(() => {
    storeConsent('accepted');
    setConsent('accepted');
  }, []);

  const rejectConsent = useCallback(() => {
    storeConsent('rejected');
    setConsent('rejected');
  }, []);

  const resetConsent = useCallback(() => {
    clearStoredConsent();
    denyGoogleAnalyticsConsent();
    setConsent('pending');
  }, []);

  return {
    acceptConsent,
    consent,
    rejectConsent,
    resetConsent,
  };
}
