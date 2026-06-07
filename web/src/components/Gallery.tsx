import React, { useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);

  // Initialize Embla with AutoScroll plugin
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true, 
      dragFree: true 
    }, 
    [
      AutoScroll({ 
        playOnInit: true, 
        stopOnInteraction: false, // Ensures it resumes after dragging
        speed: 0.6 
      })
    ]
  );

  useGSAP(() => {
    // Entrance animation
    ScrollTrigger.create({
      trigger: '.gallery-header',
      start: 'top 85%',
      once: true,
      onEnter: () => {
        document.querySelector('.gallery-header')?.classList.add('in-view');
      }
    });
  }, { scope: containerRef });

  return (
    <section className="gallery" id="gallery" ref={containerRef}>
      <div className="gallery-header">
        <span className="section-tag">{t('gallery.title')}</span>
      </div>
      
      <style>{`
        .embla {
          overflow: hidden;
          cursor: grab;
          mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
        }
        .embla:active {
          cursor: grabbing;
        }
        .embla__container {
          display: flex;
          /* Reset margin since we will use margin-right on slides */
          margin-left: 0;
          width: fit-content;
        }
        .embla__slide {
          flex: 0 0 auto;
          min-width: 0;
          margin-right: 1.5rem;
        }
      `}</style>

      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {/* We duplicate the 9 items a few times so Embla has enough buffer for a seamless loop on ultrawide monitors */}
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              <div className="embla__slide marquee-item"><img src="/images/gallery/1.webp" alt="Galeria" /></div>
              <div className="embla__slide marquee-item"><img src="/images/gallery/2.webp" alt="Galeria" /></div>
              <div className="embla__slide marquee-item"><img src="/images/gallery/3.webp" alt="Galeria" /></div>
              <div className="embla__slide marquee-item"><img src="/images/gallery/4.webp" alt="Galeria" /></div>
              <div className="embla__slide marquee-item"><img src="/images/gallery/5.webp" alt="Galeria" /></div>
              <div className="embla__slide marquee-item"><img src="/images/gallery/6.webp" alt="Galeria" /></div>
              <div className="embla__slide marquee-item"><img src="/images/gallery/7.webp" alt="Galeria" /></div>
              <div className="embla__slide marquee-item"><img src="/images/gallery/8.webp" alt="Galeria" /></div>
              <div className="embla__slide marquee-item"><img src="/images/gallery/9.webp" alt="Galeria" /></div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
