import { useCallback, useState } from 'react';

const COOKIE_CONSENT_STORAGE_KEY = 'dogtok-cookie-consent';

type CookieNoticeState = 'dismissed' | 'pending';

function readStoredNoticeState(): CookieNoticeState {
  try {
    const storedNoticeState = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);

    if (
      storedNoticeState === 'dismissed' ||
      storedNoticeState === 'accepted' ||
      storedNoticeState === 'rejected'
    ) {
      return 'dismissed';
    }
  } catch (error) {
    console.error('Failed to read cookie notice preference.', error);
  }

  return 'pending';
}

function storeNoticeDismissal() {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, 'dismissed');
  } catch (error) {
    console.error('Failed to store cookie notice preference.', error);
  }
}

function clearStoredNoticeDismissal() {
  try {
    window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear cookie notice preference.', error);
  }
}

export function useCookieConsent() {
  const [noticeState, setNoticeState] = useState<CookieNoticeState>(() => readStoredNoticeState());

  const dismissNotice = useCallback(() => {
    storeNoticeDismissal();
    setNoticeState('dismissed');
  }, []);

  const resetNotice = useCallback(() => {
    clearStoredNoticeDismissal();
    setNoticeState('pending');
  }, []);

  return {
    dismissNotice,
    noticeState,
    resetNotice,
  };
}
