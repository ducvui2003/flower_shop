import TEXT from '@/utils/text.util';
import Image from 'next/image';
import empty_png from 'public/images/empty_state.png';
const EmptyState = () => {
  return (
    <div className="flex flex-col items-center gap-2 py-4 text-center text-gray-500">
      <Image
        src={empty_png}
        width={300}
        sizes="
            (max-width: 640px) 100vw,
            (max-width: 1024px) 50vw,
            33vw
          "
        height={100}
        alt="empty"
      />
      <span className="text-lg">{TEXT.PRODUCT_LIST.EMPTY}</span>
    </div>
  );
};

export default EmptyState;
