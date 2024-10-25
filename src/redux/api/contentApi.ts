import { baseApi } from "./baseApi";

const contentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getContent: build.query({
      query: () => ({
        url: "/contents",
        method: "GET",
      }),
    }),
    sendSupportMessage: build.mutation({
      query: (data) => ({
        url: "/contents/support-message",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetContentQuery, useSendSupportMessageMutation } = contentApi;
