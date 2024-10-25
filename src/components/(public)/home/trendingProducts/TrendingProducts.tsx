"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TrendingProductsCard from "./TrendingProductsCard";
import { useGetProductsQuery } from "@/redux/api/productsApi";
import Empty from "@/utils/Empty";

const categories = [
  {
    label: "New Arrival",
    value: "newArrival",
  },
  {
    label: "Discount",
    value: "discount",
  },
  {
    label: "Popular",
    value: "popular",
  },
];

const TrendingProducts = () => {
  const [selected, setSelected] = useState("popular");
  const query =
    (selected === "popular" && { sort: "sales" }) ||
    (selected === "discount" && { discount: "!=0" }) ||
    (selected === "newArrival" && undefined);
  const { data: productsData, isLoading: isProductsDataLoading } =
    useGetProductsQuery(query || undefined);

  return (
    <div>
      <hr />
      {/* title and category list */}
      <div className="mt-8 flex flex-col items-center justify-between gap-y-3 lg:flex-row">
        <h1 className="text-4xl font-bold">
          {selected === "newArrival" && "New Arrival"}
          {selected === "popular" && "Trending"}
          {selected === "discount" && "Best Sales Off"}
        </h1>

        <div className="flex items-center">
          {/* categoric list */}
          <div className="flex flex-wrap gap-x-2">
            {categories?.map((category, inx) => (
              <Button
                onClick={() => setSelected(category?.value)}
                key={inx}
                variant="outline"
                className={`rounded-full ${
                  selected === category?.value &&
                  "bg-primary-red text-primary-white"
                } hover:bg-primary-color hover:text-primary-white`}
              >
                {category?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* trending products */}
      {productsData?.data?.allProducts?.length === 0 ? (
        <Empty message="No products found"></Empty>
      ) : (
        <TrendingProductsCard
          productData={productsData?.data?.allProducts}
          loading={isProductsDataLoading}
        ></TrendingProductsCard>
      )}
    </div>
  );
};

export default TrendingProducts;
