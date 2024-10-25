import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: [tagTypes?.category],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
