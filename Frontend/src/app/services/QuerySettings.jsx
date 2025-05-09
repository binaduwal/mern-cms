import apiSlice from "./ApiSlice";
 
export const querySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getItemWithToken: builder.query({
      query: ({ url, token }) => ({
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["item"],
      
    }),
 
    getItem: builder.query({
      query: ({ url }) => ({
        url,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      providesTags: ["item"],
    }),
 
    addItem: builder.mutation({
      query: ({ url, data }) => ({
        url,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
      invalidatesTags: ["item"],
    }),
 
    deleteItem: builder.mutation({
      query: ({ url }) => ({
        url: `${url}`,
        method: "DELETE",
      }),
      invalidatesTags: ["item"],
    }),
 
    updateItem: builder.mutation({
      query: ({ url, data }) => ({
        url: `${url}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
      invalidatesTags: ["item"],
    }),
 
    getItemById: builder.query({
      query: (url) => ({
        url: url,
        method: "GET",
      }),
      invalidatesTags: ["item"],
    }),
  }),
});
 
export const {
  useAddItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,
  useGetItemWithTokenQuery,
  useGetItemQuery,
  useGetItemByIdQuery,
} = querySlice;