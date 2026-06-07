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

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    window.lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useEffect(() => {
    if (window.lenis) {
      if (isMenuOpen) {
        window.lenis.stop();
      } else {
        window.lenis.start();
      }
    }
  }, [isMenuOpen]);

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
        <About />
        <Venue />
        <Events />
        <Schedule />
        <Founder />
      </main>

      <Footer />
    </>
  );
}

export default App;
