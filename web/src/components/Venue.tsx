import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function Venue() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);

  const venueItems = [
    { key: 'accommodation', num: '01' },
    { key: 'pool', num: '02' },
    { key: 'food', num: '03' },
    { key: 'infrastructure', num: '04' }
  ];

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '.venue-content',
      start: 'top 85%',
      once: true,
      onEnter: () => {
        document.querySelector('.venue-content')?.classList.add('in-view');
      }
    });
  }, { scope: containerRef });

  return (
    <section className="venue" id="venue" ref={containerRef}>
      <div className="venue-content">
        <div className="venue-left">
          <span className="section-tag venue-sticky-title">{t('venue.title')}</span>
        </div>
        
        <div className="venue-list">
          {venueItems.map((item) => (
            <div key={item.key} className="venue-list-item">
              <span className="venue-num">{item.num}</span>
              <div className="venue-item-content">
                <h3 className="venue-item-title">{t(`venue.items.${item.key}`)}</h3>
                <p className="venue-item-desc">{t(`venue.descriptions.${item.key}`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
