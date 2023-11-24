import { baseApi } from "../../app/baseApi";

const endPoint = "user";

export const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: () => ({
        url: `${endPoint}`,
        method: "GET",
      }),
      invalidatesTags: ["user"],
    }),

    addNewStudent: builder.mutation({
      query: ({ studentData }) => ({
        url: `${endPoint}/student-signup`,
        method: "POST",
        body: studentData,
      }),
      invalidatesTags: ["user"],
    }),

    getStudentById: builder.query({
      query: ({ studentId }) => ({
        url: `${endPoint}/${studentId}`,
        method: "GET",
      }),
      invalidatesTags: ["user"],
    }),

    editStudent: builder.mutation({
      query: ({ studentId, updatedData }) => ({
        url: `${endPoint}/${studentId}`,
        method: "PUT",
        body: updatedData,
      }),
      onError: (error) => {
        console.error("Edit student failed:", error);
      },
      invalidatesTags: ["user"],
    }),

    getStudentsByCourseId: builder.query({
      query: ({ courseId }) => ({
        url: `${endPoint}/filter?id=${courseId}`,
        method: "GET",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllStudentsQuery,
  useAddNewStudentMutation,
  useEditStudentMutation,
  useGetStudentByIdQuery,
  useGetStudentsByCourseIdQuery
} = studentApi;
