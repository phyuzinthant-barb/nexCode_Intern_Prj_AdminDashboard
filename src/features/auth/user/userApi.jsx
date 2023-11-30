import { baseApi } from "../../../app/baseApi";

const endPoint = "/user";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: ({ password }) => ({
        url: `${endPoint}/change-password`,
        method: "PUT",
        body: password,
      }),
      invalidatesTags: ["user"],
    }),

    setNewPassword: builder.mutation ({
      query: (updatedPws) => ({
        url: `${endPoint}/set-new-password`,
        method: "POST",
        body: updatedPws,
      }),
      invalidatesTags: ["user"]
    })
  }),
});

export const {
  useChangePasswordMutation,
  useSetNewPasswordMutation
} = userApi;
