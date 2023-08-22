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
      invalidatesTags: ["test-yourself"],
    }),
    getAllTest: builder.query({
      query: () => `/test`,
      providesTags: ["test-yourself"],
    }),
    getSingleTest: builder.query({
      query: (id) => `/test/${id}`,
      providesTags: ["test-yourself"],
    }),
    deleteTest: builder.mutation({
      query: ({ id, headers }) => ({
        url: `/test/${id}`,
        method: "DELETE",
        headers: headers,
      }),
      invalidatesTags: ["test-yourself"],
    }),
    updateTest: builder.mutation({
      query: ({ id, data, headers }) => ({
        url: `/test/${id}`,
        method: "PATCH",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["test-yourself"],
    }),
    addResult: builder.mutation({
      query: ({ options, headers }) => ({
        url: `/test/add-result/${options.id}`,
        method: "PATCH",
        body: options.data,
        headers: headers,
      }),
      invalidatesTags: ["test-yourself"],
    }),
  }),
});

export const {
  useCreateTestMutation,
  useGetAllTestQuery,
  useGetSingleTestQuery,
  useDeleteTestMutation,
  useUpdateTestMutation,
  useAddResultMutation,
} = testApi;
