"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import google from "@/assets/images/google.png";
import Image from "next/image";
import { Error_Modal, Success_model } from "@/utils/models";
import { useSignUpMutation } from "@/redux/api/authApi";
import { LoadingButton } from "@/components/ui/loading-button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TError } from "@/types/types";

// Define form data types
interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [signUp, { isLoading }] = useSignUpMutation();
  const router = useRouter();
  const [isAccepted, setIsAccepted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      Error_Modal({ title: "Confirm Password do not match with Password!" });
      return null;
    }

    const userData = {
      email: data?.email,
      password: data?.password,
      name: data?.name,
    };

    try {
      const res = await signUp(userData).unwrap();

      if (res?.data?.otpToken?.token) {
        sessionStorage.setItem("signUpToken", res?.data?.otpToken?.token);

        Success_model({ title: "Send a One Time Password to your email" });
        router.push("/verify-otp");
      }
    } catch (error: TError | any) {
      Error_Modal({ title: error?.data?.message });
    }
  };

  return (
    <div>
      <Card className="md:w-[650px]">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-semibold">
            Create Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              {/* Input name */}
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="name"
                  placeholder="Name"
                  type="text"
                  {...register("name", {
                    required: "name is required",
                  })}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Input email */}
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Input password  */}
              <div className="relative flex flex-col space-y-1.5">
                <Input
                  id="password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
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
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}

              {/* Input Confirm Password  */}
              <div className="relative flex flex-col space-y-1.5">
                <Input
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                  })}
                />

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
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}

              {/*Accept all terms & Conditions section */}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  onClick={() => setIsAccepted(!isAccepted)}
                />
                <Link href="/terms-condition" className="text-secondary-gray">
                  Accept all terms & Conditions
                </Link>
              </div>

              {/* Login button */}
              <LoadingButton
                disabled={!isAccepted}
                loading={isLoading}
                type="submit"
                className="rounded-full bg-primary-color"
              >
                Create Account
              </LoadingButton>
            </div>
          </form>
        </CardContent>

        <CardFooter className="relative">
          <Button className="w-full" variant="outline">
            Continue with Google
          </Button>
          <Image src={google} alt="google" className="absolute left-12" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpForm;
