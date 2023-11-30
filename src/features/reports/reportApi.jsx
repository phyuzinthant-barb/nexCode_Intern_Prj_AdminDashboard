import { baseApi } from "../../app/baseApi";

const endPoint = "report";

export const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverallReport: builder.query({
      query: () => ({
        url: `${endPoint}`,
        method: "GET",
      }),
      invalidatesTags: ["report"],
    }),

    getCourseReportPieChart: builder.query({
      query: ({courseId}) => ({
        url: `${endPoint}/course/${courseId}/pie`,
        method: "GET",
      }),
      invalidatesTags: ["report"],
    }),

    getCourseReport: builder.query({
      query: ({courseId}) => ({
        url: `${endPoint}/course/${courseId}`,
        method: "GET",
      }),
      invalidatesTags: ["report"],
    }),

    getExamReportPieChart: builder.query({
      query: ({examId}) => ({
        url: `${endPoint}/exam/${examId}/pie`,
        method: "GET",
      }),
      invalidatesTags: ["report"],
    }),

    getExamReport: builder.query({
      query: ({examId}) => ({
        url: `${endPoint}/exam/${examId}`,
        method: "GET",
      }),
      invalidatesTags: ["report"],
    }),

    getStudentReport: builder.query({
      query: ({studentId}) => ({
        url: `${endPoint}/student/${studentId}`,
        method: "GET",
      }),
      invalidatesTags: ["report"],
    }),
  }),
});

export const { 
  useGetOverallReportQuery,
  useGetCourseReportQuery,
  useGetCourseReportPieChartQuery,
  useGetExamReportPieChartQuery,
  useGetExamReportQuery,
  useGetStudentReportQuery,
} = reportApi;
