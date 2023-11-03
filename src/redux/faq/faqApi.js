import apiSlice from "../api/apiSlice";

const faqApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFaq: builder.mutation({
      query: ({ data, headers }) => ({
        url: `/faq/create-faq`,
        method: "POST",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["learnleap"],
    }),
    getAllFaq: builder.query({
      query: () => `/faq`,
      providesTags: ["learnleap"],
    }),
    getSingleFaq: builder.query({
      query: (id) => `/faq/${id}`,
      providesTags: ["learnleap"],
    }),
    deleteFaq: builder.mutation({
      query: ({ id }) => ({
        url: `/faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["learnleap"],
    }),
    updateFaq: builder.mutation({
      query: ({ id, data, headers }) => ({
        url: `/faq/${id}`,
        method: "PATCH",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["learnleap"],
    }),
  }),
});

export const {
  useCreateFaqMutation,
  useGetAllFaqQuery,
  useGetSingleFaqQuery,
  useDeleteFaqMutation,
  useUpdateFaqMutation,
} = faqApi;
