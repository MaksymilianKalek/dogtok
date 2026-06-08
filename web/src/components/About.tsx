import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';

export default function About({ isLoaded }: { isLoaded?: boolean }) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!isLoaded) return;
    const revealLines = gsap.utils.toArray('.reveal-line') as HTMLElement[];
    const mm = gsap.matchMedia();
    
    mm.add({
      isDesktop: "(min-width: 769px)",
      isMobile: "(max-width: 768px)"
    }, (context) => {
      const { isMobile } = context.conditions as { isMobile: boolean };
      const startPos = isMobile ? 'top 80%' : 'top 85%';
      const endPos = isMobile ? 'bottom 20%' : 'bottom 15%';
      
      revealLines.forEach((line) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: line,
            start: startPos,
            end: endPos,
            scrub: 0.5,
          }
        })
        .to(line, { opacity: 1, duration: 0.2, ease: 'power1.inOut' })
        .to(line, { opacity: 1, duration: 0.6 })
        .to(line, { opacity: 0.12, duration: 0.2, ease: 'power1.inOut' });
      });
    });
  }, { scope: containerRef, dependencies: [isLoaded] });

  return (
    <section className="about" id="about" ref={containerRef}>
      <div className="about-content">
        <span className="section-tag">{t('about.title')}</span>
        <div className="about-text">
          <p className="reveal-line">{t('about.p1')}</p>
          <p className="reveal-line">{t('about.p2')}</p>
          <p className="reveal-line">{t('about.p3')}</p>
          <p className="reveal-line">{t('about.p4')}</p>
        </div>
      </div>
    </section>
  );
}
