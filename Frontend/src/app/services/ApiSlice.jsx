import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
 
export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes:[ "item","Banner"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: () => ({}),
});
 
export default apiSlice;
 