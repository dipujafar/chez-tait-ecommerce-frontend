import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { TReview } from "@/types/types";
import Empty from "@/utils/Empty";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";

const feedbackData = [
  {
    name: "John Doe",
    image: "/user1.png",
    rating: 4.5,
    feedback: "Great product! Highly recommend it.",
    time: "2 hours ago",
  },
  {
    name: "Jane Smith",
    image: "/user2.png",
    rating: 4.0,
    feedback:
      "TKeep the soil evenly moist for the healthiest growth. If the sun gets too hot, Chinese cabbage tends to or go to seed; in long periods of heat, some kind of shade may be helpful. Watch out for snails, as they will harm the plants.",
    time: "1 day ago",
  },
  {
    name: "Michael Johnson",

    rating: 5.0,
    feedback: "Absolutely amazing! Exceeded my expectations.",
    time: "3 days ago",
  },
  {
    name: "Emily Davis",
    image: "/user3.png",
    rating: 3.5,
    feedback: "Decent experience, but some features were lacking.",
    time: "5 days ago",
  },
  {
    name: "David Lee",
    image: "/use2.png",
    rating: 4.8,
    feedback: "Fantastic! Will definitely use this again.",
    time: "1 week ago",
  },
];
const CustomerFeedbacks = ({ reviews }: { reviews: TReview[] }) => {
  const [showFeedbacks, setShowFeedbacks] = useState(4);
  return (
    <div>
      <h1 className="text-2xl font-bold lg:text-4xl">Customer Feedback</h1>

      {reviews?.length ? (
        <div className="lg:w-3/4">
          {/*feedbacks */}
          {reviews?.slice(0, showFeedbacks)?.map((review, index) => (
            <div className="mt-6" key={index} id="#reviews">
              <div>
                <div className="flex justify-between gap-x-8">
                  <div className="flex items-center gap-3">
                    {review?.user?.image ? (
                      <Image
                        src={review?.user?.image}
                        alt="userImage"
                        width={950}
                        height={700}
                        className="size-14 rounded-full"
                      ></Image>
                    ) : (
                      <Image
                        src="/nonUser.png"
                        alt="userImage"
                        width={950}
                        height={700}
                        className="size-14 rounded-full"
                      ></Image>
                    )}

                    <div>
                      <h1 className="text-lg font-medium text-primary-black">
                        {review?.user?.name ? review?.user?.name : "Anonymous"}
                      </h1>
                      <Rating rating={review?.rating} className="w-24"></Rating>
                    </div>
                  </div>
                  <p className="text-primary-gray">
                    {moment(review?.createdAt).format(" Do MMMM YYYY , h:mm")}
                  </p>
                </div>
                <p className="mt-4 max-w-5xl text-primary-gray">
                  {review?.comment}
                </p>
              </div>
              {index === 3 ? "" : <hr className="mt-5" />}
            </div>
          ))}
          <div className="mt-5 flex justify-end">
            {showFeedbacks > reviews?.length ? (
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => setShowFeedbacks(4)}
                disabled={showFeedbacks <= 4}
              >
                Show {showFeedbacks <= 4 ? "more" : "Less"}
              </Button>
            ) : (
              <Button
                variant="outline"
                className="rounded-full"
                disabled={showFeedbacks >= reviews?.length}
                onClick={() => setShowFeedbacks(showFeedbacks + 4)}
              >
                Show More
              </Button>
            )}
          </div>
        </div>
      ) : (
        <Empty message="No feedbacks yet"></Empty>
      )}
    </div>
  );
};

export default CustomerFeedbacks;
