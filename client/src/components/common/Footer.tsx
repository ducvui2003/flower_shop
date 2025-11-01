import Logo from '@/components/Logo';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
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
          {TEXT.FOOTER.map((item, i) => (
            <div key={i}>
              <h3 className="mb-4 font-bold">{item.title}</h3>
              <ul className="flex flex-col gap-4 text-sm">
                {item.li.map((child, childI) => (
                  <Li key={childI}>{child}</Li>
                ))}
              </ul>
            </div>
          ))}
          <div key={1111}>
            <h3 className="mb-4 font-bold">Bản đồ đường đi</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.87221464334579!2d106.76815359896673!3d10.89099155221682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d96004948bfd%3A0xf9f6092a6c7a60f5!2zU2hvcCBob2EgdMawxqFpIE5o4bqtdCBOYW0!5e0!3m2!1sen!2s!4v1761979990779!5m2!1sen!2s"
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
  return (
    <div className="flex flex-col">
      <span>
        <Logo className={'h-[100px]'} />
      </span>
      <span className="mt-4 text-xl font-semibold">{APP_INFO.NAME}</span>
      <span className="mt-4 text-sm">{APP_INFO.ADDRESS}</span>
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
