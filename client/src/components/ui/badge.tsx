import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Role } from '@/types/auth.type';
import { UserStatus } from '@/types/user.type';
import { PaymentStatus, StatusOrderType } from '@/utils/const.util';

const badgeVariants = cva<{
  variant: {
    default: string;
    secondary: string;
    destructive: string;
    outline: string;
  };
  userRole: Record<Role, string>;
  userStatus: Record<UserStatus, string>;
  orderStatus: Record<StatusOrderType, string>;
  paymentStatus: Record<PaymentStatus, string>;
}>(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
      },
      userRole: {
        USER: 'bg-green-600 font-medium',
        ADMIN: 'bg-red-500 font-medium',
        SELLER: 'bg-green-400 font-medium',
      },
      userStatus: {
        ACTIVE: 'bg-green-500 text-white',
        INACTIVE: 'bg-yellow-500 text-white',
        BLOCKED: 'bg-gray-600 text-white',
      },
      orderStatus: {
        PENDING: 'bg-yellow-500 text-white',
        PAID: 'bg-green-500 text-white',
        DELIVERING: 'bg-blue-500 text-white',
        COMPLETE: 'bg-green-600 text-white',
        CANCELED: 'bg-red-500 text-white',
      },
      paymentStatus: {
        PENDING: 'bg-yellow-500 text-white',
        SUCCESS: 'bg-green-500 text-white',
        FAILED: 'bg-red-500 text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({
  className,
  userRole: roleUser,
  userStatus,
  orderStatus,
  paymentStatus,
  variant,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({
          variant,
          userRole: roleUser,
          userStatus,
          orderStatus,
          paymentStatus,
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
