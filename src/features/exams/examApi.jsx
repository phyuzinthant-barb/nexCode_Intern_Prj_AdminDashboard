import { baseApi } from "../../app/baseApi";

const endPoint = "exam";

export const examApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllExams: builder.query({
      query: () => ({
        url: `${endPoint}`,
        method: "GET",
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["exam"],
    }),
  }),
});

export const { useGetAllExamsQuery } = examApi;
