import apiSlice from "../api/apiSlice";

const discussApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createDiscuss: builder.mutation({
      query: (data) => ({
        url: `/discusses/create-discuss`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["learnleap"],
    }),
    getAllDiscuss: builder.query({
      query: ({ page, limit, sortOrder }) =>
        `/discusses?page=${page}&limit=${limit}&sortOrder=${sortOrder}`,
      providesTags: ["learnleap"],
    }),
    getSingleDiscuss: builder.query({
      query: (id) => `/discusses/${id}`,
      providesTags: ["learnleap"],
    }),
    deleteDiscuss: builder.mutation({
      query: ({ id, headers }) => ({
        url: `/discusses/${id}`,
        method: "DELETE",
        headers: headers,
      }),
      invalidatesTags: ["learnleap"],
    }),
    updateDiscuss: builder.mutation({
      query: ({ id, data }) => ({
        url: `/discusses/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["learnleap"],
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
