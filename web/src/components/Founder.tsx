import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function Founder() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Entrance animation
    ScrollTrigger.create({
      trigger: '.founder-content',
      start: 'top 85%',
      once: true,
      onEnter: () => {
        document.querySelector('.founder-content')?.classList.add('in-view');
      }
    });

    // Image reveal
    gsap.fromTo('.founder-img-wrap', 
      { clipPath: 'inset(100% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.founder-content',
          start: 'top 65%',
          end: 'bottom 45%',
          scrub: 1,
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section className="founder" id="founder" ref={containerRef}>
      <div className="founder-content">
        <span className="section-tag">{t('founder.title')}</span>
        <div className="founder-grid">
          <div className="founder-text">
            <p>{t('founder.p1')}</p>
          </div>
          <div className="founder-img-wrap">
            <img src="/images/agnieszka.jpg" alt="O założycielce" className="founder-img" />
          </div>
        </div>
      </div>
    </section>
  );
}
