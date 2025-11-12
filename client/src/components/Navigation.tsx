import ClientIcon from '@/components/ClientIcon';
import Logo from '@/components/Logo';
import SearchBar from '@/components/SearchBar';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { BreakPointType } from '@/utils/const.util';
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
    title: 'Chủ đề',
    href: '/chu-de',
    child: [
      {
        title: 'Hoa Sinh Nhật',
        href: '/chu-de/sinh-nhat',
      },
      {
        title: 'Hoa Khai Trương',
        href: '/chu-de/khai-truong',
      },
      {
        title: 'Hoa Chúc Mừng',
        href: '/chu-de/chuc-mung',
      },
    ],
  },
  {
    title: 'Đối tượng',
    href: '/doi-tuong',
  },
  {
    title: 'Kiểu dáng',
    href: '/kieu-dang',
  },
  {
    title: 'Hoa tươi',
    href: '/hoa-tuoi',
  },
  {
    title: 'Màu sắc',
    href: '/mau-sac',
  },
];

type NavigationProps = {
  breakpoint: BreakPointType;
};

const Navigation = ({ breakpoint }: NavigationProps) => {
  if (breakpoint === 'mobile') return <MobileNav />;
  if (breakpoint === 'pc') return <PcNav />;
  return null;
};

const PcNav = () => {
  const LinkRender = (i: number, item: NavigationType) => {
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
          <span className="hover:bg-primary text-primary border-primary inline-block max-w-[250px] min-w-[200px] border-b-1 bg-white p-2 transition hover:text-white">
            {component.title}
          </span>
        </Link>
      );
    });
  }, []);

  return (
    <Sheet>
      <SheetTrigger className="pc:hidden p-2">
        <ClientIcon height={25} icon="lucide:menu" />
      </SheetTrigger>
      <SheetContent className="min-w-[80vw] p-4">
        <DialogTitle />
        <DialogDescription />
        <Logo className="grid place-items-center" />
        <SearchBar className="pl-2" />
        <ul className="grid flex-col gap-3 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          {renderComponents}
        </ul>
      </SheetContent>
    </Sheet>
  );
};
export { MobileNav };
export default Navigation;
