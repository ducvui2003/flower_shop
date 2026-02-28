import React, { ComponentProps } from 'react';
import Logo from '@/components/Logo';
import Navigation from '@/components/Navigation';
import SearchBar from '@/components/SearchBar';
import { Separator } from '@/components/ui/separator';
import { APP_INFO } from '@/utils/const.util';
import Image from 'next/image';
import hotline from '/public/images/hotline-header.jpg';

type Props = {
  navData: ComponentProps<typeof Navigation>['data'];
};

const HeaderPc = ({ navData }: Props) => {
  return (
    <header className="pt-3">
      <div id="header" className="container">
        <div className="my-2 flex h-[80px] items-center justify-between gap-5">
          <Logo />
          <SearchBar className="flex flex-1 pl-2" />
          <Image
            className="block"
            width={280}
            height={100}
            src={hotline}
            alt={APP_INFO.NAME}
          />
        </div>
      </div>
      <Separator className="block" />
      <Navigation breakpoint="pc" data={navData || []} />
    </header>
  );
};

export default HeaderPc;
