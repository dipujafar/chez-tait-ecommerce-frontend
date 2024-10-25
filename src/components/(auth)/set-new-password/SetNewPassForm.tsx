"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useReSetPasswordMutation } from "@/redux/api/authApi";
import { Error_Modal, Success_model } from "@/utils/models";
import { LoadingButton } from "@/components/ui/loading-button";
import { TError } from "@/types/types";

// Define form data types
interface FormData {
  newPassword: string;
  confirmPassword: string;
}

const SetNewPassForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const router = useRouter();
  const [resetPassword, { isLoading }] = useReSetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = async (data: FormData) => {
    if (data.newPassword !== data.confirmPassword) {
      Error_Modal({
        title: "Confirm Password do not match with New Password!",
      });
      return null;
    }

    try {
      await resetPassword(data).unwrap();
      Success_model({ title: "Password reset successfully!!" });
      router.push("/sign-in");
    } catch (error: TError | any) {
      Error_Modal({ title: error?.data?.message });
    }
  };

  return (
    <div>
      <Card className="md:w-[650px]">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-semibold">
            Set New Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              {/* Input password with eye icon to toggle visibility */}
              <div className="relative flex flex-col space-y-1.5">
                <Input
                  id="newPassword"
                  placeholder="New Password"
                  type={showPassword ? "text" : "password"}
                  {...register("newPassword", {
                    required: "New Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                      message:
                        "Password must contain an uppercase letter and a symbol",
                    },
                  })}
                />
                {errors.newPassword && (
                  <p className="text-sm text-red-500">
                    {errors.newPassword.message}
                  </p>
                )}
                {/* Eye icon to toggle password visibility */}
                <div
                  className="absolute right-3 top-1/3 -translate-y-1/2 transform cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff color="#1A1A1A" />
                  ) : (
                    <Eye color="#1A1A1A" />
                  )}
                </div>
              </div>

              {/* Input Confirm Password with eye icon to toggle visibility */}
              <div className="relative flex flex-col space-y-1.5">
                <Input
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
                {/* Eye icon to toggle password visibility */}
                <div
                  className="absolute right-3 top-1/3 -translate-y-1/2 transform cursor-pointer"
                  onClick={() => setConfirmShowPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff color="#1A1A1A" />
                  ) : (
                    <Eye color="#1A1A1A" />
                  )}
                </div>
              </div>

              {/* Login button */}
              <LoadingButton
                loading={isLoading}
                type="submit"
                className="rounded-full bg-primary-color"
              >
                Create Account
              </LoadingButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetNewPassForm;
