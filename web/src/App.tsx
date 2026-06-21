import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './i18n';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Header from './components/Header';
import MenuOverlay from './components/MenuOverlay';
import Hero from './components/Hero';
import About from './components/About';
import Venue from './components/Venue';
import Events from './components/Events';
import Schedule from './components/Schedule';
import Founder from './components/Founder';
import Footer from './components/Footer';
import CookieConsentBanner from './components/CookieConsentBanner';
import { useCookieConsent } from './hooks/useCookieConsent';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { dismissNotice, noticeState } = useCookieConsent();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    (window as unknown as { lenis: unknown }).lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, []);

  useEffect(() => {
    const win = window as unknown as { lenis?: { start(): void; stop(): void } };
    if (win.lenis) {
      if (isMenuOpen) {
        win.lenis.stop();
      } else {
        win.lenis.start();
      }
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }
  }, [isLoaded]);

  useEffect(() => {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }, []);

  return (
    <>
      <Cursor />
      <Loader onComplete={() => setIsLoaded(true)} />
      <Header 
        isLoaded={isLoaded} 
        isMenuOpen={isMenuOpen} 
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)} 
      />
      <MenuOverlay 
        isOpen={isMenuOpen} 
        closeMenu={() => setIsMenuOpen(false)} 
      />
      
      <main className="main" id="main">
        <Hero isLoaded={isLoaded} />
        <About isLoaded={isLoaded} />
        <Venue />
        <Events />
        <Schedule />
        <Founder />
      </main>

      <Footer />

      {isLoaded && noticeState === 'pending' && (
        <CookieConsentBanner onDismiss={dismissNotice} />
      )}
    </>
  );
}

export default App;
