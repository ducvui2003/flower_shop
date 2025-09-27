import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { currency, uuid } from '@/lib/utils';
import { Value } from '@radix-ui/react-select';

type Range = {
  from: number;
  to: number;
};

const priceRange: Range[] = [
  {
    from: 50000,
    to: 200000,
  },
  {
    from: 200000,
    to: 500000,
  },
  {
    from: 500000,
    to: 1000000,
  },
  {
    from: 1000000,
    to: 1500000,
  },
];

type RadioFilterProps = {
  defaultValue?: Range;
  onChecked?: (data: Range | null) => void;
};

const RadioFilter = ({ defaultValue, onChecked }: RadioFilterProps) => {
  const value =
    defaultValue &&
    priceRange.find(
      (item) => item.from === defaultValue.from && item.to === defaultValue.to,
    )
      ? defaultValue.from + '-' + defaultValue.to
      : '';

  const id = uuid();
  return (
    <RadioGroup
      className="gap-4"
      defaultValue={value}
      onValueChange={(value) => {
        if (!value) {
          onChecked?.(null);
        } else {
          const [from, to] = value.split('-');
          onChecked?.({ from: parseInt(from), to: parseInt(to) });
        }
      }}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={''} id={id} />
        <Label htmlFor={id}>Tất cả</Label>
      </div>
      {priceRange.map((item) => {
        const id = uuid();
        return (
          <div key={id} className="flex items-center space-x-2">
            <RadioGroupItem value={item.from + '-' + item.to} id={id} />
            <Label htmlFor={id}>
              {`Giá từ ${currency(item.from)} ${item.to && `tới ${currency(item.to)}`}`}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
};

export default RadioFilter;
