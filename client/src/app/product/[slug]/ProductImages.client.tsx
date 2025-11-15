'use client';

import { useEffect } from 'react';

const ProductImagesInteract = () => {
  useEffect(() => {
    const primary =
      document.querySelector<HTMLImageElement>('#product-thumbnail');
    const list = document.querySelectorAll('.product-image');
    if (!primary) return;

    if (list.length > 0) list[0]?.classList.add('product-image-selected');

    list.forEach((item) => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img) return;

        list.forEach((i) => {
          i.classList.remove('product-image-selected');
        });

        primary.srcset = img.srcset;
        primary.src = img.src;
        item.classList.add('product-image-selected');
      });
    });
  }, []);

  return null;
};
export default ProductImagesInteract;
