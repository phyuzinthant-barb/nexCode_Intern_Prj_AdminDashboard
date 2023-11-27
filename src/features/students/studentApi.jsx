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

    deleteStudent: builder.mutation ({
      query: ({studentId}) => ({
        url: `${studentId}`,
        method: "DELETE",
      }),
      onError: (error) => {
        console.error("Delete Student Failed:" , error)
      },
    })
  }),
});

export const {
  useGetAllStudentsQuery,
  useAddNewStudentMutation,
  useEditStudentMutation,
  useDeleteStudentMutation
} = studentApi;
