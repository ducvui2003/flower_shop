'use client';

import * as React from 'react';
import { CalendarIcon, ChevronDownIcon } from 'lucide-react';
import { vi } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Calendar, CalendarProps } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, formatDate } from 'date-fns';
import { DateRange } from 'react-day-picker';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type DatePickerWithPresetsProps = {
  date?: Date;
  setDate?: (date: Date | undefined) => void;
  className?: string;
  disabled?: boolean;
} & Pick<CalendarProps, 'onDayBlur'>;

export function DatePickerWithPresets({
  date,
  setDate,
  className,
}: DatePickerWithPresetsProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className={cn('w-48 justify-between font-normal', className)}
          >
            {date ? (
              formatDate(date, 'PPP', { locale: vi })
            ) : (
              <span>Chọn ngày</span>
            )}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            locale={vi}
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate?.(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

type DatePickerWithRangeProps = {
  date?: DateRange;
  setDate?: (date: DateRange | undefined) => void;
  onOpen?: (open: boolean) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export function DatePickerWithRange({
  date,
  setDate,
  onOpen,
  className,
}: DatePickerWithRangeProps) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover onOpenChange={onOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'PPP', { locale: vi })} -{' '}
                  {format(date.to, 'PPP', { locale: vi })}
                </>
              ) : (
                format(date.from, 'PPP', { locale: vi })
              )
            ) : (
              <span>Chọn ngày</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            locale={vi}
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

type DatePickerMonthYearProps = {
  date: {
    month: number;
    year: number;
  };
  setDate: (date: { month: number; year: number }) => void;
};

export const DatePickerMonthYear = ({
  date,
  setDate,
}: DatePickerMonthYearProps) => {
  return (
    <>
      <Select
        defaultValue={date.month.toString()}
        onValueChange={(value) => {
          setDate({
            month: parseInt(value),
            year: date.year,
          });
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Chọn tháng" />
        </SelectTrigger>
        <SelectContent className="h-[180px]">
          <SelectGroup>
            <SelectLabel>Tháng</SelectLabel>
            {Array(12)
              .fill(null)
              .map((_, index) => (
                <SelectItem key={index} value={(index + 1).toString()}>
                  {index + 1}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        defaultValue={date.year.toString()}
        onValueChange={(value) => {
          setDate({
            year: parseInt(value),
            month: date.month,
          });
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Chọn năm" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Năm</SelectLabel>
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <SelectItem key={index} value={(index + 2021).toString()}>
                  {index + 2021}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
