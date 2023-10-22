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
      invalidatesTags: ["learnleap"],
    }),
    getAllExamResult: builder.query({
      query: () => `/exam-result`,
      providesTags: ["learnleap"],
    }),
    getSingleExamResult: builder.query({
      query: ({ id, headers }) => ({
        url: `/exam-result/${id}`,
        headers: headers,
      }),
    }),
    getMySubmittedResults: builder.query({
      query: ({ headers, page, limit, sortBy, sortOrder }) => ({
        url: `/exam-result/my-submitted-results?${page && `page=${page}&`}${
          limit && `limit=${limit}&`
        }${sortBy && `sortBy=${sortBy}&`}${
          sortOrder && `sortOrder=${sortOrder}`
        }`,
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
