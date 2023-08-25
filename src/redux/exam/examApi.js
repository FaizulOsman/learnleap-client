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
      invalidatesTags: ["test-yourself"],
    }),
    getAllExam: builder.query({
      query: () => `/exam`,
      providesTags: ["test-yourself"],
    }),
    getSingleExam: builder.query({
      query: (id) => `/exam/${id}`,
      providesTags: ["test-yourself"],
    }),
    deleteExam: builder.mutation({
      query: ({ id, headers }) => ({
        url: `/exam/${id}`,
        method: "DELETE",
        headers: headers,
      }),
      invalidatesTags: ["test-yourself"],
    }),
    updateExam: builder.mutation({
      query: ({ id, data, headers }) => ({
        url: `/exam/${id}`,
        method: "PATCH",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["test-yourself"],
    }),
    addResult: builder.mutation({
      query: ({ options, headers }) => ({
        url: `/exam/add-result/${options.id}`,
        method: "PATCH",
        body: options.data,
        headers: headers,
      }),
      invalidatesTags: ["test-yourself"],
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
