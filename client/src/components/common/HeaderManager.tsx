import getServerSession from '@/components/auth/getServerSession';
import ManagerDropdown from '@/components/ManagerDropdown';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type HeaderManagerProps = {
  className?: string;
};

const HeaderManager = async ({ className }: HeaderManagerProps) => {
  const session = await getServerSession();

  return (
    <header
      className={cn('bg-accent flex justify-between px-4 py-2', className)}
    >
      <div className="bg-secondary grid place-items-center rounded-full p-2">
        <Image
          src={'/images/logo-transparent.png'}
          className="size-[60px] rounded-full"
          alt=""
          width={60}
          height={60}
        />
      </div>
      <article
        className={cn(
          'border-accent text-md bg-primary inline-flex items-center gap-2 rounded-xl border p-4 px-4 py-2 text-xl',
        )}
      >
        <div className="flex gap-2">
          <h1>Xin chào, {session?.user.name ?? ''}</h1>
          <ManagerDropdown />
        </div>
      </article>
    </header>
  );
};

export default HeaderManager;
