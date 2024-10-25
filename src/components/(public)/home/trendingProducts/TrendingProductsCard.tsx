"use client";
import { TProduct } from "@/types/types";
import FavoriteProductButton from "@/utils/FavoriteProductButton";
import ProductCardSkeleton from "@/utils/ProductCardSkeleton";

import { motion } from "framer-motion";

import { Heart } from "lucide-react";
import { duration } from "moment";
import Image from "next/image";
import Link from "next/link";

type TProps = {
  productData: TProduct[];
  loading: boolean;
};

const TrendingProductsCard = ({ productData, loading }: TProps) => {
  const containerVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, easeIn: [0.17, 0.67, 0.83, 0.67] },
    },
  };

  const itemVariant = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, easeIn: [0.17, 0.67, 0.83, 0.67] },
    },
  };

  return loading ? (
    <div className="mt-7 grid grid-cols-1 gap-x-2 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, index) => (
        <ProductCardSkeleton key={index}></ProductCardSkeleton>
      ))}
    </div>
  ) : (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      className="mt-7 grid grid-cols-1 gap-x-2 gap-y-5 md:grid-cols-2 lg:grid-cols-3"
    >
      {productData?.slice(0, 9)?.map((product, inx) => (
        <motion.div
          variants={itemVariant}
          className="group relative space-y-1"
          key={product?.name}
        >
          <Link href={`/products/${product?._id}`}>
            <Image
              src={product?.images[0]?.url}
              alt="product_image"
              width={1950}
              height={1000}
              className="h-[256px] w-full rounded-xl duration-1000 group-hover:scale-95"
            ></Image>
          </Link>
          <Link href={`/products/${product?._id}`}>
            <div>
              <h1 className="font-medium text-primary-black duration-1000 group-hover:pl-4">
                {product?.name}
              </h1>
              <p className="font-medium text-primary-gray duration-1000 group-hover:pl-4">
                ${product?.price}
              </p>
            </div>
          </Link>
          <FavoriteProductButton
            className="absolute right-2 top-2"
            productId={product?._id}
          ></FavoriteProductButton>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TrendingProductsCard;
