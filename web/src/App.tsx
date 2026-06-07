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
import Events from './components/Events';
import Schedule from './components/Schedule';
import Gallery from './components/Gallery';
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

    // @ts-expect-error global lenis
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
    // @ts-expect-error global lenis
    if (window.lenis) {
      if (isMenuOpen) {
        // @ts-expect-error global lenis
        window.lenis.stop();
      } else {
        // @ts-expect-error global lenis
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
      
      <main>
        <Hero isLoaded={isLoaded} />
        <About />
        <Events />
        <Schedule />
        <Gallery />
      </main>

      <Footer />
    </>
  );
}

export default App;
