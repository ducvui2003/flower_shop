'use client';

import React, { useMemo, useState } from 'react';
import {
  useChangeQuantityCartItemMutation,
  useDeleteCartItemMutation,
  useGetCartQuery,
  useToggleCartItemMutation,
} from '@/features/cart/cart.api';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Plus,
  Minus,
  Slash,
  Trash2,
  TicketPercent,
  ChevronRight,
  Heart,
  Percent,
  ShoppingCart,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { currency } from '@/lib/utils';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { ChangeQuantityCartItemReqType } from '@/types/cart.type';
import { useGetActivePromotionsQuery } from '@/features/promotion/promotion.api';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function CartPage() {
  const { data: cart, isSuccess } = useGetCartQuery();
  const { data: promotions } = useGetActivePromotionsQuery();
  const [toggleCartItem] = useToggleCartItemMutation();
  const [changeQuantityCartItem] = useChangeQuantityCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();

  const [inputQuantities, setInputQuantities] = useState<{
    [key: string]: string;
  }>({});

  const handleToggleCartItem = async (cartItemId: string | 'all') => {
    try {
      await toggleCartItem(cartItemId);
    } catch (error) {
      return;
    }
  };

  const handleChangeQuantityCartItem = async (
    cartItemId: string,
    body: ChangeQuantityCartItemReqType,
  ) => {
    try {
      await changeQuantityCartItem({ cartItemId, body });
    } catch (error) {
      return;
    }
  };

  const handleDeleteCartItem = async (cartItemId: string) => {
    try {
      await deleteCartItem(cartItemId);
    } catch (error) {
      return;
    }
  };

  const allItemSelected = cart?.cartItems.every((item) => item.selected);

  const handleInputQuantityChange = async (
    cartItemId: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    const numericQty = Number(value);

    setInputQuantities((prev) => ({
      ...prev,
      [cartItemId]: numericQty > 0 ? value : '',
    }));

    if (!isNaN(numericQty) && numericQty > 0) {
      await handleChangeQuantityCartItem(cartItemId, { quantity: numericQty });
    }
  };

  const handleInputQuantityBlur = async (cartItemId: string) => {
    const value = inputQuantities[cartItemId];
    const numericQty = Number(value);

    if (!value || isNaN(numericQty) || numericQty < 1) {
      await handleChangeQuantityCartItem(cartItemId, { quantity: 1 });
      setInputQuantities((prev) => ({ ...prev, [cartItemId]: '1' }));
    } else {
      setInputQuantities((prev) => {
        const updated = { ...prev };
        delete updated[cartItemId];
        return updated;
      });
    }
  };

  return (
    <div className="my-16 space-y-4">
      <Breadcrumb>
        <BreadcrumbList className="gap-1 text-base font-medium sm:gap-1">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="-rotate-210">
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem className="text-primary">
            <BreadcrumbLink href="/cart">Giỏ hàng</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-6 grid gap-x-6 gap-y-8 lg:grid-cols-3 lg:gap-x-8">
        <Card className="h-fit lg:col-span-2">
          <CardHeader className="text-primary py-4 text-xl font-bold uppercase">
            DANH SÁCH SẢN PHẨM
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="all"
                checked={allItemSelected}
                disabled={!cart || cart.cartItems.length === 0}
                onCheckedChange={() => handleToggleCartItem('all')}
              />
              <Label
                htmlFor="all"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Chọn tất cả (
                {cart?.cartItems.filter((item) => item.selected).length ?? 0}{' '}
                sản phẩm)
              </Label>
            </div>
            {cart && cart.cartItems.length > 0 && isSuccess ? (
              cart.cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-md border border-gray-200 bg-white px-4 py-6 shadow-sm"
                >
                  <div className="flex gap-6 max-sm:flex-col sm:gap-4">
                    <Checkbox
                      className="cursor-pointer"
                      checked={item.selected}
                      onCheckedChange={() => handleToggleCartItem(item.id)}
                    />
                    <div className="shrink-0 max-sm:h-24 max-sm:w-24">
                      <Image
                        alt={item.product.name}
                        width={96}
                        height={96}
                        src={item.thumbnail}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <Link
                          href={`/product/detail/${item.product.id}`}
                          className="text-sm font-semibold text-black sm:text-base"
                        >
                          {item.product.name}
                        </Link>
                        {item.option && (
                          <p className="text-muted-foreground mt-2 flex items-center gap-2 text-sm font-medium">
                            Dung tích: <Badge>{item.option.name}</Badge>
                          </p>
                        )}
                      </div>
                      <div className="mt-auto">
                        <h2 className="text-primary text-base font-semibold">
                          {item.product.salePrice
                            ? currency(
                                Number(item.product.salePrice) +
                                  Number(item.option?.price ?? 0),
                              )
                            : currency(
                                Number(item.product.basePrice) +
                                  Number(item.option?.price ?? 0),
                              )}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="ml-auto flex flex-col">
                    <div className="flex items-start justify-end gap-4">
                      <Heart className="text-muted-foreground size-4 cursor-pointer hover:text-pink-500" />
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Trash2 className="text-muted-foreground hover:text-destructive size-4 cursor-pointer" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Bạn có chắc xóa sản phẩm này khỏi giỏ hàng không?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Không thể hoàn tác hành động này. Thao tác này sẽ
                              xóa vĩnh viễn nếu bạn đã chắc chắn hãy nhấn nút
                              "Xác nhận"
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="hover:text-white">
                              Hủy
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteCartItem(item.id)}
                            >
                              Xác nhận
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                    <div className="mt-auto flex items-center rounded-lg border p-1">
                      <Button
                        size="icon"
                        onClick={() =>
                          handleChangeQuantityCartItem(item.id, {
                            quantity: { decrement: 1 },
                          })
                        }
                        className="size-6 text-lg transition-all"
                        disabled={item.quantity === 1}
                      >
                        <Minus className="!size-3 text-white" />
                      </Button>
                      <Input
                        type="text"
                        className="h-6 w-7 border-0 p-0 text-center text-lg font-medium shadow-none focus-visible:ring-0"
                        value={inputQuantities[item.id] ?? item.quantity}
                        onChange={(e) => handleInputQuantityChange(item.id, e)}
                        onBlur={() => handleInputQuantityBlur(item.id)}
                        inputMode="numeric"
                      />
                      <Button
                        size="icon"
                        onClick={() =>
                          handleChangeQuantityCartItem(item.id, {
                            quantity: { increment: 1 },
                          })
                        }
                        className="size-6 text-lg transition-all"
                      >
                        <Plus className="!size-3 text-white" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-10 text-center">
                <div className="mb-6">
                  <ShoppingCart className="mx-auto size-32 text-gray-400" />
                </div>
                <div className="mb-4">
                  <h2 className="mb-2 text-xl font-semibold text-gray-800">
                    Giỏ hàng của bạn trông có vẻ hơi trống trải nhỉ!
                  </h2>
                  <p className="text-gray-600">
                    Hãy bắt đầu thêm sản phẩm đầu tiên. Nhanh chóng, dễ dàng và
                    bạn luôn có thể tùy chỉnh sau.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <div className="h-max space-y-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <p className="text-muted-foreground">Tổng tiền</p>
                <p>{currency(cart?.temporaryTotalPrice!)}</p>
              </div>
              <Separator />
              <div className="flex justify-between">
                <p className="text-muted-foreground">Tổng khuyến mãi</p>
                <p>{currency(0)}</p>
              </div>
              <Separator />
              <div className="flex justify-between">
                <p className="font-semibold">Cần thanh toán</p>
                <p className="text-primary font-semibold">
                  {currency(cart?.temporaryTotalPrice!)}
                </p>
              </div>
            </div>

            <Link className="w-full" href="/order">
              <Button
                disabled={
                  cart?.temporaryTotalPrice! === 0 ||
                  !cart ||
                  cart.cartItems.length === 0
                }
                className="w-full py-5 text-base"
              >
                Tiến hành đặt hàng
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader className="text-primary font-bold uppercase">
              PHIẾU KHUYẾN MÃI
            </CardHeader>
            <CardContent>
              <Sheet>
                <SheetTrigger
                  asChild
                  disabled={!cart || cart.cartItems.length === 0}
                >
                  <Button
                    type="button"
                    variant="ghost"
                    className="group/vc-trg text-muted-foreground flex w-full items-center justify-between gap-x-1.5 bg-neutral-100 py-6 text-base"
                  >
                    <TicketPercent className="text-primary !size-6 group-hover/vc-trg:text-white" />
                    <div className="w-full text-left group-hover/vc-trg:text-white">
                      Chọn hoặc nhập mã phiếu khuyến mãi
                    </div>
                    <ChevronRight className="!size-6 group-hover/vc-trg:text-white" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader className="pt-4 pb-0">
                    <SheetTitle className="text-lg font-medium">
                      Khuyến mãi và ưu đãi
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mx-4 grid gap-4">
                    <div className="flex items-stretch space-x-2">
                      <Input
                        placeholder="Nhập mã phiếu khuyến mãi"
                        className="h-10"
                      />
                      <Button type="button" className="h-full">
                        Áp dụng
                      </Button>
                    </div>
                  </div>
                  <div className="px-4">
                    <Separator orientation="horizontal" />
                  </div>
                  <div className="no-scrollbar mx-4 flex h-full flex-col space-y-4 overflow-y-scroll">
                    {promotions?.map((promotion) => (
                      <div
                        key={promotion.id}
                        className="flex w-full text-white"
                      >
                        <div className="grid h-full justify-items-center rounded-l-lg bg-neutral-700 px-4 py-5">
                          <div className="bg-secondary size-8 place-content-center self-start rounded-full">
                            <Percent className="size-4 w-full text-center text-neutral-700" />
                          </div>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="size-8 self-end rounded-full"
                          >
                            <Plus />
                          </Button>
                        </div>
                        <div className="relative flex h-full flex-col items-center justify-between border border-dashed border-zinc-50 bg-neutral-700">
                          <div className="absolute -top-5 h-7 w-7 rounded-full bg-white" />
                          <div className="absolute -bottom-5 h-7 w-7 rounded-full bg-white" />
                        </div>
                        <div className="grid h-full w-80 flex-1 gap-1 rounded-r-lg bg-neutral-700 px-6 py-4">
                          <div className="text-primary text-xl font-extrabold">
                            {promotion.code}{' '}
                            <span className="text-sm font-normal text-white">
                              ({promotion.usageLimit})
                            </span>
                          </div>
                          <p className="row-span-6 truncate text-sm">
                            {promotion.description}
                          </p>
                          <p className="mt-2 text-sm font-bold">
                            HSD:{' '}
                            <span className="font-normal">
                              {format(promotion.startDate, 'dd/MM/yyyy')} -{' '}
                              {format(promotion.endDate, 'dd/MM/yyyy')}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4">
                    <Separator orientation="horizontal" />
                  </div>
                  <SheetFooter className="pt-0">
                    <SheetClose asChild className="bg-primary py-5 text-base">
                      <Button type="submit">Xác nhận</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
