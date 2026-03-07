'use client';
import EmblaCarousel from 'embla-carousel';

import { useEffect } from 'react';

const CarouselBehavior = () => {
  useEffect(() => {
    const wrapperNode = document.querySelector('.embla');
    if (!wrapperNode) return;
    const viewportNode = wrapperNode.querySelector('.embla__viewport');
    const prevButtonNode = wrapperNode.querySelector('.embla__prev');
    const nextButtonNode = wrapperNode.querySelector('.embla__next');

    const emblaApi = EmblaCarousel(viewportNode as HTMLElement, {
      loop: false,
    });
    if (prevButtonNode)
      prevButtonNode.addEventListener(
        'click',
        // () => emblaApi.scrollToPrev(),
        false,
      );
    if (nextButtonNode)
      nextButtonNode.addEventListener(
        'click',
        // () => emblaApi.scrollToNext(),
        false,
      );
  }, []);
  return null;
};

export { CarouselBehavior };
