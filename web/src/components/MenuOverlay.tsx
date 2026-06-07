import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

interface MenuOverlayProps {
  isOpen: boolean;
  closeMenu: () => void;
}

export default function MenuOverlay({ isOpen, closeMenu }: MenuOverlayProps) {
  const { t } = useTranslation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo('.nav-link',
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, stagger: 0.06, duration: 0.8, ease: 'expo.out', delay: 0.3 }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeMenu]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    closeMenu();
    setTimeout(() => {
      // @ts-expect-error global lenis
      if (window.lenis) {
        // @ts-expect-error global lenis
        window.lenis.scrollTo(target, { offset: 0, duration: 1.5 });
      }
    }, 500);
  };

  return (
    <div 
      className={`nav-overlay ${isOpen ? 'active' : ''}`} 
      id="navOverlay" 
      aria-hidden={!isOpen}
      ref={overlayRef}
    >
      <div className="nav-overlay-inner">
        <div className="nav-overlay-links" ref={linksRef}>
          <div className="nav-link-wrap">
            <a href="#about" className="nav-link" data-hover onClick={(e) => handleNavClick(e, '#about')}>{t('menu.about')}</a>
          </div>
          <div className="nav-link-wrap">
            <a href="#events" className="nav-link" data-hover onClick={(e) => handleNavClick(e, '#events')}>{t('menu.events')}</a>
          </div>
          <div className="nav-link-wrap">
            <a href="#schedule" className="nav-link" data-hover onClick={(e) => handleNavClick(e, '#schedule')}>{t('menu.schedule')}</a>
          </div>
          <div className="nav-link-wrap">
            <a href="#gallery" className="nav-link" data-hover onClick={(e) => handleNavClick(e, '#gallery')}>{t('menu.gallery')}</a>
          </div>
          <div className="nav-link-wrap">
            <a href="#footer" className="nav-link" data-hover onClick={(e) => handleNavClick(e, '#footer')}>{t('menu.contact')}</a>
          </div>
        </div>
        <div className="nav-overlay-bottom">
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <LanguageSwitcher />
            <a href="mailto:dogtok.szkoleniowyraj@gmail.com" className="nav-email" data-hover>dogtok.szkoleniowyraj@gmail.com</a>
          </div>
          <div className="nav-socials">
            <a href="https://www.instagram.com/dogtok_szkoleniowyraj/" target="_blank" rel="noreferrer noopener" data-hover>Instagram</a>
            <a href="https://www.facebook.com/dogtok.szkoleniowyraj" target="_blank" rel="noreferrer noopener" data-hover>Facebook</a>
            <a href="https://www.youtube.com/channel/UCbY6z6rA2Y0OLC5UipCalyw" target="_blank" rel="noreferrer noopener" data-hover>YouTube</a>
          </div>
        </div>
      </div>
    </div>
  );
}
