'use client';
import signOut from '@/components/auth/signOut';
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
import { HOME_PAGE, LOCAL_STORAGE } from '@/utils/const.util';
import { setAuthState } from '@/features/auth/auth.slice';
import { useAppDispatch } from '@/hooks/use-store';
import { useRouter } from 'next/navigation';

type LogoutButtonProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const LogoutFrame = ({ open, setOpen }: LogoutButtonProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Ở lại
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              localStorage.setItem(LOCAL_STORAGE.LOGOUT, 'true');
              signOut().then(() => {
                dispatch(
                  setAuthState({
                    accessToken: null,
                    expiresAt: null,
                    user: null,
                    status: 'un-authenticated',
                  }),
                );
                router.replace(HOME_PAGE);
              });
            }}
          >
            Tiếp tục
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutFrame;
