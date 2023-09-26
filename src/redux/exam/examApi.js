import apiSlice from "../api/apiSlice";

const examApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createExam: builder.mutation({
      query: ({ data, headers }) => ({
        url: `/exam/create-exam`,
        method: "POST",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["learnleap"],
    }),
    getAllExam: builder.query({
      query: () => `/exam`,
      providesTags: ["learnleap"],
    }),
    getSingleExam: builder.query({
      query: (id) => `/exam/${id}`,
      providesTags: ["learnleap"],
    }),
    deleteExam: builder.mutation({
      query: ({ id, headers }) => ({
        url: `/exam/${id}`,
        method: "DELETE",
        headers: headers,
      }),
      invalidatesTags: ["learnleap"],
    }),
    updateExam: builder.mutation({
      query: ({ id, data, headers }) => ({
        url: `/exam/${id}`,
        method: "PATCH",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["learnleap"],
    }),
    addResult: builder.mutation({
      query: ({ options, headers }) => ({
        url: `/exam/add-result/${options.id}`,
        method: "PATCH",
        body: options.data,
        headers: headers,
      }),
      invalidatesTags: ["learnleap"],
    }),
  }),
});

export const {
  useCreateExamMutation,
  useGetAllExamQuery,
  useGetSingleExamQuery,
  useDeleteExamMutation,
  useUpdateExamMutation,
  useAddResultMutation,
} = examApi;
