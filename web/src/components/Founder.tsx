import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

export default function Founder() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: contentRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        contentRef.current?.classList.add('in-view');
      }
    });

    gsap.fromTo('.founder-img', 
      { scale: 1.15, yPercent: -5 },
      {
        scale: 1,
        yPercent: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: imgWrapRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section className="founder" id="founder" ref={containerRef}>
      <div className="founder-content" ref={contentRef}>
        <span className="section-tag">{t('founder.title')}</span>
        <div className="founder-grid">
          <div className="founder-text">
            <p>{t('founder.p1')}</p>
          </div>
          <div className="founder-img-wrap" ref={imgWrapRef}>
            <img src="/images/agnieszka.jpg" alt="O założycielce" className="founder-img" />
          </div>
        </div>
      </div>
    </section>
  );
}
