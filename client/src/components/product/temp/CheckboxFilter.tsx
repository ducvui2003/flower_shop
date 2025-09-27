'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { uuid } from '@/lib/utils';

type CheckboxFilterProps<T> = {
  checked?: boolean;
  name: string;
  data: T;
  onChecked?: (checked: boolean, data: T) => void;
};

export function CheckboxFilter<T>({
  checked = false,
  name,
  data,
  onChecked,
}: CheckboxFilterProps<T>) {
  const id = `name-${uuid()}`;
  return (
    <div className="flex items-center space-x-2 p-2.5">
      <Checkbox
        className="rounded-none bg-white"
        id={id}
        onCheckedChange={(checked) =>
          onChecked &&
          onChecked(typeof checked === 'string' ? false : checked, data)
        }
        checked={checked}
      />
      <label
        htmlFor={id}
        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {name}
      </label>
    </div>
  );
}
