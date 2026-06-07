import { useState, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function Events() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const eventsData = useMemo(() => [
    { name: t('events.items.agility'), desc: t('events.descriptions.agility'), img: '/images/agility.webp' },
    { name: t('events.items.motivation'), desc: t('events.descriptions.motivation'), img: '/images/motywacja.webp' },
    { name: t('events.items.dummy'), desc: t('events.descriptions.dummy'), img: '/images/dummy.webp' },
    { name: t('events.items.frisbee'), desc: t('events.descriptions.frisbee'), img: '/images/frisbee.webp' },
    { name: t('events.items.obedience'), desc: t('events.descriptions.obedience'), img: '/images/obedience.webp' },
    { name: t('events.items.photography'), desc: t('events.descriptions.photography'), img: '/images/buczix.webp' },
    { name: t('events.items.mantrailing'), desc: t('events.descriptions.mantrailing'), img: '/images/tropienie.webp' },
    { name: t('events.items.communication'), desc: t('events.descriptions.communication'), img: '/images/talkingDogs.webp' }
  ], [t]);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '.events-wrap',
      start: 'top 85%',
      once: true,
      onEnter: () => {
        document.querySelector('.events-wrap')?.classList.add('in-view');
      }
    });
  }, { scope: containerRef });

  const toggle = (idx: number) => {
    setActiveIndex(prev => prev === idx ? null : idx);
  };

  return (
    <section className="events" id="events" ref={containerRef}>
      <div className="events-wrap">
        <span className="section-tag">{t('events.title')}</span>
        <div className="events-accordion">
          {eventsData.map((event, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div key={event.name} className={`event-item ${isOpen ? 'open' : ''}`}>
                <button
                  className="event-header"
                  onClick={() => toggle(idx)}
                  type="button"
                  data-hover
                >
                  <span className="event-num">{(idx + 1).toString().padStart(2, '0')}</span>
                  <span className="event-name">{event.name}</span>
                  <span className="event-toggle">{isOpen ? '−' : '+'}</span>
                </button>
                <div className="event-panel">
                  <div className="event-panel-inner">
                    <p className="event-desc">{event.desc}</p>
                    <div className="event-img-wrap">
                      <img src={event.img} alt={event.name} className="event-img" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
