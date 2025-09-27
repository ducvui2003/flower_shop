import Image from 'next/image';
import React from 'react';
import image1 from '/public/images/vendor/image 16.png';
import image2 from '/public/images/vendor/image 17.png';
import image3 from '/public/images/vendor/image 18.png';
import image4 from '/public/images/vendor/image 19.png';
import image5 from '/public/images/vendor/image 20.png';
import image6 from '/public/images/vendor/image 21.png';
import image7 from '/public/images/vendor/image 22.png';

import { ALT } from '@/utils/const.util';

const VendorSection = () => {
  return (
    <section className="container py-12">
      <div className="flex h-[70px] gap-2">
        <span className="flex flex-1">
          <Image
            src={image1}
            className="h-full w-full object-contain"
            alt={ALT}
          />
        </span>
        <span className="flex flex-1">
          <Image
            src={image2}
            className="h-full w-full object-contain"
            alt={ALT}
          />
        </span>
        <span className="flex flex-1">
          <Image
            src={image3}
            className="h-full w-full object-contain"
            alt={ALT}
          />
        </span>
      </div>
      <div className="mt-2 flex h-[70px] gap-2">
        <span className="flex flex-1">
          <Image
            src={image4}
            className="h-full w-full object-contain"
            alt={ALT}
          />
        </span>
        <span className="flex flex-1">
          <Image
            src={image5}
            className="h-full w-full object-contain"
            alt={ALT}
          />
        </span>
        <span className="flex flex-1">
          <Image
            src={image6}
            className="h-full w-full object-contain"
            alt={ALT}
          />
        </span>
        <span className="flex flex-1">
          <Image
            src={image7}
            className="h-full w-full object-contain"
            alt={ALT}
          />
        </span>
      </div>
    </section>
  );
};

export default VendorSection;
