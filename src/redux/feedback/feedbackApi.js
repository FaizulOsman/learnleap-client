import apiSlice from "../api/apiSlice";

const feedbackApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFeedback: builder.mutation({
      query: ({ data, headers }) => ({
        url: `/feedbacks/create-feedback`,
        method: "POST",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["learnleap"],
    }),
    getAllFeedback: builder.query({
      query: ({ headers, limit, page, sortOrder }) => ({
        url: `/feedbacks?limit=${limit}&page=${page}&sortOrder=${sortOrder}`,
        method: "GET",
        headers: headers,
      }),
      providesTags: ["learnleap"],
    }),
    getSingleFeedback: builder.query({
      query: (id) => `/feedbacks/${id}`,
      providesTags: ["learnleap"],
    }),
    deleteFeedback: builder.mutation({
      query: ({ id, headers }) => ({
        url: `/feedbacks/${id}`,
        method: "DELETE",
        headers: headers,
      }),
      invalidatesTags: ["learnleap"],
    }),
    updateFeedback: builder.mutation({
      query: ({ id, data, headers }) => ({
        url: `/feedbacks/${id}`,
        method: "PATCH",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["learnleap"],
    }),
    addResult: builder.mutation({
      query: ({ options, headers }) => ({
        url: `/feedbacks/add-result/${options.id}`,
        method: "PATCH",
        body: options.data,
        headers: headers,
      }),
      invalidatesTags: ["learnleap"],
    }),
  }),
});

export const {
  useCreateFeedbackMutation,
  useGetAllFeedbackQuery,
  useGetSingleFeedbackQuery,
  useDeleteFeedbackMutation,
  useUpdateFeedbackMutation,
  useAddResultMutation,
} = feedbackApi;
