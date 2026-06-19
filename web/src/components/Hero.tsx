import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';

interface HeroProps {
  isLoaded: boolean;
}

export default function Hero({ isLoaded }: HeroProps) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    gsap.set('.hero-title .line-inner', { y: '105%' });
    gsap.set('.hero-sub .line-inner', { y: '105%' });
    
    gsap.fromTo('.hero-img', 
      { y: '0%' },
      {
        y: '15%',
        ease: 'none',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      }
    );

    if (isLoaded) {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.to('.hero-bg', {
        clipPath: 'inset(0%)',
        duration: 1.8,
      })
      .to('.hero-img', {
        scale: 1,
        duration: 2.5,
      }, 0)
      .to('.hero-title .line-inner', {
        y: 0,
        duration: 1.4,
        stagger: 0.12,
      }, 0.6)
      .to('.hero-sub .line-inner', {
        y: 0,
        duration: 1,
      }, 1.0)
    }
  }, { scope: containerRef, dependencies: [isLoaded] });

  return (
    <section className="hero" id="hero" ref={containerRef}>
      <div className="hero-bg">
        <img src="/images/edi.webp" alt="DOG TOK Szkoleniowy Raj" className="hero-img" />
      </div>
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="line-wrap"><span className="line-inner">DOG</span></span>
          <span className="line-wrap"><span className="line-inner">TOK</span></span>
        </h1>
        <p className="hero-sub">
          <span className="line-wrap"><span className="line-inner hero-sub-text">{t('hero.tagline')}</span></span>
        </p>
      </div>
    </section>
  );
}
