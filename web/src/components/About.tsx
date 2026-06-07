import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const revealLines = gsap.utils.toArray('.reveal-line') as HTMLElement[];
    const mm = gsap.matchMedia();
    
    mm.add({
      isDesktop: "(min-width: 769px)",
      isMobile: "(max-width: 768px)"
    }, (context) => {
      const { isMobile } = context.conditions as { isMobile: boolean };
      const startPos = isMobile ? 'top 55%' : 'top 65%';
      const endPos = isMobile ? 'bottom 40%' : 'bottom 35%';
      
      revealLines.forEach((line) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: line,
            start: startPos,
            end: endPos,
            scrub: 0.5,
          }
        })
        .to(line, { opacity: 1, duration: 0.3, ease: 'power1.inOut' })
        .to(line, { opacity: 1, duration: 0.4 })
        .to(line, { opacity: 0.12, duration: 0.3, ease: 'power1.inOut' });
      });
    });
  }, { scope: containerRef });

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
