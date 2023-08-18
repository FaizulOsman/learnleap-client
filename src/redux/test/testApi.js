import apiSlice from "../api/apiSlice";

const productApi = apiSlice.injectEndpoints({
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
    addResult: builder.mutation({
      query: ({ options, headers }) => ({
        url: `/test/add-result/${options.id}`,
        method: "PATCH",
        body: options.data,
        headers: headers,
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useCreateTestMutation,
  useGetAllTestQuery,
  useGetSingleTestQuery,
  useAddResultMutation,
} = productApi;
