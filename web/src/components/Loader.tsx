import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (loaderRef.current) loaderRef.current.style.display = 'none';
        onComplete();
      }
    });

    const timer = setTimeout(() => {
      tl.to(loaderRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 0.5
      });
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="loader" id="loader" ref={loaderRef}>
      <div className="loader-inner">
        <span className="loader-text">DOG TOK</span>
        <div className="loader-bar">
          <div className="loader-bar-fill"></div>
        </div>
      </div>
    </div>
  );
}
