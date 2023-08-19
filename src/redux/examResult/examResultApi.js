import apiSlice from "../api/apiSlice";

const examResult = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createExamResult: builder.mutation({
      query: ({ data, headers }) => ({
        url: `/exam-result/create-exam-result`,
        method: "POST",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["test-yourself"],
    }),
    getAllExamResult: builder.query({
      query: () => `/exam-result`,
      providesTags: ["test-yourself"],
    }),
    getSingleExamResult: builder.query({
      query: ({ id, headers }) => ({
        url: `/exam-result/${id}`,
        headers: headers,
      }),
    }),
    getMySubmittedResults: builder.query({
      query: ({ headers }) => ({
        url: `/exam-result/my-submitted-results`,
        headers: headers,
      }),
    }),
  }),
});

export const {
  useCreateExamResultMutation,
  useGetAllExamResultQuery,
  useGetSingleExamResultQuery,
  useGetMySubmittedResultsQuery,
} = examResult;