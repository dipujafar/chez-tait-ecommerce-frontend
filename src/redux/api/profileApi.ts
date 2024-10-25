import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfileData: build.query({
      query: () => ({
        url: "/users/my-profile",
        method: "GET",
      }),
      providesTags: [tagTypes?.profile],
    }),

    updateProfileData: build.mutation({
      query: (data) => ({
        url: "/users/update-my-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes?.profile],
    }),
    
  }),
});

export const { useGetProfileDataQuery, useUpdateProfileDataMutation } =
  profileApi;
