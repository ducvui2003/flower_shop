import ClientIcon from '@/components/ClientIcon';
import { cn, uuid } from '@/lib/utils';
import React from 'react';

const FeatureSection = () => {
  return (
    <div className="pc:flex-row pc:px-0 container flex flex-col justify-between gap-6 px-4 [&>*]:flex-1">
      {data.map((item) => (
        <Card {...item} key={uuid()} />
      ))}
    </div>
  );
};

const data: CardProps[] = [
  {
    title: 'Mua sắm dễ dàng',
    description:
      'Giao diện đơn giản, thân thiện giúp bạn tìm kiếm và chọn mua tinh dầu yêu thích chỉ trong vài bước.',
    icon: 'mdi:cart',
  },
  {
    title: 'Giao hàng nhanh chóng',
    description:
      'Chúng tôi cam kết giao hàng nhanh, đóng gói cẩn thận để sản phẩm đến tay bạn luôn nguyên vẹn và thơm ngát.',
    icon: 'hugeicons:truck-delivery',
  },
  {
    title: 'Hỗ trợ tận tâm',
    description:
      'Đội ngũ chăm sóc khách hàng luôn sẵn sàng lắng nghe và đồng hành cùng bạn trong hành trình trải nghiệm hương thơm.',
    icon: 'mdi:customer-service',
  },
];

type CardProps = {
  title: string;
  description: string;
  icon: string;
};
const Card = ({ title, description, icon }: CardProps) => {
  return (
    <article
      className={cn(
        'pc:px-3 pc:py-4 border-primary flex items-center justify-center gap-2 rounded-xl border-2 p-2 transition-colors duration-300',
        'group hover:bg-primary hover:text-white',
      )}
    >
      <ClientIcon
        icon={icon}
        className="text-primary pc:text-[60px] text-[30px] group-hover:text-white"
      />
      <div className="flex-1 text-left">
        <h3 className="inline-block text-lg font-bold">{title}</h3>
        <p className="pc:max-w-[90%] pt-2 text-sm">{description}</p>
      </div>
    </article>
  );
};

export default FeatureSection;
