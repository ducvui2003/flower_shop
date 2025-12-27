import LoadingBoundary from "@/components/LoadingBoundary";
import Pagination from "@/components/Pagination";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useApi } from "@/hooks/use-api";
import httpService from "@/lib/http/http.service";
import { Page, ResponseApi } from "@/lib/http/http.type";
import { cn } from "@/lib/utils";
import { ReactNode, useCallback, useState } from "react";

type Image = {
  id: number;
  key: string;
  alt: string;
  href: string;
};

type DialogGetImageProps = {
  value?: Array<Image>;
  defaultValue?: Array<Image>;
  onChange?: (value: Array<Image>) => void;
  children: ReactNode;
  className?: string;
};

const DialogGetImage = ({
  value,
  defaultValue = [],
  onChange,
  children,
  className,
}: DialogGetImageProps) => {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const images = isControlled ? value : internalValue;

  const setImages = useCallback(
    (next: Array<Image>) => {
      if (!isControlled) {
        setInternalValue(next);
      }
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  const [page, setPage] = useState<number>(1);
  const { data } = useApi(async () => {
    const res = await httpService.get<ResponseApi<Page<Image>>>(
      `/media?page=${page}`
    );
    return res.data.data;
  }, [page]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className={cn(className)}>
        {children}
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Select file</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <LoadingBoundary data={data}>
          {(data) => (
            <>
              <div className="grid grid-cols-2 gap-2">
                {data.items.map((item) => (
                  <Item
                    key={item.id}
                    name={item.key}
                    src={item.href}
                    checked={images.some((i) => i.id === item.id)}
                    onCheck={(checked) => {
                      if (checked) setImages([...images, item]);
                      else setImages(images.filter((i) => i.id !== item.id));
                    }}
                  />
                ))}
              </div>
              <Pagination
                page={{
                  currentPage: data.currentPage,
                  totalItems: data.totalItems,
                  totalPages: data.totalPages,
                }}
                onPageChange={(page) => setPage(page)}
              />
            </>
          )}
        </LoadingBoundary>
      </SheetContent>
    </Sheet>
  );
};

type ItemProps = {
  src: string;
  name: string;
  checked: boolean;
  onCheck: (checked: boolean) => void;
};

const Item = ({ src, name, checked, onCheck }: ItemProps) => {
  return (
    <div className="p-4 relative rounded shadow w-fit bg-gray-50">
      <Checkbox
        checked={checked}
        onCheckedChange={onCheck}
        className="absolute top-2 right-2 bg-gray-300"
      />
      <img src={src} className="aspect-square  object-contain" alt="" />
      <span className="text-sm text-center max-w-[100px] line-clamp-1">
        {name}
      </span>
    </div>
  );
};

export default DialogGetImage;
