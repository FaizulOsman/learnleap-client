import apiSlice from "../api/apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTest: builder.mutation({
      query: ({ data, headers }) => ({
        url: `/test/create-test`,
        method: "POST",
        body: data,
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
  }),
});

export const {
  useCreateTestMutation,
  useGetAllTestQuery,
  useGetSingleTestQuery,
} = productApi;
