'use client';
import { useEffect } from 'react';

const HeaderSticky = () => {
  useEffect(() => {
    const header = document.querySelector('#header');
    const nav = document.querySelector('#nav-pc') as HTMLElement | null;
    if (header && nav) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              nav.classList.add('is-sticky');
            } else {
              nav.classList.remove('is-sticky');
            }
          });
        },
        {
          threshold: 0, // trigger as soon as any pixel enters/leaves view
        },
      );

      observer.observe(header);

      return () => {
        observer.unobserve(header);
      };
    }
  }, []);
  return null;
};

export default HeaderSticky;
