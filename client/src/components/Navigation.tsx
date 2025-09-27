import ClientIcon from '@/components/ClientIcon';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { BREAKPOINTSType } from '@/utils/const.util';
import Link from 'next/link';
import { useMemo } from 'react';

type NavigationLinkType = {
  title: string;
  href: string;
  description?: string;
};

type NavigationType = {
  title: string;
  href?: string;
  child?: NavigationLinkType[];
};
export const components: NavigationType[] = [
  {
    title: 'Hoa tươi',
    href: '/product',
    child: [
      {
        title: 'Lãng hoa',
        href: '/contact-us',
      },
    ],
  },
  {
    title: 'Lãng hoa',
    href: '/contact-us',
  },
  {
    title: 'Giỏ hoa',
    href: '/consultant',
  },
  {
    title: 'Chu de',
    href: '/consultant',
  },
  {
    title: 'Hoa Dam cuoi',
    href: '/consultant',
  },
  {
    title: 'Hoa Khai truong',
    href: '/consultant',
  },
];

type NavigationProps = {
  breakpoint: BREAKPOINTSType;
};

const Navigation = ({ breakpoint }: NavigationProps) => {
  if (breakpoint === 'mobile') return <MobileNav />;
  if (breakpoint === 'pc') return <PcNav />;
  return null;
};

const PcNav = () => {
  const LinkRender = (i: number, item: NavigationType) => {
    return (
      <Link key={i} href={item.href!!} passHref>
        <span className="hover:bg-primary text-primary inline-block max-w-[250px] min-w-[200px] bg-white px-4 py-2 transition hover:text-white">
          {item.title}
        </span>
      </Link>
    );
  };
  return (
    <div className="pc:block hidden shadow-md">
      <div className="container flex">
        {components.map((item, i) => {
          return (
            <div key={i} className="group relative">
              {LinkRender(i, item)}
              {item.child && (
                <ul className="absolute top-full right-0 left-0 z-10 hidden w-fit group-hover:block">
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

const MobileNav = () => {
  const renderComponents = useMemo(() => {
    return components.map((component, index) => {
      return (
        <Link key={index} href={component.href!} legacyBehavior passHref>
          {component.title}
        </Link>
      );
    });
  }, [components]);

  return (
    <Sheet>
      <SheetTrigger className="pc:hidden p-2">
        <ClientIcon icon="lucide:menu" />
      </SheetTrigger>
      <SheetContent>
        <DialogTitle />
        <DialogDescription />
        <ul className="grid w-[400px] flex-col gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          {renderComponents}
        </ul>
      </SheetContent>
    </Sheet>
  );
};
export { MobileNav };
export default Navigation;
