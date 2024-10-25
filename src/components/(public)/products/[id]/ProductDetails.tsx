"use client";
import Image from "next/image";
import { MutableRefObject, useState } from "react";
import { Rating } from "@/components/ui/rating";
import { Button } from "@/components/ui/button";

import {
  useKeenSlider,
  KeenSliderPlugin,
  KeenSliderInstance,
} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./productDetails.css";
import { TProduct } from "@/types/types";
import AddToCartButton from "@/utils/AddToCartButton";
import Link from "next/link";
import discountedPrice from "@/utils/discountedPrice";
import { Error_Modal } from "@/utils/models";

function ThumbnailPlugin(
  mainRef: MutableRefObject<KeenSliderInstance | null>,
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

const ProductDetailsContainer = ({
  productData,
}: {
  productData: TProduct;
}) => {
  const [quantity, setQuantity] = useState(1);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
  });
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)],
  );

  console.log(productData?.stock);
  console.log(quantity);

  const handleIncrementQuantity = () => {
    if (quantity >= Number(productData?.stock)) {
      Error_Modal({ title: "Product quantity can't be more than stock!" });
      return;
    }

    setQuantity(quantity + 1);
  };

  const handleDecrementQuantity = () => {
    setQuantity(quantity - 1);
  };

  return (
    <div className="flex flex-col items-center gap-7 lg:flex-row">
      {/* products images */}
      <div className="flex-1">
        {/* products details
        <div className="flex flex-col-reverse items-center gap-3 md:flex-row">
          {/* <Carousel
            opts={{
              align: "start",
            }}
            orientation="vertical"
            className="mt-10 md:mt-0"
          >
            <CarouselContent className="w- -mt-1 max-h-[390px]">
              {productDetailsImage.map((data, index) => (
                <CarouselItem key={index} className="pt-1 md:basis-1/2">
                  <div className="p-1">
                    <Image
                      src={data?.image}
                      alt="product_image"
                      width={950}
                      height={700}
                      className="h-28 w-24"
                    ></Image>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-top-10 shadow-xl" />
            <CarouselNext className="-bottom-10 shadow-xl" />
          </Carousel> */}
        {/* <Image
            src={detailsImage}
            alt="product_image"
            className="h-full md:w-3/4"
          ></Image> */}
        {/* </div>  */}
        {/* _________________________ Product Images Carousel __________________ */}

        <div className="flex-1">
          <div
            ref={sliderRef}
            className="keen-slider mx-auto max-h-[600px] w-full max-w-[300px]"
          >
            {productData?.images.map((image, idx) => (
              <Image
                key={idx}
                src={image?.url}
                alt="product_image"
                width={900}
                height={700}
                className="keen-slider__slide h-[150px] w-[200px] pl-0 md:h-[320px] md:w-[250px]"
              ></Image>
            ))}
          </div>
        </div>

        {/* thumbnail  images  */}

        <div
          ref={thumbnailRef}
          className="thumbnail thumbnail-image mx-auto mt-2 flex justify-center overflow-x-auto md:w-[500px] lg:w-full"
        >
          {productData?.images?.slice(0, 4)?.map((image, idx) => (
            <div key={idx} className="w-fit">
              <Image
                src={image?.url}
                alt="product_image"
                width={950}
                height={700}
                className={`keen-slider__slide slider-image translate-0 ml-2 h-[80px] rounded border border-black/50`}
              ></Image>
            </div>
          ))}
        </div>
      </div>

      {/* product description */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-semibold text-primary-black lg:text-5xl">
            {productData?.name}
          </h1>
          {productData?.stock >= 0 ? (
            <p className="rounded bg-primary-pink px-2 py-1 text-primary-red">
              In Stock
            </p>
          ) : (
            <p className="rounded bg-black px-2 py-1 text-primary-white">
              Out of Stock
            </p>
          )}
        </div>
        {/* rating and review */}
        <Link href={"#reviews"} className="mt-5 flex gap-2">
          <Rating
            rating={Number(productData?.avgRating || 0)}
            className="w-28"
          ></Rating>
          <p className="text-primary-gray">
            <span>{productData?.reviews?.length}</span> Review
          </p>
        </Link>
        {/* price and discount*/}
        {productData?.discount > 0 && (
          <div className="mb-6 mt-2 flex items-center gap-x-3">
            <p className="text-xl text-primary-color">
              <span className="mr-1 font-medium">
                ${discountedPrice(productData?.price, productData?.discount)}
              </span>
              <s className="font-light text-primary-gray">
                ${productData?.price}
              </s>
            </p>
            <p className="rou rounded-full bg-primary-pink px-2 py-1 text-primary-red">
              {productData?.discount}% Off
            </p>
          </div>
        )}
        
        {productData?.discount == 0 && (
          <div className="mb-6 mt-2 flex items-center gap-x-3">
            <span className="ml-2 text-xl font-medium text-primary-color">
              $17.28
            </span>
          </div>
        )}
        <hr />
        {/* category and description */}
        <div className="mt-7">
          <p className="font-medium text-primary-black">
            Category:{" "}
            <span className="font-normal text-primary-gray">
              {productData?.category?.name}
            </span>
          </p>
          <p className="mt-6 max-w-3xl text-primary-gray">
            {productData?.shortDescription}
          </p>

          {/* checkout */}
          <div className="mt-7 flex items-center gap-x-3">
            {/* quantity */}
            <div className="flex items-center gap-x-3 rounded-full border-2">
              <Button
                onClick={handleDecrementQuantity}
                className={`flex size-10 items-center justify-center rounded-full bg-light-gray text-xl text-black shadow-lg duration-500 hover:bg-primary-color hover:text-primary-white`}
                disabled={quantity === 0}
              >
                -
              </Button>
              <p>{quantity}</p>
              <Button
                onClick={handleIncrementQuantity}
                className={`flex size-10 items-center justify-center rounded-full bg-light-gray text-lg text-black shadow-lg duration-500 hover:bg-primary-color hover:text-primary-white`}
              >
                +
              </Button>
            </div>

            {/* checkout btn */}
            {quantity === 0 ? (
              <Button disabled className="w-full rounded-full bg-primary-color">
                Checkout
              </Button>
            ) : (
              <AddToCartButton
                variant="button"
                quantity={quantity || 1}
                cartData={{ ...productData, quantity: quantity || 1 }}
              ></AddToCartButton>
            )}

            <AddToCartButton
              cartData={{ ...productData, quantity: quantity || 1 }}
            ></AddToCartButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsContainer;
