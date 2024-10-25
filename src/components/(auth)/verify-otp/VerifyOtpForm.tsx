"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  useForgetPassMutation,
  useVerifyOtpMutation,
} from "@/redux/api/authApi";
import { Error_Modal, Success_model } from "@/utils/models";
import { TError } from "@/types/types";
import { LoadingButton } from "@/components/ui/loading-button";
import { Dot, RotateCcw } from "lucide-react";
import { text } from "stream/consumers";
import Loading from "@/utils/Loading";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface FormData {
  otp: string;
}

const VerifyOtpForm = () => {
  const [otp, setValue] = useState<string>("");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [forgetPass, { isLoading: isOtpSending }] = useForgetPassMutation();
  const email = useSearchParams()?.get("email");
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async () => {
    const signUpToken = sessionStorage.getItem("signUpToken");
    try {
      const res = await verifyOtp({ otp }).unwrap();
      if (res?.data?.token && signUpToken) {
        router.push("/sign-in");
        Success_model({ title: "Otp verified successfully." });
        sessionStorage.removeItem("signUpToken");
        return;
      }

      if (res?.data?.token) {
        router.push("/set-new-password");
        sessionStorage.setItem("token", res?.data?.token);
        Success_model({ title: "Otp verified successfully." });
        return;
      }
    } catch (error: TError | any) {
      Error_Modal({ title: error?.data?.message });
    }
  };

  const handleResendOtp = async () => {
    try {
      await forgetPass({ email: email }).unwrap();
      toast.success(" Resend OTP successfully, Check your email", {
        position: "top-center",
      });
    } catch (error: TError | any) {
      Error_Modal({ title: error?.data?.message });
    }
  };

  return (
    <div>
      <Card className="lg:w-[650px]">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-semibold">
            Verify OTP
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center justify-center gap-4">
              {/* OTP Input */}
              <div className="flex flex-col space-y-1.5">
                <InputOTP maxLength={6} onChange={(value) => setValue(value)}>
                  <InputOTPGroup>
                    {Array.from({ length: 6 }, (_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="border-primary-black/70"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
            <p className="px-4" onClick={handleResendOtp}>
              {isOtpSending ? (
                <span className="flex justify-end">
                  <Loading size={20} />
                </span>
              ) : (
                <span className="flex cursor-pointer items-center justify-end gap-x-1">
                  <RotateCcw size={16} /> Resend OTP
                </span>
              )}
            </p>
            {/* Submit button */}
            <Button
              disabled={!otp || isLoading}
              type="submit"
              className="mt-1 w-full rounded-full bg-primary-color"
            >
              {isLoading && <Loading size={20} color="#fff" />}
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOtpForm;
