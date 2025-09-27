import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ReactNode, useState } from 'react';
type DropdownSelectProps<
  ID,
  T extends {
    id: ID;
    name: string;
  },
> = {
  data: T[];
  submit: (id: ID[]) => void;
};

const DropdownSelect = <
  ID,
  T extends {
    id: ID;
    name: string;
  },
>({
  data,
  submit,
}: DropdownSelectProps<ID, T>) => {
  const [checked, setChecked] = useState<ID[]>([]);
  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (!open) submit(checked);
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Chọn</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {data?.map((item, index) => {
          return (
            <DropdownMenuCheckboxItem
              key={index}
              onSelect={(e) => {
                e.preventDefault();
              }}
              checked={checked.includes(item.id)}
              onCheckedChange={(checked) => {
                if (checked) setChecked((prev) => [...prev, item.id]);
                else
                  setChecked((prev) => [...prev.filter((i) => i != item.id)]);
              }}
            >
              {item.name}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownSelect;
