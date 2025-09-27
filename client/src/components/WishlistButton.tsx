'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import ClientIcon from '@/components/ClientIcon';
import {
  useCreateWishlistMutation,
  useDeleteWishlistMutation,
} from '@/features/wishlist/wishlist.api';
import { toast } from 'sonner';
import wishlistService from '@/service/wishlist.service';
import useSession from '@/components/auth/useSession';
import Link from '@/components/Link';

interface WishlistButtonProps {
  productId: number;
}

export default function WishlistButton({ productId }: WishlistButtonProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [createWishlist] = useCreateWishlistMutation();
  const [deleteWishlist] = useDeleteWishlistMutation();
  const { status } = useSession();
  useEffect(() => {
    if (status === 'authenticated')
      wishlistService
        .checkProductInWishlist(productId)
        .then(() => {
          console.log('Product is in wishlist');
          setIsFavorite(true);
        })
        .catch(() => {
          setIsFavorite(false); // Default to false if there's an error
        });
  }, [status]);

  const handleDeleteWishlist = () => {
    deleteWishlist(productId)
      .unwrap()
      .then(() => {
        setIsFavorite(false);
        toast.success('Đã xóa khỏi danh sách yêu thích');
      });
  };
  const handleCreateWishlist = () => {
    if (status !== 'authenticated') {
      toast.warning('Vui lòng đăng nhập để sử dụng tính năng này', {
        description: (
          <Button>
            <Link href="/login">Đăng nhập</Link>
          </Button>
        ),
      });
      return;
    }
    createWishlist({ productId })
      .unwrap()
      .then(() => {
        setIsFavorite(true);
        toast.success('Đã thêm vào danh sách yêu thích');
      });
  };
  return (
    <Button
      type="button"
      className="rounded px-3 py-2 font-semibold text-white transition-colors duration-300"
      onClick={isFavorite ? handleDeleteWishlist : handleCreateWishlist}
    >
      {isFavorite ? (
        <ClientIcon icon={'fa6-solid:heart'} />
      ) : (
        <ClientIcon icon={'fa6-regular:heart'} />
      )}
      Yêu thích
    </Button>
  );
}
