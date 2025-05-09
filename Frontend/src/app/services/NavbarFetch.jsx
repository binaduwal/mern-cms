import apiSlice from "./ApiSlice";

 
export const navbarFetch = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNavbarMenu: builder.query({
      //query: () => "/products",  //does same as below
      query: () => ({
        method: "GET",
        url: "/menu/all",
        header: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      providesTags: ["Products"], //static tag
 
      // providesTags: (result) => {      //dynamic tag
      //   // Check if the result is an array
      //   if (Array.isArray(result)) {
      //     // Map through the array and add a tag for each product
      //     return [
      //       ...result.map(({ id }) => ({ type: 'Products', id })),
      //       { type: 'Products', id: 'LIST' }
      //     ]; }
 
      // else {
      //     // If the result is not an array, just return the LIST tag
      //     return [{ type: 'Products', id: 'LIST' }];
      //   }
      // },
    }),
 
    getProductsById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["Products"],
      //providesTags: (result, error, id) => [{ type: "Products", id }],
    }),
 
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: `/products/add`,
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
      //invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
 
    updateProduct: builder.mutation({
      query: ({ id, ...updateItem }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: updateItem,
      }),
      invalidatesTags: ["Products"],
      //invalidatesTags: (result, error, { id }) => [{ type: "Products", id }],
    }),
 
    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
      // invalidatesTags: (result, error, { id }) => [
      //   { type: "Products", id },
      //   { type: "Products", id: "LIST" }, ],
    }),
  }),
});
 
export const {
    useGetNavbarMenuQuery,
  useGetProductsByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = navbarFetch;