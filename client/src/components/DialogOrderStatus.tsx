import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  useChangeStatusMutation,
  useGetOrderStatusAllowChangeQuery,
} from '@/features/manager/order/order.api';
import { closeDialogUpdate } from '@/features/manager/order/order.slice';
import { useAppDispatch, useAppSelector } from '@/hooks/use-store';
import { ReactNode, useEffect } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import {
  OrderChangeStatusSchema,
  OrderChangeStatusType,
} from '@/types/order.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { statusOrder } from '@/utils/const.util';
import { toast } from 'sonner';

const DialogOrderStatus = () => {
  const isOpenDialogUpdate = useAppSelector(
    (state) => state.orderManagerSlice.isOpenDialogUpdate,
  );
  const { orderId, currentStatus } = useAppSelector(
    (state) => state.orderManagerSlice,
  );
  const { data } = useGetOrderStatusAllowChangeQuery(orderId as number, {
    skip: !orderId,
  });
  const [changeStatus] = useChangeStatusMutation();
  const dispatch = useAppDispatch();

  const onSubmit = (data: OrderChangeStatusType) => {
    console.log('Submitting form with data:', data);
    if (orderId)
      changeStatus({
        id: orderId,
        status: data.status,
      }).then(() => {
        toast.success('Thay đổi trạng thái đơn hàng thành công');
        dispatch(closeDialogUpdate());
      });
  };

  const form = useForm<OrderChangeStatusType>({
    resolver: zodResolver(OrderChangeStatusSchema),
  });

  const errors = form.formState.errors;

  useEffect(() => {
    // This will run whenever errors change
    if (Object.keys(errors).length > 0) {
      console.log('Validation errors detected:', errors);
      // For example, show a toast or focus the first error field
    }
  }, [errors]);

  return (
    <Dialog
      open={isOpenDialogUpdate}
      onOpenChange={(open) => {
        if (!open) {
          dispatch(closeDialogUpdate());
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Thay đổi trạng thái</DialogTitle>
              <DialogDescription>
                Việc thay đổi trạng thái đơn hàng sẽ ảnh hưởng đến quá trình xử
                lý đơn hàng của bạn. Vui lòng chọn trạng thái phù hợp với tình
                trạng hiện tại của đơn hàng.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trạng thái thay đổi</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={currentStatus}
                    >
                      <FormControl>
                        <SelectTrigger className="mt-3">
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(statusOrder).map(([key, value]) => {
                          const isDisabled = data
                            ? !data.includes(key as keyof typeof statusOrder)
                            : true;
                          return (
                            <SelectItem
                              disabled={isDisabled}
                              key={key}
                              value={key}
                            >
                              {value}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button loading={form.formState.isSubmitting} variant="outline">
                  Đóng
                </Button>
              </DialogClose>
              <Button type="submit" disabled={data?.length == 0}>
                Thay đổi
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogOrderStatus;
