import apiSlice from "../api/apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/pc-builder/products`,
      providesTags: ["pc-builder"],
    }),
    getSingleProduct: builder.query({
      query: (id) => `/pc-builder/products/${id}`,
      providesTags: ["pc-builder"],
    }),
    getProductsByCategory: builder.query({
      query: (category) => `/pc-builder/categories/${category}`,
      providesTags: ["pc-builder"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useGetProductsByCategoryQuery,
} = productApi;
