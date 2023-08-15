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
    getSingleTest: builder.query({
      query: (id) => `/test/${id}`,
      providesTags: ["test-yourself"],
    }),
  }),
});

export const {
  useCreateTestResultMutation,
  useGetAllTestResultQuery,
  useGetSingleTestQuery,
} = testResult;
