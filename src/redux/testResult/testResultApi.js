import apiSlice from "../api/apiSlice";

const testResult = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTestResult: builder.mutation({
      query: ({ data, headers }) => ({
        url: `/test-result/create-test-result`,
        method: "POST",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["test-yourself"],
    }),
    getAllTestResult: builder.query({
      query: () => `/test-result`,
      providesTags: ["test-yourself"],
    }),
    getSingleTestResult: builder.query({
      query: ({ id, headers }) => ({
        url: `/test-result/${id}`,
        headers: headers,
      }),
    }),
    getMySubmittedResults: builder.query({
      query: ({ headers }) => ({
        url: `/test-result/my-submitted-results`,
        headers: headers,
      }),
    }),
  }),
});

export const {
  useCreateTestResultMutation,
  useGetAllTestResultQuery,
  useGetSingleTestResultQuery,
  useGetMySubmittedResultsQuery,
} = testResult;
