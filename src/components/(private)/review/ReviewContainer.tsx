"use client";
import { Button } from "@/components/ui/button";
import { InputRating } from "@/components/ui/inputrating";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progressbar";
import { Textarea } from "@/components/ui/textarea";
import { useShareProductReviewMutation } from "@/redux/api/productsApi";
import { TError } from "@/types/types";
import Loading from "@/utils/Loading";
import { Error_Modal, Success_model } from "@/utils/models";
import { Star } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
  comment: number;
};

const ReviewContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const productId = useSearchParams()?.get("product");
  const [selectRating, setSelectRating] = useState(0);
  const [review, { isLoading: isReviewLoading }] =
    useShareProductReviewMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (selectRating === 0) {
      Error_Modal({ title: "Please select rating" });
      return;
    }

    const feedbackData = {
      rating: selectRating,
      comment: data.comment,
      product: productId,
    };

    try {
      await review(feedbackData).unwrap();
      Success_model({
        title: "Thank you for your feedback",
        text: "We really appreciate your feedback",
      });
      router.push(`/products/${productId}#reviews`);
    } catch (error: TError | any) {
      Error_Modal({ title: error?.data?.message });
    }
  };

  const handleRatingChange = (newRating: number) => {
    setSelectRating(newRating);
  };

  return (
    <div className="space-y-8 lg:space-y-20">
      <div className="flex flex-col justify-center gap-5 md:flex-row lg:gap-x-40">
        <div className="flex justify-center">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-5xl font-medium">4.8</h1>
              <Star fill="#000" size={40}></Star>
            </div>
            <div className="mt-4 w-fit">
              <p>1,64,002 Ratings</p>
              <p className="text-center">&</p>
              <p>5,922 Reviews</p>
            </div>
          </div>
        </div>

        {/* previous ratings */}
        <div className="flex-1">
          <div className="flex items-center gap-14">
            <div className="flex gap-1 text-[#F8B84E]">
              <h1 className="text-xl font-medium">5</h1>
              <Star fill="#F8B84E" />
            </div>
            <Progress
              value={80}
              className="max-h-[14px] max-w-[600px]"
            ></Progress>
          </div>
          <div className="flex items-center gap-14">
            <div className="flex gap-1 text-[#F8B84E]">
              <h1 className="text-xl font-medium">4</h1>
              <Star fill="#F8B84E" />
            </div>
            <Progress
              value={50}
              className="max-h-[14px] max-w-[600px]"
            ></Progress>
          </div>
          <div className="flex items-center gap-14">
            <div className="flex gap-1 text-[#F8B84E]">
              <h1 className="text-xl font-medium">3</h1>
              <Star fill="#F8B84E" />
            </div>
            <Progress
              value={60}
              className="max-h-[14px] max-w-[600px]"
            ></Progress>
          </div>
          <div className="flex items-center gap-14">
            <div className="flex gap-1 text-[#F8B84E]">
              <h1 className="text-xl font-medium">2</h1>
              <Star fill="#F8B84E" />
            </div>
            <Progress
              value={30}
              className="max-h-[14px] max-w-[600px]"
            ></Progress>
          </div>
          <div className="flex items-center gap-14">
            <div className="flex gap-1 text-[#F8B84E]">
              <h1 className="text-xl font-medium">1</h1>
              <Star fill="#F8B84E" />
            </div>
            <Progress
              value={10}
              className="max-h-[14px] max-w-[600px]"
            ></Progress>
          </div>
        </div>
      </div>

      {/* input rating */}
      <div>
        <InputRating
          onRatingChange={handleRatingChange}
          className="w-96"
        ></InputRating>
      </div>

      {/* Feedback message */}
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <Label className="text-2xl text-primary-black">
          Please share your opinion about the product
        </Label>
        <Textarea
          placeholder="type your feedback here"
          className="mt-2 bg-light-gray"
          rows={7}
          {...register("comment", { required: "Feedback is required" })}
        />
        {errors.comment && (
          <span className="text-red-500">{errors.comment.message}</span>
        )}

        {/* submit button */}
        <Button
          disabled={isReviewLoading}
          type="submit"
          className="mt-5 w-full bg-primary-color"
        >
          {isReviewLoading && <Loading size={20} color="#fff"></Loading>}
          Send Review
        </Button>
      </form>
    </div>
  );
};

export default ReviewContainer;
