'use client';

import { Input } from '@/components/ui/input';
import { useState } from 'react';

function formatVND(value: string): string {
  const number = parseInt(value.replace(/\D/g, ''), 10);
  if (isNaN(number)) return '';
  return number.toLocaleString('vi-VN') + ' ₫';
}

function unformatVND(value: string): string {
  return value.replace(/\D/g, '');
}

interface VndInputProps {
  value?: number;
  onChange: (value: number) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function VndInput({
  value,
  onChange,
  placeholder,
  disabled,
}: VndInputProps) {
  const [displayValue, setDisplayValue] = useState(() =>
    value ? formatVND(value.toString()) : '',
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = unformatVND(e.target.value);

    // ✅ If input is empty, allow it
    if (raw === '') {
      setDisplayValue('');
      onChange(0); // or null, depending on how you want to handle it
      return;
    }

    setDisplayValue(formatVND(raw));
    onChange(Number(raw));
  };

  const handleBlur = () => {
    // You can optionally force formatting on blur
    const raw = unformatVND(displayValue);
    setDisplayValue(formatVND(raw));
  };

  return (
    <Input
      type="text"
      inputMode="numeric"
      placeholder={placeholder}
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={disabled}
    />
  );
}
