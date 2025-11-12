'use client';
import { Icon, IconifyIconProps } from '@iconify-icon/react';

export type ClientIconProps = object & Omit<IconifyIconProps, 'ref'>;

export default function ClientIcon({
  icon,
  size = 24,
  color = 'black',
  onClick = undefined,
  ...props
}: ClientIconProps) {
  return (
    <Icon icon={icon} color={color} size={size} {...props} onClick={onClick} />
  );
}
