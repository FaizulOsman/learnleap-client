import apiSlice from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: `/auth/signup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["learnleap"],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["learnleap"],
    }),
    refreshToken: builder.mutation({
      query: (data) => ({
        url: `/auth/refresh-token`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["learnleap"],
    }),
    getAllUsers: builder.query({
      query: ({ headers }) => ({
        url: `/users`,
        headers: headers,
      }),
      providesTags: ["learnleap"],
    }),
    getSingleUser: builder.query({
      query: ({ id, headers }) => ({
        url: `/users/${id}`,
        headers: headers,
      }),
      providesTags: ["learnleap"],
    }),
    getAllUsersByQuery: builder.query({
      query: ({ headers, limit, page, sortOrder }) => ({
        url: `/users?limit=${limit}&page=${page}&sortOrder=${sortOrder}`,
        headers: headers,
      }),
      providesTags: ["learnleap"],
    }),
    updateUser: builder.mutation({
      query: ({ id, data, headers }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["learnleap"],
    }),
    deleteUser: builder.mutation({
      query: ({ id, headers }) => ({
        url: `/users/${id}`,
        method: "DELETE",
        headers: headers,
      }),
      invalidatesTags: ["learnleap"],
    }),
    getMyProfile: builder.query({
      query: ({ headers }) => ({
        url: `/users/my-profile`,
        headers: headers,
      }),
      providesTags: ["learnleap"],
    }),
    updateMyProfile: builder.mutation({
      query: ({ data, headers }) => ({
        url: `/users/my-profile`,
        method: "PATCH",
        body: data,
        headers: headers,
      }),
      invalidatesTags: ["learnleap"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useGetAllUsersByQueryQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} = userApi;
