import apiSlice from "../api/apiSlice";

const bookmarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBookmark: builder.mutation({
      query: ({ data, headers }) => ({
        url: `/bookmarks/create-bookmark`,
        method: "POST",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["learnleap"],
    }),
    getAllBookmark: builder.query({
      query: ({ headers }) => ({
        url: `/bookmarks/ `,
        headers: headers,
      }),
      providesTags: ["learnleap"],
    }),
    getSingleBookmark: builder.query({
      query: ({ questionId, headers }) => ({
        url: `/bookmarks/${questionId}`,
        headers: headers,
      }),
      providesTags: ["learnleap"],
    }),
    deleteBookmark: builder.mutation({
      query: ({ data, headers }) => ({
        url: `/bookmarks/delete-bookmark`,
        method: "DELETE",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["learnleap"],
    }),
    updateBookmark: builder.mutation({
      query: ({ id, data, headers }) => ({
        url: `/bookmarks/${id}`,
        method: "PATCH",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["learnleap"],
    }),
  }),
});

export const {
  useCreateBookmarkMutation,
  useGetAllBookmarkQuery,
  useGetSingleBookmarkQuery,
  useDeleteBookmarkMutation,
  useUpdateBookmarkMutation,
} = bookmarkApi;
