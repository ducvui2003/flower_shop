'use client';

import React, { useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Dot,
  MessageSquareQuote,
  MessageSquareText,
  Star,
  Store,
  Undo,
  User,
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  FilterReviewSchema,
  SendReviewSchema,
} from '@/types/schema/review.schema';
import { Rating, RatingButton } from '@/components/ui/rating';
import {
  feeling,
  FilterReviewQueryType,
  GetReviewsOfProductResType,
  ratingSort,
  RatingSortKeysType,
} from '@/types/review.type';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDate } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { DynamicPagination } from '@/components/DynamicPagination';

interface Props {
  reviews: GetReviewsOfProductResType;
  setPage: (page: number) => void;
  setRatings: (ratings: number[]) => void;
  setSort: (sort: RatingSortKeysType[number] | undefined) => void;
  setOnlyHasResponse: (onlyHasResponse: boolean) => void;
  setOnlyHasBuyAgain: (onlyHasBuyAgain: boolean) => void;
  setSearch: (search: string) => void;
}

export default function ProductReview({
  reviews,
  setPage,
  setRatings,
  setSort,
  setOnlyHasResponse,
  setOnlyHasBuyAgain,
  setSearch,
}: Props) {
  const { items, pagination, averageRating, ratingStars } = reviews;
  const { page, totalPages, totalItems } = pagination;

  const form = useForm<FilterReviewQueryType>({
    resolver: zodResolver(FilterReviewSchema),
    defaultValues: {
      ratings: [],
      onlyHasResponse: false,
      onlyHasBuyAgain: false,
      sort: 'rating_newest',
    },
  });

  const fixedTotalItems = useMemo(() => {
    return Object.values(ratingStars).reduce(
      (total, value) => total + value,
      0,
    );
  }, [ratingStars]);

  const averageRatingDisplay = () => {
    return ((averageRating / 5) * 100).toFixed(0);
  };

  const onSubmitForm = (data: FilterReviewQueryType) => {
    setRatings(data.ratings);
    setOnlyHasResponse(data.onlyHasResponse!);
    setOnlyHasBuyAgain(data.onlyHasBuyAgain!);
  };

  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [page, totalPages]);

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-2xl">
          Đánh giá sản phẩm ({fixedTotalItems})
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-6 gap-6">
        {fixedTotalItems ? (
          <>
            <div className="col-span-2 space-y-2">
              <div className="flex items-stretch justify-between gap-x-4 rounded-lg border px-6 py-4 shadow-sm">
                <div className="grid shrink-0 justify-center space-y-0.5">
                  <h4 className="text-muted-foreground text-center font-semibold">
                    Đánh giá trung bình
                  </h4>
                  <div className="mx-auto flex items-center gap-x-1">
                    <div className="text-primary text-2xl font-bold">
                      {averageRating}
                    </div>
                    <Rating
                      className="text-yellow-400"
                      value={averageRating}
                      readOnly
                    >
                      {Array.from({
                        length: SendReviewSchema.shape.rating.maxValue!,
                      }).map((_, index) => (
                        <RatingButton className="p-0" size={16} key={index} />
                      ))}
                    </Rating>
                  </div>
                </div>
                <div>
                  <Separator
                    className="bg-muted-foreground"
                    orientation="vertical"
                  />
                </div>
                <div className="text-muted-foreground place-content-center text-center text-sm">
                  <strong className="text-primary">
                    {averageRatingDisplay()}%
                  </strong>{' '}
                  khách hàng cảm thấy hài lòng
                </div>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitForm)}>
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="item-1"
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Phân loại xếp hạng</AccordionTrigger>
                      <AccordionContent className="grid gap-y-2">
                        <FormField
                          control={form.control}
                          name="ratings"
                          render={({ field }) => (
                            <FormItem>
                              {Object.entries(ratingStars).map(
                                ([key, value]) => {
                                  const starNumber = parseInt(key);
                                  const isChecked =
                                    field.value?.includes(starNumber);

                                  return (
                                    <div
                                      key={key}
                                      className="flex w-full items-center gap-2"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          disabled={value === 0}
                                          checked={isChecked}
                                          onCheckedChange={(checked) => {
                                            const newValue = checked
                                              ? [...field.value, starNumber]
                                              : field.value.filter(
                                                  (v) => v !== starNumber,
                                                );
                                            field.onChange(newValue);
                                            form.handleSubmit(onSubmitForm)();
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="flex flex-1 items-center justify-stretch gap-2">
                                        <p className="w-2 shrink-0 text-end text-sm font-medium">
                                          {key}
                                        </p>
                                        <Star className="h-4 w-4 shrink-0 fill-yellow-400 text-yellow-400" />
                                        <Progress
                                          className="flex-8"
                                          value={Math.ceil(
                                            (value / fixedTotalItems) * 100,
                                          )}
                                        />
                                        <p className="text-muted-foreground flex-1 text-start text-sm font-medium">
                                          {value}
                                        </p>
                                      </FormLabel>
                                    </div>
                                  );
                                },
                              )}
                            </FormItem>
                          )}
                        />
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Phân loại khác</AccordionTrigger>
                      <AccordionContent className="grid gap-y-2">
                        <FormItem>
                          <FormField
                            control={form.control}
                            name="onlyHasResponse"
                            render={({ field }) => (
                              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <FormLabel>
                                  Chỉ đánh giá có phản hồi của shop
                                </FormLabel>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={(value) => {
                                      field.onChange(value);
                                      form.handleSubmit(onSubmitForm)();
                                    }}
                                  />
                                </FormControl>
                              </div>
                            )}
                          />
                        </FormItem>
                        <FormItem>
                          <FormField
                            control={form.control}
                            name="onlyHasBuyAgain"
                            render={({ field }) => (
                              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <FormLabel>
                                  Chỉ đánh giá từ khách hàng đã mua lại
                                </FormLabel>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={(value) => {
                                      field.onChange(value);
                                      form.handleSubmit(onSubmitForm)();
                                    }}
                                  />
                                </FormControl>
                              </div>
                            )}
                          />
                        </FormItem>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Separator orientation="horizontal" />
                  <Button
                    className="mt-4 w-full font-semibold"
                    onClick={() => form.reset()}
                  >
                    <Undo /> Hoàn tác
                  </Button>
                </form>
              </Form>
            </div>
            <div className="col-span-4 flex flex-col gap-y-4">
              <div className="grid grid-cols-3 gap-x-4">
                <Input
                  className="col-span-2 h-9"
                  placeholder="Tìm kiếm đánh giá..."
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <Select
                  onValueChange={(value) =>
                    setSort(value as RatingSortKeysType[number])
                  }
                  defaultValue={form.formState.defaultValues?.sort}
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Sắp xếp" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ratingSort).map(([value, label]) => (
                      <SelectItem
                        className="hover:!text-white focus-visible:!text-white"
                        value={value}
                      >
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {totalItems ? (
                <div className="flex h-full flex-col justify-between gap-y-6">
                  <div className="grid gap-y-4">
                    {items.map((item) => (
                      <Card key={item.id} className="w-full">
                        <CardHeader className="space-y-4 pb-2">
                          <CardTitle className="flex items-center gap-1">
                            <Avatar className="size-8">
                              <AvatarImage src={item.user.avatar} />
                              <AvatarFallback className="bg-secondary p-2">
                                <User />
                              </AvatarFallback>
                            </Avatar>
                            <span>{item.user.name}</span>
                            <div className="relative size-4">
                              <Dot className="text-primary absolute -top-3/4 -right-3/4 size-10" />
                            </div>
                            <span className="text-muted-foreground font-normal">
                              {formatDate(item.createdAt as Date)}
                            </span>
                          </CardTitle>
                          <CardDescription className="flex items-center gap-x-1.5">
                            <Rating
                              className="text-yellow-400"
                              defaultValue={item.rating}
                              readOnly
                            >
                              {Array.from({
                                length: SendReviewSchema.shape.rating.maxValue!,
                              }).map((_, index) => (
                                <RatingButton className="p-0" key={index} />
                              ))}
                            </Rating>
                            <span className="text-primary text-sm font-semibold">
                              {feeling[item.rating]}
                            </span>
                            {item.options && (
                              <div className="flex items-center space-x-1.5">
                                <Separator
                                  orientation="vertical"
                                  className="!h-4"
                                />{' '}
                                <strong>Dung tích:</strong> {item.options.name}
                              </div>
                            )}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-base font-normal">
                            {item.content}
                          </p>
                        </CardContent>
                        {item.response && (
                          <CardFooter>
                            <Card className="bg-muted w-full">
                              <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-1">
                                  <Avatar className="size-8">
                                    <AvatarImage src="/images/logo-transparent.png" />
                                    <AvatarFallback className="bg-secondary p-2">
                                      <Store />
                                    </AvatarFallback>
                                  </Avatar>
                                  <span>Phản hồi từ An Nhiên</span>
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-base font-normal">
                                  {item.response}
                                </p>
                              </CardContent>
                            </Card>
                          </CardFooter>
                        )}
                      </Card>
                    ))}
                  </div>
                  <DynamicPagination
                    totalPages={totalPages}
                    page={page}
                    setPage={setPage}
                  />
                </div>
              ) : (
                <div className="text-muted-foreground grid h-full place-content-center rounded-lg border border-dashed p-8">
                  <MessageSquareText className="mx-auto size-52 stroke-1" />
                  <Label className="text-lg">
                    Không tìm thấy đánh giá nào phù hợp
                  </Label>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-muted-foreground col-span-6 grid place-content-center rounded-lg border border-dashed p-8">
            <MessageSquareQuote className="mx-auto size-52 stroke-1" />
            <Label className="text-lg">Chưa có đánh giá nào về sản phẩm</Label>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
