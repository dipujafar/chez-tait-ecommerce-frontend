"use client";
import { useGetSingleProductQuery } from "@/redux/api/productsApi";
import CustomerFeedbacks from "./CustomerFeedbacks";
import ProductDetails from "./ProductDetails";
import RelatedProducts from "./RelatedProducts";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailsContainer = ({ productsId }: { productsId: string }) => {
  const { data: productData, isLoading: isProductDataLoading } =
    useGetSingleProductQuery(productsId);

  return isProductDataLoading ? (
    <div className="space-y-16">
      <div className="flex flex-col gap-10 lg:flex-row">
        <Skeleton className="lg:w- h-[350px] w-full rounded-xl"></Skeleton>
        <Skeleton className="h-[350px] w-full rounded-xl"></Skeleton>
      </div>
      <Skeleton className="h-[350px] w-full rounded-xl"></Skeleton>
    </div>
  ) : (
    <div className="space-y-24">
      <ProductDetails productData={productData?.data}></ProductDetails>
      <CustomerFeedbacks
        reviews={productData?.data?.reviews}
      ></CustomerFeedbacks>
      <RelatedProducts
        categoryId={productData?.data?.category?._id}
        productsId={productsId}
      ></RelatedProducts>
    </div>
  );
};

export default ProductDetailsContainer;
