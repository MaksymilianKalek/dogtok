import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    // Entrance animations
    const entranceEls = gsap.utils.toArray(['.footer-top', '.footer-middle']) as HTMLElement[];
    entranceEls.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          el.classList.add('in-view');
        }
      });
    });

    // Magnetic button
    const btn = backToTopRef.current;
    if (!btn) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
    };

    const onMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    };

    btn.addEventListener('mousemove', onMouseMove);
    btn.addEventListener('mouseleave', onMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', onMouseMove);
      btn.removeEventListener('mouseleave', onMouseLeave);
    };
  }, { scope: containerRef });

  const handleBackToTop = () => {
    // @ts-expect-error global lenis
    if (window.lenis) {
      // @ts-expect-error global lenis
      window.lenis.scrollTo(0, { duration: 2 });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    // @ts-expect-error global lenis
    if (window.lenis) {
      // @ts-expect-error global lenis
      window.lenis.scrollTo(target, { offset: 0, duration: 1.5 });
    }
  };

  return (
    <footer className="footer" id="footer" ref={containerRef}>
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-title">DOG TOK</div>
            <div className="footer-tagline">{t('footer.tagline')}</div>
          </div>
          <div className="footer-nav">
            <a href="#about" data-hover onClick={(e) => handleNavClick(e, '#about')}>{t('menu.about')}</a>
            <a href="#events" data-hover onClick={(e) => handleNavClick(e, '#events')}>{t('menu.events')}</a>
            <a href="#schedule" data-hover onClick={(e) => handleNavClick(e, '#schedule')}>{t('menu.schedule')}</a>
            <a href="#gallery" data-hover onClick={(e) => handleNavClick(e, '#gallery')}>{t('menu.gallery')}</a>
          </div>
        </div>
        <div className="footer-middle">
          <div className="footer-map">
            <iframe 
              src="https://maps.google.com/maps?q=DOG+TOK+-+szkoleniowy+raj&t=k&z=16&ie=UTF8&iwloc=&output=embed"
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="footer-contact">
            <div className="footer-contact-block">
              <span className="footer-label">{t('footer.contact')}</span>
              <a href="mailto:dogtok.szkoleniowyraj@gmail.com" data-hover>dogtok.szkoleniowyraj@gmail.com</a>
            </div>
            <div className="footer-contact-block">
              <span className="footer-label">{t('footer.social')}</span>
              <div className="footer-socials">
                <a href="https://www.instagram.com/dogtok_szkoleniowyraj/" target="_blank" rel="noreferrer noopener" data-hover>Instagram</a>
                <a href="https://www.facebook.com/dogtok.szkoleniowyraj" target="_blank" rel="noreferrer noopener" data-hover>Facebook</a>
                <a href="https://www.youtube.com/channel/UCbY6z6rA2Y0OLC5UipCalyw" target="_blank" rel="noreferrer noopener" data-hover>YouTube</a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <span>&copy; 2026 DOG TOK - {t('footer.tagline')}</span>
            <LanguageSwitcher />
          </div>
          <span className="footer-credit">{t('footer.credit')} <a href="https://sokolek.studio" target="_blank" rel="noreferrer noopener" className="footer-credit-studio" data-hover>Sokołek Studio</a></span>
          <button 
            className="back-to-top" 
            id="backToTop" 
            data-hover 
            aria-label="Wróć na górę"
            ref={backToTopRef}
            onClick={handleBackToTop}
          >
            <span>&#8593;</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
