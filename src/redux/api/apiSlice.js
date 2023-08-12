import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://book-schema.vercel.app/api/v1',
    baseUrl: "https://pc-builder-server-alpha.vercel.app/api/v1",
  }),
  tagTypes: ["pc-builder"],
  endpoints: () => ({}),
});

export default apiSlice;
