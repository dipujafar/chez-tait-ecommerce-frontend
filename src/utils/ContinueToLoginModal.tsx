"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import { Dispatch } from "react";

type TProsType = {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  text?: string;
};

export default function ContinueToLoginModal({
  open,
  setOpen,
  text,
}: TProsType) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="space-y-5">
        <div className="flex items-start gap-x-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-color/75 text-red-500">
            <TriangleAlert size={20} strokeWidth={2.6} />
          </div>

          <div className="space-y-2">
            <h5 className="text-xl font-semibold">Authentication Required</h5>
            <p>
              Please{" "}
              <Link href="/sign-in" className="underline">
                login
              </Link>{" "}
              or{" "}
              <Link href="/sign-up" className="underline">
                create account
              </Link>{" "}
              to {text || "continue"}
            </p>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(!open)}>
            Cancel
          </AlertDialogCancel>
          <Link href="/sign-in">
            <AlertDialogAction className="bg-primary-color">
              Continue to login
            </AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
