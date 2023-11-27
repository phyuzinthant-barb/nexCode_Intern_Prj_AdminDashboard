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

    addNewExam: builder.mutation({
      query: () => ({
        url: `${endPoint}`,
        method: "POST",
      }),
      invalidatesTags:["exam"],
    })
  }),
});

export const { useGetAllExamsQuery, useAddNewExamMutation } = examApi;
