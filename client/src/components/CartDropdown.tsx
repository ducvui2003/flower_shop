'use client';

import React, { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import ClientIcon from '@/components/ClientIcon';
import { useDeleteCartItemMutation, useGetCartQuery } from '@/features/cart/cart.api';
import { Separator } from '@/components/ui/separator';
import { currency } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Trash2, X } from 'lucide-react';
import Image from 'next/image';

const CartDropdown = () => {
  const { data, isSuccess } = useGetCartQuery();
  const [deleteCartItem] = useDeleteCartItemMutation();

  const handleDeleteCartItem = async (cartItemId: string) => {
    try {
      await deleteCartItem(cartItemId);
    } catch (error) {
      return;
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer hover:opacity-50">
          <div className="size-11 p-3 rounded-full bg-muted border border-gray-200">
            <div className="relative">
              <ClientIcon icon={'lucide:shopping-cart'} size={22} />
              <span
                className="absolute -top-2 border-2 border-muted -right-2.5 text-[10px] rounded-full size-5 text-center place-content-center text-white bg-destructive">
                {data && isSuccess ? data.cartItems.length : 0}
              </span>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-96" align="end" sideOffset={12}>
          {
            data && data.cartItems.length > 0 && isSuccess ? (
              <div className="p-4">
                {
                  data.cartItems.map((cartItem) => (
                    <React.Fragment key={cartItem.id}>
                      <div key={cartItem.id} className="grid grid-cols-4 w-full">
                        <Image src={cartItem.thumbnail} className="border border-muted rounded-md" width={64}
                               height={64} alt={cartItem.product.name} />
                        <div className="col-span-3 flex flex-col">
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium leading-none truncate">{cartItem.product.name}</h4>
                            {cartItem.option &&
                              <p className="text-sm text-muted-foreground">Dung tích: {cartItem.option.name}</p>}
                          </div>
                          <div className="grid grid-cols-10 mt-auto h-5 items-center space-x-4 text-sm">
                            <div className="col-span-5">
                              {currency(cartItem.product.salePrice ?? cartItem.product.basePrice + (cartItem.option!.price ?? 0))}
                            </div>
                            <Separator orientation="vertical" />
                            <div className="col-span-2 text-center flex items-center"><X
                              className="size-4" /> {cartItem.quantity}</div>
                            <Separator orientation="vertical" />
                            <Trash2
                              className="cursor-pointer size-4 text-muted-foreground hover:text-destructive"
                              onClick={() => handleDeleteCartItem(cartItem.id)}
                            />
                          </div>
                        </div>
                      </div>
                      <Separator className="mb-6 mt-4 w-full" />
                    </React.Fragment>
                  ))
                }
                <Button className="w-full py-5 text-base">
                  <Link href="/cart">Xem giỏ hàng</Link>
                </Button>
              </div>
            ) : (
              <div key="no-data" className="text-base w-full h-24 text-center place-content-center">
                Chưa có sản phẩm nào trong giỏ hàng
              </div>
            )
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default CartDropdown;
