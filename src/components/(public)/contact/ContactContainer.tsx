"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSendSupportMessageMutation } from "@/redux/api/contentApi";
import { TError } from "@/types/types";
import { Error_Modal, Success_model } from "@/utils/models";
import Loading from "@/utils/Loading";

type TFormInput = {
  firstName: string;
  lastName: string;
  email: string;
  description: string;
};

const ContactContainer: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormInput>();

  const [sendMessage, { isLoading }] = useSendSupportMessageMutation();

  const onSubmit: SubmitHandler<TFormInput> = async (data) => {
    try {
      const res = await sendMessage(data).unwrap();

      Success_model({
        title: "Successfully received your message!!",
        text: "We will contact with you shortly",
      });
    } catch (error: TError | any) {
      Error_Modal({ title: error?.data?.message });
    }
  };

  return (
    <div>
      {/* page title */}
      <div className="space-y-1 text-center text-primary-black">
        <h1 className="text-6xl font-bold">Contact</h1>
        <p className="text-xl">We are available 24/7, 7 days a week.</p>
        <p className="text-xl">Phone: +8801611112222</p>
      </div>

      {/* form */}
      <div className="mt-10">
        <h1 className="text-center text-5xl font-bold text-primary-black">
          Send a Message
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-6 w-full space-y-5">
            {/* input first name and last name */}
            <div className="flex flex-col items-center gap-x-8 gap-y-5 md:flex-row">
              <div className="w-full">
                <Input
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  id="firstName"
                  placeholder="First name"
                  className="rounded-full"
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <Input
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  id="lastName"
                  placeholder="Last name"
                  className="rounded-full"
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* input email */}
            <div className="w-full">
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Please enter a valid email address",
                  },
                })}
                id="email"
                placeholder="Your mail"
                className="rounded-full"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* input description */}
            <div className="w-full">
              <Textarea
                {...register("description", {
                  required: "Message is required",
                })}
                placeholder="Type your message here."
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* submit button */}
            <Button
              className="w-full rounded-full bg-primary-color"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Loading color="#fff"></Loading>}
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactContainer;
