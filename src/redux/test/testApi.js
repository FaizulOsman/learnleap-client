import apiSlice from "../api/apiSlice";

const testApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTest: builder.mutation({
      query: ({ data, headers }) => ({
        url: `/test/create-test`,
        method: "POST",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["learnleap"],
    }),
    getAllTest: builder.query({
      query: () => `/test`,
      providesTags: ["learnleap"],
    }),
    getTestBySubject: builder.query({
      query: (subject) => `/test/get-test-by-subject/${subject}`,
      providesTags: ["learnleap"],
    }),
    getSingleTest: builder.query({
      query: (id) => `/test/${id}`,
      providesTags: ["learnleap"],
    }),
    deleteTest: builder.mutation({
      query: ({ id, headers }) => ({
        url: `/test/${id}`,
        method: "DELETE",
        headers: headers,
      }),
      invalidatesTags: ["learnleap"],
    }),
    updateTest: builder.mutation({
      query: ({ id, data, headers }) => ({
        url: `/test/${id}`,
        method: "PATCH",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["learnleap"],
    }),
    addResult: builder.mutation({
      query: ({ options, headers }) => ({
        url: `/test/add-result/${options.id}`,
        method: "PATCH",
        body: options.data,
        headers: headers,
      }),
      invalidatesTags: ["learnleap"],
    }),
  }),
});

export const {
  useCreateTestMutation,
  useGetAllTestQuery,
  useGetTestBySubjectQuery,
  useGetSingleTestQuery,
  useDeleteTestMutation,
  useUpdateTestMutation,
  useAddResultMutation,
} = testApi;
