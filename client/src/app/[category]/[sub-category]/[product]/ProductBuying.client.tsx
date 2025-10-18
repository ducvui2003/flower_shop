'use client';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { ReactNode } from 'react';
type ProductBuyingClientProps = {
  id: number;
};

const ProductBuyingClient = ({ id }: ProductBuyingClientProps) => {
  return (
    <Button
      type="submit"
      className="gap-2 px-4 py-2 text-white disabled:opacity-50"
    >
      <ShoppingCart />
      Thêm vào giỏ hàng
    </Button>
  );
};

export default ProductBuyingClient;
