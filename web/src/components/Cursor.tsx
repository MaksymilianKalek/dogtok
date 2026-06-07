import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let fX = mouseX;
    let fY = mouseY;

    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
    gsap.set(followerRef.current, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.set(cursorRef.current, { x: mouseX, y: mouseY });
    };

    window.addEventListener('mousemove', onMouseMove);

    gsap.ticker.add(() => {
      fX += (mouseX - fX) * 0.2;
      fY += (mouseY - fY) * 0.2;
      gsap.set(followerRef.current, { x: fX, y: fY });
    });

    const hoverElements = document.querySelectorAll('[data-hover]');
    const onEnter = () => {
      cursorRef.current?.classList.add('cursor--hover');
      followerRef.current?.classList.add('cursor-follower--hover');
    };
    const onLeave = () => {
      cursorRef.current?.classList.remove('cursor--hover');
      followerRef.current?.classList.remove('cursor-follower--hover');
    };

    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-follower" ref={followerRef}></div>
    </>
  );
}
