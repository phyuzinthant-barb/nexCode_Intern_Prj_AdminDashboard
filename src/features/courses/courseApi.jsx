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

    addNewCourse: builder.mutation({
      query: ({ courseData }) => ({
        url: `${endPoint}`,
        method: "POST",
        body: courseData,
      }),
      invalidatesTags: ["course"],
    }),

    getCourseById: builder.query({
      query: ({ courseId }) => ({
        url: `${endPoint}/${courseId}`,
        method: "GET",
      }),
      invalidatesTags: ["course"],
    }),

    editCourse: builder.mutation({
      query: ({ courseId, updatedData }) => ({
        url: `${endPoint}/${courseId}`,
        method: "PUT",
        body: updatedData,
      }),
      onError: (error) => {
        console.error("Edit student failed:", error);
      },
      invalidatesTags: ["course"],
    }),

    getStudentsByCourseId: builder.query({
      query: ({ courseId }) => ({
        url: `${endPoint}/users/filter?id=${courseId}`,
        method: "GET",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useAddNewCourseMutation,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useGetStudentsByCourseIdQuery,
} = courseApi;
