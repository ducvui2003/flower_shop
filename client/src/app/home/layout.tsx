'use client';

import { useSearchParams } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

type HomeLayoutProps = {
  children?: ReactNode;
};

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const searchParams = useSearchParams();

  const googleStatus = searchParams.get('google');
  const facebookStatus = searchParams.get('facebook');

  useEffect(() => {
    if (googleStatus)
      if (googleStatus == 'true') {
        toast.success('Đăng nhập với Google thành công', {
          description: 'Chào mừng đến An Nhiên',
        });
      } else {
        toast.error('Đăng nhập với Google thất bại');
      }
    if (facebookStatus)
      if (facebookStatus.startsWith('true')) {
        toast.success('Đăng nhập với Facebook thành công', {
          description: 'Chào mừng đến An Nhiên',
        });
      } else {
        toast.error('Đăng nhập với Facebook thất bại');
      }
  }, [googleStatus, facebookStatus]);

  return children;
};
export default HomeLayout;
