import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';

interface CookieConsentBannerProps {
  onDismiss: () => void;
}

export default function CookieConsentBanner({ onDismiss }: CookieConsentBannerProps) {
  const { t } = useTranslation();
  const bannerRef = useRef<HTMLElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  useGSAP(() => {
    gsap.fromTo(
      bannerRef.current,
      { autoAlpha: 0, y: 34 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        delay: 0.15,
        ease: 'expo.out',
      },
    );
  }, []);

  const closeWith = (onComplete: () => void) => {
    if (isClosing) return;
    setIsClosing(true);

    gsap.to(bannerRef.current, {
      autoAlpha: 0,
      y: 24,
      duration: 0.35,
      ease: 'power2.inOut',
      onComplete,
    });
  };

  return (
    <section
      ref={bannerRef}
      className="cookie-consent"
      aria-label={t('cookieConsent.label')}
      data-lenis-prevent
    >
      <div className="cookie-consent-panel">
        <div className="cookie-consent-kicker">
          <img className="cookie-consent-mark" src="/dog-head.svg" alt="" aria-hidden="true" />
          <span>{t('cookieConsent.label')}</span>
        </div>
        <h2 className="cookie-consent-heading">{t('cookieConsent.heading')}</h2>
        <p className="cookie-consent-copy">{t('cookieConsent.description')}</p>
        <div className="cookie-consent-actions">
          <button
            type="button"
            className="cookie-consent-button cookie-consent-button-primary"
            onClick={() => closeWith(onDismiss)}
            data-hover
          >
            {t('cookieConsent.dismiss')}
          </button>
        </div>
      </div>
    </section>
  );
}
