'use client';

import { OrderDetailItemType } from '@/types/order.type';
import {
  useCreateReviewMutation,
  useEditReviewMutation,
} from '@/features/review/review.api';
import { useForm } from 'react-hook-form';
import { feeling, SendReviewReqType } from '@/types/review.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { SendReviewSchema } from '@/types/schema/review.schema';
import { toast } from 'sonner';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Rating, RatingButton } from '@/components/ui/rating';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { DEFAULT_IMAGE } from '@/utils/const.util';
import { useEffect, useState } from 'react';
import {
  orderApi,
  useGetReviewOfOrderItemQuery,
} from '@/features/order/order.api';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAppDispatch } from '@/hooks/use-store';

interface Props {
  item: OrderDetailItemType;
}

const ReviewDialog = ({ item }: Props) => {
  const [createReview] = useCreateReviewMutation();
  const [editReview] = useEditReviewMutation();
  const { data: existedReview } = useGetReviewOfOrderItemQuery(item.id);
  const [open, setOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const form = useForm<SendReviewReqType>({
    resolver: zodResolver(SendReviewSchema),
    defaultValues: {
      productId: item.productId,
      orderItemId: item.id,
      content: '',
      rating: SendReviewSchema.shape.rating.maxValue!,
    },
  });

  useEffect(() => {
    if (existedReview) {
      const { content, rating } = existedReview;
      form.reset({
        content,
        rating,
        orderItemId: item.id,
        productId: item.productId,
      });
    }
  }, [existedReview]);

  const onSubmit = async (body: SendReviewReqType) => {
    let result = {};
    try {
      if (existedReview) {
        result = await editReview({ body, reviewId: existedReview.id });
      } else {
        result = await createReview(body);
      }
      if (result.hasOwnProperty('data')) {
        dispatch(
          orderApi.util.invalidateTags([{ type: 'OrderItem', id: item.id }]),
        );
        setOpen(false);
        form.reset();
        toast.success('Đã đánh giá sản phẩm thành công');
      }
    } catch (error) {
      return;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {existedReview ? (
          <Button
            variant="outline"
            className="hover:text-white"
            onClick={() => {
              setIsViewMode(true);
            }}
          >
            Xem đánh giá
          </Button>
        ) : (
          <Button variant="default" className="hover:text-white">
            Đánh giá
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[500px] space-y-2">
        <DialogHeader className="space-y-2.5">
          <DialogTitle>Đánh giá sản phẩm</DialogTitle>
          <DialogDescription asChild>
            <Accordion
              type="single"
              collapsible
              className="border-input w-full rounded-md border shadow-md"
              defaultValue="item-info"
            >
              <AccordionItem value="item-info">
                <AccordionTrigger className="border-input border-b px-4 text-base">
                  Thông tin mua sản phẩm
                </AccordionTrigger>
                <AccordionContent className="p-4">
                  <div className="flex w-full cursor-pointer flex-wrap items-stretch space-x-2">
                    <img
                      src={item.media || DEFAULT_IMAGE}
                      className="border-input h-14 w-14 rounded-md border"
                    />
                    <div className="flex flex-1 flex-col gap-0.5">
                      <p className="text-sm font-medium">{item.name}</p>
                      {item.options && (
                        <p className="mt-0.5 text-xs">
                          <span className="font-medium">Dung tích:</span>{' '}
                          {item.options.name}
                        </p>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <FormField
                disabled={isViewMode}
                control={form.control}
                name="rating"
                render={({ field, formState }) => (
                  <FormItem className="grid place-content-center">
                    <FormMessage className="text-center" />
                    <FormControl>
                      <Rating
                        className="text-yellow-400"
                        defaultValue={formState.defaultValues!.rating}
                        onValueChange={(value) => field.onChange(value)}
                        readOnly={isViewMode}
                      >
                        {Array.from({
                          length: SendReviewSchema.shape.rating.maxValue!,
                        }).map((_, index) => (
                          <RatingButton key={index} size={70} />
                        ))}
                      </Rating>
                    </FormControl>
                    <FormDescription className="text-center text-base">
                      {field.value ? (
                        <span className="place-content-center text-base font-medium text-yellow-400">
                          {feeling[field.value]}
                        </span>
                      ) : (
                        <span>
                          Từ {SendReviewSchema.shape.rating.minValue} sao đến{' '}
                          {SendReviewSchema.shape.rating.maxValue} sao theo chất
                          lượng sản phẩm bạn nhận được
                        </span>
                      )}
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                disabled={isViewMode}
                render={({ field }) => (
                  <FormItem className="grid">
                    <FormLabel className="text-black">
                      Nội dung đánh giá{' '}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={20} readOnly={isViewMode} />
                    </FormControl>
                    <FormDescription>
                      Tối thiểu {SendReviewSchema.shape.content.minLength} ký tự
                      và tối đã {SendReviewSchema.shape.content.maxLength} ký tự
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  type="reset"
                  className="hover:text-white"
                  onClick={() => form.reset()}
                >
                  {isViewMode ? 'Đóng' : 'Hủy'}
                </Button>
              </DialogClose>

              {(() => {
                const isContainUpdatedAt =
                  existedReview?.updatedAt &&
                  existedReview.hasOwnProperty('updatedAt');
                console.log(existedReview?.updatedAt);
                const isEditingAllowed =
                  !isViewMode && existedReview && !isContainUpdatedAt;
                const isNewMode = !existedReview;
                const canEdit = isViewMode && !isContainUpdatedAt;

                if (!isViewMode || isNewMode) {
                  if (isEditingAllowed) {
                    return (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button type="button">Xác nhận</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Bạn có chắc chắn với đánh giá muốn chỉnh sửa
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Một khi đã chỉnh sửa thì không thể thao tác hành
                              động này thêm lần nào nữa. Nếu bạn đã chắc chắn
                              hãy nhấn nút "Đồng ý"
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="hover:text-white">
                              Hủy
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => form.handleSubmit(onSubmit)()}
                            >
                              Đòng ý
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    );
                  }

                  return <Button type="submit">Xác nhận</Button>;
                }

                if (canEdit) {
                  return (
                    <Button type="button" onClick={() => setIsViewMode(false)}>
                      Chỉnh sửa
                    </Button>
                  );
                }

                return null;
              })()}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default ReviewDialog;
