import apiSlice from "../api/apiSlice";

const discussApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createDiscuss: builder.mutation({
      query: ({ data, headers }) => ({
        url: `/discusses/create-discuss`,
        method: "POST",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["test-yourself"],
    }),
    getAllDiscuss: builder.query({
      query: () => `/discusses`,
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
      query: ({ id, data, headers }) => ({
        url: `/discusses/${id}`,
        method: "PATCH",
        body: data,
        headers: headers,
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
