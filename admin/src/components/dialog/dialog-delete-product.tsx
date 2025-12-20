import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import logger from "@/config/logger.util";
import httpService from "@/lib/http/http.service";
import { isAxiosError } from "axios";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

type DialogDeleteProductProps = {
  id: number;
};

const DialogDeleteProduct = ({ id }: DialogDeleteProductProps) => {
  const handleClick = async () => {
    try {
      await httpService.delete(`/product/${id}`);
    } catch (e) {
      if (isAxiosError(e)) {
        toast.error(e.code, {
          description: e.response?.data?.message ?? "Not defined",
        });
      } else toast.error("Not define");
      logger.error(e);
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="flex gap-2 items-center">
        <Trash2 />
        Delete
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Product #{id}</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={handleClick}
            className="bg-red-500 cursor-pointer"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDeleteProduct;
