"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "@/redux/api/authApi";
import { Error_Modal, Success_model } from "@/utils/models";
import { TError } from "@/types/types";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { setUser } from "@/redux/features/authSlice";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import Loading from "@/utils/Loading";

// Define form data types
interface FormData {
  email: string;
  password: string;
}

const SignForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await login(data).unwrap();
      if (res?.data?.accessToken) {
        Success_model({ title: "Login Successful" });
        dispatch(
          setUser({
            user: jwtDecode(res?.data?.accessToken),
            token: res?.data?.accessToken,
          }),
        );
        router.push("/");
        router.refresh();
      }
    } catch (error: TError | any) {
      Error_Modal({ title: error?.data?.message });
    }
  };

  return (
    <div>
      <Card className="lg:w-[650px]">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-semibold">
            Sign In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
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

              {/* Input password with eye icon to toggle visibility */}
              <div className="relative flex flex-col space-y-1.5">
                <Input
                  id="password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
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

              {/* Remember me and forget password section */}
              <div className="flex flex-col justify-between gap-y-3 md:flex-row">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label htmlFor="terms" className="text-secondary-gray">
                    Remember me
                  </label>
                </div>
                <Link href="/forget-password">
                  <p className="text-secondary-gray">Forget Password</p>
                </Link>
              </div>

              {/* Login button */}
              <Button
                disabled={isLoading}
                type="submit"
                className="rounded-full bg-primary-color"
              >
                {isLoading && <Loading color="#fff"></Loading>}
                Login
              </Button>
            </div>
          </form>
        </CardContent>

        {/* Footer with link to register */}
        <CardFooter className="flex justify-center gap-1">
          <p className="text-secondary-gray">Don’t have account?</p>
          <Link href={"/sign-up"}>
            <span className="text-lg font-medium"> Register </span>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignForm;
