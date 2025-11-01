'use client';

import ClientIcon from '@/components/ClientIcon';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
  useDeleteCartItemMutation,
  useGetCartQuery,
} from '@/features/cart/cart.api';
import { currency } from '@/lib/utils';
import { Trash2, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CartDropdown = () => {
  return <ClientIcon icon={'solar:cart-broken'} className="text-primary p-2" />;
};
export default CartDropdown;
