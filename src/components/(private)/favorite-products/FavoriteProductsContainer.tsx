"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Rating } from "@/components/ui/rating";
import { useGetWishListQuery } from "@/redux/api/wishListApi";
import { TWishlistProduct } from "@/types/types";
import Empty from "@/utils/Empty";
import FavoriteProductButton from "@/utils/FavoriteProductButton";
import ProductCardSkeleton from "@/utils/ProductCardSkeleton";
import { products } from "@/utils/products";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FavoriteProductsContainer = () => {
  const { data: wishListData, isLoading: isWishListDataLoading } =
    useGetWishListQuery(undefined);

  return (
    <div>
      <h1 className="text-3xl font-semibold md:text-4xl">Favorite</h1>

      {wishListData?.data?.length ? (
        isWishListDataLoading ? (
          <div className="mt-7 grid grid-cols-1 gap-x-2 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <ProductCardSkeleton key={index}></ProductCardSkeleton>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 justify-between gap-x-5 gap-y-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {wishListData?.data?.map(
              (productItem: TWishlistProduct, inx: number) => (
                <Card className="group" key={inx}>
                  <CardContent className="relative">
                    <Link href={`/products/${productItem?.product?._id}`}>
                      <Image
                        src={productItem?.product?.images[0]?.url}
                        alt="product_image"
                        width={1950}
                        height={1000}
                        className="h-[250px] w-full rounded-xl duration-1000 group-hover:scale-95"
                      ></Image>
                    </Link>
                    <div>
                      <FavoriteProductButton
                        className="absolute right-2 top-0"
                        productId={productItem?.product?._id}
                      ></FavoriteProductButton>
                      {Number(productItem?.product?.stock) === 0 && (
                        <div className="group absolute left-2 top-0 flex items-center justify-center rounded-md bg-primary-black px-2 py-1 text-primary-white duration-1000 group-hover:left-4">
                          Out of Stock
                        </div>
                      )}

                      {Number(productItem?.product?.stock) > 0 &&
                        productItem?.product?.discount > 0 && (
                          <div className="group absolute left-2 top-0 flex items-center justify-center rounded-md bg-primary-color px-2 py-1 text-primary-white duration-1000 group-hover:left-4">
                            Sale{" "}
                            {(
                              (Number(productItem?.product?.discount) /
                                Number(productItem?.product?.price)) *
                              100
                            ).toFixed(0)}
                            % off
                          </div>
                        )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between duration-1000 group-hover:px-8">
                    <Link href={`/products/${productItem?.product?._id}`}>
                      <div>
                        <div>
                          <p className="font-bold text-primary-color">
                            {productItem?.product?.name}
                          </p>
                          <p className="font-medium">
                            ${productItem?.product?.price}
                          </p>
                          <Rating
                            rating={productItem?.product?.avgRating || 0}
                            className="w-20"
                          ></Rating>
                        </div>
                      </div>
                    </Link>
                    <div className="rounded-full bg-light-gray p-3">
                      <ShoppingCart size={20} />
                    </div>
                  </CardFooter>
                </Card>
              ),
            )}
          </div>
        )
      ) : (
        <Empty message="You don't have any favorite products"></Empty>
      )}
    </div>
  );
};

export default FavoriteProductsContainer;
