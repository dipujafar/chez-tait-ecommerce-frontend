"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { RangeSlider } from "@/components/ui/slider";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Rating } from "@/components/ui/rating";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useGetCategoriesQuery } from "@/redux/api/categoriesApi";
import { TCategory, TProduct } from "@/types/types";
import Loading from "@/utils/Loading";
import { useGetProductsQuery } from "@/redux/api/productsApi";
import ProductCardSkeleton from "@/utils/ProductCardSkeleton";
import Empty from "@/utils/Empty";
import { Pagination } from "react-pagination-bar";
import "react-pagination-bar/dist/index.css";
import { useSearchParams } from "next/navigation";
import FavoriteProductButton from "@/utils/FavoriteProductButton";
import AddToCartButton from "@/utils/AddToCartButton";
import { childrenVariants, parentVariants } from "@/utils/framerMotion";

const ProductsContainer = () => {
  const [startIndex, setStartIndex] = useState(0);
  const searchParams = useSearchParams();
  const searchCategory = searchParams.get("category");
  const searchTerm = searchParams.get("searchTerm");

  const { data: categoriesData, isLoading: isCategoriesDataLoading } =
    useGetCategoriesQuery(undefined);
  const visibleCategories = 7;
  const maxIndex = categoriesData?.data?.data?.length - visibleCategories;
  const [search, setSearch] = useState(searchTerm || "");
  const [priceValue, setPriceValue] = useState<number[]>([0, 0]);
  const [selectedCategory, setSelectedCategory] = useState(
    searchCategory || "",
  );

  // pagination related states
  const [currentPage, setCurrentPage] = useState(1);
  const pagePostsLimit = 12;

  const query: Record<string, any> = {};
  query["page"] = currentPage;
  query["limit"] = pagePostsLimit;

  if (priceValue[1] > 0) {
    query["price"] = `${priceValue[0]}-${priceValue[1]}`;
  }

  if (selectedCategory) {
    query["category"] = selectedCategory;
  }

  if (search) {
    query["searchTerm"] = search;
  }

  // products data
  const { data: productsData, isLoading: isProductDataLoading } =
    useGetProductsQuery(query || undefined);
  const meta = productsData?.data?.meta;

  useEffect(() => {
    setSelectedCategory(searchCategory || "");
    setSearch(searchTerm || "");
  }, [searchTerm, searchCategory]);

  const handlePriceSliderChange = (value: number[]) => {
    setPriceValue(value);
  };

  const handlePrevClick = () => {
    setStartIndex((prev) => Math.max(0, prev - visibleCategories));
  };

  const handleNextClick = () => {
    setStartIndex((prev) => Math.min(maxIndex, prev + visibleCategories));
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-20 2xl:grid-cols-4">
        {/* Sidebar */}
        <div className="col-span-1 space-y-8">
          {/* Search bar */}
          <div className="relative flex items-center">
            <Input
              type="text"
              placeholder="Search"
              className="w-full rounded-full pl-9"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 font-light" size={20} />
          </div>

          {/* Category List */}
          <div className="relative">
            <div className="flex-1">
              <h1 className="mb-3 text-2xl font-bold">All Categories</h1>
              {isCategoriesDataLoading ? (
                <Loading className="mx-auto h-[50px] w-full" />
              ) : (
                /* Category radio list */

                <RadioGroup className="mx-2 space-y-3">
                  <div className="ml-5 flex items-center space-x-2" key={0}>
                    <RadioGroupItem
                      onClick={() => setSelectedCategory("")}
                      value={"all-categories"}
                      id={`r${0}`}
                      className=""
                    />
                    <Label>All Categories</Label>
                  </div>

                  {categoriesData?.data?.data
                    ?.slice(startIndex, startIndex + visibleCategories)
                    .map((category: TCategory, inx: number) => (
                      <div
                        className="flex items-center space-x-2"
                        key={inx + 1}
                      >
                        {/* Dot with custom color */}
                        <div className="h-3 w-3 rounded-full" />
                        <RadioGroupItem
                          onClick={() => setSelectedCategory(category?._id)}
                          value={category?.name}
                          id={`r${inx + 1}`}
                          className=""
                        />

                        <Label>{category?.name}</Label>
                      </div>
                    ))}
                </RadioGroup>
              )}
            </div>

            {/* Arrow controls for navigation */}
            {categoriesData?.data?.data?.length > visibleCategories && (
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={handlePrevClick}
                  disabled={startIndex === 0}
                  className="absolute right-0 top-0 rounded-full bg-gray-200 p-2 shadow-md duration-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  <ChevronUp size={24} />
                </button>
                <button
                  onClick={handleNextClick}
                  disabled={startIndex >= maxIndex}
                  className="absolute bottom-0 right-0 rounded-full bg-gray-200 p-2 shadow-md duration-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  <ChevronDown size={24} />
                </button>
              </div>
            )}
          </div>

          {/* price */}
          <div>
            <h1 className="mb-3 text-2xl font-bold">Price</h1>
            {/* price filter slider */}
            <RangeSlider
              value={priceValue}
              onValueChange={handlePriceSliderChange}
              max={priceValue[1] >= 950 ? priceValue[1] + 100 : 1000}
              step={1}
              className="w-[60%]"
            />
            <p className="mt-4">
              Price : ${priceValue[0]} - ${priceValue[1]}
            </p>
          </div>
        </div>

        {/* Products section */}
        <div className="2xl:col-span-3">
          {/* Header */}
          <h1 className="text-end text-lg font-medium">
            <span className="font-bold">
              {productsData?.data?.allProducts?.length}
            </span>{" "}
            Results Found
          </h1>

          {/* display products */}
          {isProductDataLoading ? (
            <div className="mt-7 grid grid-cols-1 gap-x-2 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <ProductCardSkeleton key={index}></ProductCardSkeleton>
              ))}
            </div>
          ) : productsData?.data?.allProducts?.length > 0 ? (
            <AnimatePresence>
              <motion.div
                initial={{ y: "10%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "10%", opacity: 0 }}
              >
                <motion.div
                  variants={parentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="mt-5 grid grid-cols-1 justify-between gap-x-5 gap-y-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
                >
                  {productsData?.data?.allProducts?.map(
                    (product: TProduct, inx: number) => (
                      <motion.div variants={childrenVariants} key={inx}>
                        <Card className="group">
                          <CardContent className="relative">
                            <Link href={`/products/${product?._id}`}>
                              <Image
                                src={product?.images[0]?.url}
                                alt="product_image"
                                width={1950}
                                height={1000}
                                className="h-[250px] w-full rounded-xl duration-1000 group-hover:scale-95"
                              ></Image>
                            </Link>
                            <div>
                              <FavoriteProductButton
                                className="absolute right-2 top-0"
                                productId={product?._id}
                              ></FavoriteProductButton>
                              {Number(product?.stock) <= 0 && (
                                <div className="group absolute left-2 top-0 flex items-center justify-center rounded-md bg-primary-black px-2 py-1 text-primary-white duration-1000 group-hover:left-4">
                                  Out of Stock
                                </div>
                              )}

                              {Number(product?.stock) > 0 &&
                                product?.discount > 0 && (
                                  <div className="group absolute left-2 top-0 flex items-center justify-center rounded-md bg-primary-color px-2 py-1 text-primary-white duration-1000 group-hover:left-4">
                                    Sale {product?.discount}% off
                                  </div>
                                )}
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between duration-1000 group-hover:px-8">
                            <Link href={`/products/${product?._id}`}>
                              <div>
                                <div>
                                  <p className="font-bold text-primary-color">
                                    {product?.name}
                                  </p>
                                  <p className="font-medium">
                                    ${product?.price}
                                  </p>

                                  <Rating
                                    rating={product?.avgRating || 0}
                                    className="w-20"
                                  ></Rating>
                                </div>
                              </div>
                            </Link>
                            <AddToCartButton
                              cartData={product}
                            ></AddToCartButton>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ),
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <Empty message="No products found"></Empty>
          )}
        </div>
      </div>

      {/* pagination */}
      <div className="mt-10 text-end">
        <Pagination
          currentPage={currentPage}
          itemsPerPage={pagePostsLimit}
          onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
          totalItems={meta?.total}
          pageNeighbours={2}
        />
      </div>
    </>
  );
};

export default ProductsContainer;
