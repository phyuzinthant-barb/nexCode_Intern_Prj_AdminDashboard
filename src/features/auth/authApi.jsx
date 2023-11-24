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
  }),
});

export const { useLoginAccountMutation } = authApi;
