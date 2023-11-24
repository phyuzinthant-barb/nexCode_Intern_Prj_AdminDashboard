import { baseApi } from "../../app/baseApi";

const endPoint = "course";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: () => ({
        url: `${endPoint}`,
        method: "GET",
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["course"],
    }),
  }),
});

export const { useGetAllCoursesQuery } = courseApi;
