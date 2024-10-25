"use client";

import Container from "@/components/shared/Container";
import { Rating } from "@/components/ui/rating";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Testimonial {
  image: string;
  feedback: string;
  rating: number;
  name: string;
  title: string;
}

const testimonials: Testimonial[] = [
  {
    image: "/customer1.png", // Replace with your image paths
    feedback: `"You won't regret it. I would like to personally thank you for your outstanding product. Absolutely wonderful!"`,
    rating: 5,
    name: "James K.",
    title: "Traveler",
  },
  {
    image: "/customer2.png",
    feedback:
      "Exactly what I was looking for. Thank you for making it painless, pleasant, and hassle-free!",
    rating: 5,
    name: "Susan W.",
    title: "Adventurer",
  },
  {
    image: "/user3.jpg",
    feedback:
      "I would gladly pay over 600 dollars for your service. I am really satisfied with the results!",
    rating: 4,
    name: "Anna B.",
    title: "Backpacker",
  },
  {
    image: "/customer1.png",
    feedback:
      "I would gladly pay over 600 dollars for your service. I am really satisfied with the results!",
    rating: 4,
    name: "Anna B.",
    title: "Backpacker",
  },
];

const Feedbacks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < testimonials.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <Container>
      <div className="space-y-5 text-center">
        <h1 className="lg:text-4xl text-2xl  font-bold">
          What People Are Saying
        </h1>
        <p className="text-primary-gray ">
          We provide support for more than 15K+ Businesses.
        </p>
      </div>
      {/* feedbacks carosule */}

      <div className="w-full ">
        <div className="relative flex items-center justify-center">
          {/* Previous Slide */}
          {currentIndex > 0 && (
            <div className="hidden lg:block absolute left-72 transform -translate-x-1/2 w-1/4 opacity-50">
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center">
                  <div className="flex-1 ">
                    <div className="lg:w-3/4 mx-auto bg-gray-300">
                      <Image
                        src={testimonials[currentIndex - 1].image}
                        alt={testimonials[currentIndex - 1].name}
                        width={950}
                        height={700}
                        className=" w-full mx-auto max-h-[242px] shadow-xl translate-x-3 -translate-y-3"
                      />
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-gray-700">
                      {testimonials[currentIndex - 1].feedback}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Current Slide */}
          <div className="relative bg-white rounded-lg shadow-md p-6 max-w-3xl w-3/4 z-10">
            <div className="flex flex-col md:flex-row gap-7 items-center">
              {/* Image */}
              <div className="flex-1">
                <div className="lg:w-3/4 mx-auto bg-gray-300">
                  <Image
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    width={950}
                    height={700}
                    className=" w-full mx-auto h-[242px] shadow-xl translate-x-3 -translate-y-3"
                  />
                </div>
              </div>

              {/* Testimonial Content */}
              <div className=" flex-1 flex flex-col ">
                {/* Feedback */}
                <p className="text-gray-700 mb-4">
                  {currentTestimonial.feedback}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <Rating rating={5} className="w-24"></Rating>
                </div>
                <hr />
                {/* Name and Title */}
                <h3 className=" mt-4 text-lg font-bold text-gray-900 text-center lg:text-start">
                  {currentTestimonial.name}
                </h3>
                <p className="text-gray-500 text-center lg:text-start">
                  {currentTestimonial.title}
                </p>
              </div>
            </div>
          </div>

          {/* Next Slide */}
          {currentIndex < testimonials.length - 1 && (
            <div className="hidden lg:block absolute right-72 transform translate-x-1/2 w-1/4 opacity-50">
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex gap-2 items-center">
                  <div className="flex-1">
                    <div className="lg:w-3/4 mx-auto bg-gray-300">
                      <Image
                        src={testimonials[currentIndex + 1].image}
                        alt={testimonials[currentIndex + 1].name}
                        width={950}
                        height={700}
                        className=" w-full mx-auto max-h-[242px] shadow-xl translate-x-3 -translate-y-3"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700">
                      {testimonials[currentIndex + 1].feedback}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:mt-14 mt-7 flex justify-center">
          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            className={`${
              currentIndex === 0 ? "cursor-not-allowed " : "text-black"
            } z-10 mx-4 bg-primary-white shadow-xl size-14 flex justify-center items-center rounded-full`}
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className={`${
              currentIndex === testimonials.length - 1
                ? "cursor-not-allowed text-gray-400"
                : "text-black"
            } z-10 mx-4 bg-primary-white shadow-xl size-14 flex justify-center items-center rounded-full`}
            disabled={currentIndex === testimonials.length - 1}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Feedbacks;
