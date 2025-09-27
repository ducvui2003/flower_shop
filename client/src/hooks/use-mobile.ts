import { BREAKPOINTS } from '@/utils/const.util';
import { useState, useEffect } from 'react';

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
