'use client';

import ClientIcon from '@/components/ClientIcon';
import Logo from '@/components/Logo';
import SearchBar from '@/components/SearchBar';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { BreakPointType } from '@/utils/const.util';
import Link from 'next/link';
import { useState } from 'react';

type NavigationItem = {
  title: string;
  href?: string;
  child?: NavigationItem[];
};

type NavigationProps = {
  breakpoint: BreakPointType;
  data: NavigationItem[];
};

const Navigation = ({ breakpoint, data }: NavigationProps) => {
  if (breakpoint === 'mobile') return <MobileNav data={data} />;
  if (breakpoint === 'pc') return <PcNav data={data} />;
  return null;
};

const PcNav = ({ data }: { data: NavigationItem[] }) => {
  if (data?.length === 0) return null;
  const LinkRender = (i: number, item: { title: string; href?: string }) => {
    return (
      <Link key={i} href={item.href!} passHref>
        <span className="hover:bg-primary text-primary inline-block max-w-[250px] min-w-[200px] bg-white px-4 py-2 transition hover:text-white">
          {item.title}
        </span>
      </Link>
    );
  };
  return (
    <div id="nav-pc" className="pc:block hidden bg-white shadow-md">
      <div className="container flex">
        {data.map((item, i) => {
          return (
            <div key={i} className="group relative">
              {LinkRender(i, item)}
              {item.child && (
                <ul className="absolute top-full right-0 left-0 z-10 hidden w-fit shadow group-hover:block">
                  {item.child.map((childItem, childI) => {
                    return (
                      <li key={childI}>{LinkRender(childI, childItem)}</li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MobileNav = ({ data }: { data: NavigationItem[] }) => {
  const [open, setOpen] = useState<boolean>(false);
  if (data?.length === 0) return null;
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger id="nav-mobile" className="pc:hidden p-2">
        <ClientIcon height={25} icon="lucide:menu" />
      </SheetTrigger>
      <SheetContent className="min-w-[80vw] p-4">
        <DialogTitle />
        <DialogDescription />
        <Logo className="grid place-items-center" />
        <SearchBar className="pl-2" />
        <ul className="grid flex-col gap-3 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          {data.map((component, index) => {
            return (
              <Link
                key={index}
                href={component.href || '/'}
                className="hover:bg-primary text-primary border-primary inline-block max-w-[250px] min-w-[200px] border-b-1 bg-white p-2 transition hover:text-white"
                onClick={() => setOpen(false)}
              >
                {component.title}
              </Link>
            );
          })}
        </ul>
      </SheetContent>
    </Sheet>
  );
};
export { MobileNav };
export default Navigation;
