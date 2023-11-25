import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logoutAccount, setCredentials } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().authSlice.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});


const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.originalStatus === 403) {
      console.log('sending refresh token')
      const refreshResult = await baseQuery('/refresh', api, extraOptions)
      console.log(refreshResult)
      if (refreshResult?.data) {
          const user = api.getState().auth.user
          api.dispatch(setCredentials({ ...refreshResult.data, user }))
          result = await baseQuery(args, api, extraOptions)
      } else {
          api.dispatch(logoutAccount())
      }
  }

  return result
}

export const baseApi = createApi ({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["auth", "user", "course", "exam"],
  endpoints: builder => ({})
})
