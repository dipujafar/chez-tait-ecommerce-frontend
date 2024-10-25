import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const wishListApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWishList: build.query({
      query: () => ({
        url: "/favorite-items/my-favorite-items",
        method: "GET",
      }),
      providesTags: [tagTypes?.wishList],
    }),
    getSingleWishListProduct: build.query({
      query: (id) => ({
        url: `/favorite-items/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes?.wishList],
    }),
    getSingleWishProductByProductId: build.query({
      query: (id) => ({
        url: `/favorite-items/get-by-product/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes?.wishList],
    }),
    addWishList: build.mutation({
      query: (data) => ({
        url: "/favorite-items",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes?.wishList],
    }),
    deleteWishList: build.mutation({
      query: (id) => ({
        url: `/favorite-items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes?.wishList],
    }),
  }),
});

export const {
  useGetWishListQuery,
  useAddWishListMutation,
  useGetSingleWishListProductQuery,
  useGetSingleWishProductByProductIdQuery,
  useDeleteWishListMutation,
} = wishListApi;
