import React, { useRef, ReactElement, useEffect, forwardRef, cloneElement } from 'react';
import gsap from 'gsap';

interface MagneticProps {
  children: ReactElement;
  strength?: number;
}

export default function Magnetic({ children, strength = 0.3 }: MagneticProps) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Only apply magnetic effect on devices with fine pointers (desktops/mice)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const element = elementRef.current;
    if (!element) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      // Calculate mouse position relative to the center of the element
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(element, { x: x * strength, y: y * strength, duration: 0.6, ease: 'power3.out' });
    };

    const onMouseLeave = () => {
      gsap.to(element, { x: 0, y: 0, duration: 0.7, ease: 'power3.out' });
    };

    element.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseleave', onMouseLeave);

    return () => {
      element.removeEventListener('mousemove', onMouseMove);
      element.removeEventListener('mouseleave', onMouseLeave);
      gsap.killTweensOf(element);
    };
  }, [strength]);

  return cloneElement(children, { ref: elementRef });
}
