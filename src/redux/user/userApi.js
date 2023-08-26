import apiSlice from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: `/auth/signup`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
    }),
    refreshToken: builder.mutation({
      query: (data) => ({
        url: `/auth/refresh-token`,
        method: "POST",
        body: data,
      }),
    }),
    getAllUsers: builder.query({
      query: ({ limit, page, sortOrder, headers }) => ({
        url: `/users?limit=${limit}&page=${page}&sortOrder=${sortOrder}`,
        headers: headers,
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ id, headers }) => ({
        url: `/users/${id}`,
        method: "DELETE",
        headers: headers,
      }),
    }),
    getMyProfile: builder.query({
      query: ({ headers }) => ({
        url: `/users/my-profile`,
        headers: headers,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetMyProfileQuery,
} = userApi;
