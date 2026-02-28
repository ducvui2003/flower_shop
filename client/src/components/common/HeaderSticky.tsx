'use client';
import { useEffect } from 'react';

const HeaderSticky = () => {
  useEffect(() => {
    const header = document.querySelector('#header');
    const navPc = document.querySelector('#nav-pc') as HTMLElement | null;

    if (!header || !navPc) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          navPc.classList.toggle('is-sticky', !entry.isIntersecting);
        });
      },
      {
        threshold: 0,
      },
    );

    observer.observe(header);

    return () => {
      observer.unobserve(header);
    };
  }, []);
  return null;
};

export default HeaderSticky;
