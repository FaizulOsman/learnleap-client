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
      query: ({ id, data }) => ({
        url: `/test/add-result/${id}`,
        method: "PATCH",
        body: data,
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
