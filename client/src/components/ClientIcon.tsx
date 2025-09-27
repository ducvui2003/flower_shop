'use client';
import { Icon, IconifyIconProps } from '@iconify-icon/react';

export interface ClientIconProps extends Omit<IconifyIconProps, 'ref'> {}

export default function ClientIcon({
  icon,
  size = 24,
  color = 'black',
  onClick = undefined,
  ...props
}: ClientIconProps) {
  return (
    <Icon
      icon={icon}
      width={size}
      height={size}
      color={color}
      {...props}
      onClick={onClick}
    />
  );
}
