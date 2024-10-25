import { cn } from "@/lib/utils";
import { selectUser } from "@/redux/features/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Heart } from "lucide-react";
import { Error_Modal, Success_model } from "./models";
import {
  useAddWishListMutation,
  useDeleteWishListMutation,
  useGetWishListQuery,
} from "@/redux/api/wishListApi";
import { TError, TWishlistProduct } from "@/types/types";
import Loading from "./Loading";
import { useEffect, useState } from "react";

const FavoriteProductButton = ({
  className,
  productId,
}: {
  className?: string;
  productId: string;
}) => {
  const user = useAppSelector(selectUser)?.userId;
  const [addWishList, { isLoading }] = useAddWishListMutation();
  const [
    deleteWithListProduct,
    { isLoading: isDeleteWishListProductIsLoading },
  ] = useDeleteWishListMutation();
  const [isAlreadyInWishList, setIsAlreadyInWishList] = useState(false);
  const [wishListId, setWishListId] = useState("");

  // const {
  //   data: wishListProductData,
  //   isLoading: wishListProductCheckIngIsLoading,
  // } = useGetSingleWishProductByProductIdQuery(productId || undefined);

  const { data: wistListData } = useGetWishListQuery(undefined);

  // Check if item exits in wishlist
  useEffect(() => {
    if (wistListData && productId) {
      const exist = wistListData?.data?.find(
        (item: TWishlistProduct) => item.product._id === productId,
      );

      setIsAlreadyInWishList(Boolean(exist?._id));

      setWishListId(exist?._id);
    }
  }, [wistListData, productId]);

  // useEffect(() => {
  //   setWishListId(wishListProductData?.data?._id || "");
  //   setIsAlreadyInWishList(wishListProductData?.data ? true : false);
  // }, [wishListProductData]);

  const handleAddWishList = async (id: string) => {
    if (!user) {
      Error_Modal({
        title: "Please login",
        text: "Only logged in users can add to wish list",
      });
      return;
    }

    if (isAlreadyInWishList) {
      try {
        await deleteWithListProduct(wishListId).unwrap();
        Success_model({ title: "Removed from wish list" });
      } catch (error: TError | any) {
        Error_Modal({ title: error?.data?.message });
      }
    }
    if (!isAlreadyInWishList) {
      try {
        await addWishList({ product: id }).unwrap();
        Success_model({ title: "Added to wish list" });
      } catch (error: TError | any) {
        Error_Modal({ title: error?.data?.message });
      }
    }
  };

  return (
    <div
      onClick={() => handleAddWishList(productId)}
      className={cn(
        "flex size-10 items-center justify-center rounded-full bg-gray-200 text-primary-black duration-1000 hover:bg-primary-color hover:text-primary-white group-hover:right-4",
        isAlreadyInWishList && "bg-primary-pink text-primary-white",
        className,
      )}
    >
      {isLoading || isDeleteWishListProductIsLoading ? (
        <Loading className="mr-3"></Loading>
      ) : isAlreadyInWishList ? (
        <Heart className="cursor-pointer" fill="#EA5326" />
      ) : (
        <Heart className="cursor-pointer" />
      )}
    </div>
  );
};

export default FavoriteProductButton;
