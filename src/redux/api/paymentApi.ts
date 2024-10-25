import { baseApi } from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: "/payments/checkout",
        method: "POST",
        body: data,
      }),
    }),
    confirmPayment: builder.mutation({
      query: (data) => ({
        url: `/payments/confirm-payment/${data?.orderId}`,
        method: "GET",
        params: { paymentIntentId: data?.paymentIntentId },
      }),
    }),
  }),
});

export const { useCreatePaymentIntentMutation, useConfirmPaymentMutation } =
  paymentApi;
