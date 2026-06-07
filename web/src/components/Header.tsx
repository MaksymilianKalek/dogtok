import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import Magnetic from './Magnetic';

interface HeaderProps {
  isLoaded: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export default function Header({ isLoaded, isMenuOpen, toggleMenu }: HeaderProps) {
  const { t } = useTranslation();
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    gsap.set(headerRef.current, { opacity: 0, y: -30 });
    gsap.set(logoRef.current, { opacity: 0, y: -20 });
    
    if (isLoaded) {
      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.8,
        ease: 'expo.out'
      });

      ScrollTrigger.create({
        trigger: '.about',
        start: 'top 80%',
        onEnter: () => gsap.to(logoRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }),
        onLeaveBack: () => gsap.to(logoRef.current, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.out' })
      });
    }
  }, [isLoaded]);

  return (
    <header className="header" id="header" ref={headerRef}>
      <a href="#" className="header-logo" data-hover ref={logoRef}>DOG TOK</a>
      <Magnetic strength={0.2}>
        <button 
          className="menu-toggle" 
          id="menuToggle" 
          data-hover 
          aria-expanded={isMenuOpen} 
          onClick={toggleMenu}
        >
          <span className="menu-toggle-text">{t('menu.menu')}</span>
          <div className="menu-toggle-icon">
            <span></span>
            <span></span>
          </div>
        </button>
      </Magnetic>
    </header>
  );
}
