import { baseApi } from "../../app/baseApi";

const endPoint = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginAccount: builder.mutation({
      query: (credentials) => ({
        url: `${endPoint}/login`,
        method: "POST",
        body: { ...credentials },
      }),
      onSuccess: (response, variables, api) => {
        api.dispatch(
          setCredentials({
            accessToken: response.data.accessToken,
          })
        );
      },
      invalidatesTags: ["auth"],
    }),

    forgotPassword: builder.mutation({
      query:(email)=> ({
        url: `user/forgot-password`,
        method: "POST",
        body: (email),
      }),
    }),

    verifyOtp: builder.mutation({
      query: (otpData) => ({
          url: `/user/verify-otp`,
          method: "POST",
          body: otpData,
      }),
  }),

  }),
});

export const { useLoginAccountMutation, useForgotPasswordMutation, useVerifyOtpMutation } = authApi;
