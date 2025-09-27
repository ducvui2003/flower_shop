import ClientIcon from '@/components/ClientIcon';
import { ReactNode } from 'react';
type DashboardCardProps = {
  children: ReactNode;
  icon: string;
};

const DashboardCard = ({ icon, children }: DashboardCardProps) => {
  return (
    <div className="border-accent flex flex-1 items-center gap-2 border-2 px-3 py-2 shadow-md">
      <span className="-pb-10 rounded-md border-2 bg-white shadow">
        <ClientIcon icon={icon} size={50} />
      </span>
      {children}
    </div>
  );
};

export default DashboardCard;
