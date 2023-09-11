import apiSlice from "../api/apiSlice";

const discussApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createDiscuss: builder.mutation({
      query: (data) => ({
        url: `/discusses/create-discuss`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["test-yourself"],
    }),
    getAllDiscuss: builder.query({
      query: ({ page, limit, sortOrder }) =>
        `/discusses?page=${page}&limit=${limit}&sortOrder=${sortOrder}`,
      providesTags: ["test-yourself"],
    }),
    getSingleDiscuss: builder.query({
      query: (id) => `/discusses/${id}`,
      providesTags: ["test-yourself"],
    }),
    deleteDiscuss: builder.mutation({
      query: ({ id, headers }) => ({
        url: `/discusses/${id}`,
        method: "DELETE",
        headers: headers,
      }),
      invalidatesTags: ["test-yourself"],
    }),
    updateDiscuss: builder.mutation({
      query: ({ id, data }) => ({
        url: `/discusses/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["test-yourself"],
    }),
  }),
});

export const {
  useCreateDiscussMutation,
  useGetAllDiscussQuery,
  useGetSingleDiscussQuery,
  useDeleteDiscussMutation,
  useUpdateDiscussMutation,
} = discussApi;
