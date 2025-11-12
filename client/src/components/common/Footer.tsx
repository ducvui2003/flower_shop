import Logo from '@/components/Logo';
import { Separator } from '@/components/ui/separator';
import { APP_INFO } from '@/utils/const.util';
import TEXT from '@/utils/text.util';
import { ReactNode } from 'react';

const Footer = () => {
  return (
    <>
      <Separator className="mt-7 text-gray-900" />
      <footer className="bg-[#fcfcfc] pt-7 text-black">
        <div className="container-p pc:grid-cols-3 pc:grid-rows-1 pc:grid container flex flex-col gap-4 pb-4">
          <ColIntro />
          {TEXT.FOOTER.filter((_, i) => i != 0).map((item, i) => {
            return (
              <div key={i}>
                <h3 className="mb-4 font-bold">{item.title}</h3>
                <ul className="flex flex-col gap-4 text-sm">
                  {item.li.map((child, childI) => (
                    <Li key={childI}>{child}</Li>
                  ))}
                </ul>
              </div>
            );
          })}
          <div key={1111}>
            <h3 className="mb-4 font-bold">Bản đồ đường đi</h3>
            <iframe
              src={APP_INFO.MAP_EMBED}
              className="pc:h-[300px] h-[200px] w-full border-0"
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <CopyRight />
      </footer>
    </>
  );
};

const ColIntro = () => {
  const { li, title } = TEXT.FOOTER[0];
  return (
    <div className="flex flex-col">
      <Logo className="h-[100px]" />
      <h3 className="mb-4 font-bold">{title}</h3>
      <ul className="flex flex-col gap-4 text-sm">
        {li.map((child, childI) => (
          <Li key={childI}>{child}</Li>
        ))}
      </ul>
    </div>
  );
};

const CopyRight = () => {
  return (
    <div className="bg-primary text-white">
      <p className="container py-2 text-xs">
        Bản quyền © 2025 hoatuoinhatnam.com.vn
      </p>
    </div>
  );
};

type LiProps = {
  children: ReactNode;
};

const Li = ({ children }: LiProps) => {
  return <li className="hover:cursor-pointer hover:underline">{children}</li>;
};

export default Footer;
