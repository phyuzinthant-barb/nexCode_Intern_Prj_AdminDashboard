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
      query: ({ examData }) => ({
        url: `${endPoint}`,
        method: "POST",
        body: examData,
        headers: {
          'Content-Type': 'application/json', // Adjust content type as needed
          // Include other headers if necessary
        },
      }),
      invalidatesTags: ["exam"],
    }),

    editExam: builder.mutation({
      query: ({ updatedData, examId }) => ({
        url: `${endPoint}/${examId}`,
        method: "PUT",
        body: updatedData,
        headers: {
          'Content-Type': 'application/json',
          // Include other headers if necessary
        },
      }),
      invalidatesTags: ["exam"],
    }),

    publishExam: builder.mutation({
      query: ({ published, examId }) => ({
        url: `${endPoint}/${examId}/publish`,
        method: "PUT",
        body: JSON.stringify({ published: true }),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ["exam"],
    }),

    unpublishExam: builder.mutation({
      query: ({ published, examId }) => ({
        url: `${endPoint}/${examId}/publish`,
        method: "PUT",
        body: JSON.stringify({ published: false }),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ["exam"],
    }),
 
    getExamById: builder.query({
      query: ({examId}) => ({
        url: `${endPoint}/${examId}`,
        method: "GET",
      }),
      invalidatesTags: ["exam"],
    }),

    getAllQuestion: builder.query({
      query: ({examId}) => ({
        url: `${endPoint}/${examId}/questions`,
        method: "GET",
      }),
      invalidatesTags: ["exam"]
    }),

    editQuestion: builder.mutation({
      query: ({examId, updatedData}) => ({
        url: `${endPoint}/${examId}/questions`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags:["exam"]
    }),
  }),
});

export const {
  useGetAllExamsQuery,
  useAddNewExamMutation,
  useEditExamMutation,
  usePublishExamMutation,
  useUnpublishExamMutation,
  useGetExamByIdQuery,
  useGetAllQuestionQuery,
  useEditQuestionMutation,
} = examApi;
