'use client';
import ClientIcon from '@/components/ClientIcon';
import Link from '@/components/Link';
import LogoutFrame from '@/components/LogoutFrame';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

const ManagerDropdown = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ClientIcon
            icon={'lucide:user'}
            size={24}
            className="transition-opacity hover:cursor-pointer hover:opacity-50"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" sideOffset={12}>
          <DropdownMenuItem className="hover:!bg-primary p-0 hover:!text-white">
            <Link href={'/'} className="flex-1 p-2" legacyBehavior>
              Cửa hàng
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:!bg-primary p-0 hover:!text-white">
            <Link href={'/user/info'} className="flex-1 p-2" legacyBehavior>
              Thông tin cá nhân
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="bg-destructive flex-1 p-2 text-white hover:cursor-pointer hover:!bg-red-700 hover:!text-white"
            onClick={() => setOpen(true)}
          >
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutFrame open={open} setOpen={setOpen} />
    </>
  );
};

export default ManagerDropdown;
