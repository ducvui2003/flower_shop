'use client';
import { useState, useEffect } from 'react';
const BREAKPOINTS = {
  mobile: 768, // width < 768px
  tablet: 1024, // width >= 768px and < 1024px
  pc: Infinity, // width >= 1024px
};

type ViewType = 'mobile' | 'tablet' | 'pc';

export function useViewport(): ViewType {
  const getView = (): ViewType => {
    if (typeof window === 'undefined') return 'pc'; // SSR fallback
    const width = window.innerWidth;
    if (width < BREAKPOINTS.mobile) return 'mobile';
    if (width < BREAKPOINTS.tablet) return 'tablet';
    return 'pc';
  };

  const [view, setView] = useState<ViewType>(getView);

  useEffect(() => {
    const mobileMql = window.matchMedia(
      `(max-width: ${BREAKPOINTS.mobile - 1}px)`,
    );
    const tabletMql = window.matchMedia(
      `(min-width: ${BREAKPOINTS.mobile}px) and (max-width: ${BREAKPOINTS.tablet - 1}px)`,
    );

    const handleChange = () => setView(getView());

    mobileMql.addEventListener('change', handleChange);
    tabletMql.addEventListener('change', handleChange);

    return () => {
      mobileMql.removeEventListener('change', handleChange);
      tabletMql.removeEventListener('change', handleChange);
    };
  }, []);

  return view;
}
