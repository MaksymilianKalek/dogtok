import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Entrance animations
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
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 2 });
    }
  };

  return (
    <footer className="footer" id="footer" ref={containerRef}>
      <div className="footer-inner">
        <span className="section-tag" style={{ display: 'block', marginBottom: '3rem' }}>{t('menu.contact')}</span>
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
                <a href="mailto:dogtok.szkoleniowyraj@gmail.com" data-hover>dogtok.szkoleniowyraj@gmail.com</a>
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
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <span>&copy; 2026 DOG TOK - {t('footer.tagline')}</span>
            <LanguageSwitcher />
          </div>
          <span className="footer-credit">{t('footer.credit')} <Magnetic strength={0.2}><a href="https://sokolek.com" target="_blank" rel="noreferrer noopener" className="footer-credit-studio" data-hover>Sokołek Studio</a></Magnetic></span>
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
