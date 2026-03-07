import { Button } from "@/components/ui/button";

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
} from "@/components/ui/alert-dialog";
import logger from "@/config/logger.util";
import httpService from "@/lib/http/http.service";
import { isAxiosError } from "axios";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

type DialogDeleteMediaProps = {
  id: number;
  callback?: () => void;
};

const DialogDeleteMedia = ({ id, callback }: DialogDeleteMediaProps) => {
  const handleClick = async () => {
    try {
      await httpService.delete(`/media/${id}`);
      toast.success("Delete media success");
      callback?.();
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-500 hover:cursor-pointer">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Media {id}</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleClick}
            className="bg-red-500 cursor-pointer"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogDeleteMedia;
