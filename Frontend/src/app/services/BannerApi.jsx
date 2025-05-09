import apiSlice from "./ApiSlice"

export const bannerApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        addBanner:builder.mutation({
            query:(newBanner)=>({
                url:'/banner/create',
                method:'POST',
                body:newBanner
            }),
            invalidatesTags:['Banner']
        }),
        getBanner:builder.query({
            query:()=>'/banner/all',
            providesTags:['Banner']
        }),
        getBannerById: builder.query({
            query: (id) => `/banner/${id}`,
            providesTags: (result, error, id) => [{ type: 'Banner', id }],
        }),
        deleteBanner:builder.mutation({
            query:(id)=>({
                url:`/banner/delete/${id}`,
                method:'DELETE'
            }),
            invalidatesTags:['Banner']
        }),
        updateBanner:builder.mutation({
            query:({ id, ...updatedData })=>({ // Accept id and the data to update
                url:`/banner/edit/${id}`,
                method:'PUT',
                body:updatedData // Use the passed data for the body
            }),
            invalidatesTags:['Banner']
        })
    })
})

export const {
    useAddBannerMutation,
    useGetBannerQuery,
    useGetBannerByIdQuery, // Export the new hook
    useDeleteBannerMutation, // Export this hook
    useUpdateBannerMutation  // Export this hook
}=bannerApi;