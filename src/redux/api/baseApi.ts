/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setUser } from "../features/authSlice";
import { tagTypesList } from "../tagTypes";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_BASEURL,
  prepareHeaders: (headers, { getState }) => {
    const otpToken = sessionStorage.getItem("token");
    const forgotPasswordToken = sessionStorage.getItem("forgotPasswordToken");
    const signUpToken = sessionStorage.getItem("signUpToken");
    const token = (getState() as any).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    if (otpToken) {
      headers.set("token", otpToken);
    }
    if (forgotPasswordToken) {
      headers.set("token", forgotPasswordToken);
    }
    if (signUpToken) {
      headers.set("token", signUpToken);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken = async (
  args: any,
  api: any,
  extraOptions: any,
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/auth/refresh-token`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    const data = await res.json();
    if (data?.data?.accessToken) {
      const user = api.getState().auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        }),
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,

  tagTypes: tagTypesList,
  endpoints: () => ({}),
});
