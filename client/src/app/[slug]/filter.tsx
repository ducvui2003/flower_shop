'use client';
import { SEARCH_MAPPING, SearchParamsKeyType } from '@/app/[slug]/type-const';
import ClientIcon from '@/components/ClientIcon';
import TextTemplate from '@/components/TextTemplate';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DualRangeSlider } from '@/components/ui/dual-range-slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useViewport } from '@/hooks/use-mobile';
import { appendIfExist } from '@/lib/utils';
import { FilterDataType } from '@/types/page/product.page.type';
import { ProductSearchParamsType } from '@/types/product.type';
import { toCurrencyString } from '@/utils/format.util';
import TEXT from '@/utils/text.util';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
type FilterProps = ProductSearchParamsType & {
  structure: FilterDataType;
};

const PRICE_MIN = 0;
const PRICE_MAX = 1000000000;

const Filter = ({ category = [], price = [], structure }: FilterProps) => {
  const view = useViewport();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [values, setValues] = useState([PRICE_MIN, PRICE_MAX]);

  const handleChangeCheckbox = (
    checked: boolean,
    key: SearchParamsKeyType,
    value: string | number,
  ) => {
    const params = new URLSearchParams(searchParams);
    if (checked) {
      appendIfExist(params, SEARCH_MAPPING[key], value.toString());
    } else {
      params.delete(SEARCH_MAPPING[key], value.toString());
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return view === 'mobile' ? (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <ClientIcon icon={'mdi:filter-outline'} />
        </Button>
      </SheetTrigger>
      <SheetContent
        aria-describedby={undefined}
        side="bottom"
        className="h-[90vh]"
      >
        <VisuallyHidden>
          <SheetTitle />
        </VisuallyHidden>
        <div className="flex flex-col rounded-2xl border-1">
          <span className="flex items-center gap-2 p-2 px-2 pt-2 text-2xl font-bold">
            <ClientIcon icon={'mdi:filter-outline'} />
            {TEXT.PRODUCT_LIST.FILTER.FILTER}
          </span>
          <Separator className="bg-black" />
          <Accordion
            defaultValue={'item-1'}
            type="single"
            collapsible
            className="w-full px-2"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <span className="text-lg">
                  {TEXT.PRODUCT_LIST.FILTER.CATEGORY}
                </span>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4">
                {structure.categories.map((item, index) => (
                  <Label key={index} className="flex w-full items-center gap-2">
                    <Checkbox
                      checked={category.some((i) => i === item.value)}
                      value={item.value}
                      onCheckedChange={(checked) => {
                        if (typeof checked == 'string') checked = true;
                        handleChangeCheckbox(checked, 'category', item.value);
                      }}
                    />
                    <span className="text-md">{item.name}</span>
                  </Label>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Separator className="bg-black py-[1px]" />

          <Accordion
            type="single"
            defaultValue={'item-1'}
            collapsible
            className="w-full px-2"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <span className="text-lg">
                  {TEXT.PRODUCT_LIST.FILTER.PRICE}
                </span>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4">
                {structure.prices.map((item, index) => {
                  const value = item.from + '_' + item.to;
                  const checked = price.some((i) => i === value);
                  return (
                    <Label
                      key={index}
                      className="flex w-full items-center gap-2"
                    >
                      <Checkbox
                        value={value}
                        defaultChecked={checked}
                        onCheckedChange={(checked) => {
                          if (typeof checked == 'string') checked = true;
                          handleChangeCheckbox(checked, 'price', value);
                        }}
                      />
                      <span className="text-md">
                        <TextTemplate
                          template={TEXT.PRODUCT_LIST.FILTER.PRICE_TEMPLATE}
                          values={{
                            from: toCurrencyString(item.from),
                            to: toCurrencyString(item.to),
                          }}
                        />
                      </span>
                    </Label>
                  );
                })}
                <div>
                  <span className="text-bold text-md">
                    {TEXT.PRODUCT_LIST.FILTER.PRICE_MANUAL}
                  </span>
                  <div className="mt-2 flex items-center justify-between gap-1 p-1">
                    <Input />
                    <span>~</span>
                    <Input />
                  </div>
                  <div className="mt-2 px-1">
                    <DualRangeSlider
                      value={values}
                      onValueChange={setValues}
                      min={PRICE_MIN}
                      max={PRICE_MAX}
                      step={1000}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  ) : (
    <div className="flex flex-col rounded-2xl border-1">
      <span className="flex items-center gap-2 p-2 px-2 pt-2 text-2xl font-bold">
        <ClientIcon icon={'mdi:filter-outline'} />
        {TEXT.PRODUCT_LIST.FILTER.FILTER}
      </span>
      <Separator className="bg-black" />
      <Accordion
        defaultValue={'item-1'}
        type="single"
        collapsible
        className="w-full px-2"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <span className="text-lg">{TEXT.PRODUCT_LIST.FILTER.CATEGORY}</span>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            {structure.categories.map((item, index) => (
              <Label key={index} className="flex w-full items-center gap-2">
                <Checkbox
                  checked={category.some((i) => i === item.value)}
                  value={item.value}
                  onCheckedChange={(checked) => {
                    if (typeof checked == 'string') checked = true;
                    handleChangeCheckbox(checked, 'category', item.value);
                  }}
                />
                <span className="text-md">{item.name}</span>
              </Label>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator className="bg-black py-[1px]" />

      <Accordion
        type="single"
        defaultValue={'item-1'}
        collapsible
        className="w-full px-2"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <span className="text-lg">{TEXT.PRODUCT_LIST.FILTER.PRICE}</span>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            {structure.prices.map((item, index) => {
              const value = item.from + '_' + item.to;
              const checked = price.some((i) => i === value);
              return (
                <Label key={index} className="flex w-full items-center gap-2">
                  <Checkbox
                    value={value}
                    defaultChecked={checked}
                    onCheckedChange={(checked) => {
                      if (typeof checked == 'string') checked = true;
                      handleChangeCheckbox(checked, 'price', value);
                    }}
                  />
                  <span className="text-md">
                    <TextTemplate
                      template={TEXT.PRODUCT_LIST.FILTER.PRICE_TEMPLATE}
                      values={{
                        from: toCurrencyString(item.from),
                        to: toCurrencyString(item.to),
                      }}
                    />
                  </span>
                </Label>
              );
            })}
            <div>
              <span className="text-bold text-md">
                {TEXT.PRODUCT_LIST.FILTER.PRICE_MANUAL}
              </span>
              <div className="mt-2 flex items-center justify-between gap-1 p-1">
                <Input />
                <span>~</span>
                <Input />
              </div>
              <div className="mt-2 px-1">
                <DualRangeSlider
                  value={values}
                  onValueChange={setValues}
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={1000}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Filter;
