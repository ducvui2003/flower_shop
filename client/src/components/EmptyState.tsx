import TEXT from '@/utils/text.util';
import Image from 'next/image';
import empty_png from 'public/images/empty_state.png';
const EmptyState = () => {
  return (
    <div className="flex flex-col items-center gap-2 py-4 text-center text-gray-500">
      <Image src={empty_png} width={300} height={100} alt="empty" />
      {TEXT.PRODUCT_LIST.EMPTY}
    </div>
  );
};

export default EmptyState;
