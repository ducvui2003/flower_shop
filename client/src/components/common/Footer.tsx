import Logo from '@/components/Logo';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import TEXT from '@/utils/text.util';
import { ReactNode } from 'react';

const Footer = () => {
  return (
    <>
      <Separator className="mt-7 text-gray-900" />
      <footer className="pc:pb-12 bg-[#fcfcfc] pt-7 pb-7 text-black">
        <div className="container-p pc:grid-cols-4 pc:grid-rows-1 pc:grid container flex flex-col gap-4">
          {TEXT.FOOTER.map((item, i) => (
            <div key={i} className="">
              <h3 className="mb-4 font-bold">{item.title}</h3>
              <ul className="flex flex-col gap-4 text-sm">
                {item.li.map((child, childI) => (
                  <Li key={childI}>{child}</Li>
                ))}
              </ul>
            </div>
          ))}
          <div className="pc:order-none -order-10 flex flex-col">
            <CopyRight />
          </div>
        </div>
      </footer>
    </>
  );
};

const CopyRight = () => {
  return (
    <>
      <span style={{ '--header-height': '60px' } as any}>
        <Logo className={cn('w-[70%]')} />
      </span>
      <span className="mt-5 text-gray-500">{TEXT.COPYRIGHT[0]}</span>
      <span className="mt-4 text-xl font-semibold">{TEXT.COPYRIGHT[1]}</span>
      <span className="mt-4 text-sm">{TEXT.COPYRIGHT[2]}</span>
      <span className="mt-6 text-sm">{TEXT.COPYRIGHT[3]}</span>
    </>
  );
};

type LiProps = {
  children: ReactNode;
};

const Li = ({ children }: LiProps) => {
  return <li className="hover:cursor-pointer hover:underline">{children}</li>;
};

export default Footer;
