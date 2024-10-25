"use client";
import img2 from "@/assets/images/home_bg_2.png";
import img3 from "@/assets/images/home_bg_3.png";
import img4 from "@/assets/images/hero-image-5.png";
import img5 from "@/assets/images/hero-image-6.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import Animatetext from "@/components/Animation/Animatetext";
import Autoplay from "embla-carousel-autoplay";
import "./style.css";
import ArrowCircleButton from "./ArrowCircleButton";

const carouselData = [
  {
    image: "/hero-image-1.png",
    title: "Best Home Appliance Products",
    description: "100+ Collections for your outfit inspirations in this summer",
  },
  {
    image: "/fashionProduct.jpg",
    title: "Best Home Appliance Products",
    description: "100+ Collections for your outfit inspirations in this summer",
  },
  {
    image: "/laptopImage.jpg",
    title: "Best Home Appliance Products",
    description: "100+ Collections for your outfit inspirations in this summer",
  },
];

const HeroSection = () => {
  return (
    <div className="mt-6">
      <div>
        <div className="grid grid-cols-1 gap-3 overflow-hidden xl:grid-cols-3 2xl:max-h-[650px]">
          <div className="col-span-2 rounded-md">
            <Carousel
              opts={{
                loop: true,
                duration: 55,
                align: "start",
              }}
              plugins={[
                Autoplay({
                  delay: 3500,
                  stopOnInteraction: false,
                  stopOnMouseEnter: true,
                }),
              ]}
              className="w-full pl-4 pr-2 xl:h-[550px] 2xl:max-h-[650px]"
            >
              <CarouselContent className="relative">
                {carouselData?.map((data, index) => (
                  <CarouselItem key={index}>
                    <Card className="rounded-3xl">
                      <CardContent className="relative px-0 pb-0">
                        <Image
                          src={data?.image}
                          width={1950}
                          height={1700}
                          alt="banner_image"
                          className="h-full min-h-[350px] rounded-3xl brightness-75 md:h-[450px] lg:h-[550px] xl:h-[550px]"
                        />
                        <div className="absolute left-8 top-8 z-20 text-primary-white md:left-12 md:top-16 lg:top-20">
                          <h1 className="max-w-md text-3xl font-bold md:text-5xl lg:text-6xl">
                            <Animatetext x={20} duration={0.3}>
                              {data?.title.split(" ")[0]}
                            </Animatetext>
                          </h1>
                          <h1 className="text-3xl font-bold md:text-5xl lg:text-6xl">
                            <Animatetext
                              x={25}
                              duration={0.5}
                              className="inline-block"
                            >
                              {data?.title.split(" ")[1]}
                            </Animatetext>{" "}
                            <Animatetext
                              x={-30}
                              duration={1}
                              className="inline-block"
                            >
                              {data?.title?.split(" ")[2]}{" "}
                            </Animatetext>
                          </h1>
                          <h1 className="max-w-md text-3xl font-bold md:text-5xl lg:text-6xl">
                            <Animatetext x={35} duration={1.2}>
                              {data?.title?.split(" ")[3]}
                            </Animatetext>
                          </h1>
                          <Animatetext x={40} duration={1.3}>
                            <p className="md:text-md mt-2 px-2 text-sm lg:mt-4 lg:text-lg">
                              {data?.description}
                            </p>
                          </Animatetext>

                          <Link href="/products">
                            <Animatetext x={45} duration={1.75}>
                              <Button className="mx-auto mt-4 rounded-full lg:mt-8 lg:w-1/2">
                                View Products
                              </Button>
                            </Animatetext>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* <CarouselPrevious className="absolute left-1 bg-primary-color text-primary-white" /> */}
              {/* <CarouselNext className="absolute right-1 bg-primary-color text-primary-white" /> */}
            </Carousel>
          </div>
          <div className="hidden xl:block">
            <Link href="/products">
              <div className="group relative">
                <Image
                  src={img2}
                  alt="banner_image"
                  className="max-h-[270px] w-full rounded-3xl duration-1000 group-hover:scale-95"
                />
                <h1 className="absolute left-8 top-8 z-20 text-3xl font-semibold text-primary-white duration-1000 group-hover:left-10 md:text-4xl">
                  <Animatetext y={20} duration={1} className="inline-block">
                    Indoor
                  </Animatetext>
                  <br />
                  <Animatetext y={-20} duration={1.5} className="inline-block">
                    Active
                  </Animatetext>
                </h1>
              </div>
            </Link>
            <Link href="/products">
              <div className="group relative mt-3">
                <Image
                  src={img3}
                  alt="banner_image"
                  className="max-h-[270px] w-full rounded-3xl duration-1000 group-hover:scale-95"
                />
                <h1 className="absolute left-8 top-8 z-20 text-3xl font-semibold duration-1000 group-hover:left-10 md:text-4xl">
                  <Animatetext y={20} duration={1} className="inline-block">
                    Casual
                  </Animatetext>
                  <br />
                  <Animatetext y={-20} duration={2} className="inline-block">
                    Comfort
                  </Animatetext>
                </h1>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Casual Inspirations section */}
      <div className="mt-3 grid grid-cols-1 items-center gap-3 lg:grid-cols-3">
        <div className="lg:ml-9">
          <h1 className="mt-3 text-3xl font-bold text-primary-black xl:mb-5 xl:text-5xl">
            <Animatetext duration={1.5} x={-20} className="inline-block">
              Casual
            </Animatetext>{" "}
            <br />
            <Animatetext duration={1.5} x={20} className="inline-block">
              Inspirations
            </Animatetext>{" "}
          </h1>
          <Animatetext duration={1} y={-20} className="inline-block">
            <p className="max-w-md text-secondary-gray">
              Our favorite combinations for casual outfit that can inspire you
              to apply on your daily activity.
            </p>
          </Animatetext>
          <Animatetext duration={1} y={20}>
            <Link href={"/products"}>
              <button className="animatebtn mt-3 truncate xl:mt-10">
                BROWSE INSPIRATIONS
              </button>
            </Link>
          </Animatetext>
        </div>
        <Link href="/products">
          <div className="group relative">
            <Image
              src={img4}
              alt="banner_image"
              className="max-h-[319px] w-full rounded-3xl brightness-75 duration-1000 group-hover:scale-95"
            />
            <h1 className="absolute bottom-8 left-8 z-20 text-3xl font-semibold text-primary-white duration-1000 group-hover:bottom-10 group-hover:left-10 md:text-4xl">
              Say it <br />
              with Shirt
            </h1>
            <div className="absolute bottom-4 right-4 z-20 flex size-14 items-center justify-center rounded-full text-3xl font-semibold text-primary-white duration-1000 group-hover:bottom-10 group-hover:right-10 md:text-4xl xl:bottom-8 xl:right-8">
              <ArrowCircleButton></ArrowCircleButton>
            </div>
          </div>
        </Link>

        <Link href="/products">
          <div className="group relative">
            <Image
              src={img5}
              alt="banner_image"
              className="max-h-[319px] w-full rounded-3xl duration-1000 group-hover:scale-95"
            />
            <h1 className="absolute bottom-8 left-8 z-20 text-3xl font-semibold text-primary-white duration-1000 group-hover:bottom-10 group-hover:left-10 md:text-4xl">
              Electronics <br />
              Gadgets
            </h1>
            <div className="-gray absolute bottom-4 right-4 z-20 flex size-14 items-center justify-center rounded-full text-3xl font-semibold text-primary-white duration-1000 group-hover:bottom-10 group-hover:right-10 md:text-4xl xl:bottom-8 xl:right-8">
              <ArrowCircleButton></ArrowCircleButton>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
