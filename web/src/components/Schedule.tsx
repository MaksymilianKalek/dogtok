import { useState, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

interface ScheduleEvent {
  date: string;
  title: string;
  past: boolean;
}

interface MonthBlock {
  month: string;
  events: ScheduleEvent[];
}

function isPast(dateStr: string): boolean {
  const now = new Date();
  const match = dateStr.match(/(\d{1,2})\.(\d{2})\.?$/);
  if (match) {
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const end = new Date(2026, month - 1, day, 23, 59);
    return now > end;
  }
  const rangeMatch = dateStr.match(/(\d{1,2})(?:\.\d{2})?\.?-(\d{1,2})\.(\d{2})\.?$/);
  if (rangeMatch) {
    const day = parseInt(rangeMatch[2], 10);
    const month = parseInt(rangeMatch[3], 10);
    const end = new Date(2026, month - 1, day, 23, 59);
    return now > end;
  }
  return false;
}

export default function Schedule() {
  const { t } = useTranslation();
  const [openMonth, setOpenMonth] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const schedule: MonthBlock[] = useMemo(() => [
    {
      month: t('schedule.months.march'),
      events: [
        { date: '28.02-1.03', title: 'Tropienie z Psim Nosem - dr Aleksandra Jakubowska', past: isPast('1.03') },
        { date: '7-8.03', title: 'Dummy z Joy for Dogs - Joanna Grabowska i Sebastian Zagłoba', past: isPast('8.03') },
        { date: '14-15.03', title: 'Warsztaty z Asią Błońską org. przez Z PSEM Tu i Teraz — komunikacja, relacja, współpraca', past: isPast('15.03') },
        { date: '20-22.03', title: 'Kurs instruktorski Hoopers Polska', past: isPast('22.03') },
        { date: '26-29.03', title: 'Kurs rozwijający dla Instruktorów Fitnessu dla psów — psi seniorzy', past: isPast('29.03') },
      ]
    },
    {
      month: t('schedule.months.april'),
      events: [
        { date: '13-19.04', title: 'Kurs instruktorski z psiego fitnessu z I Wszystko Jasne - Paula Gumińska, org. Studium Fizjoterapii Zwierząt', past: isPast('19.04') },
        { date: '21-22.04', title: 'Motywacja lvl.1 z I Wszystko Jasne - Paula Gumińska', past: isPast('22.04') },
        { date: '23-26.04', title: 'Obóz org. przez „Co myśli pies?" oraz „Strefę Psiego Porozumienia"', past: isPast('26.04') },
        { date: '27-29.04', title: 'Kinezyterapia i postępowanie pokontuzyjne u psów sportowych z I Wszystko Jasne - Paula Gumińska, org. Studium Fizjoterapii Zwierząt', past: isPast('29.04') },
      ]
    },
    {
      month: t('schedule.months.may'),
      events: [
        { date: '30.04-3.05', title: 'OBI Majówka org. przez DOOG IDEA', past: isPast('3.05') },
        { date: '4-7.05', title: 'Obóz org. przez Psynergia Natalia Kubiak — terapia behawioralna psów', past: isPast('7.05') },
        { date: '12-15.05', title: 'Obóz org. przez Monikę Pożarowszczyk', past: isPast('15.05') },
        { date: '18-22.05', title: 'Obóz org. przez DogMotion Agility', past: isPast('22.05') },
        { date: '25-31.05', title: 'Kurs instruktorski z psiego fitnessu z I Wszystko Jasne - Paula Gumińska, org. Studium Fizjoterapii Zwierząt', past: isPast('31.05') },
      ]
    },
    {
      month: t('schedule.months.june'),
      events: [
        { date: '4-7.06', title: 'Obóz org. przez Patrycję Sztukarewską', past: isPast('7.06') },
        { date: '13-14.06', title: 'Pająk w Magicznym Lesie czyli odkrywamy tajniki dogfrisbee Vol.8', past: isPast('14.06') },
        { date: '17-21.06', title: 'Obóz agility org. przez FreeX', past: isPast('21.06') },
        { date: '25-28.06', title: 'Obóz z Psim Nosem - dr Aleksandra Jakubowska', past: isPast('28.06') },
        { date: '29.06-2.07', title: 'Obóz frisbee org. przez Wiktorię Świtoń i Julię Sowiak', past: isPast('2.07') },
      ]
    },
    {
      month: t('schedule.months.july'),
      events: [
        { date: '4-5.07', title: 'Dummy z Joy for Dogs - Joanna Grabowska i Sebastian Zagłoba', past: isPast('5.07') },
        { date: '8-12.07', title: 'Obóz agility org. przez FreeX', past: isPast('12.07') },
        { date: '14-17.07', title: 'Obóz dla OBIfreaks', past: isPast('17.07') },
        { date: '18-19.07', title: 'Motywacja Lvl.1 z I Wszystko Jasne - Paula Gumińska', past: isPast('19.07') },
        { date: '27-31.07', title: 'Be fit for frisbee z I Wszystko Jasne - Paula Gumińska i Ania Pająk Radomska', past: isPast('31.07') },
      ]
    },
    {
      month: t('schedule.months.august'),
      events: [
        { date: '7-10.08', title: 'Rezerwacja', past: isPast('10.08') },
        { date: '12-16.08', title: 'Obóz agility org. przez FreeX', past: isPast('16.08') },
        { date: '20-23.08', title: 'Obóz noseworkowy/obi org. przez Sylwię Trambacz-Oleszak i Olę Adamską', past: isPast('23.08') },
        { date: '25-28.08', title: 'Obóz agility org. przez Magdę-Yodę Gadomską i Joannę Jankowską', past: isPast('28.08') },
      ]
    },
    {
      month: t('schedule.months.september'),
      events: [
        { date: '31.08-3.09', title: 'Obóz org. przez Psynergia Natalia Kubiak — terapia behawioralna psów', past: isPast('3.09') },
        { date: '5-6.09', title: 'Motywacja lvl.1 z I Wszystko Jasne - Paula Gumińska', past: isPast('6.09') },
        { date: '7-11.09', title: 'Obóz org. przez DogMotion Agility', past: isPast('11.09') },
        { date: '12-13.09', title: 'Dummy z Joy for Dogs - Joanna Grabowska i Sebastian Zagłoba', past: isPast('13.09') },
        { date: '18-20.09', title: 'Klasy komunikacji i socjalizacji z Talking Dogs', past: isPast('20.09') },
        { date: '24-27.09', title: 'Kurs instruktorski z psiego fitnessu lvl.2 „Pies sportowy" z I Wszystko Jasne - Paula Gumińska, org. Studium Fizjoterapii Zwierząt', past: isPast('27.09') },
        { date: '27.09-3.10', title: 'Obóz org. przez Mariolę Jaskułę', past: isPast('3.10') },
      ]
    },
    {
      month: t('schedule.months.october'),
      events: [
        { date: '5-8.10', title: 'Obóz mastermind Paula & Spółka (6-8.10 dla obserwatorów)', past: isPast('8.10') },
        { date: '12-16.10', title: 'Obóz org. przez Magdę Szewczyk-Dzido', past: isPast('16.10') },
        { date: '17-18.10', title: 'Dummy z Joy for Dogs - Joanna Grabowska', past: isPast('18.10') },
        { date: '24-25.10', title: 'Warsztaty z Asią Błońską org. przez Z PSEM Tu i Teraz — komunikacja, relacja, współpraca', past: isPast('25.10') },
      ]
    },
    {
      month: t('schedule.months.november'),
      events: [
        { date: '14-15.11', title: 'Tropienie z Psim Nosem - dr Aleksandra Jakubowska', past: isPast('15.11') },
      ]
    },
  ], [t]);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '.schedule-wrap',
      start: 'top 85%',
      once: true,
      onEnter: () => {
        document.querySelector('.schedule-wrap')?.classList.add('in-view');
      }
    });
  }, { scope: containerRef });

  const toggle = (idx: number) => {
    setOpenMonth(prev => prev === idx ? null : idx);
  };

  return (
    <section className="schedule" id="schedule" ref={containerRef}>
      <div className="schedule-wrap">
        <span className="section-tag">{t('schedule.title')}</span>
        <span className="schedule-year">2026</span>
        <div className="schedule-accordion">
          {schedule.map((block, idx) => {
            const isOpen = openMonth === idx;
            const allPast = block.events.every(e => e.past);
            return (
              <div key={block.month} className={`schedule-month ${isOpen ? 'open' : ''} ${allPast ? 'past' : ''}`}>
                <button
                  className="schedule-month-header"
                  onClick={() => toggle(idx)}
                  type="button"
                  data-hover
                >
                  <span className="schedule-month-name">{block.month}</span>
                  <span className="schedule-month-count">{block.events.length}</span>
                  <span className="schedule-month-toggle">{isOpen ? '−' : '+'}</span>
                </button>
                <div className="schedule-month-panel">
                  <div className="schedule-month-panel-inner">
                    {block.events.map((event) => (
                      <div key={event.date + event.title} className={`schedule-event ${event.past ? 'past' : ''}`}>
                        <span className="schedule-event-date">{event.date}</span>
                        <span className="schedule-event-title">{event.title}</span>
                      </div>
                    ))}
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
