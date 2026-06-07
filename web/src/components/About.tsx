import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const revealLines = gsap.utils.toArray('.reveal-line') as HTMLElement[];

    revealLines.forEach((line) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: line,
          start: 'top 65%',
          end: 'bottom 35%',
          scrub: 0.5,
        }
      })
      .to(line, { opacity: 1, duration: 0.3, ease: 'power1.inOut' })
      .to(line, { opacity: 1, duration: 0.4 })
      .to(line, { opacity: 0.12, duration: 0.3, ease: 'power1.inOut' });
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
