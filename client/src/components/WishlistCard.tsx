import ClientIcon from '@/components/ClientIcon';
import Link from '@/components/Link';
import { DEFAULT_IMAGE } from '@/utils/const.util';
import { useDeleteWishlistMutation } from '@/features/wishlist/wishlist.api';
import { currency } from '@/lib/utils';
import { WishlistResType } from '@/types/wishlist.type';
import Image from 'next/image';
import { toast } from 'sonner';
type WishlistCardProps = {
  data: WishlistResType;
};

const WishlistCard = ({ data }: WishlistCardProps) => {
  const { basePrice, id, name, salePrice, thumbnail } = data.product;
  const [deleteWishlist] = useDeleteWishlistMutation();

  const handleDelete = () => {
    deleteWishlist(data.id)
      .unwrap()
      .then(() => {
        toast.success('Xóa sản phẩm khỏi danh sách yêu thích thành công');
      })
      .catch((error) => {
        console.error('Failed to delete wishlist item:', error);
      });
  };

  return (
    <article className="flex items-center gap-8 border-b p-4" key={id}>
      <div className="rounded-md bg-white p-1 shadow-md">
        <Image
          src={thumbnail ?? DEFAULT_IMAGE}
          width={100}
          height={100}
          alt={name}
        />
      </div>
      <div className="flex-1">
        <Link href={`/product/detail/${id}`} className="hover:underline">
          <span>{name}</span>
        </Link>
        <div className="mt-2 mb-2 flex items-center gap-2">
          <span className="text-md font-bold text-red-600">
            {currency(salePrice || basePrice)}
          </span>
          {salePrice && (
            <span className="text-sm text-gray-400 line-through">
              {currency(basePrice)}
            </span>
          )}
        </div>
      </div>
      <div>
        <span
          onClick={handleDelete}
          className="grid cursor-pointer place-items-center rounded-full bg-red-500 p-1 text-white transition-opacity hover:opacity-45"
        >
          <ClientIcon icon={'iconoir:xmark'} size={30} />
        </span>
      </div>
    </article>
  );
};

export default WishlistCard;
