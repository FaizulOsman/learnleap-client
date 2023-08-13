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
  }),
});

export const { useSignUpMutation, useLoginMutation, useRefreshTokenMutation } =
  userApi;