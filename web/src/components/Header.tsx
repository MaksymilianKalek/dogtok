import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  isLoaded: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export default function Header({ isLoaded, isMenuOpen, toggleMenu }: HeaderProps) {
  const { t } = useTranslation();
  const headerRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    // Initial state
    gsap.set(headerRef.current, { opacity: 0, y: -30 });
    
    if (isLoaded) {
      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.8,
        ease: 'expo.out'
      });
    }
  }, [isLoaded]);

  useGSAP(() => {
    if (!btnRef.current) return;
    
    const onMouseMove = (e: MouseEvent) => {
      const rect = btnRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btnRef.current, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
    };

    const onMouseLeave = () => {
      gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    };

    btnRef.current.addEventListener('mousemove', onMouseMove);
    btnRef.current.addEventListener('mouseleave', onMouseLeave);

    return () => {
      btnRef.current?.removeEventListener('mousemove', onMouseMove);
      btnRef.current?.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <header className="header" id="header" ref={headerRef}>
      <a href="#" className="header-logo" data-hover>DOG TOK</a>
      <button 
        className="menu-toggle" 
        id="menuToggle" 
        data-hover 
        aria-expanded={isMenuOpen} 
        onClick={toggleMenu}
        ref={btnRef}
      >
        <span className="menu-toggle-text">{t('menu.menu')}</span>
        <div className="menu-toggle-icon">
          <span></span>
          <span></span>
        </div>
      </button>
    </header>
  );
}
