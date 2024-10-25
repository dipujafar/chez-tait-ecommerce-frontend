import { get } from "http";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query({
      query: () => ({
        url: "/orders/my-orders",
        method: "GET",
      }),
      providesTags: [tagTypes?.order],
    }),
    getSingleOrder: build.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes?.order],
    }),
    createOrder: build.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes?.order],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useGetSingleOrderQuery,
} = orderApi;
