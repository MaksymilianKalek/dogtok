import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import Magnetic from './Magnetic';

export default function Footer() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const entranceEls = gsap.utils.toArray(['.footer-middle']) as HTMLElement[];
    entranceEls.forEach((el) => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom-=20',
        once: true,
        onEnter: () => {
          el.classList.add('in-view');
        }
      });
    });
  }, { scope: containerRef });

  const handleBackToTop = () => {
    const win = window as unknown as { lenis?: { scrollTo(target: number, options: unknown): void } };
    if (win.lenis) {
      win.lenis.scrollTo(0, { duration: 1.5, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer" id="footer" ref={containerRef}>
      <div className="footer-inner">
        <span className="section-tag footer-section-tag">{t('menu.contact')}</span>
        <div className="footer-middle">
          <div className="footer-map">
            <iframe 
              src="https://maps.google.com/maps?q=DOG+TOK+-+szkoleniowy+raj&t=k&z=16&ie=UTF8&iwloc=&output=embed"
              style={{ border: 0 }} 
              allowFullScreen 
              loading="eager" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="footer-contact">
            <div className="footer-contact-block">
              <span className="footer-label">Mail</span>
              <Magnetic strength={0.1}>
                <a href="mailto:dogtok.szkoleniowyraj@gmail.com" className="footer-email-link" data-hover>dogtok.szkoleniowyraj@gmail.com</a>
              </Magnetic>
            </div>
            <div className="footer-contact-block">
              <span className="footer-label">{t('footer.social')}</span>
              <div className="footer-socials">
                <Magnetic strength={0.2}><a href="https://www.instagram.com/dogtok_szkoleniowyraj/" target="_blank" rel="noreferrer noopener" data-hover>Instagram</a></Magnetic>
                <Magnetic strength={0.2}><a href="https://www.facebook.com/dogtok.szkoleniowyraj" target="_blank" rel="noreferrer noopener" data-hover>Facebook</a></Magnetic>
                <Magnetic strength={0.2}><a href="https://www.youtube.com/channel/UCbY6z6rA2Y0OLC5UipCalyw" target="_blank" rel="noreferrer noopener" data-hover>YouTube</a></Magnetic>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span>&copy; {new Date().getFullYear()} DOG TOK - {t('footer.tagline')}</span>
            <LanguageSwitcher />
          </div>
          <span className="footer-credit">
            {t('footer.credit')}{' '}
            <Magnetic strength={0.2}>
              <a href="https://sokolek.com" target="_blank" rel="noreferrer noopener" data-hover aria-label="Sokołek Studio">
                <img src="/sokolek_full_logo_white.svg" alt="Sokołek Studio" className="footer-credit-logo" />
              </a>
            </Magnetic>
          </span>
          <Magnetic strength={0.3}>
            <button 
              className="back-to-top" 
              id="backToTop" 
              data-hover 
              aria-label="Wróć na górę"
              onClick={handleBackToTop}
            >
              <span>&#8593;</span>
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
